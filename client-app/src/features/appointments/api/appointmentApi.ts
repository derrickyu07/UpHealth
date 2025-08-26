// src/features/appointments/api/appointmentApi.ts
import api from '../../../lib/axios';
import { AppointmentDto, CreateAppointmentDto } from '../types';

export const getMyAppointments = async (): Promise<AppointmentDto[]> => {
  const res = await api.get('/appointments'); // GET api/appointments (for current user)
  return res.data;
};

export const bookAppointment = async (dto: CreateAppointmentDto): Promise<AppointmentDto> => {
  const res = await api.post('/appointments', dto); // POST api/appointments
  return res.data;
};

// Optional:
export const cancelAppointment = async (id: number): Promise<void> => {
  await api.delete(`/appointments/${id}`); // DELETE api/appointments/{id}
};
export const rescheduleAppointment = async (id: number, body: { date: string; time: string }): Promise<AppointmentDto> => {
  const res = await api.put(`/appointments/${id}/reschedule`, body); // your route
  return res.data;
};
