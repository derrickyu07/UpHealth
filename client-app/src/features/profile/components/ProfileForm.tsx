// src/features/profile/components/ProfileForm.tsx
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { saveProfile } from '../stores/profileSlice';

export default function ProfileForm() {
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state) => state.profile);

  const [form, setForm] = useState({
    email: '',
    age: '',
    medicalHistory: '',
    preferredProviders: '',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        email: profile.email,
        age: String(profile.age),
        medicalHistory: profile.medicalHistory,
        preferredProviders: profile.preferredProviders,
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveProfile({ ...form, age: parseInt(form.age) }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border"
      />
      <input
        name="age"
        value={form.age}
        onChange={handleChange}
        placeholder="Age"
        className="w-full p-2 border"
      />
      <input
        name="medicalHistory"
        value={form.medicalHistory}
        onChange={handleChange}
        placeholder="Medical History"
        className="w-full p-2 border"
      />
      <input
        name="preferredProviders"
        value={form.preferredProviders}
        onChange={handleChange}
        placeholder="Preferred Providers"
        className="w-full p-2 border"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded">
        Save
      </button>
    </form>
  );
}
