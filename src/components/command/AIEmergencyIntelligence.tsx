import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertOctagon, 
  Layers, 
  ArrowRight, 
  ShieldAlert, 
  Truck, 
  Route, 
  Building, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const AIEmergencyIntelligence: React.FC = () => {
  const { 
    selectedIncident, 
    activeCollectiveAlert, 
    dismissCollectiveAlert,
    assignResponderToIncident,
    setCommandView,
    dispatchResource,
    scenarioResult,
    scenarioParams
  } = useEmergency();

  const handleQuickAssign = (responderName: string) => {
    if (selectedIncident) {
      assignResponderToIncident(selectedIncident.id, responderName);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4 text-slate-200">
      {/* COLLECTIVE CRISIS DETECTED BANNER (#25) */}
      {activeCollectiveAlert && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-red-950/90 via-slate-900 to-slate-900 border border-red-500/50 shadow-xl shadow-red-950/40 relative overflow-hidden animate-in fade-in slide-in-from-top-3 duration-500">
          <div className="flex items-center justify-between pb-2 border-b border-red-500/20">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-red-300 uppercase">
                AI-GENERATED OPERATIONAL SIGNAL
              </span>
            </div>
            <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
              Confidence: {activeCollectiveAlert.signalStrength}%
            </span>
          </div>

          <div className="mt-2.5">
            <h3 className="text-lg font-black text-white tracking-tight">
              COLLECTIVE CRISIS DETECTED
            </h3>
            <div className="text-xs font-bold text-red-400 mt-0.5">
              {activeCollectiveAlert.sector}
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Flooding <span className="text-slate-500">•</span> Road obstruction <span className="text-slate-500">•</span> Vulnerable population
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">
              {activeCollectiveAlert.reportCount} Convergent Citizen Reports
            </span>
            <button
              onClick={() => setCommandView('signals')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              Examine Feed →
            </button>
          </div>
        </div>
      )}

      {/* MAIN AI INTELLIGENCE CONTAINER (#23) */}
      <div className="flex-1 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              AI EMERGENCY INTELLIGENCE
            </h2>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
            SYNTHESIS ACTIVE
          </span>
        </div>

        {/* 1. CURRENT SITUATION */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1">
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 block">
            CURRENT SITUATION
          </span>
          <p className="text-xs text-slate-200 leading-relaxed">
            "Multiple community reports indicate increasing flood conditions around Sector B2, concentrating access blockage around North Valley Elementary."
          </p>
        </div>

        {/* 2. COLLECTIVE SIGNAL */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
              COLLECTIVE SIGNAL
            </span>
            <span className="text-[11px] font-mono font-bold text-cyan-400">
              5 Related Reports
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <span className="px-2 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
              Flood
            </span>
            <span className="text-slate-500 font-bold">+</span>
            <span className="px-2 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300">
              Road Obstruction
            </span>
            <span className="text-slate-500 font-bold">+</span>
            <span className="px-2 py-1 rounded bg-rose-950 border border-rose-800 text-rose-300">
              Vulnerable Population
            </span>
          </div>
        </div>

        {/* 3. RISK TREND */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 block">
              RISK TREND
            </span>
            <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5 mt-0.5">
              <TrendingUp className="w-4 h-4" />
              ↑ Increasing Rate of Inundation
            </span>
          </div>
          <div className="text-right font-mono text-[11px] text-slate-400">
            <div>+12cm / 10m</div>
            <div className="text-[10px] text-red-400 font-semibold">Stage 2 Breach</div>
          </div>
        </div>

        {/* 4. SCENARIO PROJECTION (#23) */}
        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cyan-300">
              SCENARIO-BASED PROJECTION
            </span>
            <span className="text-[9px] font-bold uppercase text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
              Simulation
            </span>
          </div>
          <p className="text-xs text-cyan-100/90 leading-relaxed italic">
            "Under the selected scenario (+{scenarioParams.waterLevelDelta}% water level), Road 2 becomes completely restricted, elevating Shelter A load to {scenarioResult.projectedShelterOccupancy}%."
          </p>
          <div className="text-[10px] text-slate-400">
            Model grounded in hydrological elevation data. Projections updated dynamically.
          </div>
        </div>

        {/* 5. RECOMMENDED RESPONSE (#29) */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              RECOMMENDED RESPONSE
            </h3>
            <span className="text-[10px] text-cyan-400 font-mono">
              3 Direct Actions
            </span>
          </div>

          {/* Action 1: High Priority Rescue */}
          <div className="p-3 rounded-xl bg-slate-950/90 border border-red-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-red-400">
                01 — HIGH PRIORITY
              </span>
              <span className="text-[10px] text-slate-400">Tactical Staging</span>
            </div>
            <div className="text-xs font-bold text-white">
              Deploy Rescue Team 04
            </div>
            <p className="text-[11px] text-slate-300 leading-normal">
              Reason: School evacuation support required for 20+ vulnerable occupants.
            </p>
            <div className="pt-1 flex gap-2">
              <button
                id="btn-assign-team-04"
                onClick={() => handleQuickAssign('Tactical Rescue Team 04')}
                className="flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow transition-colors"
              >
                ASSIGN NOW
              </button>
              <button
                onClick={() => setCommandView('digital-twin')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                VIEW
              </button>
            </div>
          </div>

          {/* Action 2: Redirect Traffic */}
          <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                02 — HIGH PRIORITY
              </span>
              <span className="text-[10px] text-slate-400">Traffic Routing</span>
            </div>
            <div className="text-xs font-bold text-white">
              Redirect emergency traffic
            </div>
            <p className="text-[11px] text-slate-300">
              From Road 2 → To Road 3 (Elevated bypass).
            </p>
            <button
              id="btn-view-route"
              onClick={() => setCommandView('digital-twin')}
              className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1"
            >
              <Route className="w-3.5 h-3.5" />
              <span>VIEW ROUTE</span>
            </button>
          </div>

          {/* Action 3: Prepare Shelter C */}
          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                03 — MEDIUM
              </span>
              <span className="text-[10px] text-slate-400">Shelter Logistics</span>
            </div>
            <div className="text-xs font-bold text-white">
              Prepare Shelter C
            </div>
            <p className="text-[11px] text-slate-300">
              Reason: Projected capacity pressure on Shelter A (reaching 91%).
            </p>
            <button
              id="btn-activate-shelter-c"
              onClick={() => dispatchResource('RES-SHEL-C')}
              className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors"
            >
              ACTIVATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
