import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle, Info, Trash2, CheckCheck } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const NotificationDrawer: React.FC = () => {
  const { 
    notifications, 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen,
    markNotificationAsRead,
    clearAllNotifications
  } = useEmergency();

  if (!isNotificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-wine-950 border-l border-wine-800 h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-wine-800">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-cream-200" />
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                OPERATIONAL NOTIFICATIONS
              </h2>
            </div>
            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-1 rounded-lg text-cream-300 hover:text-white hover:bg-wine-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 text-xs border-b border-wine-900">
            <span className="text-cream-300 font-mono">
              {notifications.filter(n => !n.read).length} Unread Alerts
            </span>
            <button
              onClick={clearAllNotifications}
              className="text-cream-300 hover:text-cream-100 text-xs flex items-center gap-1 transition-colors font-mono"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>

          {/* List */}
          <div className="space-y-2.5 pt-3 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  notif.read
                    ? 'bg-wine-900/40 border-wine-800 text-cream-400 opacity-75'
                    : 'bg-wine-900 border-cream-200/50 text-cream-100 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className={`font-bold text-xs ${
                    notif.type === 'critical' 
                      ? 'text-white underline decoration-wine-400' 
                      : notif.type === 'warning'
                      ? 'text-cream-100'
                      : 'text-cream-200'
                  }`}>
                    {notif.title}
                  </span>
                  <span className="text-[10px] font-mono text-cream-400 shrink-0">
                    {notif.time}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-cream-200">
                  {notif.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-wine-800">
          <button
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="w-full py-2.5 rounded-xl bg-wine-900 hover:bg-wine-850 text-cream-100 font-semibold text-xs border border-wine-800 transition-colors font-mono"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
