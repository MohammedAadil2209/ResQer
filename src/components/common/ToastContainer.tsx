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
            className={`pointer-events-auto p-3.5 rounded-xl border text-xs shadow-2xl flex items-start justify-between gap-3 animate-in slide-in-from-top-2 duration-300 ${
              toast.type === 'success'
                ? 'bg-wine-900 border-wine-600 text-cream-100'
                : toast.type === 'error'
                ? 'bg-wine-950 border-wine-500 text-white'
                : 'bg-wine-900 border-wine-700 text-cream-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-cream-200 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-white shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-cream-100 shrink-0" />}
              <span className="font-semibold leading-relaxed">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-cream-300 hover:text-white p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
