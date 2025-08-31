import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  X, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Users, 
  Zap,
  Settings,
  Bot,
  UserCheck
} from 'lucide-react';
import { HotspotArea } from './TrafficDashboard';

interface HotspotControlPanelProps {
  hotspot: HotspotArea;
  onClose: () => void;
  onUpdateHotspot: (hotspotId: string, updates: Partial<HotspotArea>) => void;
}

export const HotspotControlPanel = ({ hotspot, onClose, onUpdateHotspot }: HotspotControlPanelProps) => {
  const [aiMode, setAiMode] = useState(true);
  const [interventionLevel, setInterventionLevel] = useState([70]);
  const [trafficRedirection, setTrafficRedirection] = useState(false);
  const [signalCoordination, setSignalCoordination] = useState(true);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'medium': return 'text-green-400 bg-green-500/10 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const handleAiModeToggle = (enabled: boolean) => {
    setAiMode(enabled);
    console.log(`AI mode ${enabled ? 'enabled' : 'disabled'} for hotspot ${hotspot.id}`);
  };

  const handleInterventionChange = (value: number[]) => {
    setInterventionLevel(value);
    console.log(`Intervention level set to ${value[0]}% for hotspot ${hotspot.id}`);
  };

  const handleTrafficRedirection = (enabled: boolean) => {
    setTrafficRedirection(enabled);
    console.log(`Traffic redirection ${enabled ? 'enabled' : 'disabled'} for hotspot ${hotspot.id}`);
  };

  const handleSignalCoordination = (enabled: boolean) => {
    setSignalCoordination(enabled);
    console.log(`Signal coordination ${enabled ? 'enabled' : 'disabled'} for hotspot ${hotspot.id}`);
  };

  const handleManualIntervention = () => {
    console.log(`Manual intervention triggered for hotspot ${hotspot.id}`);
    // This would trigger immediate traffic management actions
  };

  return (
    <Card className="dashboard-card h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">AI Hotspot Control</CardTitle>
              <p className="text-sm text-muted-foreground">{hotspot.name}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-6 overflow-y-auto">
        {/* Hotspot Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Location</span>
            </div>
            <span className="text-sm font-medium">{hotspot.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Severity</span>
            </div>
            <Badge variant="outline" className={getSeverityColor(hotspot.severity)}>
              {hotspot.severity.toUpperCase()}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Vehicles</span>
            </div>
            <span className="text-sm font-medium">{hotspot.vehicleCount}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Est. Delay</span>
            </div>
            <span className="text-sm font-medium">{hotspot.estimatedDelay}</span>
          </div>
        </div>

        {/* AI Control Mode */}
        <div className="p-4 bg-muted/30 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              <span className="font-medium">AI Management Mode</span>
            </div>
            <Switch
              checked={aiMode}
              onCheckedChange={handleAiModeToggle}
            />
          </div>
          {aiMode && (
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Zap className="w-3 h-3 text-green-400" />
              AI is actively managing this hotspot
            </div>
          )}
        </div>

        {/* Intervention Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Intervention Threshold</label>
            <span className="text-sm text-muted-foreground">{interventionLevel[0]}%</span>
          </div>
          <Slider
            value={interventionLevel}
            onValueChange={handleInterventionChange}
            max={100}
            min={0}
            step={5}
            className="w-full"
            disabled={!aiMode}
          />
          <p className="text-xs text-muted-foreground">
            AI will intervene when congestion exceeds this threshold
          </p>
        </div>

        {/* Traffic Management Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Management Options
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Traffic Redirection</p>
                <p className="text-xs text-muted-foreground">Redirect traffic to alternate routes</p>
              </div>
              <Switch
                checked={trafficRedirection}
                onCheckedChange={handleTrafficRedirection}
                disabled={!aiMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Signal Coordination</p>
                <p className="text-xs text-muted-foreground">Coordinate nearby traffic signals</p>
              </div>
              <Switch
                checked={signalCoordination}
                onCheckedChange={handleSignalCoordination}
                disabled={!aiMode}
              />
            </div>
          </div>
        </div>

        {/* Congestion Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Congestion</span>
            <span className="text-sm text-muted-foreground">
              {hotspot.severity === 'critical' ? '85%' : hotspot.severity === 'high' ? '72%' : '58%'}
            </span>
          </div>
          <Progress 
            value={hotspot.severity === 'critical' ? 85 : hotspot.severity === 'high' ? 72 : 58}
            className="h-3"
          />
        </div>

        {/* Manual Override */}
        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span className="font-medium text-sm">Manual Override</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Take immediate manual control of this hotspot area
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleManualIntervention}
            className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
          >
            Trigger Manual Intervention
          </Button>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <div className="text-lg font-bold text-foreground">24</div>
            <div className="text-xs text-muted-foreground">Nearby Signals</div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <div className="text-lg font-bold text-green-400">2.1s</div>
            <div className="text-xs text-muted-foreground">Response Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};