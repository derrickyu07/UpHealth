import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardState, Appointment, Vaccination, NewsArticle } from '../types';

const initialState: DashboardState = {
  appointments: [],
  vaccinations: [],
  news: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setAppointments(state, action: PayloadAction<Appointment[]>) {
      state.appointments = action.payload;
    },
    setVaccinations(state, action: PayloadAction<Vaccination[]>) {
      state.vaccinations = action.payload;
    },
    setNews(state, action: PayloadAction<NewsArticle[]>) {
      state.news = action.payload;
    },
  },
});

export const { setAppointments, setVaccinations, setNews } = dashboardSlice.actions;
export default dashboardSlice.reducer;
