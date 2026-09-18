import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Users, 
  Truck, 
  ShieldCheck, 
  PhoneCall, 
  AlertCircle, 
  RefreshCw,
  PlusCircle
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const EmergencyStatusView: React.FC = () => {
  const { 
    setCitizenView, 
    activeCitizenIncidentId, 
    incidents,
    citizenDraft,
    addToast
  } = useEmergency();

  const [updateNote, setUpdateNote] = useState('');
  const [showAddUpdate, setShowAddUpdate] = useState(false);

  const incident = incidents.find(i => i.id === activeCitizenIncidentId) || incidents[0];

  const handleSendUpdate = () => {
    if (!updateNote.trim()) return;
    addToast('Update attached to incident ' + incident.id, 'success');
    setUpdateNote('');
    setShowAddUpdate(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCitizenView('home')}
            className="flex items-center gap-1.5 text-sm text-cream-200 hover:text-white bg-wine-900/80 hover:bg-wine-800 px-3 py-1.5 rounded-lg border border-wine-700/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Emergency Home</span>
          </button>

          {/* DEMO DATA badge */}
          <span className="text-[10px] font-mono uppercase font-bold text-cream-100 bg-wine-800/80 border border-wine-600 px-2.5 py-1 rounded-full">
            LIVE TELEMETRY
          </span>
        </div>

        {/* Title Area */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-cream-300 block font-mono">
            YOUR EMERGENCY
          </span>
          <div className="flex items-center justify-between mt-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              #{incident.id}
            </h1>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-wine-800/80 border border-wine-600 text-cream-100 font-mono">
              <span className="w-2 h-2 rounded-full bg-cream-200 animate-ping" />
              {incident.status === 'Active' ? 'Response Coordinating' : incident.status}
            </span>
          </div>
        </div>

        {/* Core Info Cards Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Location */}
          <div className="p-4 rounded-2xl bg-wine-950 border border-wine-700">
            <div className="flex items-center gap-2 text-cream-300 text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-cream-200" />
              <span>Location</span>
            </div>
            <div className="text-base font-bold text-white truncate">
              {incident.sector}
            </div>
            <span className="text-[11px] text-cream-400">North River Valley</span>
          </div>

          {/* Report / Hazard */}
          <div className="p-4 rounded-2xl bg-wine-950 border border-wine-700">
            <div className="flex items-center gap-2 text-cream-300 text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
              <AlertCircle className="w-3.5 h-3.5 text-cream-200" />
              <span>Report</span>
            </div>
            <div className="text-base font-bold text-white">
              {incident.type}
            </div>
            <span className="text-[11px] text-cream-400">High severity condition</span>
          </div>

          {/* People Affected */}
          <div className="p-4 rounded-2xl bg-wine-950 border border-wine-700">
            <div className="flex items-center gap-2 text-cream-300 text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
              <Users className="w-3.5 h-3.5 text-cream-200" />
              <span>People Affected</span>
            </div>
            <div className="text-base font-bold text-white">
              Approximately {incident.peopleAffected}
            </div>
            <span className="text-[11px] text-cream-300">Triage priority flagged</span>
          </div>

          {/* Response & ETA */}
          <div className="p-4 rounded-2xl bg-wine-900/90 border border-wine-600">
            <div className="flex items-center gap-2 text-cream-200 text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
              <Truck className="w-3.5 h-3.5 text-cream-100" />
              <span>Response</span>
            </div>
            <div className="text-base font-bold text-white truncate">
              {incident.assignedResponder || 'Rescue Team assigned'}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3 h-3 text-cream-200" />
              <span className="text-xs font-bold text-cream-100 font-mono">ETA: ~12 min</span>
            </div>
          </div>
        </div>

        {/* Live Timeline */}
        <div className="p-5 rounded-2xl bg-wine-950/90 border border-wine-700 mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-wine-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cream-200 font-mono">
              Response Timeline
            </h2>
            <span className="text-[11px] text-cream-200 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cream-200 animate-pulse" />
              Live Feed
            </span>
          </div>

          <div className="space-y-4">
            {incident.timeline.map((event, idx) => (
              <div key={idx} className="flex items-start gap-3 relative">
                {idx !== incident.timeline.length - 1 && (
                  <div className={`absolute left-2.5 top-5 bottom-0 w-0.5 ${
                    event.completed ? 'bg-wine-500' : 'bg-wine-800'
                  }`} />
                )}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  event.completed 
                    ? 'bg-cream-100 text-wine-950 ring-4 ring-wine-900' 
                    : 'bg-wine-900 text-cream-400 border border-wine-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${event.completed ? 'bg-wine-950' : 'bg-wine-700'}`} />
                </div>
                <div className="flex-1 -mt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cream-200">
                      {event.time}
                    </span>
                    <span className={`text-sm font-semibold ${event.completed ? 'text-white' : 'text-cream-400'}`}>
                      {event.label}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-xs text-cream-300 mt-0.5">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Report Update Drawer */}
        {showAddUpdate ? (
          <div className="p-4 rounded-xl bg-wine-950 border border-wine-600 mb-4 space-y-3">
            <span className="text-xs font-bold uppercase text-white block">
              Send Additional Situation Update
            </span>
            <input
              type="text"
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
              placeholder="e.g. Water reached 1st step, moved to second floor..."
              className="w-full bg-wine-900 border border-wine-700 text-white placeholder-cream-400/60 rounded-lg p-3 text-sm focus:border-cream-300 outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSendUpdate}
                className="flex-1 py-2 rounded-lg bg-cream-100 hover:bg-white text-wine-950 font-bold text-xs shadow transition-colors"
              >
                Send Update
              </button>
              <button
                onClick={() => setShowAddUpdate(false)}
                className="px-4 py-2 rounded-lg bg-wine-900 hover:bg-wine-850 text-cream-300 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddUpdate(true)}
            className="w-full mb-4 py-3 rounded-xl bg-wine-950 hover:bg-wine-900 border border-wine-700 text-cream-200 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-cream-200" />
            <span>REPORT UPDATE / NEW DETAILS</span>
          </button>
        )}
      </div>

      {/* Bottom Emergency Controls */}
      <div className="pt-4 border-t border-wine-850 flex items-center gap-3">
        <a
          href="tel:911"
          className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-wine-700 via-wine-600 to-wine-700 hover:from-wine-600 hover:to-wine-500 text-white flex items-center justify-center gap-2 shadow-2xl shadow-wine-950/80 border border-wine-500"
        >
          <PhoneCall className="w-4 h-4 text-cream-200" />
          <span>Call 911 / 112</span>
        </a>

        <button
          onClick={() => setCitizenView('home')}
          className="px-4 py-3.5 rounded-xl font-medium text-xs text-cream-300 hover:text-white bg-wine-900/80 hover:bg-wine-850 border border-wine-700 transition-colors"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};
