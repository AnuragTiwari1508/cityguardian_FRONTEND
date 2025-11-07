"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NavigationHeader from "@/components/navigation-header"
import { 
  Target, 
  BarChart3, 
  Users, 
  Award,
  Clock,
  CheckCircle2,
  Zap,
  Trophy
} from "lucide-react"

export default function EmployeePage() {
  const router = useRouter()

  const features = [
    {
      title: "Dashboard",
      description: "Task management, performance metrics, and real-time updates",
      icon: BarChart3,
      path: "/employee/dashboard",
      color: "from-blue-400 to-purple-400"
    },
    {
      title: "Tasks",
      description: "View assigned tasks, update progress, and complete work orders",
      icon: Target,
      path: "/employee/tasks",
      color: "from-green-400 to-cyan-400"
    }
  ]

  return (
    <div className="w-full min-h-screen bg-black">
      <NavigationHeader title="EMPLOYEE PORTAL" customBackPath="/" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mb-4">
            <Zap className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-blue-400 mb-4 neon-glow">
            EMPLOYEE COMMAND CENTER
          </h1>
          <p className="text-gray-300 text-lg font-mono max-w-2xl mx-auto">
            Manage tasks, track performance, and coordinate municipal services efficiently
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="border border-gray-700 bg-gray-900/50 backdrop-blur-sm p-6 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
              onClick={() => router.push(feature.path)}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-gray-300 hover:bg-blue-400/10 hover:border-blue-400"
              >
                Access {feature.title}
              </Button>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="border border-gray-700 bg-gray-900/50 backdrop-blur-sm p-6">
          <h3 className="text-white font-bold text-lg mb-4">Performance Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-green-400 mb-1">28</div>
              <div className="text-xs text-gray-400">TASKS COMPLETED</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-blue-400 mb-1">92%</div>
              <div className="text-xs text-gray-400">EFFICIENCY RATE</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-purple-400 mb-1">#12</div>
              <div className="text-xs text-gray-400">TEAM RANKING</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-cyan-400 mb-1">3.2K</div>
              <div className="text-xs text-gray-400">XP EARNED</div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}