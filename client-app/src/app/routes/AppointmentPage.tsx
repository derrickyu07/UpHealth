// src/app/routes/AppointmentPage.tsx
import React from 'react';
import AppointmentList from '../../features/appointments/components/AppointmentList';
import BookAppointmentForm from '../../features/appointments/components/BookAppointmentForm';
import AppointmentHistory from '../../features/appointments/components/AppointmentHistory';

export default function AppointmentPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Book Your Appointment</h1>
      <AppointmentList />
      <BookAppointmentForm />
      <AppointmentHistory />
    </div>
  );
}
