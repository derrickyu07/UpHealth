// src/features/auth/components/LogoutButton.tsx
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { logout } from '../stores/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
}
