import { useState } from 'react';
import { VaccinationDto } from '../types';
import VaccinationDialog from './VaccinationDialog';

export default function VaccinationCard({ v }: { v: VaccinationDto }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function formatDate(d?: string) {
    if (!d) return '—';
    const dt = new Date(d);
    return isNaN(dt.getTime()) ? '—' : dt.toLocaleDateString();
  }
  function getExpirationStatus(
    dateAdministered?: string,
    validityMonths?: number
  ) {
    if (!dateAdministered || validityMonths === undefined) return 'None';

    const administeredDate = new Date(dateAdministered);
    const expirationDate = new Date(administeredDate);
    expirationDate.setMonth(expirationDate.getMonth() + validityMonths);
    const now = new Date();
    if (expirationDate < now) return 'Expired';
    const diffInDays = Math.ceil(
      (expirationDate.getTime() - now.getTime()) / (1000 * 3600 * 24)
    );

    if (diffInDays <= 30) return 'Expires soon';
    return expirationDate.toLocaleDateString();
  }

  return (
    <>
      <article
        aria-label={`${v.vaccineName}`}
        className="max-w-sm bg-white rounded-xl p-6 border border-gray-200">
        <header className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">{v.vaccineName}</h3>
          <p className="test-sm text-gray-500">Vaccine Information Card</p>
        </header>
        <dl className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <dt className="font-medium">Date Administered</dt>
            <dd>{formatDate(v.dateAdministered)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium">Provider</dt>
            <dd>{v.provider || '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium">Expires</dt>
            <dd>{getExpirationStatus(v.dateAdministered, v.validityMonths)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium">Booster Interval</dt>
            <dd>
              {v.boosterIntervalMonths !== null
                ? `${v.boosterIntervalMonths} months`
                : 'None'}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium"> Mandatory</dt>
            <dd>{v.mandatory ? 'Yes' : 'No'}</dd>
          </div>
        </dl>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Update
        </button>
      </article>
      {isDialogOpen && (
        <VaccinationDialog
          vaccineName={v.vaccineName}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
}
