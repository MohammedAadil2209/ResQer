import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  Clock, 
  ShieldAlert, 
  Truck, 
  Droplets, 
  Flame, 
  CheckCircle2, 
  Radio, 
  Share2, 
  Send, 
  Filter, 
  ChevronRight,
  PlusCircle,
  Megaphone
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { Incident, IncidentPriority, IncidentStatus } from '../../types';

export const IncidentsWorkspaceView: React.FC = () => {
  const { 
    incidents, 
    selectedIncidentId, 
    setSelectedIncidentId, 
    updateIncidentStatus, 
    assignResponderToIncident,
    broadcastSectorAlert,
    addToast
  } = useEmergency();

  const [filterTab, setFilterTab] = useState<'ALL' | 'CRITICAL' | 'FLOOD' | 'MEDICAL' | 'UNASSIGNED'>('ALL');
  const [responderAssignInput, setResponderAssignInput] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];

  const filteredIncidents = incidents.filter(inc => {
    if (filterTab === 'CRITICAL') return inc.severity === 'Critical';
    if (filterTab === 'FLOOD') return inc.type === 'Flood';
    if (filterTab === 'MEDICAL') return inc.type === 'Medical';
    if (filterTab === 'UNASSIGNED') return !inc.assignedResponder;
    return true;
  });

  const handleAssign = () => {
    if (!responderAssignInput.trim() || !selectedIncident) return;
    assignResponderToIncident(selectedIncident.id, responderAssignInput);
    setResponderAssignInput('');
    setShowAssignModal(false);
  };

  const handleBroadcast = () => {
    if (!selectedIncident) return;
    broadcastSectorAlert(selectedIncident.sector, `Urgent safety advisory for ${selectedIncident.sector}: Follow elevated evacuation routes.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
      {/* Left Column: Incidents List (5 cols) */}
      <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  INCIDENT QUEUE
                </h2>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {incidents.length} active emergency operations
              </p>
            </div>

            <span className="text-[10px] font-mono text-red-400 bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded font-bold">
              {incidents.filter(i => i.severity === 'Critical').length} CRITICAL
            </span>
          </div>

          {/* Filter Tabs (#26) */}
          <div className="flex flex-wrap gap-1.5 py-2">
            {(['ALL', 'CRITICAL', 'FLOOD', 'MEDICAL', 'UNASSIGNED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-colors ${
                  filterTab === tab
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Incidents Scrollable List */}
          <div className="space-y-2 overflow-y-auto max-h-[520px] pr-1 pt-1">
            {filteredIncidents.map((inc) => {
              const isSelected = inc.id === selectedIncident?.id;
              const isCrit = inc.severity === 'Critical';

              return (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncidentId(inc.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400/80 ring-1 ring-cyan-400/30 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isCrit ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`} />
                      <span className="font-mono font-bold text-xs text-white">
                        #{inc.id}
                      </span>
                      <span className="text-[11px] font-bold text-cyan-300">
                        {inc.type}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      isCrit 
                        ? 'bg-red-950 text-red-300 border-red-800' 
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}>
                      {inc.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 mb-2">
                    {inc.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900 pt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{inc.sector}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span>~{inc.peopleAffected} affected</span>
                    </span>
                    <span className={`text-[10px] font-mono ${inc.assignedResponder ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {inc.assignedResponder ? 'Assigned' : 'Unassigned'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Detailed Incident Inspector (#27) (7 cols) */}
      <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
        {selectedIncident ? (
          <div className="space-y-4 overflow-y-auto max-h-[640px] pr-1">
            {/* Header Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-cyan-400">
                    #{selectedIncident.id}
                  </span>
                  <span className="text-xs font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {selectedIncident.sector}
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    selectedIncident.severity === 'Critical'
                      ? 'bg-red-950 text-red-300 border-red-800'
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>
                    {selectedIncident.severity} PRIORITY
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-white tracking-tight mt-1">
                  {selectedIncident.title}
                </h3>
              </div>

              {/* Status Selector Dropdown */}
              <div>
                <select
                  aria-label="Update incident status"
                  value={selectedIncident.status}
                  onChange={(e) => updateIncidentStatus(selectedIncident.id, e.target.value as IncidentStatus)}
                  className="bg-slate-950 border border-cyan-500/50 text-cyan-300 rounded-xl px-3 py-1.5 text-xs font-mono font-bold outline-none cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Coordinating">Coordinating</option>
                  <option value="En route">En route</option>
                  <option value="Contained">Contained</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Description & Triage Info */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 block">
                SITUATION ASSESSMENT
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedIncident.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  Road Access: <strong className="text-amber-400">{selectedIncident.roadAccess}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  Hospital Load: <strong className="text-cyan-400">{selectedIncident.hospitalLoad}%</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  Nearby Shelter Load: <strong className="text-amber-400">{selectedIncident.shelterLoad}%</strong>
                </span>
              </div>
            </div>

            {/* Resource Dispatch & Assignment Status */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cyan-300">
                  ASSIGNED UNITS &amp; LOGISTICS
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ETA: ~12 min
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white">
                    {selectedIncident.assignedResponder || 'No direct rescue team dispatched'}
                  </span>
                </div>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] transition-colors"
                >
                  {selectedIncident.assignedResponder ? 'CHANGE UNIT' : 'ASSIGN RESPONDER'}
                </button>
              </div>
            </div>

            {/* Response Timeline (#27) */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 block">
                INCIDENT RESPONSE TIMELINE
              </span>
              <div className="space-y-2.5 pl-2">
                {selectedIncident.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="font-mono text-cyan-400 font-bold w-12 shrink-0">
                      {item.time}
                    </span>
                    <div className="flex-1">
                      <span className="text-white font-medium">{item.label}</span>
                      {item.description && (
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Incident Actions Row (#27) */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => addToast('Medical airlift & trauma alert transmitted to St. Jude', 'info')}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold border border-rose-500/20 text-center transition-colors"
                >
                  REQUEST MEDICAL
                </button>
                <button
                  onClick={handleBroadcast}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold border border-amber-500/20 text-center transition-colors"
                >
                  BROADCAST ADVISORY
                </button>
                <button
                  onClick={() => updateIncidentStatus(selectedIncident.id, 'Resolved')}
                  className="p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 font-semibold border border-emerald-800 text-center transition-colors col-span-2 sm:col-span-1"
                >
                  MARK RESOLVED
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 text-xs">
            Select an incident from the queue
          </div>
        )}
      </div>

      {/* Assign Unit Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Assign Tactical Unit
            </h3>
            <p className="text-xs text-slate-400">
              Select or type a rescue unit to attach to Incident #{selectedIncident?.id}:
            </p>
            <div className="space-y-1.5">
              {[
                'Tactical Rescue Team 04',
                'Amphibious Swiftwater 02',
                'Trauma Ambulance 01',
                'Mobile Generator Unit 03'
              ].map((unitName) => (
                <button
                  key={unitName}
                  onClick={() => setResponderAssignInput(unitName)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors ${
                    responderAssignInput === unitName
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {unitName}
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAssign}
                disabled={!responderAssignInput}
                className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors disabled:opacity-50"
              >
                Confirm Dispatch
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
