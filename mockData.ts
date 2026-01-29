
import { Profile, Amenity, Booking, Announcement, AppSettings } from './types';

export const MOCK_ADMIN: Profile = {
  id: 'admin-1',
  email: 'admin@edificio.com',
  name: 'Admin Principal',
  unit: 'Admin',
  role: 'ADMIN'
};

export const MOCK_RESIDENT: Profile = {
  id: 'res-1',
  email: 'vecino@edificio.com',
  name: 'Juan Pérez',
  unit: '402-B',
  role: 'RESIDENT'
};

export const INITIAL_AMENITIES: Amenity[] = [
  { id: '1', name: 'Gimnasio', icon: '🏋️', capacity: 10 },
  { id: '2', name: 'Piscina', icon: '🏊', capacity: 20 },
  { id: '3', name: 'Salón Social', icon: '🎉', capacity: 50 },
  { id: '4', name: 'Parrilla', icon: '🍖', capacity: 8 },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'Mantenimiento de Ascensores',
    content: 'Se informa que el ascensor A estará fuera de servicio el lunes de 9am a 12pm.',
    author_id: 'admin-1',
    created_at: new Date().toISOString()
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    amenity_id: '1',
    user_id: 'res-1',
    booking_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time_slot: '08:00 - 09:00',
    status: 'confirmed'
  }
];

export const INITIAL_SETTINGS: AppSettings = {
  id: 1,
  booking_lead_time_days: 1
};
