"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { User, UserX, Search, ArrowLeft, MessageCircle, MoreVertical, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "../../hooks/use-toast"
import ProfileModal from "@/components/ProfileModal"
import { useNavigationHistory } from "../../hooks/use-navigation-history"

interface Connection {
  id: string
  userId: string
  username: string
  name: string
  age: number
  occupation: string
  location: string
  avatar: string
  lastSeen: Date
  isOnline: boolean
  compatibility: number
  status: "connected" | "blocked"
}

export default function ConnectionsPage() {
  const router = useRouter()
  const { goBack } = useNavigationHistory()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [connections, setConnections] = useState<Connection[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
    
    // Load sample connections
    loadConnections()
  }, [router])

  const loadConnections = () => {
    // Sample connections data - only connected users
    const sampleConnections: Connection[] = [
      {
        id: "1",
        userId: "brianotieno",
        username: "brianotieno",
        name: "Brian Otieno",
        age: 34,
        occupation: "Engineer",
        location: "Kisumu, Kenya",
        avatar: "/images/male3.jpg",
        lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        isOnline: true,
        compatibility: 93,
        status: "connected"
      },
      {
        id: "2",
        userId: "faithwambui",
        username: "faithwambui",
        name: "Faith Wambui",
        age: 27,
        occupation: "Banker",
        location: "Nairobi, Kenya",
        avatar: "/images/female3.jpg",
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isOnline: false,
        compatibility: 87,
        status: "connected"
      },
      {
        id: "3",
        userId: "janetmwikali",
        username: "janetmwikali",
        name: "Janet Mwikali",
        age: 29,
        occupation: "Teacher",
        location: "Machakos, Kenya",
        avatar: "/images/female4.jpg",
        lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        isOnline: false,
        compatibility: 91,
        status: "connected"
      },
      {
        id: "4",
        userId: "petermwangi",
        username: "petermwangi",
        name: "Peter Mwangi",
        age: 44,
        occupation: "Businessman",
        location: "Nakuru, Kenya",
        avatar: "/images/male4.jpeg",
        lastSeen: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        isOnline: true,
        compatibility: 78,
        status: "connected"
      },
      {
        id: "5",
        userId: "emilysmith",
        username: "emilysmith",
        name: "Emily Smith",
        age: 31,
        occupation: "Software Engineer",
        location: "London, UK",
        avatar: "/images/female5.jpg",
        lastSeen: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        isOnline: false,
        compatibility: 85,
        status: "connected"
      },
      {
        id: "6",
        userId: "rajpatel",
        username: "rajpatel",
        name: "Raj Patel",
        age: 36,
        occupation: "Doctor",
        location: "Mumbai, India",
        avatar: "/images/male2.jpg",
        lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        isOnline: false,
        compatibility: 82,
        status: "connected"
      }
    ]
    setConnections(sampleConnections)
  }

  const handleUnfriend = (connectionId: string) => {
    setConnections(prev => 
      prev.filter(conn => conn.id !== connectionId)
    )
    
    toast({
      title: "Connection Removed",
      description: "The connection has been removed from your list.",
    })
  }

  const handleBlock = (connectionId: string) => {
    // Remove the connection from the list (it will go to blocked users page)
    setConnections(prev => 
      prev.filter(conn => conn.id !== connectionId)
    )
    
    toast({
      title: "User Blocked",
      description: "The user has been blocked. You can manage blocked users in the Blocked Users section.",
    })
    
    // Optionally redirect to blocked users page
    setTimeout(() => {
      router.push("/blocked")
    }, 1500)
  }

  const formatLastSeen = (date: Date): string => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Filter connections to only show connected users
  const filteredConnections = useMemo(() => {
    return connections
      .filter(connection => connection.status === "connected")
      .filter(connection =>
        connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        connection.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        connection.occupation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        connection.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
  }, [connections, searchQuery])

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
      {/* Mobile Header with Back Navigation */}
      <div className="md:hidden sticky top-0 z-40 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-white">Connections</h1>
        </div>
        <div className="text-sm text-white/80">
          {connections.length} connections
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-40 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-white">Connections</h1>
          </div>
          <div className="text-sm text-white/80">
            {connections.length} connections
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Connections List */}
        {filteredConnections.length === 0 ? (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 sm:p-8 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No Connections Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? "No connections match your search." : "You don't have any connections yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredConnections.map((connection) => (
              <Card key={connection.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
                      <AvatarImage src={connection.avatar} alt={connection.name} />
                      <AvatarFallback className="bg-[#B22222] text-white text-sm sm:text-lg">{connection.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
                            @{connection.username}, {connection.age}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm truncate">{connection.occupation}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{connection.location}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                            Connected
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(connection.lastSeen)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => router.push(`/messages?user=${connection.userId}`)}
                          size="sm"
                          className="bg-[#B22222] hover:bg-[#8B0000] text-white text-xs sm:text-sm h-8 sm:h-10 flex-1"
                        >
                          <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Chat
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 sm:h-10 border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white flex-1">
                              <span className="text-xs sm:text-sm">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { setSelectedProfile(connection); setIsProfileModalOpen(true); }}>
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUnfriend(connection.id)}>
                              <UserX className="h-4 w-4 mr-2" />
                              Remove Connection
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBlock(connection.id)}>
                              <UserX className="h-4 w-4 mr-2" />
                              Block User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
                </div>
        )}
      </div>
      <ProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} profile={selectedProfile} />
    </div>
  )
} 