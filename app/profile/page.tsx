"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Camera,
  Edit2,
  Settings,
  LogOut,
  User,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Star,
  Shield,
  Bell,
  Moon,
  Sun,
  Monitor,
  Users,
  UserX,
  Clock,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "../../hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useTheme } from "@/contexts/theme-context"

interface UserProfile {
  username: string
  email: string
  age: number
  location: string
  occupation: string
  bio: string
  interests: string[]
  avatar: string
  photos: string[]
  dateOfBirth?: string;
  preferences: {
    ageRange: [number, number]
    lookingFor: string
    gender?: string
    race?: string
    country?: string
    county?: string
    tribe?: string
    languages?: string[]
    religion?: string
    denomination?: string
    religiousness?: number
    churchAttendance?: string
    smoking?: string
    alcohol?: string
    dietaryPreference?: string
    pets?: string
    snoring?: string
    maritalStatus?: string
    hasChildren?: string
    wantsChildren?: string
    acceptsPartnerWithKids?: string
    openToRelocate?: string
    sexualOrientation?: string
    relationshipTradition?: string
  }
  settings: {
    theme: string
    notifications: {
      messages: boolean
      matches: boolean
      marketing: boolean
      toastMessages?: boolean // Add for pop-up toasts
      toastMatches?: boolean // Add for pop-up toasts
    }
    privacy: {
      showAge: boolean
      showLocation: boolean
      showOnline: boolean
      showReadReceipts?: boolean // Add for read receipts
    }
  }
}

const availableAvatars = [
  "/images/male1.jpg",
  "/images/male2.jpg",
  "/images/male3.jpg",
  "/images/male4.jpeg",
  "/images/female1.jpg",
  "/images/female2.jpg",
  "/images/female3.jpg",
  "/images/female4.jpg",
  "/images/female5.jpg",
  "/images/female6.jpg",
  "/images/female7.jpg",
  "/images/female8.jpeg",
]

const interestOptions = [
  "Travel",
  "Photography",
  "Music",
  "Movies",
  "Books",
  "Cooking",
  "Fitness",
  "Art",
  "Dancing",
  "Gaming",
  "Sports",
  "Nature",
  "Technology",
  "Fashion",
  "Food",
  "Wine",
  "Coffee",
  "Yoga",
  "Meditation",
  "Hiking",
]

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

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { theme, effectiveTheme, toggleTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [showAvatarSelection, setShowAvatarSelection] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    username: "akinyi254",
    email: "akinyi@example.com",
    age: 28,
    location: "Nairobi, Kenya",
    occupation: "Graphic Designer",
    bio: "Creative designer from Nairobi.",
    interests: ["Art", "Travel", "Photography"],
    avatar: "/images/male1.jpg",
    photos: [],
    preferences: {
      ageRange: [25, 35],
      lookingFor: "serious",
      country: "Kenya",
      county: "Nairobi",
    },
    settings: {
      theme: "system",
      notifications: {
        messages: true,
        matches: true,
        marketing: false,
        toastMessages: true, // default true
        toastMatches: true, // default true
      },
      privacy: {
        showAge: true,
        showLocation: true,
        showOnline: true,
        showReadReceipts: true, // default true
      },
    },
  })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteStep, setDeleteStep] = useState(1)
  const [deleteReasons, setDeleteReasons] = useState<string[]>([])
  const [otherReason, setOtherReason] = useState("")
  const [deleteEmail, setDeleteEmail] = useState("")
  const [deletePassword, setDeletePassword] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Password change states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  
  // Email preferences states
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [emailPreferences, setEmailPreferences] = useState({
    marketing: false,
    updates: true,
    matches: true
  })
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false)

  const reasonOptions = [
    "I found a match",
    "Not enough matches",
    "Privacy concerns",
    "Too many notifications",
    "Technical issues",
    "Taking a break",
    "Other"
  ]

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }

    // Load user data from localStorage
    const storedUsername = localStorage.getItem("userUsername") || "demouser"
    const storedOccupation = localStorage.getItem("userOccupation") || "Professional"
    const storedAvatar = localStorage.getItem("selectedIcon") || "/images/male1.jpg"

    setProfile((prev) => ({
      ...prev,
      username: storedUsername,
      occupation: storedOccupation,
      avatar: storedAvatar,
      email: `${storedUsername}@example.com`,
    }))
  }, [router])

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("userUsername", profile.username)
    localStorage.setItem("userOccupation", profile.occupation)
    localStorage.setItem("selectedIcon", profile.avatar)

    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleAvatarSelect = (avatarUrl: string) => {
    setProfile((prev) => ({ ...prev, avatar: avatarUrl }))
    setShowAvatarSelection(false)
    toast({
      title: "Avatar Updated",
      description: "Your profile picture has been updated.",
    })
  }

  const handleInterestToggle = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem("demoUser")
    localStorage.removeItem("userName")
    localStorage.removeItem("userUsername")
    localStorage.removeItem("userOccupation")
    localStorage.removeItem("selectedIcon")

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })

    // Redirect to landing page
    router.push("/")
  }

  const handleThemeChange = (newTheme: string) => {
    setProfile((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: newTheme,
      },
    }))

    // Use the theme context's toggleTheme function
    if (newTheme === "light" && theme !== "light") {
      // Force light theme
      localStorage.setItem("theme", "light")
      window.location.reload() // Simple way to apply theme change
    } else if (newTheme === "dark" && theme !== "dark") {
      // Force dark theme
      localStorage.setItem("theme", "dark")
      window.location.reload() // Simple way to apply theme change
    } else if (newTheme === "system" && theme !== "system") {
      // Use system theme
      localStorage.setItem("theme", "system")
      window.location.reload() // Simple way to apply theme change
    }
  }

  const handleDeleteAccount = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setDeleteStep(4)
      // Simulate account deletion: clear user data
      localStorage.clear()
    }, 2000)
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password too weak",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    // Check for password strength
    const hasUpperCase = /[A-Z]/.test(newPassword)
    const hasLowerCase = /[a-z]/.test(newPassword)
    const hasNumbers = /\d/.test(newPassword)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      toast({
        title: "Password too weak",
        description: "Password must contain uppercase, lowercase, numbers, and special characters.",
        variant: "destructive",
      })
      return
    }

    setIsChangingPassword(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false)
      setIsPasswordModalOpen(false)
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
      
      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
      })
    }, 2000)
  }

  const handleEmailPreferencesUpdate = async () => {
    setIsUpdatingEmail(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdatingEmail(false)
      setIsEmailModalOpen(false)
      
      toast({
        title: "Email Preferences Updated",
        description: "Your email preferences have been successfully updated.",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0">
      {/* Mobile Header */}
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.username} />
                  <AvatarFallback className="bg-[#B22222] text-white text-2xl">{profile.username?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full p-2 bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-800"
                  onClick={() => setShowAvatarSelection(true)}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">@{profile.username}</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {profile.age || (profile.dateOfBirth ? calculateAge(profile.dateOfBirth) : "")} years old
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profile.location || "Location not set"}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {profile.occupation}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                      className="border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white dark:border-red-400 dark:text-red-400"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                    {isEditing && (
                      <Button onClick={handleSave} className="bg-[#B22222] hover:bg-[#8B0000] text-white">
                        Save Changes
                      </Button>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {profile.bio || "No bio added yet. Tell others about yourself!"}
                </p>

                <div className="flex flex-wrap gap-2">
                  {profile.interests.slice(0, 6).map((interest) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className="bg-red-50 text-[#B22222] dark:bg-red-900/20 dark:text-red-400"
                    >
                      {interest}
                    </Badge>
                  ))}
                  {profile.interests.length > 6 && (
                    <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                      +{profile.interests.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avatar Selection Modal */}
        {showAvatarSelection && (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Choose Your Avatar</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select from our collection of professional avatars. Custom uploads are not available to maintain
                community standards.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4 mb-4">
                {availableAvatars.map((avatarUrl, index) => (
                  <button
                    key={index}
                    onClick={() => handleAvatarSelect(avatarUrl)}
                    className={`relative rounded-full overflow-hidden border-4 transition-all hover:scale-105 ${
                      profile.avatar === avatarUrl
                        ? "border-[#B22222] ring-2 ring-[#B22222] ring-offset-2 dark:ring-offset-gray-800"
                        : "border-gray-200 dark:border-gray-600 hover:border-[#B22222]"
                    }`}
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={`Avatar ${index + 1}`} />
                      <AvatarFallback>A{index + 1}</AvatarFallback>
                    </Avatar>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowAvatarSelection(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="flex w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-x-auto p-0 shadow-none mx-0">
              <TabsTrigger value="about" className="flex-1 min-w-0 flex items-center justify-center data-[state=active]:bg-[#B22222] data-[state=active]:text-white text-base font-medium px-0 py-2 rounded-lg transition-all truncate">
                <span className="truncate">About</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex-1 min-w-0 flex items-center justify-center data-[state=active]:bg-[#B22222] data-[state=active]:text-white text-base font-medium px-0 py-2 rounded-lg transition-all truncate">
                <span className="truncate">Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 min-w-0 flex items-center justify-center data-[state=active]:bg-[#B22222] data-[state=active]:text-white text-base font-medium px-0 py-2 rounded-lg transition-all truncate">
                <span className="truncate">Settings</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex-1 min-w-0 flex items-center justify-center data-[state=active]:bg-[#B22222] data-[state=active]:text-white text-base font-medium px-0 py-2 rounded-lg transition-all truncate">
                <span className="truncate">Account</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="about" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile((prev) => ({ ...prev, username: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={profile.email}
                      disabled
                      className="bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Tell others about yourself..."
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Interests</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select your interests to help others get to know you better.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={profile.interests.includes(interest)}
                        onCheckedChange={() => handleInterestToggle(interest)}
                        disabled={!isEditing}
                        className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
                      />
                      <Label htmlFor={interest} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {isEditing && (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mt-6">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Demographics & Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Race */}
                  <Label>Race</Label>
                  <Select value={profile.preferences?.race || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, race: value } }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Any Race" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Race</SelectItem>
                      <SelectItem value="african">African</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="caucasian">Caucasian</SelectItem>
                      <SelectItem value="latino">Latino</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Country */}
                  <Label>Country</Label>
                  <Input value={profile.preferences?.country || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, country: e.target.value } }))} placeholder="Any Country" className="rounded-xl" />
                  {/* County */}
                  <Label>County</Label>
                  <Input value={profile.preferences?.county || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, county: e.target.value } }))} placeholder="Any County" className="rounded-xl" />
                  {/* Tribe */}
                  <Label>Tribe</Label>
                  <Input value={profile.preferences?.tribe || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, tribe: e.target.value } }))} placeholder="Any Tribe" className="rounded-xl" />
                  {/* Languages */}
                  <Label>Fluent in (comma separated)</Label>
                  <Input value={profile.preferences?.languages?.join(", ") || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, languages: e.target.value.split(",").map(s => s.trim()) } }))} placeholder="e.g. English, Swahili" className="rounded-xl" />
                  {/* Religion */}
                  <Label>Religion</Label>
                  <Input value={profile.preferences?.religion || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, religion: e.target.value } }))} placeholder="Any Religion" className="rounded-xl" />
                  {/* Denomination */}
                  <Label>Denomination</Label>
                  <Input value={profile.preferences?.denomination || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, denomination: e.target.value } }))} placeholder="Any Denomination" className="rounded-xl" />
                  {/* Marital Status */}
                  <Label>Marital Status</Label>
                  <Select value={profile.preferences?.maritalStatus || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, maritalStatus: value } }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Any Marital Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                      <SelectItem value="separated">Separated</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Has Children */}
                  <Label>Has Children</Label>
                  <Select value={profile.preferences?.hasChildren || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, hasChildren: value } }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Wants Children */}
                  <Label>Wants Children</Label>
                  <Select value={profile.preferences?.wantsChildren || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, wantsChildren: value } }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Accepts Partner with Kids */}
                  <Label>Accepts Partner with Kids</Label>
                  <Select value={profile.preferences?.acceptsPartnerWithKids || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, acceptsPartnerWithKids: value } }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Smoking */}
                  <Label>Smoking</Label>
                  <Select value={profile.preferences?.smoking || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, smoking: value } }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Any Smoking" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Alcohol */}
                  <Label>Alcohol</Label>
                  <Select value={profile.preferences?.alcohol || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, alcohol: value } }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Any Alcohol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Dietary Preference */}
                  <Label>Dietary Preference</Label>
                  <Input value={profile.preferences?.dietaryPreference || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, dietaryPreference: e.target.value } }))} placeholder="Any Diet" className="rounded-xl" />
                  {/* Pets */}
                  <Label>Pets</Label>
                  <Select value={profile.preferences?.pets || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, pets: value } }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Any Pets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Snoring */}
                  <Label>Snoring</Label>
                  <Select value={profile.preferences?.snoring || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, snoring: value } }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Any Snoring" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Open to Relocate */}
                  <Label>Open to Relocate</Label>
                  <Select value={profile.preferences?.openToRelocate || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, openToRelocate: value } }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Sexual Orientation */}
                  <Label>Sexual Orientation</Label>
                  <Input value={profile.preferences?.sexualOrientation || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, sexualOrientation: e.target.value } }))} placeholder="Any" className="rounded-xl" />
                  {/* Relationship Tradition */}
                  <Label>Relationship Tradition</Label>
                  <Input value={profile.preferences?.relationshipTradition || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, relationshipTradition: e.target.value } }))} placeholder="Any" className="rounded-xl" />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Dating Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#B22222] scrollbar-track-gray-200 dark:scrollbar-thumb-red-400 dark:scrollbar-track-gray-800">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-3 block">
                    Age Range: {profile.preferences.ageRange[0]} - {profile.preferences.ageRange[1]} years
                  </Label>
                  <Slider
                    value={profile.preferences.ageRange}
                    onValueChange={(value) =>
                      setProfile((prev) => ({
                        ...prev,
                        preferences: { ...prev.preferences, ageRange: value as [number, number] },
                      }))
                    }
                    min={18}
                    max={65}
                    step={1}
                    className="w-full"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="lookingFor" className="text-gray-700 dark:text-gray-300">
                    Looking For
                  </Label>
                  <Select
                    value={profile.preferences.lookingFor}
                    onValueChange={(value) =>
                      setProfile((prev) => ({
                        ...prev,
                        preferences: { ...prev.preferences, lookingFor: value },
                      }))
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual Dating</SelectItem>
                      <SelectItem value="serious">Serious Relationship</SelectItem>
                      <SelectItem value="friendship">Friendship</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

<details className="mb-4">
  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Demographics</summary>
  <div className="space-y-3 mt-2">
    {/* Gender */}
    <Label>Gender</Label>
    <Select value={profile.preferences?.gender || "male"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, gender: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
      </SelectContent>
    </Select>
    {/* Race */}
    <Label>Race</Label>
    <Select value={profile.preferences?.race || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, race: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Race" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any Race</SelectItem>
        <SelectItem value="african">African</SelectItem>
        <SelectItem value="asian">Asian</SelectItem>
        <SelectItem value="caucasian">Caucasian</SelectItem>
        <SelectItem value="latino">Latino</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
    {/* Country */}
    <Label>Country</Label>
    <Input value={profile.preferences?.country || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, country: e.target.value } }))} placeholder="Any Country" className="rounded-xl" disabled={!isEditing} />
    {/* County */}
    <Label>County</Label>
    <Input value={profile.preferences?.county || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, county: e.target.value } }))} placeholder="Any County" className="rounded-xl" disabled={!isEditing} />
    {/* Tribe */}
    <Label>Tribe</Label>
    <Input value={profile.preferences?.tribe || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, tribe: e.target.value } }))} placeholder="Any Tribe" className="rounded-xl" disabled={!isEditing} />
    {/* Languages */}
    <Label>Fluent in (comma separated)</Label>
    <Input value={profile.preferences?.languages?.join(", ") || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, languages: e.target.value.split(",").map(s => s.trim()) } }))} placeholder="e.g. English, Swahili" className="rounded-xl" disabled={!isEditing} />
  </div>
</details>

<details className="mb-4">
  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Beliefs</summary>
  <div className="space-y-3 mt-2">
    {/* Religion */}
    <Label>Religion</Label>
    <Input value={profile.preferences?.religion || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, religion: e.target.value } }))} placeholder="Any Religion" className="rounded-xl" disabled={!isEditing} />
    {/* Denomination */}
    <Label>Denomination</Label>
    <Input value={profile.preferences?.denomination || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, denomination: e.target.value } }))} placeholder="Any Denomination" className="rounded-xl" disabled={!isEditing} />
    {/* Religiousness */}
    <Label>Religiousness</Label>
    <Slider min={0} max={10} step={1} value={[profile.preferences?.religiousness || 0]} onValueChange={v => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, religiousness: v[0] } }))} className="mt-2" disabled={!isEditing} />
    {/* Church Attendance */}
    <Label>Church Attendance</Label>
    <Select value={profile.preferences?.churchAttendance || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, churchAttendance: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Attendance" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="regular">Regular</SelectItem>
        <SelectItem value="occasional">Occasional</SelectItem>
        <SelectItem value="rarely">Rarely</SelectItem>
        <SelectItem value="never">Never</SelectItem>
      </SelectContent>
    </Select>
  </div>
</details>

<details className="mb-4">
  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Lifestyle</summary>
  <div className="space-y-3 mt-2">
    {/* Smoking */}
    <Label>Smoking</Label>
    <Select value={profile.preferences?.smoking || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, smoking: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Smoking" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
        <SelectItem value="occasionally">Occasionally</SelectItem>
      </SelectContent>
    </Select>
    {/* Alcohol */}
    <Label>Alcohol</Label>
    <Select value={profile.preferences?.alcohol || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, alcohol: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Alcohol" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
        <SelectItem value="occasionally">Occasionally</SelectItem>
      </SelectContent>
    </Select>
    {/* Dietary Preference */}
    <Label>Dietary Preference</Label>
    <Input value={profile.preferences?.dietaryPreference || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, dietaryPreference: e.target.value } }))} placeholder="Any Diet" className="rounded-xl" disabled={!isEditing} />
    {/* Pets */}
    <Label>Pets</Label>
    <Select value={profile.preferences?.pets || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, pets: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Pets" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
      </SelectContent>
    </Select>
    {/* Snoring */}
    <Label>Snoring</Label>
    <Select value={profile.preferences?.snoring || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, snoring: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Snoring" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
      </SelectContent>
    </Select>
  </div>
</details>

<details className="mb-4">
  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Family</summary>
  <div className="space-y-3 mt-2">
    {/* Marital Status */}
    <Label>Marital Status</Label>
    <Select value={profile.preferences?.maritalStatus || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, maritalStatus: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Marital Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="single">Single</SelectItem>
        <SelectItem value="divorced">Divorced</SelectItem>
        <SelectItem value="widowed">Widowed</SelectItem>
        <SelectItem value="separated">Separated</SelectItem>
      </SelectContent>
    </Select>
    {/* Has Children */}
    <Label>Has Children</Label>
    <Select value={profile.preferences?.hasChildren || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, hasChildren: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
      </SelectContent>
    </Select>
    {/* Wants Children */}
    <Label>Wants Children</Label>
    <Select value={profile.preferences?.wantsChildren || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, wantsChildren: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
      </SelectContent>
    </Select>
    {/* Accepts Partner with Kids */}
    <Label>Accepts Partner with Kids</Label>
    <Select value={profile.preferences?.acceptsPartnerWithKids || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, acceptsPartnerWithKids: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
      </SelectContent>
    </Select>
  </div>
</details>

<details className="mb-4">
  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Preferences</summary>
  <div className="space-y-3 mt-2">
    {/* Open to Relocate */}
    <Label>Open to Relocate</Label>
    <Select value={profile.preferences?.openToRelocate || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, openToRelocate: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
      </SelectContent>
    </Select>
    {/* Sexual Orientation */}
    <Label>Sexual Orientation</Label>
    <Input value={profile.preferences?.sexualOrientation || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, sexualOrientation: e.target.value } }))} placeholder="Any" className="rounded-xl" disabled={!isEditing} />
    {/* Relationship Tradition */}
    <Label>Relationship Tradition</Label>
    <Input value={profile.preferences?.relationshipTradition || ""} onChange={e => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, relationshipTradition: e.target.value } }))} placeholder="Any" className="rounded-xl" disabled={!isEditing} />
  </div>
</details>

              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Appearance</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={effectiveTheme === "light" ? "default" : "outline"}
                      onClick={() => handleThemeChange("light")}
                      className={`flex items-center justify-center gap-2 ${
                        effectiveTheme === "light"
                          ? "bg-[#B22222] hover:bg-[#8B0000] text-white"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <Sun className="h-4 w-4" />
                      Light
                    </Button>
                    <Button
                      variant={effectiveTheme === "dark" ? "default" : "outline"}
                      onClick={() => handleThemeChange("dark")}
                      className={`flex items-center justify-center gap-2 ${
                        effectiveTheme === "dark"
                          ? "bg-[#B22222] hover:bg-[#8B0000] text-white"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      onClick={() => handleThemeChange("system")}
                      className={`flex items-center justify-center gap-2 ${
                        theme === "system"
                          ? "bg-[#B22222] hover:bg-[#8B0000] text-white"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <Monitor className="h-4 w-4" />
                      System
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Show pop-up for new messages</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Show a pop-up toast when you get a new message</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={profile.settings.notifications.toastMessages}
                    onCheckedChange={(checked) =>
                      setProfile((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          notifications: { ...prev.settings.notifications, toastMessages: checked as boolean },
                        },
                      }))
                    }
                    className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Show pop-up for new matches</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Show a pop-up toast when you get a new match</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={profile.settings.notifications.toastMatches}
                    onCheckedChange={(checked) =>
                      setProfile((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          notifications: { ...prev.settings.notifications, toastMatches: checked as boolean },
                        },
                      }))
                    }
                    className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Show Online Status</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Let others see when you're online</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={profile.settings.privacy.showOnline}
                    onCheckedChange={(checked) =>
                      setProfile((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          privacy: { ...prev.settings.privacy, showOnline: checked as boolean },
                        },
                      }))
                    }
                    className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Show read receipts</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to see when you have read their messages. If off, you also can't see others' read receipts.</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={profile.settings.privacy.showReadReceipts}
                    onCheckedChange={(checked) =>
                      setProfile((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          privacy: { ...prev.settings.privacy, showReadReceipts: checked as boolean },
                        },
                      }))
                    }
                    className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Connection Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Manage Connections</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        View and manage your connections
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/connections")}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    Manage
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <UserX className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Blocked Users</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage blocked users and privacy
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/blocked")}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    View
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Pending Requests</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        View and manage pending connection requests
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/requests")}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label className="text-gray-700 dark:text-gray-300">Username</Label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">{profile.username}</p>
                </div>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Email</Label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Member Since</Label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">January 2024</p>
                  </div>
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Account Status</Label>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsPasswordModalOpen(true)}
                      className="w-full justify-start border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEmailModalOpen(true)}
                      className="w-full justify-start border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Update Email Preferences
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => { setIsDeleteModalOpen(true); setDeleteStep(1); }}
                      className="w-full justify-start border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                    >
                      <UserX className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Password Change Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="oldPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Password must contain:</p>
              <ul className="list-disc ml-4 mt-1">
                <li>At least 8 characters</li>
                <li>Uppercase and lowercase letters</li>
                <li>Numbers and special characters</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handlePasswordChange}
              disabled={!oldPassword || !newPassword || !confirmPassword || isChangingPassword}
              className="bg-[#B22222] hover:bg-[#8B0000] text-white"
            >
              {isChangingPassword ? "Changing..." : "Change Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Preferences Modal */}
      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Email Preferences</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Marketing Emails</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive promotional content and special offers
                </p>
              </div>
              <Checkbox
                checked={emailPreferences.marketing}
                onCheckedChange={(checked) =>
                  setEmailPreferences(prev => ({ ...prev, marketing: checked as boolean }))
                }
                className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 dark:text-gray-300">App Updates</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified about new features and improvements
                </p>
              </div>
              <Checkbox
                checked={emailPreferences.updates}
                onCheckedChange={(checked) =>
                  setEmailPreferences(prev => ({ ...prev, updates: checked as boolean }))
                }
                className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 dark:text-gray-300">New Matches</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email notifications for new matches
                </p>
              </div>
              <Checkbox
                checked={emailPreferences.matches}
                onCheckedChange={(checked) =>
                  setEmailPreferences(prev => ({ ...prev, matches: checked as boolean }))
                }
                className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEmailPreferencesUpdate}
              disabled={isUpdatingEmail}
              className="bg-[#B22222] hover:bg-[#8B0000] text-white"
            >
              {isUpdatingEmail ? "Updating..." : "Update Preferences"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-lg w-full">
          {deleteStep === 1 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[#B22222]">Sorry to see you leave!</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <p className="text-gray-700 dark:text-gray-300">Please let us know why you're leaving (select all that apply):</p>
                <div className="space-y-2">
                  {reasonOptions.map((reason) => (
                    <label key={reason} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={deleteReasons.includes(reason)}
                        onChange={e => {
                          if (e.target.checked) setDeleteReasons([...deleteReasons, reason])
                          else setDeleteReasons(deleteReasons.filter(r => r !== reason))
                        }}
                        className="accent-[#B22222]"
                      />
                      {reason}
                    </label>
                  ))}
                  {deleteReasons.includes("Other") && (
                    <textarea
                      className="w-full border rounded p-2 mt-2 text-sm"
                      placeholder="Please describe..."
                      value={otherReason}
                      onChange={e => setOtherReason(e.target.value)}
                      rows={2}
                    />
                  )}
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button onClick={() => setDeleteStep(2)} disabled={deleteReasons.length === 0} className="bg-[#B22222] text-white">Continue</Button>
                <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
              </DialogFooter>
            </>
          )}
          {deleteStep === 2 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[#B22222]">Confirm Your Identity</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <p className="text-gray-700 dark:text-gray-300">For your security, please re-enter your login details:</p>
                <input
                  type="email"
                  className="w-full border rounded p-2"
                  placeholder="Email"
                  value={deleteEmail}
                  onChange={e => setDeleteEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full border rounded p-2"
                  placeholder="Password"
                  value={deletePassword}
                  onChange={e => setDeletePassword(e.target.value)}
                />
              </div>
              <DialogFooter className="mt-4">
                <Button onClick={() => setDeleteStep(3)} disabled={!deleteEmail || !deletePassword} className="bg-[#B22222] text-white">Continue</Button>
                <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
              </DialogFooter>
            </>
          )}
          {deleteStep === 3 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[#B22222]">Delete Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <p className="text-red-700 dark:text-red-400 font-semibold">This action is <b>irreversible</b>. All your data, matches, and messages will be permanently deleted.</p>
                <p className="text-gray-700 dark:text-gray-300">Are you sure you want to proceed?</p>
              </div>
              <DialogFooter className="mt-4">
                <Button onClick={handleDeleteAccount} className="bg-red-700 hover:bg-red-800 text-white" disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete Account Permanently"}
                </Button>
                <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>Cancel</Button>
              </DialogFooter>
            </>
          )}
          {deleteStep === 4 && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[#B22222]">Goodbye!</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <p className="text-gray-700 dark:text-gray-300">Your account has been deleted. We're truly sorry to see you go, but remember, you're always welcome back at Hanna's Connect. If you ever change your mind, we'd love to have you join our community again. Take care, and we hope to see you soon!</p>
              </div>
              <DialogFooter className="mt-4">
                <Button className="bg-[#B22222] text-white" onClick={() => { setIsDeleteModalOpen(false); router.push("/") }}>Return to Home</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
