import React from 'react';
import { ShieldAlert, Globe2, BookOpen, AlertCircle, Home, BellRing, HeartHandshake, MessageSquare } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const CitizenHeader: React.FC = () => {
  const { setAppMode, citizenView, setCitizenView, locationAlerts } = useEmergency();
  const activeAlerts = locationAlerts.filter(a => a.status === 'ACTIVE').length;

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
                RESQER
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
        <div className="flex items-center gap-1.5 sm:gap-2">
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
            onClick={() => setCitizenView('alerts')}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border ${
              citizenView === 'alerts' 
                ? 'bg-red-600 text-white border-red-700' 
                : 'bg-beige-100 hover:bg-beige-200 text-stone-700 border-beige-300'
            }`}
            title="Location Alerts"
          >
            <BellRing className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alerts</span>
            {activeAlerts > 0 && (
              <span className={`text-[9px] px-1 rounded-full font-bold font-mono ${
                citizenView === 'alerts' ? 'bg-white text-red-700' : 'bg-red-600 text-white'
              }`}>
                {activeAlerts}
              </span>
            )}
          </button>

          <button
            onClick={() => setCitizenView('volunteers')}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border ${
              citizenView === 'volunteers' 
                ? 'bg-red-600 text-white border-red-700' 
                : 'bg-beige-100 hover:bg-beige-200 text-stone-700 border-beige-300'
            }`}
            title="Volunteer Hub"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Volunteers</span>
          </button>

          <button
            onClick={() => setCitizenView('check-in')}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border ${
              citizenView === 'check-in' 
                ? 'bg-red-600 text-white border-red-700' 
                : 'bg-beige-100 hover:bg-beige-200 text-stone-700 border-beige-300'
            }`}
            title="Safety Check-In & Comms"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Comms</span>
          </button>

          <button
            onClick={() => setAppMode('command')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm flex items-center gap-1 transition-all active:scale-95 border border-red-700"
          >
            <Globe2 className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Command</span>
          </button>
        </div>
      </div>
    </header>
  );
};
