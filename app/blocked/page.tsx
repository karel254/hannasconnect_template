"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserX, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "../../hooks/use-toast"

interface BlockedUser {
  id: string
  userId: string
  name: string
  age: number
  occupation: string
  location: string
  avatar: string
  blockedDate: Date
  reason?: string
}

export default function BlockedUsersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
    
    // Load sample blocked users
    loadBlockedUsers()
  }, [router])

  const loadBlockedUsers = () => {
    // Sample blocked users data
    const sampleBlockedUsers: BlockedUser[] = [
      {
        id: "1",
        userId: "funmi101",
        name: "Funmi",
        age: 29,
        occupation: "Doctor",
        location: "Ibadan, Nigeria",
        avatar: "/images/female2.jpg",
        blockedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        reason: "Inappropriate behavior",
      },
      {
        id: "2",
        userId: "john123",
        name: "John",
        age: 31,
        occupation: "Teacher",
        location: "Kano, Nigeria",
        avatar: "/images/male4.jpeg",
        blockedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        reason: "Spam messages",
      },
    ]
    setBlockedUsers(sampleBlockedUsers)
  }

  const handleUnblock = (userId: string) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== userId))
    
    toast({
      title: "User Unblocked",
      description: "The user has been unblocked successfully.",
    })
  }

  const formatBlockedDate = (date: Date): string => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  const filteredBlockedUsers = blockedUsers.filter(blockedUser =>
    blockedUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blockedUser.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            <h1 className="text-2xl font-bold">Blocked Users</h1>
            <p className="text-white/80 mt-1">Manage your privacy and blocked users</p>
          </div>
          <div className="flex items-center space-x-2">
            <UserX className="h-6 w-6" />
            <Badge className="bg-white/20 text-white">
              {blockedUsers.length}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search blocked users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Blocked Users List */}
        {filteredBlockedUsers.length === 0 ? (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No Blocked Users
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? "No blocked users match your search." : "You haven't blocked any users yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBlockedUsers.map((blockedUser) => (
              <Card key={blockedUser.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={blockedUser.avatar} alt={blockedUser.name} />
                        <AvatarFallback className="bg-[#B22222] text-white">
                          {blockedUser.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {blockedUser.name}, {blockedUser.age}
                          </h3>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            Blocked
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {blockedUser.occupation} • {blockedUser.location}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Blocked {formatBlockedDate(blockedUser.blockedDate)}
                        </p>
                        {blockedUser.reason && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            Reason: {blockedUser.reason}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleUnblock(blockedUser.id)}
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
            ))}
          </div>
        )}

        {/* Privacy Information */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Privacy Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <UserX className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Blocked Users</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Blocked users cannot see your profile, send you messages, or contact you in any way.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Unblocking</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  When you unblock a user, they will be able to see your profile and contact you again.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 