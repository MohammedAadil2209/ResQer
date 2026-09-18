import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Users,
  Flame,
  Droplets
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const AnalyticsDashboardView: React.FC = () => {
  const { incidents } = useEmergency();

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              EMERGENCY ANALYTICS &amp; DISASTER METRICS
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational triage throughput, capacity saturation, and AI model verification telemetry.
          </p>
        </div>

        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
          Last updated: Live
        </span>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Mean Response Time
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-white">8.4m</span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">↓ 14%</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Target: &lt;10 min</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            AI Signal Accuracy
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-cyan-300">98.4%</span>
            <span className="text-[11px] font-mono text-cyan-400 font-bold">High</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">False positive: 1.2%</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Civilians Evacuated
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-white">1,824</span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">Safe</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Sector B2 &amp; A1</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Shelter Occupancy
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-amber-300">72%</span>
            <span className="text-[11px] font-mono text-amber-400 font-bold">Near Peak</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Shelter C on standby</span>
        </div>
      </div>

      {/* 2-Column Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: Incidents Over Time */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-slate-200">
              Incidents Volume (Last 6 Hours)
            </span>
            <span className="text-[10px] font-mono text-slate-400">Peak: 10:45 AM</span>
          </div>

          {/* Bar histogram */}
          <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-800">
            {[
              { time: '06:00', count: 4, height: '25%' },
              { time: '07:00', count: 7, height: '40%' },
              { time: '08:00', count: 11, height: '58%' },
              { time: '09:00', count: 16, height: '78%' },
              { time: '10:00', count: 24, height: '96%', active: true },
              { time: '11:00', count: 19, height: '82%' },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-400">{item.count}</span>
                <div
                  style={{ height: item.height }}
                  className={`w-full rounded-t-md transition-all ${
                    item.active ? 'bg-cyan-400 shadow-lg shadow-cyan-500/30' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                />
                <span className="text-[9px] font-mono text-slate-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Response Time by Sector */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-slate-200">
              Response Time by Sector
            </span>
            <span className="text-[10px] font-mono text-slate-400">Average: 8.4 min</span>
          </div>

          <div className="space-y-2.5 pt-1">
            {[
              { sector: 'Sector B2 (River Valley)', time: '12.4 min', width: '82%', color: 'bg-red-500', alert: 'Flood restricted' },
              { sector: 'Sector A1 (Industrial)', time: '7.1 min', width: '48%', color: 'bg-amber-500' },
              { sector: 'Sector B1 (Civic Center)', time: '4.8 min', width: '32%', color: 'bg-emerald-500' },
              { sector: 'Sector C4 (Bypass)', time: '9.2 min', width: '60%', color: 'bg-cyan-500' },
            ].map((sec, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{sec.sector}</span>
                  <span className="font-mono font-bold text-white">{sec.time}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: sec.width }} className={`h-full rounded-full ${sec.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Most Common Emergency Hazards */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-slate-200 block">
            Most Common Emergency Hazards
          </span>

          <div className="space-y-2 text-xs">
            {[
              { label: 'Flooding & Basin Overflow', pct: '48%', count: '38 reports', color: 'bg-cyan-500' },
              { label: 'Building Structural Damage', pct: '24%', count: '19 reports', color: 'bg-amber-500' },
              { label: 'Electrical Transformer Hazard', pct: '18%', count: '14 reports', color: 'bg-yellow-500' },
              { label: 'Medical Trauma / Isolated', pct: '10%', count: '8 reports', color: 'bg-rose-500' },
            ].map((hz, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300">{hz.label}</span>
                  <span className="font-mono text-cyan-300 font-bold">{hz.pct} ({hz.count})</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: hz.pct }} className={`h-full rounded-full ${hz.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Shelter Capacity Saturation */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-slate-200 block">
            Shelter Capacity Saturation
          </span>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-medium">Shelter A (Civic High School)</span>
                <span className="font-mono font-bold text-amber-400">72% (360 / 500)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: '72%' }} className="h-full bg-amber-500 rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-medium">Shelter B (St. Jude Annex)</span>
                <span className="font-mono font-bold text-emerald-400">54% (162 / 300)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: '54%' }} className="h-full bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-medium">Shelter C (Sector B3 Community Hall)</span>
                <span className="font-mono font-bold text-cyan-400">12% (30 / 250) - Standby</span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: '12%' }} className="h-full bg-cyan-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
