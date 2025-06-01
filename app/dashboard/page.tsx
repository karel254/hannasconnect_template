"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Bell,
  Settings,
  User,
  Search,
  Filter,
  Send,
  CheckCircle,
  X,
  ArrowLeft,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sendConnectionRequest, acceptConnection, rejectConnection } from "../actions"
import { useToast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("matches")
  const [activeChatUser, setActiveChatUser] = useState<any>(null)
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])

  // User profile information - in a real app, this would come from a database
  const [userProfile, setUserProfile] = useState({
    username: "johndoe",
    name: "John Doe",
    occupation: "Software Engineer",
    avatar: "/images/avatar1.png",
  })

  // Simulate loading user data from localStorage or cookies
  useEffect(() => {
    // In a real app, this would fetch from an API or database
    const storedUsername = localStorage.getItem("username")
    const storedName = localStorage.getItem("name")
    const storedOccupation = localStorage.getItem("occupation")

    if (storedUsername && storedName && storedOccupation) {
      setUserProfile({
        username: storedUsername,
        name: storedName,
        occupation: storedOccupation,
        avatar: "/images/avatar1.png",
      })
    }
  }, [])

  // Sample matches data
  const matches = [
    {
      id: 1,
      name: "Alex Johnson",
      age: 32,
      occupation: "Software Engineer",
      compatibility: "85%",
      icon: "/images/avatar1.png",
      lastActive: "2 hours ago",
      interests: ["Technology", "Hiking", "Reading"],
      email: "alex@example.com",
    },
    {
      id: 2,
      name: "Amina Okafor",
      age: 28,
      occupation: "Financial Analyst",
      icon: "/images/avatar2.png",
      lastActive: "Online",
      interests: ["Finance", "Fitness", "Travel"],
      email: "amina@example.com",
    },
    {
      id: 3,
      name: "David Mensah",
      age: 35,
      occupation: "Doctor",
      compatibility: "78%",
      icon: "/images/avatar3.png",
      lastActive: "1 day ago",
      interests: ["Healthcare", "Music", "Community Service"],
      email: "david@example.com",
    },
    {
      id: 4,
      name: "Sarah Osei",
      age: 30,
      occupation: "Corporate Lawyer",
      compatibility: "88%",
      icon: "/images/avatar4.png",
      lastActive: "3 hours ago",
      interests: ["Law", "Art", "Politics"],
      email: "sarah@example.com",
    },
  ]

  // Sample connection requests
  const [connectionRequests, setConnectionRequests] = useState([
    {
      id: 1,
      name: "Michael Chen",
      age: 33,
      occupation: "Marketing Manager",
      icon: "/images/avatar1.png",
      requestDate: "2 days ago",
      email: "michael@example.com",
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 29,
      occupation: "UX Designer",
      icon: "/images/avatar2.png",
      requestDate: "1 day ago",
      email: "priya@example.com",
    },
  ])

  // Sample chat conversations
  const [chatUsers, setChatUsers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      icon: "/images/avatar1.png",
      lastMessage: "I'd love to hear more about your hiking experiences!",
      time: "2 hours ago",
      unread: true,
      email: "alex@example.com",
    },
    {
      id: 2,
      name: "Amina Okafor",
      icon: "/images/avatar2.png",
      lastMessage: "That sounds like a great plan for the weekend.",
      time: "Yesterday",
      unread: false,
      email: "amina@example.com",
    },
  ])

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "match",
      content: "You have a new match with Sarah Osei!",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      content: "Alex Johnson sent you a new message.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 3,
      type: "system",
      content: "Your profile has been viewed by 5 new people today.",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "match",
      content: "You have a new match with David Mensah!",
      time: "1 day ago",
      read: true,
    },
  ]

  const handleSendConnectionRequest = async (match: any) => {
    const formData = new FormData()
    formData.append("recipientEmail", match.email)
    formData.append("recipientName", match.name)
    formData.append("senderName", userProfile.name)

    try {
      const result = await sendConnectionRequest(formData)
      if (result.success) {
        toast({
          title: "Connection Request Sent",
          description: `Your connection request to ${match.name} has been sent successfully.`,
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAcceptConnection = async (request: any) => {
    const formData = new FormData()
    formData.append("recipientEmail", request.email)
    formData.append("recipientName", request.name)
    formData.append("acceptorName", userProfile.name)

    try {
      const result = await acceptConnection(formData)
      if (result.success) {
        // Add to chat users
        setChatUsers((prev) => [
          ...prev,
          {
            id: request.id,
            name: request.name,
            icon: request.icon,
            lastMessage: "You accepted their connection request.",
            time: "Just now",
            unread: false,
            email: request.email,
          },
        ])

        // Remove from connection requests
        setConnectionRequests((prev) => prev.filter((r) => r.id !== request.id))

        toast({
          title: "Connection Accepted",
          description: `You have accepted ${request.name}'s connection request.`,
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept connection. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRejectConnection = async (request: any) => {
    const formData = new FormData()
    formData.append("recipientEmail", request.email)
    formData.append("recipientName", request.name)

    try {
      const result = await rejectConnection(formData)
      if (result.success) {
        // Remove from connection requests
        setConnectionRequests((prev) => prev.filter((r) => r.id !== request.id))

        toast({
          title: "Connection Rejected",
          description: `You have rejected ${request.name}'s connection request.`,
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject connection. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || !activeChatUser) return

    // Add message to chat
    const newMessage = {
      id: Date.now(),
      sender: "you",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessageInput("")

    // Simulate response after 1 second
    setTimeout(() => {
      const responseMessage = {
        id: Date.now() + 1,
        sender: "them",
        text: `Thanks for your message! This is an automated response from ${activeChatUser.name}.`,
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, responseMessage])
    }, 1000)
  }

  const openChat = (user: any) => {
    setActiveChatUser(user)
    setActiveTab("chat")

    // Load chat history (in a real app, this would come from a database)
    setMessages([
      {
        id: 1,
        sender: "them",
        text: `Hi there! I'm ${user.name}. It's nice to connect with you!`,
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        sender: "you",
        text: "Hello! It's great to connect with you too. How are you doing today?",
        timestamp: "10:32 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "I'm doing well, thank you! I noticed we have some common interests. Would you like to chat more about them?",
        timestamp: "10:35 AM",
      },
    ])
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto py-6 px-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#FF69B4] to-[#FF9CC0] text-white p-4 rounded-lg mb-6 shadow-md">
          <div className="flex items-center">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Welcome, {userProfile.name}!</h1>
              <p className="opacity-90">{userProfile.occupation}</p>
            </div>
            <Button className="bg-white text-[#B22222] hover:bg-gray-100">Complete Your Profile</Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-[#B22222]">{userProfile.name}</h2>
                  <p className="text-gray-600">{userProfile.occupation}</p>
                  <Badge className="mt-2 bg-[#FF69B4] hover:bg-[#FF69B4]">Premium Member</Badge>
                </div>

                <div className="space-y-2">
                  <Button
                    variant={activeTab === "matches" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "matches" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => setActiveTab("matches")}
                  >
                    <Heart className="mr-2 h-4 w-4" /> Matches
                  </Button>
                  <Button
                    variant={activeTab === "requests" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "requests" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => setActiveTab("requests")}
                  >
                    <User className="mr-2 h-4 w-4" /> Connection Requests
                    {connectionRequests.length > 0 && (
                      <Badge className="ml-auto bg-[#FF69B4] hover:bg-[#FF69B4]">{connectionRequests.length}</Badge>
                    )}
                  </Button>
                  <Button
                    variant={activeTab === "messages" || activeTab === "chat" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "messages" || activeTab === "chat" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => {
                      setActiveTab("messages")
                      setActiveChatUser(null)
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> Messages
                    {chatUsers.filter((u) => u.unread).length > 0 && (
                      <Badge className="ml-auto bg-[#FF69B4] hover:bg-[#FF69B4]">
                        {chatUsers.filter((u) => u.unread).length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "notifications" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" /> Notifications
                    {notifications.filter((n) => !n.read).length > 0 && (
                      <Badge className="ml-auto bg-[#FF69B4] hover:bg-[#FF69B4]">
                        {notifications.filter((n) => !n.read).length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "profile" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" /> My Profile
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "settings" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">Completion Status</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#B22222] h-2.5 rounded-full w-[85%]"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Complete your profile to improve matches</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {/* Matches Tab */}
            {activeTab === "matches" && (
              <div className="space-y-6">
                <Card className="shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl text-[#B22222]">Your Matches</CardTitle>
                        <CardDescription>People who share your values and interests</CardDescription>
                      </div>
                      <Button className="bg-[#B22222] hover:bg-[#8B0000]">Find More Matches</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div className="relative w-full max-w-sm">
                        <Search
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <Input placeholder="Search matches" className="pl-10" />
                      </div>
                      <Button variant="outline" className="ml-2 flex items-center">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {matches.map((match) => (
                        <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <CardContent className="p-0">
                            <div className="flex p-4">
                              <div className="mr-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={match.icon || "/placeholder.svg"} alt={match.name} />
                                  <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-[#B22222]">
                                      {match.name}, {match.age}
                                    </h3>
                                    <p className="text-sm text-gray-600">{match.occupation}</p>
                                    <p className="text-xs text-gray-500">{match.lastActive}</p>
                                  </div>
                                  <Badge className="bg-[#FF69B4] hover:bg-[#FF69B4]">{match.compatibility}</Badge>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {match.interests.map((interest, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {interest}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex border-t">
                              <Button
                                className="flex-1 rounded-none bg-white text-[#B22222] hover:bg-gray-50 border-r"
                                variant="ghost"
                              >
                                View Profile
                              </Button>
                              <Button
                                className="flex-1 rounded-none bg-white text-[#B22222] hover:bg-gray-50"
                                onClick={() => handleSendConnectionRequest(match)}
                              >
                                <Heart className="mr-2 h-4 w-4" /> Connect
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#B22222]">Recommended for You</CardTitle>
                    <CardDescription>Based on your preferences and values</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {matches.slice(0, 3).map((match) => (
                        <Card key={match.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardContent className="p-4 text-center">
                            <Avatar className="h-20 w-20 mx-auto mb-3">
                              <AvatarImage src={match.icon || "/placeholder.svg"} alt={match.name} />
                              <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-[#B22222]">
                              {match.name}, {match.age}
                            </h3>
                            <p className="text-sm text-gray-600">{match.occupation}</p>
                            <Badge className="mt-2 bg-[#FF69B4] hover:bg-[#FF69B4]">{match.compatibility}</Badge>
                            <Button
                              className="w-full mt-3 bg-[#B22222] hover:bg-[#8B0000]"
                              onClick={() => handleSendConnectionRequest(match)}
                            >
                              Connect
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Connection Requests Tab */}
            {activeTab === "requests" && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#B22222]">Connection Requests</CardTitle>
                  <CardDescription>People who want to connect with you</CardDescription>
                </CardHeader>
                <CardContent>
                  {connectionRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="mx-auto mb-4 bg-gray-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No Connection Requests</h3>
                      <p className="text-gray-500 mt-2">
                        You don't have any pending connection requests at the moment.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {connectionRequests.map((request) => (
                        <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <Avatar className="h-16 w-16 mr-4">
                                <AvatarImage src={request.icon || "/placeholder.svg"} alt={request.name} />
                                <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-[#B22222]">
                                      {request.name}, {request.age}
                                    </h3>
                                    <p className="text-sm text-gray-600">{request.occupation}</p>
                                    <p className="text-xs text-gray-500">Requested {request.requestDate}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end mt-4 space-x-2">
                              <Button
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-50"
                                onClick={() => handleRejectConnection(request)}
                              >
                                <X className="mr-2 h-4 w-4" /> Decline
                              </Button>
                              <Button
                                className="bg-[#B22222] hover:bg-[#8B0000] text-white"
                                onClick={() => handleAcceptConnection(request)}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" /> Accept
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#B22222]">Messages</CardTitle>
                  <CardDescription>Your conversations with matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input placeholder="Search conversations" className="pl-10" />
                  </div>

                  <div className="space-y-2">
                    {chatUsers.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="mx-auto mb-4 bg-gray-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                          <MessageCircle className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Messages Yet</h3>
                        <p className="text-gray-500 mt-2">
                          When you connect with someone, you'll be able to message them here.
                        </p>
                      </div>
                    ) : (
                      chatUsers.map((user) => (
                        <Card
                          key={user.id}
                          className={`hover:shadow-md transition-shadow cursor-pointer ${
                            user.unread ? "border-l-4 border-l-[#FF69B4]" : ""
                          }`}
                          onClick={() => openChat(user)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <Avatar className="h-12 w-12 mr-4">
                                <AvatarImage src={user.icon || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-semibold text-[#B22222]">{user.name}</h3>
                                  <span className="text-xs text-gray-500">{user.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-1">{user.lastMessage}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Chat */}
            {activeTab === "chat" && activeChatUser && (
              <Card className="shadow-md h-[calc(100vh-150px)] flex flex-col">
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => setActiveTab("messages")}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={activeChatUser.icon || "/placeholder.svg"} alt={activeChatUser.name} />
                      <AvatarFallback>{activeChatUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-[#B22222]">{activeChatUser.name}</CardTitle>
                      <CardDescription className="text-xs">Online</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "them" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                          <AvatarImage src={activeChatUser.icon || "/placeholder.svg"} alt={activeChatUser.name} />
                          <AvatarFallback>{activeChatUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="max-w-[70%]">
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "you" ? "bg-[#B22222] text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p>{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <Input
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      className="ml-2 bg-[#B22222] hover:bg-[#8B0000]"
                      disabled={!messageInput.trim()}
                    >
                      <Send size={18} />
                    </Button>
                  </form>
                </div>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl text-[#B22222]">Notifications</CardTitle>
                      <CardDescription>Stay updated with your activity</CardDescription>
                    </div>
                    <Button variant="outline">Mark All as Read</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="matches">Matches</TabsTrigger>
                      <TabsTrigger value="messages">Messages</TabsTrigger>
                      <TabsTrigger value="system">System</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4 space-y-4">
                      {notifications.map((notification) => (
                        <Card
                          key={notification.id}
                          className={`hover:shadow-md transition-shadow ${
                            !notification.read ? "border-l-4 border-l-[#FF69B4]" : ""
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start">
                              <div
                                className={`rounded-full p-2 mr-4 ${
                                  notification.type === "match"
                                    ? "bg-[#FF69B4]/20"
                                    : notification.type === "message"
                                      ? "bg-blue-100"
                                      : "bg-gray-100"
                                }`}
                              >
                                {notification.type === "match" ? (
                                  <Heart className="h-5 w-5 text-[#FF69B4]" />
                                ) : notification.type === "message" ? (
                                  <MessageCircle className="h-5 w-5 text-blue-500" />
                                ) : (
                                  <Bell className="h-5 w-5 text-gray-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <p className="text-sm text-gray-700">{notification.content}</p>
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                    <TabsContent value="matches" className="mt-4 space-y-4">
                      {notifications
                        .filter((n) => n.type === "match")
                        .map((notification) => (
                          <Card
                            key={notification.id}
                            className={`hover:shadow-md transition-shadow ${
                              !notification.read ? "border-l-4 border-l-[#FF69B4]" : ""
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <div className="bg-[#FF69B4]/20 rounded-full p-2 mr-4">
                                  <Heart className="h-5 w-5 text-[#FF69B4]" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <p className="text-sm text-gray-700">{notification.content}</p>
                                    <span className="text-xs text-gray-500">{notification.time}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </TabsContent>
                    {/* Similar TabsContent for messages and system */}
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl text-[#B22222]">My Profile</CardTitle>
                      <CardDescription>Manage your profile information</CardDescription>
                    </div>
                    <Button className="bg-[#B22222] hover:bg-[#8B0000]">Save Changes</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="personal">Personal Info</TabsTrigger>
                      <TabsTrigger value="preferences">Preferences</TabsTrigger>
                      <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="mt-6 space-y-6">
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="md:w-1/3 flex flex-col items-center">
                          <Avatar className="h-32 w-32 mb-4">
                            <AvatarImage src={userProfile.avatar || "/images/avatar1.png"} alt="Your profile" />
                            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Button variant="outline" className="w-full">
                            Change Icon
                          </Button>
                        </div>
                        <div className="md:w-2/3 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                              <Input defaultValue={userProfile.name} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                              <Input defaultValue={userProfile.username} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                              <Input type="number" defaultValue="30" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                              <Input defaultValue={userProfile.occupation} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                              <Select defaultValue="bachelor">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select education level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high-school">High School</SelectItem>
                                  <SelectItem value="associate">Associate Degree</SelectItem>
                                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                                  <SelectItem value="master">Master's Degree</SelectItem>
                                  <SelectItem value="doctorate">Doctorate</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
                            <textarea
                              className="w-full p-2 border border-gray-300 rounded-md"
                              rows={4}
                              defaultValue="I'm passionate about technology and building meaningful relationships. Looking for someone who shares my values and enjoys deep conversations."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Other tabs content would go here */}
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#B22222]">Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="account">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account" className="mt-6 space-y-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-[#B22222] mb-2">Email Address</h3>
                          <Input defaultValue="your.email@example.com" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-[#B22222] mb-2">Password</h3>
                          <Button variant="outline">Change Password</Button>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-[#B22222] mb-2">Subscription</h3>
                          <div className="bg-[#FF69B4]/10 p-4 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Premium Membership</p>
                                <p className="text-sm text-gray-600">Renews on June 15, 2023</p>
                              </div>
                              <Button variant="outline">Manage</Button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t">
                          <Button variant="destructive">Delete Account</Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Other tabs content would go here */}
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
