import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ShieldCheck, 
  Layers, 
  Play, 
  Pause, 
  RotateCcw, 
  ExternalLink,
  LifeBuoy,
  Users,
  Building,
  Flame,
  Radio
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

interface CommandHeaderProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

export const CommandHeader: React.FC<CommandHeaderProps> = ({ searchTerm, setSearchTerm }) => {
  const { 
    setAppMode, 
    notifications, 
    setIsNotificationDrawerOpen,
    isDemoPlaying,
    playDemo,
    pauseDemo,
    resetDemo,
    demoStepIndex,
    totalDemoSteps,
    incidents
  } = useEmergency();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/90 sticky top-0 z-20">
      {/* Top Strip */}
      <div className="px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4 border-b border-slate-800/60">
        {/* Left: Title & Subtitle */}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase font-mono">
                COMMAND CENTER
              </h1>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-800/80 px-2 py-0.5 rounded tracking-wider uppercase">
                LIVE OPERATIONAL VIEW
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            id="input-command-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search incidents, locations or resources..."
            className="w-full bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-400 rounded-lg pl-8 pr-3 py-1.5 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
          />
        </div>

        {/* Right: Demo Controller, Status, Mode Switchers */}
        <div className="flex items-center gap-3">
          {/* Scripted Demo Mode Trigger (#42) */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-cyan-500/30 rounded-lg p-1">
            <span className="text-[10px] font-bold font-mono text-cyan-300 px-1.5 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isDemoPlaying ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
              DEMO
            </span>
            {!isDemoPlaying ? (
              <button
                id="btn-header-play-demo"
                onClick={playDemo}
                title="Play scripted Sector B2 emergency demo"
                className="px-2 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 transition-all"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>PLAY</span>
              </button>
            ) : (
              <button
                id="btn-header-pause-demo"
                onClick={pauseDemo}
                title="Pause demo sequence"
                className="px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 transition-all"
              >
                <Pause className="w-3 h-3 fill-current" />
                <span>PAUSE</span>
              </button>
            )}
            <button
              id="btn-header-reset-demo"
              onClick={resetDemo}
              title="Reset demo data"
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* System Online Badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>

          {/* Mode Switcher to Citizen Mode */}
          <button
            id="btn-switch-to-citizen"
            onClick={() => setAppMode('citizen')}
            className="text-xs font-semibold text-white bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded-lg border border-red-400/40 flex items-center gap-1.5 shadow-md shadow-red-950/50 transition-colors"
          >
            <span>Citizen Mode</span>
          </button>

          {/* Mode Switcher to Landing Page */}
          <button
            id="btn-view-landing"
            onClick={() => setAppMode('landing')}
            className="text-xs font-medium text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors hidden xl:block"
          >
            Product Story
          </button>

          {/* Notification Bell */}
          <button
            id="btn-header-notifications"
            onClick={() => setIsNotificationDrawerOpen(true)}
            aria-label="Open notifications"
            className="relative p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center font-mono">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Top Metric Strip (#17) */}
      <div className="px-4 lg:px-6 py-2 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 bg-[#0a0f1c]/80 text-xs">
        {/* Metric 1 */}
        <div className="flex flex-col border-r border-slate-800/80 pr-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Active Incidents
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-base font-extrabold font-mono text-white">
              {incidents.length + 13}
            </span>
            <span className="text-[10px] text-red-400 font-mono font-semibold">
              (5 Crit)
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col border-r border-slate-800/80 pr-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            People Affected
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-base font-extrabold font-mono text-white">
              2,481
            </span>
            <span className="text-[10px] text-amber-400 font-mono">
              ↑ 12%
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col border-r border-slate-800/80 pr-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Responders Active
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-base font-extrabold font-mono text-cyan-300">
              64
            </span>
            <span className="text-[10px] text-slate-400">deployed</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="flex flex-col border-r border-slate-800/80 pr-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Shelter Capacity
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-base font-extrabold font-mono text-amber-300">
              72%
            </span>
            <span className="text-[10px] text-amber-400">near limit</span>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="flex flex-col border-r border-slate-800/80 pr-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Collective Signals
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-base font-extrabold font-mono text-cyan-400">
              12
            </span>
            <span className="text-[10px] text-emerald-400">active</span>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Risk Status
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-sm font-black tracking-wider uppercase text-amber-400 font-mono">
              ELEVATED
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
