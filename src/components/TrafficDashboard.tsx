import { useState } from 'react';
import { TrafficSidebar } from './TrafficSidebar';
import { TrafficMap } from './TrafficMap';
import { SignalControlPanel } from './SignalControlPanel';

export interface TrafficSignal {
  id: string;
  latitude: number;
  longitude: number;
  status: 'red' | 'amber' | 'green';
  location: string;
  isActive: boolean;
}

export interface TrafficArea {
  id: string;
  name: string;
  congestionLevel: 'high' | 'medium' | 'low';
  signalCount: number;
  lastUpdated: string;
}

export interface HotspotArea {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  severity: 'critical' | 'high' | 'medium';
  aiDetected: boolean;
  vehicleCount: number;
  estimatedDelay: string;
}

export const TrafficDashboard = () => {
  const [selectedSignal, setSelectedSignal] = useState<TrafficSignal | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  // Mock data - in real app this would come from API
  const trafficAreas: TrafficArea[] = [
    {
      id: '1',
      name: 'Downtown Business District',
      congestionLevel: 'high',
      signalCount: 12,
      lastUpdated: '2 min ago'
    },
    {
      id: '2',
      name: 'University Avenue',
      congestionLevel: 'medium',
      signalCount: 8,
      lastUpdated: '1 min ago'
    },
    {
      id: '3',
      name: 'Residential North',
      congestionLevel: 'low',
      signalCount: 6,
      lastUpdated: '3 min ago'
    },
    {
      id: '4',
      name: 'Industrial Zone',
      congestionLevel: 'medium',
      signalCount: 4,
      lastUpdated: '1 min ago'
    }
  ];

  const trafficSignals: TrafficSignal[] = [
    {
      id: 'sig-1',
      latitude: 37.7749,
      longitude: -122.4194,
      status: 'green',
      location: 'Main St & 1st Ave',
      isActive: true
    },
    {
      id: 'sig-2',
      latitude: 37.7849,
      longitude: -122.4094,
      status: 'red',
      location: 'Broadway & 2nd St',
      isActive: true
    },
    {
      id: 'sig-3',
      latitude: 37.7649,
      longitude: -122.4294,
      status: 'amber',
      location: 'Central Ave & Oak St',
      isActive: true
    },
    {
      id: 'sig-4',
      latitude: 37.7549,
      longitude: -122.4394,
      status: 'green',
      location: 'Park Blvd & Pine St',
      isActive: false
    }
  ];

  const hotspots: HotspotArea[] = [
    {
      id: 'hot-1',
      name: 'Downtown Intersection',
      latitude: 37.7749,
      longitude: -122.4194,
      severity: 'critical',
      aiDetected: true,
      vehicleCount: 45,
      estimatedDelay: '8-12 min'
    },
    {
      id: 'hot-2',
      name: 'Stadium Exit Route',
      latitude: 37.7649,
      longitude: -122.4294,
      severity: 'high',
      aiDetected: true,
      vehicleCount: 32,
      estimatedDelay: '5-8 min'
    },
    {
      id: 'hot-3',
      name: 'Shopping Center Access',
      latitude: 37.7549,
      longitude: -122.4394,
      severity: 'medium',
      aiDetected: true,
      vehicleCount: 18,
      estimatedDelay: '2-4 min'
    }
  ];

  const handleSignalClick = (signal: TrafficSignal) => {
    setSelectedSignal(signal);
  };

  const handleHotspotClick = (hotspotId: string) => {
    setSelectedHotspot(hotspotId);
    // Find hotspot and center map on it
    const hotspot = hotspots.find(h => h.id === hotspotId);
    if (hotspot) {
      // This would trigger map navigation in a real implementation
      console.log(`Navigating to hotspot: ${hotspot.name}`);
    }
  };

  const handleSignalStatusChange = (signalId: string, newStatus: 'red' | 'amber' | 'green') => {
    // In real app, this would make an API call to control the actual signal
    console.log(`Changing signal ${signalId} to ${newStatus}`);
    setSelectedSignal(prev => 
      prev && prev.id === signalId 
        ? { ...prev, status: newStatus }
        : prev
    );
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard flex">
      {/* Left Sidebar */}
      <div className="w-80 flex-shrink-0">
        <TrafficSidebar
          trafficAreas={trafficAreas}
          hotspots={hotspots}
          onHotspotClick={handleHotspotClick}
          selectedHotspot={selectedHotspot}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="dashboard-card m-4 p-4">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Traffic Management System
          </h1>
          <p className="text-muted-foreground">
            Real-time traffic monitoring and signal control dashboard
          </p>
        </header>

        {/* Map and Control Panel */}
        <div className="flex-1 flex gap-4 m-4">
          {/* Map */}
          <div className="flex-1">
            <TrafficMap
              signals={trafficSignals}
              hotspots={hotspots}
              onSignalClick={handleSignalClick}
              selectedHotspot={selectedHotspot}
            />
          </div>

          {/* Signal Control Panel */}
          {selectedSignal && (
            <div className="w-80">
              <SignalControlPanel
                signal={selectedSignal}
                onStatusChange={handleSignalStatusChange}
                onClose={() => setSelectedSignal(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};