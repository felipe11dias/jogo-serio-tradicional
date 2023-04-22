import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { logout, setUser } = userSlice.actions;

export default userSlice.reducer;