import { useAppDispatch } from '../../../hooks/reduxHooks';
import React, { useState } from 'react';
import { createVaccination } from '../stores/vaccinationSlice';

interface Props {
  vaccineName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VaccinationDialog({
  vaccineName,
  isOpen,
  onClose,
}: Props) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    dateAdministered: '',
    provider: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createVaccination({ vaccineName, ...form }));
    setForm({ dateAdministered: '', provider: '' });
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl w-80">
        <h3 className="text-lg font-semibold mb-4">{vaccineName}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="dateAdministered"
            type="date"
            value={form.dateAdministered}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="provider"
            value={form.provider}
            onChange={handleChange}
            placeholder="Provider"
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
