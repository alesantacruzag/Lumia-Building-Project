
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Amenity, Booking, Announcement, AppSettings, ToastMessage } from '../types';
import { MOCK_ADMIN, MOCK_RESIDENT, INITIAL_AMENITIES, INITIAL_ANNOUNCEMENTS, INITIAL_BOOKINGS, INITIAL_SETTINGS } from '../mockData';

interface AppContextType {
  user: Profile | null;
  login: (email: string) => void;
  logout: () => void;
  amenities: Amenity[];
  addAmenity: (a: Omit<Amenity, 'id'>) => void;
  updateAmenity: (a: Amenity) => void;
  deleteAmenity: (id: string) => void;
  bookings: Booking[];
  addBooking: (b: Omit<Booking, 'id'>) => void;
  cancelBooking: (id: string) => void;
  announcements: Announcement[];
  addAnnouncement: (a: Omit<Announcement, 'id' | 'created_at'>) => void;
  settings: AppSettings;
  updateSettings: (days: number) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  residents: Profile[];
  bulkAddResidents: (data: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [amenities, setAmenities] = useState<Amenity[]>(INITIAL_AMENITIES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [residents, setResidents] = useState<Profile[]>([MOCK_RESIDENT]);

  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const login = (email: string) => {
    if (email === MOCK_ADMIN.email) {
      setUser(MOCK_ADMIN);
      addToast('Bienvenido Administrador', 'success');
    } else if (email === MOCK_RESIDENT.email) {
      setUser(MOCK_RESIDENT);
      addToast('Bienvenido Residente', 'success');
    } else {
      addToast('Usuario no encontrado', 'error');
    }
  };

  const logout = () => {
    setUser(null);
    addToast('Sesión cerrada', 'info');
  };

  const addAmenity = (a: Omit<Amenity, 'id'>) => {
    setAmenities(prev => [...prev, { ...a, id: Math.random().toString() }]);
    addToast('Espacio creado con éxito', 'success');
  };

  const updateAmenity = (a: Amenity) => {
    setAmenities(prev => prev.map(item => item.id === a.id ? a : item));
    addToast('Espacio actualizado', 'success');
  };

  const deleteAmenity = (id: string) => {
    setAmenities(prev => prev.filter(item => item.id !== id));
    addToast('Espacio eliminado', 'success');
  };

  const addBooking = (b: Omit<Booking, 'id'>) => {
    setBookings(prev => [...prev, { ...b, id: Math.random().toString(), status: 'confirmed' }]);
    addToast('Reserva confirmada', 'success');
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b));
    addToast('Reserva cancelada', 'info');
  };

  const addAnnouncement = (a: Omit<Announcement, 'id' | 'created_at'>) => {
    setAnnouncements(prev => [
      { ...a, id: Math.random().toString(), created_at: new Date().toISOString() },
      ...prev
    ]);
    addToast('Anuncio publicado', 'success');
  };

  const updateSettings = (days: number) => {
    setSettings(prev => ({ ...prev, booking_lead_time_days: days }));
    addToast('Configuración actualizada', 'success');
  };

  const bulkAddResidents = (data: string) => {
    const lines = data.split('\n');
    const newResidents: Profile[] = lines.filter(l => l.trim()).map(line => {
      const [name, unit, email] = line.split(',').map(s => s.trim());
      return {
        id: Math.random().toString(),
        name: name || 'Residente',
        unit: unit || 'Unknown',
        email: email || `res${Math.random()}@mail.com`,
        role: 'RESIDENT'
      };
    });
    setResidents(prev => [...prev, ...newResidents]);
    addToast(`${newResidents.length} residentes agregados`, 'success');
  };

  return (
    <AppContext.Provider value={{
      user, login, logout, amenities, addAmenity, updateAmenity, deleteAmenity,
      bookings, addBooking, cancelBooking, announcements, addAnnouncement,
      settings, updateSettings, toasts, addToast, removeToast, residents, bulkAddResidents
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
