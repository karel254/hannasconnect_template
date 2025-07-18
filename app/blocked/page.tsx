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
import ProfileModal from "@/components/ProfileModal"
import { useNavigationHistory } from "../../hooks/use-navigation-history"

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
  const { goBack } = useNavigationHistory()
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
      <div className="md:hidden sticky top-0 z-40 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-3 sm:px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <h1 className="text-lg sm:text-xl font-bold text-white">Blocked Users</h1>
        </div>
        <div className="text-xs sm:text-sm text-white/80">
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
              onClick={goBack}
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

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search blocked users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-10 sm:h-11"
          />
        </div>

        {/* Blocked Users List */}
        {filteredBlockedUsers.length === 0 ? (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 sm:p-8 text-center">
              <UserX className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No Blocked Users
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                {searchQuery ? "No blocked users match your search." : "You haven't blocked any users yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {filteredBlockedUsers.map((blockedUser) => (
              <Card key={blockedUser.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
                        <AvatarImage src={blockedUser.avatar} alt={blockedUser.name} />
                        <AvatarFallback className="bg-[#B22222] text-white text-sm sm:text-lg">
                          {blockedUser.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                            @{blockedUser.username}, {blockedUser.age || calculateAge(blockedUser.dateOfBirth)}
                          </h3>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs flex-shrink-0">
                            Blocked
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
                          {blockedUser.occupation} • {blockedUser.location}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Blocked {formatBlockedDate(blockedUser.blockedDate)}
                        </p>
                        {blockedUser.reason && (
                          <p className="text-xs text-red-600 dark:text-red-400 truncate">
                            Reason: {blockedUser.reason}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 h-8 sm:h-10 text-xs sm:text-sm"
                        onClick={() => { setSelectedProfile(blockedUser); setIsProfileModalOpen(true); }}
                      >
                        View Profile
                      </Button>
                      <Button
                        onClick={() => handleUnblock(blockedUser.id)}
                        variant="outline"
                        size="sm"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 h-8 sm:h-10 text-xs sm:text-sm"
                      >
                        <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
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
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg text-gray-900 dark:text-gray-100">Privacy Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <UserX className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">Blocked Users</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Blocked users cannot see your profile, send you messages, or contact you in any way.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2 sm:space-x-3">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">Unblocking</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
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