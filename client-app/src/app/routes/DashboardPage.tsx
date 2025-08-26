// src/app/routes/DashboardPage.tsx
import React from 'react';
import HealthNews from '../../features/dashboard/components/HealthNews';
import VaccinationReminders from '../../features/dashboard/components/VaccinationReminders';
import UpcomingAppointments from '../../features/dashboard/components/UpcomingAppointments';
import LogoutButton from '../../features/auth/components/LogoutButton';
import HealthNewsCarousel from '../../features/dashboard/components/HealthNewsCarousel';

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Your Health Dashboard</h1>
      <UpcomingAppointments />
      <VaccinationReminders />
      {/* <HealthNewsCarousel maxItems={2} /> */}
      <HealthNews />
      <LogoutButton />
    </div>
  );
}
