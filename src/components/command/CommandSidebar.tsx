import React from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Globe2, 
  Radio, 
  Truck, 
  Sparkles, 
  ClipboardList, 
  BarChart3, 
  Bell, 
  Settings, 
  ShieldAlert,
  Sliders,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useEmergency, CommandView } from '../../context/EmergencyContext';

export const CommandSidebar: React.FC = () => {
  const { 
    commandView, 
    setCommandView, 
    notifications, 
    setIsNotificationDrawerOpen,
    incidents,
    setAppMode,
    isDemoPlaying
  } = useEmergency();

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const criticalCount = incidents.filter(i => i.severity === 'Critical').length;

  const NAV_ITEMS: { id: CommandView; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number; badgeColor?: string }[] = [
    { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
    { id: 'incidents', label: 'Live Incidents', icon: AlertTriangle, badge: criticalCount, badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40' },
    { id: 'digital-twin', label: 'Digital Twin', icon: Globe2, badge: 'Live 3D', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
    { id: 'signals', label: 'Community Signals', icon: Radio, badge: 'Active', badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
    { id: 'resources', label: 'Resources', icon: Truck },
    { id: 'simulator', label: 'Scenario Simulator', icon: Sparkles, badge: 'What-If', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    { id: 'plans', label: 'Response Plans', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d]/95 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-red-950/50">
              R
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-wider text-white">
                  RESQNET
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-1 py-0.2 rounded">
                  OPS
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Command Center
              </span>
            </div>
          </div>

          <button
            onClick={() => setAppMode('citizen')}
            title="Switch to Citizen Emergency Mode"
            className="text-[10px] text-slate-400 hover:text-cyan-300 bg-slate-800/80 hover:bg-slate-700 px-2 py-1 rounded border border-slate-700 transition-colors"
          >
            Citizen Mode
          </button>
        </div>

        {/* Demo Mode Indicator if active */}
        {isDemoPlaying && (
          <div className="mx-3 mt-3 p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-300 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold text-[11px] uppercase tracking-wider">Demo Script Running</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">#Flood-B2</span>
          </div>
        )}

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Operations View
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = commandView === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setCommandView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border font-mono ${item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Notifications Bar */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        <button
          id="btn-open-notifications-drawer"
          onClick={() => setIsNotificationDrawerOpen(true)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800/80 border border-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>Notifications</span>
          </div>
          {unreadNotifs > 0 && (
            <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-full bg-rose-500 text-white">
              {unreadNotifs}
            </span>
          )}
        </button>

        <div className="flex items-center justify-between px-3 py-2 bg-slate-950/60 rounded-lg border border-slate-800/80 text-[11px]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-cyan-900/60 border border-cyan-700 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
              OP
            </div>
            <div>
              <div className="font-semibold text-slate-200 leading-tight">Coord. Miller</div>
              <div className="text-[9px] text-emerald-400 font-mono">Duty Lead • B2</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            SEC-SESSION
          </div>
        </div>
      </div>
    </aside>
  );
};
