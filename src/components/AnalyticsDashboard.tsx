import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  Activity,
  Users,
  Timer,
  Target
} from 'lucide-react';

export interface AnalyticsData {
  totalSignals: number;
  activeSignals: number;
  totalVehicles: number;
  averageDelay: string;
  peakHours: string[];
  congestionAreas: Array<{
    name: string;
    level: number;
    vehicles: number;
  }>;
  signalEfficiency: Array<{
    id: string;
    location: string;
    efficiency: number;
    throughput: number;
  }>;
  hourlyTraffic: Array<{
    hour: number;
    vehicles: number;
    avgDelay: number;
  }>;
}

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalSignals: 28,
    activeSignals: 24,
    totalVehicles: 1247,
    averageDelay: '3.2 min',
    peakHours: ['08:00-10:00', '17:00-19:00'],
    congestionAreas: [
      { name: 'CP - Connaught Place', level: 85, vehicles: 342 },
      { name: 'Karol Bagh Junction', level: 72, vehicles: 186 },
      { name: 'ITO Intersection', level: 68, vehicles: 154 },
      { name: 'AIIMS Flyover', level: 45, vehicles: 98 }
    ],
    signalEfficiency: [
      { id: 'DL-001', location: 'CP Central Circle', efficiency: 92, throughput: 450 },
      { id: 'DL-002', location: 'Khan Market', efficiency: 87, throughput: 320 },
      { id: 'DL-003', location: 'Lajpat Nagar', efficiency: 78, throughput: 280 },
      { id: 'DL-004', location: 'Saket Metro', efficiency: 95, throughput: 380 }
    ],
    hourlyTraffic: [
      { hour: 6, vehicles: 145, avgDelay: 1.2 },
      { hour: 7, vehicles: 298, avgDelay: 2.1 },
      { hour: 8, vehicles: 456, avgDelay: 4.2 },
      { hour: 9, vehicles: 523, avgDelay: 5.1 },
      { hour: 10, vehicles: 387, avgDelay: 3.8 },
      { hour: 11, vehicles: 342, avgDelay: 2.9 },
      { hour: 12, vehicles: 398, avgDelay: 3.2 }
    ]
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        totalVehicles: prev.totalVehicles + Math.floor(Math.random() * 20 - 10),
        congestionAreas: prev.congestionAreas.map(area => ({
          ...area,
          level: Math.max(30, Math.min(100, area.level + Math.floor(Math.random() * 10 - 5))),
          vehicles: Math.max(50, area.vehicles + Math.floor(Math.random() * 20 - 10))
        }))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (efficiency >= 75) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  const getCongestionColor = (level: number) => {
    if (level >= 80) return 'bg-red-500';
    if (level >= 60) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="h-screen bg-card/50 backdrop-blur-sm border-l border-border/50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Traffic Analytics
        </h2>
        <p className="text-sm text-muted-foreground">Real-time performance metrics</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-xs text-muted-foreground">Active Signals</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {analytics.activeSignals}/{analytics.totalSignals}
              </div>
              <Progress 
                value={(analytics.activeSignals / analytics.totalSignals) * 100} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Live Vehicles</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {analytics.totalVehicles.toLocaleString()}
              </div>
              <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +2.3% from last hour
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-muted-foreground">Avg Delay</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {analytics.averageDelay}
              </div>
              <div className="text-xs text-red-400 mt-1">
                +0.8min from morning
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-muted-foreground">Peak Hours</span>
              </div>
              <div className="text-sm font-medium text-foreground">
                {analytics.peakHours.join(', ')}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Current: Rush Hour
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Congestion Levels */}
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Live Congestion Levels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.congestionAreas.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{area.name}</span>
                  <span className="text-muted-foreground">{area.vehicles} vehicles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={area.level} 
                    className="flex-1 h-2"
                  />
                  <span className="text-xs font-medium w-12 text-right">{area.level}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Signal Efficiency */}
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-green-400" />
              Signal Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.signalEfficiency.map((signal) => (
              <div 
                key={signal.id}
                className="p-3 bg-muted/30 rounded-lg border border-border/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-sm">{signal.location}</div>
                    <div className="text-xs text-muted-foreground">{signal.id}</div>
                  </div>
                  <Badge 
                    variant="outline"
                    className={getEfficiencyColor(signal.efficiency)}
                  >
                    {signal.efficiency}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Throughput: {signal.throughput}/hr</span>
                  <span className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getCongestionColor(signal.efficiency)}`} />
                    {signal.efficiency >= 90 ? 'Optimal' : signal.efficiency >= 75 ? 'Good' : 'Needs Attention'}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Hourly Traffic Pattern */}
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Hourly Traffic Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.hourlyTraffic.map((data) => (
                <div key={data.hour} className="flex items-center gap-3">
                  <span className="text-xs font-mono w-8 text-muted-foreground">
                    {data.hour.toString().padStart(2, '0')}:00
                  </span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-muted/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-300"
                        style={{ width: `${(data.vehicles / 600) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium w-12 text-right">
                      {data.vehicles}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground w-16 text-right">
                    {data.avgDelay.toFixed(1)}min
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">AI Detection System</span>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database Sync</span>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                Live
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Signal Response</span>
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                2.1s avg
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Update</span>
              <span className="text-sm font-medium text-primary animate-pulse">
                Live
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};