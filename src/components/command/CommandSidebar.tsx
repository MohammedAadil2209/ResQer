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
    { id: 'incidents', label: 'Live Incidents', icon: AlertTriangle, badge: criticalCount, badgeColor: 'bg-wine-800 text-cream-100 border-wine-600' },
    { id: 'digital-twin', label: 'Digital Twin', icon: Globe2, badge: 'Live 3D', badgeColor: 'bg-wine-800 text-cream-200 border-wine-600' },
    { id: 'signals', label: 'Community Signals', icon: Radio, badge: 'Active', badgeColor: 'bg-wine-800 text-cream-100 border-wine-600' },
    { id: 'resources', label: 'Resources', icon: Truck },
    { id: 'simulator', label: 'Scenario Simulator', icon: Sparkles, badge: 'What-If', badgeColor: 'bg-wine-800 text-cream-200 border-wine-600' },
    { id: 'plans', label: 'Response Plans', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-wine-950 border-r border-wine-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-wine-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-wine-600 to-wine-800 flex items-center justify-center text-white font-black text-base shadow-md shadow-wine-950/70 border border-wine-500">
              R
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-wider text-white">
                  RESQNET
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-cream-100 bg-wine-800 border border-wine-600 px-1 py-0.2 rounded font-mono">
                  OPS
                </span>
              </div>
              <span className="text-[10px] font-semibold text-cream-300 uppercase tracking-wider block font-mono">
                Command Center
              </span>
            </div>
          </div>

          <button
            onClick={() => setAppMode('citizen')}
            title="Switch to Citizen Emergency Mode"
            className="text-[10px] text-cream-200 hover:text-white bg-wine-900/80 hover:bg-wine-800 px-2 py-1 rounded border border-wine-700 transition-colors"
          >
            Citizen Mode
          </button>
        </div>

        {/* Demo Mode Indicator if active */}
        {isDemoPlaying && (
          <div className="mx-3 mt-3 p-2 rounded-lg bg-wine-900 border border-cream-200/40 text-xs text-cream-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cream-100 animate-ping" />
              <span className="font-bold text-[11px] uppercase tracking-wider">Demo Script Running</span>
            </div>
            <span className="text-[10px] font-mono text-cream-200">#Flood-B2</span>
          </div>
        )}

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cream-400 font-mono">
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
                    ? 'bg-cream-100 text-wine-950 shadow-md font-bold'
                    : 'text-cream-200 hover:text-white hover:bg-wine-900/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-wine-950 stroke-[2.5]' : 'text-cream-300'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border font-mono ${
                    isActive ? 'bg-wine-900 text-cream-100 border-wine-800' : (item.badgeColor || 'bg-wine-900 text-cream-200 border-wine-700')
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Notifications Bar */}
      <div className="p-3 border-t border-wine-800 space-y-2">
        <button
          id="btn-open-notifications-drawer"
          onClick={() => setIsNotificationDrawerOpen(true)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-cream-200 hover:text-white bg-wine-900/80 hover:bg-wine-850 border border-wine-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-cream-200" />
            <span>Notifications</span>
          </div>
          {unreadNotifs > 0 && (
            <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-full bg-cream-100 text-wine-950">
              {unreadNotifs}
            </span>
          )}
        </button>

        <div className="flex items-center justify-between px-3 py-2 bg-wine-900/90 rounded-lg border border-wine-800 text-[11px]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-wine-800 border border-wine-600 text-cream-100 flex items-center justify-center font-bold text-[10px]">
              OP
            </div>
            <div>
              <div className="font-semibold text-white leading-tight">Coord. Miller</div>
              <div className="text-[9px] text-cream-300 font-mono">Duty Lead • B2</div>
            </div>
          </div>
          <div className="text-[10px] text-cream-400 font-mono">
            SEC-SESSION
          </div>
        </div>
      </div>
    </aside>
  );
};
