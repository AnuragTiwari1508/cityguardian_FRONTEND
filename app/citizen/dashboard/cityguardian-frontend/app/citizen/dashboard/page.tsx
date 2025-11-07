"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import NavigationHeader from "@/components/navigation-header"
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
} from "lucide-react"
import axios from 'axios'

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState("feed")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [complaintData, setComplaintData] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'low',
    mobile: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintData({ ...complaintData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/complaints', complaintData);
      console.log('Complaint submitted:', response.data);
      // Reset form or handle success
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const feedPosts = [
    // Mock data for feed posts
  ];

  const TabNavigation = () => (
    <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 py-4">
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

        {/* Mobile Navigation */}
        <div className="md:hidden py-3">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeTab === "community" ? "default" : "ghost"}
              onClick={() => setActiveTab("community")}
              size="sm"
              className={activeTab === "community" ? "bg-green-400 text-black" : "text-green-400"}
            >
              <Users className="w-4 h-4 mr-1" />
              Community
            </Button>
            <Button 
              variant={activeTab === "feed" ? "default" : "ghost"}
              onClick={() => setActiveTab("feed")}
              size="sm"
              className={activeTab === "feed" ? "bg-green-400 text-black" : "text-green-400"}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Feed
            </Button>
            <Button 
              variant={activeTab === "complain" ? "default" : "ghost"}
              onClick={() => setActiveTab("complain")}
              size="sm"
              className={activeTab === "complain" ? "bg-green-400 text-black" : "text-green-400"}
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Complain
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const FeedPost = ({ post }) => (
    <Card className="border border-gray-700 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
      {/* Post content */}
    </Card>
  )

  return (
    <div className="w-full min-h-screen bg-black">
      <NavigationHeader title="CITIZEN DASHBOARD" customBackPath="/citizen" />
      <TabNavigation />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Community Tab */}
        {activeTab === "community" && (
          <div className="space-y-6">
            {/* Community content */}
          </div>
        )}

        {/* Feed Tab */}
        {activeTab === "feed" && (
          <div className="space-y-6">
            {/* Feed content */}
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
                    name="title"
                    value={complaintData.title}
                    onChange={handleInputChange}
                    placeholder="Brief title of the issue"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">DESCRIPTION</label>
                  <Textarea 
                    name="description"
                    value={complaintData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the issue in detail..."
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 min-h-[100px]"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">LOCATION</label>
                  <Input 
                    name="location"
                    value={complaintData.location}
                    onChange={handleInputChange}
                    placeholder="Enter address or landmark"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>

                {/* Contact Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">MOBILE NUMBER</label>
                    <Input 
                      name="mobile"
                      value={complaintData.mobile}
                      onChange={handleInputChange}
                      placeholder="Your mobile number"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-gray-300 mb-2">EMAIL ADDRESS</label>
                    <Input 
                      name="email"
                      value={complaintData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                    />
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
                <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-green-400 to-cyan-400 text-black font-black text-lg h-12 hover:from-green-300 hover:to-cyan-300">
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