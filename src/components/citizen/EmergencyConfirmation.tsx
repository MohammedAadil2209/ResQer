import React, { useState } from 'react';
import { CheckCircle2, MapPin, PhoneCall, ArrowRight, Home, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const EmergencyConfirmation: React.FC = () => {
  const { setCitizenView, activeCitizenIncidentId, incidents, citizenDraft } = useEmergency();
  const [showCallModal, setShowCallModal] = useState(false);

  const incident = incidents.find(i => i.id === activeCitizenIncidentId) || {
    id: activeCitizenIncidentId || 'INC-0241',
    sector: citizenDraft.locationSector || 'Zone 13 - Velachery',
    status: 'Coordinating'
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-10 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div>
        {/* Main Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-beige-300 shadow-xl text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-11 h-11" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              ✓ Transmission Verified
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              EMERGENCY SIGNAL SENT
            </h1>
            <p className="text-sm text-stone-600 mt-1 font-medium">
              Your report has been received by the regional dispatch cluster.
            </p>
          </div>

          {/* Details Box */}
          <div className="p-4 rounded-xl bg-beige-50 border border-beige-200 text-left space-y-3 text-sm">
            <div className="flex justify-between items-center border-b border-beige-200 pb-2">
              <span className="text-stone-600 font-medium">Incident ID:</span>
              <span className="font-mono font-bold text-lg text-stone-900"># {incident.id}</span>
            </div>

            <div className="flex justify-between items-center border-b border-beige-200 pb-2">
              <span className="text-stone-600 font-medium">Location:</span>
              <div className="flex items-center gap-1.5 font-bold text-stone-900">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>{incident.sector}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-stone-600 font-medium">Status:</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md text-xs uppercase tracking-wider font-mono">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                RESPONSE BEING COORDINATED
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-beige-100 text-[11px] text-stone-700 flex items-center gap-2 text-left font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Responders in {incident.sector} are reviewing this live operational signal. Keep your device powered on.</span>
          </div>
        </div>

        {/* 3 Prominent Actions */}
        <div className="space-y-3 mt-6">
          <button
            id="btn-view-status"
            onClick={() => setCitizenView('status')}
            className="w-full py-4 rounded-xl font-bold text-base bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 active:scale-[0.99] flex items-center justify-center gap-2 transition-all"
          >
            <span>VIEW STATUS</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </button>

          <button
            id="btn-call-services"
            onClick={() => setShowCallModal(true)}
            className="w-full py-3.5 rounded-xl font-semibold text-sm bg-white hover:bg-beige-50 text-stone-800 border-2 border-beige-300 active:scale-[0.99] flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <PhoneCall className="w-4 h-4 text-red-600" />
            <span>CALL CHENNAI EMERGENCY HELPLINES</span>
          </button>

          <button
            id="btn-return-home"
            onClick={() => setCitizenView('home')}
            className="w-full py-3 rounded-xl font-medium text-sm text-stone-600 hover:text-stone-900 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>RETURN HOME</span>
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mt-6 text-center text-xs text-stone-500 font-medium">
        Simulation Active: Geofenced to Chennai Metropolitan Region (GCC & TNFRS dispatch).
      </div>

      {/* Direct Call Modal / Simulator */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-beige-300 p-6 space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold text-stone-900">
              Chennai Emergency Helplines
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              If life-threatening conditions escalate immediately, connect directly to official emergency and disaster helplines:
            </p>

            <div className="space-y-2 pt-2">
              <a
                href="tel:112"
                className="block w-full py-2.5 px-3 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-700 text-white shadow-md text-center border border-red-700"
              >
                Call 112 (National ERSS — Police / Fire)
              </a>
              <a
                href="tel:108"
                className="block w-full py-2.5 px-3 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 text-white text-center shadow-sm"
              >
                Call 108 (Tamil Nadu Ambulance & Trauma)
              </a>
              <a
                href="tel:1913"
                className="block w-full py-2.5 px-3 rounded-xl font-bold text-sm bg-stone-800 hover:bg-stone-900 text-white border border-stone-700 text-center"
              >
                Call 1913 (GCC Chennai Flood & Disaster)
              </a>
              <a
                href="tel:1077"
                className="block w-full py-2 px-3 rounded-xl font-semibold text-xs bg-beige-100 hover:bg-beige-200 text-stone-800 border border-beige-300 text-center"
              >
                Call 1077 (District Disaster Control Room)
              </a>
            </div>

            <button
              onClick={() => setShowCallModal(false)}
              className="w-full py-2 text-xs text-stone-600 hover:text-stone-900 mt-2 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
