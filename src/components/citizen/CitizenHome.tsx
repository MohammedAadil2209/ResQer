import React from 'react';
import { AlertCircle, Mic, VolumeX, MapPin, ShieldCheck, LifeBuoy, ArrowRight } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const CitizenHome: React.FC = () => {
  const { 
    setCitizenView, 
    setAppMode, 
    citizenDraft, 
    setCitizenDraft,
    activeCitizenIncidentId,
    incidents
  } = useEmergency();

  const activeIncident = incidents.find(i => i.id === activeCitizenIncidentId);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-10 flex flex-col justify-between min-h-[calc(100vh-80px)]">
      {/* Top Banner / System Online Status */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cream-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cream-200"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-cream-200 uppercase font-mono">
              Emergency Network Online
            </span>
          </div>

          <button
            id="btn-safety-guide"
            onClick={() => setCitizenView('safety-info')}
            className="flex items-center gap-1.5 text-xs text-cream-200 hover:text-white bg-wine-900/80 hover:bg-wine-800 border border-wine-700/80 px-3 py-1.5 rounded-full transition-colors"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-cream-300" />
            <span>Safety Guide</span>
          </button>
        </div>

        {/* Active Emergency Banner if user already reported */}
        {activeIncident && (
          <div className="mb-6 p-4 rounded-xl bg-wine-900/80 border border-wine-700 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cream-200 animate-pulse" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-cream-200">
                  Active Report: {activeIncident.id}
                </div>
                <div className="text-sm font-medium text-white">
                  {activeIncident.type} in {activeIncident.sector} — {activeIncident.status}
                </div>
              </div>
            </div>
            <button
              id="btn-view-active-status"
              onClick={() => setCitizenView('status')}
              className="text-xs font-semibold text-wine-950 hover:bg-white flex items-center gap-1 bg-cream-100 border border-cream-200 px-3 py-1.5 rounded-lg shadow-sm"
            >
              Track <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            NEED HELP?
          </h1>
          <p className="text-base sm:text-lg text-cream-200 font-normal max-w-md mx-auto">
            Choose the fastest way to tell us what is happening.
          </p>
        </div>

        {/* 3 Large Actions */}
        <div className="space-y-4">
          {/* PRIMARY: Report Emergency */}
          <button
            id="btn-report-emergency-main"
            onClick={() => {
              setCitizenDraft(prev => ({ ...prev, isSilent: false }));
              setCitizenView('report');
            }}
            className="w-full text-left group relative overflow-hidden bg-gradient-to-r from-wine-700 via-wine-600 to-wine-700 hover:from-wine-600 hover:to-wine-500 text-white p-5 sm:p-6 rounded-2xl shadow-2xl shadow-wine-950/80 border border-wine-400/40 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-wine-500/40"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0 border border-white/30">
                  <AlertCircle className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      REPORT EMERGENCY
                    </span>
                  </div>
                  <p className="text-sm text-cream-100 font-medium mt-0.5">
                    Tell us what is happening step-by-step.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/15 items-center justify-center group-hover:translate-x-1 transition-transform border border-white/20">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </button>

          {/* SECONDARY: Speak Your Emergency (VoxRescue) */}
          <button
            id="btn-voice-emergency-main"
            onClick={() => setCitizenView('voice')}
            className="w-full text-left group bg-wine-950/90 hover:bg-wine-900/90 text-white p-5 sm:p-6 rounded-2xl border border-wine-700/80 hover:border-cream-300/60 shadow-xl shadow-black/40 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-wine-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-100 shrink-0 group-hover:scale-105 transition-transform">
                  <Mic className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    SPEAK YOUR EMERGENCY
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-cream-100/15 text-cream-200 border border-cream-200/30">
                      AI Voice
                    </span>
                  </div>
                  <p className="text-sm text-cream-200 font-normal mt-0.5">
                    Describe the situation using your voice.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-wine-900 items-center justify-center text-cream-300 group-hover:text-white group-hover:translate-x-1 transition-all border border-wine-800">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </button>

          {/* SILENT ACTION: I Can't Talk */}
          <button
            id="btn-silent-emergency-main"
            onClick={() => setCitizenView('silent')}
            className="w-full text-left group bg-wine-950/70 hover:bg-wine-900/70 text-white p-4 sm:p-5 rounded-2xl border border-wine-800 hover:border-wine-700 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-wine-600/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-wine-900 border border-wine-800 flex items-center justify-center text-cream-200 shrink-0">
                  <VolumeX className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold tracking-tight text-white">
                    I CAN'T TALK
                  </div>
                  <p className="text-xs sm:text-sm text-cream-300 font-normal">
                    Send an instant silent emergency signal without speaking.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex text-xs font-semibold uppercase text-cream-100 tracking-wider bg-wine-800/80 px-2.5 py-1 rounded border border-wine-600">
                1-Tap Silent
              </div>
            </div>
          </button>
        </div>

        {/* Location Status Bar */}
        <div className="mt-6 p-4 rounded-xl bg-wine-950/80 border border-wine-800 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-200">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-cream-300 font-mono">
                Your Location
              </div>
              <div className="text-sm font-semibold text-white">
                {citizenDraft.locationSector || 'Sector B2'} — GPS Verified
              </div>
            </div>
          </div>

          <select
            id="select-citizen-sector"
            aria-label="Change current sector location"
            value={citizenDraft.locationSector}
            onChange={(e) => setCitizenDraft(prev => ({ ...prev, locationSector: e.target.value }))}
            className="text-xs bg-wine-900 border border-wine-700 text-cream-100 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cream-300 font-medium"
          >
            <option value="Sector B2">Sector B2 (Valley)</option>
            <option value="Sector A1">Sector A1 (Depot)</option>
            <option value="Sector C4">Sector C4 (Corridor)</option>
            <option value="Sector D1">Sector D1 (Market)</option>
            <option value="Sector B1">Sector B1 (Civic)</option>
          </select>
        </div>
      </div>

      {/* Bottom Trust & Responder Switch */}
      <div className="mt-8 pt-6 border-t border-wine-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-300">
        <div className="flex items-center gap-2 text-cream-300">
          <ShieldCheck className="w-4 h-4 text-cream-200" />
          <span>Your report is securely transmitted to emergency coordinators.</span>
        </div>

        <button
          id="btn-switch-to-command"
          onClick={() => {
            setAppMode('command');
          }}
          className="text-cream-200 hover:text-white underline font-medium hover:no-underline flex items-center gap-1"
        >
          Responder Command Center →
        </button>
      </div>
    </div>
  );
};
