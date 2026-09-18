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
      <div className="lg:col-span-5 bg-wine-950 border border-wine-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-wine-800">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-cream-200" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  INCIDENT QUEUE
                </h2>
              </div>
              <p className="text-[11px] text-cream-300 mt-0.5">
                {incidents.length} active emergency operations
              </p>
            </div>

            <span className="text-[10px] font-mono text-cream-100 bg-wine-900 border border-wine-700 px-2 py-0.5 rounded font-bold">
              {incidents.filter(i => i.severity === 'Critical').length} CRITICAL
            </span>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 py-2">
            {(['ALL', 'CRITICAL', 'FLOOD', 'MEDICAL', 'UNASSIGNED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-colors ${
                  filterTab === tab
                    ? 'bg-cream-100 text-wine-950 shadow-sm'
                    : 'bg-wine-900 text-cream-200 hover:text-white border border-wine-800'
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
                      ? 'bg-wine-900 border-cream-200 ring-1 ring-cream-200/50 shadow-lg'
                      : 'bg-wine-900/60 border-wine-800/80 hover:border-wine-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isCrit ? 'bg-cream-100 animate-pulse' : 'bg-wine-400'}`} />
                      <span className="font-mono font-bold text-xs text-white">
                        #{inc.id}
                      </span>
                      <span className="text-[11px] font-bold text-cream-200 font-mono">
                        {inc.type}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      isCrit 
                        ? 'bg-wine-800 text-cream-100 border-wine-600' 
                        : 'bg-wine-900 text-cream-200 border-wine-700'
                    }`}>
                      {inc.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-cream-100 line-clamp-1 mb-2">
                    {inc.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-cream-300 border-t border-wine-800/80 pt-2 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cream-200" />
                      <span>{inc.sector}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-cream-300" />
                      <span>~{inc.peopleAffected} affected</span>
                    </span>
                    <span className={`text-[10px] font-mono ${inc.assignedResponder ? 'text-cream-100 font-bold' : 'text-cream-400'}`}>
                      {inc.assignedResponder ? 'Assigned' : 'Unassigned'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Detailed Incident Inspector (7 cols) */}
      <div className="lg:col-span-7 bg-wine-950 border border-wine-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
        {selectedIncident ? (
          <div className="space-y-4 overflow-y-auto max-h-[640px] pr-1">
            {/* Header Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-wine-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-cream-200">
                    #{selectedIncident.id}
                  </span>
                  <span className="text-xs font-mono uppercase bg-wine-900 text-cream-200 px-2 py-0.5 rounded border border-wine-700">
                    {selectedIncident.sector}
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    selectedIncident.severity === 'Critical'
                      ? 'bg-wine-800 text-cream-100 border-wine-600'
                      : 'bg-wine-900 text-cream-200 border-wine-700'
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
                  className="bg-wine-900 border border-wine-700 text-cream-100 rounded-xl px-3 py-1.5 text-xs font-mono font-bold outline-none cursor-pointer hover:border-cream-200/50"
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
            <div className="p-4 rounded-xl bg-wine-900/60 border border-wine-800 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cream-300 block">
                SITUATION ASSESSMENT
              </span>
              <p className="text-xs text-cream-100 leading-relaxed">
                {selectedIncident.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded bg-wine-900 border border-wine-700 text-cream-200">
                  Road Access: <strong className="text-cream-100">{selectedIncident.roadAccess}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-wine-900 border border-wine-700 text-cream-200">
                  Hospital Load: <strong className="text-cream-100">{selectedIncident.hospitalLoad}%</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-wine-900 border border-wine-700 text-cream-200">
                  Nearby Shelter Load: <strong className="text-cream-100">{selectedIncident.shelterLoad}%</strong>
                </span>
              </div>
            </div>

            {/* Resource Dispatch & Assignment Status */}
            <div className="p-4 rounded-xl bg-wine-900/60 border border-wine-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cream-200">
                  ASSIGNED UNITS &amp; LOGISTICS
                </span>
                <span className="text-xs font-mono text-cream-400">
                  ETA: ~12 min
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-wine-900 border border-wine-700 text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cream-200" />
                  <span className="font-bold text-white font-mono">
                    {selectedIncident.assignedResponder || 'No direct rescue team dispatched'}
                  </span>
                </div>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="px-2.5 py-1 rounded bg-cream-100 hover:bg-white text-wine-950 font-bold text-[11px] transition-colors"
                >
                  {selectedIncident.assignedResponder ? 'CHANGE UNIT' : 'ASSIGN RESPONDER'}
                </button>
              </div>
            </div>

            {/* Response Timeline */}
            <div className="p-4 rounded-xl bg-wine-900/60 border border-wine-800 space-y-3">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cream-300 block">
                INCIDENT RESPONSE TIMELINE
              </span>
              <div className="space-y-2.5 pl-2">
                {selectedIncident.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="font-mono text-cream-200 font-bold w-12 shrink-0">
                      {item.time}
                    </span>
                    <div className="flex-1">
                      <span className="text-white font-medium">{item.label}</span>
                      {item.description && (
                        <p className="text-[11px] text-cream-300 mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Incident Actions Row */}
            <div className="pt-2 border-t border-wine-800 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => addToast('Medical airlift & trauma alert transmitted to St. Jude', 'info')}
                  className="p-2.5 rounded-xl bg-wine-900 hover:bg-wine-850 text-cream-100 font-semibold border border-wine-700 text-center transition-colors"
                >
                  REQUEST MEDICAL
                </button>
                <button
                  onClick={handleBroadcast}
                  className="p-2.5 rounded-xl bg-wine-900 hover:bg-wine-850 text-cream-100 font-semibold border border-wine-700 text-center transition-colors"
                >
                  BROADCAST ADVISORY
                </button>
                <button
                  onClick={() => updateIncidentStatus(selectedIncident.id, 'Resolved')}
                  className="p-2.5 rounded-xl bg-cream-100 hover:bg-white text-wine-950 font-bold border border-cream-200 text-center transition-colors col-span-2 sm:col-span-1"
                >
                  MARK RESOLVED
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-cream-400 text-xs">
            Select an incident from the queue
          </div>
        )}
      </div>

      {/* Assign Unit Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-wine-950 border border-wine-700 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Assign Tactical Unit
            </h3>
            <p className="text-xs text-cream-300">
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
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors font-mono ${
                    responderAssignInput === unitName
                      ? 'bg-cream-100 border-cream-200 text-wine-950 font-bold'
                      : 'bg-wine-900 border-wine-800 text-cream-200 hover:bg-wine-850'
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
                className="flex-1 py-2 rounded-xl bg-cream-100 hover:bg-white text-wine-950 font-bold text-xs transition-colors disabled:opacity-50"
              >
                Confirm Dispatch
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl bg-wine-900 hover:bg-wine-850 text-cream-200 text-xs border border-wine-700"
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
