import axios from 'axios';

const urlSearchId = 'https://aviasales-test-api.kata.academy/search';
const urltickets = `https://aviasales-test-api.kata.academy/tickets?searchId=`;

export const fetchSearchId = () => {
  return axios.get(urlSearchId);
};

export const fetchTickets = (searchId: string) => {
  return axios.get(urltickets + searchId);
};
