import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../useAuth';

export const userSlice = createSlice({
  name: 'user',
  initialState: { loggedUser: {} },
  reducers: {
    saveUser: (state, action: PayloadAction<User | null>) => {
      state.loggedUser = action.payload!;
    },
  },
});

export const { saveUser } = userSlice.actions;

export default userSlice.reducer;

export type UserReducerType = { loggedUser?: User | null };

