export interface Ticket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета туда
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    },
    {
      // Код города (iata)
      origin: string;
      // Код города (iata)
      destination: string;
      // Дата и время вылета обратно
      date: string;
      // Массив кодов (iata) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    },
  ];
}

export interface TicketCardType {
  ticket: Ticket;
}

export interface DataState {
  searchId: string;
  tickets: Ticket[];
  loading: boolean;
  stop: boolean;
  error: string | null | undefined;
  filters: string[];
  visibleTicketsCount: number;
  priceFilter: Filter;
}

export const FILTER_CHECKBOXES = {
  ALL: 'ALL',
  ONE: 'ONE',
  TWO: 'TWO',
  THREE: 'THREE',
} as const;

export const FILTER = {
  CHEAP: 'CHEAP',
  FAST: 'FAST',
  OPTIMAL: 'OPTIMAL',
} as const;

export type FilterCheckbox = keyof typeof FILTER_CHECKBOXES;

export type Filter = keyof typeof FILTER;
