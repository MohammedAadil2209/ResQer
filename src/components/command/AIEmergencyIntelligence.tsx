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
    <div className="h-full flex flex-col space-y-4 text-stone-900">
      {/* COLLECTIVE CRISIS DETECTED BANNER */}
      {activeCollectiveAlert && (
        <div className="p-4 rounded-2xl bg-red-600 text-white border border-red-700 shadow-md relative overflow-hidden animate-in fade-in slide-in-from-top-3 duration-500">
          <div className="flex items-center justify-between pb-2 border-b border-red-500">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-white shrink-0" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-white uppercase">
                AI-GENERATED OPERATIONAL SIGNAL
              </span>
            </div>
            <span className="text-[10px] font-mono bg-red-700 text-white px-2 py-0.5 rounded border border-red-500 font-bold">
              Confidence: {activeCollectiveAlert.signalStrength}%
            </span>
          </div>

          <div className="mt-2.5">
            <h3 className="text-lg font-black text-white tracking-tight">
              COLLECTIVE CRISIS DETECTED
            </h3>
            <div className="text-xs font-bold text-red-100 mt-0.5 font-mono">
              {activeCollectiveAlert.sector}
            </div>
            <p className="text-xs text-white mt-1 leading-relaxed font-medium">
              Flooding <span className="text-red-300">•</span> Road obstruction <span className="text-red-300">•</span> Vulnerable population
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-red-500 flex items-center justify-between text-xs">
            <span className="text-red-100 text-[11px] font-mono font-medium">
              {activeCollectiveAlert.reportCount} Convergent Citizen Reports
            </span>
            <button
              onClick={() => setCommandView('signals')}
              className="text-white hover:text-red-100 font-bold flex items-center gap-1 underline underline-offset-2"
            >
              Examine Feed →
            </button>
          </div>
        </div>
      )}

      {/* MAIN AI INTELLIGENCE CONTAINER */}
      <div className="flex-1 bg-white border border-beige-300 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-beige-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
              AI EMERGENCY INTELLIGENCE
            </h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
            SYNTHESIS ACTIVE
          </span>
        </div>

        {/* 1. CURRENT SITUATION */}
        <div className="p-3.5 rounded-xl bg-beige-50/70 border border-beige-200 space-y-1">
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-600 block">
            CURRENT SITUATION
          </span>
          <p className="text-xs text-stone-800 leading-relaxed font-medium">
            "Multiple community reports indicate increasing flood conditions around Zone 13 - Velachery, concentrating access blockage around Ram Nagar and Velachery MRTS."
          </p>
        </div>

        {/* 2. COLLECTIVE SIGNAL */}
        <div className="p-3.5 rounded-xl bg-beige-50/70 border border-beige-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-600">
              COLLECTIVE SIGNAL
            </span>
            <span className="text-[11px] font-mono font-bold text-stone-800">
              5 Related Reports
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
            <span className="px-2 py-1 rounded bg-white border border-beige-300 text-stone-900 font-mono shadow-xs">
              Flood
            </span>
            <span className="text-stone-400 font-bold">+</span>
            <span className="px-2 py-1 rounded bg-white border border-beige-300 text-stone-900 font-mono shadow-xs">
              Road Obstruction
            </span>
            <span className="text-stone-400 font-bold">+</span>
            <span className="px-2 py-1 rounded bg-white border border-beige-300 text-stone-900 font-mono shadow-xs">
              Vulnerable Population
            </span>
          </div>
        </div>

        {/* 3. RISK TREND */}
        <div className="p-3.5 rounded-xl bg-beige-50/70 border border-beige-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-600 block">
              RISK TREND
            </span>
            <span className="text-sm font-bold text-red-700 flex items-center gap-1.5 mt-0.5">
              <TrendingUp className="w-4 h-4 text-red-600" />
              ↑ Increasing Rate of Inundation
            </span>
          </div>
          <div className="text-right font-mono text-[11px] text-stone-600">
            <div className="font-bold text-stone-900">+12cm / 10m</div>
            <div className="text-[10px] text-red-700 font-bold">Stage 2 Breach</div>
          </div>
        </div>

        {/* 4. SCENARIO PROJECTION */}
        <div className="p-3.5 rounded-xl bg-beige-100/70 border border-beige-300 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-800">
              SCENARIO-BASED PROJECTION
            </span>
            <span className="text-[9px] font-bold uppercase text-stone-800 bg-white px-1.5 py-0.2 rounded border border-beige-300 font-mono">
              Simulation
            </span>
          </div>
          <p className="text-xs text-stone-800 leading-relaxed italic font-medium">
            "Under the selected scenario (+{scenarioParams.waterLevelDelta}% water level), Road 2 becomes completely restricted, elevating Shelter A load to {scenarioResult.projectedShelterOccupancy}%."
          </p>
          <div className="text-[10px] text-stone-500 font-mono font-medium">
            Model grounded in hydrological elevation data. Projections updated dynamically.
          </div>
        </div>

        {/* 5. RECOMMENDED RESPONSE */}
        <div className="space-y-2 pt-2 border-t border-beige-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
              RECOMMENDED RESPONSE
            </h3>
            <span className="text-[10px] text-stone-600 font-mono font-semibold">
              3 Direct Actions
            </span>
          </div>

          {/* Action 1: High Priority Rescue */}
          <div className="p-3 rounded-xl bg-white border border-red-200 space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-red-700">
                01 — HIGH PRIORITY
              </span>
              <span className="text-[10px] text-stone-500 font-mono font-medium">Tactical Staging</span>
            </div>
            <div className="text-xs font-bold text-stone-900">
              Deploy Rescue Team 04
            </div>
            <p className="text-[11px] text-stone-600 leading-normal font-medium">
              Reason: School evacuation support required for 20+ vulnerable occupants.
            </p>
            <div className="pt-1 flex gap-2">
              <button
                id="btn-assign-team-04"
                onClick={() => handleQuickAssign('Tactical Rescue Team 04')}
                className="flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                ASSIGN NOW
              </button>
              <button
                onClick={() => setCommandView('digital-twin')}
                className="px-3 py-1.5 rounded-lg bg-beige-100 hover:bg-beige-200 text-stone-800 text-xs border border-beige-300 font-bold font-mono"
              >
                VIEW
              </button>
            </div>
          </div>

          {/* Action 2: Redirect Traffic */}
          <div className="p-3 rounded-xl bg-white border border-beige-300 space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-stone-800">
                02 — HIGH PRIORITY
              </span>
              <span className="text-[10px] text-stone-500 font-mono font-medium">Traffic Routing</span>
            </div>
            <div className="text-xs font-bold text-stone-900">
              Redirect emergency traffic
            </div>
            <p className="text-[11px] text-stone-600 font-medium">
              From Road 2 → To Road 3 (Elevated bypass).
            </p>
            <button
              id="btn-view-route"
              onClick={() => setCommandView('digital-twin')}
              className="w-full py-1.5 rounded-lg bg-beige-100 hover:bg-beige-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-1 border border-beige-300"
            >
              <Route className="w-3.5 h-3.5 text-red-600" />
              <span>VIEW ROUTE</span>
            </button>
          </div>

          {/* Action 3: Prepare Shelter C */}
          <div className="p-3 rounded-xl bg-white border border-beige-300 space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-stone-700 font-mono">
                03 — MEDIUM
              </span>
              <span className="text-[10px] text-stone-500 font-mono font-medium">Shelter Logistics</span>
            </div>
            <div className="text-xs font-bold text-stone-900">
              Prepare Shelter C
            </div>
            <p className="text-[11px] text-stone-600 font-medium">
              Reason: Projected capacity pressure on Shelter A (reaching 91%).
            </p>
            <button
              id="btn-activate-shelter-c"
              onClick={() => dispatchResource('RES-SHEL-C')}
              className="w-full py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-colors"
            >
              ACTIVATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
