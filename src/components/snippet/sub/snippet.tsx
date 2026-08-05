// src/components/MyReactComponent.jsx

import Code from './code.tsx';
import Button from './button.tsx';
import styles from './snippet.module.scss';
import clsx from 'clsx';

export default function Snippet({title, html = null, scss = null, js = null, code = null, lang = 'js', single = false, preview = false}) {
  // console.log(title, html, scss, js, code, single);
  const lines = code ? code.split(/\r\n|\r|\n/).length : null;
  // console.log(single && lines && lines > 1);
  return (
    <div className={clsx(styles.snippet, {single : 'single'}, lines && lines === 1 && 'oneline' )}>
      {single && lines && lines > 1 && (
        <div className={clsx(styles.top)}>
          <div className="nav">
            <div className="left">
              <div className={clsx(styles.title)}>
                {title}
              </div>
            </div>
            <div className="right">
              2
            </div>
          </div>
        </div>
      )}

      <div className="middle">
        {preview && (
          <div className="preview">

          </div>
        )}
        <div className="code">
          <Code code={code} lang={lang} single={single} oneline={lines && lines === 1} />
          <Button />
        </div>
      </div>
      {!single && (
        <div className="bottom">
          <div className="nav">
            <div className="left">
              3
            </div>
            <div className="right">
              4
            </div>
          </div>
          <div className="tabs">
            <div className="tab">
              <div>

              </div>
              <div>

              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}