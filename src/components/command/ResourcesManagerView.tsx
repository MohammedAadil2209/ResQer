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
        return <LifeBuoy className="w-4 h-4 text-cream-200" />;
      case 'Medical Tent':
        return <Tent className="w-4 h-4 text-cream-100" />;
      case 'Shelter':
        return <Building2 className="w-4 h-4 text-cream-300" />;
      case 'Mobile Generator':
        return <Zap className="w-4 h-4 text-cream-200" />;
      default:
        return <Truck className="w-4 h-4 text-cream-200" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'On Scene':
        return 'bg-wine-800 text-cream-100 border-wine-600';
      case 'En Route':
        return 'bg-wine-900 text-cream-200 border-wine-700';
      case 'Standby':
        return 'bg-wine-900/80 text-cream-300 border-wine-800';
      default:
        return 'bg-wine-900 text-cream-200 border-wine-700';
    }
  };

  return (
    <div className="bg-wine-950 border border-wine-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-wine-800">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-cream-200" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              EMERGENCY RESOURCES
            </h2>
            <span className="text-[10px] font-mono text-cream-100 bg-wine-900 border border-wine-700 px-1.5 py-0.2 rounded font-bold">
              {resources.length} UNITS
            </span>
          </div>
          <p className="text-[11px] text-cream-300 mt-0.5">
            Real-time fleet tracking, shelter occupancy, and life-support equipment.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 text-xs">
          <select
            aria-label="Filter resources by type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-wine-900 border border-wine-700 text-cream-200 rounded-lg px-2.5 py-1 text-[11px] outline-none font-mono"
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
            className="bg-wine-900 border border-wine-700 text-cream-200 rounded-lg px-2.5 py-1 text-[11px] outline-none font-mono"
          >
            <option value="all">All Status</option>
            <option value="On Scene">On Scene</option>
            <option value="En Route">En Route</option>
            <option value="Standby">Standby</option>
            <option value="Deployed">Deployed</option>
          </select>
        </div>
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[500px] pr-1">
        {filteredResources.map((res) => {
          return (
            <div
              key={res.id}
              className="p-4 rounded-xl bg-wine-900/60 border border-wine-800 hover:border-wine-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-wine-950 border border-wine-800 flex items-center justify-center">
                      {getResourceIcon(res.type || res.category)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-tight">
                        {res.name}
                      </h4>
                      <span className="text-[10px] text-cream-300 font-medium">
                        {res.type || res.category}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getStatusBadge(res.status)}`}>
                    {res.status}
                  </span>
                </div>

                {/* Location & Details */}
                <div className="space-y-1 text-xs pt-2 border-t border-wine-800/80">
                  <div className="flex items-center justify-between text-cream-300">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-cream-200" />
                      <span>{res.location}</span>
                    </span>
                    <span className="font-mono text-[11px] text-cream-200">
                      Cap: <strong className="text-white">{res.capacity}</strong>
                    </span>
                  </div>

                  {res.assignedIncidentId && (
                    <div className="text-[11px] text-cream-100 font-mono">
                      Target: #{res.assignedIncidentId}
                    </div>
                  )}

                  {res.notes && (
                    <div className="text-[11px] text-cream-400 italic">
                      {res.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-wine-800/80 flex items-center gap-2">
                {res.status === 'Standby' ? (
                  <button
                    onClick={() => dispatchResource(res.id)}
                    className="flex-1 py-1.5 rounded-lg bg-cream-100 hover:bg-white text-wine-950 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    <span>DISPATCH</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => addToast(`Reassignment queue opened for ${res.name}`, 'info')}
                      className="flex-1 py-1.5 rounded-lg bg-wine-850 hover:bg-wine-800 text-cream-200 text-xs font-semibold border border-wine-700 transition-colors"
                    >
                      REASSIGN
                    </button>
                    <button
                      onClick={() => recallResource(res.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-wine-900 hover:bg-wine-850 text-cream-100 border border-wine-700 text-xs font-semibold transition-colors"
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
