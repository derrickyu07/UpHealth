import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import DashboardPage from './routes/DashboardPage';
import ProfilePage from './routes/ProfilePage';
import VaccinationPage from './routes/VaccinationPage';
import ProtectedRoute from './routes/ProtectedRoute';
import AppointmentPage from './routes/AppointmentPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: (
      // <ProtectedRoute>
      <DashboardPage />
      // </ProtectedRoute>
    ), // in real use, wrap this with a PrivateRoute
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ), // Ensure ProfilePage is imported from the correct path
  },
  {
    path: '/appointments',
    element: (
      <ProtectedRoute>
        <AppointmentPage />
      </ProtectedRoute>
    ), // Ensure ProfilePage is imported from the correct path
  },
  {
    path: '/vaccinations',
    element: (
      <ProtectedRoute>
        <VaccinationPage />
      </ProtectedRoute>
    ), // Ensure ProfilePage is imported from the correct path
  },
]);

export default router;
