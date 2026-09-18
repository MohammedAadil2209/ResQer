import React, { useState } from 'react';
import { 
  Truck, 
  LifeBuoy, 
  Tent, 
  Building2, 
  Zap, 
  MapPin, 
  Send, 
  RotateCw, 
  Filter, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { EmergencyResource } from '../../types';

export const ResourcesManagerView: React.FC = () => {
  const { resources, dispatchResource, recallResource, addToast } = useEmergency();
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredResources = resources.filter((res) => {
    const resType = res.type || res.category;
    if (filterType !== 'all' && resType !== filterType) return false;
    if (filterStatus !== 'all' && res.status !== filterStatus) return false;
    return true;
  });

  const getResourceIcon = (type: string = '') => {
    switch (type) {
      case 'Rescue Boat':
        return <LifeBuoy className="w-4 h-4 text-cyan-400" />;
      case 'Medical Tent':
        return <Tent className="w-4 h-4 text-rose-400" />;
      case 'Shelter':
        return <Building2 className="w-4 h-4 text-amber-400" />;
      case 'Mobile Generator':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      default:
        return <Truck className="w-4 h-4 text-blue-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'On Scene':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      case 'En Route':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800';
      case 'Standby':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      default:
        return 'bg-amber-950/80 text-amber-300 border-amber-800';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              EMERGENCY RESOURCES
            </h2>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.2 rounded">
              {resources.length} UNITS
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Real-time fleet tracking, shelter occupancy, and life-support equipment.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 text-xs">
          <select
            aria-label="Filter resources by type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-[11px] outline-none"
          >
            <option value="all">All Types</option>
            <option value="Ambulance">Ambulance</option>
            <option value="Rescue Boat">Rescue Boat</option>
            <option value="Medical Tent">Medical Tent</option>
            <option value="Shelter">Shelter</option>
            <option value="Mobile Generator">Mobile Generator</option>
          </select>

          <select
            aria-label="Filter resources by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-[11px] outline-none"
          >
            <option value="all">All Status</option>
            <option value="On Scene">On Scene</option>
            <option value="En Route">En Route</option>
            <option value="Standby">Standby</option>
            <option value="Deployed">Deployed</option>
          </select>
        </div>
      </div>

      {/* Grid of Resource Cards (#28) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[500px] pr-1">
        {filteredResources.map((res) => {
          return (
            <div
              key={res.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      {getResourceIcon(res.type || res.category)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-tight">
                        {res.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {res.type || res.category}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getStatusBadge(res.status)}`}>
                    {res.status}
                  </span>
                </div>

                {/* Location & Details */}
                <div className="space-y-1 text-xs pt-2 border-t border-slate-900">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{res.location}</span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-300">
                      Cap: <strong className="text-white">{res.capacity}</strong>
                    </span>
                  </div>

                  {res.assignedIncidentId && (
                    <div className="text-[11px] text-cyan-400 font-mono">
                      Target: #{res.assignedIncidentId}
                    </div>
                  )}

                  {res.notes && (
                    <div className="text-[11px] text-slate-400 italic">
                      {res.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons (#28) */}
              <div className="pt-2 border-t border-slate-900 flex items-center gap-2">
                {res.status === 'Standby' ? (
                  <button
                    onClick={() => dispatchResource(res.id)}
                    className="flex-1 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    <span>DISPATCH</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => addToast(`Reassignment queue opened for ${res.name}`, 'info')}
                      className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      REASSIGN
                    </button>
                    <button
                      onClick={() => recallResource(res.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-semibold transition-colors"
                    >
                      RECALL
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
