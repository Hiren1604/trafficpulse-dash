import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TrafficSignal, HotspotArea } from './TrafficDashboard';

// Fix default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface TrafficMapProps {
  signals: TrafficSignal[];
  hotspots: HotspotArea[];
  onSignalClick: (signal: TrafficSignal) => void;
  selectedHotspot: string | null;
}

export const TrafficMap = ({ signals, hotspots, onSignalClick, selectedHotspot }: TrafficMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const signalMarkers = useRef<Map<string, L.Marker>>(new Map());
  const hotspotMarkers = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current, {
      center: [28.6139, 77.2090], // New Delhi, India
      zoom: 11,
      zoomControl: false
    });

    // Add zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(map.current);

    // Add OpenStreetMap tiles (completely free!)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map.current);

    // Create custom icons for traffic signals
    const createSignalIcon = (status: 'red' | 'amber' | 'green', isActive: boolean) => {
      const color = status === 'red' ? '#ef4444' : status === 'amber' ? '#f59e0b' : '#10b981';
      const opacity = isActive ? 1 : 0.5;
      
      return L.divIcon({
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background: ${color};
            border: 2px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(0,0,0,0.3), 0 0 20px ${color}80;
            opacity: ${opacity};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: rgba(255,255,255,0.9);
              border-radius: 50%;
            "></div>
          </div>
        `,
        className: 'traffic-signal-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
    };

    // Create custom icon for hotspots
    const createHotspotIcon = (severity: 'critical' | 'high' | 'medium') => {
      const color = severity === 'critical' ? '#dc2626' : severity === 'high' ? '#ea580c' : '#d97706';
      
      return L.divIcon({
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background: ${color};
            border: 2px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 0 15px ${color}80;
            animation: pulse 2s infinite;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 6px;
              height: 6px;
              background: #ffffff;
              border-radius: 50%;
            "></div>
          </div>
          <style>
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.7; }
            }
          </style>
        `,
        className: 'hotspot-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
    };

    // Add traffic signals to map
    signals.forEach((signal) => {
      const marker = L.marker([signal.latitude, signal.longitude], {
        icon: createSignalIcon(signal.status, signal.isActive)
      }).addTo(map.current!);

      marker.bindPopup(`
        <div style="font-family: system-ui; padding: 8px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${signal.location}</h3>
          <p style="margin: 4px 0; font-size: 12px; color: #666;">
            Status: <span style="text-transform: capitalize; font-weight: 500;">${signal.status}</span>
          </p>
          <p style="margin: 4px 0; font-size: 12px; color: #666;">Click to control</p>
        </div>
      `);

      marker.on('click', () => {
        onSignalClick(signal);
      });

      signalMarkers.current.set(signal.id, marker);
    });

    // Add hotspot areas to map
    hotspots.forEach((hotspot) => {
      const marker = L.marker([hotspot.latitude, hotspot.longitude], {
        icon: createHotspotIcon(hotspot.severity)
      }).addTo(map.current!);

      marker.bindPopup(`
        <div style="font-family: system-ui; padding: 12px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${hotspot.name}</h3>
          <p style="margin: 4px 0; font-size: 12px; color: #666;">
            Severity: <span style="text-transform: capitalize; color: #dc2626; font-weight: 500;">${hotspot.severity}</span>
          </p>
          <p style="margin: 4px 0; font-size: 12px; color: #666;">Vehicles: ${hotspot.vehicleCount}</p>
          <p style="margin: 4px 0; font-size: 12px; color: #666;">Estimated Delay: ${hotspot.estimatedDelay}</p>
          <div style="
            margin-top: 8px;
            padding: 4px 8px;
            background: rgba(220, 38, 38, 0.1);
            border: 1px solid rgba(220, 38, 38, 0.2);
            border-radius: 4px;
            font-size: 11px;
            color: #dc2626;
          ">
            AI Detected Congestion
          </div>
        </div>
      `);

      hotspotMarkers.current.set(hotspot.id, marker);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      signalMarkers.current.clear();
      hotspotMarkers.current.clear();
    };
  }, [signals, hotspots, onSignalClick]);

  // Handle hotspot selection
  useEffect(() => {
    if (selectedHotspot && map.current) {
      const hotspot = hotspots.find(h => h.id === selectedHotspot);
      if (hotspot) {
        map.current.flyTo([hotspot.latitude, hotspot.longitude], 15, {
          duration: 2
        });
        
        // Open popup for selected hotspot
        const marker = hotspotMarkers.current.get(selectedHotspot);
        if (marker) {
          marker.openPopup();
        }
      }
    }
  }, [selectedHotspot, hotspots]);

  return (
    <div className="h-full relative">
      <div ref={mapContainer} className="map-container h-full w-full" />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 dashboard-card p-4 max-w-xs">
        <h4 className="font-semibold text-sm mb-3">Map Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div style={{
              width: '16px',
              height: '16px',
              background: '#ef4444',
              border: '2px solid #ffffff',
              borderRadius: '50%',
              boxShadow: '0 0 8px #ef444480'
            }}></div>
            <span>Red Signal</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{
              width: '16px',
              height: '16px',
              background: '#f59e0b',
              border: '2px solid #ffffff',
              borderRadius: '50%',
              boxShadow: '0 0 8px #f59e0b80'
            }}></div>
            <span>Amber Signal</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{
              width: '16px',
              height: '16px',
              background: '#10b981',
              border: '2px solid #ffffff',
              borderRadius: '50%',
              boxShadow: '0 0 8px #10b98180'
            }}></div>
            <span>Green Signal</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{
              width: '14px',
              height: '14px',
              background: '#dc2626',
              border: '2px solid #ffffff',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
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

      {/* Map Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-black/50 px-2 py-1 rounded">
        Free OpenStreetMap
      </div>
    </div>
  );
};