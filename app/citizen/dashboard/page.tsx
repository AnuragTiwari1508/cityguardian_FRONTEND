"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  Camera, 
  MapPin, 
  Phone, 
  Mail,
  Upload,
  Heart,
  MessageCircle,
  Share,
  Clock,
  CheckCircle2,
  X,
  Menu,
  Home,
  Bell
} from "lucide-react"

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState("feed")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Mock data for feed posts
  const feedPosts = [
    {
      id: 1,
      type: "complaint",
      author: "Rajesh Kumar",
      location: "MG Road, Sector 14",
      time: "2 hours ago",
      title: "Major Pothole Causing Traffic Issues",
      description: "Large pothole formed after recent rains. Multiple vehicles getting damaged. Urgent repair needed.",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMjEyMTIxIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxODAiIHJ4PSIxMjAiIHJ5PSI4MCIgZmlsbD0iIzE0MTQxNCIvPgo8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTcwIiByeD0iODAiIHJ5PSI1MCIgZmlsbD0iIzBhMGEwYSIvPgo8dGV4dCB4PSIyMDAiIHk9IjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNzc3NzU1IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0cHgiPkRBTUFHRUQgUk9BRDwvdGV4dD4KPC9zdmc+",
      category: "Road Infrastructure",
      status: "pending",
      likes: 23,
      comments: 8,
      priority: "high"
    },
    {
      id: 2,
      type: "municipal_post",
      author: "Municipal Corporation",
      location: "City Wide",
      time: "4 hours ago",
      title: "Waste Collection Schedule Update",
      description: "New waste collection timings: Morning 6-9 AM, Evening 6-8 PM. Please keep waste ready 30 minutes before collection.",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMmEyYTJhIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMzYTNhM2EiLz4KPHJlY3QgeD0iMTAwIiB5PSIxMDAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNGE0YTRhIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTk5OTkiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTJweCI+V0FTVEUgQ09MTEFDVEVRIEVRVUQ8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjY2NjY2NjIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE4cHgiPkJJTjwvdGV4dD4KPC9zdmc+",
      category: "Municipal Notice",
      status: "active",
      likes: 45,
      comments: 12,
      priority: "info"
    },
    {
      id: 3,
      type: "complaint",
      author: "Priya Sharma",
      location: "Green Park Extension",
      time: "1 day ago",
      title: "Air Pollution from Construction Site",
      description: "Heavy dust and poor air quality due to construction activities. Affecting nearby residential areas.",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzMzMzIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM2NjY2NjYiLz4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTIwIiByPSIzMCIgZmlsbD0iIzU1NTU1NSIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIxMjAiIHI9IjI1IiBmaWxsPSIjNDQ0NDQ0Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM4ODg4ODgiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTJweCI+QUlSIFBPTExVVElPTjwvdGV4dD4KPC9zdmc+",
      category: "Environment",
      status: "in_progress",
      likes: 31,
      comments: 15,
      priority: "medium"
    }
  ]

  const NavBar = () => (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-green-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-400 rounded flex items-center justify-center text-black font-black text-sm">
              ⚡
            </div>
            <div className="hidden sm:block">
              <h1 className="text-green-400 font-black text-lg tracking-wider">CITIZEN</h1>
              <p className="text-green-300/70 text-xs font-mono">OPERATIVE MODE</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Button 
              variant={activeTab === "community" ? "default" : "ghost"}
              onClick={() => setActiveTab("community")}
              className={activeTab === "community" ? "bg-green-400 text-black" : "text-green-400 hover:bg-green-400/10"}
            >
              <Users className="w-4 h-4 mr-2" />
              Community
            </Button>
            <Button 
              variant={activeTab === "feed" ? "default" : "ghost"}
              onClick={() => setActiveTab("feed")}
              className={activeTab === "feed" ? "bg-green-400 text-black" : "text-green-400 hover:bg-green-400/10"}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Feed
            </Button>
            <Button 
              variant={activeTab === "complain" ? "default" : "ghost"}
              onClick={() => setActiveTab("complain")}
              className={activeTab === "complain" ? "bg-green-400 text-black" : "text-green-400 hover:bg-green-400/10"}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Complain
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-green-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-green-500/30 py-4">
            <div className="flex flex-col gap-2">
              <Button 
                variant={activeTab === "community" ? "default" : "ghost"}
                onClick={() => {setActiveTab("community"); setMobileMenuOpen(false)}}
                className={`justify-start ${activeTab === "community" ? "bg-green-400 text-black" : "text-green-400"}`}
              >
                <Users className="w-4 h-4 mr-2" />
                Community
              </Button>
              <Button 
                variant={activeTab === "feed" ? "default" : "ghost"}
                onClick={() => {setActiveTab("feed"); setMobileMenuOpen(false)}}
                className={`justify-start ${activeTab === "feed" ? "bg-green-400 text-black" : "text-green-400"}`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Feed
              </Button>
              <Button 
                variant={activeTab === "complain" ? "default" : "ghost"}
                onClick={() => {setActiveTab("complain"); setMobileMenuOpen(false)}}
                className={`justify-start ${activeTab === "complain" ? "bg-green-400 text-black" : "text-green-400"}`}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Complain
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  const FeedPost = ({ post }: { post: any }) => (
    <Card className="border border-gray-700 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full flex items-center justify-center text-black font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">{post.author}</h4>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin className="w-3 h-3" />
                <span>{post.location}</span>
                <Clock className="w-3 h-3 ml-2" />
                <span>{post.time}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs ${
                post.type === 'municipal_post' 
                  ? 'border-blue-500 text-blue-400 bg-blue-500/10' 
                  : 'border-red-500 text-red-400 bg-red-500/10'
              }`}
            >
              {post.type === 'municipal_post' ? 'Municipal' : 'Complaint'}
            </Badge>
            {post.status === 'pending' && <Badge variant="outline" className="border-yellow-500 text-yellow-400 bg-yellow-500/10 text-xs">Pending</Badge>}
            {post.status === 'in_progress' && <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10 text-xs">In Progress</Badge>}
            {post.status === 'active' && <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10 text-xs">Active</Badge>}
          </div>
        </div>

        {/* Post Content */}
        <h3 className="text-white font-bold mb-2">{post.title}</h3>
        <p className="text-gray-300 text-sm mb-3 leading-relaxed">{post.description}</p>

        {/* Post Image */}
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover bg-gray-800"
            />
          </div>
        )}

        {/* Category and Priority */}
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="border-gray-600 text-gray-300 bg-gray-800/50 text-xs">
            {post.category}
          </Badge>
          {post.priority === 'high' && <Badge variant="outline" className="border-red-500 text-red-400 bg-red-500/10 text-xs">High Priority</Badge>}
          {post.priority === 'medium' && <Badge variant="outline" className="border-yellow-500 text-yellow-400 bg-yellow-500/10 text-xs">Medium Priority</Badge>}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between border-t border-gray-700 pt-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 p-0 h-auto">
              <Heart className="w-4 h-4 mr-1" />
              <span className="text-xs">{post.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400 p-0 h-auto">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">{post.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400 p-0 h-auto">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="w-full min-h-screen bg-black">
      <NavBar />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Community Tab */}
        {activeTab === "community" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-black text-green-400 mb-2">COMMUNITY HUB</h2>
              <p className="text-gray-400 font-mono">Municipal updates and community announcements</p>
            </div>
            
            <div className="grid gap-6">
              {feedPosts.filter(post => post.type === 'municipal_post').map(post => (
                <FeedPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Feed Tab */}
        {activeTab === "feed" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-black text-green-400 mb-2">COMMUNITY FEED</h2>
              <p className="text-gray-400 font-mono">Latest complaints and issues from your area</p>
            </div>
            
            <div className="grid gap-6">
              {feedPosts.map(post => (
                <FeedPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Complain Tab */}
        {activeTab === "complain" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-green-400 mb-2">REPORT ISSUE</h2>
              <p className="text-gray-400 font-mono">Submit your complaint with details and photos</p>
            </div>

            <Card className="border border-gray-700 bg-gray-900/50 backdrop-blur-sm p-6">
              <div className="space-y-6">
                {/* Issue Type */}
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">ISSUE TYPE</label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select issue category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pothole">Road/Pothole</SelectItem>
                      <SelectItem value="waste">Waste Management</SelectItem>
                      <SelectItem value="air_pollution">Air Pollution</SelectItem>
                      <SelectItem value="noise">Noise Pollution</SelectItem>
                      <SelectItem value="streetlight">Street Light</SelectItem>
                      <SelectItem value="water">Water Supply</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">ISSUE TITLE</label>
                  <Input 
                    placeholder="Brief title of the issue"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">DESCRIPTION</label>
                  <Textarea 
                    placeholder="Describe the issue in detail..."
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 min-h-[100px]"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">LOCATION</label>
                  <div className="flex gap-3">
                    <Input 
                      placeholder="Enter address or landmark"
                      className="flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                    />
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">PHOTO EVIDENCE</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                    <Camera className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Click to upload photos</p>
                    <p className="text-xs text-gray-500 font-mono">Maximum 5 photos, 10MB each</p>
                    <input type="file" multiple accept="image/*" className="hidden" />
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">MOBILE NUMBER</label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-gray-800 border border-gray-600 border-r-0 rounded-l-md">
                        <Phone className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input 
                        placeholder="Your mobile number"
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 rounded-l-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">EMAIL ADDRESS</label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-gray-800 border border-gray-600 border-r-0 rounded-l-md">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input 
                        placeholder="Your email address"
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 rounded-l-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Priority Level */}
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">PRIORITY LEVEL</label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Can wait</SelectItem>
                      <SelectItem value="medium">Medium - Should be addressed</SelectItem>
                      <SelectItem value="high">High - Urgent attention needed</SelectItem>
                      <SelectItem value="critical">Critical - Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button className="w-full bg-gradient-to-r from-green-400 to-cyan-400 text-black font-black text-lg h-12 hover:from-green-300 hover:to-cyan-300">
                  <Upload className="w-5 h-5 mr-2" />
                  SUBMIT COMPLAINT
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
