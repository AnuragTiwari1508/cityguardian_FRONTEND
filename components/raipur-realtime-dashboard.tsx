"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  AlertTriangle, 
  Eye, 
  LogOut, 
  Target, 
  Trophy, 
  Zap,
  TrendingUp,
  TrendingDown,
  Wifi,
  Radio,
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  Sun,
  Cloud,
  Gauge
} from "lucide-react"

interface RaipurAQIData {
  timestamp: string
  aqi: number
  pm25: number
  pm10: number
  so2: number
  no2: number
  co: number
  ozone: number
  temperature: number
  humidity: number
  windSpeed: number
  pressure: number
  visibility: number
  location: string
  status: "good" | "satisfactory" | "moderate" | "poor" | "very_poor" | "severe"
}

interface RaipurZoneData {
  zone: string
  aqi: number
  pm25: number
  pm10: number
  status: "good" | "satisfactory" | "moderate" | "poor" | "very_poor" | "severe"
  trend: "up" | "down" | "stable"
  lastUpdate: string
  sensors: number
  coordinates: [number, number]
}

export default function RaipurRealtimeDashboard() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [currentDate, setCurrentDate] = useState<string>("")
  const [isOnline, setIsOnline] = useState(true)
  const [dataUpdateCounter, setDataUpdateCounter] = useState(0)

  // Real-time Raipur AQI Data
  const [raipurData, setRaipurData] = useState<RaipurAQIData>({
    timestamp: new Date().toISOString(),
    aqi: 142,
    pm25: 78.5,
    pm10: 124.3,
    so2: 15.2,
    no2: 42.8,
    co: 1.2,
    ozone: 65.4,
    temperature: 28.5,
    humidity: 68,
    windSpeed: 12.3,
    pressure: 1013.2,
    visibility: 6.8,
    location: "Raipur, Chhattisgarh",
    status: "poor"
  })

  // Raipur Zone-wise Data
  const [zoneData, setZoneData] = useState<RaipurZoneData[]>([
    { zone: "Civil Lines", aqi: 138, pm25: 76, pm10: 122, status: "poor", trend: "up", lastUpdate: "2 min ago", sensors: 4, coordinates: [21.2514, 81.6296] },
    { zone: "Shankar Nagar", aqi: 156, pm25: 89, pm10: 145, status: "poor", trend: "up", lastUpdate: "1 min ago", sensors: 3, coordinates: [21.2379, 81.6337] },
    { zone: "Telibandha", aqi: 124, pm25: 68, pm10: 115, status: "poor", trend: "down", lastUpdate: "3 min ago", sensors: 2, coordinates: [21.2266, 81.6633] },
    { zone: "Pandri", aqi: 147, pm25: 82, pm10: 134, status: "poor", trend: "stable", lastUpdate: "1 min ago", sensors: 3, coordinates: [21.2287, 81.6084] },
    { zone: "Mowa", aqi: 118, pm25: 62, pm10: 108, status: "moderate", trend: "down", lastUpdate: "2 min ago", sensors: 2, coordinates: [21.2144, 81.6882] },
    { zone: "Devendra Nagar", aqi: 135, pm25: 74, pm10: 128, status: "poor", trend: "up", lastUpdate: "4 min ago", sensors: 3, coordinates: [21.2672, 81.5938] }
  ])

  // Historical Data for Charts (24-hour)
  const [historicalData] = useState(() => {
    const data = []
    const now = new Date()
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      data.push({
        time: time.toTimeString().slice(0, 5),
        timestamp: time.getTime(),
        aqi: 120 + Math.floor(Math.random() * 40) + (i < 12 ? i * 2 : (24 - i) * 1.5), // Peak during day
        pm25: 60 + Math.floor(Math.random() * 30) + (i < 12 ? i * 1.5 : (24 - i) * 1),
        pm10: 100 + Math.floor(Math.random() * 50) + (i < 12 ? i * 2.5 : (24 - i) * 2),
        temp: 22 + Math.floor(Math.random() * 8) + (i < 12 ? i * 0.5 : (24 - i) * 0.3),
        humidity: 55 + Math.floor(Math.random() * 20) + (i > 12 ? 10 : 0)
      })
    }
    return data
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toTimeString().slice(0, 8))
      setCurrentDate(now.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }))
    }
    
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)
    
    // Simulate real-time data updates every 30 seconds
    const dataInterval = setInterval(() => {
      setDataUpdateCounter(prev => prev + 1)
      
      // Update main Raipur data
      setRaipurData(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        aqi: Math.max(50, Math.min(300, prev.aqi + (Math.random() - 0.5) * 10)),
        pm25: Math.max(10, Math.min(150, prev.pm25 + (Math.random() - 0.5) * 5)),
        pm10: Math.max(20, Math.min(250, prev.pm10 + (Math.random() - 0.5) * 8)),
        temperature: Math.max(15, Math.min(45, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(20, Math.min(95, prev.humidity + (Math.random() - 0.5) * 5)),
        windSpeed: Math.max(0, Math.min(30, prev.windSpeed + (Math.random() - 0.5) * 3))
      }))

      // Update zone data
      setZoneData(prev => prev.map(zone => ({
        ...zone,
        aqi: Math.max(50, Math.min(300, zone.aqi + (Math.random() - 0.5) * 8)),
        pm25: Math.max(10, Math.min(150, zone.pm25 + (Math.random() - 0.5) * 4)),
        pm10: Math.max(20, Math.min(250, zone.pm10 + (Math.random() - 0.5) * 6)),
        trend: Math.random() > 0.7 ? (Math.random() > 0.5 ? "up" : "down") : zone.trend,
        lastUpdate: "Just now"
      })))

      // Simulate network status
      setIsOnline(Math.random() > 0.05) // 95% uptime
    }, 30000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(dataInterval)
    }
  }, [])

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "text-green-400", bg: "border-green-500/50 bg-green-500/10" }
    if (aqi <= 100) return { label: "Satisfactory", color: "text-blue-400", bg: "border-blue-500/50 bg-blue-500/10" }
    if (aqi <= 200) return { label: "Moderate", color: "text-yellow-400", bg: "border-yellow-500/50 bg-yellow-500/10" }
    if (aqi <= 300) return { label: "Poor", color: "text-orange-400", bg: "border-orange-500/50 bg-orange-500/10" }
    if (aqi <= 400) return { label: "Very Poor", color: "text-red-400", bg: "border-red-500/50 bg-red-500/10" }
    return { label: "Severe", color: "text-purple-400", bg: "border-purple-500/50 bg-purple-500/10" }
  }

  const status = getAQIStatus(raipurData.aqi)

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,153,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,153,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>
      
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,153,0.2) 2px, rgba(0,255,153,0.2) 4px)',
          animation: 'scanlines 2s linear infinite'
        }} />
      </div>

      {/* Glitch Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-green-400/5 to-transparent animate-pulse" />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* HUD Border Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-green-400/50"></div>
        <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-green-400/50"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-green-400/50"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-green-400/50"></div>
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-gray-900/95 border-r-2 border-green-500/30 backdrop-blur-sm z-20">
        <div className="p-6">
          {/* Logo & Status */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg flex items-center justify-center text-black font-black text-xl animate-pulse">
              🏭
            </div>
            <div>
              <div className="text-green-400 font-black text-xl">RAIPUR MONITOR</div>
              <div className="text-green-300/70 text-xs flex items-center gap-2">
                {isOnline ? (
                  <>
                    <Radio className="w-3 h-3 text-green-400 animate-pulse" />
                    LIVE • OPERATIONAL
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    OFFLINE • RECONNECTING...
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Real-time Clock */}
          <Card className="mb-6 bg-green-500/10 border-2 border-green-400/50">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-black text-green-400 mb-1 tabular-nums">
                  {currentTime}
                </div>
                <div className="text-xs text-green-300/70">
                  {currentDate}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  CHHATTISGARH, INDIA
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <nav className="space-y-2 mb-6">
            {[
              { icon: Target, label: "REAL_TIME_DATA", active: true },
              { icon: Activity, label: "ZONE_MONITORING", active: false },
              { icon: Trophy, label: "ANALYTICS", active: false },
              { icon: MapPin, label: "HEAT_MAP", active: false }
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <Button
                  key={i}
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start font-mono text-left text-sm ${
                    item.active 
                      ? 'bg-green-400 text-black hover:bg-green-300 font-black' 
                      : 'text-green-400 hover:bg-green-400/10 border border-gray-700 hover:border-green-400/50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          {/* Data Update Counter */}
          <Card className="mb-6 bg-cyan-500/10 border border-cyan-400/30">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-cyan-300/70">DATA UPDATES</div>
                  <div className="text-lg font-black text-cyan-400 tabular-nums">
                    {dataUpdateCounter.toString().padStart(6, '0')}
                  </div>
                </div>
                <Wifi className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:bg-red-400/10 border border-gray-700 hover:border-red-400/50 font-mono"
          >
            <LogOut className="w-4 h-4 mr-3" />
            DISCONNECT
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-6xl font-black text-green-400 mb-2 tracking-wider" style={{
                textShadow: '0 0 20px rgba(0,255,153,0.5), 0 0 40px rgba(0,255,153,0.3)'
              }}>
                RAIPUR AIR QUALITY
              </h1>
              <p className="text-green-300/70 text-xl flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                Real-time Environmental Monitoring • Chhattisgarh State
              </p>
            </div>
            <div className="text-right">
              <Badge className={`${status.bg} text-2xl px-6 py-3 font-black animate-pulse`}>
                {status.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main AQI Display */}
        <Card className={`${status.bg} border-4 backdrop-blur-sm mb-8`}>
          <CardContent className="p-8">
            <div className="text-center">
              <div className="text-8xl font-black mb-4 tabular-nums" style={{
                background: `linear-gradient(45deg, ${status.color.replace('text-', '')}, #ffffff)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(0,255,153,0.5)'
              }}>
                {raipurData.aqi}
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                AIR QUALITY INDEX
              </div>
              <div className="text-green-300/70 text-lg">
                {raipurData.location} • Updated {new Date(raipurData.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {[
            { 
              label: "PM2.5", 
              value: raipurData.pm25.toFixed(1), 
              unit: "μg/m³",
              icon: Eye, 
              color: "text-red-400",
              bg: "border-red-500/50 bg-red-500/10"
            },
            { 
              label: "PM10", 
              value: raipurData.pm10.toFixed(1), 
              unit: "μg/m³",
              icon: AlertTriangle, 
              color: "text-orange-400",
              bg: "border-orange-500/50 bg-orange-500/10"
            },
            { 
              label: "Temperature", 
              value: raipurData.temperature.toFixed(1), 
              unit: "°C",
              icon: Thermometer, 
              color: "text-yellow-400",
              bg: "border-yellow-500/50 bg-yellow-500/10"
            },
            { 
              label: "Humidity", 
              value: raipurData.humidity.toString(), 
              unit: "%",
              icon: Droplets, 
              color: "text-cyan-400",
              bg: "border-cyan-500/50 bg-cyan-500/10"
            },
            { 
              label: "Wind Speed", 
              value: raipurData.windSpeed.toFixed(1), 
              unit: "km/h",
              icon: Wind, 
              color: "text-blue-400",
              bg: "border-blue-500/50 bg-blue-500/10"
            },
            { 
              label: "Visibility", 
              value: raipurData.visibility.toFixed(1), 
              unit: "km",
              icon: Cloud, 
              color: "text-purple-400",
              bg: "border-purple-500/50 bg-purple-500/10"
            }
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className={`${stat.bg} border-2 backdrop-blur-sm animate-pulse`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                    <div className="w-4 h-4 rounded-full border-2 border-green-400 animate-ping"></div>
                  </div>
                  <div className={`text-2xl font-black ${stat.color} mb-1 tabular-nums`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">{stat.unit}</div>
                  <div className="text-xs text-gray-300 font-mono">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Zone Monitoring */}
        <Card className="border-green-500/50 bg-gray-900/50 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-green-400 font-black text-2xl flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              RAIPUR ZONE MONITORING
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {zoneData.map((zone, i) => {
                const zoneStatus = getAQIStatus(zone.aqi)
                return (
                  <Card key={i} className={`${zoneStatus.bg} border backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-white text-sm">{zone.zone}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-gray-800/50 text-green-400 text-xs">
                              {zone.sensors} sensors
                            </Badge>
                            {zone.trend === "up" ? (
                              <TrendingUp className="w-4 h-4 text-red-400" />
                            ) : zone.trend === "down" ? (
                              <TrendingDown className="w-4 h-4 text-green-400" />
                            ) : (
                              <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                            )}
                          </div>
                        </div>
                        <Badge className={zoneStatus.bg}>{zoneStatus.label}</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-400">AQI</span>
                          <span className={`font-black ${zoneStatus.color} tabular-nums`}>{zone.aqi}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-400">PM2.5</span>
                          <span className="font-bold text-white tabular-nums">{zone.pm25} μg/m³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-400">PM10</span>
                          <span className="font-bold text-white tabular-nums">{zone.pm10} μg/m³</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-green-300/70 mt-3 text-center">
                        Updated {zone.lastUpdate}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Historical Chart */}
        <Card className="border-cyan-500/50 bg-gray-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-cyan-400 font-black text-2xl flex items-center gap-3">
              <Activity className="w-6 h-6" />
              24-HOUR TREND • RAIPUR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 relative">
              <svg className="w-full h-full" viewBox="0 0 800 300">
                {/* Grid lines */}
                {[0, 75, 150, 225, 300].map(y => (
                  <line 
                    key={y} 
                    x1="0" 
                    y1={300 - y} 
                    x2="800" 
                    y2={300 - y} 
                    stroke="rgba(0,255,153,0.1)" 
                    strokeWidth="1"
                  />
                ))}
                
                {/* AQI Area Chart */}
                <defs>
                  <linearGradient id="aqiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 149, 0, 0.6)" />
                    <stop offset="100%" stopColor="rgba(255, 149, 0, 0.1)" />
                  </linearGradient>
                </defs>
                
                <polygon
                  fill="url(#aqiGradient)"
                  stroke="rgb(255, 149, 0)"
                  strokeWidth="3"
                  points={`0,300 ${historicalData.map((d, i) => 
                    `${(i * 800) / (historicalData.length - 1)},${300 - (d.aqi / 200) * 280}`
                  ).join(' ')} 800,300`}
                />
                
                {/* PM2.5 Line */}
                <polyline
                  fill="none"
                  stroke="rgb(239, 68, 68)"
                  strokeWidth="3"
                  points={historicalData.map((d, i) => 
                    `${(i * 800) / (historicalData.length - 1)},${300 - (d.pm25 / 100) * 280}`
                  ).join(' ')}
                />
                
                {/* Data points */}
                {historicalData.map((d, i) => (
                  <g key={i}>
                    <circle
                      cx={(i * 800) / (historicalData.length - 1)}
                      cy={300 - (d.aqi / 200) * 280}
                      r="4"
                      fill="rgb(255, 149, 0)"
                    />
                    <circle
                      cx={(i * 800) / (historicalData.length - 1)}
                      cy={300 - (d.pm25 / 100) * 280}
                      r="4"
                      fill="rgb(239, 68, 68)"
                    />
                  </g>
                ))}
              </svg>
              
              {/* Time labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
                {historicalData.filter((_, i) => i % 4 === 0).map((d, i) => (
                  <span key={i}>{d.time}</span>
                ))}
              </div>
              
              {/* Legend */}
              <div className="absolute top-4 right-4 space-y-2 bg-black/50 p-3 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-orange-500"></div>
                  <span className="text-xs text-orange-400">AQI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-red-500"></div>
                  <span className="text-xs text-red-400">PM2.5 (μg/m³)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes scanlines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
        
        .neon-glow {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor;
        }
      `}</style>
    </div>
  )
}