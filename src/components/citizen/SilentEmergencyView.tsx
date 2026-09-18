import React, { useState } from 'react';
import { VolumeX, MapPin, Clock, Radio, ArrowLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const SilentEmergencyView: React.FC = () => {
  const { setCitizenView, submitSilentEmergency } = useEmergency();
  const [isSent, setIsSent] = useState(false);
  const [currentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  const handleSendSilent = () => {
    submitSilentEmergency();
    setIsSent(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-10 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div>
        {/* Top Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCitizenView('home')}
            className="flex items-center gap-1.5 text-sm text-stone-700 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 px-3 py-1.5 rounded-lg border border-beige-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return</span>
          </button>

          <span className="text-[11px] font-mono uppercase font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <VolumeX className="w-3.5 h-3.5" />
            <span>Silent Mode</span>
          </span>
        </div>

        {!isSent ? (
          <div className="space-y-6">
            {/* Main Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                I CAN'T TALK
              </h1>
              <p className="text-base text-stone-600 mt-1.5 font-medium">
                Send the minimum information needed to request help without making any sound.
              </p>
            </div>

            {/* Silent Telemetry Data Card */}
            <div className="p-5 rounded-2xl bg-white border border-beige-300 space-y-4 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-beige-200">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">
                  Automated Beacon Telemetry
                </span>
                <span className="text-[11px] text-red-700 font-mono font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  Locked
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-beige-100 border border-beige-300 flex items-center justify-center text-red-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block font-mono">
                    Location
                  </span>
                  <span className="text-base font-bold text-stone-900">
                    Sector B2 — High Accuracy Geofence
                  </span>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-beige-100 border border-beige-300 flex items-center justify-center text-stone-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block font-mono">
                    Timestamp
                  </span>
                  <span className="text-base font-bold text-stone-900">
                    {currentTime} Local Standard Time
                  </span>
                </div>
              </div>

              {/* Connection Status */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-beige-100 border border-beige-300 flex items-center justify-center text-red-600 shrink-0">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block font-mono">
                    Connection Status
                  </span>
                  <span className="text-base font-bold text-stone-900">
                    Encrypted Emergency Channel Online
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-beige-50 border border-beige-200 text-xs text-stone-700 leading-relaxed font-medium">
              Responders are instructed to arrive without sirens and establish discrete contact.
            </div>
          </div>
        ) : (
          /* Confirmation State */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-beige-300 shadow-xl text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  SILENT EMERGENCY SENT
                </h2>
                <p className="text-sm text-stone-600 mt-1 font-medium">
                  Your discrete distress beacon was delivered to central dispatch.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-beige-50 border border-beige-200 text-left space-y-2 text-sm">
                <div className="flex justify-between border-b border-beige-200 pb-1.5">
                  <span className="text-stone-600">Incident:</span>
                  <span className="font-mono font-bold text-stone-900"># INC-0242</span>
                </div>
                <div className="flex justify-between border-b border-beige-200 pb-1.5">
                  <span className="text-stone-600">Location:</span>
                  <span className="font-semibold text-stone-900">Sector B2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Status:</span>
                  <span className="font-bold text-red-700">Responder notification initiated</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setCitizenView('status')}
                className="w-full py-4 rounded-xl font-bold text-base bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all active:scale-[0.99]"
              >
                VIEW LIVE STATUS
              </button>
              <button
                onClick={() => setCitizenView('home')}
                className="w-full py-3 rounded-xl font-medium text-sm text-stone-600 hover:text-stone-900"
              >
                Return to Emergency Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      {!isSent && (
        <div className="mt-8 pt-4 border-t border-beige-200">
          <button
            id="btn-send-silent-alert"
            onClick={handleSendSilent}
            className="w-full py-5 rounded-2xl font-black text-xl bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/20 border border-red-700 active:scale-[0.99] flex items-center justify-center gap-3 transition-all"
          >
            <ShieldAlert className="w-6 h-6 text-white" />
            <span>SEND SILENT ALERT</span>
          </button>
        </div>
      )}
    </div>
  );
};
