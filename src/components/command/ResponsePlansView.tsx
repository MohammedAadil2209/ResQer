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
      <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                RESPONSE PLAYBOOKS
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
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
                      ? 'bg-cyan-950/40 border-cyan-400/80 ring-1 ring-cyan-400/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-white">
                      #{plan.id}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      isActive 
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : isRecommended
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {plan.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100">
                    {plan.title}
                  </h4>
                  <span className="text-[11px] text-cyan-400 font-mono block mt-0.5">
                    {plan.sector}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Plan Inspector (7 cols) */}
      <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
        {selectedPlan && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  {selectedPlan.sector} Playbook
                </span>
                <h3 className="text-lg font-extrabold text-white tracking-tight mt-0.5">
                  {selectedPlan.title}
                </h3>
              </div>

              <span className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-full border ${
                selectedPlan.status === 'Active'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-amber-950 text-amber-300 border-amber-800'
              }`}>
                {selectedPlan.status}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedPlan.description}
            </p>

            {/* Strategic Checklist (#31) */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
                SEQUENTIAL OPERATIONAL ACTIONS
              </span>
              <div className="space-y-2">
                {selectedPlan.keyActions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200 font-medium leading-relaxed">
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200">
              Activation triggers automatic dispatch routing orders to assigned units and initiates mass SMS geofence advisory in {selectedPlan.sector}.
            </div>

            {/* Actions (#31) */}
            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-3">
              {selectedPlan.status !== 'Active' ? (
                <button
                  id="btn-activate-plan"
                  onClick={() => handleActivate(selectedPlan.id)}
                  className="flex-1 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ACTIVATE PLAN</span>
                </button>
              ) : (
                <div className="flex-1 py-3.5 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 font-bold text-sm text-center">
                  ✓ PLAN ACTIVELY DEPLOYED IN SECTOR
                </div>
              )}

              <button
                id="btn-simulate-first"
                onClick={handleSimulateFirst}
                className="px-5 py-3.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-purple-300 font-semibold text-xs border border-purple-800 flex items-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>SIMULATE FIRST</span>
              </button>

              <button
                onClick={() => addToast('Plan editor opened for ' + selectedPlan.id, 'info')}
                className="px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors"
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
