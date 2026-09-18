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
      <div className="lg:col-span-5 bg-white border border-beige-300 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-sm">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-beige-200">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                  INCIDENT QUEUE
                </h2>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5 font-medium">
                {incidents.length} active emergency operations
              </p>
            </div>

            <span className="text-[10px] font-mono text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-bold">
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
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-beige-100 text-stone-700 hover:text-stone-900 hover:bg-beige-200 border border-beige-300'
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
                      ? 'bg-red-50/50 border-red-500 ring-1 ring-red-400 shadow-sm'
                      : 'bg-beige-50/40 border-beige-200 hover:border-beige-300 hover:bg-beige-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isCrit ? 'bg-red-600 animate-pulse' : 'bg-stone-400'}`} />
                      <span className="font-mono font-bold text-xs text-stone-900">
                        #{inc.id}
                      </span>
                      <span className="text-[11px] font-bold text-stone-700 font-mono">
                        {inc.type}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      isCrit 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'bg-beige-100 text-stone-700 border-beige-300'
                    }`}>
                      {inc.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-stone-900 line-clamp-1 mb-2">
                    {inc.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-stone-600 border-t border-beige-200 pt-2 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-600" />
                      <span>{inc.sector}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-stone-500" />
                      <span>~{inc.peopleAffected} affected</span>
                    </span>
                    <span className={`text-[10px] font-mono font-medium ${inc.assignedResponder ? 'text-emerald-700 font-bold' : 'text-stone-500'}`}>
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
      <div className="lg:col-span-7 bg-white border border-beige-300 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm">
        {selectedIncident ? (
          <div className="space-y-4 overflow-y-auto max-h-[640px] pr-1">
            {/* Header Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-beige-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-red-700">
                    #{selectedIncident.id}
                  </span>
                  <span className="text-xs font-mono uppercase bg-beige-100 text-stone-800 px-2 py-0.5 rounded border border-beige-300 font-medium">
                    {selectedIncident.sector}
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    selectedIncident.severity === 'Critical'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-beige-100 text-stone-700 border-beige-300'
                  }`}>
                    {selectedIncident.severity} PRIORITY
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-stone-900 tracking-tight mt-1">
                  {selectedIncident.title}
                </h3>
              </div>

              {/* Status Selector Dropdown */}
              <div>
                <select
                  aria-label="Update incident status"
                  value={selectedIncident.status}
                  onChange={(e) => updateIncidentStatus(selectedIncident.id, e.target.value as IncidentStatus)}
                  className="bg-beige-50 border border-beige-300 text-stone-900 rounded-xl px-3 py-1.5 text-xs font-mono font-bold outline-none cursor-pointer hover:border-red-500"
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
            <div className="p-4 rounded-xl bg-beige-50/60 border border-beige-200 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-500 block">
                SITUATION ASSESSMENT
              </span>
              <p className="text-xs text-stone-800 leading-relaxed font-medium">
                {selectedIncident.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded bg-white border border-beige-300 text-stone-700 font-medium">
                  Road Access: <strong className="text-stone-900">{selectedIncident.roadAccess}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-white border border-beige-300 text-stone-700 font-medium">
                  Hospital Load: <strong className="text-stone-900">{selectedIncident.hospitalLoad}%</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-white border border-beige-300 text-stone-700 font-medium">
                  Nearby Shelter Load: <strong className="text-stone-900">{selectedIncident.shelterLoad}%</strong>
                </span>
              </div>
            </div>

            {/* Resource Dispatch & Assignment Status */}
            <div className="p-4 rounded-xl bg-beige-50 border border-beige-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-700">
                  ASSIGNED UNITS &amp; LOGISTICS
                </span>
                <span className="text-xs font-mono text-red-700 font-bold">
                  ETA: ~12 min
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-beige-300 text-xs shadow-sm">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-stone-900 font-mono">
                    {selectedIncident.assignedResponder || 'No direct rescue team dispatched'}
                  </span>
                </div>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] transition-colors shadow-sm"
                >
                  {selectedIncident.assignedResponder ? 'CHANGE UNIT' : 'ASSIGN RESPONDER'}
                </button>
              </div>
            </div>

            {/* Response Timeline */}
            <div className="p-4 rounded-xl bg-white border border-beige-300 space-y-3 shadow-sm">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-500 block">
                INCIDENT RESPONSE TIMELINE
              </span>
              <div className="space-y-2.5 pl-2">
                {selectedIncident.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="font-mono text-stone-700 font-bold w-12 shrink-0">
                      {item.time}
                    </span>
                    <div className="flex-1">
                      <span className="text-stone-900 font-bold">{item.label}</span>
                      {item.description && (
                        <p className="text-[11px] text-stone-600 mt-0.5 font-medium">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Incident Actions Row */}
            <div className="pt-2 border-t border-beige-200 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => addToast('Medical airlift & trauma alert transmitted to St. Jude', 'info')}
                  className="p-2.5 rounded-xl bg-beige-100 hover:bg-beige-200 text-stone-800 font-bold border border-beige-300 text-center transition-colors"
                >
                  REQUEST MEDICAL
                </button>
                <button
                  onClick={handleBroadcast}
                  className="p-2.5 rounded-xl bg-beige-100 hover:bg-beige-200 text-stone-800 font-bold border border-beige-300 text-center transition-colors"
                >
                  BROADCAST ADVISORY
                </button>
                <button
                  onClick={() => updateIncidentStatus(selectedIncident.id, 'Resolved')}
                  className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold border border-red-700 text-center transition-colors col-span-2 sm:col-span-1 shadow-sm"
                >
                  MARK RESOLVED
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400 text-xs font-medium">
            Select an incident from the queue
          </div>
        )}
      </div>

      {/* Assign Unit Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-beige-300 p-5 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">
              Assign Tactical Unit
            </h3>
            <p className="text-xs text-stone-600 font-medium">
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
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors font-mono font-medium ${
                    responderAssignInput === unitName
                      ? 'bg-red-600 border-red-700 text-white font-bold'
                      : 'bg-beige-50 border-beige-200 text-stone-800 hover:bg-beige-100'
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
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors disabled:opacity-50 shadow-sm"
              >
                Confirm Dispatch
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl bg-beige-100 hover:bg-beige-200 text-stone-800 text-xs border border-beige-300 font-medium"
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
