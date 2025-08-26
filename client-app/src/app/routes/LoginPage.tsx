// src/app/routes/LoginPage.tsx
import { Link } from 'react-router-dom';
import LoginForm from '../../features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow space-y-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm />
      <div className="text-center text-gray-600">or</div>
      <Link
        to="/register"
        className="inline-block text-blue-600 hover:underline mt-2">
        Create an account
      </Link>
    </div>
  );
};

export default LoginPage;
