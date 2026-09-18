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
    <div className="bg-white border border-beige-300 rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-beige-200">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-red-600" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
              EMERGENCY ANALYTICS &amp; DISASTER METRICS
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5 font-medium">
            Operational triage throughput, capacity saturation, and AI model verification telemetry.
          </p>
        </div>

        <span className="text-[10px] font-mono text-red-700 bg-red-50 px-2.5 py-1 rounded border border-red-200 font-bold">
          Last updated: Live
        </span>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-beige-50/60 border border-beige-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-600 block tracking-wider font-mono">
            Mean Response Time
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-stone-900">8.4m</span>
            <span className="text-[11px] font-mono text-emerald-700 font-bold">↓ 14%</span>
          </div>
          <span className="text-[10px] text-stone-500 mt-0.5 block font-mono">Target: &lt;10 min</span>
        </div>

        <div className="p-4 rounded-xl bg-beige-50/60 border border-beige-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-600 block tracking-wider font-mono">
            AI Signal Accuracy
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-red-700">98.4%</span>
            <span className="text-[11px] font-mono text-emerald-700 font-bold">High</span>
          </div>
          <span className="text-[10px] text-stone-500 mt-0.5 block font-mono">False positive: 1.2%</span>
        </div>

        <div className="p-4 rounded-xl bg-beige-50/60 border border-beige-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-600 block tracking-wider font-mono">
            Civilians Evacuated
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-stone-900">1,824</span>
            <span className="text-[11px] font-mono text-emerald-700 font-bold">Safe</span>
          </div>
          <span className="text-[10px] text-stone-500 mt-0.5 block font-mono">Zone 13 &amp; Zone 5</span>
        </div>

        <div className="p-4 rounded-xl bg-beige-50/60 border border-beige-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-600 block tracking-wider font-mono">
            Shelter Occupancy
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-stone-900">72%</span>
            <span className="text-[11px] font-mono text-amber-700 font-bold">Near Peak</span>
          </div>
          <span className="text-[10px] text-stone-500 mt-0.5 block font-mono">Shelter C on standby</span>
        </div>
      </div>

      {/* 2-Column Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: Incidents Over Time */}
        <div className="p-4 rounded-xl bg-white border border-beige-300 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-stone-900">
              Incidents Volume (Last 6 Hours)
            </span>
            <span className="text-[10px] font-mono text-stone-500">Peak: 10:45 AM</span>
          </div>

          {/* Bar histogram */}
          <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2 border-b border-beige-200">
            {[
              { time: '06:00', count: 4, height: '25%' },
              { time: '07:00', count: 7, height: '40%' },
              { time: '08:00', count: 11, height: '58%' },
              { time: '09:00', count: 16, height: '78%' },
              { time: '10:00', count: 24, height: '96%', active: true },
              { time: '11:00', count: 19, height: '82%' },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-mono text-stone-700 font-bold">{item.count}</span>
                <div
                  style={{ height: item.height }}
                  className={`w-full rounded-t-md transition-all ${
                    item.active ? 'bg-red-600 shadow-sm' : 'bg-red-200 hover:bg-red-300'
                  }`}
                />
                <span className="text-[9px] font-mono text-stone-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Response Time by Sector */}
        <div className="p-4 rounded-xl bg-white border border-beige-300 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-stone-900">
              Response Time by Sector
            </span>
            <span className="text-[10px] font-mono text-stone-500">Average: 8.4 min</span>
          </div>

          <div className="space-y-2.5 pt-1">
            {[
              { sector: 'Zone 13 - Velachery (Lake Basin)', time: '12.4 min', width: '82%', color: 'bg-red-600', alert: 'Flood restricted' },
              { sector: 'Zone 5 - Royapuram (Expressway)', time: '7.1 min', width: '48%', color: 'bg-stone-700' },
              { sector: 'Zone 9 - Teynampet (Saidapet)', time: '4.8 min', width: '32%', color: 'bg-emerald-600' },
              { sector: 'Zone 14 - Perungudi (OMR)', time: '9.2 min', width: '60%', color: 'bg-amber-600' },
            ].map((sec, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-800 font-medium">{sec.sector}</span>
                  <span className="font-mono font-bold text-stone-900">{sec.time}</span>
                </div>
                <div className="h-2 w-full bg-beige-100 border border-beige-200 rounded-full overflow-hidden">
                  <div style={{ width: sec.width }} className={`h-full rounded-full ${sec.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Most Common Emergency Hazards */}
        <div className="p-4 rounded-xl bg-white border border-beige-300 space-y-3 shadow-sm">
          <span className="text-xs font-mono font-bold uppercase text-stone-900 block">
            Most Common Emergency Hazards
          </span>

          <div className="space-y-2 text-xs">
            {[
              { label: 'Flooding & Basin Overflow', pct: '48%', count: '38 reports', color: 'bg-red-600' },
              { label: 'Building Structural Damage', pct: '24%', count: '19 reports', color: 'bg-amber-600' },
              { label: 'Electrical Transformer Hazard', pct: '18%', count: '14 reports', color: 'bg-orange-500' },
              { label: 'Medical Trauma / Isolated', pct: '10%', count: '8 reports', color: 'bg-stone-700' },
            ].map((hz, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-stone-800 font-medium">{hz.label}</span>
                  <span className="font-mono text-stone-900 font-bold">{hz.pct} ({hz.count})</span>
                </div>
                <div className="h-2 w-full bg-beige-100 border border-beige-200 rounded-full overflow-hidden">
                  <div style={{ width: hz.pct }} className={`h-full rounded-full ${hz.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Shelter Capacity Saturation */}
        <div className="p-4 rounded-xl bg-white border border-beige-300 space-y-3 shadow-sm">
          <span className="text-xs font-mono font-bold uppercase text-stone-900 block">
            Shelter Capacity Saturation
          </span>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-800 font-medium">Relief Camp A (Guru Nanak College)</span>
                <span className="font-mono font-bold text-stone-900">72% (360 / 500)</span>
              </div>
              <div className="h-2.5 w-full bg-beige-100 border border-beige-200 rounded-full overflow-hidden">
                <div style={{ width: '72%' }} className="h-full bg-red-600 rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-800 font-medium">Relief Camp B (Gandhi Road Community Hall)</span>
                <span className="font-mono font-bold text-stone-900">54% (162 / 300)</span>
              </div>
              <div className="h-2.5 w-full bg-beige-100 border border-beige-200 rounded-full overflow-hidden">
                <div style={{ width: '54%' }} className="h-full bg-amber-500 rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-800 font-medium">Relief Camp C (Saidapet Higher Sec School)</span>
                <span className="font-mono font-bold text-stone-700">12% (30 / 250) - Standby</span>
              </div>
              <div className="h-2.5 w-full bg-beige-100 border border-beige-200 rounded-full overflow-hidden">
                <div style={{ width: '12%' }} className="h-full bg-emerald-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
