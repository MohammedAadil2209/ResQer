import React, { useState } from 'react';
import { 
  Flame, 
  Droplets, 
  Stethoscope, 
  Car, 
  Building2, 
  Zap, 
  Users, 
  HelpCircle, 
  MapPin, 
  User, 
  UserPlus, 
  Minus, 
  Plus, 
  Send, 
  ArrowLeft, 
  Check, 
  ShieldAlert 
} from 'lucide-react';
import { EmergencyHazard } from '../../types';
import { useEmergency } from '../../context/EmergencyContext';

const HAZARDS: { type: EmergencyHazard; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { type: 'Fire', label: 'Fire', icon: Flame, color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
  { type: 'Flood', label: 'Flood', icon: Droplets, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
  { type: 'Medical', label: 'Medical', icon: Stethoscope, color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
  { type: 'Accident', label: 'Accident', icon: Car, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  { type: 'Building Damage', label: 'Building Damage', icon: Building2, color: 'text-stone-300 border-stone-500/30 bg-stone-500/10' },
  { type: 'Electrical', label: 'Electrical Hazard', icon: Zap, color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' },
  { type: 'People Trapped', label: 'People Trapped', icon: Users, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  { type: 'Other', label: 'Other Hazard', icon: HelpCircle, color: 'text-slate-300 border-slate-500/30 bg-slate-500/10' },
];

const SECTOR_OPTIONS = [
  { id: 'Sector B2', label: 'Sector B2 (River Valley & Elementary School)', verified: true },
  { id: 'Sector A1', label: 'Sector A1 (Power Depot & Industrial)', verified: true },
  { id: 'Sector C4', label: 'Sector C4 (Highway Bypass & Mile 14)', verified: true },
  { id: 'Sector D1', label: 'Sector D1 (Old Market District)', verified: true },
  { id: 'Sector B1', label: 'Sector B1 (Civic & Medical Center)', verified: true },
];

export const CitizenReportWizard: React.FC = () => {
  const { citizenDraft, setCitizenDraft, submitCitizenEmergency, setCitizenView } = useEmergency();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as any);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as any);
    } else {
      setCitizenView('home');
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      submitCitizenEmergency();
      setIsSubmitting(false);
      setCitizenView('confirmation');
    }, 500);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Header & Step Tracker */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            id="btn-wizard-back"
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-stone-700 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 px-3 py-1.5 rounded-lg border border-beige-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
              Step {currentStep} of 4
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step === currentStep 
                      ? 'w-6 bg-red-600' 
                      : step < currentStep 
                      ? 'w-2 bg-red-300' 
                      : 'w-2 bg-beige-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* STEP 1: WHAT IS HAPPENING? */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                WHAT IS HAPPENING?
              </h2>
              <p className="text-sm text-stone-600 mt-1 font-medium">
                Select the primary emergency hazard you are facing.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {HAZARDS.map(({ type, label, icon: Icon }) => {
                const isSelected = citizenDraft.hazard === type;
                return (
                  <button
                    key={type}
                    id={`btn-hazard-${type.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => {
                      setCitizenDraft((prev) => ({ ...prev, hazard: type }));
                    }}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between min-h-[96px] ${
                      isSelected
                        ? 'border-red-600 bg-red-50 ring-2 ring-red-500/30 shadow-md text-stone-900'
                        : 'border-beige-300 bg-white hover:bg-beige-50 text-stone-800 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-7 h-7 ${isSelected ? 'text-red-600' : 'text-stone-600'}`} />
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className={`font-bold text-base mt-3 ${isSelected ? 'text-red-900' : 'text-stone-900'}`}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: WHERE IS IT? */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                WHERE IS IT?
              </h2>
              <p className="text-sm text-stone-600 mt-1 font-medium">
                Location verified via high-precision emergency cell triangulation.
              </p>
            </div>

            {/* Simulated Map Visual */}
            <div className="relative rounded-2xl overflow-hidden border border-beige-300 bg-beige-50 h-56 flex flex-col items-center justify-center p-4">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Topographic water contour simulation */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-red-50/50 border-t border-red-200" />
              
              {/* Radar pulse around marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-20 h-20 rounded-full bg-red-400/20 animate-ping" />
                  <div className="absolute w-12 h-12 rounded-full bg-red-400/30" />
                  <div className="w-10 h-10 rounded-full bg-red-600 border-2 border-white text-white flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-3 text-center bg-white border border-beige-300 px-4 py-1.5 rounded-lg shadow-sm">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block font-mono">
                    YOUR LOCATION
                  </span>
                  <span className="text-base font-bold text-stone-900">
                    {citizenDraft.locationSector || 'Sector B2'}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 text-[10px] text-stone-600 bg-white/90 border border-beige-300 px-2 py-0.5 rounded font-mono font-semibold">
                GPS Confidence: 98%
              </div>
            </div>

            {/* Location selector toggle */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block font-mono">
                Choose Specific Sector:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {SECTOR_OPTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setCitizenDraft(prev => ({ ...prev, locationSector: sec.id }))}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm text-left transition-all ${
                      citizenDraft.locationSector === sec.id
                        ? 'border-red-600 bg-red-50 text-stone-900 font-bold shadow-sm'
                        : 'border-beige-300 bg-white text-stone-800 hover:bg-beige-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className={`w-4 h-4 ${citizenDraft.locationSector === sec.id ? 'text-red-600' : 'text-stone-500'}`} />
                      <span>{sec.label}</span>
                    </div>
                    {citizenDraft.locationSector === sec.id && (
                      <Check className="w-4 h-4 text-red-600 stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: WHO NEEDS HELP? */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                WHO NEEDS HELP?
              </h2>
              <p className="text-sm text-stone-600 mt-1 font-medium">
                Help emergency responders prepare proper medical triage.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'Me', label: 'Just Me', icon: User },
                { type: 'Someone else', label: 'Someone Else', icon: UserPlus },
                { type: 'Multiple people', label: 'Multiple People', icon: Users },
              ].map(({ type, label, icon: Icon }) => {
                const isSelected = citizenDraft.targetPerson === type;
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setCitizenDraft((prev) => ({ 
                        ...prev, 
                        targetPerson: type as any,
                        peopleCount: type === 'Me' ? 1 : type === 'Someone else' ? 1 : Math.max(2, prev.peopleCount)
                      }));
                    }}
                    className={`p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'border-red-600 bg-red-50 text-stone-900 ring-2 ring-red-500/30 shadow-sm'
                        : 'border-beige-300 bg-white text-stone-700 hover:bg-beige-50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-red-600' : 'text-stone-600'}`} />
                    <span className="text-xs sm:text-sm font-bold">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Approximate count counter */}
            <div className="p-5 rounded-2xl bg-white border border-beige-300 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-sm font-bold text-stone-900 block">
                  Approximate Number of People
                </span>
                <span className="text-xs text-stone-600 font-medium">
                  Responders will scale vehicle allocation accordingly.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCitizenDraft(prev => ({ ...prev, peopleCount: Math.max(1, prev.peopleCount - 1) }))}
                  className="w-10 h-10 rounded-xl bg-beige-100 border border-beige-300 hover:bg-beige-200 text-stone-900 flex items-center justify-center active:scale-95 transition-all"
                  aria-label="Decrease people count"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-xl font-extrabold text-stone-900">
                  {citizenDraft.peopleCount}
                </span>
                <button
                  onClick={() => setCitizenDraft(prev => ({ ...prev, peopleCount: prev.peopleCount + 1 }))}
                  className="w-10 h-10 rounded-xl bg-beige-100 border border-beige-300 hover:bg-beige-200 text-stone-900 flex items-center justify-center active:scale-95 transition-all"
                  aria-label="Increase people count"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: ANYTHING IMPORTANT? */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                ANYTHING IMPORTANT?
              </h2>
              <p className="text-sm text-stone-600 mt-1 font-medium">
                Optional: mention trapped people, medical conditions, or hazards.
              </p>
            </div>

            <div className="space-y-3">
              <textarea
                id="input-emergency-details"
                rows={4}
                value={citizenDraft.details}
                onChange={(e) => setCitizenDraft(prev => ({ ...prev, details: e.target.value }))}
                placeholder="Example: elderly people are inside, water rising fast..."
                className="w-full bg-white border border-beige-300 focus:border-red-600 focus:ring-2 focus:ring-red-500/20 text-stone-900 placeholder-stone-400 p-4 rounded-xl text-base outline-none resize-none shadow-sm"
              />

              <div className="flex flex-wrap gap-2 text-xs">
                {['Elderly people inside', 'Children present', 'Oxygen tank needed', 'Impassable driveway', 'Power lines down'].map(quickTag => (
                  <button
                    key={quickTag}
                    type="button"
                    onClick={() => {
                      setCitizenDraft(prev => ({
                        ...prev,
                        details: prev.details ? `${prev.details}. ${quickTag}.` : `${quickTag}.`
                      }));
                    }}
                    className="px-2.5 py-1 rounded-lg bg-beige-100 hover:bg-beige-200 border border-beige-300 text-stone-800 font-medium transition-colors"
                  >
                    + {quickTag}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Review Card */}
            <div className="p-4 rounded-xl bg-beige-50 border border-beige-300 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Hazard:</span>
                <span className="font-bold text-stone-900">{citizenDraft.hazard || 'Not specified'}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Location:</span>
                <span className="font-bold text-stone-900">{citizenDraft.locationSector}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Affected:</span>
                <span className="font-bold text-stone-900">{citizenDraft.peopleCount} {citizenDraft.peopleCount > 1 ? 'people' : 'person'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons at Bottom */}
      <div className="mt-8 pt-4 border-t border-beige-200">
        {currentStep < 4 ? (
          <button
            id="btn-wizard-next"
            onClick={handleNext}
            disabled={currentStep === 1 && !citizenDraft.hazard}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md ${
              currentStep === 1 && !citizenDraft.hazard
                ? 'bg-beige-200 text-stone-400 cursor-not-allowed border border-beige-300'
                : 'bg-red-600 hover:bg-red-700 text-white border border-red-700 active:scale-[0.99]'
            }`}
          >
            <span>Continue</span>
          </button>
        ) : (
          <button
            id="btn-send-emergency-final"
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            className="w-full py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/20 border border-red-700 active:scale-[0.99] flex items-center justify-center gap-3 transition-all"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>TRANSMITTING EMERGENCY...</span>
              </div>
            ) : (
              <>
                <ShieldAlert className="w-6 h-6 text-white" />
                <span>SEND EMERGENCY</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
