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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-white border-l border-beige-300 h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-beige-200">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-600" />
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-900">
                OPERATIONAL NOTIFICATIONS
              </h2>
            </div>
            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-beige-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 text-xs border-b border-beige-200">
            <span className="text-stone-600 font-mono font-medium">
              {notifications.filter(n => !n.read).length} Unread Alerts
            </span>
            <button
              onClick={clearAllNotifications}
              className="text-stone-500 hover:text-red-700 text-xs flex items-center gap-1 transition-colors font-mono font-medium"
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
                    ? 'bg-beige-50/60 border-beige-200 text-stone-500 opacity-80'
                    : 'bg-white border-beige-300 text-stone-900 shadow-sm hover:border-red-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className={`font-bold text-xs ${
                    notif.type === 'critical' 
                      ? 'text-red-700' 
                      : notif.type === 'warning'
                      ? 'text-amber-800'
                      : 'text-stone-900'
                  }`}>
                    {notif.title}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 shrink-0">
                    {notif.time}
                  </span>
                </div>
                <p className={`text-[11px] leading-relaxed ${notif.read ? 'text-stone-500' : 'text-stone-700 font-medium'}`}>
                  {notif.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-beige-200">
          <button
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="w-full py-2.5 rounded-xl bg-beige-100 hover:bg-beige-200 text-stone-800 font-semibold text-xs border border-beige-300 transition-colors font-mono"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
