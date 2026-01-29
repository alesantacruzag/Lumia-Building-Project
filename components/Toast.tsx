
import React from 'react';
import { useAppContext } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppContext();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 flex items-center justify-between min-w-[280px] ${
            toast.type === 'success' ? 'bg-emerald-500' :
            toast.type === 'error' ? 'bg-rose-500' : 'bg-sky-500'
          }`}
        >
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="ml-4 opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
