import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks';
import { setAppointments } from '../stores/dashboardSlice';

export default function UpcomingAppointments() {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector((state) => state.dashboard.appointments);

  useEffect(() => {
    // Simulated fetch
    dispatch(
      setAppointments([
        { date: '2025-08-01', time: '10:00 AM', type: 'Dental Checkup' },
        { date: '2025-08-15', time: '2:30 PM', type: 'Eye Exam' },
      ])
    );
  }, [dispatch]);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
      {appointments.map((appt, index) => (
        <div key={index} className="border-b py-2">
          <p>{appt.type}</p>
          <p className="text-sm text-gray-600">
            {appt.date} at {appt.time}
          </p>
        </div>
      ))}
    </div>
  );
}
