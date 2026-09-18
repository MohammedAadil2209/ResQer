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
      <div className="lg:col-span-5 bg-white border border-beige-300 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-sm">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-beige-200">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-red-600" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                RESPONSE PLAYBOOKS
              </h2>
            </div>
            <span className="text-[10px] font-mono text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-bold">
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
                      ? 'bg-red-50/50 border-red-500 ring-1 ring-red-400 shadow-sm'
                      : 'bg-beige-50/40 border-beige-200 hover:border-beige-300 hover:bg-beige-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-red-700">
                      #{plan.id}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isRecommended
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-beige-100 text-stone-700 border-beige-300'
                    }`}>
                      {plan.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-stone-900">
                    {plan.title}
                  </h4>
                  <span className="text-[11px] text-stone-600 font-mono block mt-0.5 font-medium">
                    {plan.sector}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Plan Inspector (7 cols) */}
      <div className="lg:col-span-7 bg-white border border-beige-300 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm">
        {selectedPlan && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-beige-200">
              <div>
                <span className="text-xs font-mono text-stone-500 uppercase tracking-wider block font-bold">
                  {selectedPlan.sector} Playbook
                </span>
                <h3 className="text-lg font-extrabold text-stone-900 tracking-tight mt-0.5">
                  {selectedPlan.title}
                </h3>
              </div>

              <span className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-full border ${
                selectedPlan.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-beige-100 text-stone-700 border-beige-300'
              }`}>
                {selectedPlan.status}
              </span>
            </div>

            <p className="text-xs text-stone-800 leading-relaxed font-medium">
              {selectedPlan.description}
            </p>

            {/* Strategic Checklist */}
            <div className="p-4 rounded-xl bg-beige-50/50 border border-beige-200 space-y-3">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-600 tracking-wider block">
                SEQUENTIAL OPERATIONAL ACTIONS
              </span>
              <div className="space-y-2">
                {selectedPlan.keyActions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs p-2.5 rounded-lg bg-white border border-beige-300 shadow-sm">
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-stone-800 font-medium leading-relaxed">
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-beige-100 border border-beige-300 text-xs text-stone-800 font-mono font-medium">
              Activation triggers automatic dispatch routing orders to assigned units and initiates mass SMS geofence advisory in {selectedPlan.sector}.
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-beige-200 flex flex-wrap items-center gap-3">
              {selectedPlan.status !== 'Active' ? (
                <button
                  id="btn-activate-plan"
                  onClick={() => handleActivate(selectedPlan.id)}
                  className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ACTIVATE PLAN</span>
                </button>
              ) : (
                <div className="flex-1 py-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-sm text-center font-mono">
                  ✓ PLAN ACTIVELY DEPLOYED IN SECTOR
                </div>
              )}

              <button
                id="btn-simulate-first"
                onClick={handleSimulateFirst}
                className="px-5 py-3.5 rounded-xl bg-beige-100 hover:bg-beige-200 text-stone-800 font-bold text-xs border border-beige-300 flex items-center gap-2 transition-colors font-mono"
              >
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>SIMULATE FIRST</span>
              </button>

              <button
                onClick={() => addToast('Plan editor opened for ' + selectedPlan.id, 'info')}
                className="px-4 py-3.5 rounded-xl bg-white hover:bg-beige-50 text-stone-800 font-bold text-xs border border-beige-300 transition-colors font-mono"
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
