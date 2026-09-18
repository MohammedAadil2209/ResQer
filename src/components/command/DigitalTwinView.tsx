import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  MapPin, 
  AlertTriangle, 
  ShieldAlert, 
  Truck, 
  Building2, 
  Droplets, 
  Flame, 
  Hospital as HospIcon, 
  Home, 
  Eye, 
  Crosshair, 
  ArrowUpRight,
  Route
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { MAP_SECTORS } from '../../data/mockData';
import { Incident } from '../../types';

export const DigitalTwinView: React.FC = () => {
  const { 
    incidents, 
    resources, 
    selectedIncidentId, 
    setSelectedIncidentId, 
    setCommandView,
    scenarioParams
  } = useEmergency();

  // Layer Visibility Toggles
  const [layers, setLayers] = useState({
    incidents: true,
    resources: true,
    floodZone: true,
    evacRoutes: true,
    infrastructure: true
  });
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Currently inspected marker
  const [activeMarkerData, setActiveMarkerData] = useState<Incident | null>(null);

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleFitIncidents = () => {
    setZoomLevel(1.25);
    setPan({ x: -40, y: -20 });
  };

  return (
    <div className="relative w-full h-full min-h-[520px] bg-[#070b12] rounded-2xl border border-slate-800 overflow-hidden select-none flex flex-col justify-between">
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Map title & Active Sector Indicator */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
            DIGITAL TWIN • SECTOR B2 ACTIVE
          </span>
          <span className="text-[10px] text-cyan-400 bg-cyan-950 border border-cyan-800 px-1.5 py-0.5 rounded font-mono">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>

        {/* Right: Map Action Tools */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md border border-slate-800 p-1 rounded-xl shadow-lg">
          <button
            id="btn-zoom-in"
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom In"
            aria-label="Zoom in on digital twin"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            id="btn-zoom-out"
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom Out"
            aria-label="Zoom out on digital twin"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            id="btn-fit-incidents"
            onClick={handleFitIncidents}
            className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors text-xs font-semibold flex items-center gap-1"
            title="Fit to Incident Cluster"
          >
            <Crosshair className="w-4 h-4" />
          </button>
          <button
            id="btn-reset-map"
            onClick={handleResetView}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset Map View"
            aria-label="Reset digital twin map view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Layer menu dropdown button */}
          <div className="relative">
            <button
              id="btn-toggle-layers"
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                showLayerMenu ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
              }`}
              title="Map Layers"
            >
              <Layers className="w-4 h-4" />
              <span>Layers</span>
            </button>

            {showLayerMenu && (
              <div className="absolute right-0 top-10 w-52 bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl space-y-2 z-30 text-xs">
                <span className="font-bold text-white block pb-1 border-b border-slate-800">
                  Visible Map Layers
                </span>
                {Object.entries(layers).map(([key, val]) => (
                  <label key={key} className="flex items-center justify-between text-slate-300 cursor-pointer hover:text-white">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <input
                      type="checkbox"
                      checked={val}
                      onChange={() => setLayers(prev => ({ ...prev, [key]: !val }))}
                      className="rounded bg-slate-800 border-slate-700 text-cyan-400 focus:ring-cyan-500/20"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Interactive Map Surface */}
      <div 
        className="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
            transformOrigin: '50% 50%',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
          className="w-full h-full absolute inset-0 flex items-center justify-center"
        >
          {/* SVG Map Canvas */}
          <svg
            viewBox="0 0 1000 650"
            className="w-full h-full max-w-[1200px] max-h-[750px] overflow-visible"
          >
            <defs>
              {/* Background grid pattern */}
              <pattern id="twinGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#172338" strokeWidth="0.8" opacity="0.6" />
                <circle cx="0" cy="0" r="1" fill="#1e3a5f" />
              </pattern>

              {/* Flood water animated radial gradient */}
              <radialGradient id="floodGlow" cx="58%" cy="45%" r="35%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#0891b2" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
              </radialGradient>

              {/* Fire glow */}
              <radialGradient id="fireGlow" cx="28%" cy="32%" r="20%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.38" />
                <stop offset="60%" stopColor="#f97316" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Base Coordinate Grid */}
            <rect width="1000" height="650" fill="#090e18" />
            <rect width="1000" height="650" fill="url(#twinGrid)" />

            {/* Sector Boundary Dividers */}
            <g opacity="0.45" stroke="#1e2d48" strokeWidth="1" strokeDasharray="4,4">
              <line x1="333" y1="0" x2="333" y2="650" />
              <line x1="666" y1="0" x2="666" y2="650" />
              <line x1="0" y1="216" x2="1000" y2="216" />
              <line x1="0" y1="432" x2="1000" y2="432" />
            </g>

            {/* Sector Labels */}
            {MAP_SECTORS.map(sec => (
              <text
                key={sec.id}
                x={sec.x * 10}
                y={sec.y * 6.5 - 24}
                fill="#475569"
                fontSize="11"
                fontWeight="700"
                fontFamily="monospace"
                letterSpacing="1px"
              >
                {sec.id.toUpperCase()}
              </text>
            ))}

            {/* River & Tributary Flow */}
            <path
              d="M 50 120 Q 280 180, 480 280 T 620 340 T 780 490 T 950 560"
              fill="none"
              stroke="#0e7490"
              strokeWidth="28"
              opacity="0.3"
              strokeLinecap="round"
            />
            <path
              d="M 50 120 Q 280 180, 480 280 T 620 340 T 780 490 T 950 560"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="4"
              opacity="0.5"
              strokeDasharray="6,4"
            />

            {/* FLOOD INUNDATION ZONE OVERLAY in Sector B2 (#22) */}
            {layers.floodZone && (
              <g>
                <circle
                  cx="580"
                  cy="295"
                  r={85 + (scenarioParams.waterLevelDelta * 0.8)}
                  fill="url(#floodGlow)"
                  className="animate-pulse"
                />
                {/* Rising contour rings */}
                <ellipse
                  cx="580"
                  cy="295"
                  rx={65 + (scenarioParams.waterLevelDelta * 0.6)}
                  ry={48 + (scenarioParams.waterLevelDelta * 0.4)}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                  opacity="0.75"
                />
                <text
                  x="520"
                  y="245"
                  fill="#67e8f9"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  SURGE ZONE +{scenarioParams.waterLevelDelta}% (WATER HIGH)
                </text>
              </g>
            )}

            {/* Fire Zone in Sector A1 */}
            <circle cx="280" cy="208" r="55" fill="url(#fireGlow)" />

            {/* Primary & Secondary Road Network */}
            <g stroke="#334155" strokeWidth="6" strokeLinecap="round" opacity="0.8">
              {/* Highway Bypass */}
              <line x1="120" y1="580" x2="880" y2="580" stroke="#475569" strokeWidth="9" />
              {/* Road 1 (Civic - North) */}
              <line x1="500" y1="80" x2="500" y2="400" />
              {/* Road 2 (Flood approach - Inundated) */}
              <line 
                x1="400" 
                y1="300" 
                x2="720" 
                y2="300" 
                stroke={scenarioParams.roadAvailability < 80 ? '#ef4444' : '#f59e0b'} 
                strokeDasharray="8,6"
              />
              {/* Road 3 (Elevated North Ridge Bypass) */}
              <line x1="450" y1="180" x2="780" y2="180" stroke="#10b981" strokeWidth="5" />
            </g>

            {/* Road Status Labels */}
            <text x="410" y="290" fill="#f87171" fontSize="9" fontWeight="bold" fontFamily="monospace">
              ROAD 2 [RESTRICTED / 2.5FT WATER]
            </text>
            <text x="470" y="170" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">
              ROAD 3 [ELEVATED BYPASS — OPEN]
            </text>

            {/* Evacuation Route Visualization (#19) */}
            {layers.evacRoutes && (
              <path
                d="M 580 320 L 500 240 L 500 140 L 780 140"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeDasharray="8,5"
                strokeLinecap="round"
                className="animate-pulse"
              />
            )}

            {/* 3D Extruded Buildings & Critical Infrastructure */}
            {layers.infrastructure && (
              <g>
                {/* North Valley Elementary School (B2) */}
                <g transform="translate(560, 270)">
                  <polygon points="0,15 25,0 50,15 25,30" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
                  <polygon points="0,15 25,30 25,48 0,33" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                  <polygon points="50,15 25,30 25,48 50,33" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                  <text x="-12" y="60" fill="#e2e8f0" fontSize="10" fontWeight="bold">Valley Elementary (School)</text>
                </g>

                {/* Shelter A (Sector B1) */}
                <g transform="translate(470, 130)">
                  <rect x="0" y="0" width="36" height="26" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" rx="3" />
                  <text x="-10" y="38" fill="#fbbf24" fontSize="9" fontWeight="bold">Shelter A (72%)</text>
                </g>

                {/* Shelter C (Sector B3 Reserve) */}
                <g transform="translate(480, 480)">
                  <rect x="0" y="0" width="36" height="26" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" rx="3" />
                  <text x="-15" y="38" fill="#34d399" fontSize="9" fontWeight="bold">Shelter C (Reserve)</text>
                </g>

                {/* Hospital (St. Jude Central) */}
                <g transform="translate(490, 80)">
                  <rect x="0" y="0" width="40" height="28" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" rx="3" />
                  <text x="-18" y="40" fill="#60a5fa" fontSize="9" fontWeight="bold">St. Jude Trauma (68%)</text>
                </g>
              </g>
            )}

            {/* RESOURCE VEHICLES ON MAP (Ambulances, Rescue Teams) (#19) */}
            {layers.resources && (
              <g>
                {/* Tactical Rescue Team 04 (Near School) */}
                <g transform="translate(615, 290)">
                  <circle cx="0" cy="0" r="14" fill="#1e3a5f" stroke="#00f0ff" strokeWidth="2" />
                  <text x="-7" y="4" fill="#00f0ff" fontSize="10" fontWeight="bold">T4</text>
                  <text x="18" y="4" fill="#7dd3fc" fontSize="9" fontWeight="bold">Rescue Team 04</text>
                </g>

                {/* Ambulance 01 en route */}
                <g transform="translate(540, 360)">
                  <circle cx="0" cy="0" r="12" fill="#881337" stroke="#f43f5e" strokeWidth="1.8" />
                  <text x="-8" y="3" fill="#ffffff" fontSize="9" fontWeight="bold">A1</text>
                  <text x="16" y="3" fill="#fda4af" fontSize="9" fontWeight="bold">Ambulance 01</text>
                </g>

                {/* Ambulance 02 at Staging */}
                <g transform="translate(260, 420)">
                  <circle cx="0" cy="0" r="11" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="-7" y="3" fill="#ffffff" fontSize="8" fontWeight="bold">A2</text>
                  <text x="14" y="3" fill="#6ee7b7" fontSize="8">Amb 02 (Standby)</text>
                </g>
              </g>
            )}

            {/* INCIDENT MARKERS (#21) */}
            {layers.incidents && (
              <g>
                {incidents.map((inc) => {
                  const cx = inc.coordinates.x * 10;
                  const cy = inc.coordinates.y * 6.5;
                  const isSelected = inc.id === selectedIncidentId;
                  const isCritical = inc.severity === 'Critical';

                  return (
                    <g
                      key={inc.id}
                      transform={`translate(${cx}, ${cy})`}
                      className="cursor-pointer group"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIncidentId(inc.id);
                        setActiveMarkerData(inc);
                      }}
                    >
                      {/* Pulse circle for critical */}
                      {isCritical && (
                        <circle
                          cx="0"
                          cy="0"
                          r={isSelected ? 26 : 20}
                          fill="#ef4444"
                          opacity="0.25"
                          className="animate-ping"
                        />
                      )}

                      {/* Main pin background */}
                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? 18 : 14}
                        fill={isCritical ? '#dc2626' : '#d97706'}
                        stroke="#ffffff"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        className="transition-all duration-200 shadow-xl"
                      />

                      {/* Hazard Icon abbreviation */}
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="900"
                        fontFamily="sans-serif"
                      >
                        {inc.type === 'Flood' ? '💧' : inc.type === 'Fire' ? '🔥' : '⚠️'}
                      </text>

                      {/* Label badge */}
                      <g transform="translate(0, -22)">
                        <rect
                          x="-42"
                          y="-10"
                          width="84"
                          height="18"
                          fill="#090e18"
                          stroke={isSelected ? '#00f0ff' : '#475569'}
                          strokeWidth="1.2"
                          rx="4"
                        />
                        <text
                          x="0"
                          y="2"
                          textAnchor="middle"
                          fill={isSelected ? '#00f0ff' : '#f1f5f9'}
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {inc.type.toUpperCase()} • {inc.sector.slice(-2)}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* FLOATING INCIDENT INSPECTION POPUP (#21) */}
      {(activeMarkerData || selectedIncident) && (
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-96 z-30 bg-slate-950/95 backdrop-blur-md border border-cyan-500/40 p-4 rounded-2xl shadow-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono font-bold text-xs text-red-400 uppercase tracking-wider">
                  {(activeMarkerData || selectedIncident).severity} • {(activeMarkerData || selectedIncident).id}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white tracking-tight">
                {(activeMarkerData || selectedIncident).sector}
              </h3>
            </div>

            <button
              onClick={() => setActiveMarkerData(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 font-medium line-clamp-2">
            {(activeMarkerData || selectedIncident).title}
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">People Affected</span>
              <span className="text-sm font-bold text-white font-mono">
                {(activeMarkerData || selectedIncident).peopleAffected}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Reports</span>
              <span className="text-sm font-bold text-cyan-300 font-mono">
                {(activeMarkerData || selectedIncident).reportsCount}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Road Access</span>
              <span className="text-xs font-bold text-amber-400 font-mono truncate block">
                {(activeMarkerData || selectedIncident).roadAccess}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
            <span>Shelter Load: <strong className="text-amber-400">{(activeMarkerData || selectedIncident).shelterLoad}%</strong></span>
            <span>Hospital: <strong className="text-cyan-400">{(activeMarkerData || selectedIncident).hospitalLoad}%</strong></span>
            <span>Responders: <strong className="text-white">6 units</strong></span>
          </div>

          <button
            id="btn-view-incident-workspace"
            onClick={() => {
              setSelectedIncidentId((activeMarkerData || selectedIncident).id);
              setCommandView('incidents');
            }}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-md shadow-cyan-950/60 transition-all"
          >
            <span>VIEW INCIDENT WORKSPACE</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Map Legend on Bottom Right */}
      <div className="absolute bottom-3 right-3 hidden lg:flex items-center gap-3 bg-slate-950/85 backdrop-blur-sm border border-slate-800 px-3 py-2 rounded-xl text-[11px] text-slate-300 pointer-events-none z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span>Critical</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Warning</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Evac Route</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span>Response Unit</span>
        </div>
      </div>
    </div>
  );
};
