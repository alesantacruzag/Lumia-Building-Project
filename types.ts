
export type UserRole = 'ADMIN' | 'RESIDENT';

export interface Profile {
  id: string;
  email: string;
  name: string;
  unit: string;
  role: UserRole;
  created_at?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  capacity: number;
  created_at?: string;
}

export interface Booking {
  id: string;
  amenity_id: string;
  user_id: string;
  booking_date: string; // ISO Date YYYY-MM-DD
  time_slot: string;
  status: 'confirmed' | 'cancelled';
  created_at?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
}

export interface AppSettings {
  id: number;
  booking_lead_time_days: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
