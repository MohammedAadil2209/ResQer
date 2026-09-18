import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEmergency();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border text-xs shadow-xl flex items-start justify-between gap-3 animate-in slide-in-from-top-2 duration-300 ${
              toast.type === 'success'
                ? 'bg-white border-emerald-300 text-stone-900'
                : toast.type === 'error'
                ? 'bg-white border-red-300 text-stone-900'
                : 'bg-white border-beige-300 text-stone-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-red-600 shrink-0" />}
              <span className="font-semibold leading-relaxed text-stone-900">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-800 p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
