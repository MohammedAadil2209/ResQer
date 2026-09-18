import React, { useState } from 'react';
import { CheckCircle2, MapPin, PhoneCall, ArrowRight, Home, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const EmergencyConfirmation: React.FC = () => {
  const { setCitizenView, activeCitizenIncidentId, incidents, citizenDraft } = useEmergency();
  const [showCallModal, setShowCallModal] = useState(false);

  const incident = incidents.find(i => i.id === activeCitizenIncidentId) || {
    id: activeCitizenIncidentId || 'INC-0241',
    sector: citizenDraft.locationSector || 'Sector B2',
    status: 'Coordinating'
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-10 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div>
        {/* Main Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
            <CheckCircle2 className="w-11 h-11" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              ✓ Transmission Verified
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              EMERGENCY SIGNAL SENT
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Your report has been received by the regional dispatch cluster.
            </p>
          </div>

          {/* Details Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-3 text-sm">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <span className="text-slate-400 font-medium">Incident ID:</span>
              <span className="font-mono font-bold text-lg text-cyan-400"># {incident.id}</span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <span className="text-slate-400 font-medium">Location:</span>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{incident.sector}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Status:</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-md text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                RESPONSE BEING COORDINATED
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/50 text-[11px] text-slate-400 flex items-center gap-2 text-left">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Responders in Sector B2 are reviewing this live operational signal. Keep your device powered on.</span>
          </div>
        </div>

        {/* 3 Prominent Actions */}
        <div className="space-y-3 mt-6">
          <button
            id="btn-view-status"
            onClick={() => setCitizenView('status')}
            className="w-full py-4 rounded-xl font-bold text-base bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 active:scale-[0.99] flex items-center justify-center gap-2 transition-all"
          >
            <span>VIEW STATUS</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            id="btn-call-services"
            onClick={() => setShowCallModal(true)}
            className="w-full py-3.5 rounded-xl font-semibold text-sm bg-slate-800/90 hover:bg-slate-700 text-rose-300 border border-rose-500/30 active:scale-[0.99] flex items-center justify-center gap-2 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-rose-400" />
            <span>CALL EMERGENCY SERVICES</span>
          </button>

          <button
            id="btn-return-home"
            onClick={() => setCitizenView('home')}
            className="w-full py-3 rounded-xl font-medium text-sm text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>RETURN HOME</span>
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mt-6 text-center text-xs text-slate-500">
        Demo state: No real world sirens are dispatched. Simulated emergency signal.
      </div>

      {/* Direct Call Modal / Simulator */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold text-white">
              Direct Emergency Dispatch
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              If life-threatening conditions escalate immediately, you can connect directly to national emergency lines:
            </p>

            <div className="space-y-2 pt-2">
              <a
                href="tel:911"
                className="block w-full py-3 rounded-xl font-bold text-base bg-rose-600 hover:bg-rose-500 text-white shadow-lg text-center"
              >
                Call 911 (US / Canada)
              </a>
              <a
                href="tel:112"
                className="block w-full py-3 rounded-xl font-bold text-base bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-center"
              >
                Call 112 (EU / International)
              </a>
            </div>

            <button
              onClick={() => setShowCallModal(false)}
              className="w-full py-2 text-xs text-slate-400 hover:text-white mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
