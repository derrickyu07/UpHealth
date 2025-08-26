import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../api/authApi'; 
import { AuthUser, AuthState } from '../types';
import axios from 'axios';

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
  state.user = null;
  state.status = 'idle';
  state.error = null;
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
    } 
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
