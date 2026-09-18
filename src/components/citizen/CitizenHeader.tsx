import React from 'react';
import { ShieldAlert, Globe2, BookOpen, AlertCircle, Home } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const CitizenHeader: React.FC = () => {
  const { setAppMode, citizenView, setCitizenView, activeCitizenIncidentId } = useEmergency();

  return (
    <header className="relative z-30 border-b border-wine-800/80 bg-wine-950/90 backdrop-blur-md px-4 py-3 select-none">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {/* Brand & Home */}
        <button
          onClick={() => setCitizenView('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-wine-700 flex items-center justify-center text-white font-black text-sm shadow-md shadow-wine-950/80 border border-wine-400/30 group-hover:bg-wine-600 transition-colors">
            R
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider text-white">
                RESQNET
              </span>
              <span className="text-[9px] font-mono text-cream-100 bg-wine-800/80 border border-wine-600 px-1.5 py-0.2 rounded font-bold">
                SOS
              </span>
            </div>
            <span className="text-[10px] text-cream-300 font-medium block">
              Citizen Emergency Mode
            </span>
          </div>
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {citizenView !== 'home' && (
            <button
              onClick={() => setCitizenView('home')}
              className="p-1.5 text-cream-300 hover:text-white rounded-lg bg-wine-900 border border-wine-800"
              title="Return to emergency home"
            >
              <Home className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setCitizenView('safety-info')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-cream-200 hover:text-white bg-wine-900 hover:bg-wine-800 border border-wine-800 flex items-center gap-1 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-cream-300" />
            <span className="hidden sm:inline">Safety Guide</span>
          </button>

          <button
            onClick={() => setAppMode('command')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-wine-950 bg-cream-100 hover:bg-white shadow-md shadow-wine-950/20 flex items-center gap-1 transition-all active:scale-95 border border-cream-200"
          >
            <Globe2 className="w-3.5 h-3.5 text-wine-800" />
            <span>Command Center</span>
          </button>
        </div>
      </div>
    </header>
  );
};
