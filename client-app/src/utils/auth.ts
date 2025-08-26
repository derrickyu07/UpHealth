// src/utils/auth.ts
import { jwtDecode } from 'jwt-decode';

export function isTokenValid(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; 

    return decoded.exp && decoded.exp > currentTime;
  } catch (e) {
    return false;
  }
}
