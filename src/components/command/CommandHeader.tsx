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
    <header className="bg-wine-950/95 backdrop-blur-md border-b border-wine-800 sticky top-0 z-20">
      {/* Top Strip */}
      <div className="px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4 border-b border-wine-850">
        {/* Left: Title & Subtitle */}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase font-mono">
                COMMAND CENTER
              </h1>
              <span className="text-[10px] font-bold text-cream-100 bg-wine-800/80 border border-wine-600 px-2 py-0.5 rounded tracking-wider uppercase font-mono">
                LIVE OPERATIONAL VIEW
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-cream-300" />
          <input
            id="input-command-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search incidents, locations or resources..."
            className="w-full bg-wine-900/90 border border-wine-700 text-xs text-white placeholder-cream-400/60 rounded-lg pl-8 pr-3 py-1.5 focus:border-cream-200 focus:outline-none focus:ring-1 focus:ring-cream-200/20 font-sans"
          />
        </div>

        {/* Right: Demo Controller, Status, Mode Switchers */}
        <div className="flex items-center gap-3">
          {/* Scripted Demo Mode Trigger */}
          <div className="flex items-center gap-1.5 bg-wine-900/90 border border-wine-700 rounded-lg p-1">
            <span className="text-[10px] font-bold font-mono text-cream-200 px-1.5 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isDemoPlaying ? 'bg-cream-100 animate-ping' : 'bg-wine-600'}`} />
              DEMO
            </span>
            {!isDemoPlaying ? (
              <button
                id="btn-header-play-demo"
                onClick={playDemo}
                title="Play scripted Sector B2 emergency demo"
                className="px-2 py-1 rounded bg-cream-100 hover:bg-white text-wine-950 font-bold text-[10px] flex items-center gap-1 transition-all"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>PLAY</span>
              </button>
            ) : (
              <button
                id="btn-header-pause-demo"
                onClick={pauseDemo}
                title="Pause demo sequence"
                className="px-2 py-1 rounded bg-cream-200 hover:bg-cream-100 text-wine-950 font-bold text-[10px] flex items-center gap-1 transition-all"
              >
                <Pause className="w-3 h-3 fill-current" />
                <span>PAUSE</span>
              </button>
            )}
            <button
              id="btn-header-reset-demo"
              onClick={resetDemo}
              title="Reset demo data"
              className="p-1 rounded text-cream-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* System Online Badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-cream-100 font-mono bg-wine-900 border border-wine-700 px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-cream-200 animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>

          {/* Mode Switcher to Citizen Mode */}
          <button
            id="btn-switch-to-citizen"
            onClick={() => setAppMode('citizen')}
            className="text-xs font-semibold text-white bg-wine-700 hover:bg-wine-600 px-3 py-1.5 rounded-lg border border-wine-500 flex items-center gap-1.5 shadow-md shadow-wine-950/60 transition-colors"
          >
            <span>Citizen Mode</span>
          </button>

          {/* Mode Switcher to Landing Page */}
          <button
            id="btn-view-landing"
            onClick={() => setAppMode('landing')}
            className="text-xs font-medium text-cream-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-wine-700 hover:bg-wine-800 transition-colors hidden xl:block"
          >
            Product Story
          </button>

          {/* Notification Bell */}
          <button
            id="btn-header-notifications"
            onClick={() => setIsNotificationDrawerOpen(true)}
            aria-label="Open notifications"
            className="relative p-1.5 rounded-lg bg-wine-900 border border-wine-700 text-cream-200 hover:text-white hover:border-cream-300 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cream-100 text-wine-950 text-[9px] font-bold flex items-center justify-center font-mono">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Top Metric Strip */}
      <div className="px-4 lg:px-6 py-2 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 bg-wine-900/90 text-xs border-b border-wine-800">
        {/* Metric 1 */}
        <div className="flex flex-col border-r border-wine-800 pr-2">
          <span className="text-[10px] uppercase font-bold text-cream-300 tracking-wider font-mono">
            Active Incidents
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-base font-extrabold font-mono text-white">
              {incidents.length + 13}
            </span>
            <span className="text-[10px] text-cream-200 font-mono font-semibold">
              (5 Crit)
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col border-r border-wine-800 pr-2">
          <span className="text-[10px] uppercase font-bold text-cream-300 tracking-wider font-mono">
            People Affected
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-base font-extrabold font-mono text-white">
              2,481
            </span>
            <span className="text-[10px] text-cream-200 font-mono">
              ↑ 12%
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col border-r border-wine-800 pr-2">
          <span className="text-[10px] uppercase font-bold text-cream-300 tracking-wider font-mono">
            Responders Active
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-base font-extrabold font-mono text-cream-100">
              64
            </span>
            <span className="text-[10px] text-cream-300">deployed</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="flex flex-col border-r border-wine-800 pr-2">
          <span className="text-[10px] uppercase font-bold text-cream-300 tracking-wider font-mono">
            Shelter Capacity
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-base font-extrabold font-mono text-cream-100">
              72%
            </span>
            <span className="text-[10px] text-cream-300">near limit</span>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="flex flex-col border-r border-wine-800 pr-2">
          <span className="text-[10px] uppercase font-bold text-cream-300 tracking-wider font-mono">
            Collective Signals
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-base font-extrabold font-mono text-cream-100">
              12
            </span>
            <span className="text-[10px] text-cream-200">active</span>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-cream-300 tracking-wider font-mono">
            Risk Status
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-cream-200 animate-pulse" />
            <span className="text-sm font-black tracking-wider uppercase text-cream-100 font-mono">
              ELEVATED
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
