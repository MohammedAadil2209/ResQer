import React, { useState } from 'react';
import { 
  HeartHandshake, 
  MapPin, 
  Users, 
  CheckCircle2, 
  PlusCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  Phone
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { VolunteerRequirement } from '../../types';

export const CitizenVolunteerHub: React.FC = () => {
  const { 
    volunteerRequirements, 
    volunteerMembers, 
    joinVolunteerRequirement, 
    registerVolunteer, 
    setCitizenView, 
    citizenDraft,
    addToast 
  } = useEmergency();

  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['General Physical Labor']);
  const [showJoinModal, setShowJoinModal] = useState<VolunteerRequirement | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const availableSkills = [
    'First-Aid / CPR',
    'General Physical Labor',
    'Sandbagging',
    'Shelter Logistics',
    'Food / Water Prep',
    '4x4 / Offroad Vehicle',
    'Bilingual Translation',
    'Child / Elder Care'
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleJoinRequirement = (req: VolunteerRequirement) => {
    const nameToUse = volunteerName.trim() || 'Citizen Volunteer';
    joinVolunteerRequirement(req.id, nameToUse, selectedSkills);
    setShowJoinModal(null);
    setIsRegistered(true);
    addToast(`Successfully enrolled in ${req.title}!`, 'success');
  };

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName.trim()) {
      addToast('Please enter your name', 'error');
      return;
    }

    registerVolunteer({
      name: volunteerName,
      sector: citizenDraft.locationSector || 'Zone 13 - Velachery',
      skills: selectedSkills,
      contact: volunteerPhone || 'In-App Direct',
      badges: ['Community Responder']
    });

    setIsRegistered(true);
    addToast('You are registered in the community emergency response roster!', 'success');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCitizenView('home')}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 border border-beige-300 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-mono font-bold text-stone-600 bg-beige-100 px-2.5 py-1 rounded border border-beige-300">
          {volunteerRequirements.length} Needs Open
        </span>
      </div>

      {/* Main Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-beige-300 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-red-600" />
          <h1 className="text-base font-extrabold text-stone-900">
            COMMUNITY VOLUNTEER COORDINATION
          </h1>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          Connect directly with local response requirements. Lend physical assistance, first-aid, or logistics support to neighbor relief teams.
        </p>

        {isRegistered && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Active Volunteer Member:</strong> You are registered on the ResQer volunteer standby roster.
            </span>
          </div>
        )}
      </div>

      {/* Quick Registration Form if not yet registered */}
      {!isRegistered && (
        <div className="p-4 rounded-2xl bg-beige-50 border border-beige-300 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
              JOIN EMERGENCY VOLUNTEER ROSTER
            </h2>
          </div>

          <form onSubmit={handleQuickRegister} className="space-y-2.5 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={volunteerName}
                onChange={(e) => setVolunteerName(e.target.value)}
                placeholder="Your Full Name"
                className="bg-white border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500 font-medium"
              />
              <input
                type="text"
                value={volunteerPhone}
                onChange={(e) => setVolunteerPhone(e.target.value)}
                placeholder="Phone / Mobile #"
                className="bg-white border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500"
              />
            </div>

            <div>
              <span className="text-[11px] font-bold text-stone-700 block mb-1">
                Your Skills &amp; Capabilities:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`text-[10px] font-medium px-2 py-1 rounded-md transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-red-600 text-white font-bold'
                        : 'bg-white text-stone-700 border border-beige-300 hover:bg-beige-100'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
            >
              REGISTER AS VOLUNTEER RESPONDER
            </button>
          </form>
        </div>
      )}

      {/* Open Volunteer Needs List */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700">
          OPEN COMMUNITY MISSIONS &amp; TASKS
        </h2>

        {volunteerRequirements.map((req) => {
          const isFilled = req.assignedCount >= req.neededCount;
          const pct = Math.min(100, Math.round((req.assignedCount / req.neededCount) * 100));

          return (
            <div
              key={req.id}
              className="p-4 rounded-2xl bg-white border border-beige-300 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  req.urgency === 'Immediate' ? 'bg-red-600 text-white' :
                  req.urgency === 'High' ? 'bg-amber-600 text-white' :
                  'bg-beige-100 text-stone-700'
                }`}>
                  {req.urgency} Need
                </span>

                <span className="text-xs font-mono text-stone-600 font-bold bg-beige-100 px-2 py-0.5 rounded">
                  {req.sector}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  {req.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  {req.description}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-beige-50 border border-beige-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-stone-700 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>{req.locationDetails}</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>Coordinator: {req.leadContact}</span>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-medium mb-1">
                  <span className="text-stone-500">Volunteers Joined</span>
                  <span className="text-stone-900 font-bold">
                    {req.assignedCount} / {req.neededCount}
                  </span>
                </div>
                <div className="w-full bg-beige-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-red-600 h-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Join Action */}
              <button
                disabled={isFilled}
                onClick={() => handleJoinRequirement(req)}
                className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isFilled
                    ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed border border-emerald-300'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-sm active:scale-95'
                }`}
              >
                {isFilled ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>TASK FULFILLED</span>
                  </>
                ) : (
                  <>
                    <HeartHandshake className="w-4 h-4" />
                    <span>VOLUNTEER FOR THIS TASK</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
