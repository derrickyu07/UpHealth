// src/features/vaccinations/api/vaccinationApi.ts
import api from '../../../lib/axios';
import { VaccinationDto, CreateVaccinationDto} from '../types';

export const getVaccinations = async (): Promise<VaccinationDto[]> => {
  const res = await api.get('/vaccinations');
  return res.data;
};

export const addVaccination = async (dto: CreateVaccinationDto): Promise<VaccinationDto> => {
  const res = await api.post('/vaccinations', dto);
  return res.data;
};

// optional
export const updateVaccination = async (id: number, dto: CreateVaccinationDto): Promise<VaccinationDto> => {
  const res = await api.put(`/vaccinations/${id}`, dto);
  return res.data;
};

export const deleteVaccination = async (id: number): Promise<void> => {
  await api.delete(`/vaccinations/${id}`);
};

export const getAllVaccinationInformation = async ():Promise<VaccinationDto[]> => {
  const res = await api.get('/vaccinations/merged');
  return res.data;
}
