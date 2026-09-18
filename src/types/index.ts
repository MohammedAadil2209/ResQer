export type EmergencyHazard = 
  | 'Fire' 
  | 'Flood' 
  | 'Medical' 
  | 'Accident' 
  | 'Building Damage' 
  | 'Electrical' 
  | 'People Trapped' 
  | 'Other';

export type SeverityLevel = 'Critical' | 'High' | 'Moderate' | 'Low';
export type IncidentPriority = SeverityLevel;

export type IncidentStatus = 'Reported' | 'Coordinating' | 'Active' | 'Responding' | 'En route' | 'Contained' | 'Resolved';

export interface TimelineEvent {
  time: string;
  label: string;
  description?: string;
  completed: boolean;
}

export interface Incident {
  id: string;
  title: string;
  type: EmergencyHazard;
  location: string;
  sector: string;
  coordinates: { x: number; y: number };
  severity: SeverityLevel;
  peopleAffected: number;
  vulnerableCount: number;
  status: IncidentStatus;
  reportedAt: string;
  assignedResponder?: string;
  roadAccess: 'Normal' | 'Restricted' | 'Impassable';
  shelterLoad: number;
  hospitalLoad: number;
  reportsCount: number;
  description: string;
  timeline: TimelineEvent[];
}

export interface CommunityReport {
  id: string;
  timestamp: string;
  source: 'Citizen' | 'Volunteer' | 'Sensor' | 'VoxRescue' | 'Silent';
  channel?: string;
  sector: string;
  location?: string;
  content: string;
  hazard: EmergencyHazard;
  category?: string;
  vulnerabilities?: string[];
  status?: 'Pending' | 'Verified' | 'Combined';
  verified: boolean;
  coordinates?: { x: number; y: number };
}

export interface CollectiveSignal {
  id: string;
  sector: string;
  title: string;
  description: string;
  reportCount: number;
  hazards: EmergencyHazard[];
  status: 'ACTIVE' | 'INVESTIGATING' | 'MITIGATED';
  detectedAt: string;
  signalStrength: number;
  pattern: string;
}

export type ResourceCategory = 'Ambulance' | 'Rescue Team' | 'Volunteer' | 'Shelter' | 'Hospital' | 'Rescue Boat' | 'Medical Tent' | 'Mobile Generator';

export interface EmergencyResource {
  id: string;
  name: string;
  category: ResourceCategory;
  type?: string;
  status: 'AVAILABLE' | 'DISPATCHED' | 'ON_SCENE' | 'AT_CAPACITY' | 'MAINTENANCE' | 'Standby' | 'En Route' | 'Deployed';
  location: string;
  sector: string;
  capacity: number;
  occupancy?: number;
  assignedIncidentId?: string;
  etaMinutes?: number;
  contact?: string;
  notes?: string;
}

export interface ScenarioSimulationParams {
  waterLevelDelta: number;
  affectedPopulation: number;
  shelterCapacity: number;
  roadAvailability: number;
  rainfallIncrease?: number;
  evacuationRate?: 'Slow' | 'Normal' | 'Accelerated';
}

export interface ScenarioSimulationResult {
  projectedRoadStatus: string;
  projectedShelterOccupancy: number;
  projectedHospitalLoad: string;
  additionalResourcesNeeded: number;
  projectedInundationArea?: number;
  projectedIsolatedPeople?: number;
  projectedBottleneck?: string;
  recommendations: {
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    title: string;
    actionText: string;
    description: string;
  }[];
}

export interface ResponsePlan {
  id: string;
  title: string;
  sector: string;
  status: 'Recommended' | 'Active' | 'Draft';
  description: string;
  keyActions: string[];
}

export interface SystemNotification {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO' | 'SYSTEM' | 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
  incidentId?: string;
}

export interface CitizenDraftReport {
  hazard: EmergencyHazard | '';
  locationSector: string;
  targetPerson: 'Me' | 'Someone else' | 'Multiple people';
  peopleCount: number;
  details: string;
  isSilent?: boolean;
}

export type AlertUrgency = 'EVACUATION' | 'SEVERE' | 'WARNING' | 'ADVISORY' | 'ALL_CLEAR';

export interface LocationAlert {
  id: string;
  sector: string;
  title: string;
  hazard: EmergencyHazard;
  urgency: AlertUrgency;
  radiusKm: number;
  affectedPopulation: number;
  status: 'ACTIVE' | 'UPDATING' | 'CANCELLED';
  issuedAt: string;
  safeRoute: string;
  evacuationShelter: string;
  shelterCapacityRemaining?: number;
  deliveryChannels: ('CELL_BROADCAST' | 'MOBILE_APP' | 'DIGITAL_SIREN' | 'SMS_GEOFENCE')[];
  deliveryReach: number; // percentage, e.g. 98
  instructions: string[];
}

export type VolunteerUrgency = 'Immediate' | 'High' | 'Medium' | 'Flexible';
export type VolunteerTaskStatus = 'OPEN' | 'IN_PROGRESS' | 'FILLED' | 'COMPLETED';

export interface VolunteerRequirement {
  id: string;
  title: string;
  sector: string;
  urgency: VolunteerUrgency;
  skillsRequired: string[];
  neededCount: number;
  assignedCount: number;
  status: VolunteerTaskStatus;
  leadContact: string;
  locationDetails: string;
  description: string;
  postedAt: string;
}

export interface VolunteerMember {
  id: string;
  name: string;
  skills: string[];
  status: 'READY' | 'ASSIGNED' | 'ON_SCENE' | 'STANDBY';
  sector: string;
  contact: string;
  assignedRequirementId?: string;
  checkInTime?: string;
  badges?: string[];
}

export interface CommunityMessage {
  id: string;
  incidentId?: string;
  sector: string;
  senderType: 'Citizen' | 'Responder' | 'Dispatcher' | 'System';
  senderName: string;
  text: string;
  timestamp: string;
  status: 'Sent' | 'Delivered' | 'Read';
  isUrgent?: boolean;
}

export type SafetyCheckInStatus = 'SAFE' | 'NEEDS_ASSISTANCE' | 'EVACUATED';

export interface SafetyCheckIn {
  id: string;
  citizenName: string;
  sector: string;
  status: SafetyCheckInStatus;
  peopleCount: number;
  notes: string;
  timestamp: string;
  contact?: string;
}

