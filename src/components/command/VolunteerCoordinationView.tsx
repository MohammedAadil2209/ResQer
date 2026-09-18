import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Users, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  PlusCircle, 
  Award, 
  Phone, 
  Shield, 
  Filter, 
  X, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { VolunteerRequirement, VolunteerMember, VolunteerUrgency } from '../../types';

export const VolunteerCoordinationView: React.FC = () => {
  const { 
    volunteerRequirements, 
    volunteerMembers, 
    addVolunteerRequirement, 
    registerVolunteer, 
    assignVolunteerToRequirement,
    addToast 
  } = useEmergency();

  const [activeTab, setActiveTab] = useState<'requirements' | 'roster'>('requirements');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [assigningReqId, setAssigningReqId] = useState<string | null>(null);

  // New requirement form state
  const [newReqTitle, setNewReqTitle] = useState('');
  const [newReqSector, setNewReqSector] = useState('Sector B2');
  const [newReqUrgency, setNewReqUrgency] = useState<VolunteerUrgency>('Immediate');
  const [newReqSkills, setNewReqSkills] = useState('Physical Labor, Sandbagging');
  const [newReqNeeded, setNewReqNeeded] = useState(10);
  const [newReqLead, setNewReqLead] = useState('Volunteer Coordinator Miller');
  const [newReqLocation, setNewReqLocation] = useState('River Road Staging Point');
  const [newReqDesc, setNewReqDesc] = useState('');

  // New volunteer registration state
  const [newVolName, setNewVolName] = useState('');
  const [newVolSector, setNewVolSector] = useState('Sector B2');
  const [newVolSkills, setNewVolSkills] = useState('First-Aid / CPR, Physical Labor');
  const [newVolContact, setNewVolContact] = useState('+1 (555) 000-0000');

  const filteredRequirements = volunteerRequirements.filter(r => {
    if (filterSector !== 'all' && r.sector !== filterSector) return false;
    return true;
  });

  const filteredVolunteers = volunteerMembers.filter(v => {
    if (filterSector !== 'all' && v.sector !== filterSector) return false;
    return true;
  });

  const totalVolunteers = volunteerMembers.length;
  const activeVolunteers = volunteerMembers.filter(v => v.status === 'ASSIGNED' || v.status === 'ON_SCENE').length;
  const openReqs = volunteerRequirements.filter(r => r.status === 'OPEN' || r.status === 'IN_PROGRESS').length;
  const totalNeededSpots = volunteerRequirements.reduce((acc, r) => acc + r.neededCount, 0);
  const totalAssignedSpots = volunteerRequirements.reduce((acc, r) => acc + r.assignedCount, 0);
  const fulfillmentRate = totalNeededSpots > 0 ? Math.round((totalAssignedSpots / totalNeededSpots) * 100) : 100;

  const handleCreateRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReqTitle.trim()) {
      addToast('Please enter a requirement title', 'error');
      return;
    }

    addVolunteerRequirement({
      title: newReqTitle,
      sector: newReqSector,
      urgency: newReqUrgency,
      skillsRequired: newReqSkills.split(',').map(s => s.trim()).filter(Boolean),
      neededCount: Number(newReqNeeded),
      leadContact: newReqLead,
      locationDetails: newReqLocation,
      description: newReqDesc || `${newReqTitle} emergency response team requirement.`
    });

    setShowPostModal(false);
    setNewReqTitle('');
    setNewReqDesc('');
  };

  const handleRegisterVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVolName.trim()) {
      addToast('Please enter volunteer name', 'error');
      return;
    }

    registerVolunteer({
      name: newVolName,
      sector: newVolSector,
      skills: newVolSkills.split(',').map(s => s.trim()).filter(Boolean),
      contact: newVolContact,
      badges: ['Community Volunteer']
    });

    setShowRegisterModal(false);
    setNewVolName('');
  };

  const handleAssignVolunteer = (volId: string, reqId: string) => {
    assignVolunteerToRequirement(volId, reqId);
    setAssigningReqId(null);
  };

  const availableVolunteers = volunteerMembers.filter(v => v.status === 'READY');

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      {/* Top Telemetry KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>REGISTERED VOLUNTEERS</span>
            <Users className="w-4 h-4 text-stone-800" />
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1 font-mono">{totalVolunteers}</div>
          <span className="text-[10px] text-emerald-700 font-medium">{availableVolunteers.length} ready on standby</span>
        </div>

        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>ACTIVE ON SCENE</span>
            <HeartHandshake className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-600 mt-1 font-mono">{activeVolunteers}</div>
          <span className="text-[10px] text-stone-500 font-medium">Assigned to response squads</span>
        </div>

        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>RESPONSE REQUIREMENTS</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1 font-mono">{openReqs}</div>
          <span className="text-[10px] text-stone-500 font-medium">Active volunteer missions</span>
        </div>

        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>FULFILLMENT RATE</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">{fulfillmentRate}%</div>
          <span className="text-[10px] text-stone-500 font-medium">{totalAssignedSpots} / {totalNeededSpots} spots filled</span>
        </div>
      </div>

      {/* Main Workspace Card */}
      <div className="bg-white border border-beige-300 rounded-2xl p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-beige-200">
          <div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-red-600" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                VOLUNTEER COORDINATION &amp; REQUIREMENT MATCHING
              </h2>
              <span className="text-[10px] font-mono text-white bg-red-600 px-1.5 py-0.2 rounded font-bold">
                SYSTEM OBJECTIVE #4
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5 font-medium">
              Connect registered community volunteers with critical response requirements, skills dispatch, and frontline missions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="bg-beige-100 p-1 rounded-xl flex items-center border border-beige-300">
              <button
                onClick={() => setActiveTab('requirements')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'requirements' 
                    ? 'bg-red-600 text-white shadow-sm' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Response Tasks ({volunteerRequirements.length})
              </button>
              <button
                onClick={() => setActiveTab('roster')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'roster' 
                    ? 'bg-red-600 text-white shadow-sm' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Volunteer Roster ({volunteerMembers.length})
              </button>
            </div>

            {activeTab === 'requirements' ? (
              <button
                onClick={() => setShowPostModal(true)}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>POST REQUIREMENT</span>
              </button>
            ) : (
              <button
                onClick={() => setShowRegisterModal(true)}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>REGISTER VOLUNTEER</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Response Requirements */}
        {activeTab === 'requirements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[520px] pr-1">
            {filteredRequirements.map((req) => {
              const pct = Math.min(100, Math.round((req.assignedCount / req.neededCount) * 100));
              const isFilled = req.assignedCount >= req.neededCount;

              return (
                <div
                  key={req.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 shadow-sm ${
                    isFilled 
                      ? 'bg-stone-50 border-emerald-200' 
                      : 'bg-white border-beige-300 hover:border-red-400'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        req.urgency === 'Immediate' ? 'bg-red-600 text-white animate-pulse' :
                        req.urgency === 'High' ? 'bg-amber-600 text-white' :
                        'bg-beige-100 text-stone-700 border border-beige-300'
                      }`}>
                        {req.urgency} Urgency
                      </span>

                      <span className="text-[10px] font-mono text-stone-700 font-bold bg-beige-100 border border-beige-300 px-2 py-0.5 rounded">
                        {req.sector}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900 leading-snug">
                      {req.title}
                    </h4>

                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                      {req.description}
                    </p>

                    {/* Location & Lead */}
                    <div className="mt-2.5 pt-2 border-t border-beige-200 text-xs space-y-1">
                      <div className="flex items-center gap-1 text-stone-600 text-[11px]">
                        <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                        <span>{req.locationDetails}</span>
                      </div>
                      <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                        <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                        <span>Lead: {req.leadContact}</span>
                      </div>
                    </div>

                    {/* Required Skills */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {req.skillsRequired.map(skill => (
                        <span key={skill} className="text-[10px] font-mono bg-beige-50 text-stone-700 px-1.5 py-0.5 rounded border border-beige-200 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Progress Bar: Spots Filled */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs font-mono font-semibold mb-1">
                        <span className="text-stone-500">VOLUNTEERS DEPLOYED</span>
                        <span className={isFilled ? 'text-emerald-700 font-bold' : 'text-stone-900 font-bold'}>
                          {req.assignedCount} / {req.neededCount} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-beige-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full transition-all ${isFilled ? 'bg-emerald-600' : 'bg-red-600'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Connect Volunteer Action */}
                  <div className="pt-2 border-t border-beige-200">
                    {assigningReqId === req.id ? (
                      <div className="space-y-2 p-2 rounded-lg bg-beige-50 border border-beige-300">
                        <div className="text-[11px] font-bold text-stone-900">
                          Select available volunteer to assign:
                        </div>
                        {availableVolunteers.length === 0 ? (
                          <div className="text-[11px] text-stone-500 italic">
                            No volunteers currently on standby. Register a new volunteer first.
                          </div>
                        ) : (
                          <div className="max-h-28 overflow-y-auto space-y-1">
                            {availableVolunteers.map(v => (
                              <button
                                key={v.id}
                                onClick={() => handleAssignVolunteer(v.id, req.id)}
                                className="w-full text-left p-1.5 rounded bg-white hover:bg-red-50 hover:border-red-300 border border-beige-200 flex items-center justify-between text-xs transition-colors"
                              >
                                <span className="font-bold text-stone-900">{v.name}</span>
                                <span className="text-[10px] font-mono text-stone-500">{v.skills[0]}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => setAssigningReqId(null)}
                          className="w-full py-1 text-[11px] font-semibold text-stone-600 hover:text-stone-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        disabled={isFilled}
                        onClick={() => setAssigningReqId(req.id)}
                        className={`w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm ${
                          isFilled 
                            ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed border border-emerald-300' 
                            : 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
                        }`}
                      >
                        {isFilled ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>REQUIREMENT FULFILLED</span>
                          </>
                        ) : (
                          <>
                            <HeartHandshake className="w-3.5 h-3.5" />
                            <span>CONNECT VOLUNTEER ({req.neededCount - req.assignedCount} NEEDED)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Volunteer Roster */}
        {activeTab === 'roster' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[520px] pr-1">
            {filteredVolunteers.map((vol) => (
              <div
                key={vol.id}
                className="p-4 rounded-xl bg-white border border-beige-300 hover:border-beige-400 transition-all flex flex-col justify-between space-y-3 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-beige-100 border border-beige-300 flex items-center justify-center font-bold text-xs text-stone-800">
                        {vol.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-900">{vol.name}</h4>
                        <span className="text-[10px] text-stone-500 font-mono">{vol.sector}</span>
                      </div>
                    </div>

                    <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      vol.status === 'READY' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      vol.status === 'ASSIGNED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      vol.status === 'ON_SCENE' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-beige-100 text-stone-700 border-beige-300'
                    }`}>
                      {vol.status}
                    </span>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {vol.skills.map(s => (
                      <span key={s} className="text-[10px] bg-beige-100 text-stone-800 px-2 py-0.5 rounded font-medium border border-beige-200">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Contact & Badges */}
                  <div className="mt-2.5 pt-2 border-t border-beige-200 space-y-1 text-xs">
                    <div className="text-[11px] text-stone-600 font-mono">
                      Contact: {vol.contact}
                    </div>
                    {vol.assignedRequirementId && (
                      <div className="text-[11px] text-red-700 font-mono font-semibold">
                        Mission: #{vol.assignedRequirementId}
                      </div>
                    )}
                    {vol.badges && vol.badges.length > 0 && (
                      <div className="flex items-center gap-1 text-[10px] text-amber-700 font-medium mt-1">
                        <Award className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{vol.badges.join(' • ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-beige-200">
                  {vol.status === 'READY' ? (
                    <button
                      onClick={() => {
                        setActiveTab('requirements');
                        addToast(`Select a response requirement to match with ${vol.name}`, 'info');
                      }}
                      className="w-full py-1.5 rounded-lg bg-beige-100 hover:bg-beige-200 text-stone-800 font-bold text-xs border border-beige-300 flex items-center justify-center gap-1 transition-colors"
                    >
                      <ArrowRight className="w-3 h-3" />
                      <span>MATCH WITH REQUIREMENT</span>
                    </button>
                  ) : (
                    <div className="text-center text-xs font-mono text-stone-500 py-1">
                      Active on mission since {vol.checkInTime || 'recently'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Post Volunteer Requirement */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-beige-300 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-beige-200">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                  POST RESPONSE REQUIREMENT
                </h3>
              </div>
              <button 
                onClick={() => setShowPostModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequirement} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Task / Mission Title
                </label>
                <input
                  type="text"
                  required
                  value={newReqTitle}
                  onChange={(e) => setNewReqTitle(e.target.value)}
                  placeholder="e.g. River Embankment Sandbagging Squad"
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2.5 text-stone-900 font-medium outline-none focus:border-red-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Sector Location
                  </label>
                  <select
                    value={newReqSector}
                    onChange={(e) => setNewReqSector(e.target.value)}
                    className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500 font-mono"
                  >
                    <option value="Sector B2">Sector B2 (River Valley)</option>
                    <option value="Sector B1">Sector B1 (Civic & Medical)</option>
                    <option value="Sector C2">Sector C2 (East Shelter)</option>
                    <option value="Sector A1">Sector A1 (Industrial)</option>
                    <option value="Sector A2">Sector A2 (North Ridge)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Urgency Level
                  </label>
                  <select
                    value={newReqUrgency}
                    onChange={(e) => setNewReqUrgency(e.target.value as VolunteerUrgency)}
                    className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500 font-bold"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Volunteers Needed (Headcount)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newReqNeeded}
                    onChange={(e) => setNewReqNeeded(Number(e.target.value))}
                    className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 font-mono outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Lead Coordinator
                  </label>
                  <input
                    type="text"
                    value={newReqLead}
                    onChange={(e) => setNewReqLead(e.target.value)}
                    className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Required Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={newReqSkills}
                  onChange={(e) => setNewReqSkills(e.target.value)}
                  placeholder="e.g. Physical Labor, Sandbagging, First-Aid"
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Staging Address / Assembly Point
                </label>
                <input
                  type="text"
                  value={newReqLocation}
                  onChange={(e) => setNewReqLocation(e.target.value)}
                  placeholder="e.g. River Road Staging Point near North Bridge"
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Mission Brief / Description
                </label>
                <textarea
                  rows={2}
                  value={newReqDesc}
                  onChange={(e) => setNewReqDesc(e.target.value)}
                  placeholder="Explain the critical goal of this volunteer response task..."
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  PUBLISH REQUIREMENT TO VOLUNTEER NETWORK
                </button>
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-beige-100 hover:bg-beige-200 text-stone-700 font-semibold text-xs border border-beige-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Register Volunteer */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-beige-300 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-beige-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                  REGISTER FIELD VOLUNTEER
                </h3>
              </div>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterVolunteer} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Volunteer Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newVolName}
                  onChange={(e) => setNewVolName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2.5 text-stone-900 font-medium outline-none focus:border-red-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Current Sector
                </label>
                <select
                  value={newVolSector}
                  onChange={(e) => setNewVolSector(e.target.value)}
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500 font-mono"
                >
                  <option value="Sector B2">Sector B2 (River Valley)</option>
                  <option value="Sector B1">Sector B1 (Civic & Medical)</option>
                  <option value="Sector C2">Sector C2 (East Shelter)</option>
                  <option value="Sector A1">Sector A1 (Industrial)</option>
                  <option value="Sector A2">Sector A2 (North Ridge)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Skills &amp; Capabilities (comma separated)
                </label>
                <input
                  type="text"
                  value={newVolSkills}
                  onChange={(e) => setNewVolSkills(e.target.value)}
                  placeholder="e.g. First-Aid / CPR, 4x4 Driver, Logistics"
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Contact Phone / Radio Call
                </label>
                <input
                  type="text"
                  value={newVolContact}
                  onChange={(e) => setNewVolContact(e.target.value)}
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  ENROLL VOLUNTEER INTO ACTIVE ROSTER
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-beige-100 hover:bg-beige-200 text-stone-700 font-semibold text-xs border border-beige-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
