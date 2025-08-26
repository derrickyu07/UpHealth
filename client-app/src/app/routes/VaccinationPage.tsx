import VaccinationList from '../../features/vaccinations/components/VaccinationList';
import VaccinationForm from '../../features/vaccinations/components/VaccinationForm';

export default function VaccinationPage() {
  return (
    <div className="space-y-6">
      <VaccinationForm />
      <VaccinationList />
    </div>
  );
}
