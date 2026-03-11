import fs from 'node:fs'
import readline from 'node:readline'

function extractSnippetByTitle(input, targetTitle) {
    // Regular expression to match a Snippet with its title
    // This handles both single quotes (title={'Badge 1'}) and double quotes (title="Badge 1")
    const snippetRegex = new RegExp(
        `<Snippet[^>]*title=(?:'|")?\\{?'?([^'"}]+)'?\\}?'?[^>]*>([\\s\\S]*?)<\\/Snippet>`,
        'g'
    );

    let match;
    while ((match = snippetRegex.exec(input)) !== null) {
        const foundTitle = match[1].trim();
        const snippetContent = match[2];

        // Check if this is the snippet we're looking for
        if (foundTitle === targetTitle || foundTitle === `'${targetTitle}'` || foundTitle === `"${targetTitle}"`) {
            return parseSnippetContent(snippetContent);
        }
    }

    return null;
}

/**
 * Parses the content of a Snippet to extract code by slot
 * @param {string} content - The content inside the Snippet tags
 * @returns {Object} - Object containing extracted code by slot
 */
function parseSnippetContent(content) {
    const result = {
        html: '',
        scss: '',
        js: '',
        // Add other slots as needed
    };

    // Extract all Fragment slots
    const fragmentRegex = /<Fragment slot="([^"]+)">[\s\S]*?<Raw[^>]*>```\n?([\s\S]*?)```\s*<\/Raw>[\s\S]*?<\/Fragment>/g;

    let fragmentMatch;
    while ((fragmentMatch = fragmentRegex.exec(content)) !== null) {
        const slot = fragmentMatch[1];
        const code = fragmentMatch[2].trim();

        if (result.hasOwnProperty(slot)) {
            result[slot] = code;
        }
    }

    return result;
}

export const extractor = async function (file, ) {

}