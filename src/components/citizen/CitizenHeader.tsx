import React from 'react';
import { ShieldAlert, Globe2, BookOpen, AlertCircle, Home } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const CitizenHeader: React.FC = () => {
  const { setAppMode, citizenView, setCitizenView, activeCitizenIncidentId } = useEmergency();

  return (
    <header className="relative z-30 border-b border-beige-200 bg-white/95 backdrop-blur-md px-4 py-3 select-none shadow-sm">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {/* Brand & Home */}
        <button
          onClick={() => setCitizenView('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:bg-red-700 transition-colors">
            R
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider text-stone-900">
                RESQNET
              </span>
              <span className="text-[9px] font-mono text-white bg-red-600 px-1.5 py-0.2 rounded font-bold">
                SOS
              </span>
            </div>
            <span className="text-[10px] text-stone-500 font-medium block">
              Citizen Emergency Mode
            </span>
          </div>
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {citizenView !== 'home' && (
            <button
              onClick={() => setCitizenView('home')}
              className="p-1.5 text-stone-600 hover:text-stone-900 rounded-lg bg-beige-100 hover:bg-beige-200 border border-beige-300 transition-colors"
              title="Return to emergency home"
            >
              <Home className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setCitizenView('safety-info')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-stone-700 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 border border-beige-300 flex items-center gap-1 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Safety Guide</span>
          </button>

          <button
            onClick={() => setAppMode('command')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm flex items-center gap-1 transition-all active:scale-95 border border-red-700"
          >
            <Globe2 className="w-3.5 h-3.5 text-white" />
            <span>Command Center</span>
          </button>
        </div>
      </div>
    </header>
  );
};
