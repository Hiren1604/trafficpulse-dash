import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  MapPin, 
  Clock, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Circle
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

        {/* Signal Control Buttons */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Manual Control
          </h4>
          
          <div className="grid gap-3">
            <Button
              onClick={() => handleStatusChange('red')}
              disabled={isChanging || signal.status === 'red' || !signal.isActive}
              variant="outline"
              className={cn(
                "h-12 justify-start text-left transition-all duration-200",
                signal.status === 'red' 
                  ? "border-red-500/50 bg-red-500/10 text-red-400" 
                  : "hover:border-red-500/30 hover:bg-red-500/5"
              )}
            >
              <div className="w-6 h-6 bg-gradient-traffic-red rounded-full mr-3 shadow-glow-red" />
              <div>
                <div className="font-medium">Red Light</div>
                <div className="text-xs text-muted-foreground">Stop all traffic</div>
              </div>
            </Button>

            <Button
              onClick={() => handleStatusChange('amber')}
              disabled={isChanging || signal.status === 'amber' || !signal.isActive}
              variant="outline"
              className={cn(
                "h-12 justify-start text-left transition-all duration-200",
                signal.status === 'amber' 
                  ? "border-amber-500/50 bg-amber-500/10 text-amber-400" 
                  : "hover:border-amber-500/30 hover:bg-amber-500/5"
              )}
            >
              <div className="w-6 h-6 bg-gradient-traffic-amber rounded-full mr-3 shadow-glow-amber" />
              <div>
                <div className="font-medium">Amber Light</div>
                <div className="text-xs text-muted-foreground">Prepare to stop</div>
              </div>
            </Button>

            <Button
              onClick={() => handleStatusChange('green')}
              disabled={isChanging || signal.status === 'green' || !signal.isActive}
              variant="outline"
              className={cn(
                "h-12 justify-start text-left transition-all duration-200",
                signal.status === 'green' 
                  ? "border-green-500/50 bg-green-500/10 text-green-400" 
                  : "hover:border-green-500/30 hover:bg-green-500/5"
              )}
            >
              <div className="w-6 h-6 bg-gradient-traffic-green rounded-full mr-3 shadow-glow-green" />
              <div>
                <div className="font-medium">Green Light</div>
                <div className="text-xs text-muted-foreground">Allow traffic flow</div>
              </div>
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

          {!signal.isActive && (
            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-2" />
              <div className="text-sm text-red-400 font-medium">
                Signal Offline
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Manual control is not available
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