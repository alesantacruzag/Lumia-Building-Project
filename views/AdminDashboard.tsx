
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Edit2, Trash2, Megaphone, Users, Calendar as CalendarIcon, Save, Settings } from 'lucide-react';
import { Amenity } from '../types';
import { Calendar } from '../components/Calendar';

export const AdminDashboard: React.FC<{ view: string }> = ({ view }) => {
  const { 
    amenities, addAmenity, updateAmenity, deleteAmenity,
    residents, bulkAddResidents, 
    announcements, addAnnouncement,
    bookings, cancelBooking,
    settings, updateSettings
  } = useAppContext();

  // Modal / Form States
  const [editingAmenity, setEditingAmenity] = useState<Amenity | null>(null);
  const [newAmenity, setNewAmenity] = useState({ name: '', icon: '🏢', capacity: 10 });
  const [isAddingAmenity, setIsAddingAmenity] = useState(false);
  
  const [bulkList, setBulkList] = useState('');
  const [announcementForm, setAnnouncementForm] = useState({ title: '', content: '' });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddAmenity = () => {
    if (!newAmenity.name) return;
    addAmenity(newAmenity);
    setNewAmenity({ name: '', icon: '🏢', capacity: 10 });
    setIsAddingAmenity(false);
  };

  const handleUpdateAmenity = () => {
    if (editingAmenity) {
      updateAmenity(editingAmenity);
      setEditingAmenity(null);
    }
  };

  const handleAddAnnouncement = () => {
    if (!announcementForm.title || !announcementForm.content) return;
    addAnnouncement({ ...announcementForm, author_id: 'admin-1' });
    setAnnouncementForm({ title: '', content: '' });
  };

  if (view === 'amenities') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Gestión de Amenities</h2>
          <button 
            onClick={() => setIsAddingAmenity(true)}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl text-white font-medium transition-colors shadow-lg shadow-sky-500/20"
          >
            <Plus size={20} /> Nuevo Espacio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map(a => (
            <div key={a.id} className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{a.icon}</div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingAmenity(a)} className="p-2 text-slate-400 hover:text-sky-400 bg-slate-800 rounded-lg">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteAmenity(a.id)} className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-1">{a.name}</h3>
              <p className="text-slate-400 text-sm">Capacidad: {a.capacity} personas</p>
            </div>
          ))}
        </div>

        {(isAddingAmenity || editingAmenity) && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-6 animate-in zoom-in duration-300">
              <h3 className="text-2xl font-bold text-white">
                {editingAmenity ? 'Editar Espacio' : 'Nuevo Espacio'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Nombre</label>
                  <input 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                    value={editingAmenity ? editingAmenity.name : newAmenity.name}
                    onChange={e => editingAmenity 
                      ? setEditingAmenity({...editingAmenity, name: e.target.value})
                      : setNewAmenity({...newAmenity, name: e.target.value})
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Icono</label>
                    <input 
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                      value={editingAmenity ? editingAmenity.icon : newAmenity.icon}
                      onChange={e => editingAmenity 
                        ? setEditingAmenity({...editingAmenity, icon: e.target.value})
                        : setNewAmenity({...newAmenity, icon: e.target.value})
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Capacidad</label>
                    <input 
                      type="number"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                      value={editingAmenity ? editingAmenity.capacity : newAmenity.capacity}
                      onChange={e => editingAmenity 
                        ? setEditingAmenity({...editingAmenity, capacity: parseInt(e.target.value)})
                        : setNewAmenity({...newAmenity, capacity: parseInt(e.target.value)})
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => { setIsAddingAmenity(false); setEditingAmenity(null); }}
                  className="flex-1 px-4 py-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={editingAmenity ? handleUpdateAmenity : handleAddAmenity}
                  className="flex-1 px-4 py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors"
                >
                  {editingAmenity ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === 'residents') {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-white">Gestión de Residentes</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-950/40 border border-slate-800 p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Plus className="text-sky-500" /> Carga Masiva
            </h3>
            <p className="text-slate-400 text-sm">Pega una lista con formato: <code className="bg-slate-800 px-1 rounded text-sky-400">Nombre, Unidad, Email</code> (una por línea)</p>
            <textarea 
              className="w-full h-48 bg-slate-900 border border-slate-800 rounded-2xl p-4 text-slate-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              placeholder="Juan Pérez, 402, juan@mail.com&#10;Maria Lopez, 101, maria@mail.com"
              value={bulkList}
              onChange={e => setBulkList(e.target.value)}
            />
            <button 
              onClick={() => { bulkAddResidents(bulkList); setBulkList(''); }}
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-500/20"
            >
              Procesar Lista
            </button>
          </div>

          <div className="bg-slate-950/40 border border-slate-800 rounded-3xl overflow-hidden flex flex-col">
            <h3 className="text-xl font-bold text-slate-100 p-8 pb-4">Directorio ({residents.length})</h3>
            <div className="flex-1 overflow-y-auto max-h-[400px] px-8 pb-8 no-scrollbar">
              <table className="w-full">
                <thead className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider sticky top-0 bg-slate-950/40 backdrop-blur pb-4">
                  <tr>
                    <th className="py-3">Nombre</th>
                    <th className="py-3">Unidad</th>
                    <th className="py-3">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {residents.map(r => (
                    <tr key={r.id}>
                      <td className="py-4 text-slate-200 font-medium">{r.name}</td>
                      <td className="py-4 text-slate-400">{r.unit}</td>
                      <td className="py-4 text-slate-400 text-sm">{r.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'announcements') {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-white">Centro de Comunicaciones</h2>
        
        <div className="bg-slate-950/40 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl shadow-black/20">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Megaphone className="text-sky-500" /> Nuevo Anuncio
          </h3>
          <div className="space-y-4">
            <input 
              placeholder="Título del anuncio"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              value={announcementForm.title}
              onChange={e => setAnnouncementForm({...announcementForm, title: e.target.value})}
            />
            <textarea 
              placeholder="Escribe el mensaje aquí..."
              className="w-full h-32 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              value={announcementForm.content}
              onChange={e => setAnnouncementForm({...announcementForm, content: e.target.value})}
            />
            <button 
              onClick={handleAddAnnouncement}
              className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-500/20"
            >
              Publicar para todos los residentes
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest px-4">Historial de anuncios</h3>
          {announcements.map(a => (
            <div key={a.id} className="bg-slate-950/20 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-slate-100">{a.title}</h4>
                <span className="text-xs text-slate-500">{new Date(a.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{a.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'bookings') {
    const filteredBookings = bookings.filter(b => b.booking_date === selectedDate);

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-white">Calendario de Reservas</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Calendar 
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
          </div>
          
          <div className="lg:col-span-2 bg-slate-950/40 border border-slate-800 rounded-3xl p-8 flex flex-col min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <CalendarIcon className="text-sky-500" /> 
                Reservas del {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
              </h3>
              <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold">
                {filteredBookings.length} Reservas
              </span>
            </div>

            <div className="flex-1 space-y-3">
              {filteredBookings.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-4">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center">
                    <CalendarIcon size={32} />
                  </div>
                  <p>No hay reservas programadas para hoy</p>
                </div>
              ) : (
                filteredBookings.map(b => {
                  const amenity = amenities.find(a => a.id === b.amenity_id);
                  const resident = residents.find(r => r.id === b.user_id);
                  return (
                    <div key={b.id} className="bg-slate-900 border border-slate-800/50 p-4 rounded-2xl flex items-center justify-between group hover:border-slate-700 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                          {amenity?.icon || '🏢'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-100">{amenity?.name}</p>
                          <p className="text-xs text-sky-400 font-medium">{b.time_slot}</p>
                          <p className="text-xs text-slate-500">{resident?.name} - {resident?.unit}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                          {b.status}
                        </span>
                        <button 
                          onClick={() => cancelBooking(b.id)}
                          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'settings') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-white">Configuración del Sistema</h2>
        <div className="bg-slate-950/40 border border-slate-800 p-8 rounded-3xl space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Settings className="text-sky-500" /> Reglas de Reserva
            </h3>
            <p className="text-slate-400 text-sm">Define con cuánta antelación deben reservar los residentes.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Mismo día', val: 0 },
                { label: '1 día de antelación (Default)', val: 1 },
                { label: '3 días de antelación', val: 3 },
                { label: '1 semana de antelación', val: 7 },
                { label: '1 mes de antelación', val: 30 },
              ].map(opt => (
                <button 
                  key={opt.val}
                  onClick={() => updateSettings(opt.val)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    settings.booking_lead_time_days === opt.val
                      ? 'bg-sky-500/10 border-sky-500 text-sky-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold">{opt.label}</p>
                  <p className="text-xs opacity-60">Lead time: {opt.val} días</p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-800 flex justify-end">
             <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-100 font-bold rounded-2xl hover:bg-slate-700 transition-all">
                <Save size={20} /> Guardar todos los cambios
             </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Overview
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl">
          <p className="text-slate-400 text-sm mb-1">Total Residentes</p>
          <p className="text-3xl font-extrabold text-white">{residents.length}</p>
        </div>
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl">
          <p className="text-slate-400 text-sm mb-1">Reservas Activas</p>
          <p className="text-3xl font-extrabold text-white">{bookings.filter(b => b.status === 'confirmed').length}</p>
        </div>
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl">
          <p className="text-slate-400 text-sm mb-1">Amenities</p>
          <p className="text-3xl font-extrabold text-white">{amenities.length}</p>
        </div>
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl">
          <p className="text-slate-400 text-sm mb-1">Anuncios</p>
          <p className="text-3xl font-extrabold text-white">{announcements.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-950/40 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <CalendarIcon className="text-sky-500" /> Próximas Reservas
          </h3>
          <div className="space-y-4">
             {bookings.slice(0, 5).map(b => (
               <div key={b.id} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl">
                        {amenities.find(a => a.id === b.amenity_id)?.icon}
                     </div>
                     <div>
                        <p className="font-bold text-slate-200 text-sm">{amenities.find(a => a.id === b.amenity_id)?.name}</p>
                        <p className="text-xs text-slate-500">{new Date(b.booking_date).toLocaleDateString()} • {b.time_slot}</p>
                     </div>
                  </div>
                  <span className="text-xs font-bold text-sky-400">{residents.find(r => r.id === b.user_id)?.unit}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-slate-950/40 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Megaphone className="text-sky-500" /> Últimos Anuncios
          </h3>
          <div className="space-y-4">
             {announcements.slice(0, 3).map(a => (
               <div key={a.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800/50">
                  <p className="font-bold text-slate-200 text-sm mb-1">{a.title}</p>
                  <p className="text-xs text-slate-400 line-clamp-2">{a.content}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
