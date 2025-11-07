"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NavigationHeader from "@/components/navigation-header"
import { 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  MapPin,
  Bell,
  FileText,
  BarChart3,
  Shield
} from "lucide-react"

export default function CitizenPage() {
  const router = useRouter()

  const features = [
    {
      title: "Dashboard",
      description: "Main control center with community feed and complaint system",
      icon: BarChart3,
      path: "/citizen/dashboard",
      color: "from-green-400 to-cyan-400"
    },
    {
      title: "Community",
      description: "Connect with neighbors and local municipal updates",
      icon: Users,
      path: "/citizen/community",
      color: "from-blue-400 to-purple-400"
    },
    {
      title: "Reports",
      description: "View your submitted complaints and their status",
      icon: FileText,
      path: "/citizen/reports",
      color: "from-yellow-400 to-orange-400"
    }
  ]

  const quickActions = [
    { title: "Report Pothole", icon: AlertTriangle, action: () => router.push("/citizen/dashboard?tab=complain&type=pothole") },
    { title: "Waste Management", icon: Shield, action: () => router.push("/citizen/dashboard?tab=complain&type=waste") },
    { title: "Air Quality", icon: MapPin, action: () => router.push("/citizen/dashboard?tab=complain&type=air_pollution") },
    { title: "Street Light", icon: Bell, action: () => router.push("/citizen/dashboard?tab=complain&type=streetlight") }
  ]

  return (
    <div className="w-full min-h-screen bg-black">
      <NavigationHeader title="CITIZEN PORTAL" customBackPath="/" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full mb-4">
            <Shield className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-green-400 mb-4 neon-glow">
            CITIZEN COMMAND CENTER
          </h1>
          <p className="text-gray-300 text-lg font-mono max-w-2xl mx-auto">
            Your digital gateway to report issues, connect with community, and track municipal services in real-time
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="border border-gray-700 bg-gray-900/50 backdrop-blur-sm p-6 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
              onClick={() => router.push(feature.path)}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-gray-300 hover:bg-green-400/10 hover:border-green-400"
              >
                Access {feature.title}
              </Button>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Quick Report Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                onClick={action.action}
                className="h-20 flex-col gap-2 border-gray-600 text-gray-300 hover:bg-green-400/10 hover:border-green-400 hover:text-green-400"
              >
                <action.icon className="w-5 h-5" />
                <span className="text-xs">{action.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Status Overview */}
        <Card className="border border-gray-700 bg-gray-900/50 backdrop-blur-sm p-6">
          <h3 className="text-white font-bold text-lg mb-4">System Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-green-400 mb-1">24/7</div>
              <div className="text-xs text-gray-400">SERVICE UPTIME</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-cyan-400 mb-1">1.2K</div>
              <div className="text-xs text-gray-400">ISSUES RESOLVED</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-yellow-400 mb-1">48</div>
              <div className="text-xs text-gray-400">AVG RESPONSE (HRS)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-purple-400 mb-1">95%</div>
              <div className="text-xs text-gray-400">SATISFACTION RATE</div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}