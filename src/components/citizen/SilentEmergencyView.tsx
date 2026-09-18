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
            className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return</span>
          </button>

          <span className="text-[11px] font-mono uppercase font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
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
              <p className="text-base text-slate-300 mt-1.5">
                Send the minimum information needed to request help without making any sound.
              </p>
            </div>

            {/* Silent Telemetry Data Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Automated Beacon Telemetry
                </span>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Locked
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-800/70 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Location
                  </span>
                  <span className="text-base font-bold text-white">
                    Sector B2 — High Accuracy Geofence
                  </span>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Timestamp
                  </span>
                  <span className="text-base font-bold text-white">
                    {currentTime} Local Standard Time
                  </span>
                </div>
              </div>

              {/* Connection Status */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Connection Status
                  </span>
                  <span className="text-base font-bold text-emerald-400">
                    Encrypted Emergency Channel Online
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              Responders are instructed to arrive without sirens and establish discrete contact.
            </div>
          </div>
        ) : (
          /* Confirmation State (#13) */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  SILENT EMERGENCY SENT
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Your discrete distress beacon was delivered to central dispatch.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-2 text-sm">
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Incident:</span>
                  <span className="font-mono font-bold text-cyan-400"># INC-0242</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-white">Sector B2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-amber-400">Responder notification initiated</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setCitizenView('status')}
                className="w-full py-4 rounded-xl font-bold text-base bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg transition-all"
              >
                VIEW LIVE STATUS
              </button>
              <button
                onClick={() => setCitizenView('home')}
                className="w-full py-3 rounded-xl font-medium text-sm text-slate-400 hover:text-white"
              >
                Return to Emergency Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      {!isSent && (
        <div className="mt-8 pt-4 border-t border-slate-800">
          <button
            id="btn-send-silent-alert"
            onClick={handleSendSilent}
            className="w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-red-600 via-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-xl shadow-red-950/60 border border-red-400/40 active:scale-[0.99] flex items-center justify-center gap-3 transition-all"
          >
            <ShieldAlert className="w-6 h-6" />
            <span>SEND SILENT ALERT</span>
          </button>
        </div>
      )}
    </div>
  );
};
