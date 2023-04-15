import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Auth } from "../types/Auth";

interface AuthState {
  auth: Auth | null;
}

const initialState: AuthState = {
  auth: JSON.parse(localStorage.getItem('auth') ?? "") as Auth | null,
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    logout: () => {
      return initialState
    },
    setAuth: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload;
    },
  },
});

export const { logout, setAuth } = authSlice.actions;

export default authSlice.reducer;