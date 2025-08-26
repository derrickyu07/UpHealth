import React from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';

export default function AppointmentHistory() {
  const bookings = useAppSelector((state) => state.appointments.bookings);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-2">Appointment History</h2>
      {bookings.length === 0 ? (
        <p className="text-sm text-gray-500">No appointments booked yet.</p>
      ) : (
        bookings.map((appt) => (
          <div key={appt.id} className="border-b py-2">
            <p>
              {appt.date} at {appt.time} with {appt.provider} ({appt.type})
            </p>
            <p className="text-sm text-gray-600">Status: {appt.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
