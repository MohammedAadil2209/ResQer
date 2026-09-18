import React from 'react';
import { 
  AlertCircle, 
  Mic, 
  VolumeX, 
  MapPin, 
  ShieldCheck, 
  LifeBuoy, 
  ArrowRight,
  BellRing,
  HeartHandshake,
  MessageSquare
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const CitizenHome: React.FC = () => {
  const { 
    setCitizenView, 
    setAppMode, 
    citizenDraft, 
    setCitizenDraft,
    activeCitizenIncidentId,
    incidents,
    locationAlerts,
    volunteerRequirements,
    communityMessages
  } = useEmergency();

  const activeIncident = incidents.find(i => i.id === activeCitizenIncidentId);
  const currentSector = citizenDraft.locationSector || 'Zone 13 - Velachery';
  const sectorAlertsCount = locationAlerts.filter(a => a.sector === currentSector && a.status === 'ACTIVE').length;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-10 flex flex-col justify-between min-h-[calc(100vh-80px)]">
      {/* Top Banner / System Online Status */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-stone-700 uppercase font-mono">
              Emergency Network Online
            </span>
          </div>

          <button
            id="btn-safety-guide"
            onClick={() => setCitizenView('safety-info')}
            className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 border border-beige-300 px-3 py-1.5 rounded-full transition-colors"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-stone-600" />
            <span>Safety Guide</span>
          </button>
        </div>

        {/* Active Emergency Banner if user already reported */}
        {activeIncident && (
          <div className="mb-6 p-4 rounded-xl bg-beige-50 border-2 border-red-500 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-red-700">
                  Active Report: {activeIncident.id}
                </div>
                <div className="text-sm font-medium text-stone-900">
                  {activeIncident.type} in {activeIncident.sector} — {activeIncident.status}
                </div>
              </div>
            </div>
            <button
              id="btn-view-active-status"
              onClick={() => setCitizenView('status')}
              className="text-xs font-semibold text-white hover:bg-red-700 flex items-center gap-1 bg-red-600 border border-red-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
            >
              Track <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
            NEED HELP?
          </h1>
          <p className="text-base sm:text-lg text-stone-600 font-normal max-w-md mx-auto">
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
            className="w-full text-left group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white p-5 sm:p-6 rounded-2xl shadow-xl shadow-red-600/20 border border-red-700 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-red-500/30"
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
                  <p className="text-sm text-red-100 font-medium mt-0.5">
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
            className="w-full text-left group bg-white hover:bg-beige-50 text-stone-900 p-5 sm:p-6 rounded-2xl border-2 border-beige-300 hover:border-red-400 shadow-sm transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-red-500/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-beige-100 border border-beige-300 flex items-center justify-center text-red-600 shrink-0 group-hover:scale-105 transition-transform">
                  <Mic className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                    SPEAK YOUR EMERGENCY
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                      AI Voice
                    </span>
                  </div>
                  <p className="text-sm text-stone-600 font-normal mt-0.5">
                    Describe the situation using your voice.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-beige-100 items-center justify-center text-stone-600 group-hover:text-stone-900 group-hover:translate-x-1 transition-all border border-beige-200">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </button>

          {/* SILENT ACTION: I Can't Talk */}
          <button
            id="btn-silent-emergency-main"
            onClick={() => setCitizenView('silent')}
            className="w-full text-left group bg-beige-50/90 hover:bg-beige-100/90 text-stone-900 p-4 sm:p-5 rounded-2xl border border-beige-300 hover:border-red-400 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-red-500/20 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-beige-300 flex items-center justify-center text-stone-700 shrink-0">
                  <VolumeX className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold tracking-tight text-stone-900">
                    I CAN'T TALK
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 font-normal">
                    Send an instant silent emergency signal without speaking.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex text-xs font-semibold uppercase text-stone-800 tracking-wider bg-beige-200 px-2.5 py-1 rounded border border-beige-300">
                1-Tap Silent
              </div>
            </div>
          </button>
        </div>

        {/* Location Status Bar */}
        <div className="mt-6 p-4 rounded-xl bg-white border border-beige-300 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-beige-100 border border-beige-300 flex items-center justify-center text-red-600">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 font-mono">
                Your Location
              </div>
              <div className="text-sm font-semibold text-stone-900">
                {citizenDraft.locationSector || 'Zone 13 - Velachery'} — Chennai Grid
              </div>
            </div>
          </div>

          <select
            id="select-citizen-sector"
            aria-label="Change current sector location"
            value={citizenDraft.locationSector}
            onChange={(e) => setCitizenDraft(prev => ({ ...prev, locationSector: e.target.value }))}
            className="text-xs bg-beige-50 border border-beige-300 text-stone-900 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-red-500 font-medium"
          >
            <option value="Zone 13 - Velachery">Zone 13 - Velachery</option>
            <option value="Zone 5 - Royapuram">Zone 5 - Royapuram</option>
            <option value="Zone 10 - Kodambakkam">Zone 10 - Kodambakkam</option>
            <option value="Zone 14 - Perungudi">Zone 14 - Perungudi</option>
            <option value="Zone 9 - Teynampet">Zone 9 - Teynampet</option>
          </select>
        </div>

        {/* System Objectives Quick Hub */}
        <div className="mt-6 space-y-2.5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 px-1">
            Community Safety Services
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Objective 1: Location Alerts */}
            <button
              onClick={() => setCitizenView('alerts')}
              className="p-3.5 rounded-xl bg-white border border-beige-300 hover:border-red-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform">
                    <BellRing className="w-4 h-4" />
                  </div>
                  {sectorAlertsCount > 0 && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-600 text-white animate-pulse">
                      {sectorAlertsCount} ACTIVE
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-stone-900 leading-tight">
                  Location Alerts
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
                  Safe evacuation routes &amp; shelters for {currentSector}.
                </p>
              </div>
              <div className="mt-2 text-[10px] font-bold text-red-700 flex items-center gap-1">
                <span>View Directives</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Objective 2: Volunteer Coordination */}
            <button
              onClick={() => setCitizenView('volunteers')}
              className="p-3.5 rounded-xl bg-white border border-beige-300 hover:border-red-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-beige-100 flex items-center justify-center text-stone-800 group-hover:scale-105 transition-transform">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono text-stone-600 bg-beige-100 px-1.5 py-0.5 rounded">
                    {volunteerRequirements.length} Tasks
                  </span>
                </div>
                <div className="text-xs font-bold text-stone-900 leading-tight">
                  Volunteer Hub
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
                  Connect with emergency response requirements.
                </p>
              </div>
              <div className="mt-2 text-[10px] font-bold text-red-700 flex items-center gap-1">
                <span>Join Mission</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Objective 3: Direct Two-Way Comms & Safety Check-In */}
            <button
              onClick={() => setCitizenView('check-in')}
              className="p-3.5 rounded-xl bg-white border border-beige-300 hover:border-red-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-beige-100 flex items-center justify-center text-stone-800 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    ONLINE
                  </span>
                </div>
                <div className="text-xs font-bold text-stone-900 leading-tight">
                  Check-In &amp; Comms
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
                  Mark household safe or chat directly with dispatchers.
                </p>
              </div>
              <div className="mt-2 text-[10px] font-bold text-red-700 flex items-center gap-1">
                <span>Open Messenger</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Trust & Responder Switch */}
      <div className="mt-8 pt-6 border-t border-beige-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2 text-stone-600">
          <ShieldCheck className="w-4 h-4 text-stone-700" />
          <span>Your report is securely transmitted to emergency coordinators.</span>
        </div>

        <button
          id="btn-switch-to-command"
          onClick={() => {
            setAppMode('command');
          }}
          className="text-red-700 hover:text-red-800 underline font-medium hover:no-underline flex items-center gap-1"
        >
          Responder Command Center →
        </button>
      </div>
    </div>
  );
};
