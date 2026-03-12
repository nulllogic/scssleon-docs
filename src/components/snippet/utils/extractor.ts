import fs from 'node:fs/promises'

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Find the index just after the closing `>` of the FIRST occurrence of a tag
 * whose opening matches `openRe` (a non-capturing pattern that matches only
 * the tag's opening part, e.g. `/<Snippet\b[^>]*>/`).
 *
 * Returns { start, end, attrs } where:
 *   start  = index of `<` in `input`
 *   end    = index just after the closing `>` of the OPENING tag
 *   attrs  = raw attribute string inside the opening tag
 *
 * Returns null when no match is found.
 */
function findOpenTag(
    input: string,
    openRe: RegExp,
    startAt = 0,
): { start: number; end: number; attrs: string } | null {
    openRe.lastIndex = startAt;
    const m = openRe.exec(input);
    if (!m) return null;
    return {
        start: m.index,
        end: m.index + m[0].length,
        attrs: m[1] ?? '',
    };
}

/**
 * Given the index right after an opening tag, find the matching closing tag
 * (`closeTag`, e.g. `</Snippet>`), accounting for nesting of `openTagName`.
 *
 * Returns the index of `<` in the closing tag, or -1 if not found.
 */
function findMatchingClose(
    input: string,
    fromIndex: number,
    openTagName: string,
    closeTag: string,
): number {
    let depth = 1;
    let i = fromIndex;
    const openPattern = new RegExp(`<${openTagName}\\b`, 'g');
    const closePattern = new RegExp(closeTag.replace(/[<>/]/g, c => `\\${c}`), 'g');

    while (depth > 0 && i < input.length) {
        openPattern.lastIndex = i;
        closePattern.lastIndex = i;

        const nextOpen = openPattern.exec(input);
        const nextClose = closePattern.exec(input);

        if (!nextClose) return -1; // no closing tag found

        if (nextOpen && nextOpen.index < nextClose.index) {
            depth++;
            i = nextOpen.index + nextOpen[0].length;
        } else {
            depth--;
            if (depth === 0) return nextClose.index;
            i = nextClose.index + nextClose[0].length;
        }
    }
    return -1;
}

// ---------------------------------------------------------------------------
// Title parsing
// ---------------------------------------------------------------------------

/**
 * Extract the value of a `title=` attribute from tag attribute text.
 * Handles:
 *   title={'Card 1'}   title={"Card 1"}   title={`Card 1`}
 *   title="Card 1"     title='Card 1'
 */
function parseTitleAttr(attrs: string): string | null {
    // JSX expression  title={'…'}  title={"…"}  title={`…`}
    const jsx = /title=\{['"`]([^'"`}]+)['"`]\}/.exec(attrs);
    if (jsx) return jsx[1].trim();

    // Plain attribute  title="…"   title='…'
    const plain = /title=["']([^"']+)["']/.exec(attrs);
    if (plain) return plain[1].trim();

    return null;
}

// ---------------------------------------------------------------------------
// Slot / Fragment parsing
// ---------------------------------------------------------------------------

/**
 * Parse the inner body of a <Snippet> and extract code per Fragment slot.
 *
 * For each <Fragment slot="…"> … </Fragment> block, the fenced code block
 * (``` … ```) is expected directly inside the Fragment (no <Raw> wrapper).
 */
function parseSnippetContent(body: string): Record<string, string> {
    const result: Record<string, string> = {};

    // Walk through every <Fragment slot="…"> in the body.
    // Handles all valid quoting styles:
    //   slot="html"   (plain double-quotes)
    //   slot='html'   (plain single-quotes)
    //   slot={'html'} slot={"html"} slot={`html`}  (JSX expression)
    const fragOpenRe = /<Fragment\s+slot=(?:"([^"]+)"|'([^']+)'|\{['"`]([^'"`]+)['"`]\})[^>]*>/g;
    let fm: RegExpExecArray | null;

    while ((fm = fragOpenRe.exec(body)) !== null) {
        const slot = fm[1] ?? fm[2] ?? fm[3];
        const afterFragOpen = fm.index + fm[0].length;

        // Find the matching </Fragment>
        const closeFragIdx = findMatchingClose(
            body,
            afterFragOpen,
            'Fragment',
            '</Fragment>',
        );
        if (closeFragIdx === -1) continue;

        const fragBody = body.slice(afterFragOpen, closeFragIdx);

        // Extract the fenced code block directly from the Fragment body
        const code = extractFencedCode(fragBody);
        if (code !== null) {
            result[slot] = code;
        }
    }

    return result;
}

/**
 * Pull the plain text between the first ``` opening fence and the last ```
 * closing fence in `text`.  Strips common leading whitespace (de-indents).
 */
function extractFencedCode(text: string): string | null {
    const firstFence = text.indexOf('```');
    if (firstFence === -1) return null;

    // Skip to end of the opening fence line
    const afterFirstFence = text.indexOf('\n', firstFence);
    if (afterFirstFence === -1) return null;

    const lastFence = text.lastIndexOf('```');
    if (lastFence <= firstFence) return null;

    const rawCode = text.slice(afterFirstFence + 1, lastFence);
    return deindent(rawCode);
}

/**
 * Remove the common leading whitespace from every non-empty line, then
 * trim surrounding blank lines.
 */
function deindent(text: string): string {
    const lines = text.split('\n');

    let minIndent = Infinity;
    for (const line of lines) {
        if (line.trim() === '') continue;
        const indent = (line.match(/^(\s*)/) as RegExpMatchArray)[1].length;
        if (indent < minIndent) minIndent = indent;
    }
    if (!isFinite(minIndent)) minIndent = 0;

    return lines
        .map(line => line.slice(minIndent))
        .join('\n')
        .trim();
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Find a `<Snippet title={'…'}>` by title within raw MDX source text and
 * return the de-indented plain code for every `<Fragment slot="…">` it
 * contains.
 *
 * @param input       Raw MDX file contents
 * @param targetTitle Exact value of the `title` attribute to match
 * @returns Map of slot name → code string, or `null` when not found
 */
export function extractSnippetByTitle(
    input: string,
    targetTitle: string,
): Record<string, string> | null {
    // Walk every <Snippet …> opening tag
    const snippetOpenRe = /<Snippet\b([^>]*)>/g;
    let openTag: ReturnType<typeof findOpenTag>;

    let searchFrom = 0;
    while ((openTag = findOpenTag(input, snippetOpenRe, searchFrom)) !== null) {
        const title = parseTitleAttr(openTag.attrs);

        if (title === targetTitle) {
            // Find the matching </Snippet>
            const closeIdx = findMatchingClose(
                input,
                openTag.end,
                'Snippet',
                '</Snippet>',
            );
            if (closeIdx === -1) return null;

            const snippetBody = input.slice(openTag.end, closeIdx);
            return parseSnippetContent(snippetBody);
        }

        searchFrom = openTag.end;
    }

    return null;
}

/**
 * Read an MDX file from disk and extract the code blocks for the Snippet
 * with the given title.
 *
 * @param filePath Absolute (or relative) path to the `.mdx` file
 * @param title    Exact `title` attribute value of the target `<Snippet>`
 * @returns Map of slot → code, or `null` when not found
 */
export async function extractor(
    filePath: string,
    title: string,
): Promise<Record<string, string> | null> {
    if(!filePath || filePath[0] == 'undefined') return null;
    const content = await fs.readFile(filePath, 'utf8');
    return extractSnippetByTitle(content, title);
}