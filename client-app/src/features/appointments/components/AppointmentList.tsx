// src/features/appointments/components/AppointmentList.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchAppointments } from '../stores/appointmentSlice';
import type { AppointmentDto } from '../types';

export default function AppointmentList() {
  const dispatch = useAppDispatch();
  const slots = useAppSelector((state) => state.appointments.list);
  const status = useAppSelector((state) => state.appointments.status);
  const error = useAppSelector((state) => state.appointments.error);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading appointments…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!slots.length)
    return <p className="text-gray-500">No appointments found.</p>;

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">Available Appointments</h2>
      {slots.map((slot: AppointmentDto) => (
        <div key={slot.id} className="border-b py-2 flex justify-between">
          <span>
            {new Date(slot.date).toLocaleString()} with {slot.provider} (
            {slot.type})
          </span>
          <span className="text-sm text-gray-500">{slot.status}</span>
        </div>
      ))}
    </div>
  );
}
