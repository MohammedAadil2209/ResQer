import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Play, 
  TrendingUp, 
  AlertTriangle, 
  Droplets, 
  Route, 
  Building, 
  Users,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const ScenarioSimulatorView: React.FC = () => {
  const { 
    scenarioParams, 
    setScenarioParams, 
    scenarioResult, 
    runSimulationScenario,
    resetSimulationScenario,
    addToast
  } = useEmergency();

  const [simTimelineStep, setSimTimelineStep] = useState<0 | 30 | 60 | 90>(30);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      runSimulationScenario();
      setIsRunning(false);
      addToast('Simulation projected scenario updated', 'success');
    }, 400);
  };

  const handlePreset = (rainfall: number, water: number, road: number) => {
    setScenarioParams(prev => ({
      ...prev,
      rainfallIncrease: rainfall,
      waterLevelDelta: water,
      roadAvailability: road,
      evacuationRate: road < 70 ? 'Slow' : 'Normal'
    }));
  };

  return (
    <div className="bg-wine-950 border border-wine-800 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-wine-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-200">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              SCENARIO SIMULATOR
            </h2>
          </div>
          <p className="text-xs text-cream-300 mt-1">
            Predictive "What-If" crisis modeling. Grounded in topological elevation and hydrologic flow vectors.
          </p>
        </div>

        {/* Disclaimer badge */}
        <span className="text-[11px] font-mono text-cream-200 bg-wine-900 border border-wine-700 px-2.5 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-cream-100" />
          <span>Decision Support Projection • Not Real Forecast</span>
        </span>
      </div>

      {/* Quick Scenario Presets */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase font-bold text-cream-300 tracking-wider block">
          Select Emergency What-If Preset:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => handlePreset(20, 10, 85)}
            className="p-3 rounded-xl bg-wine-900/60 border border-wine-800 hover:border-cream-200/50 text-left transition-colors"
          >
            <span className="text-xs font-bold text-white block">Moderate Surge (+20%)</span>
            <span className="text-[10px] text-cream-300">Minor road water pooling, standard evacuation</span>
          </button>
          <button
            onClick={() => handlePreset(40, 20, 60)}
            className="p-3 rounded-xl bg-wine-900/60 border border-wine-700 hover:border-cream-200 text-left transition-colors"
          >
            <span className="text-xs font-bold text-cream-100 block">Severe Inundation (+40%)</span>
            <span className="text-[10px] text-cream-300">Road 2 restricted, school zone cut off</span>
          </button>
          <button
            onClick={() => handlePreset(60, 30, 40)}
            className="p-3 rounded-xl bg-wine-900/60 border border-wine-700 hover:border-cream-100 text-left transition-colors"
          >
            <span className="text-xs font-bold text-cream-200 block">Catastrophic Breach (+60%)</span>
            <span className="text-[10px] text-cream-300">Road 2 closed, multiple shelters over capacity</span>
          </button>
        </div>
      </div>

      {/* Interactive Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Rainfall slider */}
        <div className="p-4 rounded-xl bg-wine-900/60 border border-wine-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cream-200 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cream-100" />
              <span>Rainfall Accumulation</span>
            </span>
            <span className="text-xs font-mono font-bold text-cream-100">
              +{scenarioParams.rainfallIncrease}%
            </span>
          </div>
          <input
            aria-label="Adjust rainfall accumulation percentage"
            type="range"
            min="0"
            max="100"
            step="10"
            value={scenarioParams.rainfallIncrease}
            onChange={(e) => setScenarioParams({ ...scenarioParams, rainfallIncrease: Number(e.target.value) })}
            className="w-full accent-cream-100 bg-wine-950 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-cream-400">
            <span>Normal (+0%)</span>
            <span>+50% Heavy</span>
            <span>+100% Extreme</span>
          </div>
        </div>

        {/* Water Level slider */}
        <div className="p-4 rounded-xl bg-wine-900/60 border border-wine-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cream-200 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-cream-100" />
              <span>River &amp; Basin Delta</span>
            </span>
            <span className="text-xs font-mono font-bold text-cream-100">
              +{scenarioParams.waterLevelDelta}%
            </span>
          </div>
          <input
            aria-label="Adjust river and basin delta percentage"
            type="range"
            min="0"
            max="50"
            step="5"
            value={scenarioParams.waterLevelDelta}
            onChange={(e) => setScenarioParams({ ...scenarioParams, waterLevelDelta: Number(e.target.value) })}
            className="w-full accent-cream-100 bg-wine-950 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-cream-400">
            <span>Baseline</span>
            <span>+25% Crest</span>
            <span>+50% Overflow</span>
          </div>
        </div>

        {/* Road Availability */}
        <div className="p-4 rounded-xl bg-wine-900/60 border border-wine-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cream-200 flex items-center gap-1.5">
              <Route className="w-3.5 h-3.5 text-cream-100" />
              <span>Accessible Roadways</span>
            </span>
            <span className="text-xs font-mono font-bold text-cream-100">
              {scenarioParams.roadAvailability}% Clear
            </span>
          </div>
          <input
            aria-label="Adjust accessible roadways percentage"
            type="range"
            min="30"
            max="100"
            step="5"
            value={scenarioParams.roadAvailability}
            onChange={(e) => setScenarioParams({ ...scenarioParams, roadAvailability: Number(e.target.value) })}
            className="w-full accent-cream-100 bg-wine-950 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-cream-400">
            <span>30% Impassable</span>
            <span>70% Restricted</span>
            <span>100% Clear</span>
          </div>
        </div>

        {/* Evacuation Rate */}
        <div className="p-4 rounded-xl bg-wine-900/60 border border-wine-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cream-200 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cream-100" />
              <span>Evacuation Speed Profile</span>
            </span>
            <span className="text-xs font-mono font-bold text-cream-100">
              {scenarioParams.evacuationRate}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {(['Slow', 'Normal', 'Accelerated'] as const).map((rate) => (
              <button
                key={rate}
                onClick={() => setScenarioParams({ ...scenarioParams, evacuationRate: rate })}
                className={`py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  scenarioParams.evacuationRate === rate
                    ? 'bg-cream-100 text-wine-950 font-bold shadow'
                    : 'bg-wine-950 text-cream-300 border border-wine-800'
                }`}
              >
                {rate}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Simulation Timeline Step Selector */}
      <div className="p-4 rounded-xl bg-wine-900/60 border border-wine-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-cream-200 font-mono">
            Time Horizon Projection
          </span>
          <span className="text-xs font-mono text-cream-100 font-bold">
            T + {simTimelineStep} minutes
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {([0, 30, 60, 90] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSimTimelineStep(t)}
              className={`py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                simTimelineStep === t
                  ? 'bg-cream-100 text-wine-950 shadow-md'
                  : 'bg-wine-950 text-cream-300 hover:text-white border border-wine-800'
              }`}
            >
              +{t}m Horizon
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Results Box */}
      <div className="p-5 rounded-2xl bg-wine-900/80 border border-wine-700 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-wine-800">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cream-200" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              PROJECTED IMPACT SUMMARY
            </h3>
          </div>
          <span className="text-[11px] font-mono text-cream-200">
            Sector B2 Focal Radius
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-wine-950/80 border border-wine-800">
            <span className="text-[10px] uppercase font-bold text-cream-300 block font-mono">
              Inundation Area
            </span>
            <span className="text-base font-extrabold font-mono text-cream-100 mt-0.5 block">
              +{scenarioResult.projectedInundationArea}%
            </span>
            <span className="text-[10px] text-cream-400 font-mono">vs historical baseline</span>
          </div>

          <div className="p-3 rounded-xl bg-wine-950/80 border border-wine-800">
            <span className="text-[10px] uppercase font-bold text-cream-300 block font-mono">
              Isolated Civilians
            </span>
            <span className="text-base font-extrabold font-mono text-cream-100 mt-0.5 block">
              {scenarioResult.projectedIsolatedPeople} people
            </span>
            <span className="text-[10px] text-cream-300 font-mono">Requires swiftwater</span>
          </div>

          <div className="p-3 rounded-xl bg-wine-950/80 border border-wine-800">
            <span className="text-[10px] uppercase font-bold text-cream-300 block font-mono">
              Shelter Pressure
            </span>
            <span className="text-base font-extrabold font-mono text-cream-200 mt-0.5 block">
              {scenarioResult.projectedShelterOccupancy}% in 45m
            </span>
            <span className="text-[10px] text-cream-400 font-mono">Shelter A near breach</span>
          </div>

          <div className="p-3 rounded-xl bg-wine-950/80 border border-wine-800">
            <span className="text-[10px] uppercase font-bold text-cream-300 block font-mono">
              Bottleneck Point
            </span>
            <span className="text-xs font-bold font-mono text-white mt-1 block truncate">
              {scenarioResult.projectedBottleneck}
            </span>
            <span className="text-[10px] text-cream-400 font-mono">Divert to Road 3</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-wine-950/90 border border-wine-800 text-xs text-cream-200 font-mono leading-relaxed">
          Operational Suggestion: Pre-stage Amphibious Swiftwater 02 at Road 3 junction prior to T+45m crest.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          id="btn-run-simulation"
          onClick={handleRun}
          disabled={isRunning}
          className="flex-1 py-3.5 rounded-xl bg-cream-100 hover:bg-white text-wine-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all font-mono"
        >
          {isRunning ? (
            <span>COMPUTING HYDROLOGICAL MODEL...</span>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>RUN SIMULATION</span>
            </>
          )}
        </button>

        <button
          id="btn-reset-simulation"
          onClick={resetSimulationScenario}
          className="px-5 py-3.5 rounded-xl bg-wine-900 hover:bg-wine-850 text-cream-200 font-semibold text-sm border border-wine-700 flex items-center gap-2 transition-colors font-mono"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RESET SIMULATION</span>
        </button>
      </div>
    </div>
  );
};
