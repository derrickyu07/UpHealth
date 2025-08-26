import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUser } from '../types';
import { jwtDecode } from 'jwt-decode';
import api from '../../../lib/axios';  // Import the custom Axios instance

// Create async thunk for logging in the user
export const loginUser = createAsyncThunk<AuthUser, { email: string; password: string }>(
  'auth/login',
  async (payload, thunkAPI) => {
    try {
      const response = await api.post('auth/login', payload); 

      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return jwtDecode<AuthUser>(token);
      } else {
        return thunkAPI.rejectWithValue('No token received');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);


export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const registerUser = createAsyncThunk<void, RegisterPayload>(
  'auth/register',
  async (payload, thunkAPI) => {
    try {
      await api.post('auth/register', payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);



