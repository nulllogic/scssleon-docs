// src/components/MyReactComponent.jsx

import styles from './code.module.scss';
import clsx from 'clsx';

import {createHighlighter, codeToHtml} from 'shiki';

import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
} from '@shikijs/transformers';

// // then later you can use `highlighter.codeToHtml` synchronously
// // with the loaded themes and languages.
// const code_formatted = code ? await codeToHtml(code, {
//   lang: 'html' ? 'html' : 'html',
//   themes: {
//     light: 'github-light-default',
//     dark: 'github-dark-default',
//   },
//   defaultColor: 'light-dark()',
//   transformers: [
//     transformerNotationDiff(),
//     transformerNotationHighlight(),
//     transformerNotationFocus(),
//   ],
// }) : null;

import { Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

let highlighterPromise: Promise<Highlighter> | null = null;

function getSharedHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark-default', 'github-light-default'],
      langs: ['javascript', 'typescript', 'tsx', 'html', 'css', 'scss', 'js', 'sh'],
    });
  }
  return highlighterPromise;
}

export default function Code({ code, lang }: { code: string; lang: string }) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getSharedHighlighter().then((highlighter) => {
      const result = highlighter.codeToHtml(code, {
        lang: lang ? lang : 'html',
        themes: {
          light: 'github-light-default',
          dark: 'github-dark-default',
        },
        defaultColor: 'light-dark()',
        transformers: [
          transformerNotationDiff(),
          transformerNotationHighlight(),
          transformerNotationFocus(),
        ],
      });
      if (isMounted) setHtml(result);
    });
    return () => {
      isMounted = false;
    };
  }, [code, lang]);

  if (!html) {
    return <pre><code>{code}</code></pre>; // Fallback unstyled view
  }

  return <div className={clsx(styles.wrapper)} dangerouslySetInnerHTML={{ __html: html }} />;
}

// export default function Code({ code }) {
//   return (
//     <div class={clsx({'single': props.single}, styles.code_wrapper)}>
//       {props.children}
//     </div>
//   );
// }