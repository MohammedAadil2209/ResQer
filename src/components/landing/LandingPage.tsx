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
    <div className="min-h-screen bg-white text-stone-900 flex flex-col justify-between select-none relative overflow-x-hidden">
      {/* Background subtle ambient lighting */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-red-100/30 via-beige-100/40 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-20 border-b border-beige-200 bg-white/95 backdrop-blur-md px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-lg shadow-md">
              R
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-wider text-stone-900">
                RESQNET
              </span>
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block -mt-1">
                EMERGENCY INTELLIGENCE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartCitizen}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all active:scale-95"
            >
              Citizen Mode
            </button>
            <button
              onClick={handleStartCommand}
              className="px-4 py-2 rounded-xl text-xs font-bold text-stone-900 bg-beige-100 hover:bg-beige-200 shadow-sm transition-all active:scale-95 border border-beige-300"
            >
              Command Center
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20 space-y-16">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige-100 border border-beige-300 text-stone-700 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Autonomous Disaster Coordination System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
            Simple during panic. <br />
            <span className="text-red-600">
              Powerful during coordination.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            RESQNET transforms raw citizen distress signals, voice transcripts, and telemetry into synchronized digital twin intelligence for first responders.
          </p>

          {/* Primary CTA Cluster */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleStartCitizen}
              className="px-7 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-xl shadow-red-600/20 border border-red-700 flex items-center gap-2.5 transition-all active:scale-95"
            >
              <ShieldAlert className="w-5 h-5 text-white" />
              <span>LAUNCH CITIZEN MODE</span>
            </button>

            <button
              onClick={handleStartCommand}
              className="px-7 py-4 rounded-2xl bg-beige-100 hover:bg-beige-200 text-stone-900 font-black text-base shadow-sm border border-beige-300 flex items-center gap-2.5 transition-all active:scale-95"
            >
              <Globe2 className="w-5 h-5 text-stone-800" />
              <span>OPEN COMMAND CENTER</span>
            </button>

            <button
              onClick={handleStartDemo}
              className="px-6 py-4 rounded-2xl bg-white hover:bg-beige-50 text-stone-800 font-bold text-base border border-beige-300 flex items-center gap-2.5 transition-all active:scale-95 shadow-sm"
            >
              <Play className="w-4 h-4 fill-current text-red-600" />
              <span>RUN SCRIPTED DEMO</span>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid (5 Core Architecture Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8">
          {/* Card 1: VoxRescue & Silent Alert */}
          <div className="p-6 rounded-3xl bg-white border-2 border-beige-200 hover:border-red-400 transition-all space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-beige-100 border border-beige-300 flex items-center justify-center text-red-600">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              VoxRescue &amp; Silent Distressing
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Citizens in panic can speak natural language or press 1-touch silent distress. AI structures hazard, location, and vulnerable populations instantly.
            </p>
          </div>

          {/* Card 2: 3D Geospatial Digital Twin */}
          <div className="p-6 rounded-3xl bg-white border-2 border-beige-200 hover:border-red-400 transition-all space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-beige-100 border border-beige-300 flex items-center justify-center text-red-600">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              Interactive Digital Twin
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Live hydrological flood modeling, road accessibility statuses, shelter capacities, and real-time response vehicle telemetry mapped on a clean digital twin.
            </p>
          </div>

          {/* Card 3: Collective Crisis Synthesis */}
          <div className="p-6 rounded-3xl bg-white border-2 border-beige-200 hover:border-red-400 transition-all space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-beige-100 border border-beige-300 flex items-center justify-center text-red-600">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              Collective Signal Synthesis
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Filters noisy duplicates and groups correlated distress pings into prioritized operational events with confidence indicators and vulnerability flagging.
            </p>
          </div>

          {/* Card 4: Predictive Simulator */}
          <div className="p-6 rounded-3xl bg-white border-2 border-beige-200 hover:border-red-400 transition-all space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-beige-100 border border-beige-300 flex items-center justify-center text-red-600">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              What-If Disaster Simulator
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Simulate rainfall surges (+20% to +60%), dam overflow crests, and road blockages across 0m–90m time horizons to preempt shelter saturation.
            </p>
          </div>

          {/* Card 5: Playbook Response Execution */}
          <div className="p-6 rounded-3xl bg-white border-2 border-beige-200 hover:border-red-400 transition-all space-y-3 md:col-span-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-beige-100 border border-beige-300 flex items-center justify-center text-red-600">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              Response Orchestration &amp; Playbooks
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              One-click plan activation for emergency rerouting (Road 2 to Road 3 bypass), swiftwater rescue deployments, and targeted sector citizen evacuation broadcasts.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-beige-200 bg-beige-50 py-6 px-6 text-center text-xs text-stone-500 font-mono">
        <p>RESQNET Operational Emergency System • Simulated Prototype Environment • Red, White &amp; Beige Edition</p>
      </footer>
    </div>
  );
};
