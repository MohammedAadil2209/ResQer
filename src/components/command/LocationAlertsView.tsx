import React, { useState } from 'react';
import { 
  BellRing, 
  MapPin, 
  Radio, 
  Send, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  Navigation, 
  Building2, 
  CheckCircle2, 
  X, 
  PlusCircle, 
  Volume2, 
  Smartphone, 
  MessageSquare,
  Filter
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { EmergencyHazard, AlertUrgency } from '../../types';

export const LocationAlertsView: React.FC = () => {
  const { locationAlerts, createLocationAlert, deactivateLocationAlert, addToast } = useEmergency();

  const [filterSector, setFilterSector] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New alert form state
  const [newSector, setNewSector] = useState('Zone 13 - Velachery');
  const [newTitle, setNewTitle] = useState('');
  const [newHazard, setNewHazard] = useState<EmergencyHazard>('Flood');
  const [newUrgency, setNewUrgency] = useState<AlertUrgency>('EVACUATION');
  const [newRadius, setNewRadius] = useState(3.0);
  const [newPop, setNewPop] = useState(12000);
  const [newSafeRoute, setNewSafeRoute] = useState('Proceed via Road 3 Elevated Bypass. Avoid low-lying river roads.');
  const [newShelter, setNewShelter] = useState('Shelter C — Valley West Pavilion');
  const [newInstructions, setNewInstructions] = useState('Move immediately to higher ground or second-floor elevation. Turn off main circuit breaker.');
  const [selectedChannels, setSelectedChannels] = useState<('CELL_BROADCAST' | 'MOBILE_APP' | 'DIGITAL_SIREN' | 'SMS_GEOFENCE')[]>([
    'CELL_BROADCAST', 'MOBILE_APP', 'DIGITAL_SIREN', 'SMS_GEOFENCE'
  ]);

  const filteredAlerts = locationAlerts.filter(a => {
    if (filterSector !== 'all' && a.sector !== filterSector) return false;
    return true;
  });

  const activeCount = locationAlerts.filter(a => a.status === 'ACTIVE').length;
  const totalPopAffected = locationAlerts
    .filter(a => a.status === 'ACTIVE')
    .reduce((acc, a) => acc + a.affectedPopulation, 0);

  const toggleChannel = (channel: 'CELL_BROADCAST' | 'MOBILE_APP' | 'DIGITAL_SIREN' | 'SMS_GEOFENCE') => {
    setSelectedChannels(prev => 
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      addToast('Please enter an alert title', 'error');
      return;
    }

    createLocationAlert({
      sector: newSector,
      title: newTitle,
      hazard: newHazard,
      urgency: newUrgency,
      radiusKm: Number(newRadius),
      affectedPopulation: Number(newPop),
      safeRoute: newSafeRoute,
      evacuationShelter: newShelter,
      shelterCapacityRemaining: 250,
      deliveryChannels: selectedChannels,
      instructions: newInstructions.split('.').map(s => s.trim()).filter(Boolean)
    });

    setShowCreateModal(false);
    setNewTitle('');
  };

  const getUrgencyBadge = (urgency: AlertUrgency) => {
    switch (urgency) {
      case 'EVACUATION':
        return 'bg-red-600 text-white animate-pulse';
      case 'SEVERE':
        return 'bg-red-500 text-white';
      case 'WARNING':
        return 'bg-amber-600 text-white';
      case 'ADVISORY':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-emerald-600 text-white';
    }
  };

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      {/* Top Telemetry KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>ACTIVE LOCATION ALERTS</span>
            <BellRing className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1 font-mono">{activeCount}</div>
          <span className="text-[10px] text-red-600 font-bold uppercase">Geofenced Broadcasters Active</span>
        </div>

        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>POPULATION TARGETED</span>
            <Users className="w-4 h-4 text-stone-700" />
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1 font-mono">
            {totalPopAffected.toLocaleString()}
          </div>
          <span className="text-[10px] text-stone-500 font-medium">Across active danger corridors</span>
        </div>

        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>DELIVERY NETWORK REACH</span>
            <Radio className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">96.8%</div>
          <span className="text-[10px] text-emerald-700 font-medium">Cell Broadcast + App push</span>
        </div>

        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>SIREN ARRAYS</span>
            <Volume2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1 font-mono">14 / 14</div>
          <span className="text-[10px] text-stone-600 font-medium">Synchronized acoustic coverage</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-beige-300 rounded-2xl p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 shadow-sm">
        {/* Controls & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-beige-200">
          <div>
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-red-600" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                LOCATION-BASED ALERT BROADCASTS
              </h2>
              <span className="text-[10px] font-mono text-white bg-red-600 px-1.5 py-0.2 rounded font-bold">
                SYSTEM OBJECTIVE #3
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5 font-medium">
              Deliver targeted emergency alerts, safe evacuation corridors, and designated shelters to citizens based on affected geographic sectors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              aria-label="Filter alerts by sector"
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="bg-beige-50 border border-beige-300 text-stone-800 rounded-lg px-2.5 py-1.5 text-xs outline-none font-mono focus:border-red-500"
            >
              <option value="all">All Sectors</option>
              <option value="Zone 13 - Velachery">Zone 13 - Velachery (Lake Basin)</option>
              <option value="Zone 5 - Royapuram">Zone 5 - Royapuram (Harbour)</option>
              <option value="Zone 10 - Kodambakkam">Zone 10 - Kodambakkam (Adyar Basin)</option>
              <option value="Zone 14 - Perungudi">Zone 14 - Perungudi (OMR Corridor)</option>
              <option value="Zone 9 - Teynampet">Zone 9 - Teynampet (Saidapet)</option>
            </select>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>ISSUE LOCATION ALERT</span>
            </button>
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[520px] pr-1">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 shadow-sm ${
                alert.status === 'ACTIVE' 
                  ? 'bg-white border-red-300 hover:border-red-500' 
                  : 'bg-stone-50 border-beige-300 opacity-70'
              }`}
            >
              <div>
                {/* Header with Urgency and Sector */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded ${getUrgencyBadge(alert.urgency)}`}>
                    {alert.urgency}
                  </span>
                  <span className="text-[10px] font-mono text-stone-700 font-bold bg-beige-100 border border-beige-300 px-2 py-0.5 rounded">
                    {alert.sector}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 leading-snug">
                  {alert.title}
                </h3>

                <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono mt-1">
                  <span>Radius: {alert.radiusKm} km</span>
                  <span>•</span>
                  <span>Pop: {alert.affectedPopulation.toLocaleString()}</span>
                  <span>•</span>
                  <span>{alert.issuedAt}</span>
                </div>

                {/* Safe Evacuation Corridor */}
                <div className="mt-3 p-2.5 rounded-lg bg-beige-50 border border-beige-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-red-700 font-bold text-[11px]">
                    <Navigation className="w-3.5 h-3.5 shrink-0" />
                    <span>DESIGNATED SAFE ROUTE:</span>
                  </div>
                  <p className="text-stone-800 text-[11px] font-medium leading-relaxed">
                    {alert.safeRoute}
                  </p>
                </div>

                {/* Shelter Waypoint */}
                <div className="mt-2 p-2.5 rounded-lg bg-beige-50 border border-beige-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-900 font-bold text-[11px]">
                    <Building2 className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                    <span>EVACUATION SHELTER:</span>
                  </div>
                  <p className="text-stone-800 text-[11px] font-medium">
                    {alert.evacuationShelter}
                  </p>
                </div>

                {/* Delivery Channels */}
                <div className="mt-2 flex flex-wrap items-center gap-1 pt-2 border-t border-beige-200">
                  <span className="text-[10px] text-stone-400 font-mono uppercase mr-1">CHANNELS:</span>
                  {alert.deliveryChannels.map(ch => (
                    <span key={ch} className="text-[9px] font-mono bg-beige-100 text-stone-700 px-1.5 py-0.5 rounded border border-beige-200">
                      {ch.replace('_', ' ')}
                    </span>
                  ))}
                  <span className="ml-auto text-[10px] font-mono font-bold text-emerald-700">
                    {alert.deliveryReach}% Reach
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-beige-200 flex items-center gap-2">
                {alert.status === 'ACTIVE' ? (
                  <>
                    <button
                      onClick={() => addToast(`Re-broadcasting siren and cell vectors for ${alert.sector}`, 'warning')}
                      className="flex-1 py-1.5 rounded-lg bg-beige-100 hover:bg-beige-200 text-stone-800 font-bold text-xs border border-beige-300 transition-colors"
                    >
                      RE-BROADCAST
                    </button>
                    <button
                      onClick={() => deactivateLocationAlert(alert.id)}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-beige-300 transition-colors"
                    >
                      ALL CLEAR / DEACTIVATE
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-mono text-stone-400 italic">
                    Alert deactivated • All clear issued
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Issue Location Alert */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-beige-300 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-beige-200">
              <div className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                  ISSUE GEOFENCED LOCATION ALERT
                </h3>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Alert Headline / Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Flash Flood Immediate Evacuation Order"
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2.5 text-stone-900 font-medium outline-none focus:border-red-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Target Sector Location
                  </label>
                  <select
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)}
                    className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500 font-mono"
                  >
                    <option value="Zone 13 - Velachery">Zone 13 - Velachery (Ram Nagar & Lake Basin)</option>
                    <option value="Zone 5 - Royapuram">Zone 5 - Royapuram (Expressway & Harbour)</option>
                    <option value="Zone 10 - Kodambakkam">Zone 10 - Kodambakkam (Jafferkhanpet & Adyar)</option>
                    <option value="Zone 14 - Perungudi">Zone 14 - Perungudi (OMR IT Corridor)</option>
                    <option value="Zone 9 - Teynampet">Zone 9 - Teynampet (Saidapet & Anna Salai)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Urgency Level
                  </label>
                  <select
                    value={newUrgency}
                    onChange={(e) => setNewUrgency(e.target.value as AlertUrgency)}
                    className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500 font-bold"
                  >
                    <option value="EVACUATION">EVACUATION ORDER</option>
                    <option value="SEVERE">SEVERE WARNING</option>
                    <option value="WARNING">WARNING</option>
                    <option value="ADVISORY">ADVISORY</option>
                    <option value="ALL_CLEAR">ALL CLEAR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Geofence Radius (km)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="20"
                    value={newRadius}
                    onChange={(e) => setNewRadius(Number(e.target.value))}
                    className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 font-mono outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Estimated Residents Affected
                  </label>
                  <input
                    type="number"
                    value={newPop}
                    onChange={(e) => setNewPop(Number(e.target.value))}
                    className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 font-mono outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Designated Safe Evacuation Corridor
                </label>
                <input
                  type="text"
                  value={newSafeRoute}
                  onChange={(e) => setNewSafeRoute(e.target.value)}
                  placeholder="e.g. Use Road 3 Elevated North Ridge Bypass..."
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 font-medium outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Designated Shelter Destination
                </label>
                <input
                  type="text"
                  value={newShelter}
                  onChange={(e) => setNewShelter(e.target.value)}
                  placeholder="e.g. Shelter C — Valley West Pavilion"
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 font-medium outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Delivery Channels
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'CELL_BROADCAST', label: 'Cellular Broadcast' },
                    { key: 'MOBILE_APP', label: 'ResQer Citizen Push' },
                    { key: 'DIGITAL_SIREN', label: 'Acoustic Sirens' },
                    { key: 'SMS_GEOFENCE', label: 'SMS Geofence Relay' }
                  ].map((ch) => (
                    <label 
                      key={ch.key}
                      className="flex items-center gap-2 p-2 rounded-lg bg-beige-50 border border-beige-200 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedChannels.includes(ch.key as any)}
                        onChange={() => toggleChannel(ch.key as any)}
                        className="accent-red-600 rounded"
                      />
                      <span className="text-[11px] font-medium text-stone-800">{ch.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  TRANSMIT LOCATION-BASED BROADCAST
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-beige-100 hover:bg-beige-200 text-stone-700 font-semibold text-xs border border-beige-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
