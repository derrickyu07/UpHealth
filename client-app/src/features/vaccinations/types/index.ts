// export interface VaccinationDto {
//   id: number;
//   vaccineName: string;
//   dateAdministered: string;
//   provider: string;
// }

export interface CreateVaccinationDto {
  vaccineName: string;
  dateAdministered: string;
  provider: string;
}

export interface VaccinationDto {
  id?: number;                
  vaccineName: string;
  mandatory: boolean;
  recommendedAgeStart: number;
  recommendedAgeEnd: number;
  validityMonths: number;
  boosterIntervalMonths?: number | null;

  taken: boolean;               
  dateAdministered?: string;    
  provider?: string;            
  doseNumber?: number;          
}