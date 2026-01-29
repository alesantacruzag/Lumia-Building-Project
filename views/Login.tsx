
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Building2, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-sky-500 rounded-2xl items-center justify-center text-white shadow-xl shadow-sky-500/20 mb-2">
            <Building2 size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Edifica</h1>
          <p className="text-slate-400 text-lg">Gestión inteligente de tu comunidad</p>
        </div>

        <div className="bg-slate-950/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-100">Acceso Demo</h2>
            <p className="text-sm text-slate-500">Selecciona un perfil para ingresar a la plataforma</p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => login('admin@edificio.com')}
              className="group w-full flex items-center justify-between p-4 bg-slate-900 hover:bg-sky-500/10 border border-slate-800 hover:border-sky-500/50 rounded-2xl transition-all"
            >
              <div className="text-left">
                <p className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors">Administrador</p>
                <p className="text-xs text-slate-500 group-hover:text-sky-400/70">Gestión total, anuncios y amenities</p>
              </div>
              <ArrowRight className="text-slate-600 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" size={20} />
            </button>

            <button
              onClick={() => login('vecino@edificio.com')}
              className="group w-full flex items-center justify-between p-4 bg-slate-900 hover:bg-sky-500/10 border border-slate-800 hover:border-sky-500/50 rounded-2xl transition-all"
            >
              <div className="text-left">
                <p className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors">Residente</p>
                <p className="text-xs text-slate-500 group-hover:text-sky-400/70">Reservas de espacios y avisos</p>
              </div>
              <ArrowRight className="text-slate-600 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" size={20} />
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-600">
              Demo v1.0 • PWA Ready
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
