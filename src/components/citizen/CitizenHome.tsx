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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Emergency Network Online
            </span>
          </div>

          <button
            id="btn-safety-guide"
            onClick={() => setCitizenView('safety')}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 px-3 py-1.5 rounded-full transition-colors"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-cyan-400" />
            <span>Safety Guide</span>
          </button>
        </div>

        {/* Active Emergency Banner if user already reported */}
        {activeIncident && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Active Report: {activeIncident.id}
                </div>
                <div className="text-sm font-medium text-slate-200">
                  {activeIncident.type} in {activeIncident.sector} — {activeIncident.status}
                </div>
              </div>
            </div>
            <button
              id="btn-view-active-status"
              onClick={() => setCitizenView('status')}
              className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/60 border border-cyan-800/80 px-3 py-1.5 rounded-lg"
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
          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-md mx-auto">
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
            className="w-full text-left group relative overflow-hidden bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white p-5 sm:p-6 rounded-2xl shadow-xl shadow-red-950/40 border border-red-400/30 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-red-500/40"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <AlertCircle className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold tracking-tight">
                      REPORT EMERGENCY
                    </span>
                  </div>
                  <p className="text-sm text-red-100/90 font-medium mt-0.5">
                    Tell us what is happening step-by-step.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </button>

          {/* SECONDARY: Speak Your Emergency (VoxRescue) */}
          <button
            id="btn-voice-emergency-main"
            onClick={() => setCitizenView('voice')}
            className="w-full text-left group bg-slate-900/90 hover:bg-slate-800/90 text-white p-5 sm:p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg shadow-black/40 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Mic className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    SPEAK YOUR EMERGENCY
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      AI Voice
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 font-normal mt-0.5">
                    Describe the situation using your voice.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-slate-800 items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </button>

          {/* SILENT ACTION: I Can't Talk */}
          <button
            id="btn-silent-emergency-main"
            onClick={() => setCitizenView('silent')}
            className="w-full text-left group bg-slate-900/80 hover:bg-slate-800/80 text-white p-4 sm:p-5 rounded-2xl border border-slate-700/70 hover:border-slate-600 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-slate-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0">
                  <VolumeX className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold tracking-tight text-white">
                    I CAN'T TALK
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    Send an instant silent emergency signal without speaking.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex text-xs font-semibold uppercase text-amber-400/90 tracking-wider bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                1-Tap Silent
              </div>
            </div>
          </button>
        </div>

        {/* Location Status Bar */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Your Location
              </div>
              <div className="text-sm font-semibold text-slate-200">
                {citizenDraft.locationSector || 'Sector B2'} — GPS Verified
              </div>
            </div>
          </div>

          <select
            id="select-citizen-sector"
            aria-label="Change current sector location"
            value={citizenDraft.locationSector}
            onChange={(e) => setCitizenDraft(prev => ({ ...prev, locationSector: e.target.value }))}
            className="text-xs bg-slate-800 border border-slate-700 text-cyan-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
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
      <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Your report is securely transmitted to emergency coordinators.</span>
        </div>

        <button
          id="btn-switch-to-command"
          onClick={() => {
            setAppMode('command');
          }}
          className="text-cyan-400 hover:text-cyan-300 underline font-medium hover:no-underline flex items-center gap-1"
        >
          Responder Command Center →
        </button>
      </div>
    </div>
  );
};
