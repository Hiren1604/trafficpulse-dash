import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  Activity,
  Users,
  Timer,
  Target,
  Thermometer,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
          { name: 'Bhubaneswar Airport', level: 85, vehicles: 342 },
          { name: 'Kalinga Stadium', level: 72, vehicles: 186 },
          { name: 'Patia Square', level: 68, vehicles: 154 },
          { name: 'Jaydev Vihar', level: 45, vehicles: 98 }
        ],
        signalEfficiency: [
          { id: 'OD-001', location: 'Airport Square', efficiency: 92, throughput: 450 },
          { id: 'OD-002', location: 'Kalinga Hospital', efficiency: 87, throughput: 320 },
          { id: 'OD-003', location: 'Patia Crossing', efficiency: 78, throughput: 280 },
          { id: 'OD-004', location: 'Jaydev Vihar', efficiency: 95, throughput: 380 }
        ],
    hourlyTraffic: [
      { hour: 6, vehicles: 145, avgDelay: 1.2 },
      { hour: 7, vehicles: 298, avgDelay: 2.1 },
      { hour: 8, vehicles: 456, avgDelay: 4.2 },
      { hour: 9, vehicles: 523, avgDelay: 5.1 },
      { hour: 10, vehicles: 387, avgDelay: 3.8 },
      { hour: 11, vehicles: 342, avgDelay: 2.9 },
      { hour: 12, vehicles: 398, avgDelay: 3.2 },
      { hour: 13, vehicles: 423, avgDelay: 3.5 },
      { hour: 14, vehicles: 356, avgDelay: 2.8 },
      { hour: 15, vehicles: 445, avgDelay: 4.1 },
      { hour: 16, vehicles: 512, avgDelay: 4.8 },
      { hour: 17, vehicles: 598, avgDelay: 5.9 },
      { hour: 18, vehicles: 623, avgDelay: 6.2 },
      { hour: 19, vehicles: 487, avgDelay: 4.5 },
      { hour: 20, vehicles: 321, avgDelay: 2.7 }
    ]
  });

  // Heatmap data for traffic intensity
  const heatmapData = [
    { area: 'Airport', intensity: 85, x: 0, y: 0 },
    { area: 'Kalinga Stadium', intensity: 72, x: 1, y: 0 },
    { area: 'Patia', intensity: 68, x: 2, y: 0 },
    { area: 'Jaydev Vihar', intensity: 45, x: 3, y: 0 },
    { area: 'Nayapalli', intensity: 78, x: 0, y: 1 },
    { area: 'Saheed Nagar', intensity: 65, x: 1, y: 1 },
    { area: 'Khandagiri', intensity: 88, x: 2, y: 1 },
    { area: 'Chandrashekharpur', intensity: 52, x: 3, y: 1 },
    { area: 'Old Town', intensity: 58, x: 0, y: 2 },
    { area: 'Rasulgarh', intensity: 63, x: 1, y: 2 },
    { area: 'Mancheswar', intensity: 41, x: 2, y: 2 },
    { area: 'Sundarpada', intensity: 76, x: 3, y: 2 }
  ];

  // Traffic signal status pie chart data
  const signalStatusData = [
    { name: 'Green', value: 12, color: '#10b981' },
    { name: 'Red', value: 8, color: '#ef4444' },
    { name: 'Amber', value: 4, color: '#f59e0b' },
    { name: 'Offline', value: 4, color: '#6b7280' }
  ];

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
    <div className="h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Traffic Analytics Dashboard
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Real-time performance metrics & insights</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Signals</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analytics.activeSignals}/{analytics.totalSignals}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Live Vehicles</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analytics.totalVehicles.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Timer className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Delay</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analytics.averageDelay}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hotspots</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analytics.congestionAreas.filter(a => a.level > 70).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Hourly Traffic Flow */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Hourly Traffic Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics.hourlyTraffic}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(value) => `${value}:00`}
                    fontSize={12}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    labelFormatter={(value) => `${value}:00`}
                    formatter={(value: any, name: string) => [
                      name === 'vehicles' ? `${value} vehicles` : `${value} min`,
                      name === 'vehicles' ? 'Vehicle Count' : 'Avg Delay'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="vehicles"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgDelay"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Signal Status Distribution */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Signal Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={signalStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {signalStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Congestion Heatmap */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-red-400" />
              Traffic Intensity Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {heatmapData.map((cell, index) => (
                <div
                  key={index}
                  className="relative p-4 rounded-lg text-center text-white font-medium text-sm transition-all hover:scale-105"
                  style={{
                    backgroundColor: `rgba(239, 68, 68, ${cell.intensity / 100})`,
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <div>{cell.area}</div>
                  <div className="text-xs opacity-90">{cell.intensity}%</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Low Traffic</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded"></div>
              </div>
              <span>High Traffic</span>
            </div>
          </CardContent>
        </Card>


        {/* Live Congestion Areas */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Live Congestion Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.congestionAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-muted/20 to-muted/40 rounded-lg border border-border/20 hover:shadow-lg transition-all duration-200">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-sm text-foreground">{area.name}</span>
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                        {area.vehicles} vehicles
                      </span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={area.level} 
                        className="h-3 bg-muted/50"
                      />
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-500 ease-out rounded-full shadow-sm"
                          style={{
                            width: `${area.level}%`,
                            background: area.level >= 80 
                              ? 'linear-gradient(45deg, #ef4444, #dc2626)' 
                              : area.level >= 60 
                              ? 'linear-gradient(45deg, #f59e0b, #d97706)' 
                              : 'linear-gradient(45deg, #10b981, #059669)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant="outline"
                    className={cn(
                      "text-sm font-semibold px-3 py-1 shadow-sm",
                      area.level >= 80 ? "border-red-500/50 text-red-400 bg-red-500/10 shadow-red-500/20" :
                      area.level >= 60 ? "border-amber-500/50 text-amber-400 bg-amber-500/10 shadow-amber-500/20" :
                      "border-green-500/50 text-green-400 bg-green-500/10 shadow-green-500/20"
                    )}
                  >
                    {area.level}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg">System Health Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
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
              </div>
              <div className="space-y-3">
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};