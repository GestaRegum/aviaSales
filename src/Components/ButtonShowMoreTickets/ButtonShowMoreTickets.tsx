import classNames from 'classnames';
import { increaseVisibleTickets } from '../../DataSlice/DataSlice';
import React, { FC } from 'react';
import styles from './ButtonShowMoreTickets.module.css';

import { useDispatch } from 'react-redux';
import { AppDispatch } from 'Store/Store';

export const ButtonShowMoreTickets: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleShowMoreTickets = () => {
    dispatch(increaseVisibleTickets());
  };

  return (
    <button className={classNames(styles.button_show_5)} onClick={handleShowMoreTickets}>
      Показать еще 5
    </button>
  );
};
