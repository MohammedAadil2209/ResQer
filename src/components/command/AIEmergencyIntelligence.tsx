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
    <div className="h-full flex flex-col space-y-4 text-cream-100">
      {/* COLLECTIVE CRISIS DETECTED BANNER */}
      {activeCollectiveAlert && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-wine-900 via-wine-950 to-wine-950 border border-wine-600 shadow-xl shadow-wine-950/70 relative overflow-hidden animate-in fade-in slide-in-from-top-3 duration-500">
          <div className="flex items-center justify-between pb-2 border-b border-wine-800">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-cream-200 shrink-0" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-cream-200 uppercase">
                AI-GENERATED OPERATIONAL SIGNAL
              </span>
            </div>
            <span className="text-[10px] font-mono bg-wine-800 text-cream-100 px-2 py-0.5 rounded border border-wine-600">
              Confidence: {activeCollectiveAlert.signalStrength}%
            </span>
          </div>

          <div className="mt-2.5">
            <h3 className="text-lg font-black text-white tracking-tight">
              COLLECTIVE CRISIS DETECTED
            </h3>
            <div className="text-xs font-bold text-cream-200 mt-0.5 font-mono">
              {activeCollectiveAlert.sector}
            </div>
            <p className="text-xs text-cream-300 mt-1 leading-relaxed">
              Flooding <span className="text-wine-700">•</span> Road obstruction <span className="text-wine-700">•</span> Vulnerable population
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-wine-800/80 flex items-center justify-between text-xs">
            <span className="text-cream-400 text-[11px] font-mono">
              {activeCollectiveAlert.reportCount} Convergent Citizen Reports
            </span>
            <button
              onClick={() => setCommandView('signals')}
              className="text-cream-100 hover:text-white font-semibold flex items-center gap-1 underline underline-offset-2"
            >
              Examine Feed →
            </button>
          </div>
        </div>
      )}

      {/* MAIN AI INTELLIGENCE CONTAINER */}
      <div className="flex-1 bg-wine-950 border border-wine-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-wine-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-200">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              AI EMERGENCY INTELLIGENCE
            </h2>
          </div>
          <span className="text-[10px] font-mono text-cream-100 bg-wine-900 border border-wine-700 px-2 py-0.5 rounded">
            SYNTHESIS ACTIVE
          </span>
        </div>

        {/* 1. CURRENT SITUATION */}
        <div className="p-3.5 rounded-xl bg-wine-900/60 border border-wine-800 space-y-1">
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cream-300 block">
            CURRENT SITUATION
          </span>
          <p className="text-xs text-cream-100 leading-relaxed">
            "Multiple community reports indicate increasing flood conditions around Sector B2, concentrating access blockage around North Valley Elementary."
          </p>
        </div>

        {/* 2. COLLECTIVE SIGNAL */}
        <div className="p-3.5 rounded-xl bg-wine-900/60 border border-wine-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cream-300">
              COLLECTIVE SIGNAL
            </span>
            <span className="text-[11px] font-mono font-bold text-cream-100">
              5 Related Reports
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <span className="px-2 py-1 rounded bg-wine-900 border border-wine-700 text-cream-100 font-mono">
              Flood
            </span>
            <span className="text-wine-600 font-bold">+</span>
            <span className="px-2 py-1 rounded bg-wine-900 border border-wine-700 text-cream-200 font-mono">
              Road Obstruction
            </span>
            <span className="text-wine-600 font-bold">+</span>
            <span className="px-2 py-1 rounded bg-wine-900 border border-wine-700 text-cream-300 font-mono">
              Vulnerable Population
            </span>
          </div>
        </div>

        {/* 3. RISK TREND */}
        <div className="p-3.5 rounded-xl bg-wine-900/60 border border-wine-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cream-300 block">
              RISK TREND
            </span>
            <span className="text-sm font-bold text-cream-100 flex items-center gap-1.5 mt-0.5">
              <TrendingUp className="w-4 h-4" />
              ↑ Increasing Rate of Inundation
            </span>
          </div>
          <div className="text-right font-mono text-[11px] text-cream-300">
            <div>+12cm / 10m</div>
            <div className="text-[10px] text-cream-100 font-semibold">Stage 2 Breach</div>
          </div>
        </div>

        {/* 4. SCENARIO PROJECTION */}
        <div className="p-3.5 rounded-xl bg-wine-900/80 border border-wine-700/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cream-200">
              SCENARIO-BASED PROJECTION
            </span>
            <span className="text-[9px] font-bold uppercase text-cream-100 bg-wine-800 px-1.5 py-0.2 rounded border border-wine-600 font-mono">
              Simulation
            </span>
          </div>
          <p className="text-xs text-cream-100 leading-relaxed italic">
            "Under the selected scenario (+{scenarioParams.waterLevelDelta}% water level), Road 2 becomes completely restricted, elevating Shelter A load to {scenarioResult.projectedShelterOccupancy}%."
          </p>
          <div className="text-[10px] text-cream-400 font-mono">
            Model grounded in hydrological elevation data. Projections updated dynamically.
          </div>
        </div>

        {/* 5. RECOMMENDED RESPONSE */}
        <div className="space-y-2 pt-2 border-t border-wine-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              RECOMMENDED RESPONSE
            </h3>
            <span className="text-[10px] text-cream-200 font-mono">
              3 Direct Actions
            </span>
          </div>

          {/* Action 1: High Priority Rescue */}
          <div className="p-3 rounded-xl bg-wine-900 border border-wine-700 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-cream-200">
                01 — HIGH PRIORITY
              </span>
              <span className="text-[10px] text-cream-400 font-mono">Tactical Staging</span>
            </div>
            <div className="text-xs font-bold text-white">
              Deploy Rescue Team 04
            </div>
            <p className="text-[11px] text-cream-200 leading-normal">
              Reason: School evacuation support required for 20+ vulnerable occupants.
            </p>
            <div className="pt-1 flex gap-2">
              <button
                id="btn-assign-team-04"
                onClick={() => handleQuickAssign('Tactical Rescue Team 04')}
                className="flex-1 py-1.5 rounded-lg bg-cream-100 hover:bg-white text-wine-950 font-bold text-xs shadow transition-colors"
              >
                ASSIGN NOW
              </button>
              <button
                onClick={() => setCommandView('digital-twin')}
                className="px-3 py-1.5 rounded-lg bg-wine-850 hover:bg-wine-800 text-cream-200 text-xs border border-wine-700 font-mono"
              >
                VIEW
              </button>
            </div>
          </div>

          {/* Action 2: Redirect Traffic */}
          <div className="p-3 rounded-xl bg-wine-900 border border-wine-700 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-cream-200">
                02 — HIGH PRIORITY
              </span>
              <span className="text-[10px] text-cream-400 font-mono">Traffic Routing</span>
            </div>
            <div className="text-xs font-bold text-white">
              Redirect emergency traffic
            </div>
            <p className="text-[11px] text-cream-200">
              From Road 2 → To Road 3 (Elevated bypass).
            </p>
            <button
              id="btn-view-route"
              onClick={() => setCommandView('digital-twin')}
              className="w-full py-1.5 rounded-lg bg-wine-850 hover:bg-wine-800 text-cream-100 text-xs font-semibold flex items-center justify-center gap-1 border border-wine-700"
            >
              <Route className="w-3.5 h-3.5" />
              <span>VIEW ROUTE</span>
            </button>
          </div>

          {/* Action 3: Prepare Shelter C */}
          <div className="p-3 rounded-xl bg-wine-900 border border-wine-700 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-cream-300 font-mono">
                03 — MEDIUM
              </span>
              <span className="text-[10px] text-cream-400 font-mono">Shelter Logistics</span>
            </div>
            <div className="text-xs font-bold text-white">
              Prepare Shelter C
            </div>
            <p className="text-[11px] text-cream-200">
              Reason: Projected capacity pressure on Shelter A (reaching 91%).
            </p>
            <button
              id="btn-activate-shelter-c"
              onClick={() => dispatchResource('RES-SHEL-C')}
              className="w-full py-1.5 rounded-lg bg-cream-100 hover:bg-white text-wine-950 font-bold text-xs transition-colors"
            >
              ACTIVATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
