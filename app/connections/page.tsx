"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, UserX, MessageCircle, MoreVertical, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "../../hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Connection {
  id: string
  userId: string
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
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [connections, setConnections] = useState<Connection[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("connected")

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
    // Sample connections data
    const sampleConnections: Connection[] = [
      {
        id: "1",
        userId: "amara123",
        name: "Amara",
        age: 28,
        occupation: "Graphic Designer",
        location: "Lagos, Nigeria",
        avatar: "/images/male1.jpg",
        lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        isOnline: true,
        compatibility: 92,
        status: "connected",
      },
      {
        id: "2",
        userId: "kemi456",
        name: "Kemi",
        age: 26,
        occupation: "Marketing Manager",
        location: "Abuja, Nigeria",
        avatar: "/images/female1.jpg",
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isOnline: false,
        compatibility: 88,
        status: "connected",
      },
      {
        id: "3",
        userId: "david789",
        name: "David",
        age: 32,
        occupation: "Software Engineer",
        location: "Port Harcourt, Nigeria",
        avatar: "/images/male2.jpg",
        lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        isOnline: false,
        compatibility: 85,
        status: "connected",
      },
      {
        id: "4",
        userId: "funmi101",
        name: "Funmi",
        age: 29,
        occupation: "Doctor",
        location: "Ibadan, Nigeria",
        avatar: "/images/female2.jpg",
        lastSeen: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        isOnline: false,
        compatibility: 90,
        status: "blocked",
      },
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
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: "blocked" as const }
          : conn
      )
    )
    
    toast({
      title: "User Blocked",
      description: "The user has been blocked successfully.",
    })
  }

  const handleUnblock = (connectionId: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: "connected" as const }
          : conn
      )
    )
    
    toast({
      title: "User Unblocked",
      description: "The user has been unblocked successfully.",
    })
  }

  const formatLastSeen = (date: Date): string => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.occupation.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "connected" ? connection.status === "connected" : connection.status === "blocked"
    return matchesSearch && matchesTab
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
            <h1 className="text-2xl font-bold">My Connections</h1>
            <p className="text-white/80 mt-1">Manage your connections and privacy</p>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <Badge className="bg-white/20 text-white">
              {connections.filter(c => c.status === "connected").length}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger 
              value="connected" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white"
            >
              Connected
              <Badge className="ml-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                {connections.filter(c => c.status === "connected").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="blocked" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white"
            >
              Blocked
              <Badge className="ml-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                {connections.filter(c => c.status === "blocked").length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>

          <TabsContent value="connected" className="space-y-4">
            {filteredConnections.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
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
              filteredConnections.map((connection) => (
                <Card key={connection.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={connection.avatar} alt={connection.name} />
                            <AvatarFallback className="bg-[#B22222] text-white">
                              {connection.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {connection.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {connection.name}, {connection.age}
                            </h3>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {connection.compatibility}% Match
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {connection.occupation} • {connection.location}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {connection.isOnline ? "Online" : `Last seen ${formatLastSeen(connection.lastSeen)}`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => router.push(`/messages?user=${connection.userId}`)}
                          size="sm"
                          className="bg-[#B22222] hover:bg-[#8B0000] text-white"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/profile/${connection.userId}`)}>
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
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="blocked" className="space-y-4">
            {filteredConnections.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Blocked Users
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery ? "No blocked users match your search." : "You haven't blocked any users."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredConnections.map((connection) => (
                <Card key={connection.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={connection.avatar} alt={connection.name} />
                          <AvatarFallback className="bg-[#B22222] text-white">
                            {connection.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {connection.name}, {connection.age}
                            </h3>
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              Blocked
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {connection.occupation} • {connection.location}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Blocked on {connection.lastSeen.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleUnblock(connection.id)}
                        variant="outline"
                        size="sm"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        <User className="h-4 w-4 mr-1" />
                        Unblock
                      </Button>
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