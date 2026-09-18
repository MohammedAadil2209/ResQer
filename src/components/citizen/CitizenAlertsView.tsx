import React from 'react';
import { 
  BellRing, 
  MapPin, 
  Navigation, 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  Radio, 
  ArrowLeft,
  Volume2
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const CitizenAlertsView: React.FC = () => {
  const { 
    locationAlerts, 
    citizenDraft, 
    setCitizenDraft, 
    setCitizenView, 
    addToast 
  } = useEmergency();

  const currentSector = citizenDraft.locationSector || 'Sector B2';
  const sectorAlerts = locationAlerts.filter(a => a.sector === currentSector && a.status === 'ACTIVE');
  const allActiveAlerts = locationAlerts.filter(a => a.status === 'ACTIVE');

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCitizenView('home')}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 border border-beige-300 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-mono">Your Sector:</span>
          <select
            value={currentSector}
            onChange={(e) => setCitizenDraft(prev => ({ ...prev, locationSector: e.target.value }))}
            className="text-xs bg-beige-50 border border-beige-300 text-stone-900 rounded-lg px-2 py-1 font-mono font-bold outline-none focus:border-red-500"
          >
            <option value="Sector B2">Sector B2</option>
            <option value="Sector A1">Sector A1</option>
            <option value="Sector C4">Sector C4</option>
            <option value="Sector B1">Sector B1</option>
            <option value="Sector D1">Sector D1</option>
          </select>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="p-4 rounded-2xl bg-white border border-beige-300 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-red-600" />
            <h1 className="text-base font-extrabold text-stone-900">
              LOCATION-BASED ALERTS
            </h1>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Real-time geofenced emergency directives for {currentSector}.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-red-100 text-red-800 border border-red-200">
            {sectorAlerts.length} Active in Area
          </span>
        </div>
      </div>

      {/* Alerts for this sector */}
      {sectorAlerts.length > 0 ? (
        <div className="space-y-4">
          {sectorAlerts.map((alert) => (
            <div 
              key={alert.id}
              className="p-5 rounded-2xl bg-white border-2 border-red-500 shadow-md space-y-4"
            >
              {/* Alert Badge & Header */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded bg-red-600 text-white animate-pulse">
                  {alert.urgency} ORDER
                </span>
                <span className="text-xs font-mono text-stone-500">
                  Issued at {alert.issuedAt}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-stone-900">
                  {alert.title}
                </h2>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-600 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>Geofence Radius: {alert.radiusKm} km from River Basin</span>
                </div>
              </div>

              {/* Evacuation Route Card */}
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-1.5">
                <div className="flex items-center gap-2 text-red-800 font-bold text-xs">
                  <Navigation className="w-4 h-4 text-red-600 shrink-0" />
                  <span>DESIGNATED SAFE EVACUATION CORRIDOR</span>
                </div>
                <p className="text-xs text-stone-800 font-medium leading-relaxed">
                  {alert.safeRoute}
                </p>
              </div>

              {/* Destination Shelter */}
              <div className="p-3.5 rounded-xl bg-beige-50 border border-beige-300 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-stone-900 font-bold">
                    <Building2 className="w-4 h-4 text-stone-700 shrink-0" />
                    <span>NEAREST DESIGNATED SHELTER</span>
                  </div>
                  <span className="font-mono text-emerald-700 font-semibold text-[11px]">
                    {alert.shelterCapacityRemaining} Cots Remaining
                  </span>
                </div>
                <p className="text-xs text-stone-700 font-medium">
                  {alert.evacuationShelter}
                </p>
              </div>

              {/* Instructions Checklist */}
              {alert.instructions.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wide block">
                    Immediate Citizen Actions:
                  </span>
                  <ul className="space-y-1">
                    {alert.instructions.map((inst, idx) => (
                      <li key={idx} className="text-xs text-stone-700 flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-beige-200 text-stone-700 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Citizen Check In prompt */}
              <div className="pt-2 border-t border-beige-200 flex gap-2">
                <button
                  onClick={() => setCitizenView('check-in')}
                  className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all text-center"
                >
                  I Am Here — Check In / Send Status
                </button>
                <button
                  onClick={() => addToast('Digital siren alarm sound confirmed in sector', 'info')}
                  className="px-3 py-2 rounded-xl bg-beige-100 hover:bg-beige-200 text-stone-800 text-xs font-semibold border border-beige-300 flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5 text-stone-600" />
                  <span>Siren</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-white border border-beige-300 text-center space-y-2">
          <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="text-sm font-bold text-stone-900">
            No Active Evacuation Orders in {currentSector}
          </h3>
          <p className="text-xs text-stone-600 max-w-sm mx-auto">
            Your immediate area is currently classified under normal vigilance. If you see signs of danger, submit an emergency report.
          </p>
        </div>
      )}

      {/* Other Sector Alerts Summary */}
      {allActiveAlerts.length > sectorAlerts.length && (
        <div className="p-4 rounded-xl bg-white border border-beige-200 space-y-2">
          <div className="text-xs font-bold text-stone-700 uppercase tracking-wide">
            Other Active Regional Advisories:
          </div>
          <div className="space-y-1.5">
            {allActiveAlerts
              .filter(a => a.sector !== currentSector)
              .map(a => (
                <div 
                  key={a.id}
                  onClick={() => setCitizenDraft(prev => ({ ...prev, locationSector: a.sector }))}
                  className="p-2.5 rounded-lg bg-beige-50 hover:bg-beige-100 border border-beige-200 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold text-stone-900">{a.sector}: </span>
                    <span className="text-xs text-stone-600">{a.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-700 font-bold uppercase">
                    View Sector →
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
