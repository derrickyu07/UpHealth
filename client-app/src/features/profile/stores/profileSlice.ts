// src/features/profile/stores/profileSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProfile, updateProfile } from '../api/profileApi';
import { UserProfile } from '../types';

interface ProfileState {
  data: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
const initialState: ProfileState = { data: null, status: 'idle', error: null };

export const fetchProfile = createAsyncThunk('profile/fetch', getProfile);
export const saveProfile = createAsyncThunk('profile/save', updateProfile);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, s => { s.status = 'loading'; s.error = null; })
      .addCase(fetchProfile.fulfilled, (s, a: PayloadAction<UserProfile>) => { s.status = 'succeeded'; s.data = a.payload; })
      .addCase(fetchProfile.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message ?? 'Failed to load profile'; })
      .addCase(saveProfile.fulfilled, (s, a: PayloadAction<UserProfile>) => { s.data = a.payload; });
  }
});
export default profileSlice.reducer;
