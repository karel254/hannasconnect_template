"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserX, User, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "../../hooks/use-toast"
import ProfileModal from "@/components/ProfileModal";

interface BlockedUser {
  id: string
  userId: string
  username: string
  name: string
  age: number
  occupation: string
  location: string
  avatar: string
  blockedDate: Date
  reason?: string
  dateOfBirth?: string // Added for age calculation
  gender?: string // Added for gender
}

export default function BlockedUsersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

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
      // Kenyan users
      {
        id: "1",
        userId: "brianotieno",
        username: "brianotieno",
        name: "Brian Otieno",
        age: 34,
        gender: "Male",
        occupation: "Engineer",
        location: "Kisumu, Kenya",
        avatar: "/images/male3.jpg",
        blockedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        reason: "Inappropriate behavior",
        dateOfBirth: "1990-02-10",
      },
      {
        id: "2",
        userId: "faithwambui",
        username: "faithwambui",
        name: "Faith Wambui",
        age: 27,
        gender: "Female",
        occupation: "Banker",
        location: "Nairobi, Kenya",
        avatar: "/images/female3.jpg",
        blockedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        reason: "Spam messages",
        dateOfBirth: "1997-06-18",
      },
      {
        id: "3",
        userId: "janetmwikali",
        username: "janetmwikali",
        name: "Janet Mwikali",
        age: 29,
        gender: "Female",
        occupation: "Teacher",
        location: "Machakos, Kenya",
        avatar: "/images/female4.jpg",
        blockedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        reason: "Unwanted messages",
        dateOfBirth: "1995-04-12",
      },
      {
        id: "4",
        userId: "petermwangi",
        username: "petermwangi",
        name: "Peter Mwangi",
        age: 44,
        gender: "Male",
        occupation: "Businessman",
        location: "Nakuru, Kenya",
        avatar: "/images/male4.jpeg",
        blockedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        reason: "Harassment",
        dateOfBirth: "1980-09-03",
      },
      // International users
      {
        id: "5",
        userId: "emilysmith",
        username: "emilysmith",
        name: "Emily Smith",
        age: 31,
        gender: "Female",
        occupation: "Software Engineer",
        location: "London, UK",
        avatar: "/images/female5.jpg",
        blockedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        reason: "Inappropriate content",
        dateOfBirth: "1993-11-10",
      },
      {
        id: "6",
        userId: "rajpatel",
        username: "rajpatel",
        name: "Raj Patel",
        age: 36,
        gender: "Male",
        occupation: "Doctor",
        location: "Mumbai, India",
        avatar: "/images/male2.jpg",
        blockedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        reason: "Spam",
        dateOfBirth: "1988-05-22",
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

  // Helper to calculate age from date of birth string (YYYY-MM-DD)
  function calculateAge(dateOfBirth: string) {
    if (!dateOfBirth) return undefined;
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
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
      {/* Mobile Header with Back Navigation */}
      <div className="md:hidden sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Blocked Users</h1>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {blockedUsers.length} blocked
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-40 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Blocked Users</h1>
              <p className="text-white/80 mt-1">Manage your privacy and blocked users</p>
            </div>
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
                          {blockedUser.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            @{blockedUser.username}, {blockedUser.age || calculateAge(blockedUser.dateOfBirth)}
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
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        onClick={() => { setSelectedProfile(blockedUser); setIsProfileModalOpen(true); }}
                      >
                        View Profile
                      </Button>
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
      <ProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} profile={selectedProfile} />
    </div>
  )
} 