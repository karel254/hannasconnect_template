"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, X, User, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "../../hooks/use-toast"

interface ConnectionRequest {
  id: string
  userId: string
  name: string
  age: number
  occupation: string
  location: string
  avatar: string
  message?: string
  timestamp: Date
  status: "pending" | "accepted" | "rejected"
  compatibility: number
}

export default function RequestsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [requests, setRequests] = useState<ConnectionRequest[]>([])
  const [activeTab, setActiveTab] = useState("pending")

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
    
    // Load sample requests
    loadRequests()
  }, [router])

  const loadRequests = () => {
    // Sample connection requests data
    const sampleRequests: ConnectionRequest[] = [
      {
        id: "1",
        userId: "amara123",
        name: "Amara",
        age: 28,
        occupation: "Graphic Designer",
        location: "Lagos, Nigeria",
        avatar: "/images/male1.jpg",
        message: "Hi! I loved your profile. Would love to connect and get to know you better!",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: "pending",
        compatibility: 92,
      },
      {
        id: "2",
        userId: "kemi456",
        name: "Kemi",
        age: 26,
        occupation: "Marketing Manager",
        location: "Abuja, Nigeria",
        avatar: "/images/female1.jpg",
        message: "Hey there! Your interests really caught my attention. Let's chat!",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        status: "pending",
        compatibility: 88,
      },
      {
        id: "3",
        userId: "david789",
        name: "David",
        age: 32,
        occupation: "Software Engineer",
        location: "Port Harcourt, Nigeria",
        avatar: "/images/male2.jpg",
        message: "Hello! I think we have a lot in common. Would you like to connect?",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        status: "accepted",
        compatibility: 85,
      },
      {
        id: "4",
        userId: "funmi101",
        name: "Funmi",
        age: 29,
        occupation: "Doctor",
        location: "Ibadan, Nigeria",
        avatar: "/images/female2.jpg",
        message: "Hi! Your profile is amazing. I'd love to get to know you!",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: "rejected",
        compatibility: 90,
      },
    ]
    setRequests(sampleRequests)
  }

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "accepted" as const }
          : req
      )
    )
    
    toast({
      title: "Request Accepted!",
      description: "You can now start chatting with this person.",
    })
  }

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "rejected" as const }
          : req
      )
    )
    
    toast({
      title: "Request Rejected",
      description: "The request has been declined.",
    })
  }

  const formatTime = (date: Date): string => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const filteredRequests = requests.filter(request => {
    if (activeTab === "pending") return request.status === "pending"
    if (activeTab === "accepted") return request.status === "accepted"
    if (activeTab === "rejected") return request.status === "rejected"
    return true
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B22222] mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Connection Requests</h1>
            <p className="text-white/80 mt-1">Manage your incoming requests</p>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6" />
            <Badge className="bg-white/20 text-white">
              {requests.filter(r => r.status === "pending").length}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger 
              value="pending" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white"
            >
              Pending
              <Badge className="ml-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                {requests.filter(r => r.status === "pending").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="accepted" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white"
            >
              Accepted
            </TabsTrigger>
            <TabsTrigger 
              value="rejected" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white"
            >
              Rejected
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {filteredRequests.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Pending Requests
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    You don't have any pending connection requests at the moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((request) => (
                <Card key={request.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback className="bg-[#B22222] text-white">
                          {request.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {request.name}, {request.age}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {request.occupation} • {request.location}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {request.compatibility}% Match
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(request.timestamp)}
                            </div>
                          </div>
                        </div>
                        
                        {request.message && (
                          <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                            "{request.message}"
                          </p>
                        )}
                        
                        <div className="flex space-x-3">
                          <Button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleRejectRequest(request.id)}
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {filteredRequests.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Accepted Requests
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    You haven't accepted any connection requests yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((request) => (
                <Card key={request.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback className="bg-[#B22222] text-white">
                          {request.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {request.name}, {request.age}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {request.occupation} • {request.location}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Connected
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(request.timestamp)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-nowrap gap-3 mt-2">
                          <Button
                            onClick={() => router.push(`/messages?user=${request.userId}`)}
                            className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white min-w-0"
                          >
                            <User className="h-4 w-4 mr-2" />
                            Send Message
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 min-w-0"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {filteredRequests.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <X className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Rejected Requests
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    You haven't rejected any connection requests.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((request) => (
                <Card key={request.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback className="bg-[#B22222] text-white">
                          {request.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {request.name}, {request.age}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {request.occupation} • {request.location}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              Rejected
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(request.timestamp)}
                            </div>
                          </div>
                        </div>
                        
                        {request.message && (
                          <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                            "{request.message}"
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 