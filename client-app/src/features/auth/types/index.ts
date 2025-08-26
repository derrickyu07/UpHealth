export interface AuthUser {
  email: string;
  age: number;
  token?: string; // optional if you're planning JWT later
}

export interface AuthState {
  user: AuthUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
