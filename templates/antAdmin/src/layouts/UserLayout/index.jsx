import React from 'react';
import styles from './index.module.scss';

export default function UserLayout(props) {
  return (
    <div className={styles.userLayout}>
      <div className={styles.header}>
      </div>
      {props.children}
     </div>
  );
}
