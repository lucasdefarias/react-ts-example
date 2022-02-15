import { configureStore } from '@reduxjs/toolkit';
import currencyReducer, { CurrencyReducerType } from './currencySlice';
import userReducer, { UserReducerType } from './userSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    user: userReducer,
  },
});

export type RootState = { currency: CurrencyReducerType, user: UserReducerType };