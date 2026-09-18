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
  UserCheck,
  BellRing,
  HeartHandshake,
  MessageSquare
} from 'lucide-react';
import { useEmergency, CommandView } from '../../context/EmergencyContext';

export const CommandSidebar: React.FC = () => {
  const { 
    commandView, 
    setCommandView, 
    notifications, 
    setIsNotificationDrawerOpen,
    incidents,
    locationAlerts,
    volunteerRequirements,
    communityMessages,
    isDemoPlaying
  } = useEmergency();

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const criticalCount = incidents.filter(i => i.severity === 'Critical').length;
  const activeAlertsCount = locationAlerts.filter(a => a.status === 'ACTIVE').length;
  const openReqsCount = volunteerRequirements.filter(r => r.status === 'OPEN' || r.status === 'IN_PROGRESS').length;

  const NAV_ITEMS: { id: CommandView; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number; badgeColor?: string }[] = [
    { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
    { id: 'incidents', label: 'Live Incidents', icon: AlertTriangle, badge: criticalCount, badgeColor: 'bg-red-800 text-white border-red-600' },
    { id: 'digital-twin', label: 'Digital Twin', icon: Globe2, badge: 'Live 3D', badgeColor: 'bg-red-800 text-white border-red-600' },
    { id: 'signals', label: 'Community Signals', icon: Radio, badge: 'Active', badgeColor: 'bg-red-800 text-white border-red-600' },
    { id: 'resources', label: 'Resource Fleet', icon: Truck },
    { id: 'alerts', label: 'Location Alerts', icon: BellRing, badge: activeAlertsCount, badgeColor: 'bg-red-600 text-white' },
    { id: 'volunteers', label: 'Volunteer Hub', icon: HeartHandshake, badge: openReqsCount, badgeColor: 'bg-red-600 text-white' },
    { id: 'comms', label: 'Community Comms', icon: MessageSquare, badge: communityMessages.length, badgeColor: 'bg-stone-700 text-white' },
    { id: 'simulator', label: 'Scenario Simulator', icon: Sparkles, badge: 'What-If', badgeColor: 'bg-stone-700 text-white' },
    { id: 'plans', label: 'Response Plans', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-beige-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none z-30 shadow-sm">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-beige-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-base shadow-sm">
              R
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-wider text-stone-900">
                  RESQER
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-red-600 px-1 py-0.2 rounded font-mono">
                  OPS
                </span>
              </div>
              <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block font-mono">
                Command Center
              </span>
            </div>
          </div>
        </div>

        {/* Demo Mode Indicator if active */}
        {isDemoPlaying && (
          <div className="mx-3 mt-3 p-2 rounded-lg bg-beige-100 border border-beige-300 text-xs text-stone-900 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span className="font-bold text-[11px] uppercase tracking-wider text-red-700">Demo Running</span>
            </div>
            <span className="text-[10px] font-mono text-stone-600">#Flood-B2</span>
          </div>
        )}

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
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
                    ? 'bg-red-600 text-white shadow-sm font-bold'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-beige-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white stroke-[2.5]' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-white text-red-700' : 'bg-beige-100 text-stone-700 border border-beige-300'
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
      <div className="p-3 border-t border-beige-200 space-y-2">
        <button
          id="btn-open-notifications-drawer"
          onClick={() => setIsNotificationDrawerOpen(true)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:text-stone-900 bg-beige-50 hover:bg-beige-100 border border-beige-300 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-stone-600" />
            <span>Notifications</span>
          </div>
          {unreadNotifs > 0 && (
            <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-full bg-red-600 text-white">
              {unreadNotifs}
            </span>
          )}
        </button>

        <div className="flex items-center justify-between px-3 py-2 bg-beige-50 rounded-lg border border-beige-200 text-[11px]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">
              OP
            </div>
            <div>
              <div className="font-semibold text-stone-900 leading-tight">Coord. Miller</div>
              <div className="text-[9px] text-stone-500 font-mono">Duty Lead • B2</div>
            </div>
          </div>
          <div className="text-[10px] text-stone-500 font-mono">
            SEC-SESSION
          </div>
        </div>
      </div>
    </aside>
  );
};
