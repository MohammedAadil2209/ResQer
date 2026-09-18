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
        return <LifeBuoy className="w-4 h-4 text-red-600" />;
      case 'Medical Tent':
        return <Tent className="w-4 h-4 text-red-600" />;
      case 'Shelter':
        return <Building2 className="w-4 h-4 text-stone-700" />;
      case 'Mobile Generator':
        return <Zap className="w-4 h-4 text-amber-600" />;
      default:
        return <Truck className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'On Scene':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'En Route':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Standby':
        return 'bg-beige-100 text-stone-700 border-beige-300';
      case 'Deployed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-beige-100 text-stone-700 border-beige-300';
    }
  };

  return (
    <div className="bg-white border border-beige-300 rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-beige-200">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-red-600" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
              EMERGENCY RESOURCES
            </h2>
            <span className="text-[10px] font-mono text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded font-bold">
              {resources.length} UNITS
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5 font-medium">
            Real-time fleet tracking, shelter occupancy, and life-support equipment.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 text-xs">
          <select
            aria-label="Filter resources by type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-beige-50 border border-beige-300 text-stone-800 rounded-lg px-2.5 py-1 text-[11px] outline-none font-mono font-medium focus:border-red-500"
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
            className="bg-beige-50 border border-beige-300 text-stone-800 rounded-lg px-2.5 py-1 text-[11px] outline-none font-mono font-medium focus:border-red-500"
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
              className="p-4 rounded-xl bg-white border border-beige-300 hover:border-beige-400 transition-all flex flex-col justify-between space-y-3 shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-beige-100 border border-beige-200 flex items-center justify-center">
                      {getResourceIcon(res.type || res.category)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 tracking-tight">
                        {res.name}
                      </h4>
                      <span className="text-[10px] text-stone-500 font-medium">
                        {res.type || res.category}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getStatusBadge(res.status)}`}>
                    {res.status}
                  </span>
                </div>

                {/* Location & Details */}
                <div className="space-y-1 text-xs pt-2 border-t border-beige-200">
                  <div className="flex items-center justify-between text-stone-700 font-medium">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-red-600" />
                      <span>{res.location}</span>
                    </span>
                    <span className="font-mono text-[11px] text-stone-600">
                      Cap: <strong className="text-stone-900 font-bold">{res.capacity}</strong>
                    </span>
                  </div>

                  {res.assignedIncidentId && (
                    <div className="text-[11px] text-stone-800 font-mono font-semibold">
                      Target: #{res.assignedIncidentId}
                    </div>
                  )}

                  {res.notes && (
                    <div className="text-[11px] text-stone-500 italic">
                      {res.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-beige-200 flex items-center gap-2">
                {res.status === 'Standby' ? (
                  <button
                    onClick={() => dispatchResource(res.id)}
                    className="flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
                  >
                    <Send className="w-3 h-3" />
                    <span>DISPATCH</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => addToast(`Reassignment queue opened for ${res.name}`, 'info')}
                      className="flex-1 py-1.5 rounded-lg bg-beige-100 hover:bg-beige-200 text-stone-800 text-xs font-bold border border-beige-300 transition-colors"
                    >
                      REASSIGN
                    </button>
                    <button
                      onClick={() => recallResource(res.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-beige-50 text-stone-800 border border-beige-300 text-xs font-semibold transition-colors"
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
