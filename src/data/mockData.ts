import { Incident, CommunityReport, CollectiveSignal, EmergencyResource, SystemNotification } from '../types';

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-0241',
    title: 'Flash Flood & School Access Inundation',
    type: 'Flood',
    location: 'Sector B2 — North Valley Elementary & River Rd',
    sector: 'Sector B2',
    coordinates: { x: 58, y: 44 },
    severity: 'Critical',
    peopleAffected: 180,
    vulnerableCount: 24,
    status: 'Active',
    reportedAt: '10:42 AM',
    assignedResponder: 'Rescue Team 04',
    roadAccess: 'Restricted',
    shelterLoad: 72,
    hospitalLoad: 68,
    reportsCount: 23,
    description: 'Rapidly rising water entering school grounds and surrounding residential blocks. Multiple elderly citizens and schoolchildren sheltered on second floor. Primary ingress route on Road 2 blocked by 3ft water.',
    timeline: [
      { time: '10:42', label: 'Emergency received', description: 'Citizen voice signal and 4 concurrent reports logged.', completed: true },
      { time: '10:43', label: 'Location confirmed', description: 'Sector B2 geo-cluster verified via triangulation.', completed: true },
      { time: '10:44', label: 'Responder assigned', description: 'Rescue Team 04 dispatched with high-water tactical unit.', completed: true },
      { time: '10:46', label: 'Response underway', description: 'Team en route via alternate Road 3.', completed: true },
      { time: '10:55', label: 'Evacuation perimeter setup', description: 'Staging mobile boats at Sector B2 North bridge.', completed: false },
      { time: '11:15', label: 'Complete stabilization', description: 'Transfer vulnerable groups to Shelter C.', completed: false },
    ]
  },
  {
    id: 'INC-0238',
    title: 'Industrial Substation Electrical Fire',
    type: 'Fire',
    location: 'Sector A1 — Central Power Grid Depot',
    sector: 'Sector A1',
    coordinates: { x: 28, y: 32 },
    severity: 'High',
    peopleAffected: 45,
    vulnerableCount: 4,
    status: 'Responding',
    reportedAt: '10:15 AM',
    assignedResponder: 'Fire Engine 12',
    roadAccess: 'Normal',
    shelterLoad: 35,
    hospitalLoad: 42,
    reportsCount: 14,
    description: 'Transformer explosion resulting in contained chemical fire. Perimeter evacuated within 300m.',
    timeline: [
      { time: '10:15', label: 'Sensor alarm triggered', completed: true },
      { time: '10:18', label: 'Fire Engine 12 arrived on scene', completed: true },
      { time: '10:30', label: 'Secondary foam containment applied', completed: true },
    ]
  },
  {
    id: 'INC-0239',
    title: 'Multi-Vehicle Collision on Highway Bypass',
    type: 'Accident',
    location: 'Sector C4 — East Corridor Mile 14',
    sector: 'Sector C4',
    coordinates: { x: 76, y: 65 },
    severity: 'Moderate',
    peopleAffected: 12,
    vulnerableCount: 2,
    status: 'Responding',
    reportedAt: '10:28 AM',
    assignedResponder: 'Ambulance 02 & Highway Patrol',
    roadAccess: 'Restricted',
    shelterLoad: 15,
    hospitalLoad: 52,
    reportsCount: 8,
    description: 'Two passenger vehicles and light delivery truck obstructed eastbound lane. Paramedics assessing injuries.',
    timeline: [
      { time: '10:28', label: 'Reported via highway callbox', completed: true },
      { time: '10:33', label: 'Ambulance 02 on site', completed: true },
      { time: '10:45', label: 'Triage complete', completed: true },
    ]
  },
  {
    id: 'INC-0240',
    title: 'Commercial Wall Structural Failure',
    type: 'Building Damage',
    location: 'Sector D1 — Old Market District Warehouses',
    sector: 'Sector D1',
    coordinates: { x: 38, y: 78 },
    severity: 'Moderate',
    peopleAffected: 28,
    vulnerableCount: 0,
    status: 'Active',
    reportedAt: '10:35 AM',
    assignedResponder: 'Civil Defense Inspection Unit',
    roadAccess: 'Normal',
    shelterLoad: 40,
    hospitalLoad: 30,
    reportsCount: 6,
    description: 'Partial facade collapse onto pedestrian walkway following saturated ground conditions.',
    timeline: [
      { time: '10:35', label: 'Citizen photo report', completed: true },
      { time: '10:40', label: 'Area cordoned off', completed: true },
    ]
  },
  {
    id: 'INC-0242',
    title: 'Urgent Silent Medical Assistance Request',
    type: 'Medical',
    location: 'Sector B2 — 404 Elmcrest Apartments, Apt 3B',
    sector: 'Sector B2',
    coordinates: { x: 62, y: 48 },
    severity: 'Critical',
    peopleAffected: 2,
    vulnerableCount: 1,
    status: 'Active',
    reportedAt: '10:47 AM',
    assignedResponder: 'Ambulance 01',
    roadAccess: 'Restricted',
    shelterLoad: 72,
    hospitalLoad: 70,
    reportsCount: 2,
    description: 'Silent emergency alert received. High confidence distress signal with mobility constraint.',
    timeline: [
      { time: '10:47', label: 'Silent emergency beacon activated', completed: true },
      { time: '10:48', label: 'Medical dispatch routed via amphibious unit', completed: true },
    ]
  }
];

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'REP-101',
    timestamp: '10:43:21',
    source: 'Citizen',
    sector: 'Sector B2',
    content: 'Water is rapidly rising over the embankment and entering the school grounds!',
    hazard: 'Flood',
    verified: true,
    coordinates: { x: 57, y: 43 }
  },
  {
    id: 'REP-102',
    timestamp: '10:43:28',
    source: 'Citizen',
    sector: 'Sector B2',
    content: 'Road 2 is submerged under at least 2 feet of swift water. Vehicles cannot pass.',
    hazard: 'Flood',
    verified: true,
    coordinates: { x: 59, y: 45 }
  },
  {
    id: 'REP-103',
    timestamp: '10:43:35',
    source: 'Volunteer',
    sector: 'Sector B2',
    content: 'Ambulance cannot enter Road 2 entrance. Redirecting through elevated secondary bypass.',
    hazard: 'People Trapped',
    verified: true,
    coordinates: { x: 60, y: 42 }
  },
  {
    id: 'REP-104',
    timestamp: '10:44:10',
    source: 'VoxRescue',
    sector: 'Sector B2',
    content: 'Elderly residents in ground-floor nursing wing need immediate evacuation support.',
    hazard: 'Medical',
    verified: true,
    coordinates: { x: 58, y: 44 }
  },
  {
    id: 'REP-105',
    timestamp: '10:45:02',
    source: 'Citizen',
    sector: 'Sector B2',
    content: 'Power lines sparking near transformer pole by the flooded corner.',
    hazard: 'Electrical',
    verified: false,
    coordinates: { x: 56, y: 46 }
  },
  {
    id: 'REP-106',
    timestamp: '10:46:15',
    source: 'Sensor',
    sector: 'Sector B2',
    content: 'River gauge #B2-4 peaked at +1.8m above flood stage. Rate of rise 12cm/10min.',
    hazard: 'Flood',
    verified: true,
    coordinates: { x: 61, y: 41 }
  }
];

export const INITIAL_COLLECTIVE_SIGNALS: CollectiveSignal[] = [
  {
    id: 'COL-01',
    sector: 'Sector B2',
    title: 'Flood Surge + Access Disruption + Vulnerable Population',
    description: 'High convergence of 5 direct citizen & sensor reports indicating cascading school isolation and route cutoff.',
    reportCount: 5,
    hazards: ['Flood', 'People Trapped', 'Medical'],
    status: 'ACTIVE',
    detectedAt: '10:44 AM',
    signalStrength: 82,
    pattern: 'Flooding + Access Disruption'
  },
  {
    id: 'COL-02',
    sector: 'Sector A1',
    title: 'Industrial Hazmat Isolation Perimeter',
    description: '3 synchronized sensor spikes with power fluctuation reports.',
    reportCount: 3,
    hazards: ['Fire', 'Electrical'],
    status: 'INVESTIGATING',
    detectedAt: '10:22 AM',
    signalStrength: 64,
    pattern: 'Electrical Arc + Fire Hazard'
  }
];

export const INITIAL_RESOURCES: EmergencyResource[] = [
  {
    id: 'RES-AMB-01',
    name: 'Ambulance 01 (All-Terrain)',
    category: 'Ambulance',
    status: 'DISPATCHED',
    location: 'En route Sector B2',
    sector: 'Sector B2',
    capacity: 2,
    occupancy: 0,
    assignedIncidentId: 'INC-0242',
    etaMinutes: 6,
    contact: 'Ch. 3 (Rescue Net Alpha)'
  },
  {
    id: 'RES-AMB-02',
    name: 'Ambulance 02 (Standard EMS)',
    category: 'Ambulance',
    status: 'AVAILABLE',
    location: 'Staging Depot Sector A3',
    sector: 'Sector A3',
    capacity: 2,
    occupancy: 0,
    contact: 'Ch. 3 (Rescue Net Alpha)'
  },
  {
    id: 'RES-AMB-03',
    name: 'Ambulance 03 (Advanced Life Support)',
    category: 'Ambulance',
    status: 'AVAILABLE',
    location: 'Central Medical Base Sector B1',
    sector: 'Sector B1',
    capacity: 2,
    occupancy: 0,
    contact: 'Ch. 3'
  },
  {
    id: 'RES-AMB-04',
    name: 'Ambulance 04',
    category: 'Ambulance',
    status: 'DISPATCHED',
    location: 'Sector C4 Collision',
    sector: 'Sector C4',
    capacity: 2,
    assignedIncidentId: 'INC-0239',
    etaMinutes: 3,
    contact: 'Ch. 4'
  },
  {
    id: 'RES-TEAM-04',
    name: 'Tactical Rescue Team 04',
    category: 'Rescue Team',
    status: 'ON_SCENE',
    location: 'Sector B2 School Perimeter',
    sector: 'Sector B2',
    capacity: 8,
    occupancy: 0,
    assignedIncidentId: 'INC-0241',
    etaMinutes: 0,
    contact: 'Rescue Lead Larson (Ext 404)'
  },
  {
    id: 'RES-TEAM-02',
    name: 'Amphibious Swiftwater Unit 02',
    category: 'Rescue Team',
    status: 'AVAILABLE',
    location: 'North Dock Staging Station',
    sector: 'Sector B1',
    capacity: 12,
    contact: 'Swiftwater Dispatch'
  },
  {
    id: 'RES-TEAM-05',
    name: 'Heavy Urban Search & Rescue 05',
    category: 'Rescue Team',
    status: 'AVAILABLE',
    location: 'Sector C1 Base',
    sector: 'Sector C1',
    capacity: 15,
    contact: 'USAR Cmd'
  },
  {
    id: 'RES-VOL-01',
    name: 'Community Volunteers — Sector B Response Corps',
    category: 'Volunteer',
    status: 'AVAILABLE',
    location: 'Civic Community Hall B2',
    sector: 'Sector B2',
    capacity: 21,
    occupancy: 14,
    contact: 'Volunteer Coordinator Sarah'
  },
  {
    id: 'RES-SHEL-A',
    name: 'Shelter A — North Community Center',
    category: 'Shelter',
    status: 'AT_CAPACITY',
    location: 'Sector B1 High Ground',
    sector: 'Sector B1',
    capacity: 250,
    occupancy: 180, // 72%
    contact: 'Supervisor Vance'
  },
  {
    id: 'RES-SHEL-B',
    name: 'Shelter B — East High Gymnasium',
    category: 'Shelter',
    status: 'AVAILABLE',
    location: 'Sector C2 Hilltop',
    sector: 'Sector C2',
    capacity: 350,
    occupancy: 110, // 31%
    contact: 'Supervisor Chang'
  },
  {
    id: 'RES-SHEL-C',
    name: 'Shelter C — Valley West Pavilion',
    category: 'Shelter',
    status: 'AVAILABLE',
    location: 'Sector B3 Ridge',
    sector: 'Sector B3',
    capacity: 300,
    occupancy: 25, // 8% - standby reserve
    contact: 'Coordinator Miller'
  },
  {
    id: 'RES-HOSP-01',
    name: 'St. Jude Regional Trauma Center',
    category: 'Hospital',
    status: 'AVAILABLE',
    location: 'Sector B1 Central Medical',
    sector: 'Sector B1',
    capacity: 120,
    occupancy: 82, // 68%
    contact: 'ER Dispatch Line'
  },
  {
    id: 'RES-HOSP-02',
    name: 'Valley General Memorial Hospital',
    category: 'Hospital',
    status: 'AVAILABLE',
    location: 'Sector C3 East',
    sector: 'Sector C3',
    capacity: 90,
    occupancy: 48, // 53%
    contact: 'Triage Desk'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'NOTIF-01',
    type: 'CRITICAL',
    title: 'Collective Crisis Detected',
    message: 'Sector B2: 5 convergent reports indicate rising flood cutting off school access.',
    time: '10:44 AM',
    read: false,
    incidentId: 'INC-0241'
  },
  {
    id: 'NOTIF-02',
    type: 'WARNING',
    title: 'Shelter Capacity Threshold Alert',
    message: 'Shelter A has reached 72% capacity. Recommend pre-activating Shelter C.',
    time: '10:43 AM',
    read: false
  },
  {
    id: 'NOTIF-03',
    type: 'INFO',
    title: 'Resource Deployment Confirmed',
    message: 'Rescue Team 04 has established tactical staging at Sector B2 North.',
    time: '10:46 AM',
    read: true,
    incidentId: 'INC-0241'
  },
  {
    id: 'NOTIF-04',
    type: 'SYSTEM',
    title: 'Digital Twin Synchronized',
    message: 'Hydrological sensor feeds updated. Elevation contours aligned.',
    time: '10:40 AM',
    read: true
  }
];

export const MAP_SECTORS = [
  { id: 'Sector A1', name: 'Sector A1 — Industrial Depot', x: 25, y: 30, risk: 'Moderate', alerts: 1 },
  { id: 'Sector A2', name: 'Sector A2 — Northern Heights', x: 25, y: 65, risk: 'Low', alerts: 0 },
  { id: 'Sector B1', name: 'Sector B1 — Medical & Civic', x: 50, y: 25, risk: 'Low', alerts: 0 },
  { id: 'Sector B2', name: 'Sector B2 — River Valley & Schools', x: 58, y: 46, risk: 'Critical', alerts: 2 },
  { id: 'Sector B3', name: 'Sector B3 — West Ridge Reserve', x: 50, y: 75, risk: 'Low', alerts: 0 },
  { id: 'Sector C1', name: 'Sector C1 — Commercial Plaza', x: 75, y: 25, risk: 'Low', alerts: 0 },
  { id: 'Sector C2', name: 'Sector C2 — East Ridge Shelter', x: 80, y: 45, risk: 'Low', alerts: 0 },
  { id: 'Sector C4', name: 'Sector C4 — East Transit Corridor', x: 78, y: 68, risk: 'Moderate', alerts: 1 },
  { id: 'Sector D1', name: 'Sector D1 — Old Market District', x: 38, y: 80, risk: 'Moderate', alerts: 1 },
];
