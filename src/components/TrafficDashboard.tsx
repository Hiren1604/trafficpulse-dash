import { useState } from 'react';
import { TrafficSidebar } from './TrafficSidebar';
import { TrafficMap } from './TrafficMap';
import { SignalControlPanel } from './SignalControlPanel';
import { HotspotControlPanel } from './HotspotControlPanel';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { SystemSettings } from './SystemSettings';
import { Button } from '@/components/ui/button';
import { BarChart3, Map, Activity, Settings } from 'lucide-react';

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
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotArea | null>(null);
  const [activeView, setActiveView] = useState<'map' | 'analytics' | 'settings'>('map');
  const [showSignalControl, setShowSignalControl] = useState(false);

  // Mock data with Odisha locations - in real app this would come from API
  const trafficAreas: TrafficArea[] = [
    {
      id: '1',
      name: 'Bhubaneswar Airport',
      congestionLevel: 'high',
      signalCount: 12,
      lastUpdated: '2 min ago'
    },
    {
      id: '2',
      name: 'Kalinga Stadium',
      congestionLevel: 'medium',
      signalCount: 8,
      lastUpdated: '1 min ago'
    },
    {
      id: '3',
      name: 'Patia Square',
      congestionLevel: 'low',
      signalCount: 6,
      lastUpdated: '3 min ago'
    },
    {
      id: '4',
      name: 'Jaydev Vihar',
      congestionLevel: 'medium',
      signalCount: 4,
      lastUpdated: '1 min ago'
    }
  ];

  const trafficSignals: TrafficSignal[] = [
    {
      id: 'OD-001',
      latitude: 20.2961,
      longitude: 85.8245,
      status: 'green',
      location: 'Bhubaneswar Airport',
      isActive: true
    },
    {
      id: 'OD-002',
      latitude: 20.2700,
      longitude: 85.8312,
      status: 'red',
      location: 'Kalinga Stadium',
      isActive: true
    },
    {
      id: 'OD-003',
      latitude: 20.3587,
      longitude: 85.8171,
      status: 'amber',
      location: 'Patia Square',
      isActive: true
    },
    {
      id: 'OD-004',
      latitude: 20.3019,
      longitude: 85.8449,
      status: 'green',
      location: 'Jaydev Vihar',
      isActive: true
    },
    {
      id: 'OD-005',
      latitude: 20.2700,
      longitude: 85.8400,
      status: 'red',
      location: 'Saheed Nagar',
      isActive: false
    },
    {
      id: 'OD-006',
      latitude: 20.2506,
      longitude: 85.8472,
      status: 'green',
      location: 'Nayapalli',
      isActive: true
    }
  ];

  const hotspots: HotspotArea[] = [
    {
      id: 'hot-1',
      name: 'Airport Square Junction',
      latitude: 20.2961,
      longitude: 85.8245,
      severity: 'critical',
      aiDetected: true,
      vehicleCount: 145,
      estimatedDelay: '12-18 min'
    },
    {
      id: 'hot-2',
      name: 'Kalinga Hospital Circle',
      latitude: 20.2700,
      longitude: 85.8312,
      severity: 'high',
      aiDetected: true,
      vehicleCount: 98,
      estimatedDelay: '8-12 min'
    },
    {
      id: 'hot-3',
      name: 'Patia Crossing',
      latitude: 20.3587,
      longitude: 85.8171,
      severity: 'medium',
      aiDetected: true,
      vehicleCount: 67,
      estimatedDelay: '4-6 min'
    },
    {
      id: 'hot-4',
      name: 'Jaydev Vihar Metro',
      latitude: 20.3019,
      longitude: 85.8449,
      severity: 'high',
      aiDetected: true,
      vehicleCount: 89,
      estimatedDelay: '6-10 min'
    }
  ];

  const handleSignalClick = (signal: TrafficSignal) => {
    setSelectedSignal(signal);
    setSelectedHotspot(null); // Clear hotspot selection
  };

  const handleHotspotClick = (hotspotId: string) => {
    const hotspot = hotspots.find(h => h.id === hotspotId);
    if (hotspot) {
      setSelectedHotspot(hotspot);
      setSelectedSignal(null); // Clear signal selection
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

  const handleHotspotUpdate = (hotspotId: string, updates: Partial<HotspotArea>) => {
    // In real app, this would make an API call to update hotspot settings
    console.log(`Updating hotspot ${hotspotId}:`, updates);
    if (selectedHotspot && selectedHotspot.id === hotspotId) {
      setSelectedHotspot(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const handleOpenSignalControl = (hotspotId: string) => {
    // Find a signal near the hotspot for timer configuration
    const hotspot = hotspots.find(h => h.id === hotspotId);
    if (hotspot) {
      // Find the closest signal to the hotspot
      const closestSignal = trafficSignals.find(signal => 
        Math.abs(signal.latitude - hotspot.latitude) < 0.01 && 
        Math.abs(signal.longitude - hotspot.longitude) < 0.01
      ) || trafficSignals[0]; // Fallback to first signal
      
      setSelectedSignal(closestSignal);
      setShowSignalControl(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard flex">
      {/* Left Sidebar */}
      <div className="w-80 flex-shrink-0">
        <TrafficSidebar
          trafficAreas={trafficAreas}
          hotspots={hotspots}
          onHotspotClick={handleHotspotClick}
          selectedHotspot={selectedHotspot?.id || null}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="dashboard-card m-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Traffic Management System - Bhubaneswar, Odisha
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
              <Button
                variant={activeView === 'settings' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('settings')}
                className="h-8 px-3 text-xs"
              >
                <Settings className="w-3 h-3 mr-1" />
                Settings
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-4 m-4">
          {/* Map, Analytics, or Settings */}
          <div className="flex-1">
            {activeView === 'map' ? (
              <TrafficMap
                signals={trafficSignals}
                hotspots={hotspots}
                onSignalClick={handleSignalClick}
                onHotspotClick={(hotspot) => setSelectedHotspot(hotspot)}
                selectedHotspot={selectedHotspot?.id || null}
              />
            ) : activeView === 'analytics' ? (
              <div className="h-full dashboard-card p-6">
                <AnalyticsDashboard />
              </div>
            ) : (
              <SystemSettings />
            )}
          </div>

          {/* Right Sidebar - Control Panels */}
          {activeView === 'map' && selectedSignal && (
            <div className="w-80">
              <SignalControlPanel
                signal={selectedSignal}
                onStatusChange={handleSignalStatusChange}
                onClose={() => setSelectedSignal(null)}
              />
            </div>
          )}

          {activeView === 'map' && selectedHotspot && !showSignalControl && (
            <div className="w-80">
              <HotspotControlPanel
                hotspot={selectedHotspot}
                onUpdateHotspot={handleHotspotUpdate}
                onClose={() => setSelectedHotspot(null)}
                onOpenSignalControl={handleOpenSignalControl}
              />
            </div>
          )}

          {activeView === 'map' && showSignalControl && selectedSignal && (
            <div className="w-80">
              <SignalControlPanel
                signal={selectedSignal}
                onStatusChange={handleSignalStatusChange}
                onClose={() => {
                  setShowSignalControl(false);
                  setSelectedSignal(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};