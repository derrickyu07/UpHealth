// src/features/vaccinations/components/VaccinationList.tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchVaccinations } from '../stores/vaccinationSlice';
import VaccinationCard from './VaccinationCard';

export default function VaccinationList() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((s) => s.vaccinations);

  useEffect(() => {
    dispatch(fetchVaccinations());
  }, [dispatch]);

  return (
    <div className="space-y-2">
      {data.map((v) => (
        <VaccinationCard key={v.id} v={v} />
      ))}
    </div>
  );
}
