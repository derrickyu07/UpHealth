export interface Appointment {
  date: string;
  time: string;
  type: string;
}

export interface Vaccination {
  name: string;
  dueDate: string;
}

export interface NewsArticle {
  title: string;
  summary: string;
}

export interface DashboardState {
  appointments: Appointment[];
  vaccinations: Vaccination[];
  news: NewsArticle[];
}
