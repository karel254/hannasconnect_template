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

interface UserProfile {
  name: string
  username: string
  email: string
  age: number
  location: string
  occupation: string
  bio: string
  interests: string[]
  avatar: string
  photos: string[]
  preferences: {
    ageRange: [number, number]
    maxDistance: number
    lookingFor: string
  }
  settings: {
    theme: string
    notifications: {
      messages: boolean
      matches: boolean
      likes: boolean
      marketing: boolean
    }
    privacy: {
      showAge: boolean
      showLocation: boolean
      showOnline: boolean
    }
  }
}

const availableAvatars = [
  "/images/avatar1.jpg",
  "/images/avatar2.jpg",
  "/images/avatar3.jpg",
  "/images/avatar4.jpg",
  "/images/avatar5.jpg",
  "/images/avatar6.jpg",
  "/images/avatar7.jpg",
  "/images/avatar8.jpg",
  "/images/avatar9.jpg",
  "/images/avatar10.jpg",
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

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [showAvatarSelection, setShowAvatarSelection] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    username: "",
    email: "",
    age: 25,
    location: "",
    occupation: "",
    bio: "",
    interests: [],
    avatar: "/images/avatar1.jpg",
    photos: [],
    preferences: {
      ageRange: [22, 35],
      maxDistance: 50,
      lookingFor: "serious",
    },
    settings: {
      theme: "system",
      notifications: {
        messages: true,
        matches: true,
        likes: true,
        marketing: false,
      },
      privacy: {
        showAge: true,
        showLocation: true,
        showOnline: true,
      },
    },
  })

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }

    // Load user data from localStorage
    const storedName = localStorage.getItem("userName") || "Demo User"
    const storedUsername = localStorage.getItem("userUsername") || "demouser"
    const storedOccupation = localStorage.getItem("userOccupation") || "Professional"
    const storedAvatar = localStorage.getItem("selectedIcon") || "/images/avatar1.jpg"

    setProfile((prev) => ({
      ...prev,
      name: storedName,
      username: storedUsername,
      occupation: storedOccupation,
      avatar: storedAvatar,
      email: `${storedUsername}@example.com`,
    }))
  }, [router])

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("userName", profile.name)
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

  const handleThemeChange = (theme: string) => {
    setProfile((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme,
      },
    }))

    // Apply theme immediately
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else if (theme === "light") {
      root.classList.remove("dark")
    } else {
      // System theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0">
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
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
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback className="bg-[#B22222] text-white text-2xl">{profile.name.charAt(0)}</AvatarFallback>
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
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{profile.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">@{profile.username}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {profile.age} years old
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
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <TabsTrigger value="about" className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white">
                About
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white"
              >
                Preferences
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white">
                Settings
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white">
                Account
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
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    />
                  </div>
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
                    <Label htmlFor="age" className="text-gray-700 dark:text-gray-300">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile((prev) => ({ ...prev, age: Number.parseInt(e.target.value) || 25 }))}
                      disabled={!isEditing}
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="City, Country"
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="occupation" className="text-gray-700 dark:text-gray-300">
                      Occupation
                    </Label>
                    <Input
                      id="occupation"
                      value={profile.occupation}
                      onChange={(e) => setProfile((prev) => ({ ...prev, occupation: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
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
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Dating Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  <Label className="text-gray-700 dark:text-gray-300 mb-3 block">
                    Maximum Distance: {profile.preferences.maxDistance} km
                  </Label>
                  <Slider
                    value={[profile.preferences.maxDistance]}
                    onValueChange={(value) =>
                      setProfile((prev) => ({
                        ...prev,
                        preferences: { ...prev.preferences, maxDistance: value[0] },
                      }))
                    }
                    min={1}
                    max={200}
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
                      variant={profile.settings.theme === "light" ? "default" : "outline"}
                      onClick={() => handleThemeChange("light")}
                      className={`flex items-center justify-center gap-2 ${
                        profile.settings.theme === "light"
                          ? "bg-[#B22222] hover:bg-[#8B0000] text-white"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <Sun className="h-4 w-4" />
                      Light
                    </Button>
                    <Button
                      variant={profile.settings.theme === "dark" ? "default" : "outline"}
                      onClick={() => handleThemeChange("dark")}
                      className={`flex items-center justify-center gap-2 ${
                        profile.settings.theme === "dark"
                          ? "bg-[#B22222] hover:bg-[#8B0000] text-white"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                    </Button>
                    <Button
                      variant={profile.settings.theme === "system" ? "default" : "outline"}
                      onClick={() => handleThemeChange("system")}
                      className={`flex items-center justify-center gap-2 ${
                        profile.settings.theme === "system"
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
                      <Label className="text-gray-700 dark:text-gray-300">New Messages</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Get notified when you receive new messages
                      </p>
                    </div>
                  </div>
                  <Checkbox
                    checked={profile.settings.notifications.messages}
                    onCheckedChange={(checked) =>
                      setProfile((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          notifications: { ...prev.settings.notifications, messages: checked as boolean },
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
                      <Label className="text-gray-700 dark:text-gray-300">New Matches</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when you have new matches</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={profile.settings.notifications.matches}
                    onCheckedChange={(checked) =>
                      setProfile((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          notifications: { ...prev.settings.notifications, matches: checked as boolean },
                        },
                      }))
                    }
                    className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Likes</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Get notified when someone likes your profile
                      </p>
                    </div>
                  </div>
                  <Checkbox
                    checked={profile.settings.notifications.likes}
                    onCheckedChange={(checked) =>
                      setProfile((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          notifications: { ...prev.settings.notifications, likes: checked as boolean },
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
                    <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Show Age</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Display your age on your profile</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={profile.settings.privacy.showAge}
                    onCheckedChange={(checked) =>
                      setProfile((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          privacy: { ...prev.settings.privacy, showAge: checked as boolean },
                        },
                      }))
                    }
                    className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Show Location</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Display your location on your profile</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={profile.settings.privacy.showLocation}
                    onCheckedChange={(checked) =>
                      setProfile((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          privacy: { ...prev.settings.privacy, showLocation: checked as boolean },
                        },
                      }))
                    }
                    className="border-[#B22222] data-[state=checked]:bg-[#B22222] data-[state=checked]:border-[#B22222]"
                  />
                </div>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  />
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Update Email Preferences
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full justify-start border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
