// src/features/appointments/stores/appointmentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getMyAppointments, bookAppointment, cancelAppointment, rescheduleAppointment } from '../api/appointmentApi';
import { AppointmentDto, CreateAppointmentDto } from '../types';

interface AppointmentState {
  list: AppointmentDto[];            // canonical list
  bookings: AppointmentDto[];        // kept in sync for legacy components
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initial: AppointmentState = {
  list: [],
  bookings: [],
  status: 'idle',
  error: null,
};

export const fetchAppointments = createAsyncThunk('appts/fetch', getMyAppointments);
export const createAppointment = createAsyncThunk('appts/create', (dto: CreateAppointmentDto) => bookAppointment(dto));
export const deleteAppointment = createAsyncThunk('appts/delete', async (id: number) => { await cancelAppointment(id); return id; });
export const updateAppointment = createAsyncThunk('appts/reschedule', async (p: { id: number; date: string; time: string }) => {
  return await rescheduleAppointment(p.id, { date: p.date, time: p.time });
});


const slice = createSlice({
  name: 'appointments',
  initialState: initial,
  reducers: {},
  extraReducers: (b) => {
    b
      // Load
      .addCase(fetchAppointments.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(fetchAppointments.fulfilled, (s, a: PayloadAction<AppointmentDto[]>) => {
        s.status = 'succeeded';
        s.list = a.payload;
        s.bookings = a.payload; // keep in sync
      })
      .addCase(fetchAppointments.rejected, (s, a) => {
        s.status = 'failed';
        s.error = a.error.message ?? 'Failed to fetch';
      })

      // Create
      .addCase(createAppointment.fulfilled, (s, a: PayloadAction<AppointmentDto>) => {
        s.list.push(a.payload);
        s.bookings.push(a.payload);
      })

      // Delete
      .addCase(deleteAppointment.fulfilled, (s, a: PayloadAction<number>) => {
        s.list = s.list.filter((x) => x.id !== a.payload);
        s.bookings = s.bookings.filter((x) => x.id !== a.payload);
      })

      // Update (reschedule)
      .addCase(updateAppointment.fulfilled, (s, a: PayloadAction<AppointmentDto>) => {
        const replace = (arr: AppointmentDto[]) => {
          const i = arr.findIndex((x) => x.id === a.payload.id);
          if (i >= 0) arr[i] = a.payload;
        };
        replace(s.list);
        replace(s.bookings);
      });
  },
});

export default slice.reducer;

// Optional selectors (start migrating components to these)
export const selectAppointments = (state: any) => state.appointments.list;
export const selectBookings = (state: any) => state.appointments.bookings;
export const selectAppointmentsStatus = (state: any) => state.appointments.status;
export const selectAppointmentsError = (state: any) => state.appointments.error;
