import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchId, fetchTickets } from '../API';
import { DataState } from '../types';
import axios from 'axios';

export const getSearchId = createAsyncThunk('search/getSearchId', async () => {
  const response = await fetchSearchId();
  return response.data.searchId;
});

export const getTickets = createAsyncThunk(
  'tickets/getTickets',
  async (searchId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetchTickets(searchId);

      if (response.status !== 200) {
        throw new Error(`${response.status}`);
      }

      if (response.data.stop) {
        return response.data;
      }

      dispatch(getTickets(searchId));

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          console.warn('Ошибка 500. Повторяем запрос.');

          await dispatch(getTickets(searchId));

          return rejectWithValue('Ошибка сервера. Попробуем снова.');
        }

        return rejectWithValue(error.message || 'Неизвестная ошибка');
      }

      return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
  }
);

const initialState: DataState = {
  searchId: '',
  tickets: [],
  loading: false,
  stop: false,
  error: null,
  filters: ['ALL'],
  visibleTicketsCount: 5,
  priceFilter: 'CHEAP',
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setStop: (state, action) => {
      state.stop = action.payload;
    },

    setFilters: (state, action) => {
      const filters = action.payload;
      if (filters.includes('ALL')) {
        state.filters = ['ALL'];
      } else {
        state.filters = filters;
      }
    },

    increaseVisibleTickets: (state) => {
      state.visibleTicketsCount += 5;
    },

    setPriceFilter: (state, action) => {
      const price = action.payload;
      if (price === 'CHEAP') {
        state.priceFilter = 'CHEAP';
        state.visibleTicketsCount = 5;
      }
      if (price === 'FAST') {
        state.priceFilter = 'FAST';
        state.visibleTicketsCount = 5;
      }
      if (price === 'OPTIMAL') {
        state.priceFilter = 'OPTIMAL';
        state.visibleTicketsCount = 5;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchId.fulfilled, (state, action) => {
        state.loading = false;
        state.searchId = action.payload;
      })
      .addCase(getSearchId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.loading = false;

        if (action.payload.stop) {
          state.stop = true;
        }
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setStop, setFilters, increaseVisibleTickets, setPriceFilter } = dataSlice.actions;

export default dataSlice.reducer;
