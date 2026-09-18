import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  Incident, 
  EmergencyHazard,
  CommunityReport, 
  CollectiveSignal, 
  EmergencyResource, 
  SystemNotification,
  ScenarioSimulationParams,
  ScenarioSimulationResult,
  CitizenDraftReport,
  ResponsePlan,
  LocationAlert,
  VolunteerRequirement,
  VolunteerMember,
  CommunityMessage,
  SafetyCheckIn
} from '../types';
import { 
  INITIAL_INCIDENTS, 
  INITIAL_COMMUNITY_REPORTS, 
  INITIAL_COLLECTIVE_SIGNALS, 
  INITIAL_RESOURCES, 
  INITIAL_NOTIFICATIONS,
  INITIAL_LOCATION_ALERTS,
  INITIAL_VOLUNTEER_REQUIREMENTS,
  INITIAL_VOLUNTEER_MEMBERS,
  INITIAL_COMMUNITY_MESSAGES,
  INITIAL_SAFETY_CHECKINS
} from '../data/mockData';

export type AppMode = 'citizen' | 'command' | 'landing';
export type CitizenView = 'home' | 'report' | 'voice' | 'silent' | 'confirmation' | 'status' | 'safety' | 'safety-info' | 'volunteer-hub' | 'volunteers' | 'alerts' | 'comms' | 'check-in';
export type CommandView = 'overview' | 'incidents' | 'digital-twin' | 'signals' | 'resources' | 'alerts' | 'volunteers' | 'comms' | 'simulator' | 'plans' | 'analytics';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

const DEFAULT_RESPONSE_PLANS: ResponsePlan[] = [
  {
    id: 'PLAN-VELACHERY-FLOOD',
    title: 'Zone 13 Velachery & Adyar Basin Flood Playbook',
    sector: 'Zone 13 - Velachery',
    status: 'Recommended',
    description: 'Greater Chennai Corporation hydrological containment and mass civilian redirection avoiding submerged Velachery 100 Feet Road.',
    keyActions: [
      'Divert emergency and civilian transit from submerged 100 Feet Road to elevated Vijaya Nagar Flyover & GST Road',
      'Deploy Guru Nanak College campus emergency relief corridor and community kitchen',
      'Pre-emptively activate Guru Nanak Indoor Stadium relief camp to alleviate 73% surge on Gandhi Rd Hall',
      'Stage NDRF 04 Battalion & TNFRS inflatable boats at Velachery MRTS station'
    ]
  },
  {
    id: 'PLAN-MANALI-POWER',
    title: 'North Chennai TANGEDCO Power Grid Isolation Protocol',
    sector: 'Zone 5 - Royapuram',
    status: 'Draft',
    description: 'De-energize high-voltage substation feeds to prevent catastrophic chain arc fires near Ennore Highway.',
    keyActions: [
      'Isolate Manali 230kV substation feeder switches remotely via TANGEDCO SCADA',
      'Enforce 400m perimeter safety buffer zone along Ennore Expressway',
      'Deploy mobile emergency generator to Royapuram Govt Hospital Trauma Annex'
    ]
  },
  {
    id: 'PLAN-CHENNAI-TRAUMA',
    title: 'Chennai Metropolitan Mass-Casualty Trauma Distribution',
    sector: 'Metropolitan Chennai',
    status: 'Draft',
    description: 'Regional balancing of critical trauma admissions between Rajiv Gandhi Govt General Hospital (RGGGH) and Omandurar Government Estate Hospital.',
    keyActions: [
      'Establish 108 triage staging tents at Chennai Central and Saidapet hubs',
      'Authorize TNFRS amphibious craft for water-locked patient transport',
      'Re-route non-critical ambulance transports to regional peripheral hospitals (Kilpauk & Royapettah)'
    ]
  }
];

interface EmergencyContextType {
  // Navigation & Views
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  citizenView: CitizenView;
  setCitizenView: (view: CitizenView) => void;
  commandView: CommandView;
  setCommandView: (view: CommandView) => void;
  
  // Incidents
  incidents: Incident[];
  selectedIncidentId: string;
  setSelectedIncidentId: (id: string) => void;
  selectedIncident: Incident | undefined;
  createIncident: (incident: Partial<Incident> & { title: string; type: EmergencyHazard; sector: string }) => string;
  assignResponderToIncident: (incidentId: string, responderName: string) => void;
  updateIncidentStatus: (incidentId: string, status: Incident['status']) => void;
  broadcastSectorAlert: (sector: string, message: string) => void;
  
  // Location-Based Alerts (System Objective)
  locationAlerts: LocationAlert[];
  createLocationAlert: (alert: Omit<LocationAlert, 'id' | 'issuedAt' | 'status' | 'deliveryReach'>) => string;
  deactivateLocationAlert: (id: string) => void;

  // Volunteer Coordination (System Objective)
  volunteerRequirements: VolunteerRequirement[];
  volunteerMembers: VolunteerMember[];
  addVolunteerRequirement: (req: Omit<VolunteerRequirement, 'id' | 'postedAt' | 'assignedCount' | 'status'>) => string;
  registerVolunteer: (vol: Omit<VolunteerMember, 'id' | 'status'>) => string;
  assignVolunteerToRequirement: (volunteerId: string, requirementId: string) => void;
  joinVolunteerRequirement: (requirementId: string, volunteerName: string, skills?: string[]) => void;

  // Community <-> Response Teams Communication (System Objective)
  communityMessages: CommunityMessage[];
  sendCommunityMessage: (text: string, senderType?: CommunityMessage['senderType'], senderName?: string, sector?: string, incidentId?: string, imageUrl?: string) => void;
  safetyCheckIns: SafetyCheckIn[];
  submitSafetyCheckIn: (checkIn: Omit<SafetyCheckIn, 'id' | 'timestamp'>) => string;
  addIncidentTimelineEvent: (incidentId: string, label: string, description?: string, imageUrl?: string) => void;
  
  // Citizen active emergency tracking
  activeCitizenIncidentId: string;
  setActiveCitizenIncidentId: (id: string) => void;
  citizenDraft: CitizenDraftReport;
  setCitizenDraft: React.Dispatch<React.SetStateAction<CitizenDraftReport>>;
  submitCitizenEmergency: (draftOverride?: Partial<CitizenDraftReport>) => string;
  submitVoiceEmergency: (aiStructuredData: {
    hazard: string;
    location: string;
    people: number;
    vulnerability: string;
    severity: string;
    trend: string;
    notes: string;
  }) => string;
  submitSilentEmergency: () => string;

  // Signals
  communityReports: CommunityReport[];
  collectiveSignals: CollectiveSignal[];
  activeCollectiveAlert: CollectiveSignal | null;
  dismissCollectiveAlert: () => void;
  verifyReport: (reportId: string) => void;
  createIncidentFromReport: (report: CommunityReport) => void;
  
  // Resources
  resources: EmergencyResource[];
  dispatchResource: (resourceId: string, incidentId?: string) => void;
  releaseResource: (resourceId: string) => void;
  recallResource: (resourceId: string) => void;

  // Response Plans
  responsePlans: ResponsePlan[];
  activateResponsePlan: (planId: string) => void;

  // Scenario Simulator
  scenarioParams: ScenarioSimulationParams;
  setScenarioParams: React.Dispatch<React.SetStateAction<ScenarioSimulationParams>>;
  scenarioResult: ScenarioSimulationResult;
  runScenarioSimulation: () => void;
  runSimulationScenario: () => void;
  resetSimulationScenario: () => void;
  isSimulating: boolean;

  // Notifications
  notifications: SystemNotification[];
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  markNotificationRead: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
  addNotification: (notif: Omit<SystemNotification, 'id' | 'time' | 'read'>) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // Scripted Demo Mode
  isDemoPlaying: boolean;
  demoStepIndex: number;
  totalDemoSteps: number;
  playDemo: () => void;
  pauseDemo: () => void;
  resetDemo: () => void;
  setDemoStep: (step: number) => void;
  jumpToDemoStep: (step: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;

  // Accessibility
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [appMode, setAppMode] = useState<AppMode>('citizen');
  const [citizenView, setCitizenView] = useState<CitizenView>('home');
  const [commandView, setCommandView] = useState<CommandView>('overview');

  // Incidents
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('INC-0241');
  const [activeCitizenIncidentId, setActiveCitizenIncidentId] = useState<string>('INC-0241');

  // Citizen Draft
  const [citizenDraft, setCitizenDraft] = useState<CitizenDraftReport>({
    hazard: 'Flood',
    locationSector: 'Zone 13 - Velachery',
    targetPerson: 'Multiple people',
    peopleCount: 3,
    details: 'Elderly family members in Ram Nagar need boat evacuation assistance; flood water entering ground floor.'
  });

  // Signals
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>(INITIAL_COMMUNITY_REPORTS);
  const [collectiveSignals, setCollectiveSignals] = useState<CollectiveSignal[]>(INITIAL_COLLECTIVE_SIGNALS);
  const [activeCollectiveAlert, setActiveCollectiveAlert] = useState<CollectiveSignal | null>(INITIAL_COLLECTIVE_SIGNALS[0]);

  // Resources
  const [resources, setResources] = useState<EmergencyResource[]>(INITIAL_RESOURCES);

  // Location Alerts (System Objective)
  const [locationAlerts, setLocationAlerts] = useState<LocationAlert[]>(INITIAL_LOCATION_ALERTS);

  // Volunteer Coordination (System Objective)
  const [volunteerRequirements, setVolunteerRequirements] = useState<VolunteerRequirement[]>(INITIAL_VOLUNTEER_REQUIREMENTS);
  const [volunteerMembers, setVolunteerMembers] = useState<VolunteerMember[]>(INITIAL_VOLUNTEER_MEMBERS);

  // Community <-> Response Teams Communication (System Objective)
  const [communityMessages, setCommunityMessages] = useState<CommunityMessage[]>(INITIAL_COMMUNITY_MESSAGES);
  const [safetyCheckIns, setSafetyCheckIns] = useState<SafetyCheckIn[]>(INITIAL_SAFETY_CHECKINS);

  // Response Plans
  const [responsePlans, setResponsePlans] = useState<ResponsePlan[]>(DEFAULT_RESPONSE_PLANS);

  // Notifications
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Accessibility
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Scenario Simulator
  const [scenarioParams, setScenarioParams] = useState<ScenarioSimulationParams>({
    waterLevelDelta: 20, // +20%
    affectedPopulation: 180,
    shelterCapacity: 200,
    roadAvailability: 70
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [scenarioResult, setScenarioResult] = useState<ScenarioSimulationResult>({
    projectedRoadStatus: 'Restricted (Road 2 impassable, Road 1 at capacity)',
    projectedShelterOccupancy: 91,
    projectedHospitalLoad: 'High (88% surge capacity)',
    additionalResourcesNeeded: 3,
    recommendations: [
      {
        priority: 'HIGH',
        title: 'Activate Shelter C Pre-Emptively',
        actionText: 'ACTIVATE SHELTER C',
        description: 'Shelter A projected to exceed 90% within 45 minutes as sector evacuation proceeds.'
      },
      {
        priority: 'HIGH',
        title: 'Pre-position Rescue Team 02 Amphibious',
        actionText: 'DEPLOY SWIFTWATER',
        description: 'Water surge +20% will cut off secondary bridge on Zone 13 Velachery Lake embankment.'
      },
      {
        priority: 'MEDIUM',
        title: 'Redirect EMS Traffic to Road 3',
        actionText: 'REROUTE TRAFFIC',
        description: 'Prevent emergency vehicle bottleneck on low-lying perimeter approach.'
      }
    ]
  });

  // Demo Mode state
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [demoStepIndex, setDemoStepIndex] = useState(0);
  const totalDemoSteps = 12;

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addNotification = useCallback((notif: Omit<SystemNotification, 'id' | 'time' | 'read'>) => {
    const newNotif: SystemNotification = {
      ...notif,
      id: `NOTIF-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];

  const assignResponderToIncident = (incidentId: string, responderName: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          assignedResponder: responderName,
          status: 'Responding',
          timeline: [
            ...inc.timeline,
            {
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              label: `${responderName} assigned`,
              description: 'Operational dispatch orders transmitted.',
              completed: true
            }
          ]
        };
      }
      return inc;
    }));

    // Update resource status as well
    setResources(prev => prev.map(res => {
      if (res.name.includes(responderName) || responderName.includes(res.name)) {
        return {
          ...res,
          status: 'DISPATCHED',
          assignedIncidentId: incidentId,
          location: `En route to ${incidentId}`
        };
      }
      return res;
    }));

    addNotification({
      type: 'INFO',
      title: 'Responder Dispatched',
      message: `${responderName} assigned to incident ${incidentId}.`,
      incidentId
    });
    addToast(`${responderName} assigned to ${incidentId}`, 'success');
  };

  const createIncident = (incidentData: Partial<Incident> & { title: string; type: EmergencyHazard; sector: string }): string => {
    const newIncId = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newInc: Incident = {
      id: newIncId,
      title: incidentData.title,
      type: incidentData.type,
      sector: incidentData.sector,
      location: incidentData.location || `${incidentData.sector} Active Zone`,
      coordinates: incidentData.coordinates || { x: 50, y: 50 },
      severity: incidentData.severity || 'Critical',
      status: incidentData.status || 'Responding',
      peopleAffected: incidentData.peopleAffected ?? 4,
      vulnerableCount: incidentData.vulnerableCount ?? 1,
      roadAccess: incidentData.roadAccess || 'Restricted',
      shelterLoad: incidentData.shelterLoad ?? 70,
      hospitalLoad: incidentData.hospitalLoad ?? 65,
      reportsCount: incidentData.reportsCount ?? 1,
      description: incidentData.description || 'Logged in real-time emergency response operations.',
      reportedAt: nowTime,
      assignedResponder: incidentData.assignedResponder,
      timeline: [
        { time: nowTime, label: 'Real-time incident logged', description: 'Dispatched directly via Command Center queue.', completed: true }
      ]
    };
    setIncidents(prev => [newInc, ...prev]);
    setSelectedIncidentId(newIncId);
    addNotification({
      type: 'CRITICAL',
      title: `Real-time Incident: ${newIncId}`,
      message: `${newInc.title} logged in ${newInc.sector}.`,
      incidentId: newIncId
    });
    addToast(`Incident ${newIncId} successfully created in real-time.`, 'success');
    return newIncId;
  };

  const createLocationAlert = (alertData: Omit<LocationAlert, 'id' | 'issuedAt' | 'status' | 'deliveryReach'>): string => {
    const newId = `ALERT-GEO-${Math.floor(10 + Math.random() * 90)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAlert: LocationAlert = {
      ...alertData,
      id: newId,
      issuedAt: nowTime,
      status: 'ACTIVE',
      deliveryReach: 96
    };
    setLocationAlerts(prev => [newAlert, ...prev]);
    addNotification({
      type: 'CRITICAL',
      title: `Location Alert Broadcast: ${newAlert.sector}`,
      message: `${newAlert.title}. Safe Route: ${newAlert.safeRoute}`
    });
    addToast(`Location alert ${newId} broadcast to ${newAlert.sector}`, 'warning');
    return newId;
  };

  const deactivateLocationAlert = (id: string) => {
    setLocationAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a));
    addToast(`Location alert ${id} deactivated`, 'info');
  };

  const addVolunteerRequirement = (reqData: Omit<VolunteerRequirement, 'id' | 'postedAt' | 'assignedCount' | 'status'>): string => {
    const newId = `REQ-VOL-${Math.floor(10 + Math.random() * 90)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newReq: VolunteerRequirement = {
      ...reqData,
      id: newId,
      postedAt: nowTime,
      assignedCount: 0,
      status: 'OPEN'
    };
    setVolunteerRequirements(prev => [newReq, ...prev]);
    addNotification({
      type: 'INFO',
      title: 'Volunteer Requirement Posted',
      message: `${newReq.title} (${newReq.neededCount} needed in ${newReq.sector}).`
    });
    addToast(`Volunteer need ${newId} posted for ${newReq.sector}`, 'success');
    return newId;
  };

  const registerVolunteer = (volData: Omit<VolunteerMember, 'id' | 'status'>): string => {
    const newId = `VOL-${Math.floor(100 + Math.random() * 900)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newVol: VolunteerMember = {
      ...volData,
      id: newId,
      status: 'READY',
      checkInTime: nowTime
    };
    setVolunteerMembers(prev => [newVol, ...prev]);
    addToast(`Welcome ${newVol.name}! Added to emergency volunteer roster.`, 'success');
    return newId;
  };

  const assignVolunteerToRequirement = (volunteerId: string, requirementId: string) => {
    setVolunteerMembers(prev => prev.map(v => v.id === volunteerId ? {
      ...v,
      status: 'ASSIGNED',
      assignedRequirementId: requirementId
    } : v));
    setVolunteerRequirements(prev => prev.map(r => {
      if (r.id === requirementId) {
        const newAssigned = r.assignedCount + 1;
        return {
          ...r,
          assignedCount: newAssigned,
          status: newAssigned >= r.neededCount ? 'FILLED' : 'IN_PROGRESS'
        };
      }
      return r;
    }));
    addToast(`Volunteer assigned to task ${requirementId}`, 'success');
  };

  const joinVolunteerRequirement = (requirementId: string, volunteerName: string, skills: string[] = ['General Assistance']) => {
    const volId = registerVolunteer({
      name: volunteerName,
      skills,
      sector: 'Zone 13 - Velachery',
      contact: 'Citizen App Direct',
      assignedRequirementId: requirementId,
      badges: ['Community Responder']
    });
    assignVolunteerToRequirement(volId, requirementId);
  };

  const sendCommunityMessage = (
    text: string, 
    senderType: CommunityMessage['senderType'] = 'Dispatcher', 
    senderName: string = 'Command Dispatcher', 
    sector: string = 'Zone 13 - Velachery', 
    incidentId?: string,
    imageUrl?: string
  ) => {
    const newMsg: CommunityMessage = {
      id: `MSG-${Date.now().toString().slice(-4)}`,
      incidentId,
      sector,
      senderType,
      senderName,
      text,
      imageUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Sent'
    };
    setCommunityMessages(prev => [...prev, newMsg]);
    if (senderType === 'Citizen') {
      addNotification({
        type: 'CRITICAL',
        title: `Community Dispatch Message from ${senderName}${imageUrl ? ' [Field Photo Attached]' : ''}`,
        message: text + (imageUrl ? ' (Image included)' : ''),
        incidentId
      });
    }
    addToast(imageUrl ? 'Image & message transmitted to response team' : 'Message transmitted', 'info');
  };

  const addIncidentTimelineEvent = (incidentId: string, label: string, description?: string, imageUrl?: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          timeline: [
            ...inc.timeline,
            {
              time: now,
              label,
              description,
              imageUrl,
              completed: true
            }
          ]
        };
      }
      return inc;
    }));
    addNotification({
      type: 'INFO',
      title: `Incident ${incidentId}: ${label}`,
      message: description || 'New field telemetry submitted.',
      incidentId
    });
    addToast('Incident timeline updated', 'success');
  };

  const submitSafetyCheckIn = (checkInData: Omit<SafetyCheckIn, 'id' | 'timestamp'>): string => {
    const newId = `CHK-${Date.now().toString().slice(-4)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const record: SafetyCheckIn = {
      ...checkInData,
      id: newId,
      timestamp: nowTime
    };
    setSafetyCheckIns(prev => [record, ...prev]);
    addNotification({
      type: checkInData.status === 'NEEDS_ASSISTANCE' ? 'CRITICAL' : 'INFO',
      title: `Safety Check-in: ${checkInData.citizenName} (${checkInData.status})`,
      message: `${checkInData.peopleCount} people in ${checkInData.sector}. Note: ${checkInData.notes}`
    });
    addToast(`Safety check-in logged: ${checkInData.status}`, 'success');
    return newId;
  };

  const updateIncidentStatus = (incidentId: string, status: Incident['status']) => {
    setIncidents(prev => prev.map(i => i.id === incidentId ? { ...i, status } : i));
    addToast(`Incident ${incidentId} status updated to ${status}`, 'info');
  };

  const dispatchResource = (resourceId: string, incidentId: string = 'INC-0241') => {
    setResources(prev => prev.map(r => {
      if (r.id === resourceId) {
        return {
          ...r,
          status: 'DISPATCHED',
          assignedIncidentId: incidentId,
          location: `Dispatched to ${incidentId}`
        };
      }
      return r;
    }));
    addToast('Resource dispatched successfully', 'success');
  };

  const releaseResource = (resourceId: string) => {
    setResources(prev => prev.map(r => {
      if (r.id === resourceId) {
        return {
          ...r,
          status: 'AVAILABLE',
          assignedIncidentId: undefined,
          location: 'Staging Depot'
        };
      }
      return r;
    }));
    addToast('Resource marked available at staging', 'info');
  };

  const recallResource = (resourceId: string) => {
    releaseResource(resourceId);
  };

  const activateResponsePlan = (planId: string) => {
    setResponsePlans(prev => prev.map(plan => 
      plan.id === planId ? { ...plan, status: 'Active' } : plan
    ));
    addNotification({
      type: 'CRITICAL',
      title: `Response Plan Activated: ${planId}`,
      message: `Operational orders dispatched across sector. Coordinated traffic rerouting and rescue units engaged.`
    });
    addToast(`Plan ${planId} activated successfully. Operations dispatched.`, 'success');
  };

  const broadcastSectorAlert = (sector: string, message: string) => {
    addNotification({
      type: 'WARNING',
      title: `Broadcast Alert: ${sector}`,
      message
    });
    addToast(`Emergency alert broadcasted to ${sector}`, 'warning');
  };

  const verifyReport = (reportId: string) => {
    setCommunityReports(prev => prev.map(rep => 
      rep.id === reportId ? { ...rep, verified: true, status: 'Verified' } : rep
    ));
    addToast(`Community signal ${reportId} verified`, 'success');
  };

  const createIncidentFromReport = (report: CommunityReport) => {
    const newIncId = `INC-${Math.floor(2000 + Math.random() * 8000)}`;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newInc: Incident = {
      id: newIncId,
      title: `${report.hazard} — ${report.sector}`,
      type: report.hazard,
      location: `${report.sector} Verified Signal`,
      sector: report.sector,
      coordinates: report.coordinates || { x: 55, y: 45 },
      severity: 'Critical',
      peopleAffected: 4,
      vulnerableCount: 1,
      status: 'Active',
      reportedAt: now,
      assignedResponder: 'Command Triage Unit',
      roadAccess: 'Restricted',
      shelterLoad: 72,
      hospitalLoad: 68,
      reportsCount: 1,
      description: report.content,
      timeline: [
        { time: now, label: 'Promoted to Incident', description: 'Citizen signal escalated by coordinator.', completed: true }
      ]
    };

    setIncidents(prev => [newInc, ...prev]);
    setSelectedIncidentId(newIncId);
    setCommandView('incidents');
    addToast(`Incident ${newIncId} created from report`, 'success');
  };

  const markNotificationAsRead = (id: string) => {
    markNotificationRead(id);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    addToast('Notifications cleared', 'info');
  };

  const runSimulationScenario = () => {
    runScenarioSimulation();
  };

  const resetSimulationScenario = () => {
    setScenarioParams({
      waterLevelDelta: 20,
      affectedPopulation: 180,
      shelterCapacity: 200,
      roadAvailability: 70,
      rainfallIncrease: 25,
      evacuationRate: 'Normal'
    });
    addToast('Simulation parameters reset to baseline', 'info');
  };

  // Submit standard citizen emergency report
  const submitCitizenEmergency = (draftOverride?: Partial<CitizenDraftReport>): string => {
    const finalDraft = { ...citizenDraft, ...draftOverride };
    const newIncidentId = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newIncident: Incident = {
      id: newIncidentId,
      title: `${finalDraft.hazard || 'Emergency'} Incident — ${finalDraft.locationSector}`,
      type: (finalDraft.hazard as any) || 'Flood',
      location: `${finalDraft.locationSector} (Reported via Citizen App)`,
      sector: finalDraft.locationSector || 'Zone 13 - Velachery',
      coordinates: { x: 57 + (Math.random() * 4 - 2), y: 44 + (Math.random() * 4 - 2) },
      severity: 'Critical',
      peopleAffected: finalDraft.peopleCount || 1,
      vulnerableCount: finalDraft.details.toLowerCase().includes('elder') ? 1 : 0,
      status: 'Active',
      reportedAt: nowTime,
      assignedResponder: 'NDRF & TNFRS Rescue Unit 04',
      roadAccess: 'Restricted',
      shelterLoad: 72,
      hospitalLoad: 68,
      reportsCount: 1,
      description: finalDraft.details || 'Emergency report transmitted by citizen.',
      timeline: [
        { time: nowTime, label: 'Emergency received', description: 'Citizen signal logged via secure channel.', completed: true },
        { time: nowTime, label: 'Location confirmed', description: `${finalDraft.locationSector} geofence verified.`, completed: true },
        { time: nowTime, label: 'Responder assigned', description: 'NDRF & TNFRS rescue unit allocated.', completed: true },
        { time: 'In progress', label: 'Response underway', description: 'Coordinated rescue boat unit en route.', completed: false }
      ]
    };

    const newReport: CommunityReport = {
      id: `REP-${Date.now().toString().slice(-4)}`,
      timestamp: nowTime,
      source: finalDraft.isSilent ? 'Silent' : 'Citizen',
      sector: finalDraft.locationSector,
      content: finalDraft.details || `${finalDraft.hazard} reported by citizen for ${finalDraft.peopleCount} people.`,
      hazard: (finalDraft.hazard as any) || 'Flood',
      verified: true,
      coordinates: newIncident.coordinates
    };

    setIncidents(prev => [newIncident, ...prev]);
    setCommunityReports(prev => [newReport, ...prev]);
    setActiveCitizenIncidentId(newIncidentId);
    setSelectedIncidentId(newIncidentId);

    addNotification({
      type: 'CRITICAL',
      title: `New Emergency Signal: ${newIncidentId}`,
      message: `${finalDraft.hazard} reported in ${finalDraft.locationSector}. Response team allocated.`,
      incidentId: newIncidentId
    });

    addToast('Emergency report received. Response is coordinating.', 'success');
    return newIncidentId;
  };

  // Submit voice emergency report
  const submitVoiceEmergency = (aiData: {
    hazard: string;
    location: string;
    people: number;
    vulnerability: string;
    severity: string;
    trend: string;
    notes: string;
  }): string => {
    const newIncidentId = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newIncident: Incident = {
      id: newIncidentId,
      title: `${aiData.hazard} Emergency — ${aiData.location}`,
      type: (aiData.hazard as any) || 'Flood',
      location: aiData.location,
      sector: 'Zone 13 - Velachery',
      coordinates: { x: 58, y: 44 },
      severity: (aiData.severity as any) || 'Critical',
      peopleAffected: aiData.people || 20,
      vulnerableCount: 15,
      status: 'Active',
      reportedAt: nowTime,
      assignedResponder: 'NDRF & TNFRS Rescue Unit 04',
      roadAccess: 'Restricted',
      shelterLoad: 72,
      hospitalLoad: 68,
      reportsCount: 1,
      description: `VoxRescue AI parsed: "${aiData.notes}". Vulnerability: ${aiData.vulnerability}. Trend: ${aiData.trend}.`,
      timeline: [
        { time: nowTime, label: 'Voice emergency received', description: 'Acoustic waveform ingested.', completed: true },
        { time: nowTime, label: 'AI Structured Understanding', description: `Identified ${aiData.hazard} with high vulnerability (${aiData.vulnerability}).`, completed: true },
        { time: nowTime, label: 'Responder assigned', description: 'NDRF & TNFRS Rescue Unit 04 dispatched.', completed: true },
        { time: 'In progress', label: 'Response underway', description: 'Units mobilizing with watercraft.', completed: false }
      ]
    };

    const newReport: CommunityReport = {
      id: `REP-VOX-${Date.now().toString().slice(-4)}`,
      timestamp: nowTime,
      source: 'VoxRescue',
      sector: 'Zone 13 - Velachery',
      content: `Voice report: ${aiData.notes} (${aiData.hazard}, ~${aiData.people} people)`,
      hazard: (aiData.hazard as any) || 'Flood',
      verified: true
    };

    setIncidents(prev => [newIncident, ...prev]);
    setCommunityReports(prev => [newReport, ...prev]);
    setActiveCitizenIncidentId(newIncidentId);
    setSelectedIncidentId(newIncidentId);

    addNotification({
      type: 'CRITICAL',
      title: `VoxRescue AI Verified: ${newIncidentId}`,
      message: `${aiData.hazard} in ${aiData.location} (${aiData.vulnerability}). Responder dispatched.`,
      incidentId: newIncidentId
    });

    addToast('Voice emergency signal verified & dispatched.', 'success');
    return newIncidentId;
  };

  // Submit silent emergency alert
  const submitSilentEmergency = (): string => {
    const newIncidentId = `INC-0242`;
    setActiveCitizenIncidentId(newIncidentId);
    setSelectedIncidentId(newIncidentId);

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const silentReport: CommunityReport = {
      id: `REP-SILENT-${Date.now().toString().slice(-4)}`,
      timestamp: nowTime,
      source: 'Silent',
      sector: 'Zone 13 - Velachery',
      content: 'Silent 1-click distress alert beacon activated with high telemetry confidence.',
      hazard: 'Medical',
      verified: true
    };

    setCommunityReports(prev => [silentReport, ...prev]);

    addNotification({
      type: 'CRITICAL',
      title: 'Silent Emergency Signal Received',
      message: 'Silent distress beacon activated in Zone 13 - Velachery. Dispatched to ERSS 112 / 108 and NDRF rescue team.',
      incidentId: newIncidentId
    });

    addToast('Silent emergency sent. Location locked.', 'success');
    return newIncidentId;
  };

  // Run scenario simulation calculations
  const runScenarioSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const waterFactor = scenarioParams.waterLevelDelta / 100;
      const roadFactor = scenarioParams.roadAvailability / 100;
      const baseOccupancy = 72;
      const projectedOccupancy = Math.min(100, Math.round(baseOccupancy + (waterFactor * 40) + ((1 - roadFactor) * 20)));

      let roadStatus = 'Normal';
      if (scenarioParams.waterLevelDelta >= 35 || scenarioParams.roadAvailability <= 50) {
        roadStatus = 'Severely Restricted (100 Feet Rd & Inner Ring Rd Impassable)';
      } else if (scenarioParams.waterLevelDelta >= 15 || scenarioParams.roadAvailability <= 80) {
        roadStatus = 'Restricted (100 Feet Rd Impassable, Vijaya Nagar Flyover Congested)';
      }

      const projectedHosp = projectedOccupancy > 85 ? 'Critical (92% surge load)' : projectedOccupancy > 70 ? 'High (80% surge load)' : 'Moderate (64%)';
      const neededResources = Math.max(1, Math.round((scenarioParams.waterLevelDelta / 10) + (scenarioParams.affectedPopulation > 200 ? 2 : 1)));

      const recommendations: ScenarioSimulationResult['recommendations'] = [
        {
          priority: 'HIGH',
          title: projectedOccupancy > 85 ? 'Activate Guru Nanak Indoor Stadium Shelter Pre-Emptively' : 'Prepare Guru Nanak Hall Reserve',
          actionText: 'ACTIVATE RELIEF SHELTER',
          description: `Projected occupancy reaches ${projectedOccupancy}% with incoming displaced residents from Velachery Lake perimeter.`
        },
        {
          priority: 'HIGH',
          title: 'Pre-position NDRF & TNFRS Amphibious Unit 04',
          actionText: 'PRE-POSITION UNIT',
          description: `Water surge (+${scenarioParams.waterLevelDelta}%) threatens Zone 13 Velachery Ram Nagar low-lying pockets.`
        },
        {
          priority: 'MEDIUM',
          title: 'Designate Elevated GST Road & Vijaya Nagar Evacuation Corridor',
          actionText: 'PREPARE ROUTE',
          description: 'Reroute civilians via Vijaya Nagar Flyover to avoid flooded Velachery main junction.'
        }
      ];

      setScenarioResult({
        projectedRoadStatus: roadStatus,
        projectedShelterOccupancy: projectedOccupancy,
        projectedHospitalLoad: projectedHosp,
        additionalResourcesNeeded: neededResources,
        recommendations
      });

      setIsSimulating(false);
      addToast('Scenario simulation complete.', 'info');
      addNotification({
        type: 'WARNING',
        title: 'Scenario Projection Generated',
        message: `Projected scenario indicates Shelter capacity pressure (${projectedOccupancy}%) and Road 2 restriction.`
      });
    }, 600);
  };

  const dismissCollectiveAlert = () => {
    setActiveCollectiveAlert(null);
  };

  // Scripted Demo Mode runner
  const playDemo = useCallback(() => {
    setIsDemoPlaying(true);
    addToast('Demo Mode activated: Monsoon Flood Event — Zone 13 Velachery, Chennai', 'info');
  }, [addToast]);

  const pauseDemo = useCallback(() => {
    setIsDemoPlaying(false);
    addToast('Demo Mode paused', 'info');
  }, [addToast]);

  const resetDemo = useCallback(() => {
    setIsDemoPlaying(false);
    setDemoStepIndex(0);
    setIncidents(INITIAL_INCIDENTS);
    setCommunityReports(INITIAL_COMMUNITY_REPORTS);
    setCollectiveSignals(INITIAL_COLLECTIVE_SIGNALS);
    setActiveCollectiveAlert(INITIAL_COLLECTIVE_SIGNALS[0]);
    setResources(INITIAL_RESOURCES);
    setSelectedIncidentId('INC-0241');
    addToast('Demo Mode reset to initial state', 'info');
  }, [addToast]);

  const setDemoStep = useCallback((step: number) => {
    setDemoStepIndex(step);
    // Execute actions corresponding to this step
    switch (step) {
      case 0:
        setAppMode('citizen');
        setCitizenView('voice');
        break;
      case 1:
        setAppMode('citizen');
        setCitizenView('status');
        setActiveCitizenIncidentId('INC-0241');
        break;
      case 2:
        setAppMode('command');
        setCommandView('signals');
        break;
      case 3:
        setAppMode('command');
        setCommandView('overview');
        break;
      case 4:
        setAppMode('command');
        setCommandView('overview');
        setActiveCollectiveAlert(INITIAL_COLLECTIVE_SIGNALS[0]);
        break;
      case 5:
        setAppMode('command');
        setCommandView('digital-twin');
        setSelectedIncidentId('INC-0241');
        break;
      case 6:
        setAppMode('command');
        setCommandView('overview');
        break;
      case 7:
        setAppMode('command');
        setCommandView('simulator');
        break;
      case 8:
        setAppMode('command');
        setCommandView('simulator');
        runScenarioSimulation();
        break;
      case 9:
        setAppMode('command');
        setCommandView('resources');
        break;
      case 10:
        setAppMode('command');
        setCommandView('overview');
        assignResponderToIncident('INC-0241', 'NDRF & TNFRS Rescue Unit 04');
        break;
      case 11:
        setAppMode('command');
        setCommandView('plans');
        break;
    }
  }, [runScenarioSimulation]);

  const nextDemoStep = useCallback(() => {
    setDemoStepIndex(prev => {
      const next = prev < totalDemoSteps - 1 ? prev + 1 : 0;
      setDemoStep(next);
      return next;
    });
  }, [totalDemoSteps, setDemoStep]);

  const prevDemoStep = useCallback(() => {
    setDemoStepIndex(prev => {
      const next = prev > 0 ? prev - 1 : 0;
      setDemoStep(next);
      return next;
    });
  }, [setDemoStep]);

  // Auto-step timer when demo is playing
  useEffect(() => {
    if (!isDemoPlaying) return;
    const timer = setInterval(() => {
      setDemoStepIndex(prev => {
        if (prev >= totalDemoSteps - 1) {
          setIsDemoPlaying(false);
          return prev;
        }
        const next = prev + 1;
        setDemoStep(next);
        return next;
      });
    }, 7000); // 7 seconds per demo beat

    return () => clearInterval(timer);
  }, [isDemoPlaying, totalDemoSteps, setDemoStep]);

  return (
    <EmergencyContext.Provider
      value={{
        appMode,
        setAppMode,
        citizenView,
        setCitizenView,
        commandView,
        setCommandView,
        incidents,
        selectedIncidentId,
        setSelectedIncidentId,
        selectedIncident,
        createIncident,
        assignResponderToIncident,
        updateIncidentStatus,
        locationAlerts,
        createLocationAlert,
        deactivateLocationAlert,
        volunteerRequirements,
        volunteerMembers,
        addVolunteerRequirement,
        registerVolunteer,
        assignVolunteerToRequirement,
        joinVolunteerRequirement,
        communityMessages,
        sendCommunityMessage,
        safetyCheckIns,
        submitSafetyCheckIn,
        addIncidentTimelineEvent,
        activeCitizenIncidentId,
        setActiveCitizenIncidentId,
        citizenDraft,
        setCitizenDraft,
        submitCitizenEmergency,
        submitVoiceEmergency,
        submitSilentEmergency,
        communityReports,
        collectiveSignals,
        activeCollectiveAlert,
        dismissCollectiveAlert,
        resources,
        dispatchResource,
        releaseResource,
        recallResource,
        responsePlans,
        activateResponsePlan,
        broadcastSectorAlert,
        verifyReport,
        createIncidentFromReport,
        scenarioParams,
        setScenarioParams,
        scenarioResult,
        runScenarioSimulation,
        runSimulationScenario,
        resetSimulationScenario,
        isSimulating,
        notifications,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        markNotificationRead,
        markNotificationAsRead,
        markAllNotificationsRead,
        clearAllNotifications,
        addNotification,
        toasts,
        addToast,
        removeToast,
        isDemoPlaying,
        demoStepIndex,
        totalDemoSteps,
        playDemo,
        pauseDemo,
        resetDemo,
        setDemoStep,
        jumpToDemoStep: setDemoStep,
        nextDemoStep,
        prevDemoStep,
        reducedMotion,
        setReducedMotion
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
