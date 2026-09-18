import React, { useState } from 'react';
import { EmergencyProvider, useEmergency } from './context/EmergencyContext';
import { ThreeBackground } from './components/common/ThreeBackground';
import { ToastContainer } from './components/common/ToastContainer';

// Citizen Components
import { CitizenHeader } from './components/citizen/CitizenHeader';
import { CitizenHome } from './components/citizen/CitizenHome';
import { CitizenReportWizard } from './components/citizen/CitizenReportWizard';
import { VoxRescueModal } from './components/citizen/VoxRescueModal';
import { SilentEmergencyView } from './components/citizen/SilentEmergencyView';
import { EmergencyConfirmation } from './components/citizen/EmergencyConfirmation';
import { EmergencyStatusView } from './components/citizen/EmergencyStatusView';
import { SafetyInfoModal } from './components/citizen/SafetyInfoModal';
import { CitizenAlertsView } from './components/citizen/CitizenAlertsView';
import { CitizenVolunteerHub } from './components/citizen/CitizenVolunteerHub';
import { CitizenCheckInCommsView } from './components/citizen/CitizenCheckInCommsView';

// Command Center Components
import { CommandSidebar } from './components/command/CommandSidebar';
import { CommandHeader } from './components/command/CommandHeader';
import { CommandOverview } from './components/command/CommandOverview';
import { DigitalTwinView } from './components/command/DigitalTwinView';
import { IncidentsWorkspaceView } from './components/command/IncidentsWorkspaceView';
import { SignalsFeedView } from './components/command/SignalsFeedView';
import { ResourcesManagerView } from './components/command/ResourcesManagerView';
import { ScenarioSimulatorView } from './components/command/ScenarioSimulatorView';
import { ResponsePlansView } from './components/command/ResponsePlansView';
import { AnalyticsDashboardView } from './components/command/AnalyticsDashboardView';
import { NotificationDrawer } from './components/command/NotificationDrawer';
import { LocationAlertsView } from './components/command/LocationAlertsView';
import { VolunteerCoordinationView } from './components/command/VolunteerCoordinationView';
import { CommunityCommsView } from './components/command/CommunityCommsView';

// Landing / Story Component
import { LandingPage } from './components/landing/LandingPage';

const MainRouter: React.FC = () => {
  const { appMode, citizenView, commandView } = useEmergency();
  const [searchTerm, setSearchTerm] = useState('');

  if (appMode === 'landing') {
    return <LandingPage />;
  }

  if (appMode === 'citizen') {
    return (
      <div className="min-h-screen bg-white text-stone-900 flex flex-col justify-between relative overflow-x-hidden select-none">
        {/* Subtle 3D background canvas */}
        <ThreeBackground />

        {/* Citizen Top Bar */}
        <CitizenHeader />

        {/* View Switcher */}
        <main className="relative z-10 flex-1 flex flex-col justify-center">
          {citizenView === 'home' && <CitizenHome />}
          {citizenView === 'report' && <CitizenReportWizard />}
          {citizenView === 'voice' && <VoxRescueModal />}
          {citizenView === 'silent' && <SilentEmergencyView />}
          {citizenView === 'confirmation' && <EmergencyConfirmation />}
          {citizenView === 'status' && <EmergencyStatusView />}
          {citizenView === 'safety-info' && <SafetyInfoModal />}
          {citizenView === 'alerts' && <CitizenAlertsView />}
          {citizenView === 'volunteers' && <CitizenVolunteerHub />}
          {citizenView === 'check-in' && <CitizenCheckInCommsView />}
        </main>
      </div>
    );
  }

  // AppMode === 'command'
  return (
    <div className="flex h-screen bg-white text-stone-900 overflow-hidden font-sans">
      {/* Left Sidebar */}
      <CommandSidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Sticky Command Header & Metrics */}
        <CommandHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 lg:p-6 bg-beige-50/60">
          {commandView === 'overview' && <CommandOverview />}
          {commandView === 'digital-twin' && (
            <div className="h-[calc(100vh-140px)] min-h-[500px]">
              <DigitalTwinView />
            </div>
          )}
          {commandView === 'incidents' && <IncidentsWorkspaceView />}
          {commandView === 'signals' && <SignalsFeedView />}
          {commandView === 'resources' && <ResourcesManagerView />}
          {commandView === 'alerts' && <LocationAlertsView />}
          {commandView === 'volunteers' && <VolunteerCoordinationView />}
          {commandView === 'comms' && <CommunityCommsView />}
          {commandView === 'simulator' && <ScenarioSimulatorView />}
          {commandView === 'plans' && <ResponsePlansView />}
          {commandView === 'analytics' && <AnalyticsDashboardView />}
        </main>
      </div>

      {/* Slideout Notifications Panel */}
      <NotificationDrawer />
    </div>
  );
};

export default function App() {
  return (
    <EmergencyProvider>
      <div className="w-full min-h-screen bg-white text-stone-900 font-sans antialiased">
        <MainRouter />
        <ToastContainer />
      </div>
    </EmergencyProvider>
  );
}
