"use client"

import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  MapPin, 
  Clock, 
  Heart, 
  MessageCircle, 
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock3
} from "lucide-react"
import { toast } from "sonner"

interface Complaint {
  _id: string
  title: string
  description: string
  type: string
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected'
  priority: 'low' | 'medium' | 'high' | 'critical'
  location: {
    address: string
    coordinates: [number, number]
  }
  author: {
    _id: string
    name: string
    email: string
  }
  likes: string[]
  comments: any[]
  images: { url: string; publicId: string }[]
  contact: {
    mobile: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

const STATUS_CONFIG = {
  pending: { icon: Clock3, color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30", label: "Pending" },
  in_progress: { icon: AlertCircle, color: "bg-blue-500/10 text-blue-400 border-blue-500/30", label: "In Progress" },
  resolved: { icon: CheckCircle, color: "bg-green-500/10 text-green-400 border-green-500/30", label: "Resolved" },
  rejected: { icon: XCircle, color: "bg-red-500/10 text-red-400 border-red-500/30", label: "Rejected" }
}

const PRIORITY_CONFIG = {
  low: { color: "bg-green-500/10 text-green-400 border-green-500/30" },
  medium: { color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
  high: { color: "bg-orange-500/10 text-orange-400 border-orange-500/30" },
  critical: { color: "bg-red-500/10 text-red-400 border-red-500/30" }
}

const CATEGORY_EMOJI = {
  pothole: "🕳️",
  waste: "🗑️",
  air_pollution: "💨",
  noise: "🔊",
  streetlight: "💡",
  water: "💧",
  other: "📍"
}

export default function ComplaintsList() {
  const { data: session } = useSession()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchComplaints()
  }, [filter])

  const fetchComplaints = async () => {
    try {
      const queryParams = filter !== "all" ? `?status=${filter}` : ""
      const response = await fetch(`/api/complaints${queryParams}`)
      const data = await response.json()
      
      if (response.ok) {
        setComplaints(data)
      } else {
        toast.error("Failed to fetch complaints")
      }
    } catch (error) {
      console.error("Error fetching complaints:", error)
      toast.error("An error occurred while fetching complaints")
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (complaintId: string) => {
    if (!session) {
      toast.error("Please login to like complaints")
      return
    }

    try {
      const response = await fetch(`/api/complaints/${complaintId}/like`, {
        method: 'POST'
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Update the complaint in the list
        setComplaints(prev => prev.map(complaint => {
          if (complaint._id === complaintId) {
            const hasLiked = complaint.likes.includes(session.user.id)
            return {
              ...complaint,
              likes: hasLiked 
                ? complaint.likes.filter(id => id !== session.user.id)
                : [...complaint.likes, session.user.id]
            }
          }
          return complaint
        }))
      } else {
        toast.error(data.error || "Failed to like complaint")
      }
    } catch (error) {
      console.error("Error liking complaint:", error)
      toast.error("An error occurred")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "in_progress", "resolved", "rejected"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status === "all" ? "All" : STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.label}
          </Button>
        ))}
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.length === 0 ? (
          <Card className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold text-muted-foreground">No complaints found</p>
            <p className="text-sm text-muted-foreground mt-2">
              {filter === "all" ? "Be the first to report an issue!" : `No ${filter.replace('_', ' ')} complaints.`}
            </p>
          </Card>
        ) : (
          complaints.map((complaint) => {
            const StatusIcon = STATUS_CONFIG[complaint.status].icon
            const hasLiked = session ? complaint.likes.includes(session.user.id) : false
            
            return (
              <Card key={complaint._id} className="p-6 border-accent/30 bg-card/50 backdrop-blur hover:bg-card/70 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {CATEGORY_EMOJI[complaint.type as keyof typeof CATEGORY_EMOJI] || "📍"}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{complaint.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{complaint.author.name}</span>
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{formatDate(complaint.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={PRIORITY_CONFIG[complaint.priority].color}>
                      {complaint.priority}
                    </Badge>
                    <Badge variant="outline" className={STATUS_CONFIG[complaint.status].color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {STATUS_CONFIG[complaint.status].label}
                    </Badge>
                  </div>
                </div>

                <p className="text-foreground/80 mb-4 line-clamp-2">{complaint.description}</p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{complaint.location.address}</span>
                </div>

                {complaint.images && complaint.images.length > 0 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto">
                    {complaint.images.slice(0, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Complaint image ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-border/30"
                      />
                    ))}
                    {complaint.images.length > 3 && (
                      <div className="w-20 h-20 rounded-lg border border-border/30 bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">
                        +{complaint.images.length - 3}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(complaint._id)}
                      className={`gap-2 ${hasLiked ? 'text-red-400' : 'text-muted-foreground'}`}
                    >
                      <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                      <span>{complaint.likes.length}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span>{complaint.comments.length}</span>
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Contact: {complaint.contact.mobile}
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}