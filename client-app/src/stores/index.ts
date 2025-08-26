import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/stores/authSlice';
import profileReducer from '../features/profile/stores/profileSlice';
import dashboardReducer from '../features/dashboard/stores/dashboardSlice'
import appointmentReducer from '../features/appointments/stores/appointmentSlice'
import vaccinationReducer from '../features/vaccinations/stores/vaccinationSlice'
import newsReducer from '../features/healthNews/stores/newsSlice'



export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    dashboard: dashboardReducer,
    appointments: appointmentReducer,
    vaccinations: vaccinationReducer,
    news: newsReducer,
  },
});
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
