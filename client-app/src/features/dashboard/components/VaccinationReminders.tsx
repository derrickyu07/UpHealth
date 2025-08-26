// src/features/dashboard/components/VaccinationReminders.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setVaccinations } from '../stores/dashboardSlice';

export default function VaccinationReminders() {
  const dispatch = useAppDispatch();
  const vaccinations = useAppSelector((state) => state.dashboard.vaccinations);

  useEffect(() => {
    // Mock vaccination data
    dispatch(
      setVaccinations([
        { name: 'Flu Shot', dueDate: '2025-08-10' },
        { name: 'COVID-19 Booster', dueDate: '2025-09-01' },
      ])
    );
  }, [dispatch]);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-2">Vaccination Reminders</h2>
      {vaccinations.map((vaccine, index) => (
        <div key={index} className="border-b py-2">
          <p>{vaccine.name}</p>
          <p className="text-sm text-red-600">Due: {vaccine.dueDate}</p>
        </div>
      ))}
    </div>
  );
}
