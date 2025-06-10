"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
  Menu,
  MoreVertical,
  Moon,
  Sun,
  Shield,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  Trash2,
  UserPlus,
  UserMinus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sendConnectionRequest, acceptConnection, rejectConnection } from "../actions"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "@/contexts/theme-context"

export default function Dashboard() {
  const { toast } = useToast()
  const { theme, setLightTheme, setDarkTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("matches")
  const [activeChatUser, setActiveChatUser] = useState<any>(null)
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(1)

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

  // Sample data (keeping existing data structure)
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto py-6 px-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#FF69B4] to-[#FF9CC0] dark:from-gray-800 dark:to-gray-700 text-white p-4 rounded-lg mb-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold">Welcome, @{userProfile.username}!</h1>
              <p className="opacity-90 text-sm sm:text-base">{userProfile.occupation}</p>
            </div>
            <Button className="bg-white text-[#B22222] hover:bg-gray-100 text-sm sm:text-base px-4 py-2">
              Complete Your Profile
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Menu Button */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full justify-center dark:border-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="mr-2 h-4 w-4" />
              {isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            </Button>
          </div>

          {/* Sidebar */}
          <div className={`w-full lg:w-1/4 ${isMobileMenuOpen ? "block" : "hidden lg:block"}`}>
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
                      className={`w-full justify-start h-10 text-sm ${
                        activeTab === key || (key === "messages" && activeTab === "chat")
                          ? "bg-[#B22222] text-white dark:bg-red-600"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => handleTabChange(key)}
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
                    <div className="bg-[#B22222] dark:bg-red-500 h-2 rounded-full w-[85%]"></div>
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
            {/* Settings Tab */}
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
                      <TabsTrigger value="appearance" className="dark:data-[state=active]:bg-gray-600">
                        Appearance
                      </TabsTrigger>
                      <TabsTrigger value="notifications" className="dark:data-[state=active]:bg-gray-600">
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger value="privacy" className="dark:data-[state=active]:bg-gray-600">
                        Privacy
                      </TabsTrigger>
                      <TabsTrigger value="account" className="dark:data-[state=active]:bg-gray-600">
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card
                              className={`cursor-pointer transition-all duration-200 ${
                                theme === "light" ? "ring-2 ring-[#B22222] dark:ring-red-400" : "hover:shadow-md"
                              } dark:bg-gray-700 dark:border-gray-600`}
                              onClick={setLightTheme}
                            >
                              <CardContent className="p-4 text-center">
                                <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                                <h4 className="font-semibold dark:text-gray-200">Light Theme</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Clean and bright interface</p>
                              </CardContent>
                            </Card>

                            <Card
                              className={`cursor-pointer transition-all duration-200 ${
                                theme === "dark" ? "ring-2 ring-[#B22222] dark:ring-red-400" : "hover:shadow-md"
                              } dark:bg-gray-700 dark:border-gray-600`}
                              onClick={setDarkTheme}
                            >
                              <CardContent className="p-4 text-center">
                                <Moon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                                <h4 className="font-semibold dark:text-gray-200">Dark Theme</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Easy on the eyes</p>
                              </CardContent>
                            </Card>
                          </div>
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
                                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 aspect-square ${
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

                    {/* Notifications Settings */}
                    <TabsContent value="notifications" className="mt-6 space-y-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-[#B22222] dark:text-red-400 mb-4">
                            Notification Preferences
                          </h3>
                          <div className="space-y-4">
                            {[
                              {
                                key: "email",
                                label: "Email Notifications",
                                description: "Receive notifications via email",
                                icon: Mail,
                              },
                              {
                                key: "push",
                                label: "Push Notifications",
                                description: "Receive push notifications on your device",
                                icon: Smartphone,
                              },
                              {
                                key: "matches",
                                label: "New Matches",
                                description: "Get notified when you have new matches",
                                icon: Heart,
                              },
                              {
                                key: "messages",
                                label: "New Messages",
                                description: "Get notified when you receive messages",
                                icon: MessageCircle,
                              },
                              {
                                key: "marketing",
                                label: "Marketing Updates",
                                description: "Receive updates about new features and promotions",
                                icon: Bell,
                              },
                            ].map(({ key, label, description, icon: Icon }) => (
                              <div
                                key={key}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                              >
                                <div className="flex items-center space-x-3">
                                  <Icon className="h-5 w-5 text-[#B22222] dark:text-red-400" />
                                  <div>
                                    <Label htmlFor={key} className="font-medium dark:text-gray-200">
                                      {label}
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                                  </div>
                                </div>
                                <Switch
                                  id={key}
                                  checked={settings.notifications[key]}
                                  onCheckedChange={(checked) => handleSettingChange("notifications", key, checked)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Privacy Settings */}
                    <TabsContent value="privacy" className="mt-6 space-y-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-[#B22222] dark:text-red-400 mb-4">
                            Privacy Controls
                          </h3>
                          <div className="space-y-4">
                            {[
                              {
                                key: "showOnline",
                                label: "Show Online Status",
                                description: "Let others see when you're online",
                                icon: Eye,
                              },
                              {
                                key: "showProfile",
                                label: "Show Profile to All",
                                description: "Make your profile visible to all users",
                                icon: User,
                              },
                              {
                                key: "allowMessages",
                                label: "Allow Messages from Anyone",
                                description: "Receive messages from all users",
                                icon: MessageCircle,
                              },
                              {
                                key: "showLastSeen",
                                label: "Show Last Seen",
                                description: "Let others see when you were last active",
                                icon: EyeOff,
                              },
                            ].map(({ key, label, description, icon: Icon }) => (
                              <div
                                key={key}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                              >
                                <div className="flex items-center space-x-3">
                                  <Icon className="h-5 w-5 text-[#B22222] dark:text-red-400" />
                                  <div>
                                    <Label htmlFor={key} className="font-medium dark:text-gray-200">
                                      {label}
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                                  </div>
                                </div>
                                <Switch
                                  id={key}
                                  checked={settings.privacy[key]}
                                  onCheckedChange={(checked) => handleSettingChange("privacy", key, checked)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Blocked Users */}
                        <div>
                          <h3 className="text-lg font-semibold text-[#B22222] dark:text-red-400 mb-4">Blocked Users</h3>
                          {blockedUsers.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-400 text-center py-4">No blocked users</p>
                          ) : (
                            <div className="space-y-2">
                              {blockedUsers.map((user) => (
                                <div
                                  key={user.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage src={user.icon || "/placeholder.svg"} alt={user.name} />
                                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium dark:text-gray-200">{user.name}</span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUnblockUser(user)}
                                    className="text-[#B22222] dark:text-red-400 border-[#B22222] dark:border-red-400"
                                  >
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Unblock
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Unfriended Users */}
                        <div>
                          <h3 className="text-lg font-semibold text-[#B22222] dark:text-red-400 mb-4">
                            Removed Connections
                          </h3>
                          {unfriendedUsers.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-400 text-center py-4">No removed connections</p>
                          ) : (
                            <div className="space-y-2">
                              {unfriendedUsers.map((user) => (
                                <div
                                  key={user.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage src={user.icon || "/placeholder.svg"} alt={user.name} />
                                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium dark:text-gray-200">{user.name}</span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRefriendUser(user)}
                                    className="text-[#B22222] dark:text-red-400 border-[#B22222] dark:border-red-400"
                                  >
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Reconnect
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Account Settings */}
                    <TabsContent value="account" className="mt-6 space-y-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-[#B22222] dark:text-red-400 mb-4">
                            Account Security
                          </h3>
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Mail className="h-5 w-5 text-[#B22222] dark:text-red-400" />
                                  <div>
                                    <Label className="font-medium dark:text-gray-200">Email Verification</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">your.email@example.com</p>
                                  </div>
                                </div>
                                <Badge
                                  className={
                                    settings.account.emailVerified
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  }
                                >
                                  {settings.account.emailVerified ? "Verified" : "Unverified"}
                                </Badge>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Smartphone className="h-5 w-5 text-[#B22222] dark:text-red-400" />
                                  <div>
                                    <Label className="font-medium dark:text-gray-200">Phone Verification</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Add your phone number</p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-[#B22222] dark:text-red-400 border-[#B22222] dark:border-red-400"
                                >
                                  Add Phone
                                </Button>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Shield className="h-5 w-5 text-[#B22222] dark:text-red-400" />
                                  <div>
                                    <Label className="font-medium dark:text-gray-200">Two-Factor Authentication</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      Add an extra layer of security
                                    </p>
                                  </div>
                                </div>
                                <Switch
                                  checked={settings.account.twoFactor}
                                  onCheckedChange={(checked) => handleSettingChange("account", "twoFactor", checked)}
                                />
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Lock className="h-5 w-5 text-[#B22222] dark:text-red-400" />
                                  <div>
                                    <Label className="font-medium dark:text-gray-200">Change Password</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      Update your account password
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-[#B22222] dark:text-red-400 border-[#B22222] dark:border-red-400"
                                >
                                  Change
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
                          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                                <div>
                                  <Label className="font-medium text-red-800 dark:text-red-200">Delete Account</Label>
                                  <p className="text-sm text-red-600 dark:text-red-400">
                                    Permanently delete your account and all data
                                  </p>
                                </div>
                              </div>
                              <Button variant="destructive" size="sm">
                                Delete Account
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Messages Tab with improved dropdown */}
            {activeTab === "messages" && (
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
                      className="pl-10 h-10 dark:bg-gray-700 dark:border-gray-600"
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
                          className={`hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 ${
                            user.unread ? "border-l-4 border-l-[#FF69B4]" : ""
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <Avatar className="h-12 w-12 mr-4 flex-shrink-0">
                                <AvatarImage src={user.icon || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openChat(user)}>
                                    <h3 className="font-semibold text-[#B22222] dark:text-red-400 truncate">
                                      {user.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                      {user.lastMessage}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{user.time}</span>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 dark:hover:bg-gray-600"
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

            {/* Active Chat */}
            {activeTab === "chat" && activeChatUser && (
              <Card className="shadow-md h-[calc(100vh-200px)] flex flex-col dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-3 border-b flex-shrink-0 dark:border-gray-600">
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => setActiveTab("messages")}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={activeChatUser.icon || "/placeholder.svg"} alt={activeChatUser.name} />
                      <AvatarFallback>{activeChatUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-[#B22222] dark:text-red-400">{activeChatUser.name}</CardTitle>
                      <CardDescription className="text-xs dark:text-gray-400">Online</CardDescription>
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
                            message.sender === "you"
                              ? "bg-[#B22222] text-white"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <div className="p-4 border-t flex-shrink-0 dark:border-gray-600">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1 h-10 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <Button
                      type="submit"
                      className="bg-[#B22222] hover:bg-[#8B0000] h-10 px-4"
                      disabled={!messageInput.trim()}
                    >
                      <Send size={18} />
                    </Button>
                  </form>
                </div>
              </Card>
            )}

            {/* Matches Tab */}
            {activeTab === "matches" && (
              <div className="space-y-6">
                <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <CardTitle className="text-xl sm:text-2xl text-[#B22222] dark:text-red-400">
                          Your Matches
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base dark:text-gray-400">
                          People who share your values and interests
                        </CardDescription>
                      </div>
                      <Button className="bg-[#B22222] hover:bg-[#8B0000] text-sm sm:text-base px-4 py-2">
                        Find More Matches
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-4">
                      <div className="relative w-full sm:max-w-sm">
                        <Search
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <Input
                          placeholder="Search matches"
                          className="pl-10 h-10 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center h-10 px-4 dark:border-gray-600 dark:text-gray-300"
                      >
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {matches.map((match) => (
                        <Card
                          key={match.id}
                          className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-700 dark:border-gray-600"
                        >
                          <CardContent className="p-0">
                            <div className="flex p-4">
                              <div className="mr-4 flex-shrink-0">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={match.icon || "/placeholder.svg"} alt={match.name} />
                                  <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-[#B22222] dark:text-red-400 truncate">
                                      {match.name}, {match.age}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                      {match.occupation}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{match.lastActive}</p>
                                  </div>
                                  <Badge className="bg-[#FF69B4] hover:bg-[#FF69B4] ml-2 flex-shrink-0">
                                    {match.compatibility}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {match.interests.slice(0, 3).map((interest, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="text-xs dark:border-gray-500 dark:text-gray-300"
                                    >
                                      {interest}
                                    </Badge>
                                  ))}
                                  {match.interests.length > 3 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs dark:border-gray-500 dark:text-gray-300"
                                    >
                                      +{match.interests.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex border-t dark:border-gray-600">
                              <Button
                                className="flex-1 rounded-none bg-white text-[#B22222] hover:bg-gray-50 border-r h-12 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:border-gray-600"
                                variant="ghost"
                              >
                                View Profile
                              </Button>
                              <Button
                                className="flex-1 rounded-none bg-white text-[#B22222] hover:bg-gray-50 h-12 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
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

                <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-[#B22222] dark:text-red-400">
                      Recommended for You
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base dark:text-gray-400">
                      Based on your preferences and values
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {matches.slice(0, 3).map((match) => (
                        <Card
                          key={match.id}
                          className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600"
                        >
                          <CardContent className="p-4 text-center">
                            <Avatar className="h-20 w-20 mx-auto mb-3">
                              <AvatarImage src={match.icon || "/placeholder.svg"} alt={match.name} />
                              <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-[#B22222] dark:text-red-400 truncate">
                              {match.name}, {match.age}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{match.occupation}</p>
                            <Badge className="mt-2 bg-[#FF69B4] hover:bg-[#FF69B4]">{match.compatibility}</Badge>
                            <Button
                              className="w-full mt-3 bg-[#B22222] hover:bg-[#8B0000] h-10"
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
                      <div className="mx-auto mb-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Connection Requests</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                        You don't have any pending connection requests at the moment.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {connectionRequests.map((request) => (
                        <Card
                          key={request.id}
                          className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <Avatar className="h-16 w-16 mr-4 flex-shrink-0">
                                <AvatarImage src={request.icon || "/placeholder.svg"} alt={request.name} />
                                <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-[#B22222] dark:text-red-400 truncate">
                                      {request.name}, {request.age}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                      {request.occupation}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Requested {request.requestDate}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end mt-4 space-x-2">
                              <Button
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-50 h-10 px-4 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
                                onClick={() => handleRejectConnection(request)}
                              >
                                <X className="mr-2 h-4 w-4" /> Decline
                              </Button>
                              <Button
                                className="bg-[#B22222] hover:bg-[#8B0000] text-white h-10 px-4"
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

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-[#B22222] dark:text-red-400">My Profile</CardTitle>
                  <CardDescription className="text-sm sm:text-base dark:text-gray-400">
                    View and edit your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-24 w-24 mb-4 ring-2 ring-[#B22222]/20 dark:ring-red-400/20">
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
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Name
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        value={userProfile.name}
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Username
                      </Label>
                      <Input
                        type="text"
                        id="username"
                        value={userProfile.username}
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="occupation"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Occupation
                      </Label>
                      <Input
                        type="text"
                        id="occupation"
                        value={userProfile.occupation}
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        value="your.email@example.com"
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        readOnly
                      />
                    </div>
                    <Button className="w-full bg-[#B22222] hover:bg-[#8B0000]">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
