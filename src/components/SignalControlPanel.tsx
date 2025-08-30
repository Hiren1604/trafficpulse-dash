import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  X, 
  MapPin, 
  Clock, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Circle,
  Timer,
  Play,
  Pause
} from 'lucide-react';
import { TrafficSignal } from './TrafficDashboard';
import { cn } from '@/lib/utils';

interface SignalControlPanelProps {
  signal: TrafficSignal;
  onStatusChange: (signalId: string, status: 'red' | 'amber' | 'green') => void;
  onClose: () => void;
}

export const SignalControlPanel = ({ 
  signal, 
  onStatusChange, 
  onClose 
}: SignalControlPanelProps) => {
  const [isChanging, setIsChanging] = useState(false);
  const [timers, setTimers] = useState({
    red: 30,
    amber: 5,
    green: 25
  });
  const [autoMode, setAutoMode] = useState(true);
  const [currentTimer, setCurrentTimer] = useState(15);

  const handleStatusChange = async (newStatus: 'red' | 'amber' | 'green') => {
    setIsChanging(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onStatusChange(signal.id, newStatus);
    setIsChanging(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'red': return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'amber': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'green': return 'text-green-400 border-green-500/30 bg-green-500/10';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="dashboard-card h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Signal Control
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Remote signal management
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Signal Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{signal.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Circle className="w-4 h-4 text-muted-foreground" />
            <span>Signal ID: {signal.id}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Status:</span>
            <Badge 
              variant="outline" 
              className={cn(
                "capitalize font-medium",
                getStatusColor(signal.status)
              )}
            >
              <div className={cn(
                "w-2 h-2 rounded-full mr-2",
                signal.status === 'red' && "bg-red-500",
                signal.status === 'amber' && "bg-amber-500",
                signal.status === 'green' && "bg-green-500"
              )} />
              {signal.status}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Signal Status:</span>
            <Badge 
              variant={signal.isActive ? "default" : "secondary"}
              className="text-xs"
            >
              {signal.isActive ? (
                <><CheckCircle className="w-3 h-3 mr-1" />Active</>
              ) : (
                <><AlertTriangle className="w-3 h-3 mr-1" />Inactive</>
              )}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Timer Configuration */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Timer className="w-4 h-4" />
            Timer Configuration
          </h4>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label htmlFor="red-timer" className="text-xs text-red-400">Red (sec)</Label>
                <Input
                  id="red-timer"
                  type="number"
                  value={timers.red}
                  onChange={(e) => setTimers(prev => ({ ...prev, red: parseInt(e.target.value) || 0 }))}
                  className="h-8 text-xs"
                  min="5"
                  max="120"
                  disabled={autoMode}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="amber-timer" className="text-xs text-amber-400">Amber (sec)</Label>
                <Input
                  id="amber-timer"
                  type="number"
                  value={timers.amber}
                  onChange={(e) => setTimers(prev => ({ ...prev, amber: parseInt(e.target.value) || 0 }))}
                  className="h-8 text-xs"
                  min="3"
                  max="10"
                  disabled={autoMode}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="green-timer" className="text-xs text-green-400">Green (sec)</Label>
                <Input
                  id="green-timer"
                  type="number"
                  value={timers.green}
                  onChange={(e) => setTimers(prev => ({ ...prev, green: parseInt(e.target.value) || 0 }))}
                  className="h-8 text-xs"
                  min="10"
                  max="180"
                  disabled={autoMode}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  autoMode ? "bg-green-500 animate-pulse" : "bg-muted"
                )} />
                <span className="text-sm font-medium">Auto Cycle Mode</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoMode(!autoMode)}
                className={cn(
                  "h-7 px-2 text-xs",
                  autoMode ? "bg-green-500/10 text-green-400 border-green-500/30" : ""
                )}
              >
                {autoMode ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                {autoMode ? 'Pause' : 'Start'}
              </Button>
            </div>

            {autoMode && (
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">Current Cycle</span>
                  <span className="text-xs text-muted-foreground">
                    {currentTimer}s remaining
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000",
                      signal.status === 'red' && "bg-gradient-traffic-red",
                      signal.status === 'amber' && "bg-gradient-traffic-amber",
                      signal.status === 'green' && "bg-gradient-traffic-green"
                    )}
                    style={{ 
                      width: `${(currentTimer / timers[signal.status]) * 100}%` 
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Signal Control Buttons */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Manual Control
          </h4>
          
          <div className="grid gap-3">
            <Button
              onClick={() => handleStatusChange('red')}
              disabled={isChanging || signal.status === 'red' || !signal.isActive || autoMode}
              variant="outline"
              className={cn(
                "h-12 justify-start text-left transition-all duration-200",
                signal.status === 'red' 
                  ? "border-red-500/50 bg-red-500/10 text-red-400" 
                  : "hover:border-red-500/30 hover:bg-red-500/5"
              )}
            >
              <div className="w-6 h-6 bg-gradient-traffic-red rounded-full mr-3 shadow-glow-red" />
              <div className="flex-1">
                <div className="font-medium">Red Light</div>
                <div className="text-xs text-muted-foreground">Stop all traffic • {timers.red}s</div>
              </div>
              {signal.status === 'red' && (
                <div className="text-xs font-mono text-red-400">
                  {currentTimer}s
                </div>
              )}
            </Button>

            <Button
              onClick={() => handleStatusChange('amber')}
              disabled={isChanging || signal.status === 'amber' || !signal.isActive || autoMode}
              variant="outline"
              className={cn(
                "h-12 justify-start text-left transition-all duration-200",
                signal.status === 'amber' 
                  ? "border-amber-500/50 bg-amber-500/10 text-amber-400" 
                  : "hover:border-amber-500/30 hover:bg-amber-500/5"
              )}
            >
              <div className="w-6 h-6 bg-gradient-traffic-amber rounded-full mr-3 shadow-glow-amber" />
              <div className="flex-1">
                <div className="font-medium">Amber Light</div>
                <div className="text-xs text-muted-foreground">Prepare to stop • {timers.amber}s</div>
              </div>
              {signal.status === 'amber' && (
                <div className="text-xs font-mono text-amber-400">
                  {currentTimer}s
                </div>
              )}
            </Button>

            <Button
              onClick={() => handleStatusChange('green')}
              disabled={isChanging || signal.status === 'green' || !signal.isActive || autoMode}
              variant="outline"
              className={cn(
                "h-12 justify-start text-left transition-all duration-200",
                signal.status === 'green' 
                  ? "border-green-500/50 bg-green-500/10 text-green-400" 
                  : "hover:border-green-500/30 hover:bg-green-500/5"
              )}
            >
              <div className="w-6 h-6 bg-gradient-traffic-green rounded-full mr-3 shadow-glow-green" />
              <div className="flex-1">
                <div className="font-medium">Green Light</div>
                <div className="text-xs text-muted-foreground">Allow traffic flow • {timers.green}s</div>
              </div>
              {signal.status === 'green' && (
                <div className="text-xs font-mono text-green-400">
                  {currentTimer}s
                </div>
              )}
            </Button>
          </div>

          {isChanging && (
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
              <div className="text-sm text-primary font-medium">
                Updating signal status...
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Please wait for confirmation
              </div>
            </div>
          )}

          {autoMode && (
            <div className="text-center p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
              <Timer className="w-5 h-5 text-amber-400 mx-auto mb-2" />
              <div className="text-sm text-amber-400 font-medium">
                Auto Cycle Active
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Manual controls disabled during auto cycle
              </div>
            </div>
          )}

          {!signal.isActive && (
            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-2" />
              <div className="text-sm text-red-400 font-medium">
                Signal Offline
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Control panel is not available
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Additional Information */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Last Updated:</span>
            <span>Just now</span>
          </div>
          <div className="flex justify-between">
            <span>Response Time:</span>
            <span>~2-3 seconds</span>
          </div>
          <div className="flex justify-between">
            <span>Coordinates:</span>
            <span>{signal.latitude.toFixed(4)}, {signal.longitude.toFixed(4)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};