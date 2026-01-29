
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar as CalendarIcon, Clock, CheckCircle2, XCircle, Megaphone, Plus } from 'lucide-react';
import { Amenity } from '../types';
import { Calendar } from '../components/Calendar';

const TIME_SLOTS = [
  '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
  '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
  '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00',
  '20:00 - 21:00', '21:00 - 22:00'
];

export const ResidentDashboard: React.FC<{ view: string }> = ({ view }) => {
  const { 
    user, amenities, bookings, addBooking, cancelBooking, 
    announcements, settings 
  } = useAppContext();

  const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + settings.booking_lead_time_days);
    return d.toISOString().split('T')[0];
  });
  
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const minBookingDate = new Date();
  minBookingDate.setDate(minBookingDate.getDate() + settings.booking_lead_time_days);
  const minBookingDateStr = minBookingDate.toISOString().split('T')[0];

  const handleCreateBooking = () => {
    if (!selectedAmenity || !selectedSlot || !user) return;
    
    // Check if already booked
    const isTaken = bookings.some(b => 
      b.amenity_id === selectedAmenity.id && 
      b.booking_date === bookingDate && 
      b.time_slot === selectedSlot && 
      b.status === 'confirmed'
    );

    if (isTaken) return alert('Este horario ya está reservado');

    addBooking({
      amenity_id: selectedAmenity.id,
      user_id: user.id,
      booking_date: bookingDate,
      time_slot: selectedSlot,
      status: 'confirmed'
    });

    setSelectedSlot(null);
    setSelectedAmenity(null);
  };

  const myBookings = bookings.filter(b => b.user_id === user?.id).reverse();

  if (view === 'my-bookings') {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-white">Mis Reservas</h2>
        <div className="space-y-4">
          {myBookings.length === 0 ? (
            <div className="bg-slate-950/40 border border-slate-800 p-12 rounded-3xl flex flex-col items-center justify-center text-slate-500 text-center">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                <CalendarIcon size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">Sin reservas aún</h3>
              <p className="max-w-xs">¡Empieza a disfrutar de los espacios comunes del edificio hoy mismo!</p>
            </div>
          ) : (
            myBookings.map(b => {
              const am = amenities.find(a => a.id === b.amenity_id);
              const isPast = new Date(b.booking_date) < new Date();
              return (
                <div key={b.id} className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl">
                      {am?.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-100">{am?.name}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                        <span className="flex items-center gap-1"><CalendarIcon size={14} className="text-sky-500" /> {new Date(b.booking_date + 'T00:00:00').toLocaleDateString('es-ES', { dateStyle: 'long' })}</span>
                        <span className="flex items-center gap-1"><Clock size={14} className="text-sky-500" /> {b.time_slot}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                      b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {b.status}
                    </span>
                    {b.status === 'confirmed' && !isPast && (
                      <button 
                        onClick={() => cancelBooking(b.id)}
                        className="text-slate-400 hover:text-rose-400 p-2 hover:bg-rose-400/10 rounded-xl transition-all"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  if (view === 'notifications') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-white">Notificaciones</h2>
        <div className="space-y-4">
          {announcements.map(a => (
            <div key={a.id} className="bg-slate-950/40 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500"></div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-white">{a.title}</h3>
                <Megaphone size={20} className="text-sky-500" />
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">{a.content}</p>
              <span className="text-xs text-slate-600 font-medium">{new Date(a.created_at).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Booking Flow
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {!selectedAmenity ? (
        <section className="space-y-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-white">¿Qué quieres reservar hoy?</h2>
            <p className="text-slate-400 text-lg">Selecciona uno de los espacios comunes disponibles en el edificio.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map(a => (
              <button 
                key={a.id}
                onClick={() => setSelectedAmenity(a)}
                className="group bg-slate-950/40 border border-slate-800 p-8 rounded-[2rem] text-left hover:border-sky-500/50 hover:bg-sky-500/5 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="text-sky-500" />
                </div>
                <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform">{a.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{a.name}</h3>
                <p className="text-slate-500 text-sm">Hasta {a.capacity} personas</p>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in zoom-in duration-300">
          <div className="lg:col-span-12 flex items-center gap-4 mb-4">
            <button 
              onClick={() => { setSelectedAmenity(null); setSelectedSlot(null); }}
              className="text-sky-500 hover:underline font-medium flex items-center gap-2"
            >
              ← Volver a espacios
            </button>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              Reserva de <span className="text-sky-400">{selectedAmenity.name}</span> {selectedAmenity.icon}
            </h2>
          </div>

          <div className="lg:col-span-5 bg-slate-950/40 border border-slate-800 p-6 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-slate-100 px-2">1. Selecciona el día</h3>
            <Calendar 
              onDateSelect={setBookingDate}
              selectedDate={bookingDate}
              minDate={minBookingDateStr}
            />
            {bookingDate === minBookingDateStr && settings.booking_lead_time_days > 0 && (
              <p className="text-xs text-amber-400/80 px-2">Nota: Se requiere una antelación mínima de {settings.booking_lead_time_days} {settings.booking_lead_time_days === 1 ? 'día' : 'días'}.</p>
            )}
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-950/40 border border-slate-800 p-8 rounded-3xl flex flex-col min-h-[500px]">
              <h3 className="text-xl font-bold text-slate-100 mb-6 px-2">2. Selecciona el horario</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {TIME_SLOTS.map(slot => {
                  const isTaken = bookings.some(b => 
                    b.amenity_id === selectedAmenity.id && 
                    b.booking_date === bookingDate && 
                    b.time_slot === slot && 
                    b.status === 'confirmed'
                  );
                  const isSelected = selectedSlot === slot;
                  
                  return (
                    <button
                      key={slot}
                      disabled={isTaken}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isTaken 
                          ? 'bg-slate-900/50 border-slate-800/50 opacity-40 cursor-not-allowed' 
                          : isSelected
                            ? 'bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/20'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <span className="font-medium text-sm">{slot}</span>
                      {isTaken ? <XCircle size={16} /> : isSelected ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border border-slate-700"></div>}
                    </button>
                  );
                })}
              </div>

              {selectedSlot && (
                <div className="mt-auto pt-6 border-t border-slate-800 flex items-center justify-between animate-in slide-in-from-bottom-4">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Resumen</p>
                    <p className="text-lg text-white font-bold">{new Date(bookingDate + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</p>
                    <p className="text-sm text-sky-400 font-medium">{selectedSlot}</p>
                  </div>
                  <button 
                    onClick={handleCreateBooking}
                    className="px-10 py-4 bg-sky-500 hover:bg-sky-600 text-white font-extrabold rounded-2xl transition-all shadow-xl shadow-sky-500/30 active:scale-95"
                  >
                    Confirmar Reserva
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
