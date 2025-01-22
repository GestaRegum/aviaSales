import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { Ticket } from "../types";

export const useSortedTickets = (filteredTickets: Ticket[]) => {
    const { priceFilter } = useSelector((state: RootState) => state.data);
  
    return [...filteredTickets].sort((a: Ticket, b: Ticket) => {
      if (priceFilter === 'CHEAP') {
        return a.price - b.price;
      }
      if (priceFilter === 'FAST') {
        return a.segments[0].duration - b.segments[0].duration;
      }
      if (priceFilter === 'OPTIMAL') {
        return (a.segments[0].duration / a.price) - (b.segments[0].duration / b.price);
      }
      return 0;
    });
  };