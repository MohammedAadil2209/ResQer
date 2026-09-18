import React from 'react';
import { ArrowLeft, Droplets, Flame, Zap, HeartPulse, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const SafetyInfoModal: React.FC = () => {
  const { setCitizenView } = useEmergency();

  const GUIDELINES = [
    {
      hazard: 'Rising Floodwaters',
      icon: Droplets,
      color: 'text-cream-100 bg-wine-900 border-wine-600',
      tips: [
        'Move immediately to the highest floor or elevated ground.',
        'Do not drive into flooded roads—6 inches of moving water can knock down an adult; 12 inches can sweep away small cars.',
        'Turn off main electricity breakers if water enters living areas.'
      ]
    },
    {
      hazard: 'Building Fire & Smoke',
      icon: Flame,
      color: 'text-cream-100 bg-wine-800 border-wine-500',
      tips: [
        'Stay low beneath smoke—clean air is near the floor.',
        'Feel doors with the back of your hand before opening; if hot, seek secondary exit.',
        'Never use elevators during a structural fire.'
      ]
    },
    {
      hazard: 'Electrical & Downed Lines',
      icon: Zap,
      color: 'text-cream-200 bg-wine-900 border-wine-700',
      tips: [
        'Assume all downed wires are energized and deadly.',
        'Maintain at least a 35-foot perimeter away from any fallen lines or electrified fences.',
        'Never touch metal fences or water puddles near a downed line.'
      ]
    },
    {
      hazard: 'Severe Bleeding & Trauma',
      icon: HeartPulse,
      color: 'text-white bg-wine-700 border-wine-400',
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
            className="flex items-center gap-1.5 text-sm text-cream-200 hover:text-white bg-wine-900/80 hover:bg-wine-800 px-3 py-1.5 rounded-lg border border-wine-700/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Emergency Home</span>
          </button>

          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cream-200">
            Field Safety Protocol
          </span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            EMERGENCY SAFETY GUIDE
          </h1>
          <p className="text-sm text-cream-200 mt-1">
            Immediate survival actions while responders mobilize.
          </p>
        </div>

        <div className="space-y-4">
          {GUIDELINES.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-wine-950 border border-wine-700 space-y-2.5 shadow-lg">
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
                    <li key={tIdx} className="text-xs text-cream-200 flex items-start gap-2">
                      <span className="text-cream-300 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-wine-850">
        <button
          onClick={() => setCitizenView('home')}
          className="w-full py-4 rounded-xl font-bold text-base bg-wine-900 hover:bg-wine-800 text-white border border-wine-700 transition-colors shadow-lg active:scale-[0.99]"
        >
          Return to Emergency Home
        </button>
      </div>
    </div>
  );
};
