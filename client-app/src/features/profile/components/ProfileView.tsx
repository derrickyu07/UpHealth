// src/features/profile/components/ProfileView.tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchProfile } from '../stores/profileSlice';

export default function ProfileView() {
  const dispatch = useAppDispatch();
  const {
    data: profile,
    status,
    error,
  } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading profile...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!profile) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Your Profile</h2>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Age:</strong> {profile.age}
      </p>
      <p>
        <strong>Medical History:</strong> {profile.medicalHistory}
      </p>
      <p>
        <strong>Preferred Providers:</strong> {profile.preferredProviders}
      </p>
    </div>
  );
}
