import React, { useState } from 'react';
import { 
  Radio, 
  CheckCircle2, 
  Plus, 
  MapPin, 
  Clock, 
  Mic, 
  Smartphone, 
  VolumeX, 
  ShieldCheck, 
  Filter, 
  Share2 
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { CommunityReport } from '../../types';

interface SignalsFeedViewProps {
  compact?: boolean;
}

export const SignalsFeedView: React.FC<SignalsFeedViewProps> = ({ compact = false }) => {
  const { communityReports, verifyReport, addToast, createIncidentFromReport } = useEmergency();
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredReports = communityReports.filter((rep) => {
    const ch = rep.channel || rep.source;
    if (filterChannel !== 'all' && ch !== filterChannel) return false;
    if (filterStatus !== 'all' && rep.status !== filterStatus) return false;
    return true;
  });

  const handleCombine = (rep: CommunityReport) => {
    addToast(`Signal ${rep.id} combined into ${rep.location || rep.sector} Collective Distress Group`, 'info');
  };

  const getChannelIcon = (channel: string = '') => {
    switch (channel) {
      case 'VoxRescue':
        return <Mic className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Silent Alert':
      case 'Silent':
        return <VolumeX className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Smartphone className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              COMMUNITY SIGNALS FEED
            </h2>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.2 rounded">
              LIVE MESH
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Decentralized incoming distress pings, voice notes, and citizen observations.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 text-xs">
          <select
            aria-label="Filter signals by channel"
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-[11px] outline-none"
          >
            <option value="all">All Channels</option>
            <option value="Citizen App">Citizen App</option>
            <option value="VoxRescue">VoxRescue (Voice)</option>
            <option value="Silent Alert">Silent Alert</option>
          </select>

          <select
            aria-label="Filter signals by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-[11px] outline-none"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
            <option value="Combined">Combined</option>
          </select>
        </div>
      </div>

      {/* Signals List */}
      <div className="space-y-2.5 overflow-y-auto max-h-[460px] pr-1">
        {filteredReports.map((report) => {
          const isVerified = report.status === 'Verified';
          return (
            <div
              key={report.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isVerified 
                  ? 'bg-slate-950/60 border-slate-800' 
                  : 'bg-cyan-950/20 border-cyan-500/30 shadow-md shadow-cyan-950/20'
              }`}
            >
              {/* Card Top Row */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-slate-300 font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    {getChannelIcon(report.channel || report.source)}
                    <span>{report.channel || report.source}</span>
                  </div>

                  <span className="text-[11px] font-mono text-cyan-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {report.location || report.sector}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {report.timestamp}
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                    report.status === 'Verified'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                      : report.status === 'Combined'
                      ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                      : 'bg-amber-950/80 text-amber-300 border-amber-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>

              {/* Text Summary */}
              <p className="text-xs text-slate-200 leading-relaxed font-medium mb-2.5">
                "{report.content}"
              </p>

              {/* Tags & Action Buttons (#24) */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded">
                    {report.category}
                  </span>
                  {report.vulnerabilities?.map((v, idx) => (
                    <span key={idx} className="text-[10px] text-amber-300 bg-amber-950/50 border border-amber-800/50 px-1.5 py-0.5 rounded">
                      {v}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  {report.status !== 'Verified' && (
                    <button
                      onClick={() => verifyReport(report.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>VERIFY</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCombine(report)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
                  >
                    COMBINE
                  </button>

                  <button
                    onClick={() => createIncidentFromReport(report)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-bold transition-colors"
                  >
                    CONVERT TO INCIDENT
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
