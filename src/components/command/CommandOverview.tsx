import React from 'react';
import { DigitalTwinView } from './DigitalTwinView';
import { AIEmergencyIntelligence } from './AIEmergencyIntelligence';
import { SignalsFeedView } from './SignalsFeedView';
import { ResourcesManagerView } from './ResourcesManagerView';
import { useEmergency } from '../../context/EmergencyContext';
import { ArrowUpRight, Radio, Truck, AlertTriangle } from 'lucide-react';

export const CommandOverview: React.FC = () => {
  const { setCommandView } = useEmergency();

  return (
    <div className="space-y-6">
      {/* Primary Section: Digital Twin (Center) + AI Intelligence (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 min-h-[580px]">
        {/* Digital Twin Map (8 cols on XL) */}
        <div className="xl:col-span-8 h-[540px] xl:h-auto">
          <DigitalTwinView />
        </div>

        {/* AI Emergency Intelligence (4 cols on XL) */}
        <div className="xl:col-span-4 h-full">
          <AIEmergencyIntelligence />
        </div>
      </div>

      {/* Secondary Bottom Row: Signals Feed & Resources Fleet Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Signals Feed Preview Card */}
        <div className="h-[480px]">
          <SignalsFeedView compact={true} />
        </div>

        {/* Emergency Resources Preview Card */}
        <div className="h-[480px]">
          <ResourcesManagerView />
        </div>
      </div>
    </div>
  );
};
