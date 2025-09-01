import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, MapPin, AlertTriangle, Activity, Search, Bot, User } from 'lucide-react';
import { TrafficArea, HotspotArea } from './TrafficDashboard';
import { cn } from '@/lib/utils';

interface TrafficSidebarProps {
  trafficAreas: TrafficArea[];
  hotspots: HotspotArea[];
  onHotspotClick: (hotspotId: string) => void;
  selectedHotspot: string | null;
}

export const TrafficSidebar = ({
  trafficAreas,
  hotspots,
  onHotspotClick,
  selectedHotspot
}: TrafficSidebarProps) => {
  const [hotspotSearch, setHotspotSearch] = useState('');
  const [areaSearch, setAreaSearch] = useState('');
  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'high': return 'status-high';
      case 'medium': return 'status-medium';
      case 'low': return 'status-low';
      default: return 'status-normal';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'traffic-red';
      case 'high': return 'traffic-amber';
      case 'medium': return 'traffic-green';
      default: return 'status-normal';
    }
  };

  // Filter functions
  const filteredHotspots = hotspots.filter(hotspot =>
    hotspot.name.toLowerCase().includes(hotspotSearch.toLowerCase())
  );

  const filteredAreas = trafficAreas.filter(area =>
    area.name.toLowerCase().includes(areaSearch.toLowerCase())
  );

  return (
    <div className="h-screen bg-card/50 backdrop-blur-sm border-r border-border/50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Traffic Control
        </h2>
        <p className="text-sm text-muted-foreground">Real-time monitoring</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* AI Hotspots - Moved above Traffic Areas */}
          <Card className="dashboard-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                AI Detected Hotspots
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search hotspots..."
                  value={hotspotSearch}
                  onChange={(e) => setHotspotSearch(e.target.value)}
                  className="pl-10 h-8 text-sm"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredHotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  onClick={() => onHotspotClick(hotspot.id)}
                  className={cn(
                    "p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:scale-[1.02]",
                    selectedHotspot === hotspot.id
                      ? "hotspot-indicator border-red-500/50 bg-red-500/10"
                      : "bg-muted/30 border-border/30 hover:bg-muted/50 hover:border-red-500/30"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground leading-tight">
                      {hotspot.name}
                    </h4>
                    <div className={cn("status-indicator animate-pulse-glow", getSeverityColor(hotspot.severity))} />
                  </div>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Vehicles: {hotspot.vehicleCount}</span>
                      <span>Delay: {hotspot.estimatedDelay}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs capitalize",
                        hotspot.severity === 'critical' && "border-red-500/30 text-red-400 bg-red-500/10",
                        hotspot.severity === 'high' && "border-amber-500/30 text-amber-400 bg-amber-500/10",
                        hotspot.severity === 'medium' && "border-green-500/30 text-green-400 bg-green-500/10"
                      )}
                    >
                      {hotspot.severity}
                    </Badge>
                    
                    {hotspot.aiDetected && (
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/30">
                        AI Detected
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Traffic Areas - Moved below AI Hotspots */}
          <Card className="dashboard-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Traffic Areas
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search areas..."
                  value={areaSearch}
                  onChange={(e) => setAreaSearch(e.target.value)}
                  className="pl-10 h-8 text-sm"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredAreas.map((area) => (
                <div
                  key={area.id}
                  className="p-3 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground leading-tight">
                      {area.name}
                    </h4>
                    <div className={cn("status-indicator", getCongestionColor(area.congestionLevel))} />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {area.signalCount} signals
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {area.lastUpdated}
                    </span>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "mt-2 text-xs capitalize",
                      area.congestionLevel === 'high' && "border-red-500/30 text-red-400",
                      area.congestionLevel === 'medium' && "border-amber-500/30 text-amber-400",
                      area.congestionLevel === 'low' && "border-green-500/30 text-green-400"
                    )}
                  >
                    {area.congestionLevel} congestion
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="dashboard-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-muted-foreground">Active Signals</span>
                </div>
                <span className="text-sm font-medium text-green-400">24/28</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-muted-foreground">Signals in AI Mode</span>
                </div>
                <span className="text-sm font-medium text-blue-400">18</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-muted-foreground">Manual Intervention</span>
                </div>
                <span className="text-sm font-medium text-amber-400">6</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};