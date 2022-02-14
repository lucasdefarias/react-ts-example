import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    selectedCurrencyCode: 'eur',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateSelected: (state, action: PayloadAction<string>) => {
      state.selectedCurrencyCode = action.payload;
    },
  },
});

export const { updateSelected } = currencySlice.actions;

export default currencySlice.reducer;

export type CurrencyReducerType = { selectedCurrencyCode: string };

