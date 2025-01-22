import React from 'react';
import styles from './Header.module.css';

import HeaderIcon from '../../Img/Header.svg?react';
import classNames from 'classnames';

export const Header = () => {
  return (
    <div className={classNames(styles.header)}>
      <HeaderIcon />
    </div>
  );
};
