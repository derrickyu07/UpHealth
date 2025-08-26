// src/features/profile/api/profileApi.ts
import { UserProfile } from '../types';
import api from '../../../lib/axios'

export const getProfile = async (): Promise<UserProfile> => {
  const res = await api.get('/profiles');
  return res.data;
};

export const updateProfile = async (payload: UserProfile): Promise<UserProfile> => {
  const res = await api.put('/profiles', payload);
  return res.data;
};
