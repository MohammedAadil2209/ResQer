import React from 'react';
import { ShieldAlert, Globe2, BookOpen, AlertCircle, Home } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const CitizenHeader: React.FC = () => {
  const { setAppMode, citizenView, setCitizenView, activeCitizenIncidentId } = useEmergency();

  return (
    <header className="relative z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 py-3 select-none">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {/* Brand & Home */}
        <button
          onClick={() => setCitizenView('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-red-950/60 border border-red-400/30 group-hover:bg-red-500 transition-colors">
            R
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider text-white">
                RESQNET
              </span>
              <span className="text-[9px] font-mono text-red-400 bg-red-950/60 border border-red-800/80 px-1.5 py-0.2 rounded font-bold">
                SOS
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              Citizen Emergency Mode
            </span>
          </div>
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {citizenView !== 'home' && (
            <button
              onClick={() => setCitizenView('home')}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              title="Return to emergency home"
            >
              <Home className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setCitizenView('safety-info')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-1 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Safety Guide</span>
          </button>

          <button
            onClick={() => setAppMode('command')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-500/20 flex items-center gap-1 transition-all active:scale-95"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Command Center</span>
          </button>
        </div>
      </div>
    </header>
  );
};
