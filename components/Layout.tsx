
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { LayoutDashboard, CalendarDays, Bell, Settings, LogOut, Users, MessageSquare, Building2 } from 'lucide-react';

export const SidebarItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active
        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export const Layout: React.FC<{
  children: React.ReactNode;
  currentView: string;
  setView: (v: string) => void;
}> = ({ children, currentView, setView }) => {
  const { user, logout, announcements } = useAppContext();

  if (!user) return <>{children}</>;

  const isAdmin = user.role === 'ADMIN';

  return (
    <div className="min-h-screen flex bg-slate-900 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 border-r border-slate-800 flex-col p-6 space-y-8 bg-slate-950/30">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <Building2 size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Edifica</span>
        </div>

        <nav className="flex-1 space-y-2">
          {isAdmin ? (
            <>
              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                label="Escritorio"
                active={currentView === 'dashboard'}
                onClick={() => setView('dashboard')}
              />
              <SidebarItem
                icon={<Building2 size={20} />}
                label="Amenities"
                active={currentView === 'amenities'}
                onClick={() => setView('amenities')}
              />
              <SidebarItem
                icon={<Users size={20} />}
                label="Residentes"
                active={currentView === 'residents'}
                onClick={() => setView('residents')}
              />
              <SidebarItem
                icon={<MessageSquare size={20} />}
                label="Anuncios"
                active={currentView === 'announcements'}
                onClick={() => setView('announcements')}
              />
              <SidebarItem
                icon={<CalendarDays size={20} />}
                label="Reservas"
                active={currentView === 'bookings'}
                onClick={() => setView('bookings')}
              />
            </>
          ) : (
            <>
              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                label="Inicio"
                active={currentView === 'dashboard'}
                onClick={() => setView('dashboard')}
              />
              <SidebarItem
                icon={<CalendarDays size={20} />}
                label="Mis Reservas"
                active={currentView === 'my-bookings'}
                onClick={() => setView('my-bookings')}
              />
            </>
          )}
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          {isAdmin && (
            <SidebarItem
              icon={<Settings size={20} />}
              label="Configuración"
              active={currentView === 'settings'}
              onClick={() => setView('settings')}
            />
          )}
          <SidebarItem
            icon={<LogOut size={20} />}
            label="Cerrar Sesión"
            onClick={logout}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4 lg:hidden">
             <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                <Building2 size={18} />
             </div>
             <span className="text-lg font-bold">Edifica</span>
          </div>
          <h2 className="text-lg font-semibold text-slate-200 hidden lg:block">
            {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer hover:bg-slate-800 p-2 rounded-full transition-colors">
              <Bell size={20} className="text-slate-400" />
              {announcements.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-100">{user.name}</p>
                <p className="text-xs text-slate-400">{user.unit}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar pb-24 lg:pb-8">
          {children}
        </div>

        {/* Bottom Nav - Mobile */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 flex items-center justify-around px-2 z-30">
          {isAdmin ? (
            <>
              <button onClick={() => setView('dashboard')} className={`p-2 rounded-lg ${currentView === 'dashboard' ? 'text-sky-500 bg-sky-500/10' : 'text-slate-400'}`}>
                <LayoutDashboard size={24} />
              </button>
              <button onClick={() => setView('amenities')} className={`p-2 rounded-lg ${currentView === 'amenities' ? 'text-sky-500 bg-sky-500/10' : 'text-slate-400'}`}>
                <Building2 size={24} />
              </button>
              <button onClick={() => setView('bookings')} className={`p-2 rounded-lg ${currentView === 'bookings' ? 'text-sky-500 bg-sky-500/10' : 'text-slate-400'}`}>
                <CalendarDays size={24} />
              </button>
              <button onClick={() => setView('announcements')} className={`p-2 rounded-lg ${currentView === 'announcements' ? 'text-sky-500 bg-sky-500/10' : 'text-slate-400'}`}>
                <MessageSquare size={24} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setView('dashboard')} className={`p-2 rounded-lg ${currentView === 'dashboard' ? 'text-sky-500 bg-sky-500/10' : 'text-slate-400'}`}>
                <LayoutDashboard size={24} />
              </button>
              <button onClick={() => setView('my-bookings')} className={`p-2 rounded-lg ${currentView === 'my-bookings' ? 'text-sky-500 bg-sky-500/10' : 'text-slate-400'}`}>
                <CalendarDays size={24} />
              </button>
              <button onClick={() => setView('notifications')} className={`p-2 rounded-lg ${currentView === 'notifications' ? 'text-sky-500 bg-sky-500/10' : 'text-slate-400'}`}>
                <Bell size={24} />
              </button>
            </>
          )}
        </nav>
      </main>
    </div>
  );
};
