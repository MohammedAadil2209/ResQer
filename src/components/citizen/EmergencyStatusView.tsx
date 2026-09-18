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
            className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Emergency Home</span>
          </button>

          {/* DEMO DATA badge */}
          <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
            DEMO DATA
          </span>
        </div>

        {/* Title Area */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            YOUR EMERGENCY
          </span>
          <div className="flex items-center justify-between mt-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              #{incident.id}
            </h1>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              {incident.status === 'Active' ? 'Response Coordinating' : incident.status}
            </span>
          </div>
        </div>

        {/* Core Info Cards Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Location */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Location</span>
            </div>
            <div className="text-base font-bold text-white truncate">
              {incident.sector}
            </div>
            <span className="text-[11px] text-slate-400">North River Valley</span>
          </div>

          {/* Report / Hazard */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Report</span>
            </div>
            <div className="text-base font-bold text-white">
              {incident.type}
            </div>
            <span className="text-[11px] text-slate-400">High severity condition</span>
          </div>

          {/* People Affected */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>People Affected</span>
            </div>
            <div className="text-base font-bold text-white">
              Approximately {incident.peopleAffected}
            </div>
            <span className="text-[11px] text-amber-400">Triage priority flagged</span>
          </div>

          {/* Response & ETA */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 bg-cyan-950/20">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Response</span>
            </div>
            <div className="text-base font-bold text-white truncate">
              {incident.assignedResponder || 'Rescue Team assigned'}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400">ETA: ~12 min</span>
            </div>
          </div>
        </div>

        {/* Live Timeline (#11) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Response Timeline
            </h2>
            <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Feed
            </span>
          </div>

          <div className="space-y-4">
            {incident.timeline.map((event, idx) => (
              <div key={idx} className="flex items-start gap-3 relative">
                {idx !== incident.timeline.length - 1 && (
                  <div className={`absolute left-2.5 top-5 bottom-0 w-0.5 ${
                    event.completed ? 'bg-cyan-500/40' : 'bg-slate-800'
                  }`} />
                )}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  event.completed 
                    ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-950' 
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${event.completed ? 'bg-slate-950' : 'bg-slate-600'}`} />
                </div>
                <div className="flex-1 -mt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {event.time}
                    </span>
                    <span className={`text-sm font-semibold ${event.completed ? 'text-white' : 'text-slate-400'}`}>
                      {event.label}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-xs text-slate-400 mt-0.5">
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
          <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 mb-4 space-y-3">
            <span className="text-xs font-bold uppercase text-white block">
              Send Additional Situation Update
            </span>
            <input
              type="text"
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
              placeholder="e.g. Water reached 1st step, moved to second floor..."
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 text-sm focus:border-cyan-400 outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSendUpdate}
                className="flex-1 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Send Update
              </button>
              <button
                onClick={() => setShowAddUpdate(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddUpdate(true)}
            className="w-full mb-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <span>REPORT UPDATE / NEW DETAILS</span>
          </button>
        )}
      </div>

      {/* Bottom Emergency Controls */}
      <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
        <a
          href="tel:911"
          className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 911 / 112</span>
        </a>

        <button
          onClick={() => setCitizenView('home')}
          className="px-4 py-3.5 rounded-xl font-medium text-xs text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};
