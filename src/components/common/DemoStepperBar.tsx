import React from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Sparkles, X } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const DemoStepperBar: React.FC = () => {
  const { 
    isDemoPlaying, 
    playDemo, 
    pauseDemo, 
    resetDemo, 
    demoStepIndex, 
    totalDemoSteps,
    jumpToDemoStep 
  } = useEmergency();

  const STEP_TITLES = [
    'Citizen Report Sent',
    'VoxRescue Voice Analyzed',
    'Silent Distress Sent',
    'Command Center Triggered',
    'Digital Twin B2 Highlighted',
    'AI Collective Crisis Detected',
    'Scenario What-If Projected',
    'Response Plan Activated'
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none">
      <div className="bg-slate-950/95 backdrop-blur-md border border-cyan-500/50 rounded-2xl p-3 shadow-2xl pointer-events-auto flex items-center justify-between gap-3 text-xs text-white">
        {/* Step Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-300 font-mono font-bold shrink-0">
            {demoStepIndex + 1}/{totalDemoSteps}
          </div>
          <div className="truncate">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
              SCRIPTED DEMO SCENARIO (SECTOR B2)
            </span>
            <span className="font-bold text-white text-xs truncate block">
              {STEP_TITLES[demoStepIndex] || 'Running Scenario'}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => jumpToDemoStep(Math.max(0, demoStepIndex - 1))}
            disabled={demoStepIndex === 0}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {!isDemoPlaying ? (
            <button
              onClick={playDemo}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1 shadow-lg shadow-cyan-500/30 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY</span>
            </button>
          ) : (
            <button
              onClick={pauseDemo}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1 transition-all"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE</span>
            </button>
          )}

          <button
            onClick={() => jumpToDemoStep(Math.min(totalDemoSteps - 1, demoStepIndex + 1))}
            disabled={demoStepIndex >= totalDemoSteps - 1}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={resetDemo}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Reset to Initial State"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
