import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from './operations';

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => state)
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.rejected, state => state)
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, state => {
        state.user = {};
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = AuthSlice.reducer;
