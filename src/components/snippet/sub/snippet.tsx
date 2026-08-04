// src/components/MyReactComponent.jsx

import Button from './button.tsx';
import styles from './snippet.module.scss';

export default function Snippet(props, { single = false }) {
  return (
    <div class={styles.snippet}>
      {single ? <div>{props.children}</div> : <div>{props.children}</div>}
      <Button />
    </div>
  );
}