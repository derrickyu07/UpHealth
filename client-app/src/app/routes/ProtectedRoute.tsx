// src/app/routes/ProtectedRoute.tsx
import { isTokenValid } from '../../utils/auth';
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected page
  return children;
}
