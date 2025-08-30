import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { TrafficSignal, HotspotArea } from './TrafficDashboard';

interface TrafficMapProps {
  signals: TrafficSignal[];
  hotspots: HotspotArea[];
  onSignalClick: (signal: TrafficSignal) => void;
  selectedHotspot: string | null;
}

export const TrafficMap = ({ signals, hotspots, onSignalClick, selectedHotspot }: TrafficMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [mapInitialized, setMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-122.4194, 37.7749], // San Francisco
        zoom: 12,
        pitch: 45,
        bearing: 0
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        if (!map.current) return;

        // Add traffic signals
        signals.forEach((signal) => {
          const el = document.createElement('div');
          el.className = `traffic-signal traffic-signal-${signal.status} ${signal.isActive ? 'active' : ''}`;
          el.style.cursor = 'pointer';
          
          const marker = new mapboxgl.Marker(el)
            .setLngLat([signal.longitude, signal.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<div class="p-2">
                  <h3 class="font-semibold text-sm">${signal.location}</h3>
                  <p class="text-xs text-muted-foreground mt-1">Status: <span class="capitalize">${signal.status}</span></p>
                  <p class="text-xs text-muted-foreground">Click to control</p>
                </div>`
              )
            )
            .addTo(map.current);

          el.addEventListener('click', () => {
            onSignalClick(signal);
          });
        });

        // Add hotspot areas
        hotspots.forEach((hotspot) => {
          const el = document.createElement('div');
          el.className = 'relative';
          el.innerHTML = `
            <div class="w-6 h-6 bg-red-500/80 rounded-full animate-pulse-glow border-2 border-red-300 cursor-pointer flex items-center justify-center">
              <div class="w-2 h-2 bg-red-200 rounded-full"></div>
            </div>
          `;

          new mapboxgl.Marker(el)
            .setLngLat([hotspot.longitude, hotspot.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<div class="p-3">
                  <h3 class="font-semibold text-sm">${hotspot.name}</h3>
                  <p class="text-xs text-muted-foreground mt-1">Severity: <span class="capitalize text-red-400">${hotspot.severity}</span></p>
                  <p class="text-xs text-muted-foreground">Vehicles: ${hotspot.vehicleCount}</p>
                  <p class="text-xs text-muted-foreground">Estimated Delay: ${hotspot.estimatedDelay}</p>
                  <div class="mt-2 px-2 py-1 bg-red-500/20 rounded text-xs text-red-300 border border-red-500/30">
                    AI Detected Congestion
                  </div>
                </div>`
              )
            )
            .addTo(map.current);
        });

        setMapInitialized(true);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setShowTokenInput(true);
      });

    } catch (error) {
      console.error('Mapbox initialization error:', error);
      setShowTokenInput(true);
    }
  };

  useEffect(() => {
    if (selectedHotspot && map.current && mapInitialized) {
      const hotspot = hotspots.find(h => h.id === selectedHotspot);
      if (hotspot) {
        map.current.flyTo({
          center: [hotspot.longitude, hotspot.latitude],
          zoom: 15,
          duration: 2000
        });
      }
    }
  }, [selectedHotspot, hotspots, mapInitialized]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap();
    }
  };

  if (showTokenInput) {
    return (
      <Card className="dashboard-card h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
          <p className="text-muted-foreground text-sm mb-6">
            To display the interactive map, please enter your Mapbox public token. 
            You can get one from{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTokenSubmit()}
            />
            <Button onClick={handleTokenSubmit} className="w-full">
              Initialize Map
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="h-full relative">
      <div ref={mapContainer} className="map-container h-full w-full" />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 dashboard-card p-4 max-w-xs">
        <h4 className="font-semibold text-sm mb-3">Map Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="traffic-signal traffic-signal-red active"></div>
            <span>Red Signal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="traffic-signal traffic-signal-amber active"></div>
            <span>Amber Signal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="traffic-signal traffic-signal-green active"></div>
            <span>Green Signal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/80 rounded-full animate-pulse border border-red-300"></div>
            <span>AI Hotspot</span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 right-4 dashboard-card p-2 px-4">
        <div className="flex items-center gap-2">
          <div className="status-indicator bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium">Live Tracking</span>
        </div>
      </div>
    </div>
  );
};