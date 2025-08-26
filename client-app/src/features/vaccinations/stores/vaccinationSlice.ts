// src/features/vaccinations/stores/vaccinationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getVaccinations, addVaccination, updateVaccination, deleteVaccination, getAllVaccinationInformation } from '../api/vaccinationApi';
import { VaccinationDto, CreateVaccinationDto } from '../types';

interface VaxState {
  data: VaccinationDto[];
  status: 'idle'|'loading'|'succeeded'|'failed';
  error: string|null;
}
const initial: VaxState = { data: [], status:'idle', error:null };

export const fetchVaccinations = createAsyncThunk('vax/fetch', getAllVaccinationInformation);
export const createVaccination = createAsyncThunk('vax/create', (dto: CreateVaccinationDto) => addVaccination(dto));
export const saveVaccination = createAsyncThunk('vax/update', (p: {id:number; dto:CreateVaccinationDto}) => updateVaccination(p.id, p.dto));
export const removeVaccination = createAsyncThunk('vax/delete', async (id:number) => { await deleteVaccination(id); return id; });

const slice = createSlice({
  name: 'vaccinations',
  initialState: initial,
  reducers: {},
  extraReducers(b){
    b.addCase(fetchVaccinations.pending, s => { s.status='loading'; s.error=null; })
     .addCase(fetchVaccinations.fulfilled, (s,a:PayloadAction<VaccinationDto[]>) => { s.status='succeeded'; s.data=a.payload; })
     .addCase(fetchVaccinations.rejected, (s,a) => { s.status='failed'; s.error=a.error.message ?? 'Failed to fetch'; })

     .addCase(createVaccination.fulfilled, (s,a:PayloadAction<VaccinationDto>) => { s.data.push(a.payload); })
     .addCase(saveVaccination.fulfilled, (s,a:PayloadAction<VaccinationDto>) => {
        const i = s.data.findIndex(x=>x.id===a.payload.id);
        if (i>=0) s.data[i]=a.payload;
     })
     .addCase(removeVaccination.fulfilled, (s,a:PayloadAction<number>) => {
        s.data = s.data.filter(x => x.id !== a.payload);
     });
  }
});
export default slice.reducer;
