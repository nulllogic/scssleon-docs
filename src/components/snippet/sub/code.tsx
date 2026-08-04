// src/components/MyReactComponent.jsx

import styles from './code.module.scss';

export default function Snippet(props, { single = false }) {
  return (
    <div class={styles.code_wrapper}>
      {props.children}
    </div>
  );
}