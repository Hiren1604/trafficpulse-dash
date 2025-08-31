import { useState } from 'react';
import { TrafficSidebar } from './TrafficSidebar';
import { TrafficMap } from './TrafficMap';
import { SignalControlPanel } from './SignalControlPanel';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { Button } from '@/components/ui/button';
import { BarChart3, Map, Activity } from 'lucide-react';

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
  const [activeView, setActiveView] = useState<'map' | 'analytics'>('map');

  // Mock data with Indian locations - in real app this would come from API
  const trafficAreas: TrafficArea[] = [
    {
      id: '1',
      name: 'Connaught Place',
      congestionLevel: 'high',
      signalCount: 12,
      lastUpdated: '2 min ago'
    },
    {
      id: '2',
      name: 'Karol Bagh Junction',
      congestionLevel: 'medium',
      signalCount: 8,
      lastUpdated: '1 min ago'
    },
    {
      id: '3',
      name: 'ITO Intersection',
      congestionLevel: 'low',
      signalCount: 6,
      lastUpdated: '3 min ago'
    },
    {
      id: '4',
      name: 'AIIMS Flyover',
      congestionLevel: 'medium',
      signalCount: 4,
      lastUpdated: '1 min ago'
    }
  ];

  const trafficSignals: TrafficSignal[] = [
    {
      id: 'DL-001',
      latitude: 28.6321,
      longitude: 77.2194,
      status: 'green',
      location: 'CP Central Circle',
      isActive: true
    },
    {
      id: 'DL-002',
      latitude: 28.6139,
      longitude: 77.2090,
      status: 'red',
      location: 'India Gate Circle',
      isActive: true
    },
    {
      id: 'DL-003',
      latitude: 28.6252,
      longitude: 77.2065,
      status: 'amber',
      location: 'Khan Market Junction',
      isActive: true
    },
    {
      id: 'DL-004',
      latitude: 28.5494,
      longitude: 77.2500,
      status: 'green',
      location: 'Saket Metro Station',
      isActive: true
    },
    {
      id: 'DL-005',
      latitude: 28.6304,
      longitude: 77.2177,
      status: 'red',
      location: 'Rajiv Chowk Metro',
      isActive: false
    },
    {
      id: 'DL-006',
      latitude: 28.5355,
      longitude: 77.3910,
      status: 'green',
      location: 'Noida Sector 18',
      isActive: true
    }
  ];

  const hotspots: HotspotArea[] = [
    {
      id: 'hot-1',
      name: 'ITO Traffic Junction',
      latitude: 28.6289,
      longitude: 77.2065,
      severity: 'critical',
      aiDetected: true,
      vehicleCount: 145,
      estimatedDelay: '12-18 min'
    },
    {
      id: 'hot-2',
      name: 'AIIMS Flyover Exit',
      latitude: 28.5672,
      longitude: 77.2100,
      severity: 'high',
      aiDetected: true,
      vehicleCount: 98,
      estimatedDelay: '8-12 min'
    },
    {
      id: 'hot-3',
      name: 'Lajpat Nagar Market',
      latitude: 28.5675,
      longitude: 77.2434,
      severity: 'medium',
      aiDetected: true,
      vehicleCount: 67,
      estimatedDelay: '4-6 min'
    },
    {
      id: 'hot-4',
      name: 'Nehru Place Metro',
      latitude: 28.5494,
      longitude: 77.2519,
      severity: 'high',
      aiDetected: true,
      vehicleCount: 89,
      estimatedDelay: '6-10 min'
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Traffic Management System - Delhi NCR
              </h1>
              <p className="text-muted-foreground">
                Real-time traffic monitoring and signal control dashboard
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-lg">
              <Button
                variant={activeView === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('map')}
                className="h-8 px-3 text-xs"
              >
                <Map className="w-3 h-3 mr-1" />
                Map View
              </Button>
              <Button
                variant={activeView === 'analytics' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('analytics')}
                className="h-8 px-3 text-xs"
              >
                <BarChart3 className="w-3 h-3 mr-1" />
                Analytics
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-4 m-4">
          {/* Map or Analytics */}
          <div className="flex-1">
            {activeView === 'map' ? (
              <TrafficMap
                signals={trafficSignals}
                hotspots={hotspots}
                onSignalClick={handleSignalClick}
                selectedHotspot={selectedHotspot}
              />
            ) : (
              <div className="h-full dashboard-card p-6">
                <AnalyticsDashboard />
              </div>
            )}
          </div>

          {/* Right Sidebar - Signal Control Panel only */}
          {activeView === 'map' && selectedSignal && (
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