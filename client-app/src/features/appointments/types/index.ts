export interface AppointmentSlot {
  id: string;
  date: string;
  time: string;
  provider: string;
  type: string;
  booked?: boolean;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  provider: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface AppointmentState {
  slots: AppointmentSlot[];
  bookings: Appointment[];
}

// What the API returns to the client
export interface AppointmentDto {
  id: number;
  date: string;        // ISO string serialized from DateTime
  time: string;        // "10:00 AM" (your API decides the format)
  provider: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

// What the client sends to create a new appointment
export interface CreateAppointmentDto {
  date: string;        // ISO string (e.g. '2025-08-01T10:00:00Z')
  time: string;
  provider: string;
  type: string;
  status?: 'upcoming'; // optional; backend can default
}
export {};


export {};
