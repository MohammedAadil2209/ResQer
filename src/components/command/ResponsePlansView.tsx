import React, { useState } from 'react';
import { 
  ClipboardList, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  AlertTriangle, 
  Check, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { ResponsePlan } from '../../types';

export const ResponsePlansView: React.FC = () => {
  const { responsePlans, activateResponsePlan, setCommandView, addToast } = useEmergency();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(responsePlans[0]?.id || 'PLAN-B2-FLOOD');

  const selectedPlan = responsePlans.find(p => p.id === selectedPlanId) || responsePlans[0];

  const handleActivate = (planId: string) => {
    activateResponsePlan(planId);
  };

  const handleSimulateFirst = () => {
    setCommandView('simulator');
    addToast('Simulation loaded with Plan parameters', 'info');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
      {/* Left List (5 cols) */}
      <div className="lg:col-span-5 bg-wine-950 border border-wine-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-wine-800">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-cream-200" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                RESPONSE PLAYBOOKS
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cream-100 bg-wine-900 px-2 py-0.5 rounded border border-wine-700 font-bold">
              {responsePlans.length} Strategic Plans
            </span>
          </div>

          <div className="space-y-2 pt-3">
            {responsePlans.map((plan) => {
              const isSelected = plan.id === selectedPlan.id;
              const isRecommended = plan.status === 'Recommended';
              const isActive = plan.status === 'Active';

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-wine-900 border-cream-200 ring-1 ring-cream-200/50 shadow-md'
                      : 'bg-wine-900/60 border-wine-800 hover:border-wine-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-white">
                      #{plan.id}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      isActive 
                        ? 'bg-wine-800 text-cream-100 border-wine-600'
                        : isRecommended
                        ? 'bg-wine-850 text-cream-200 border-wine-700'
                        : 'bg-wine-900 text-cream-300 border-wine-800'
                    }`}>
                      {plan.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-cream-100">
                    {plan.title}
                  </h4>
                  <span className="text-[11px] text-cream-200 font-mono block mt-0.5">
                    {plan.sector}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Plan Inspector (7 cols) */}
      <div className="lg:col-span-7 bg-wine-950 border border-wine-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
        {selectedPlan && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-wine-800">
              <div>
                <span className="text-xs font-mono text-cream-200 uppercase tracking-wider block">
                  {selectedPlan.sector} Playbook
                </span>
                <h3 className="text-lg font-extrabold text-white tracking-tight mt-0.5">
                  {selectedPlan.title}
                </h3>
              </div>

              <span className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-full border ${
                selectedPlan.status === 'Active'
                  ? 'bg-wine-800 text-cream-100 border-wine-600'
                  : 'bg-wine-900 text-cream-200 border-wine-700'
              }`}>
                {selectedPlan.status}
              </span>
            </div>

            <p className="text-xs text-cream-100 leading-relaxed">
              {selectedPlan.description}
            </p>

            {/* Strategic Checklist */}
            <div className="p-4 rounded-xl bg-wine-900/60 border border-wine-800 space-y-3">
              <span className="text-[10px] font-mono uppercase font-bold text-cream-300 tracking-wider block">
                SEQUENTIAL OPERATIONAL ACTIONS
              </span>
              <div className="space-y-2">
                {selectedPlan.keyActions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs p-2.5 rounded-lg bg-wine-950/60 border border-wine-800">
                    <span className="w-5 h-5 rounded-full bg-cream-100 text-wine-950 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-cream-100 font-medium leading-relaxed">
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-wine-900/80 border border-wine-700 text-xs text-cream-200 font-mono">
              Activation triggers automatic dispatch routing orders to assigned units and initiates mass SMS geofence advisory in {selectedPlan.sector}.
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-wine-800 flex flex-wrap items-center gap-3">
              {selectedPlan.status !== 'Active' ? (
                <button
                  id="btn-activate-plan"
                  onClick={() => handleActivate(selectedPlan.id)}
                  className="flex-1 py-3.5 rounded-xl bg-cream-100 hover:bg-white text-wine-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ACTIVATE PLAN</span>
                </button>
              ) : (
                <div className="flex-1 py-3.5 rounded-xl bg-wine-800 border border-wine-600 text-cream-100 font-bold text-sm text-center font-mono">
                  ✓ PLAN ACTIVELY DEPLOYED IN SECTOR
                </div>
              )}

              <button
                id="btn-simulate-first"
                onClick={handleSimulateFirst}
                className="px-5 py-3.5 rounded-xl bg-wine-900 hover:bg-wine-850 text-cream-200 font-semibold text-xs border border-wine-700 flex items-center gap-2 transition-colors font-mono"
              >
                <Sparkles className="w-4 h-4" />
                <span>SIMULATE FIRST</span>
              </button>

              <button
                onClick={() => addToast('Plan editor opened for ' + selectedPlan.id, 'info')}
                className="px-4 py-3.5 rounded-xl bg-wine-850 hover:bg-wine-800 text-cream-200 font-semibold text-xs border border-wine-700 transition-colors font-mono"
              >
                EDIT PLAN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
