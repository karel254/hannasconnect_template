"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, MessageCircle, Users, TrendingUp, Clock, User, Calendar, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog"

// Add these helper functions for badge counts
// Sample conversations data (copied from messages/page.tsx for badge count)
const sampleConversations = [
  { id: "amara", unread: 2, isConnected: true },
  { id: "kemi", unread: 0, isConnected: true },
  { id: "david", unread: 1, isConnected: true },
  { id: "funmi", unread: 0, isConnected: false },
  { id: "tunde", unread: 0, isConnected: true },
]
const totalUnreadMessages = sampleConversations.reduce((sum, c) => c.isConnected ? sum + (c.unread || 0) : sum, 0)

// Sample requests data (copied from requests/page.tsx for badge count)
const sampleRequests = [
  { status: "pending" },
  { status: "pending" },
  { status: "accepted" },
  { status: "rejected" },
]
const totalPendingRequests = sampleRequests.filter(r => r.status === "pending").length

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  // --- Dynamic badge counts ---
  // Messages: import the same sample conversations structure as in messages/page.tsx
  const [unreadMessages, setUnreadMessages] = useState(0)
  // Requests: import the same sample requests structure as in requests/page.tsx
  const [pendingRequests, setPendingRequests] = useState(0)

  useEffect(() => {
    // Restore user authentication check
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))

    // Sample conversations data (should match messages/page.tsx)
    const conversations = [
      { id: "amara", name: "Amara", unread: 2, isConnected: true },
      { id: "kemi", name: "Kemi", unread: 0, isConnected: true },
      { id: "david", name: "David", unread: 1, isConnected: true },
      { id: "funmi", name: "Funmi", unread: 0, isConnected: false },
      { id: "tunde", name: "Tunde", unread: 0, isConnected: true },
    ]
    setUnreadMessages(conversations.reduce((sum, c) => c.isConnected ? sum + (c.unread || 0) : sum, 0))

    // Sample requests data (should match requests/page.tsx)
    const requests = [
      { status: "pending" },
      { status: "pending" },
      { status: "accepted" },
      { status: "rejected" },
    ]
    setPendingRequests(requests.filter(r => r.status === "pending").length)
  }, [router])

  // Remove the static stats array. Instead, calculate values dynamically:
  const profileViews = Number(localStorage.getItem("profileViews") || 24); // fallback to 24
  const newMatches = sampleRequests.filter(r => r.status === "pending").length;
  const messages = sampleConversations.reduce((sum, c) => c.isConnected ? sum + (c.unread || 0) : sum, 0);
  // For connections, use the conversations array from messages/page.tsx to count users with isConnected === true
  const connectedConversations = sampleConversations.filter(c => c.isConnected);
  const connections = connectedConversations.length;

  const stats = [
    {
      label: "Profile Views",
      value: profileViews,
      icon: Users,
      color: "text-blue-600",
      onClick: null,
    },
    {
      label: "New Matches",
      value: newMatches,
      icon: Heart,
      color: "text-red-600",
      onClick: () => router.push("/requests?tab=pending"),
    },
    {
      label: "Messages",
      value: messages,
      icon: MessageCircle,
      color: "text-green-600",
      onClick: () => router.push("/messages"),
    },
    {
      label: "Connections",
      value: connections,
      icon: TrendingUp,
      color: "text-purple-600",
      onClick: () => setIsConnectionsModalOpen(true),
    },
  ];

  // People you might be interested in
  const suggestions = [
    {
      id: 1,
      name: "Amara",
      age: 28,
      occupation: "Graphic Designer",
      location: "Lagos, Nigeria",
      interests: ["Art", "Travel", "Photography"],
      avatar: "/images/male1.jpg",
      compatibility: 92,
    },
    {
      id: 2,
      name: "Kemi",
      age: 26,
      occupation: "Marketing Manager",
      location: "Abuja, Nigeria",
      interests: ["Fitness", "Cooking", "Music"],
      avatar: "/images/female1.jpg",
      compatibility: 88,
    },
    {
      id: 3,
      name: "David",
      age: 32,
      occupation: "Software Engineer",
      location: "Port Harcourt, Nigeria",
      interests: ["Technology", "Gaming", "Reading"],
      avatar: "/images/male2.jpg",
      compatibility: 85,
    },
    {
      id: 4,
      name: "Funmi",
      age: 29,
      occupation: "Doctor",
      location: "Ibadan, Nigeria",
      interests: ["Healthcare", "Volunteering", "Yoga"],
      avatar: "/images/female2.jpg",
      compatibility: 90,
    },
  ]

  // Full blog posts for signed-in users
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Dating Tips for Modern Relationships",
      excerpt:
        "Navigate the world of modern dating with confidence. Learn the key strategies that successful couples use to build lasting connections in today's digital age.",
      author: "Dr. Sarah Johnson",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Dating Tips",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Building Trust in Long-Distance Relationships",
      excerpt:
        "Distance doesn't have to mean disconnection. Discover proven methods to maintain intimacy and trust when miles apart, including communication strategies and virtual date ideas.",
      author: "Michael Chen",
      date: "December 12, 2024",
      readTime: "7 min read",
      category: "Relationship Advice",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Success Story: From Online Match to Marriage",
      excerpt:
        "Read how Emma and James found love through Hanna's Connect and built a beautiful life together. Their journey from first message to wedding day will inspire you.",
      author: "Hanna's Connect Team",
      date: "December 10, 2024",
      readTime: "4 min read",
      category: "Success Stories",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "The Psychology of Attraction: What Really Matters",
      excerpt:
        "Dive deep into the science behind attraction and learn what psychological factors contribute to lasting romantic connections beyond physical appearance.",
      author: "Dr. Amanda Rodriguez",
      date: "December 8, 2024",
      readTime: "8 min read",
      category: "Psychology",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "Navigating Cultural Differences in Relationships",
      excerpt:
        "Learn how to embrace and celebrate cultural differences in your relationship. Tips for building understanding and creating harmony across different backgrounds.",
      author: "Adaora Okonkwo",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Cultural Insights",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "Digital Dating Safety: Protecting Yourself Online",
      excerpt:
        "Essential safety tips for online dating. Learn how to protect your personal information, recognize red flags, and stay safe while meeting new people online.",
      author: "Security Team",
      date: "December 3, 2024",
      readTime: "5 min read",
      category: "Safety",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const [expandedBlogId, setExpandedBlogId] = useState<number | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  // Simulate connection status (replace with real logic)
  const [connectedUsers, setConnectedUsers] = useState<Set<number>>(new Set([2, 4]))

  const handleConnect = (user: any) => {
    if (connectedUsers.has(user.id)) {
      // Simulate chat navigation
      router.push(`/messages?user=${encodeURIComponent(JSON.stringify({ id: user.id, name: user.name, icon: user.avatar, age: user.age, occupation: user.occupation }))}`)
    } else {
      // Simulate sending a connection request
      setConnectedUsers(prev => new Set(prev).add(user.id))
    }
  }

  const [isConnectionsModalOpen, setIsConnectionsModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  const handleBlock = (user) => {
    // Implement block logic here (mock for now)
    alert(`Blocked ${user.name}`);
  };
  const handleMessage = (user) => {
    router.push(`/messages?user=${encodeURIComponent(JSON.stringify(user))}`);
  };
  const handleViewProfile = (user) => {
    setSelectedProfile(user);
    setIsProfileModalOpen(true);
  };

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
            <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-white/80 mt-1">Ready to make new connections today?</p>
          </div>
          <Avatar className="h-12 w-12 ring-2 ring-white/20">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-white/20 text-white">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const clickable = !!stat.onClick;
            return (
              <Card
                key={index}
                className={`dark:bg-gray-800 dark:border-gray-700 ${clickable ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
                onClick={stat.onClick || undefined}
                tabIndex={clickable ? 0 : -1}
                role={clickable ? "button" : undefined}
                aria-disabled={!clickable}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* People You Might Be Interested In */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-[#B22222] dark:text-red-400">
                People You Might Be Interested In
              </CardTitle>
              <Link href="/browse">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#B22222] dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((person) => (
                <div
                  key={person.id}
                  className="relative bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 hover:shadow-md transition-shadow"
                >
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white dark:bg-gray-600 shadow-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors z-10">
                    <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  </button>

                  <div className="flex items-start space-x-4 pr-12">
                    <Avatar className="h-16 w-16 flex-shrink-0 ring-2 ring-white dark:ring-gray-600">
                      <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                      <AvatarFallback className="bg-[#B22222] text-white">{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">
                          {person.name}, {person.age}
                        </h3>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs flex-shrink-0">
                          {person.compatibility}% match
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-1 truncate">{person.occupation}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mb-2 truncate">{person.location}</p>
                      <div className="flex flex-wrap gap-1">
                        {person.interests.slice(0, 2).map((interest, idx) => (
                          <Badge
                            key={idx}
                            className="bg-[#DAA520]/20 text-[#8B4513] border-[#DAA520] text-xs dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-600"
                          >
                            {interest}
                          </Badge>
                        ))}
                        {person.interests.length > 2 && (
                          <Badge className="bg-gray-200 text-gray-600 text-xs dark:bg-gray-600 dark:text-gray-300">
                            +{person.interests.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl h-9"
                      onClick={() => handleConnect(person)}
                    >
                      {connectedUsers.has(person.id) ? (<><MessageCircle size={14} className="mr-1.5" /> Chat</>) : "Connect"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl h-9 bg-transparent"
                      onClick={() => { setSelectedProfile(person); setIsProfileModalOpen(true); }}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Blog Section for Signed-in Users */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-[#B22222] dark:text-red-400" />
                <CardTitle className="text-xl font-bold text-[#B22222] dark:text-red-400">
                  Latest from Our Blog
                </CardTitle>
              </div>
              <Link href="/dashboard/blogs">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#B22222] dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription className="dark:text-gray-400">
              Relationship insights, dating tips, and success stories just for you
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-[#DAA520]/20 text-[#8B4513] border-[#DAA520] dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-600 text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 text-sm">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl text-xs" onClick={() => setExpandedBlogId(expandedBlogId === post.id ? null : post.id)}>
                      {expandedBlogId === post.id ? "Hide Article" : "Read Article"}
                    </Button>
                    {expandedBlogId === post.id && (
                      <div className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
                        {/* Add full article content here if available */}
                        {/* For now, just a placeholder */}
                        <p>This is the full article content for post {post.id}.</p>
                        <p>It would typically be fetched from an API or stored in the blogPosts array.</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/browse">
            <Card className="cursor-pointer hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-[#B22222] dark:text-red-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Browse Profiles</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Discover new people in your area</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/requests">
            <Card className="cursor-pointer hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center relative">
                <span className="inline-block relative">
                <Heart className="h-12 w-12 text-[#B22222] dark:text-red-400 mx-auto mb-4" />
                  {pendingRequests > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#B22222] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full px-1 border-2 border-white dark:border-gray-800">
                      {pendingRequests}
                    </span>
                  )}
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Requests</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage connection requests</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/messages">
            <Card className="cursor-pointer hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center relative">
                <span className="inline-block relative">
                <MessageCircle className="h-12 w-12 text-[#B22222] dark:text-red-400 mx-auto mb-4" />
                  {unreadMessages > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#B22222] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full px-1 border-2 border-white dark:border-gray-800">
                      {unreadMessages}
                    </span>
                  )}
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Messages</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Continue your conversations</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="cursor-pointer hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <User className="h-12 w-12 text-[#B22222] dark:text-red-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Edit Profile</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your information</p>
              </CardContent>
            </Card>
          </Link>

          {/* More about this App */}
          <Link href="/more-about">
            <Card className="cursor-pointer hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-[#B22222] dark:text-red-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">More about this App</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn about us, FAQ, policies, and more</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#B22222] text-2xl font-bold">{selectedProfile?.name || selectedProfile?.username}, {selectedProfile?.age || selectedProfile?.dateOfBirth}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-6 mt-2">
            <div className="flex-shrink-0 flex flex-col items-center">
              <img src={selectedProfile?.icon || selectedProfile?.avatar} alt="Profile" className="w-32 h-32 rounded-full border-4 border-[#B22222] shadow-lg" />
              <div className="mt-3 text-center">
                <Badge className="bg-[#DAA520] text-white font-medium px-2 py-1 text-xs">{selectedProfile?.relationshipGoals || selectedProfile?.compatibility + '% match'}</Badge>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              {/* Personal Info */}
              <div>
                <h3 className="font-semibold text-[#B22222] mb-1">Personal Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div><span className="font-semibold">Username:</span> {selectedProfile?.username}</div>
                  <div><span className="font-semibold">Gender:</span> {selectedProfile?.gender} {selectedProfile?.customGender && `(${selectedProfile.customGender})`}</div>
                  <div><span className="font-semibold">Date of Birth:</span> {selectedProfile?.dateOfBirth}</div>
                  <div><span className="font-semibold">Race:</span> {selectedProfile?.race}</div>
                  <div><span className="font-semibold">Country:</span> {selectedProfile?.country}</div>
                  <div><span className="font-semibold">County:</span> {selectedProfile?.county}</div>
                  <div><span className="font-semibold">Tribe:</span> {selectedProfile?.tribe}</div>
                  <div><span className="font-semibold">Languages:</span> {selectedProfile?.languages?.join(", ")}</div>
                </div>
              </div>
              {/* Physical Appearance */}
              <div>
                <h3 className="font-semibold text-[#B22222] mb-1">Physical Appearance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div><span className="font-semibold">Height:</span> {selectedProfile?.height} {selectedProfile?.heightUnit} {selectedProfile?.heightFt && `${selectedProfile.heightFt}ft`} {selectedProfile?.heightIn && `${selectedProfile.heightIn}in`}</div>
                  <div><span className="font-semibold">Weight:</span> {selectedProfile?.weight} {selectedProfile?.weightUnit}</div>
                  <div><span className="font-semibold">Body Type:</span> {selectedProfile?.bodyType}</div>
                  <div><span className="font-semibold">Complexion:</span> {selectedProfile?.complexion}</div>
                  <div><span className="font-semibold">Eye Color:</span> {selectedProfile?.eyeColor}</div>
                  <div><span className="font-semibold">Dimples:</span> {selectedProfile?.dimples} {selectedProfile?.dimplesDescription}</div>
                  <div><span className="font-semibold">Teeth Features:</span> {selectedProfile?.teethFeatures}</div>
                  <div><span className="font-semibold">Tattoos:</span> {selectedProfile?.tattoos} {selectedProfile?.tattoosDescription}</div>
                  <div><span className="font-semibold">Piercings:</span> {selectedProfile?.piercings} {selectedProfile?.piercingsDescription}</div>
                  <div><span className="font-semibold">Glasses:</span> {selectedProfile?.glasses} {selectedProfile?.glassesDescription}</div>
                  <div><span className="font-semibold">Self Description (Physical):</span> {selectedProfile?.selfDescriptionPhysical}</div>
                </div>
              </div>
              {/* Health */}
              <div>
                <h3 className="font-semibold text-[#B22222] mb-1">Health</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div><span className="font-semibold">HIV Status:</span> {selectedProfile?.hivStatus}</div>
                  <div><span className="font-semibold">Disability:</span> {selectedProfile?.disability} {selectedProfile?.disabilityDescription}</div>
                  <div><span className="font-semibold">Chronic Illness:</span> {selectedProfile?.chronicIllness} {selectedProfile?.chronicIllnessDescription}</div>
                  <div><span className="font-semibold">Allergies:</span> {selectedProfile?.allergies}</div>
                  <div><span className="font-semibold">Blood Type:</span> {selectedProfile?.bloodType}</div>
                  <div><span className="font-semibold">Snoring:</span> {selectedProfile?.snoring}</div>
                </div>
              </div>
              {/* Work & Lifestyle */}
              <div>
                <h3 className="font-semibold text-[#B22222] mb-1">Work & Lifestyle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div><span className="font-semibold">Employment Status:</span> {selectedProfile?.employmentStatus}</div>
                  <div><span className="font-semibold">Occupation:</span> {selectedProfile?.occupation}</div>
                  <div><span className="font-semibold">Work Location:</span> {selectedProfile?.workCountry}, {selectedProfile?.workCounty}, {selectedProfile?.workConstituency}, {selectedProfile?.workWard}, {selectedProfile?.workState}</div>
                  <div><span className="font-semibold">Financial Stability:</span> {selectedProfile?.financialStability}</div>
                  <div><span className="font-semibold">Alcohol:</span> {selectedProfile?.alcohol}</div>
                  <div><span className="font-semibold">Smoking:</span> {selectedProfile?.smoking}</div>
                  <div><span className="font-semibold">Dietary Preference:</span> {selectedProfile?.dietaryPreference}</div>
                  <div><span className="font-semibold">Has Pets:</span> {selectedProfile?.hasPets} {selectedProfile?.petsDescription}</div>
                  <div><span className="font-semibold">Exercise Frequency:</span> {selectedProfile?.exerciseFrequency}</div>
                  <div><span className="font-semibold">Hobbies:</span> {selectedProfile?.hobbies}</div>
                  <div><span className="font-semibold">Interests:</span> {selectedProfile?.interests}</div>
                </div>
              </div>
              {/* Beliefs */}
              <div>
                <h3 className="font-semibold text-[#B22222] mb-1">Beliefs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div><span className="font-semibold">Religion:</span> {selectedProfile?.religion}</div>
                  <div><span className="font-semibold">Religiousness:</span> {selectedProfile?.religiousness}</div>
                  <div><span className="font-semibold">Denomination:</span> {selectedProfile?.denomination}</div>
                  <div><span className="font-semibold">Church Attendance:</span> {selectedProfile?.churchAttendance}</div>
                </div>
              </div>
              {/* Family */}
              <div>
                <h3 className="font-semibold text-[#B22222] mb-1">Family</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div><span className="font-semibold">Marital Status:</span> {selectedProfile?.maritalStatus}</div>
                  <div><span className="font-semibold">Has Children:</span> {selectedProfile?.hasChildren}</div>
                  <div><span className="font-semibold">Number of Children:</span> {selectedProfile?.numberOfChildren}</div>
                  <div><span className="font-semibold">Children Ages:</span> {selectedProfile?.childrenAges}</div>
                  <div><span className="font-semibold">Children Live With User:</span> {selectedProfile?.childrenLiveWithUser}</div>
                  <div><span className="font-semibold">Wants Children:</span> {selectedProfile?.wantsChildren}</div>
                  <div><span className="font-semibold">Accepts Partner With Kids:</span> {selectedProfile?.acceptsPartnerWithKids} {selectedProfile?.acceptsPartnerWithKidsDescription}</div>
                </div>
              </div>
              {/* Preferences */}
              <div>
                <h3 className="font-semibold text-[#B22222] mb-1">Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div><span className="font-semibold">Open to Relocate:</span> {selectedProfile?.openToRelocate}</div>
                  <div><span className="font-semibold">Sexual Orientation:</span> {selectedProfile?.sexualOrientation}</div>
                  <div><span className="font-semibold">Relationship Tradition:</span> {selectedProfile?.relationshipTradition}</div>
                  <div><span className="font-semibold">Long Distance OK:</span> {selectedProfile?.longDistanceOk}</div>
                  <div><span className="font-semibold">Dating Perspective:</span> {selectedProfile?.datingPerspective}</div>
                  <div><span className="font-semibold">Deal Breakers:</span> {selectedProfile?.dealBreakers}</div>
                  <div><span className="font-semibold">Relationship Hopes:</span> {selectedProfile?.relationshipHopes}</div>
                  <div><span className="font-semibold">Partner Preferences:</span> {selectedProfile?.partnerPreferences}</div>
                  <div><span className="font-semibold">Personality Type:</span> {selectedProfile?.personalityType}</div>
                  <div><span className="font-semibold">Don’t Contact If:</span> {selectedProfile?.dontContactIf}</div>
                  <div><span className="font-semibold">Imperfections:</span> {selectedProfile?.imperfections}</div>
                  <div><span className="font-semibold">Political Views:</span> {selectedProfile?.politicalViews}</div>
                  <div><span className="font-semibold">Date Different Politics:</span> {selectedProfile?.dateDifferentPolitics}</div>
                  <div><span className="font-semibold">Believes in Marriage:</span> {selectedProfile?.believesInMarriage}</div>
                </div>
              </div>
              {/* About Me */}
              <div>
                <h3 className="font-semibold text-[#B22222] mb-1">About Me</h3>
                <div className="text-sm whitespace-pre-line">
                  {selectedProfile?.selfDescription}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button
              className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl"
              onClick={() => handleConnect(selectedProfile)}
            >
              {connectedUsers.has(selectedProfile?.id) ? (<><MessageCircle size={16} className="mr-2" /> Chat</>) : "Connect"}
            </Button>
          </DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="absolute top-4 right-4">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={isConnectionsModalOpen} onOpenChange={setIsConnectionsModalOpen}>
        <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#B22222] text-xl font-bold">Your Connections</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {connectedConversations.length === 0 ? (
              <div className="text-center text-gray-500">You have no active connections yet.</div>
            ) : (
              connectedConversations.map((user) => (
                <div key={user.id} className="flex items-center justify-between gap-2 border-b pb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative flex items-center">
                      <div className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{user.name}</div>
                      {user.online && (
                        <span className="ml-2 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" title="Online"></span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500 truncate max-w-[120px]">{user.lastMessage}</div>
                    </div>
                    {user.unread > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-[#B22222] text-white">
                        {user.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => handleViewProfile(user)}>View Profile</Button>
                    <Button size="sm" onClick={() => handleMessage(user)}>Message</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleBlock(user)}>Block</Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsConnectionsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
