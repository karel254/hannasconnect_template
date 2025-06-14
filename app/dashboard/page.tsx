"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Heart,
  MessageCircle,
  Bell,
  Settings,
  User,
  Search,
  Send,
  CheckCircle,
  X,
  ArrowLeft,
  Menu,
  MoreVertical,
  Moon,
  Sun,
  Monitor,
  UserMinus,
  Users,
} from "lucide-react"
import { sendConnectionRequest, acceptConnection, rejectConnection } from "../actions"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "@/contexts/theme-context"

export default function Dashboard() {
  const { toast } = useToast()
  const { theme, resolvedTheme, setLightTheme, setDarkTheme, setSystemTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("matches")
  const [activeChatUser, setActiveChatUser] = useState<any>(null)
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(1)
  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  // Real-time timestamp function - updated to work properly
  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Add a function to get full timestamp for message storage
  const getFullTimestamp = () => {
    return new Date().toISOString()
  }

  // Remove automatic scrolling - let it be natural
  // useEffect(() => {
  //   scrollToBottom()
  // }, [messages])

  // User profile information
  const [userProfile, setUserProfile] = useState({
    username: "johndoe",
    name: "John Doe",
    occupation: "Software Engineer",
    avatar: "/images/avatar1.png",
    selectedIcon: 1,
  })

  // Blocked and unfriended users
  const [blockedUsers, setBlockedUsers] = useState([])
  const [unfriendedUsers, setUnfriendedUsers] = useState([])

  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      matches: true,
      messages: true,
      marketing: false,
    },
    privacy: {
      showOnline: true,
      showProfile: true,
      allowMessages: true,
      showLastSeen: false,
    },
    account: {
      twoFactor: false,
      emailVerified: true,
      phoneVerified: false,
    },
  })

  // Simulate loading user data
  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    const storedName = localStorage.getItem("name")
    const storedOccupation = localStorage.getItem("occupation")
    const storedIcon = localStorage.getItem("selectedIcon") || "1"

    if (storedUsername && storedName && storedOccupation) {
      setUserProfile({
        username: storedUsername,
        name: storedName,
        occupation: storedOccupation,
        avatar: `/images/avatar${storedIcon}.png`,
        selectedIcon: Number.parseInt(storedIcon),
      })
      setSelectedIcon(Number.parseInt(storedIcon))
    }
  }, [])

  // Sample data
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

  const [chatUsers, setChatUsers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      icon: "/images/avatar1.png",
      lastMessage: "I'd love to hear more about your hiking experiences!",
      time: "2 hours ago",
      unread: true,
      email: "alex@example.com",
      isOnline: true,
    },
    {
      id: 2,
      name: "Amina Okafor",
      icon: "/images/avatar2.png",
      lastMessage: "That sounds like a great plan for the weekend.",
      time: "Yesterday",
      unread: false,
      email: "amina@example.com",
      isOnline: false,
    },
  ])

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
  ]

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setIsMobileMenuOpen(false)
    if (tab !== "chat") {
      setActiveChatUser(null)
    }
  }

  const handleIconSelect = (iconNumber: number) => {
    setSelectedIcon(iconNumber)
    const newAvatar = `/images/avatar${iconNumber}.png`
    setUserProfile((prev) => ({
      ...prev,
      selectedIcon: iconNumber,
      avatar: newAvatar,
    }))
    localStorage.setItem("selectedIcon", iconNumber.toString())

    toast({
      title: "Profile Icon Updated",
      description: "Your profile icon has been successfully updated.",
    })
  }

  const handleUnfriendUser = async (user: any) => {
    try {
      setChatUsers((prev) => prev.filter((u) => u.id !== user.id))
      setUnfriendedUsers((prev) => [...prev, user])

      toast({
        title: "Connection Removed",
        description: `You have removed ${user.name} from your connections.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove connection. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleBlockUser = async (user: any) => {
    try {
      setChatUsers((prev) => prev.filter((u) => u.id !== user.id))
      setBlockedUsers((prev) => [...prev, user])

      toast({
        title: "User Blocked",
        description: `You have blocked ${user.name}. They will no longer be able to contact you.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to block user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUnblockUser = async (user: any) => {
    try {
      setBlockedUsers((prev) => prev.filter((u) => u.id !== user.id))

      toast({
        title: "User Unblocked",
        description: `You have unblocked ${user.name}. They can now contact you again.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unblock user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRefriendUser = async (user: any) => {
    try {
      setUnfriendedUsers((prev) => prev.filter((u) => u.id !== user.id))
      setChatUsers((prev) => [
        ...prev,
        {
          ...user,
          lastMessage: "You reconnected with this user.",
          time: "Just now",
          unread: false,
          isOnline: Math.random() > 0.5,
        },
      ])

      toast({
        title: "Connection Restored",
        description: `You have reconnected with ${user.name}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reconnect. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }))
  }

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
            isOnline: Math.random() > 0.5,
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

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value)

    // Show typing indicator
    setIsTyping(true)

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to hide typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || !activeChatUser) return

    // Clear typing indicator
    setIsTyping(false)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Add message to chat with real-time timestamp
    const newMessage = {
      id: Date.now(),
      sender: "you",
      text: messageInput,
      timestamp: getCurrentTime(),
      fullTimestamp: getFullTimestamp(), // Store full timestamp for sorting
    }

    setMessages((prev) => [...prev, newMessage])
    setMessageInput("")

    // Show other user typing indicator
    setTimeout(() => {
      setOtherUserTyping(true)
    }, 500)

    // Simulate response after 2 seconds with real-time timestamp
    setTimeout(() => {
      setOtherUserTyping(false)
      const responseMessage = {
        id: Date.now() + 1,
        sender: "them",
        text: `Thanks for your message! I appreciate you reaching out. How has your day been?`,
        timestamp: getCurrentTime(), // This will be the actual time when response is sent
        fullTimestamp: getFullTimestamp(),
      }
      setMessages((prev) => [...prev, responseMessage])
    }, 2000)
  }

  const openChat = (user: any) => {
    setActiveChatUser(user)
    setActiveTab("chat")
    setIsMobileMenuOpen(false) // Close mobile menu if open

    // Mark as read
    setChatUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, unread: false } : u)))

    // Load chat history with realistic timestamps
    const now = new Date()
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60000)
    const eightMinutesAgo = new Date(now.getTime() - 8 * 60000)
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000)

    setMessages([
      {
        id: 1,
        sender: "them",
        text: `Hi there! I'm ${user.name}. It's nice to connect with you!`,
        timestamp: tenMinutesAgo.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
        fullTimestamp: tenMinutesAgo.toISOString(),
      },
      {
        id: 2,
        sender: "you",
        text: "Hello! It's great to connect with you too. How are you doing today?",
        timestamp: eightMinutesAgo.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
        fullTimestamp: eightMinutesAgo.toISOString(),
      },
      {
        id: 3,
        sender: "them",
        text: "I'm doing well, thank you! I noticed we have some common interests. Would you like to chat more about them?",
        timestamp: fiveMinutesAgo.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
        fullTimestamp: fiveMinutesAgo.toISOString(),
      },
    ])
  }

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-2xl rounded-bl-md max-w-[70%] shadow-sm">
      <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
        <AvatarImage src={activeChatUser?.icon || "/placeholder.svg"} alt={activeChatUser?.name} />
        <AvatarFallback className="text-xs">{activeChatUser?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex space-x-1">
        <div
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">typing...</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto py-6 px-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#FF69B4] to-[#FF9CC0] dark:from-gray-800 dark:to-gray-700 text-white p-4 rounded-lg mb-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold">Welcome, @{userProfile.username}!</h1>
              <p className="opacity-90 text-sm sm:text-base">{userProfile.occupation}</p>
            </div>
            <Button className="bg-white text-[#B22222] hover:bg-gray-100 text-sm sm:text-base px-4 py-2 transition-all duration-200">
              Complete Your Profile
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Menu Button */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full justify-center dark:border-gray-600 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="mr-2 h-4 w-4" />
              {isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            </Button>
          </div>

          {/* Sidebar */}
          <div
            className={`w-full lg:w-1/4 transition-all duration-300 ${isMobileMenuOpen ? "block" : "hidden lg:block"}`}
          >
            <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mb-4 ring-2 ring-[#B22222]/20 dark:ring-red-400/20">
                    <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.username} />
                    <AvatarFallback className="text-lg font-bold text-[#B22222] dark:text-red-400">
                      {userProfile.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg sm:text-xl font-bold text-[#B22222] dark:text-red-400 text-center">
                    @{userProfile.username}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base text-center">
                    {userProfile.occupation}
                  </p>
                  <Badge className="mt-2 bg-[#FF69B4] hover:bg-[#FF69B4] text-xs sm:text-sm">Premium Member</Badge>
                </div>

                <div className="space-y-1">
                  {[
                    { key: "matches", icon: Heart, label: "Matches" },
                    { key: "members", icon: Users, label: "Members" },
                    { key: "requests", icon: User, label: "Requests", badge: connectionRequests.length },
                    {
                      key: "messages",
                      icon: MessageCircle,
                      label: "Messages",
                      badge: chatUsers.filter((u) => u.unread).length,
                    },
                    {
                      key: "notifications",
                      icon: Bell,
                      label: "Notifications",
                      badge: notifications.filter((n) => !n.read).length,
                    },
                    { key: "profile", icon: User, label: "My Profile" },
                    { key: "settings", icon: Settings, label: "Settings" },
                  ].map(({ key, icon: Icon, label, badge }) => (
                    <Button
                      key={key}
                      variant={activeTab === key || (key === "messages" && activeTab === "chat") ? "default" : "ghost"}
                      className={`w-full justify-start h-10 text-sm transition-all duration-200 ${
                        activeTab === key || (key === "messages" && activeTab === "chat")
                          ? "bg-[#B22222] text-white dark:bg-red-600"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => {
                        if (key === "members") {
                          window.location.href = "/members"
                        } else {
                          handleTabChange(key)
                        }
                      }}
                    >
                      <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{label}</span>
                      {badge > 0 && (
                        <Badge className="ml-auto bg-[#FF69B4] hover:bg-[#FF69B4] text-xs min-w-[20px] h-5 flex items-center justify-center">
                          {badge}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">Completion Status</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-[#B22222] dark:bg-red-500 h-2 rounded-full w-[85%] transition-all duration-500"></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Complete your profile to improve matches
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Matches Tab */}
            {activeTab === "matches" && (
              <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-[#B22222] dark:text-red-400">Your Matches</CardTitle>
                  <CardDescription className="text-sm sm:text-base dark:text-gray-400">
                    People who might be perfect for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {matches.map((match) => (
                      <Card key={match.id} className="hover:shadow-lg transition-shadow dark:bg-gray-700">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <Avatar className="h-16 w-16 mr-4">
                              <AvatarImage src={match.icon || "/placeholder.svg"} alt={match.name} />
                              <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-[#B22222] dark:text-red-400">
                                {match.name}, {match.age}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300">{match.occupation}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{match.lastActive}</p>
                            </div>
                            {match.compatibility && (
                              <Badge className="bg-[#DAA520] hover:bg-[#B8860B] text-white">
                                {match.compatibility}
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {match.interests.map((interest, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white"
                              size="sm"
                            >
                              View Profile
                            </Button>
                            <Button
                              className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white"
                              size="sm"
                              onClick={() => handleSendConnectionRequest(match)}
                            >
                              <Heart size={14} className="mr-1" /> Connect
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && !activeChatUser && (
              <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-[#B22222] dark:text-red-400">Messages</CardTitle>
                  <CardDescription className="text-sm sm:text-base dark:text-gray-400">
                    Your conversations with matches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search conversations"
                      className="pl-10 h-10 dark:bg-gray-700 dark:border-gray-600 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    {chatUsers.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="mx-auto mb-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                          <MessageCircle className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Messages Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                          When you connect with someone, you'll be able to message them here.
                        </p>
                      </div>
                    ) : (
                      chatUsers.map((user) => (
                        <Card
                          key={user.id}
                          className={`hover:shadow-md transition-all duration-200 cursor-pointer dark:bg-gray-700 dark:border-gray-600 ${
                            user.unread ? "border-l-4 border-l-[#FF69B4] bg-[#FF69B4]/5" : ""
                          }`}
                          onClick={() => openChat(user)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <div className="relative mr-4 flex-shrink-0">
                                <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
                                  <AvatarImage src={user.icon || "/placeholder.svg"} alt={user.name} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {user.isOnline && (
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-700 rounded-full"></div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-[#B22222] dark:text-red-400 truncate flex items-center text-base sm:text-lg">
                                      {user.name}
                                      {user.unread && <div className="ml-2 w-2 h-2 bg-[#FF69B4] rounded-full"></div>}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                      {user.lastMessage}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                      {user.isOnline ? <span className="text-green-500">Online</span> : user.time}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 dark:hover:bg-gray-600"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent
                                        align="end"
                                        className="dark:bg-gray-800 dark:border-gray-600"
                                      >
                                        <DropdownMenuItem
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleUnfriendUser(user)
                                          }}
                                          className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                                        >
                                          <UserMinus className="mr-2 h-4 w-4" />
                                          Unfriend
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleBlockUser(user)
                                          }}
                                          className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                                        >
                                          <X className="mr-2 h-4 w-4" />
                                          Block User
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
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

            {/* Active Chat - No automatic scrolling */}
            {(activeTab === "chat" || activeTab === "messages") && activeChatUser && (
              <Card className="shadow-md flex flex-col dark:bg-gray-800 dark:border-gray-700 h-[calc(100vh-140px)] sm:h-[calc(100vh-160px)] lg:h-[calc(100vh-200px)]">
                <CardHeader className="pb-3 border-b flex-shrink-0 dark:border-gray-600 px-4 py-3">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mr-2 transition-all duration-200 p-2"
                      onClick={() => {
                        setActiveChatUser(null)
                        setActiveTab("messages")
                      }}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="relative mr-3 flex-shrink-0">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                        <AvatarImage src={activeChatUser.icon || "/placeholder.svg"} alt={activeChatUser.name} />
                        <AvatarFallback>{activeChatUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {activeChatUser.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg text-[#B22222] dark:text-red-400 truncate">
                        {activeChatUser.name}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm dark:text-gray-400">
                        {activeChatUser.isOnline ? "Online" : "Last seen recently"}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 dark:hover:bg-gray-600">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-600">
                          <DropdownMenuItem className="text-gray-700 dark:text-gray-300">
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUnfriendUser(activeChatUser)}
                            className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                          >
                            <UserMinus className="mr-2 h-4 w-4" />
                            Unfriend
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleBlockUser(activeChatUser)}
                            className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Block User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 dark:bg-gray-900/50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "them" && (
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 mr-2 mt-1 flex-shrink-0">
                          <AvatarImage src={activeChatUser.icon || "/placeholder.svg"} alt={activeChatUser.name} />
                          <AvatarFallback className="text-xs">{activeChatUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="max-w-[85%] sm:max-w-[75%] lg:max-w-[70%]">
                        <div
                          className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 transition-all duration-200 ${
                            message.sender === "you"
                              ? "bg-[#B22222] text-white rounded-br-md"
                              : "bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-bl-md shadow-sm"
                          }`}
                        >
                          <p className="text-sm sm:text-base leading-relaxed break-words">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {otherUserTyping && (
                    <div className="flex justify-start">
                      <TypingIndicator />
                    </div>
                  )}

                  {/* Reference div for potential manual scrolling - but no automatic scrolling */}
                  <div ref={messagesEndRef} />
                </CardContent>

                <div className="p-3 sm:p-4 border-t flex-shrink-0 dark:border-gray-600 bg-white dark:bg-gray-800">
                  {isTyping && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-1">You are typing...</div>
                  )}
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2 sm:gap-3">
                    <Input
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={handleMessageInputChange}
                      className="flex-1 h-10 sm:h-12 dark:bg-gray-700 dark:border-gray-600 transition-all duration-200 rounded-full px-4"
                    />
                    <Button
                      type="submit"
                      className="bg-[#B22222] hover:bg-[#8B0000] h-10 sm:h-12 w-10 sm:w-12 p-0 rounded-full transition-all duration-200 flex-shrink-0"
                      disabled={!messageInput.trim()}
                    >
                      <Send size={16} className="sm:w-5 sm:h-5" />
                    </Button>
                  </form>
                </div>
              </Card>
            )}

            {/* Settings Tab with Enhanced Theme Options */}
            {activeTab === "settings" && (
              <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-[#B22222] dark:text-red-400">Settings</CardTitle>
                  <CardDescription className="text-sm sm:text-base dark:text-gray-400">
                    Manage your account preferences and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="appearance" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 dark:bg-gray-700">
                      <TabsTrigger
                        value="appearance"
                        className="dark:data-[state=active]:bg-gray-600 transition-all duration-200"
                      >
                        Appearance
                      </TabsTrigger>
                      <TabsTrigger
                        value="notifications"
                        className="dark:data-[state=active]:bg-gray-600 transition-all duration-200"
                      >
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger
                        value="privacy"
                        className="dark:data-[state=active]:bg-gray-600 transition-all duration-200"
                      >
                        Privacy
                      </TabsTrigger>
                      <TabsTrigger
                        value="account"
                        className="dark:data-[state=active]:bg-gray-600 transition-all duration-200"
                      >
                        Account
                      </TabsTrigger>
                    </TabsList>

                    {/* Appearance Settings */}
                    <TabsContent value="appearance" className="mt-6 space-y-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-[#B22222] dark:text-red-400 mb-4">
                            Theme Preferences
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Card
                              className={`cursor-pointer transition-all duration-300 ${
                                theme === "light"
                                  ? "ring-2 ring-[#B22222] dark:ring-red-400 scale-105"
                                  : "hover:shadow-md hover:scale-102"
                              } dark:bg-gray-700 dark:border-gray-600`}
                              onClick={setLightTheme}
                            >
                              <CardContent className="p-4 text-center">
                                <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                                <h4 className="font-semibold dark:text-gray-200">Light</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Clean and bright</p>
                              </CardContent>
                            </Card>

                            <Card
                              className={`cursor-pointer transition-all duration-300 ${
                                theme === "dark"
                                  ? "ring-2 ring-[#B22222] dark:ring-red-400 scale-105"
                                  : "hover:shadow-md hover:scale-102"
                              } dark:bg-gray-700 dark:border-gray-600`}
                              onClick={setDarkTheme}
                            >
                              <CardContent className="p-4 text-center">
                                <Moon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                                <h4 className="font-semibold dark:text-gray-200">Dark</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Easy on the eyes</p>
                              </CardContent>
                            </Card>

                            <Card
                              className={`cursor-pointer transition-all duration-300 ${
                                theme === "system"
                                  ? "ring-2 ring-[#B22222] dark:ring-red-400 scale-105"
                                  : "hover:shadow-md hover:scale-102"
                              } dark:bg-gray-700 dark:border-gray-600`}
                              onClick={setSystemTheme}
                            >
                              <CardContent className="p-4 text-center">
                                <Monitor className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                                <h4 className="font-semibold dark:text-gray-200">System</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Follows device</p>
                              </CardContent>
                            </Card>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Current theme: <span className="font-medium">{theme}</span>
                            {theme === "system" && ` (${resolvedTheme})`}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-[#B22222] dark:text-red-400 mb-4">Profile Icon</h3>
                          <div className="flex justify-center mb-6">
                            <Avatar className="h-32 w-32 ring-4 ring-[#B22222]/20 dark:ring-red-400/20">
                              <AvatarImage src={`/images/avatar${selectedIcon}.png`} alt="Your profile icon" />
                              <AvatarFallback className="text-2xl font-bold text-[#B22222] dark:text-red-400">
                                {userProfile.username.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((iconNumber) => (
                              <div
                                key={iconNumber}
                                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 aspect-square ${
                                  selectedIcon === iconNumber
                                    ? "border-[#B22222] dark:border-red-400 ring-2 ring-[#B22222]/50 dark:ring-red-400/50 scale-105"
                                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:scale-102"
                                }`}
                                onClick={() => handleIconSelect(iconNumber)}
                              >
                                <img
                                  src={`/images/avatar${iconNumber}.png`}
                                  alt={`Profile icon ${iconNumber}`}
                                  className="w-full h-full object-cover"
                                />
                                {selectedIcon === iconNumber && (
                                  <div className="absolute inset-0 bg-[#B22222]/20 dark:bg-red-400/20 flex items-center justify-center">
                                    <CheckCircle className="h-8 w-8 text-[#B22222] dark:text-red-400" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Other tabs content would go here */}
                    <TabsContent value="notifications" className="mt-6">
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">Notification settings coming soon...</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="privacy" className="mt-6">
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">Privacy settings coming soon...</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="account" className="mt-6">
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">Account settings coming soon...</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Other tabs would be implemented similarly */}
            {activeTab === "requests" && (
              <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-[#B22222] dark:text-red-400">
                    Connection Requests
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base dark:text-gray-400">
                    People who want to connect with you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {connectionRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">No connection requests at this time.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {connectionRequests.map((request) => (
                        <Card key={request.id} className="dark:bg-gray-700">
                          <CardContent className="p-6">
                            <div className="flex items-center">
                              <Avatar className="h-16 w-16 mr-4">
                                <AvatarImage src={request.icon || "/placeholder.svg"} alt={request.name} />
                                <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-medium text-lg text-[#B22222] dark:text-red-400">
                                  {request.name}, {request.age}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">{request.occupation}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Sent {request.requestDate}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  className="bg-[#B22222] hover:bg-[#8B0000] text-white"
                                  onClick={() => handleAcceptConnection(request)}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Accept
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  onClick={() => handleRejectConnection(request)}
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Decline
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-[#B22222] dark:text-red-400">Notifications</CardTitle>
                  <CardDescription className="text-sm sm:text-base dark:text-gray-400">
                    Your recent activity and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-all duration-200 ${
                          !notification.read
                            ? "bg-[#FF69B4]/5 border-[#FF69B4]/20 dark:bg-pink-900/20 dark:border-pink-700/30"
                            : "bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 dark:text-gray-200">{notification.content}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && <div className="w-2 h-2 bg-[#FF69B4] rounded-full ml-2 mt-2"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "profile" && (
              <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-[#B22222] dark:text-red-400">My Profile</CardTitle>
                  <CardDescription className="text-sm sm:text-base dark:text-gray-400">
                    View and edit your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Profile editing coming soon...</p>
                  <Button className="bg-[#B22222] hover:bg-[#8B0000] text-white">Edit Profile</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
