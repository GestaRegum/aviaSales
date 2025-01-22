import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Empty, Spin } from 'antd';
import { AppDispatch, RootState } from './Store';
import { getSearchId, getTickets } from './DataSlice';
import { Ticket } from './types';
import styles from './App.module.css';

import { TicketCard } from './Components/TicketCard';

import { useVisibleTickets, useFilteredTickets } from './Hooks/';

import { CheckboxesGroup } from './Components/CheckboxesGroup';
import { ButtonsGroup } from './Components/ButtonsGroup';
import { ButtonShowMoreTickets } from './Components/ButtonShowMoreTickets';
import classNames from 'classnames';

export function App() {
  const dispatch = useDispatch<AppDispatch>();
  const filteredTickets = useFilteredTickets();
  const visibleTickets = useVisibleTickets();
  const { searchId, loading, stop } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (!stop) {
      dispatch(getTickets(searchId));
    }
  }, [searchId, stop, dispatch]);

  return (
    <div className={classNames(styles.ticket_list_conteiner)}>
      <CheckboxesGroup />

      {/* Фильтры */}

      {/* Рейсы */}
      <div className={classNames(styles.ticket_list)}>
        <>
          <ButtonsGroup />

          {loading ? <Spin /> : null}
          {filteredTickets.length === 0 ? (
            <div className={classNames(styles.ticket_no)}>
              Рейсов, подходящих под заданные фильтры, не найдено
              <Empty />
            </div>
          ) : (
            visibleTickets.map((ticket: Ticket) => (
              <div key={ticket.segments[0].date + ticket.segments[1].date}>
                <TicketCard ticket={ticket} />
              </div>
            ))
          )}
        </>
        {visibleTickets.length < filteredTickets.length ? <ButtonShowMoreTickets /> : null}
      </div>
    </div>
  );
}
