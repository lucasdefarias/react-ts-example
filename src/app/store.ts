import { configureStore } from '@reduxjs/toolkit';
import currencyReducer, { CurrencyReducerType } from './currencySlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer
  },
});

export type RootState = { currency: CurrencyReducerType };