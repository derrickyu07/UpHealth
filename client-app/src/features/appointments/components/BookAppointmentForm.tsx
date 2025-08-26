// src/features/appointments/components/BookAppointmentForm.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { createAppointment } from '../stores/appointmentSlice';
import type { CreateAppointmentDto } from '../types';

export default function BookAppointmentForm() {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<CreateAppointmentDto>({
    date: '',
    time: '',
    provider: '',
    type: '',
    status: 'upcoming',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You may want to combine date + time on the backend; for now we send both
    dispatch(createAppointment(form));
    setForm({ date: '', time: '', provider: '', type: '', status: 'upcoming' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded p-4 space-y-3">
      <h2 className="text-lg font-semibold">Book an Appointment</h2>

      <input
        name="date"
        type="datetime-local"
        value={form.date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="time"
        placeholder="Time (e.g. 10:00 AM)"
        value={form.time}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="provider"
        placeholder="Provider"
        value={form.provider}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="type"
        placeholder="Type (e.g. Dental)"
        value={form.type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded">
        Book
      </button>
    </form>
  );
}
