import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Bot, 
  UserCheck, 
  Zap, 
  Clock, 
  AlertTriangle,
  Activity,
  Shield,
  Database,
  Wifi,
  Bell
} from 'lucide-react';

export const SystemSettings = () => {
  const [systemMode, setSystemMode] = useState<'manual'>('manual');
  const [aiAggressiveness, setAiAggressiveness] = useState([75]);
  const [autoIntervention, setAutoIntervention] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  const [emergencyOverride, setEmergencyOverride] = useState(true);
  const [congestionThreshold, setCongestionThreshold] = useState([80]);
  const [responseTime, setResponseTime] = useState('normal');

  const handleSystemModeChange = (mode: 'manual') => {
    setSystemMode(mode);
    console.log(`System mode changed to: ${mode}`);
  };

  const handleAiAggresiveness = (value: number[]) => {
    setAiAggressiveness(value);
    console.log(`AI aggressiveness set to: ${value[0]}%`);
  };

  const handleCongestionThreshold = (value: number[]) => {
    setCongestionThreshold(value);
    console.log(`Congestion threshold set to: ${value[0]}%`);
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'ai': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'manual': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'hybrid': return 'text-green-400 bg-green-500/10 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg flex flex-col overflow-hidden relative z-10">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          System Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Configure traffic management system</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Operation Mode */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Operation Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Button
                variant="default"
                className="h-auto p-6 flex flex-col items-center gap-3 min-w-[200px]"
              >
                <UserCheck className="w-8 h-8" />
                <div className="text-center">
                  <div className="font-medium text-lg">Manual Control</div>
                  <div className="text-sm opacity-80">Human supervised system</div>
                </div>
              </Button>
            </div>
            
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Current Mode</span>
                <Badge variant="outline" className={getModeColor(systemMode)}>
                  {systemMode.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Traffic authorities have full manual control over all systems with AI-powered insights and recommendations
              </p>
            </div>
          </CardContent>
        </Card>


        {/* System Controls */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              System Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Emergency Override</p>
                <p className="text-xs text-muted-foreground">Enable emergency manual override</p>
              </div>
              <Switch
                checked={emergencyOverride}
                onCheckedChange={setEmergencyOverride}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Real-time Data Sync</p>
                <p className="text-xs text-muted-foreground">Continuous data synchronization</p>
              </div>
              <Switch
                checked={dataSync}
                onCheckedChange={setDataSync}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Alert Notifications</p>
                <p className="text-xs text-muted-foreground">Push notifications for critical events</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Database</span>
                  </div>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                    Online
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Network</span>
                  </div>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                    Connected
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">AI Engine</span>
                  </div>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                    Active
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Sync Status</span>
                  </div>
                  <span className="text-sm font-medium text-primary">Live</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Actions */}
        <Card className="dashboard-card border-red-500/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Emergency Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              Emergency Stop All AI
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            >
              Switch to Manual Mode
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
            >
              Reset All Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};