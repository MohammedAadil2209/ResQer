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
            className="flex items-center gap-1.5 text-sm text-cream-200 hover:text-white bg-wine-900/80 hover:bg-wine-800 px-3 py-1.5 rounded-lg border border-wine-700/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return</span>
          </button>

          <span className="text-[11px] font-mono uppercase font-bold text-cream-100 bg-wine-800/80 border border-wine-600 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <VolumeX className="w-3.5 h-3.5" />
            <span>Silent Mode</span>
          </span>
        </div>

        {!isSent ? (
          <div className="space-y-6">
            {/* Main Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                I CAN'T TALK
              </h1>
              <p className="text-base text-cream-200 mt-1.5">
                Send the minimum information needed to request help without making any sound.
              </p>
            </div>

            {/* Silent Telemetry Data Card */}
            <div className="p-5 rounded-2xl bg-wine-950 border border-wine-700 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-wine-800">
                <span className="text-xs font-bold uppercase tracking-wider text-cream-400 font-mono">
                  Automated Beacon Telemetry
                </span>
                <span className="text-[11px] text-cream-200 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cream-200 animate-pulse" />
                  Locked
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-200 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-cream-400 tracking-wider block font-mono">
                    Location
                  </span>
                  <span className="text-base font-bold text-white">
                    Sector B2 — High Accuracy Geofence
                  </span>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-wine-900 border border-wine-800 flex items-center justify-center text-cream-300 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-cream-400 tracking-wider block font-mono">
                    Timestamp
                  </span>
                  <span className="text-base font-bold text-white">
                    {currentTime} Local Standard Time
                  </span>
                </div>
              </div>

              {/* Connection Status */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-wine-900 border border-wine-700 flex items-center justify-center text-cream-200 shrink-0">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-cream-400 tracking-wider block font-mono">
                    Connection Status
                  </span>
                  <span className="text-base font-bold text-cream-100">
                    Encrypted Emergency Channel Online
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-wine-900/60 border border-wine-700/80 text-xs text-cream-200 leading-relaxed">
              Responders are instructed to arrive without sirens and establish discrete contact.
            </div>
          </div>
        ) : (
          /* Confirmation State */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="p-6 sm:p-8 rounded-3xl bg-wine-950 border border-wine-700 shadow-2xl text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cream-100/20 border-2 border-cream-200 text-cream-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  SILENT EMERGENCY SENT
                </h2>
                <p className="text-sm text-cream-200 mt-1">
                  Your discrete distress beacon was delivered to central dispatch.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-wine-900/80 border border-wine-800 text-left space-y-2 text-sm">
                <div className="flex justify-between border-b border-wine-800 pb-1.5">
                  <span className="text-cream-300">Incident:</span>
                  <span className="font-mono font-bold text-cream-100"># INC-0242</span>
                </div>
                <div className="flex justify-between border-b border-wine-800 pb-1.5">
                  <span className="text-cream-300">Location:</span>
                  <span className="font-semibold text-white">Sector B2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-300">Status:</span>
                  <span className="font-bold text-cream-100">Responder notification initiated</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setCitizenView('status')}
                className="w-full py-4 rounded-xl font-bold text-base bg-cream-100 hover:bg-white text-wine-950 border border-cream-200 shadow-xl transition-all active:scale-[0.99]"
              >
                VIEW LIVE STATUS
              </button>
              <button
                onClick={() => setCitizenView('home')}
                className="w-full py-3 rounded-xl font-medium text-sm text-cream-300 hover:text-white"
              >
                Return to Emergency Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      {!isSent && (
        <div className="mt-8 pt-4 border-t border-wine-850">
          <button
            id="btn-send-silent-alert"
            onClick={handleSendSilent}
            className="w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-wine-700 via-wine-600 to-wine-700 hover:from-wine-600 hover:to-wine-500 text-white shadow-2xl shadow-wine-950/80 border border-wine-400/40 active:scale-[0.99] flex items-center justify-center gap-3 transition-all"
          >
            <ShieldAlert className="w-6 h-6 text-cream-100" />
            <span>SEND SILENT ALERT</span>
          </button>
        </div>
      )}
    </div>
  );
};
