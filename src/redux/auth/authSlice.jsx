import { createSlice } from '@reduxjs/toolkit';
import { register } from './operations';

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const authReducer = AuthSlice.reducer;
