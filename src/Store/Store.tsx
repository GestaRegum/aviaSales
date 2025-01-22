import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../DataSlice/DataSlice';
import { fetchTickets } from '../API/API';

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: fetchTickets,
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
