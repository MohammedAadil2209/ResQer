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
        return <Mic className="w-3.5 h-3.5 text-red-600" />;
      case 'Silent Alert':
      case 'Silent':
        return <VolumeX className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Smartphone className="w-3.5 h-3.5 text-stone-700" />;
    }
  };

  return (
    <div className="bg-white border border-beige-300 rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-beige-200">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-600" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
              COMMUNITY SIGNALS FEED
            </h2>
            <span className="text-[10px] font-mono text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded font-bold">
              LIVE MESH
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5 font-sans font-medium">
            Decentralized incoming distress pings, voice notes, and citizen observations.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 text-xs">
          <select
            aria-label="Filter signals by channel"
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="bg-beige-50 border border-beige-300 text-stone-800 rounded-lg px-2.5 py-1 text-[11px] outline-none font-mono font-medium focus:border-red-500"
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
            className="bg-beige-50 border border-beige-300 text-stone-800 rounded-lg px-2.5 py-1 text-[11px] outline-none font-mono font-medium focus:border-red-500"
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
                  ? 'bg-beige-50/50 border-beige-200' 
                  : 'bg-white border-beige-300 shadow-sm hover:border-beige-400'
              }`}
            >
              {/* Card Top Row */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-stone-800 font-mono bg-beige-100 border border-beige-300 px-2 py-0.5 rounded font-medium">
                    {getChannelIcon(report.channel || report.source)}
                    <span>{report.channel || report.source}</span>
                  </div>

                  <span className="text-[11px] font-mono text-stone-900 font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-600" />
                    {report.location || report.sector}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {report.timestamp}
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                    report.status === 'Verified'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : report.status === 'Combined'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>

              {/* Text Summary */}
              <p className="text-xs text-stone-800 leading-relaxed font-medium mb-2.5">
                "{report.content}"
              </p>

              {/* Tags & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-beige-200">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-mono font-semibold text-stone-700 uppercase bg-beige-100 border border-beige-300 px-2 py-0.5 rounded">
                    {report.category}
                  </span>
                  {report.vulnerabilities?.map((v, idx) => (
                    <span key={idx} className="text-[10px] text-red-800 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded font-mono font-medium">
                      {v}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  {report.status !== 'Verified' && (
                    <button
                      onClick={() => verifyReport(report.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-sm"
                    >
                      <CheckCircle2 className="w-3 h-3 text-white" />
                      <span>VERIFY</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCombine(report)}
                    className="px-2.5 py-1 rounded-lg bg-beige-100 hover:bg-beige-200 text-stone-800 text-[11px] font-medium border border-beige-300 transition-colors"
                  >
                    COMBINE
                  </button>

                  <button
                    onClick={() => createIncidentFromReport(report)}
                    className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold transition-colors shadow-sm"
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
