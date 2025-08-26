import RegisterForm from '../../features/auth/components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
