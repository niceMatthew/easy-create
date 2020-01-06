import React from 'react';
import Logo from '../Logo';

import styles from './index.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.copyright}>
        © 2019 Theme designed by{' niceMatthew '}
      </div>
    </div>
  );
}
