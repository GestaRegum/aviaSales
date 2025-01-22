import { useSelector } from 'react-redux';
import { RootState } from '../Store';
import { FILTER_CHECKBOXES, FilterCheckbox, Ticket } from '../types';

export const useFilteredTickets = () => {
  const { tickets, filters } = useSelector((state: RootState) => state.data);

  const filteredTickets = tickets.filter((ticket: Ticket) => {
    const stopsCount = ticket.segments[0].stops.length;
    
    const filtersMap: Record<FilterCheckbox, number | string> = {
      ALL: 'ALL',
      ONE: 1,
      TWO: 2,
      THREE: 3,
    };

    // Если выбран "Все" или пересадки совпадают с фильтром
    return (
      filters.includes(FILTER_CHECKBOXES.ALL) ||
      filters.some((filter) => filtersMap[filter as FilterCheckbox] === stopsCount)
    );
  });

  return filteredTickets;
};


