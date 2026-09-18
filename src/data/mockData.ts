import { 
  Incident, 
  CommunityReport, 
  CollectiveSignal, 
  EmergencyResource, 
  SystemNotification,
  LocationAlert,
  VolunteerRequirement,
  VolunteerMember,
  CommunityMessage,
  SafetyCheckIn
} from '../types';
import { SAMPLE_DISASTER_IMAGES } from './sampleDisasterImages';

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-0241',
    title: 'Velachery Lake Overflow & Ram Nagar Inundation',
    type: 'Flood',
    location: 'Zone 13 — Velachery 100 Feet Bypass & Ram Nagar',
    sector: 'Zone 13 - Velachery',
    coordinates: { x: 58, y: 44 },
    severity: 'Critical',
    peopleAffected: 180,
    vulnerableCount: 24,
    status: 'Active',
    reportedAt: '10:42 AM',
    assignedResponder: 'NDRF & TNFRS Rescue Unit 04',
    roadAccess: 'Restricted',
    shelterLoad: 72,
    hospitalLoad: 68,
    reportsCount: 23,
    description: 'Rapidly rising water from Velachery Lake overflow and Adyar canal backflow inundating Ram Nagar and AGS Colony residential blocks. Multiple senior citizens sheltered on first floor. Primary ingress via 100 Feet Bypass submerged by 3ft water.',
    timeline: [
      { time: '10:42', label: 'Emergency call logged via 112 / 1913', description: 'Citizen voice signal and 4 concurrent reports logged into Chennai ERSS.', completed: true },
      { time: '10:43', label: 'Location confirmed', description: 'Zone 13 Velachery geo-cluster verified via Greater Chennai Corporation GIS.', completed: true },
      { time: '10:44', label: 'Responder dispatched', description: 'NDRF 04 Battalion & TNFRS Guindy deployed with high-clearance inflatable boats.', completed: true },
      { time: '10:46', label: 'Response underway', description: 'Teams en route via elevated Vijaya Nagar Flyover & Velachery Main Road.', completed: true },
      { time: '10:55', label: 'Evacuation staging setup', description: 'Staging rescue dinghies at Velachery MRTS Station entrance.', completed: false },
      { time: '11:15', label: 'Shelter stabilization', description: 'Transfer vulnerable residents to Guru Nanak College Relief Camp.', completed: false },
    ]
  },
  {
    id: 'INC-0238',
    title: 'Manali Industrial Substation Transformer Fire',
    type: 'Fire',
    location: 'Zone 5 — North Chennai Power Depot, Ennore Express Rd',
    sector: 'Zone 5 - Royapuram',
    coordinates: { x: 28, y: 32 },
    severity: 'High',
    peopleAffected: 45,
    vulnerableCount: 4,
    status: 'Responding',
    reportedAt: '10:15 AM',
    assignedResponder: 'TNFRS Industrial Fire Engine 12',
    roadAccess: 'Normal',
    shelterLoad: 35,
    hospitalLoad: 42,
    reportsCount: 14,
    description: 'TANGEDCO 230kV substation transformer explosion resulting in contained chemical fire. 300m safety cordon enforced along Ennore Expressway.',
    timeline: [
      { time: '10:15', label: 'Sensor alarm triggered', completed: true },
      { time: '10:18', label: 'TNFRS Engine 12 arrived on scene', completed: true },
      { time: '10:30', label: 'Specialized chemical foam barrier applied', completed: true },
    ]
  },
  {
    id: 'INC-0239',
    title: 'Multi-Vehicle Pileup on OMR Express Corridor',
    type: 'Accident',
    location: 'Zone 14 — OMR Toll Plaza & Sholinganallur Junction',
    sector: 'Zone 14 - OMR',
    coordinates: { x: 76, y: 65 },
    severity: 'Moderate',
    peopleAffected: 12,
    vulnerableCount: 2,
    status: 'Responding',
    reportedAt: '10:28 AM',
    assignedResponder: '108 Ambulance Unit 04 & Chennai Traffic Police',
    roadAccess: 'Restricted',
    shelterLoad: 15,
    hospitalLoad: 52,
    reportsCount: 8,
    description: 'Two cars and delivery van collided under heavy monsoon rain near Sholinganallur junction. 108 paramedics providing on-scene trauma stabilization.',
    timeline: [
      { time: '10:28', label: 'Reported via 112 ERSS highway alert', completed: true },
      { time: '10:33', label: '108 Ambulance on site', completed: true },
      { time: '10:45', label: 'Patient triage completed, transferred to Omandurar Hospital', completed: true },
    ]
  },
  {
    id: 'INC-0240',
    title: 'Heritage Building Facade Damage in George Town',
    type: 'Building Damage',
    location: 'Zone 9 — NSC Bose Road, Near Parry’s Corner, George Town',
    sector: 'Zone 9 - T. Nagar',
    coordinates: { x: 38, y: 78 },
    severity: 'Moderate',
    peopleAffected: 28,
    vulnerableCount: 0,
    status: 'Active',
    reportedAt: '10:35 AM',
    assignedResponder: 'GCC Civil Defense Inspection Unit',
    roadAccess: 'Normal',
    shelterLoad: 40,
    hospitalLoad: 30,
    reportsCount: 6,
    description: 'Partial brick facade collapse onto pedestrian walkway following 48 hours of continuous rain. GCC cordoned zone.',
    timeline: [
      { time: '10:35', label: 'Citizen photo report received via GCC 1913 App', completed: true },
      { time: '10:40', label: 'NSC Bose road walkway cordoned with barricades', completed: true },
    ]
  },
  {
    id: 'INC-0242',
    title: 'Urgent Silent Medical Beacon — AGS Colony, Velachery',
    type: 'Medical',
    location: 'Zone 13 — 24 AGS Colony 4th Main Rd, Velachery',
    sector: 'Zone 13 - Velachery',
    coordinates: { x: 62, y: 48 },
    severity: 'Critical',
    peopleAffected: 2,
    vulnerableCount: 1,
    status: 'Active',
    reportedAt: '10:47 AM',
    assignedResponder: '108 ALS Ambulance Unit 01',
    roadAccess: 'Restricted',
    shelterLoad: 72,
    hospitalLoad: 70,
    reportsCount: 2,
    description: 'Silent distress beacon triggered by bedridden senior citizen with oxygen concentrator failure amid localized water cutoff.',
    timeline: [
      { time: '10:47', label: 'Silent emergency beacon received at GCC Command', completed: true },
      { time: '10:48', label: '108 ALS Unit paired with SDRF high-water rescue team', completed: true },
    ]
  }
];

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'REP-101',
    timestamp: '10:43:21',
    source: 'Citizen',
    sector: 'Zone 13 - Velachery',
    content: 'Velachery Lake water breached the southern bund and is rushing toward Ram Nagar 2nd Street!',
    hazard: 'Flood',
    verified: true,
    coordinates: { x: 57, y: 43 }
  },
  {
    id: 'REP-102',
    timestamp: '10:43:28',
    source: 'Citizen',
    sector: 'Zone 13 - Velachery',
    content: 'Velachery 100 Feet Road near MRTS station submerged under 2.5 feet water. Two-wheelers and autos stalled.',
    hazard: 'Flood',
    verified: true,
    coordinates: { x: 59, y: 45 }
  },
  {
    id: 'REP-103',
    timestamp: '10:43:35',
    source: 'Volunteer',
    sector: 'Zone 13 - Velachery',
    content: '108 Ambulance cannot enter Ram Nagar main arch. Redirecting through elevated Vijaya Nagar Flyover.',
    hazard: 'People Trapped',
    verified: true,
    coordinates: { x: 60, y: 42 }
  },
  {
    id: 'REP-104',
    timestamp: '10:44:10',
    source: 'VoxRescue',
    sector: 'Zone 13 - Velachery',
    content: 'Elderly citizens in ground-floor apartment in AGS Colony need immediate boat evacuation assistance.',
    hazard: 'Medical',
    verified: true,
    coordinates: { x: 58, y: 44 }
  },
  {
    id: 'REP-105',
    timestamp: '10:45:02',
    source: 'Citizen',
    sector: 'Zone 13 - Velachery',
    content: 'TANGEDCO power pillar sparking near Ram Nagar corner. High electrocution risk!',
    hazard: 'Electrical',
    verified: false,
    coordinates: { x: 56, y: 46 }
  },
  {
    id: 'REP-106',
    timestamp: '10:46:15',
    source: 'Sensor',
    sector: 'Zone 13 - Velachery',
    content: 'Adyar River gauge at Saidapet Maraimalai Adigal Bridge recorded +2.1m above warning level.',
    hazard: 'Flood',
    verified: true,
    coordinates: { x: 61, y: 41 }
  }
];

export const INITIAL_COLLECTIVE_SIGNALS: CollectiveSignal[] = [
  {
    id: 'COL-01',
    sector: 'Zone 13 - Velachery',
    title: 'Adyar Basin Overflow + Road Inundation + Stranded Residents',
    description: 'High convergence of 6 citizen, volunteer and GCC flood sensor reports indicating rapid Ram Nagar waterlogging and route cutoff.',
    reportCount: 6,
    hazards: ['Flood', 'People Trapped', 'Medical'],
    status: 'ACTIVE',
    detectedAt: '10:44 AM',
    signalStrength: 86,
    pattern: 'Flooding + Access Disruption'
  },
  {
    id: 'COL-02',
    sector: 'Zone 5 - Royapuram',
    title: 'North Chennai Industrial Hazmat Arc Isolation',
    description: '3 synchronized sensor spikes with power grid fluctuation reported near Manali depot.',
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
    name: '108 Ambulance Unit 01 (High-Clearance ALS)',
    category: 'Ambulance',
    status: 'DISPATCHED',
    location: 'En route Velachery Ram Nagar',
    sector: 'Zone 13 - Velachery',
    capacity: 2,
    occupancy: 0,
    assignedIncidentId: 'INC-0242',
    etaMinutes: 6,
    contact: 'Call 108 / Wireless Ch. 3'
  },
  {
    id: 'RES-AMB-02',
    name: '108 Ambulance Unit 02 (Saidapet Depot)',
    category: 'Ambulance',
    status: 'AVAILABLE',
    location: 'Saidapet EMS Hub, Zone 10',
    sector: 'Zone 10 - Central',
    capacity: 2,
    occupancy: 0,
    contact: 'Call 108 (Tamil Nadu ERSS)'
  },
  {
    id: 'RES-AMB-03',
    name: '108 Advanced Cardiac Life Support (RGGGH Base)',
    category: 'Ambulance',
    status: 'AVAILABLE',
    location: 'Rajiv Gandhi Govt General Hospital (Chennai Central)',
    sector: 'Zone 10 - Central',
    capacity: 2,
    occupancy: 0,
    contact: 'Call 108 / RGGGH Triage'
  },
  {
    id: 'RES-AMB-04',
    name: '108 Ambulance 04 (OMR Sholinganallur)',
    category: 'Ambulance',
    status: 'DISPATCHED',
    location: 'OMR Sholinganallur Junction',
    sector: 'Zone 14 - OMR',
    capacity: 2,
    assignedIncidentId: 'INC-0239',
    etaMinutes: 3,
    contact: 'Call 108'
  },
  {
    id: 'RES-TEAM-04',
    name: 'NDRF 04 Battalion & SDRF High-Water Rescue Team',
    category: 'Rescue Team',
    status: 'ON_SCENE',
    location: 'Velachery MRTS & 100ft Rd Base',
    sector: 'Zone 13 - Velachery',
    capacity: 10,
    occupancy: 0,
    assignedIncidentId: 'INC-0241',
    etaMinutes: 0,
    contact: 'Inspector R. Kumar (NDRF Arakkonam Unit)'
  },
  {
    id: 'RES-TEAM-02',
    name: 'TNFRS Inflatable Swiftwater Boat Unit 02',
    category: 'Rescue Team',
    status: 'AVAILABLE',
    location: 'Guindy Fire & Rescue Station',
    sector: 'Zone 10 - Central',
    capacity: 12,
    contact: 'TNFRS Station Officer (101 / 112)'
  },
  {
    id: 'RES-TEAM-05',
    name: 'GCC Rapid Action Civil Defense Unit 05',
    category: 'Rescue Team',
    status: 'AVAILABLE',
    location: 'Ripon Building Central Command Base',
    sector: 'Zone 8 - Anna Nagar',
    capacity: 15,
    contact: 'GCC Control Room: 1913'
  },
  {
    id: 'RES-VOL-01',
    name: 'Chennai Cares & Red Cross Volunteer Force',
    category: 'Volunteer',
    status: 'AVAILABLE',
    location: 'Guru Nanak College Auditorium Base, Velachery',
    sector: 'Zone 13 - Velachery',
    capacity: 25,
    occupancy: 16,
    contact: 'Coord. Senthil Nathan (GCC Ward 177)'
  },
  {
    id: 'RES-SHEL-A',
    name: 'GCC Community Hall Relief Camp — Velachery Gandhi Rd',
    category: 'Shelter',
    status: 'AT_CAPACITY',
    location: 'Gandhi Road High Ground, Velachery',
    sector: 'Zone 13 - Velachery',
    capacity: 300,
    occupancy: 220, // 73%
    contact: 'GCC Zonal Officer (Ward 177)'
  },
  {
    id: 'RES-SHEL-B',
    name: 'Guru Nanak College Indoor Stadium Relief Centre',
    category: 'Shelter',
    status: 'AVAILABLE',
    location: 'Guru Nanak College Campus, Velachery',
    sector: 'Zone 13 - Velachery',
    capacity: 500,
    occupancy: 165, // 33%
    contact: 'Camp Lead Prof. Swaminathan'
  },
  {
    id: 'RES-SHEL-C',
    name: 'Chennai Girls Higher Secondary School Camp (Saidapet)',
    category: 'Shelter',
    status: 'AVAILABLE',
    location: 'Anna Salai, Saidapet High Ground',
    sector: 'Zone 10 - Central',
    capacity: 400,
    occupancy: 45, // 11% - standby reserve
    contact: 'Camp Officer S. Murugan'
  },
  {
    id: 'RES-HOSP-01',
    name: 'Rajiv Gandhi Govt General Hospital (RGGGH Central Trauma)',
    category: 'Hospital',
    status: 'AVAILABLE',
    location: 'EVR Periyar Salai, Chennai Central',
    sector: 'Zone 10 - Central',
    capacity: 250,
    occupancy: 172, // 68%
    contact: 'RGGGH Casualty: 044-25305000 / 108'
  },
  {
    id: 'RES-HOSP-02',
    name: 'Govt Multi Super Speciality Hospital (Omandurar Estate)',
    category: 'Hospital',
    status: 'AVAILABLE',
    location: 'Omandurar Government Estate, Anna Salai',
    sector: 'Zone 10 - Central',
    capacity: 160,
    occupancy: 86, // 53%
    contact: 'Omandurar Trauma: 044-25666000 / 108'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'NOTIF-01',
    type: 'CRITICAL',
    title: 'Adyar River & Velachery Lake Surge',
    message: 'Zone 13 - Velachery: 6 convergent reports indicate water inundating Ram Nagar and Velachery 100ft road.',
    time: '10:44 AM',
    read: false,
    incidentId: 'INC-0241'
  },
  {
    id: 'NOTIF-02',
    type: 'WARNING',
    title: 'Shelter Capacity Advisory',
    message: 'Velachery Gandhi Road GCC Hall reached 73% capacity. Redirecting new evacuees to Guru Nanak College Indoor Stadium.',
    time: '10:43 AM',
    read: false
  },
  {
    id: 'NOTIF-03',
    type: 'INFO',
    title: 'NDRF Rescue Boat Deployment',
    message: 'NDRF 04 Battalion & TNFRS unit established staging at Velachery MRTS station.',
    time: '10:46 AM',
    read: true,
    incidentId: 'INC-0241'
  },
  {
    id: 'NOTIF-04',
    type: 'SYSTEM',
    title: 'GCC Integrated Command & Control Center (ICCC) Synced',
    message: 'Chennai Corporation smart water level telemetry and flood sensor network synchronized.',
    time: '10:40 AM',
    read: true
  }
];

export const MAP_SECTORS = [
  { id: 'Zone 13 - Velachery', name: 'Zone 13 — Velachery & Adyar Basin', x: 58, y: 46, risk: 'Critical', alerts: 2 },
  { id: 'Zone 5 - Royapuram', name: 'Zone 5 — Royapuram & Chennai Port', x: 25, y: 30, risk: 'Moderate', alerts: 1 },
  { id: 'Zone 9 - T. Nagar', name: 'Zone 9 — T. Nagar & Mambalam', x: 38, y: 80, risk: 'Moderate', alerts: 1 },
  { id: 'Zone 14 - OMR', name: 'Zone 14 — OMR & Sholinganallur Corridor', x: 78, y: 68, risk: 'Moderate', alerts: 1 },
  { id: 'Zone 10 - Central', name: 'Zone 10 — Egmore & Chennai Central (RGGGH)', x: 50, y: 25, risk: 'Low', alerts: 0 },
  { id: 'Zone 8 - Anna Nagar', name: 'Zone 8 — Anna Nagar & Koyambedu', x: 25, y: 65, risk: 'Low', alerts: 0 },
  { id: 'Zone 12 - Tambaram', name: 'Zone 12 — Tambaram & Mudichur Basin', x: 50, y: 75, risk: 'Low', alerts: 0 },
  { id: 'Zone 13 - Adyar', name: 'Zone 13 — Adyar & Kotturpuram', x: 75, y: 25, risk: 'Low', alerts: 0 },
  { id: 'Zone 4 - Ennore', name: 'Zone 4 — Ennore & Manali Coastal', x: 80, y: 45, risk: 'Low', alerts: 0 },
];

export const INITIAL_LOCATION_ALERTS: LocationAlert[] = [
  {
    id: 'ALERT-GEO-01',
    sector: 'Zone 13 - Velachery',
    title: 'Greater Chennai Corporation Immediate Flood Advisory — Velachery Lake Basin',
    hazard: 'Flood',
    urgency: 'EVACUATION',
    radiusKm: 3.5,
    affectedPopulation: 24500,
    status: 'ACTIVE',
    issuedAt: '10:45 AM',
    safeRoute: 'Use Vijaya Nagar Elevated Flyover toward Guindy / GST Road. AVOID Velachery 100 Feet Road & Ram Nagar Subway (submerged 3ft).',
    evacuationShelter: 'Guru Nanak College Indoor Stadium Camp (Capacity: 335 beds available)',
    shelterCapacityRemaining: 335,
    deliveryChannels: ['CELL_BROADCAST', 'MOBILE_APP', 'DIGITAL_SIREN', 'SMS_GEOFENCE'],
    deliveryReach: 99,
    instructions: [
      'Move immediately to first-floor elevation or high ground if trapped by localized lake water.',
      'Switch off main electrical breaker if water enters compound to prevent TANGEDCO arcing.',
      'Keep mobile phones, identity cards (Aadhaar), and emergency medications sealed in plastic bags.',
      'NDRF inflatable boats and TNFRS swiftwater units are patrolling Ram Nagar & AGS Colony.'
    ]
  },
  {
    id: 'ALERT-GEO-02',
    sector: 'Zone 5 - Royapuram',
    title: 'TANGEDCO Substation Smoke & Electrical Arc Advisory',
    hazard: 'Electrical',
    urgency: 'WARNING',
    radiusKm: 1.8,
    affectedPopulation: 4200,
    status: 'ACTIVE',
    issuedAt: '10:20 AM',
    safeRoute: 'Northbound traffic detour via Manali New Town Expressway towards Madhavaram.',
    evacuationShelter: 'Royapuram Government Higher Secondary School Camp',
    shelterCapacityRemaining: 110,
    deliveryChannels: ['CELL_BROADCAST', 'MOBILE_APP', 'SMS_GEOFENCE'],
    deliveryReach: 94,
    instructions: [
      'Remain indoors and close windows against dense transformer smoke.',
      'Treat all downed electrical wires and water puddles near power poles as lethal.',
      'Emergency fire tenders actively operating on Ennore Expressway.'
    ]
  },
  {
    id: 'ALERT-GEO-03',
    sector: 'Zone 14 - OMR',
    title: 'OMR Express Corridor Waterlogging & Pileup Advisory',
    hazard: 'Accident',
    urgency: 'ADVISORY',
    radiusKm: 2.5,
    affectedPopulation: 8500,
    status: 'ACTIVE',
    issuedAt: '10:30 AM',
    safeRoute: 'Use East Coast Road (ECR) via Akkarai as alternate high-ground corridor.',
    evacuationShelter: 'Sholinganallur Community Hall Relief Camp',
    shelterCapacityRemaining: 210,
    deliveryChannels: ['MOBILE_APP', 'SMS_GEOFENCE'],
    deliveryReach: 92,
    instructions: [
      'Expect severe delays near Sholinganallur junction; maintain clear lane for 108 ambulances.',
      'Do not attempt crossing waterlogged medians.'
    ]
  }
];

export const INITIAL_VOLUNTEER_REQUIREMENTS: VolunteerRequirement[] = [
  {
    id: 'REQ-VOL-01',
    title: 'Velachery Lake Embankment Sandbagging & Water Deflection',
    sector: 'Zone 13 - Velachery',
    urgency: 'Immediate',
    skillsRequired: ['Physical Labor', 'Sandbagging', 'Logistics Support'],
    neededCount: 25,
    assignedCount: 18,
    status: 'IN_PROGRESS',
    leadContact: 'Coord. Senthil Nathan (GCC Ward 177 / +91 98401 23456)',
    locationDetails: 'Velachery Lake Bund Staging Area, near Ram Nagar Entrance',
    description: 'Stacking sandbags to deflect overflowing floodwaters threatening residential homes along Ram Nagar and AGS Colony.',
    postedAt: '10:35 AM'
  },
  {
    id: 'REQ-VOL-02',
    title: 'Guru Nanak College Relief Camp Medical & Triage Assisting',
    sector: 'Zone 13 - Velachery',
    urgency: 'High',
    skillsRequired: ['First-Aid / CPR', 'Nursing / EMT', 'Patient Check-In'],
    neededCount: 10,
    assignedCount: 7,
    status: 'IN_PROGRESS',
    leadContact: 'Dr. K. Swaminathan (108 EMS Medical Volunteer)',
    locationDetails: 'Guru Nanak College Indoor Stadium Clinic Desk',
    description: 'Assisting 108 paramedics and GCC doctors with intake triage, vitals screening, and distributing BP/diabetes medications to displaced seniors.',
    postedAt: '10:40 AM'
  },
  {
    id: 'REQ-VOL-03',
    title: 'Chennai Cares Food Packet & Potable Water Distribution Squad',
    sector: 'Zone 13 - Velachery',
    urgency: 'Medium',
    skillsRequired: ['Food Service', 'Inventory', 'General Help'],
    neededCount: 15,
    assignedCount: 10,
    status: 'OPEN',
    leadContact: 'Coordinator Priya Natarajan (+91 94440 88990)',
    locationDetails: 'Velachery MRTS Station Ground Floor Distribution Point',
    description: 'Packaging warm sambar rice packs, bread, biscuits, and 20L water cans for rescue boat distribution in waterlogged interior streets.',
    postedAt: '10:42 AM'
  },
  {
    id: 'REQ-VOL-04',
    title: 'Elderly & Differently-Abled Boat Escort Team',
    sector: 'Zone 13 - Velachery',
    urgency: 'Immediate',
    skillsRequired: ['Mobility Care', '4x4 / Boat Assistance', 'Tamil / English Support'],
    neededCount: 12,
    assignedCount: 6,
    status: 'OPEN',
    leadContact: 'Inspector R. Kumar (NDRF Liaison / 112 Dispatch)',
    locationDetails: 'AGS Colony 3rd Cross Street & Ram Nagar High Gate',
    description: 'Assisting rescue boats safely transfer bedridden seniors, infants, and people with disabilities from flooded porches to dry shelters.',
    postedAt: '10:48 AM'
  },
  {
    id: 'REQ-VOL-05',
    title: 'Amateur Radio & VHF Emergency Relay (Chennai Amateur Radio Society)',
    sector: 'Zone 8 - Anna Nagar',
    urgency: 'High',
    skillsRequired: ['Ham Radio / Comms', 'Technical Setup'],
    neededCount: 5,
    assignedCount: 4,
    status: 'IN_PROGRESS',
    leadContact: 'Radio Operator Balaji (VU2RES / CARS)',
    locationDetails: 'Ripon Building Central Disaster Control Relay Post',
    description: 'Maintaining backup VHF/UHF radio mesh between isolated Velachery flood relief posts and Greater Chennai Corporation central command.',
    postedAt: '10:25 AM'
  }
];

export const INITIAL_VOLUNTEER_MEMBERS: VolunteerMember[] = [
  {
    id: 'VOL-101',
    name: 'K. Karthik',
    skills: ['First-Aid / CPR', 'Swiftwater Inflatable Boat Navigation'],
    status: 'ASSIGNED',
    sector: 'Zone 13 - Velachery',
    contact: '+91 98401 23456',
    assignedRequirementId: 'REQ-VOL-01',
    checkInTime: '10:38 AM',
    badges: ['Certified Rescuer', 'GCC Volunteer Corps']
  },
  {
    id: 'VOL-102',
    name: 'Dr. Ananya Sundaram',
    skills: ['Nursing / EMT', 'First-Aid / CPR', 'Tamil / English'],
    status: 'ASSIGNED',
    sector: 'Zone 13 - Velachery',
    contact: '+91 94440 34567',
    assignedRequirementId: 'REQ-VOL-02',
    checkInTime: '10:42 AM',
    badges: ['Medical Lead', 'Red Cross Tamil Nadu']
  },
  {
    id: 'VOL-103',
    name: 'V. Murugan',
    skills: ['4x4 Offroad Driver', 'Physical Labor', 'Sandbagging'],
    status: 'ON_SCENE',
    sector: 'Zone 13 - Velachery',
    contact: '+91 98412 45678',
    assignedRequirementId: 'REQ-VOL-01',
    checkInTime: '10:40 AM',
    badges: ['Heavy Tractor Driver']
  },
  {
    id: 'VOL-104',
    name: 'Fatima Begum',
    skills: ['Logistics Support', 'Food Service', 'Community Outreach'],
    status: 'READY',
    sector: 'Zone 13 - Velachery',
    contact: '+91 99403 56789',
    badges: ['GCC Relief Camp Volunteer']
  },
  {
    id: 'VOL-105',
    name: 'T. Balasubramanian',
    skills: ['Ham Radio / Comms', 'VHF / UHF Emergency Setup'],
    status: 'ASSIGNED',
    sector: 'Zone 8 - Anna Nagar',
    contact: '+91 94445 67890',
    assignedRequirementId: 'REQ-VOL-05',
    checkInTime: '10:30 AM',
    badges: ['Licensed Amateur Radio Operator VU2']
  },
  {
    id: 'VOL-106',
    name: 'R. Divya',
    skills: ['Mobility Care', 'First-Aid / CPR'],
    status: 'READY',
    sector: 'Zone 13 - Velachery',
    contact: '+91 98844 78901',
    badges: ['Youth Red Cross Chennai']
  }
];

export const INITIAL_COMMUNITY_MESSAGES: CommunityMessage[] = [
  {
    id: 'MSG-01',
    incidentId: 'INC-0241',
    sector: 'Zone 13 - Velachery',
    senderType: 'Citizen',
    senderName: 'S. Meenakshi (Ram Nagar Resident)',
    text: 'Floodwater has now entered our ground-floor verandah on Ram Nagar 3rd Main. We have 2 senior citizens on the 1st floor.',
    imageUrl: SAMPLE_DISASTER_IMAGES[0].dataUrl,
    timestamp: '10:43 AM',
    status: 'Read',
    isUrgent: true
  },
  {
    id: 'MSG-02',
    incidentId: 'INC-0241',
    sector: 'Zone 13 - Velachery',
    senderType: 'Dispatcher',
    senderName: 'GCC Disaster Control (1913 / 112 Dispatch)',
    text: 'NDRF & TNFRS Inflatable Rescue Team 04 has your GPS coordinates. Inflatable boat entering Ram Nagar via Velachery Bypass. Stay safe on the upper floor.',
    timestamp: '10:45 AM',
    status: 'Delivered'
  },
  {
    id: 'MSG-03',
    incidentId: 'INC-0241',
    sector: 'Zone 13 - Velachery',
    senderType: 'Responder',
    senderName: 'Sub-Inspector M. Selvam (NDRF / TNFRS Unit 04)',
    text: 'Entering Ram Nagar 3rd Main junction now with rescue dinghy. Please wave a bright cloth or phone torchlight from the balcony.',
    timestamp: '10:48 AM',
    status: 'Sent'
  },
  {
    id: 'MSG-04',
    sector: 'Zone 13 - Velachery',
    senderType: 'Dispatcher',
    senderName: 'GCC Emergency Broadcast (1913)',
    text: 'COMMUNITY ADVISORY: TANGEDCO is isolating the power feeder in Velachery Ram Nagar & AGS Colony to prevent electrocution. Disconnect ground-level appliances.',
    timestamp: '10:49 AM',
    status: 'Delivered'
  },
  {
    id: 'MSG-05',
    sector: 'Zone 13 - Velachery',
    senderType: 'Citizen',
    senderName: 'K. Vignesh',
    text: 'Neighbors have gathered at Guru Nanak College shelter entrance. Relief workers provided warm food packets and dry blankets.',
    timestamp: '10:50 AM',
    status: 'Read'
  }
];

export const INITIAL_SAFETY_CHECKINS: SafetyCheckIn[] = [
  {
    id: 'CHK-01',
    citizenName: 'The Sundaram Family',
    sector: 'Zone 13 - Velachery',
    status: 'SAFE',
    peopleCount: 4,
    notes: 'Safely evacuated via Vijaya Nagar flyover to Guru Nanak College relief camp with family and pet dog.',
    timestamp: '10:41 AM',
    contact: '+91 98401 89012'
  },
  {
    id: 'CHK-02',
    citizenName: 'Ramanathan K. (Age 81)',
    sector: 'Zone 13 - Velachery',
    status: 'NEEDS_ASSISTANCE',
    peopleCount: 1,
    notes: 'Wheelchair user at 14 Ram Nagar 2nd Street. Water at door sill. Needs rescue boat ramp assistance.',
    timestamp: '10:44 AM',
    contact: '+91 94440 90123'
  },
  {
    id: 'CHK-03',
    citizenName: 'Priya & Roommates (TCS Siruseri)',
    sector: 'Zone 14 - OMR',
    status: 'EVACUATED',
    peopleCount: 3,
    notes: 'Reached Sholinganallur Community Hall shelter safely. Checked in with GCC desk.',
    timestamp: '10:47 AM',
    contact: '+91 98840 01234'
  },
  {
    id: 'CHK-04',
    citizenName: 'Little Angels Creche Group',
    sector: 'Zone 13 - Velachery',
    status: 'SAFE',
    peopleCount: 16,
    notes: '14 children and 2 teachers safely escorted by volunteers to upper auditorium at Gandhi Road.',
    timestamp: '10:49 AM',
    contact: '+91 98411 23456'
  }
];


