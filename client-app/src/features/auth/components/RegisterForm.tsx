import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { registerUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(
      registerUser({ email, password, firstName, lastName })
    );
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <input
        value={firstName}
        onChange={(e) => setfirstName(e.target.value)}
        type="firstName"
        placeholder="First Name"
        required
      />
      <input
        value={lastName}
        onChange={(e) => setlastName(e.target.value)}
        type="lastName"
        placeholder="Last Name"
        required
      />
      <button type="submit">
        {status === 'loading' ? 'Logging in...' : 'Register'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}
