// src/app/routes/ProfilePage.tsx
import ProfileForm from '../../features/profile/components/ProfileForm';
import ProfileView from '../../features/profile/components/ProfileView';

import React from 'react';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      <ProfileView />
      <hr />
      <ProfileForm />
    </div>
  );
}
