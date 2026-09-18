import React from 'react';
import { ArrowLeft, Droplets, Flame, Zap, HeartPulse, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const SafetyInfoModal: React.FC = () => {
  const { setCitizenView } = useEmergency();

  const GUIDELINES = [
    {
      hazard: 'Rising Floodwaters',
      icon: Droplets,
      color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800',
      tips: [
        'Move immediately to the highest floor or elevated ground.',
        'Do not drive into flooded roads—6 inches of moving water can knock down an adult; 12 inches can sweep away small cars.',
        'Turn off main electricity breakers if water enters living areas.'
      ]
    },
    {
      hazard: 'Building Fire & Smoke',
      icon: Flame,
      color: 'text-orange-400 bg-orange-950/40 border-orange-800',
      tips: [
        'Stay low beneath smoke—clean air is near the floor.',
        'Feel doors with the back of your hand before opening; if hot, seek secondary exit.',
        'Never use elevators during a structural fire.'
      ]
    },
    {
      hazard: 'Electrical & Downed Lines',
      icon: Zap,
      color: 'text-yellow-400 bg-yellow-950/40 border-yellow-800',
      tips: [
        'Assume all downed wires are energized and deadly.',
        'Maintain at least a 35-foot perimeter away from any fallen lines or electrified fences.',
        'Never touch metal fences or water puddles near a downed line.'
      ]
    },
    {
      hazard: 'Severe Bleeding & Trauma',
      icon: HeartPulse,
      color: 'text-rose-400 bg-rose-950/40 border-rose-800',
      tips: [
        'Apply firm, continuous direct pressure with a clean cloth.',
        'Keep patient warm and calm to prevent traumatic shock.',
        'Do not remove deeply impaled objects.'
      ]
    }
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCitizenView('home')}
            className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Emergency Home</span>
          </button>

          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
            Field Safety Protocol
          </span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            EMERGENCY SAFETY GUIDE
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Immediate survival actions while responders mobilize.
          </p>
        </div>

        <div className="space-y-4">
          {GUIDELINES.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${guide.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-white">
                    {guide.hazard}
                  </h3>
                </div>

                <ul className="space-y-1.5 pl-2">
                  {guide.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-800">
        <button
          onClick={() => setCitizenView('home')}
          className="w-full py-4 rounded-xl font-bold text-base bg-slate-800 hover:bg-slate-700 text-white transition-colors"
        >
          Return to Emergency Home
        </button>
      </div>
    </div>
  );
};
