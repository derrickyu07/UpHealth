import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { createVaccination } from '../stores/vaccinationSlice';

export default function VaccinationForm() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    vaccineName: '',
    dateAdministered: '',
    provider: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createVaccination(form));
    setForm({ vaccineName: '', dateAdministered: '', provider: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="vaccineName"
        value={form.vaccineName}
        onChange={handleChange}
        placeholder="Vaccine Name"
        className="w-full border p-2"
      />
      <input
        name="dateAdministered"
        type="date"
        value={form.dateAdministered}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <input
        name="provider"
        value={form.provider}
        onChange={handleChange}
        placeholder="Provider"
        className="w-full border p-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Vaccination
      </button>
    </form>
  );
}
