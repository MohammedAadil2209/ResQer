import React from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Radio, 
  Globe2, 
  Truck, 
  ArrowRight, 
  Mic, 
  VolumeX, 
  Activity, 
  Play, 
  CheckCircle2, 
  Zap,
  Building2,
  Users
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const LandingPage: React.FC = () => {
  const { setAppMode, setCitizenView, playDemo } = useEmergency();

  const handleStartCitizen = () => {
    setAppMode('citizen');
    setCitizenView('home');
  };

  const handleStartCommand = () => {
    setAppMode('command');
  };

  const handleStartDemo = () => {
    setAppMode('command');
    playDemo();
  };

  return (
    <div className="min-h-screen bg-[#180306] text-cream-100 flex flex-col justify-between select-none relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-wine-700/25 via-wine-900/20 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-20 border-b border-wine-800/80 bg-wine-950/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-wine-600 via-wine-700 to-wine-800 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-wine-950/80 border border-wine-400/30">
              R
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-wider text-white">
                RESQNET
              </span>
              <span className="text-[10px] font-mono text-cream-300 uppercase tracking-widest block -mt-1">
                EMERGENCY INTELLIGENCE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartCitizen}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-wine-700 hover:bg-wine-600 shadow-lg shadow-wine-950/60 border border-wine-500/40 transition-all active:scale-95"
            >
              Citizen Mode
            </button>
            <button
              onClick={handleStartCommand}
              className="px-4 py-2 rounded-xl text-xs font-bold text-wine-950 bg-cream-100 hover:bg-white shadow-lg shadow-cream-950/20 transition-all active:scale-95 border border-cream-200"
            >
              Command Center
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20 space-y-16">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine-900/80 border border-wine-700/80 text-cream-200 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cream-300" />
            <span>Autonomous Disaster Coordination System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Simple during panic. <br />
            <span className="bg-gradient-to-r from-cream-100 via-cream-200 to-wine-200 bg-clip-text text-transparent">
              Powerful during coordination.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-cream-200/90 max-w-2xl mx-auto leading-relaxed">
            RESQNET transforms raw citizen distress signals, voice transcripts, and telemetry into synchronized digital twin intelligence for first responders.
          </p>

          {/* Primary CTA Cluster */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleStartCitizen}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-wine-700 to-wine-600 hover:from-wine-600 hover:to-wine-500 text-white font-black text-base shadow-xl shadow-wine-950/80 border border-wine-400/40 flex items-center gap-2.5 transition-all active:scale-95"
            >
              <ShieldAlert className="w-5 h-5 text-cream-200" />
              <span>LAUNCH CITIZEN MODE</span>
            </button>

            <button
              onClick={handleStartCommand}
              className="px-7 py-4 rounded-2xl bg-cream-100 hover:bg-white text-wine-950 font-black text-base shadow-xl shadow-wine-950/40 border border-cream-200 flex items-center gap-2.5 transition-all active:scale-95"
            >
              <Globe2 className="w-5 h-5 text-wine-800" />
              <span>OPEN COMMAND CENTER</span>
            </button>

            <button
              onClick={handleStartDemo}
              className="px-6 py-4 rounded-2xl bg-wine-950/90 hover:bg-wine-900 text-cream-100 font-bold text-base border border-wine-800 flex items-center gap-2.5 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-current text-cream-300" />
              <span>RUN SCRIPTED DEMO</span>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid (5 Core Architecture Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8">
          {/* Card 1: VoxRescue & Silent Alert */}
          <div className="p-6 rounded-3xl bg-wine-950/70 border border-wine-800 hover:border-cream-300/40 transition-all space-y-3 shadow-lg shadow-black/20">
            <div className="w-10 h-10 rounded-xl bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-100">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              VoxRescue &amp; Silent Distressing
            </h3>
            <p className="text-xs text-cream-200/80 leading-relaxed">
              Citizens in panic can speak natural language or press 1-touch silent distress. AI structures hazard, location, and vulnerable populations instantly.
            </p>
          </div>

          {/* Card 2: 3D Geospatial Digital Twin */}
          <div className="p-6 rounded-3xl bg-wine-950/70 border border-wine-800 hover:border-cream-300/40 transition-all space-y-3 shadow-lg shadow-black/20">
            <div className="w-10 h-10 rounded-xl bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-100">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Interactive Digital Twin
            </h3>
            <p className="text-xs text-cream-200/80 leading-relaxed">
              Live hydrological flood modeling, road accessibility statuses, shelter capacities, and real-time response vehicle telemetry mapped on a dark geospatial twin.
            </p>
          </div>

          {/* Card 3: Collective Crisis Synthesis */}
          <div className="p-6 rounded-3xl bg-wine-950/70 border border-wine-800 hover:border-cream-300/40 transition-all space-y-3 shadow-lg shadow-black/20">
            <div className="w-10 h-10 rounded-xl bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-100">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Collective Signal Synthesis
            </h3>
            <p className="text-xs text-cream-200/80 leading-relaxed">
              Filters noisy duplicates and groups correlated distress pings into prioritized operational events with confidence indicators and vulnerability flagging.
            </p>
          </div>

          {/* Card 4: Predictive Simulator */}
          <div className="p-6 rounded-3xl bg-wine-950/70 border border-wine-800 hover:border-cream-300/40 transition-all space-y-3 shadow-lg shadow-black/20">
            <div className="w-10 h-10 rounded-xl bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-100">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              What-If Disaster Simulator
            </h3>
            <p className="text-xs text-cream-200/80 leading-relaxed">
              Simulate rainfall surges (+20% to +60%), dam overflow crests, and road blockages across 0m–90m time horizons to preempt shelter saturation.
            </p>
          </div>

          {/* Card 5: Playbook Response Execution */}
          <div className="p-6 rounded-3xl bg-wine-950/70 border border-wine-800 hover:border-cream-300/40 transition-all space-y-3 md:col-span-2 shadow-lg shadow-black/20">
            <div className="w-10 h-10 rounded-xl bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-100">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Response Orchestration &amp; Playbooks
            </h3>
            <p className="text-xs text-cream-200/80 leading-relaxed">
              One-click plan activation for emergency rerouting (Road 2 to Road 3 bypass), swiftwater rescue deployments, and targeted sector citizen evacuation broadcasts.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-wine-800/80 bg-wine-950/90 py-6 px-6 text-center text-xs text-cream-400 font-mono">
        <p>RESQNET Operational Emergency System • Simulated Prototype Environment • Red, White &amp; Beige Edition</p>
      </footer>
    </div>
  );
};
