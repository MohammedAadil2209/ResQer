import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  Incident, 
  CommunityReport, 
  CollectiveSignal, 
  EmergencyResource, 
  SystemNotification,
  ScenarioSimulationParams,
  ScenarioSimulationResult,
  CitizenDraftReport,
  ResponsePlan
} from '../types';
import { 
  INITIAL_INCIDENTS, 
  INITIAL_COMMUNITY_REPORTS, 
  INITIAL_COLLECTIVE_SIGNALS, 
  INITIAL_RESOURCES, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export type AppMode = 'citizen' | 'command' | 'landing';
export type CitizenView = 'home' | 'report' | 'voice' | 'silent' | 'confirmation' | 'status' | 'safety' | 'safety-info';
export type CommandView = 'overview' | 'incidents' | 'digital-twin' | 'signals' | 'resources' | 'simulator' | 'plans' | 'analytics';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

const DEFAULT_RESPONSE_PLANS: ResponsePlan[] = [
  {
    id: 'PLAN-B2-FLOOD',
    title: 'Sector B2 Flood Evacuation Playbook',
    sector: 'Sector B2',
    status: 'Recommended',
    description: 'Comprehensive hydrological containment and mass civilian redirection avoiding inundated Road 2.',
    keyActions: [
      'Divert emergency and civilian transit from Road 2 to Road 3 (Elevated North Ridge Bypass)',
      'Deploy North Valley Elementary school emergency evacuation corridor',
      'Pre-emptively activate Shelter C to alleviate 91% capacity surge on Shelter A',
      'Stage Amphibious Swiftwater 02 team at river basin bottleneck'
    ]
  },
  {
    id: 'PLAN-A1-POWER',
    title: 'Industrial Power Grid Isolation Protocol',
    sector: 'Sector A1',
    status: 'Draft',
    description: 'De-energize high-voltage substation feeds to prevent catastrophic chain arc fires.',
    keyActions: [
      'Isolate Substation 4 feeder switches remotely',
      'Notify Industrial Depot perimeter personnel to clear 35ft buffer zone',
      'Deploy Mobile Generator 03 to St. Jude Trauma Annex'
    ]
  },
  {
    id: 'PLAN-CITY-MED',
    title: 'Metropolitan Mass-Casualty Trauma Distribution',
    sector: 'Metropolitan',
    status: 'Draft',
    description: 'Regional balancing of critical trauma admissions between St. Jude and Valley General.',
    keyActions: [
      'Establish triage staging tents at Civic Square',
      'Authorize mutual-aid emergency airlift vectors',
      'Re-route non-critical ambulance transports to regional secondary clinics'
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
  assignResponderToIncident: (incidentId: string, responderName: string) => void;
  updateIncidentStatus: (incidentId: string, status: Incident['status']) => void;
  broadcastSectorAlert: (sector: string, message: string) => void;
  
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
    locationSector: 'Sector B2',
    targetPerson: 'Multiple people',
    peopleCount: 3,
    details: 'Elderly neighbors need help on second floor; water in driveway.'
  });

  // Signals
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>(INITIAL_COMMUNITY_REPORTS);
  const [collectiveSignals, setCollectiveSignals] = useState<CollectiveSignal[]>(INITIAL_COLLECTIVE_SIGNALS);
  const [activeCollectiveAlert, setActiveCollectiveAlert] = useState<CollectiveSignal | null>(INITIAL_COLLECTIVE_SIGNALS[0]);

  // Resources
  const [resources, setResources] = useState<EmergencyResource[]>(INITIAL_RESOURCES);

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
        description: 'Water surge +20% will cut off secondary bridge on Sector B2 Northern Ridge.'
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
      sector: finalDraft.locationSector || 'Sector B2',
      coordinates: { x: 57 + (Math.random() * 4 - 2), y: 44 + (Math.random() * 4 - 2) },
      severity: 'Critical',
      peopleAffected: finalDraft.peopleCount || 1,
      vulnerableCount: finalDraft.details.toLowerCase().includes('elder') ? 1 : 0,
      status: 'Active',
      reportedAt: nowTime,
      assignedResponder: 'Rescue Team assigned',
      roadAccess: 'Restricted',
      shelterLoad: 72,
      hospitalLoad: 68,
      reportsCount: 1,
      description: finalDraft.details || 'Emergency report transmitted by citizen.',
      timeline: [
        { time: nowTime, label: 'Emergency received', description: 'Citizen signal logged via secure channel.', completed: true },
        { time: nowTime, label: 'Location confirmed', description: `${finalDraft.locationSector} geofence verified.`, completed: true },
        { time: nowTime, label: 'Responder assigned', description: 'Rescue Team allocated.', completed: true },
        { time: 'In progress', label: 'Response underway', description: 'Coordinated rescue unit en route.', completed: false }
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
      sector: 'Sector B2',
      coordinates: { x: 58, y: 44 },
      severity: (aiData.severity as any) || 'Critical',
      peopleAffected: aiData.people || 20,
      vulnerableCount: 15,
      status: 'Active',
      reportedAt: nowTime,
      assignedResponder: 'Tactical Rescue Team 04',
      roadAccess: 'Restricted',
      shelterLoad: 72,
      hospitalLoad: 68,
      reportsCount: 1,
      description: `VoxRescue AI parsed: "${aiData.notes}". Vulnerability: ${aiData.vulnerability}. Trend: ${aiData.trend}.`,
      timeline: [
        { time: nowTime, label: 'Voice emergency received', description: 'Acoustic waveform ingested.', completed: true },
        { time: nowTime, label: 'AI Structured Understanding', description: `Identified ${aiData.hazard} with high vulnerability (${aiData.vulnerability}).`, completed: true },
        { time: nowTime, label: 'Responder assigned', description: 'Tactical Rescue Team 04 dispatched.', completed: true },
        { time: 'In progress', label: 'Response underway', description: 'Units mobilizing with watercraft.', completed: false }
      ]
    };

    const newReport: CommunityReport = {
      id: `REP-VOX-${Date.now().toString().slice(-4)}`,
      timestamp: nowTime,
      source: 'VoxRescue',
      sector: 'Sector B2',
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
      sector: 'Sector B2',
      content: 'Silent 1-click distress alert beacon activated with high telemetry confidence.',
      hazard: 'Medical',
      verified: true
    };

    setCommunityReports(prev => [silentReport, ...prev]);

    addNotification({
      type: 'CRITICAL',
      title: 'Silent Emergency Signal Received',
      message: 'Silent distress beacon activated in Sector B2. Priority responder notification initiated.',
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
        roadStatus = 'Severely Restricted (Road 1 & 2 Impassable)';
      } else if (scenarioParams.waterLevelDelta >= 15 || scenarioParams.roadAvailability <= 80) {
        roadStatus = 'Restricted (Road 2 Impassable, Road 1 Congested)';
      }

      const projectedHosp = projectedOccupancy > 85 ? 'Critical (92% surge load)' : projectedOccupancy > 70 ? 'High (80% surge load)' : 'Moderate (64%)';
      const neededResources = Math.max(1, Math.round((scenarioParams.waterLevelDelta / 10) + (scenarioParams.affectedPopulation > 200 ? 2 : 1)));

      const recommendations: ScenarioSimulationResult['recommendations'] = [
        {
          priority: 'HIGH',
          title: projectedOccupancy > 85 ? 'Activate Secondary Shelter C Immediately' : 'Prepare Shelter C Reserve',
          actionText: 'ACTIVATE SHELTER C',
          description: `Projected occupancy reaches ${projectedOccupancy}% with incoming displaced residents.`
        },
        {
          priority: 'HIGH',
          title: 'Pre-position Amphibious Rescue Unit 02',
          actionText: 'PRE-POSITION UNIT',
          description: `Water surge (+${scenarioParams.waterLevelDelta}%) threatens Sector B2 northern embankment.`
        },
        {
          priority: 'MEDIUM',
          title: 'Designate Alternate High-Ground Evacuation Corridor',
          actionText: 'PREPARE ROUTE',
          description: 'Reroute civilians via Road 3 to avoid rising tributary choke-points.'
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
    addToast('Demo Mode activated: Flood Event — Sector B2', 'info');
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
        assignResponderToIncident('INC-0241', 'Tactical Rescue Team 04');
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
        assignResponderToIncident,
        updateIncidentStatus,
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
