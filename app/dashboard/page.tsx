"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, MessageCircle, Users, TrendingUp, Clock, User, Calendar, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  // Sample data for dashboard
  const stats = [
    { label: "Profile Views", value: "24", icon: Users, color: "text-blue-600" },
    { label: "New Matches", value: "3", icon: Heart, color: "text-red-600" },
    { label: "Messages", value: "12", icon: MessageCircle, color: "text-green-600" },
    { label: "Connections", value: "8", icon: TrendingUp, color: "text-purple-600" },
  ]

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
            const Icon = stat.icon
            return (
              <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
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
            )
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
                    <Button size="sm" className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl h-9">
                      Connect
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl h-9 bg-transparent"
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
              <Link href="/blog">
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
                    <Button size="sm" className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl text-xs">
                      Read Article
                    </Button>
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
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-[#B22222] dark:text-red-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Requests</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage connection requests</p>
                <Badge className="mt-2 bg-[#B22222] text-white">3 new</Badge>
              </CardContent>
            </Card>
          </Link>

          <Link href="/messages">
            <Card className="cursor-pointer hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-[#B22222] dark:text-red-400 mx-auto mb-4" />
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
        </div>
      </div>
    </div>
  )
}
