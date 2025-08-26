// src/features/profile/types/index.ts
export interface UserProfile {
  email: string;
  age: number;
  medicalHistory: string;
  preferredProviders: string;
}

export interface ProfileState {
  data: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
