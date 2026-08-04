// src/components/MyReactComponent.jsx

import styles from './code.module.scss';
import clsx from 'clsx';

export default function Code(props) {
  return (
    <div class={clsx({'single': props.single}, styles.code_wrapper)}>
      {props.children}
    </div>
  );
}