import React, { FC } from 'react';
import { TicketCardType } from 'types';
import { getDepartureTime, getConvertMinutesToTime } from '../../Utilites';

import classNames from 'classnames';
import styles from './TicketCard.module.css';

export const TicketCard: FC<TicketCardType> = ({ ticket }) => {
  const { price, segments, carrier } = ticket;

  return (
    <div className={classNames(styles.conteiner)} key={`${ticket.segments[0].date} - ${ticket.segments[1].date}`}>
      <div className={classNames(styles.price_And_Logo_Conteiner)}>
        <p>{price} руб.</p>

        <img src={`//pics.avs.io/0/${carrier}.png`} />
      </div>

      <>
        {segments.map((item, index) => {
          return (
            <div className={classNames(styles.info)} key={index}>
              <div className={classNames(styles.flight_data)}>
                <p>{`${item.origin} - ${item.destination}`}</p>
                <p>{getDepartureTime(item.date, item.duration)}</p>
              </div>

              <div className={classNames(styles.flight_data)}>
                <p>В ПУТИ</p>
                <p>{getConvertMinutesToTime(segments[0].duration)}</p>
              </div>

              <div className={classNames(styles.flight_data)}>
                <p> пересадок: {item.stops.length} </p>
                <p> {item.stops.length !== 0 ? item.stops.join(', ') : '-'}</p>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};
