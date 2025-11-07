"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import NavigationHeader from "@/components/navigation-header"
import { 
  CheckCircle2, 
  Trophy, 
  BarChart3, 
  Users, 
  Bell,
  User,
  LogOut,
  Target,
  Zap,
  Clock,
  TrendingUp,
  Home,
  List,
  Award,
  Settings
} from "lucide-react"

export default function EmployeeDashboard() {
  const [activeSection, setActiveSection] = useState("tasks")
  const [currentTime, setCurrentTime] = useState("")
  const [stats, setStats] = useState({
    tasksCompleted: 28,
    avgTime: 2.5,
    efficiency: 92,
    streak: 15
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toTimeString().slice(0, 5))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const handleNavigation = (path: string) => {
    if (path === 'home') {
      window.location.href = '/'
    } else if (path === 'environmental') {
      window.location.href = '/environmental'
    } else if (path === 'citizen') {
      window.location.href = '/citizen-dashboard'
    } else if (path === 'office') {
      window.location.href = '/office-dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,153,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,153,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <NavigationHeader 
        title="EMPLOYEE DASHBOARD" 
        customBackPath="/employee"
      >
        {/* Top Stats */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="text-center">
            <div className="text-cyan-400 font-black">#12</div>
            <div className="text-gray-400 text-xs">RANK</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-black">{stats.tasksCompleted}</div>
            <div className="text-gray-400 text-xs">TASKS</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-black">3,250</div>
            <div className="text-gray-400 text-xs">XP</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-400">
            <Bell className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-400">
            <User className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-400">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </NavigationHeader>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 min-h-screen bg-gray-900/90 border-r border-green-500/30 backdrop-blur-sm relative z-10 hidden md:block">
          <div className="p-6">
            <nav className="space-y-2">
              {[
                { id: 'tasks', icon: Target, label: 'MY_TASKS', active: activeSection === 'tasks' },
                { id: 'leaderboard', icon: Trophy, label: 'LEADERBOARD', active: activeSection === 'leaderboard' },
                { id: 'team', icon: Users, label: 'TEAM', active: activeSection === 'team' },
                { id: 'analytics', icon: BarChart3, label: 'ANALYTICS', active: activeSection === 'analytics' }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    variant={item.active ? "default" : "ghost"}
                    className={`w-full justify-start font-mono text-left ${
                      item.active 
                        ? 'bg-green-400 text-black hover:bg-green-300' 
                        : 'text-green-400 hover:bg-green-400/10 border border-gray-700 hover:border-green-400/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>

            {/* Quick Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-3 font-mono">QUICK_ACCESS</p>
              <div className="space-y-1">
                {[
                  { label: 'ENVIRONMENTAL', onClick: () => handleNavigation('environmental') },
                  { label: 'CITIZEN_PORTAL', onClick: () => handleNavigation('citizen') },
                  { label: 'OFFICE_MANAGER', onClick: () => handleNavigation('office') }
                ].map((item, i) => (
                  <Button
                    key={i}
                    onClick={item.onClick}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs text-gray-400 hover:text-green-400 hover:bg-green-400/5"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 relative z-10">
          {/* Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Tasks Completed",
                value: stats.tasksCompleted.toString(),
                goal: "Goal: 35",
                icon: CheckCircle2,
                color: "text-green-400",
                progress: (stats.tasksCompleted / 35) * 100
              },
              {
                label: "Avg Completion Time",
                value: `${stats.avgTime}h`,
                goal: "Goal: 2h",
                icon: Clock,
                color: "text-green-400",
                progress: Math.max(0, (2 / stats.avgTime) * 100)
              },
              {
                label: "Efficiency Score",
                value: `${stats.efficiency}%`,
                goal: "Goal: 95%",
                icon: Zap,
                color: "text-green-400",
                progress: stats.efficiency
              },
              {
                label: "Current Streak",
                value: `${stats.streak} days`,
                goal: "Goal: 30 days",
                icon: TrendingUp,
                color: "text-green-400",
                progress: (stats.streak / 30) * 100
              }
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <Card key={i} className="border-green-500/50 bg-gray-900/50 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
                      <div className="w-4 h-4 rounded-full border-2 border-green-400 animate-pulse"></div>
                    </div>
                    <div className={`text-2xl md:text-4xl font-black ${stat.color} mb-2 number-update`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-xs md:text-sm font-mono mb-3">{stat.label}</div>
                    <div className="text-gray-500 text-xs font-mono mb-2">{stat.goal}</div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, stat.progress)}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Content Sections */}
          {activeSection === 'tasks' && (
            <div className="space-y-6">
              {/* Task Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['All Tasks', 'Pending', 'In Progress', 'Completed'].map((filter, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={i === 0 ? "default" : "outline"}
                    className={i === 0 
                      ? "bg-green-400 text-black hover:bg-green-300 font-mono" 
                      : "border-gray-600 text-gray-400 hover:border-green-400/50 hover:text-green-400 font-mono"
                    }
                  >
                    {filter}
                  </Button>
                ))}
              </div>

              {/* Task List */}
              <Card className="border-green-500/50 bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Fix Pothole on Main Street",
                        status: "In-Progress",
                        priority: "Urgent",
                        description: "Fill and repair the large pothole at Main St & 5th Ave. Citizen reported damage risk.",
                        statusColor: "text-yellow-400",
                        priorityColor: "text-red-400"
                      },
                      {
                        title: "Install Air Quality Sensor",
                        status: "Pending",
                        priority: "Medium",
                        description: "Deploy new environmental sensor at Central Park location.",
                        statusColor: "text-gray-400",
                        priorityColor: "text-orange-400"
                      }
                    ].map((task, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:border-green-400/30 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-bold">{task.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded border ${task.statusColor} border-current`}>
                              {task.status}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded border ${task.priorityColor} border-current`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">{task.description}</p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-green-400 text-black hover:bg-green-300 font-mono"
                        >
                          Complete
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'leaderboard' && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Office Rankings */}
              <Card className="border-orange-500/50 bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Trophy className="w-6 h-6 text-orange-400" />
                    <h2 className="text-xl font-black text-orange-400">OFFICE_RANKINGS</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Zone-A", score: 8500, aqi: "+1.3 AQI", rank: 1, medal: "🥇" },
                      { name: "Zone-C", score: 7800, aqi: "+1.8 AQI", rank: 2, medal: "🥈" },
                      { name: "Zone-B", score: 6500, aqi: "+1.2 AQI", rank: 3, medal: "🥉" },
                      { name: "Zone-D", score: 5200, aqi: "+0.9 AQI", rank: 4, medal: "⭐" }
                    ].map((office, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-gray-700 rounded">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{office.medal}</span>
                          <div>
                            <div className="text-green-400 font-bold">{office.name}</div>
                            <div className="text-xs text-gray-400">{office.aqi}</div>
                          </div>
                        </div>
                        <div className="text-orange-400 font-black">{office.score}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Employee Rankings */}
              <Card className="border-cyan-500/50 bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Users className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-xl font-black text-cyan-400">EMPLOYEE_RANKINGS</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Agent_Kumar", score: 2300, tasks: 45, rank: 1, badge: "👑", level: "ELITE" },
                      { name: "Officer_Singh", score: 1950, tasks: 38, rank: 2, badge: "#2", level: "VETERAN" },
                      { name: "Agent_Patel", score: 1850, tasks: 35, rank: 3, badge: "#3", level: "VETERAN" },
                      { name: "Agent_Verma", score: 1450, tasks: 28, rank: 4, badge: "#4", level: "RECRUIT" }
                    ].map((agent, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-gray-700 rounded">
                        <div className="flex items-center gap-3">
                          <span className="text-cyan-400 font-bold text-lg">{agent.badge}</span>
                          <div>
                            <div className="text-green-400 font-bold">{agent.name}</div>
                            <div className="text-xs text-gray-400">{agent.level} • {agent.tasks} tasks</div>
                          </div>
                        </div>
                        <div className="text-cyan-400 font-black">{agent.score}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'team' && (
            <Card className="border-purple-500/50 bg-gray-900/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-black text-purple-400 mb-6">TEAM_PERFORMANCE</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-green-400 mb-2">94%</div>
                    <div className="text-gray-400">Team Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-cyan-400 mb-2">156</div>
                    <div className="text-gray-400">Total Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-orange-400 mb-2">12</div>
                    <div className="text-gray-400">Active Members</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'analytics' && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-blue-500/50 bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-black text-blue-400 mb-4">WEEKLY_PERFORMANCE</h3>
                  <div className="h-32 flex items-end gap-2">
                    {[65, 78, 82, 88, 92, 89, 94].map((height, i) => (
                      <div key={i} className="flex-1 bg-blue-400/20 rounded-t flex items-end">
                        <div 
                          className="w-full bg-blue-400 rounded-t transition-all"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-green-500/50 bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-black text-green-400 mb-4">ACHIEVEMENTS</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Speed Demon", desc: "Complete 5 tasks in 1 day", unlocked: true },
                      { title: "Team Player", desc: "Help 3 colleagues", unlocked: true },
                      { title: "Perfect Week", desc: "100% efficiency for 7 days", unlocked: false }
                    ].map((achievement, i) => (
                      <div key={i} className={`p-3 border rounded ${achievement.unlocked ? 'border-green-400/50 bg-green-400/10' : 'border-gray-600 bg-gray-800/50'}`}>
                        <div className={`font-bold ${achievement.unlocked ? 'text-green-400' : 'text-gray-400'}`}>
                          {achievement.unlocked ? '🏆' : '🔒'} {achievement.title}
                        </div>
                        <div className="text-xs text-gray-400">{achievement.desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Mobile Navigation - Bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-green-500/30 backdrop-blur-sm md:hidden z-30">
            <div className="flex items-center justify-around py-2">
              {[
                { id: 'tasks', icon: Target, label: 'Tasks' },
                { id: 'leaderboard', icon: Trophy, label: 'Ranks' },
                { id: 'team', icon: Users, label: 'Team' },
                { id: 'analytics', icon: BarChart3, label: 'Stats' }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex flex-col items-center gap-1 p-2 ${
                      activeSection === item.id ? 'text-green-400' : 'text-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-mono">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Time Display */}
      <div className="fixed bottom-4 right-4 text-xs text-green-400 font-mono bg-black/50 px-2 py-1 rounded border border-green-400/30 hidden md:block">
        {currentTime}
      </div>
    </div>
  )
}
