// src/components/MyReactComponent.jsx

import Button from './button.tsx';
import styles from './snippet.module.scss';
import clsx from 'clsx';

export default function Snippet({title}) {

  return (
    <div className={clsx(styles.snippet)}>
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
      <div className="middle">
        <div className="preview">

        </div>
      </div>
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
    </div>
  );
}