import { RootState } from 'Store/Store';

import { useSelector } from 'react-redux';
import { useSortedTickets } from './useSortedTickets';
import { useFilteredTickets } from './useFilteredTickets';

export const useVisibleTickets = () => {
  const filteredTickets = useFilteredTickets();
  const { visibleTicketsCount } = useSelector((state: RootState) => state.data);
  const sortedTickets = useSortedTickets(filteredTickets);

  return sortedTickets.slice(0, visibleTicketsCount);
};
