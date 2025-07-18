"use client"

import { useState, useEffect, useMemo } from "react"
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
import { useNavigationHistory } from "../../hooks/use-navigation-history"

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
  gender?: string;
  race?: string;
  country?: string;
  county?: string;
  constituency?: string;
  ward?: string;
  state?: string;
  tribe?: string;
  languages?: string[];
  height?: string;
  weight?: string;
  bodyType?: string;
  complexion?: string;
  eyeColor?: string;
  dimples?: string;
  teethFeatures?: string;
  tattoos?: string;
  piercings?: string;
  glasses?: string;
  hivStatus?: string;
  disability?: string;
  chronicIllness?: string;
  allergies?: string;
  bloodType?: string;
  snoring?: string;
  employmentStatus?: string;
  workCountry?: string;
  workCounty?: string;
  workConstituency?: string;
  workWard?: string;
  workState?: string;
  financialStability?: string;
  alcohol?: string;
  smoking?: string;
  hobbies?: string;
  religion?: string;
  religiousness?: string;
  denomination?: string;
  churchAttendance?: string;
  exerciseFrequency?: string;
  maritalStatus?: string;
  hasChildren?: string;
  numberOfChildren?: string;
  childrenAges?: string;
  childrenLiveWithUser?: string;
  wantsChildren?: string;
  acceptsPartnerWithKids?: string;
  longDistanceOk?: string;
  datingPerspective?: string;
  dealBreakers?: string;
  relationshipHopes?: string;
  partnerPreferences?: string;
  personalityType?: string;
  dontContactIf?: string;
  imperfections?: string;
  politicalViews?: string;
  dateDifferentPolitics?: string;
  believesInMarriage?: string;
  selfDescription?: string;
  openToRelocate?: string;
  sexualOrientation?: string;
  relationshipTradition?: string;
  selfDescriptionPhysical?: string;
  pets?: string;
  expectFromMe?: string;
  dietaryPreference?: string;
  preferences: any;
  settings: any;
  customGender?: string;
  sexualOrientationOther?: string;
  tattoosDescription?: string;
  piercingsDescription?: string;
  dimplesDescription?: string;
  glassesDescription?: string;
  acceptsPartnerWithKidsDescription?: string;
  heightUnit?: string;
  weightUnit?: string;
  heightFt?: string;
  heightIn?: string;
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

// SearchableSelect Component
const SearchableSelect = ({
  items,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
  label,
  disabled = false,
}: {
  items: string[]
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  searchPlaceholder: string
  label: string
  disabled?: boolean
}) => {
  const [search, setSearch] = useState("")

  const filteredItems = useMemo(
    () => items.filter((item) => item.toLowerCase().includes(search.toLowerCase())),
    [items, search],
  )

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="transition-all duration-200"
          disabled={disabled}
        />
        <Select
          value={value}
          onValueChange={(val) => {
            onValueChange(val)
            setSearch("")
          }}
          disabled={disabled}
        >
          <SelectTrigger className="transition-all duration-200">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            {filteredItems.map((item) => (
              <SelectItem key={item} value={item} className="transition-colors duration-150">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// DATA_CONSTANTS from registration form
const DATA_CONSTANTS = {
  worldCountries: [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
  ],
  kenyanCounties: [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
  ],
  kenyanWards: {
    Westlands: ["Kitisuru", "Parklands/Highridge", "Karura", "Kangemi", "Mountain View"],
    "Lang'ata": ["Karen", "Nairobi West", "Mugumo-ini", "South C", "Nyayo Highrise"],
    Starehe: ["Nairobi Central", "Ngara", "Pangani", "Ziwani/Kariokor", "Landimawe"],
    Kasarani: ["Clay City", "Mwiki", "Kasarani", "Njiru", "Ruai"],
  },
  kenyanTribes: [
    "Agikuyu", "Akamba", "Abaluhya", "Aluo", "Ameru", "Abagusii", "Amiji", "Turkana", "Aembu", "Akurya", "Asomali", "Kalenjin", "Ataita", "Asuba", "Agalla", "Abakuria", "Maasai", "Samburu", "Ambeere", "Adakama", "Apokomo", "Malakote", "Yaaku", "Abwaidakho", "Dahalo", "Boni", "Sanye", "Sakuye", "Garre", "Gabra", "Borana", "Burji", "Konso", "Rendille", "Ariaal", "Elmolo", "Munyoyaya", "Ogiek", "Sengwer", "Endorois", "Makonde", "Taita", "Taveta", "Duruma", "Digo", "Rabai", "Ribe", "Kauma", "Chonyi", "Jibana", "Kambe", "Giriama",
  ],
  genderOptions: ["male", "female", "other"],
  raceOptions: ["Black", "White", "Asian", "Latino", "Mixed"],
  bodyTypeOptions: ["slim", "average", "athletic", "curvy", "plus-size", "other"],
  complexionOptions: ["Fair", "Dark", "Light brown"],
  eyeColorOptions: ["brown", "black", "blue", "green", "hazel", "grey", "other"],
  dimplesOptions: ["yes", "no"],
  tattoosOptions: ["yes", "no"],
  piercingsOptions: ["yes", "no"],
  glassesOptions: ["yes", "no"],
  disabilityOptions: ["yes", "no"],
  chronicIllnessOptions: ["yes", "no"],
  bloodTypeOptions: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  snoringOptions: ["yes", "no"],
  employmentStatusOptions: ["employed", "unemployed", "student", "retired", "self-employed"],
  financialStabilityOptions: ["stable", "unstable", "building"],
  alcoholOptions: ["yes", "no", "occasionally"],
  smokingOptions: ["yes", "no", "occasionally"],
  dietaryPreferenceOptions: ["omnivore", "vegetarian", "vegan", "pescatarian", "keto", "paleo", "other"],
  hasPetsOptions: ["yes", "no"],
  exerciseFrequencyOptions: ["daily", "weekly", "monthly", "rarely", "never"],
  religionOptions: ["Christianity", "Islam", "Hinduism", "Buddhism", "Judaism", "Atheism", "Agnosticism", "Other"],
  maritalStatusOptions: ["single", "divorced", "widowed", "separated"],
  hasChildrenOptions: ["yes", "no"],
  wantsChildrenOptions: ["yes", "no", "maybe"],
  acceptsPartnerWithKidsOptions: ["yes", "no"],
  longDistanceOkOptions: ["yes", "no"],
  sexualOrientationOptions: ["Straight", "Gay", "Lesbian", "Bisexual", "Other"],
  personalityTypeOptions: ["introvert", "extrovert", "ambivert"],
  dateDifferentPoliticsOptions: ["yes", "no"],
  believesInMarriageOptions: ["yes", "no", "maybe"],
}

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { theme, effectiveTheme, toggleTheme } = useTheme()
  const { goBack } = useNavigationHistory()
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

  // Get current user info
  let currentUser = null
  if (typeof window !== 'undefined') {
    try {
      currentUser = JSON.parse(localStorage.getItem('demoUser') || '{}')
    } catch {}
  }
  const isAdmin = currentUser?.username === 'admin'
  
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
    setTimeout(() => {
      setIsChangingPassword(false)
      setIsPasswordModalOpen(false)
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
      // --- Admin password update logic ---
      if (isAdmin) {
        localStorage.setItem('adminPassword', newPassword)
        toast({
          title: "Admin Password Updated",
          description: "Your admin password has been successfully changed.",
        })
        return
      }
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
      <div className="md:hidden sticky top-0 z-40 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-white">Profile</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-white hover:bg-white/20"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-40 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-white">Profile</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-white hover:bg-white/20"
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

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mt-6">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Full Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Personal Info */}
                  <div>
                    <h3 className="font-bold text-lg text-[#B22222] mb-2">Personal Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label>Username</Label><Input value={profile.username || ''} onChange={e => setProfile(prev => ({ ...prev, username: e.target.value }))} disabled={!isEditing} /></div>
                      <div><Label>Gender</Label>
                        <Select
                          value={profile.gender || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, gender: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.genderOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                        {profile.gender === 'other' && (
                          <Input
                            value={profile.customGender || ''}
                            onChange={e => setProfile(prev => ({ ...prev, customGender: e.target.value }))}
                            placeholder="Please describe"
                            className="transition-all duration-200 mt-2 animate-in slide-in-from-top-2"
                            disabled={!isEditing}
                          />
                        )}
                      </div>
                      <div><Label>Age</Label><Input value={profile.age || (profile.dateOfBirth ? calculateAge(profile.dateOfBirth) : '')} disabled /></div>
                      <div><Label>Race</Label>
                        <Select
                          value={profile.race || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, race: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select race" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.raceOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                      </div>
                      <div>
                        <SearchableSelect
                          items={DATA_CONSTANTS.worldCountries}
                          value={profile.country || ''}
                          onValueChange={(value) => {
                            setProfile(prev => ({ 
                              ...prev, 
                              country: value,
                              county: "",
                              constituency: "",
                              ward: "",
                              state: ""
                            }))
                          }}
                          placeholder="Select country"
                          searchPlaceholder="Search countries..."
                          label="Country"
                          disabled={!isEditing}
                        />
                      </div>

                      {/* Kenya-specific location fields */}
                      {profile.country === "Kenya" && (
                        <div className="space-y-4 animate-in slide-in-from-top-4">
                          <SearchableSelect
                            items={DATA_CONSTANTS.kenyanCounties}
                            value={profile.county || ''}
                            onValueChange={(value) => {
                              setProfile(prev => ({ 
                                ...prev, 
                                county: value,
                                constituency: "",
                                ward: ""
                              }))
                            }}
                            placeholder="Select county"
                            searchPlaceholder="Search counties..."
                            label="County"
                            disabled={!isEditing}
                          />
                          {/* Constituency as free text input, not dropdown */}
                          <div className="space-y-2">
                            <Label>Constituency</Label>
                            <Input
                              value={profile.constituency || ''}
                              onChange={e => setProfile(prev => ({ ...prev, constituency: e.target.value }))}
                              placeholder="Enter your constituency"
                              className="transition-all duration-200"
                              disabled={!isEditing}
                            />
                          </div>
                          {/* Ward remains as before (optional) */}
                          {profile.constituency && DATA_CONSTANTS.kenyanWards[profile.constituency as keyof typeof DATA_CONSTANTS.kenyanWards] && (
                            <SearchableSelect
                              items={DATA_CONSTANTS.kenyanWards[profile.constituency as keyof typeof DATA_CONSTANTS.kenyanWards]}
                              value={profile.ward || ''}
                              onValueChange={(value) => setProfile(prev => ({ ...prev, ward: value }))}
                              placeholder="Select ward (optional)"
                              searchPlaceholder="Search wards..."
                              label="Ward (Optional)"
                              disabled={!isEditing}
                            />
                          )}
                        </div>
                      )}

                      {/* State for other countries as free text input */}
                      {profile.country && profile.country !== "Kenya" && (
                        <div className="animate-in slide-in-from-top-4 space-y-2">
                          <Label>State/Province</Label>
                          <Input
                            value={profile.state || ''}
                            onChange={e => setProfile(prev => ({ ...prev, state: e.target.value }))}
                            placeholder="Enter your state/province"
                            className="transition-all duration-200"
                            disabled={!isEditing}
                          />
                        </div>
                      )}

                      {/* Tribe - only for Kenya */}
                      {profile.country === "Kenya" && (
                        <div className="animate-in slide-in-from-top-4">
                          <SearchableSelect
                            items={DATA_CONSTANTS.kenyanTribes}
                            value={profile.tribe || ''}
                            onValueChange={(value) => setProfile(prev => ({ ...prev, tribe: value }))}
                            placeholder="Select tribe"
                            searchPlaceholder="Search tribes..."
                            label="Tribe"
                            disabled={!isEditing}
                          />
                        </div>
                      )}

                      <div className="md:col-span-2"><Label>Languages</Label><Input value={profile.languages?.join(', ') || ''} onChange={e => setProfile(prev => ({ ...prev, languages: e.target.value.split(',').map(s => s.trim()) }))} disabled={!isEditing} /></div>
                    </div>
                  </div>
                  {/* Physical Appearance */}
                  <div>
                    <h3 className="font-bold text-lg text-[#B22222] mb-2">Physical Appearance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Height</Label>
                        <div className="flex gap-2">
                          {profile.heightUnit === "ft" ? (
                            <>
                              <Input 
                                type="number" 
                                value={profile.heightFt || ''} 
                                onChange={e => setProfile(prev => ({ ...prev, heightFt: e.target.value }))} 
                                placeholder="ft" 
                                className="flex-1" 
                                min={0} 
                                disabled={!isEditing}
                              />
                              <Input 
                                type="number" 
                                value={profile.heightIn || ''} 
                                onChange={e => setProfile(prev => ({ ...prev, heightIn: e.target.value }))} 
                                placeholder="in" 
                                className="flex-1" 
                                min={0} 
                                max={11} 
                                disabled={!isEditing}
                              />
                            </>
                          ) : (
                            <Input 
                              type="number" 
                              value={profile.height || ''} 
                              onChange={e => setProfile(prev => ({ ...prev, height: e.target.value }))} 
                              placeholder="Height" 
                              className="flex-1" 
                              min={0} 
                              disabled={!isEditing}
                            />
                          )}
                          <Select 
                            value={profile.heightUnit || 'cm'} 
                            onValueChange={v => setProfile(prev => ({ ...prev, heightUnit: v }))}
                            disabled={!isEditing}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cm">cm</SelectItem>
                              <SelectItem value="ft">ft</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Weight</Label>
                        <div className="flex gap-2">
                          <Input 
                            type="number" 
                            value={profile.weight || ''} 
                            onChange={e => setProfile(prev => ({ ...prev, weight: e.target.value }))} 
                            placeholder="Weight" 
                            className="flex-1" 
                            disabled={!isEditing}
                          />
                          <Select 
                            value={profile.weightUnit || 'kg'} 
                            onValueChange={v => setProfile(prev => ({ ...prev, weightUnit: v }))}
                            disabled={!isEditing}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="lb">lb</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Body Type</Label>
                        <Select
                          value={profile.bodyType || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, bodyType: value }))}
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select body type" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.bodyTypeOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div><Label>Complexion</Label><Input value={profile.complexion || ''} onChange={e => setProfile(prev => ({ ...prev, complexion: e.target.value }))} disabled /></div>
                      <div>
                        <Label>Eye Color</Label>
                        <Select
                          value={profile.eyeColor || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, eyeColor: value }))}
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select eye color" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.eyeColorOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Dimples</Label>
                        <Select
                          value={profile.dimples || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, dimples: value }))}
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select dimples" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.dimplesOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {profile.dimples === 'yes' && (
                          <>
                            <Input 
                              value={profile.dimplesDescription || ''}
                              onChange={e => {
                                const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                                setProfile(prev => ({ ...prev, dimplesDescription: value }));
                              }}
                              placeholder="Describe your dimples"
                              className="mt-2"
                              disabled
                            />
                            <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                              {(profile.dimplesDescription ?? '').trim() ? (profile.dimplesDescription ?? '').trim().split(/\s+/).length : 0}/25 words
                            </div>
                          </>
                        )}
                      </div>
                      <div><Label>Teeth Features</Label><Input value={profile.teethFeatures || ''} onChange={e => setProfile(prev => ({ ...prev, teethFeatures: e.target.value }))} disabled /></div>
                      <div>
                        <Label>Tattoos</Label>
                        <Select
                          value={profile.tattoos || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, tattoos: value }))}
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select tattoos" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.tattoosOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {profile.tattoos === 'yes' && (
                          <>
                            <Input 
                              value={profile.tattoosDescription || ''}
                              onChange={e => {
                                const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                                setProfile(prev => ({ ...prev, tattoosDescription: value }));
                              }}
                              placeholder="Describe your tattoos"
                              className="mt-2"
                              disabled
                            />
                            <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                              {(profile.tattoosDescription ?? '').trim() ? (profile.tattoosDescription ?? '').trim().split(/\s+/).length : 0}/25 words
                            </div>
                          </>
                        )}
                      </div>
                      <div>
                        <Label>Piercings</Label>
                        <Select
                          value={profile.piercings || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, piercings: value }))}
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select piercings" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.piercingsOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {profile.piercings === 'yes' && (
                          <>
                            <Input 
                              value={profile.piercingsDescription || ''}
                              onChange={e => {
                                const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                                setProfile(prev => ({ ...prev, piercingsDescription: value }));
                              }}
                              placeholder="Describe your piercings"
                              className="mt-2"
                              disabled
                            />
                            <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                              {(profile.piercingsDescription ?? '').trim() ? (profile.piercingsDescription ?? '').trim().split(/\s+/).length : 0}/25 words
                            </div>
                          </>
                        )}
                      </div>
                      <div>
                        <Label>Glasses</Label>
                        <Select
                          value={profile.glasses || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, glasses: value }))}
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select glasses" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.glassesOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {profile.glasses === 'yes' && (
                          <>
                            <Input 
                              value={profile.glassesDescription || ''}
                              onChange={e => {
                                const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                                setProfile(prev => ({ ...prev, glassesDescription: value }));
                              }}
                              placeholder="Describe your glasses"
                              className="mt-2"
                              disabled
                            />
                            <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                              {(profile.glassesDescription ?? '').trim() ? (profile.glassesDescription ?? '').trim().split(/\s+/).length : 0}/25 words
                            </div>
                          </>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <Label>Self Description (Physical)</Label>
                        <Textarea 
                          value={profile.selfDescriptionPhysical || ''} 
                          onChange={e => {
                            const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                            setProfile(prev => ({ ...prev, selfDescriptionPhysical: value }));
                          }}
                          placeholder="Describe your physical appearance in your own words"
                          disabled
                        />
                        <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                          {((profile.bio || profile.selfDescription)?.trim() || '').split(/\s+/).length}/25 words
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Health */}
                  <div>
                    <h3 className="font-bold text-lg text-[#B22222] mb-2">Health</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label>HIV Status</Label><Input value={profile.hivStatus || ''} disabled /></div>
                      <div>
                        <Label>Disability</Label>
                        <Select
                          value={profile.disability || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, disability: value }))}
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select disability" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.disabilityOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Chronic Illness</Label>
                        <Select
                          value={profile.chronicIllness || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, chronicIllness: value }))}
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select chronic illness" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.chronicIllnessOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div><Label>Allergies</Label><Input value={profile.allergies || ''} onChange={e => setProfile(prev => ({ ...prev, allergies: e.target.value }))} disabled /></div>
                      <div>
                        <Label>Blood Type</Label>
                        <Select
                          value={profile.bloodType || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, bloodType: value }))}
                          disabled
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.bloodTypeOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Snoring</Label>
                        <Select
                          value={profile.snoring || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, snoring: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select snoring" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.snoringOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {/* Work & Lifestyle */}
                  <div>
                    <h3 className="font-bold text-lg text-[#B22222] mb-2">Work & Lifestyle</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Employment Status</Label>
                        <Select
                          value={profile.employmentStatus || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, employmentStatus: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment status" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.employmentStatusOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div><Label>Occupation</Label><Input value={profile.occupation || ''} onChange={e => setProfile(prev => ({ ...prev, occupation: e.target.value }))} disabled={!isEditing} /></div>
                      <div>
                        <SearchableSelect
                          items={DATA_CONSTANTS.worldCountries}
                          value={profile.workCountry || ''}
                          onValueChange={(value) => {
                            setProfile(prev => ({ 
                              ...prev, 
                              workCountry: value,
                              workCounty: "",
                              workConstituency: "",
                              workWard: "",
                              workState: ""
                            }))
                          }}
                          placeholder="Select work country"
                          searchPlaceholder="Search countries..."
                          label="Work Country"
                          disabled={!isEditing}
                        />
                      </div>

                      {/* Kenya-specific work location fields */}
                      {profile.workCountry === "Kenya" && (
                        <div className="space-y-4 animate-in slide-in-from-top-4">
                          <SearchableSelect
                            items={DATA_CONSTANTS.kenyanCounties}
                            value={profile.workCounty || ''}
                            onValueChange={(value) => {
                              setProfile(prev => ({ 
                                ...prev, 
                                workCounty: value,
                                workConstituency: "",
                                workWard: ""
                              }))
                            }}
                            placeholder="Select work county"
                            searchPlaceholder="Search counties..."
                            label="Work County"
                            disabled={!isEditing}
                          />
                          {/* Work Constituency as free text input */}
                          <div className="space-y-2">
                            <Label>Work Constituency</Label>
                            <Input
                              value={profile.workConstituency || ''}
                              onChange={e => setProfile(prev => ({ ...prev, workConstituency: e.target.value }))}
                              placeholder="Enter your work constituency"
                              className="transition-all duration-200"
                              disabled={!isEditing}
                            />
                          </div>
                          {/* Work Ward (optional) */}
                          {profile.workConstituency && DATA_CONSTANTS.kenyanWards[profile.workConstituency as keyof typeof DATA_CONSTANTS.kenyanWards] && (
                            <SearchableSelect
                              items={DATA_CONSTANTS.kenyanWards[profile.workConstituency as keyof typeof DATA_CONSTANTS.kenyanWards]}
                              value={profile.workWard || ''}
                              onValueChange={(value) => setProfile(prev => ({ ...prev, workWard: value }))}
                              placeholder="Select work ward (optional)"
                              searchPlaceholder="Search wards..."
                              label="Work Ward (Optional)"
                              disabled={!isEditing}
                            />
                          )}
                        </div>
                      )}

                      {/* Work State for other countries as free text input */}
                      {profile.workCountry && profile.workCountry !== "Kenya" && (
                        <div className="animate-in slide-in-from-top-4 space-y-2">
                          <Label>Work State/Province</Label>
                          <Input
                            value={profile.workState || ''}
                            onChange={e => setProfile(prev => ({ ...prev, workState: e.target.value }))}
                            placeholder="Enter your work state/province"
                            className="transition-all duration-200"
                            disabled={!isEditing}
                          />
                        </div>
                      )}
                      <div>
                        <Label>Financial Stability</Label>
                        <Select
                          value={profile.financialStability || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, financialStability: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select financial stability" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.financialStabilityOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Alcohol</Label>
                        <Select
                          value={profile.alcohol || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, alcohol: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select alcohol" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.alcoholOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Smoking</Label>
                        <Select
                          value={profile.smoking || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, smoking: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select smoking" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.smokingOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Dietary Preference</Label>
                        <Select
                          value={profile.dietaryPreference || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, dietaryPreference: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select dietary preference" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.dietaryPreferenceOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Has Pets</Label>
                        <Select
                          value={profile.pets || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, pets: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select pets" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.hasPetsOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Exercise Frequency</Label>
                        <Select
                          value={profile.exerciseFrequency || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, exerciseFrequency: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select exercise frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.exerciseFrequencyOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div><Label>Hobbies</Label><Input value={profile.hobbies || ''} onChange={e => setProfile(prev => ({ ...prev, hobbies: e.target.value }))} disabled={!isEditing} /></div>
                    </div>
                  </div>
                  {/* Beliefs */}
                  <div>
                    <h3 className="font-bold text-lg text-[#B22222] mb-2">Beliefs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                  <Label>Religion</Label>
                        <Select
                          value={profile.religion || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, religion: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select religion" />
                          </SelectTrigger>
                          <SelectContent>
                            {DATA_CONSTANTS.religionOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div><Label>Religiousness</Label><Input value={profile.religiousness || ''} onChange={e => setProfile(prev => ({ ...prev, religiousness: e.target.value }))} disabled={!isEditing} /></div>
                      <div><Label>Denomination</Label><Input value={profile.denomination || ''} onChange={e => setProfile(prev => ({ ...prev, denomination: e.target.value }))} disabled={!isEditing} /></div>
                      <div><Label>Church Attendance</Label><Input value={profile.churchAttendance || ''} onChange={e => setProfile(prev => ({ ...prev, churchAttendance: e.target.value }))} disabled={!isEditing} /></div>
                    </div>
                  </div>
                  {/* Family */}
                  <div>
                    <h3 className="font-bold text-lg text-[#B22222] mb-2">Family</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                  <Label>Marital Status</Label>
                        <Select
                          value={profile.maritalStatus || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, maritalStatus: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.maritalStatusOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                      </div>
                      <div>
                  <Label>Has Children</Label>
                        <Select
                          value={profile.hasChildren || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, hasChildren: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select has children" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.hasChildrenOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                      </div>
                      <div><Label>Number of Children</Label><Input value={profile.numberOfChildren || ''} onChange={e => setProfile(prev => ({ ...prev, numberOfChildren: e.target.value }))} disabled={!isEditing} /></div>
                      <div><Label>Children Ages</Label><Input value={profile.childrenAges || ''} onChange={e => setProfile(prev => ({ ...prev, childrenAges: e.target.value }))} disabled={!isEditing} /></div>
                      <div><Label>Children Live With User</Label><Input value={profile.childrenLiveWithUser || ''} onChange={e => setProfile(prev => ({ ...prev, childrenLiveWithUser: e.target.value }))} disabled={!isEditing} /></div>
                      <div>
                  <Label>Wants Children</Label>
                        <Select
                          value={profile.wantsChildren || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, wantsChildren: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select wants children" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.wantsChildrenOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label>Accepts Partner With Kids</Label>
                        <Select
                          value={profile.acceptsPartnerWithKids || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, acceptsPartnerWithKids: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select accepts partner with kids" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.acceptsPartnerWithKidsOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                        {profile.acceptsPartnerWithKids === "yes" && (
                          <Input
                            value={profile.acceptsPartnerWithKidsDescription || ''}
                            onChange={e => setProfile(prev => ({ ...prev, acceptsPartnerWithKidsDescription: e.target.value }))}
                            placeholder="Describe your preference"
                            className="transition-all duration-200 mt-2"
                            disabled={!isEditing}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Preferences */}
                  <div>
                    <h3 className="font-bold text-lg text-[#B22222] mb-2">Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label>Open to Relocate</Label><Input value={profile.openToRelocate || ''} onChange={e => setProfile(prev => ({ ...prev, openToRelocate: e.target.value }))} disabled={!isEditing} /></div>
                      <div>
                        <Label>Sexual Orientation</Label>
                        <Select
                          value={profile.sexualOrientation || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, sexualOrientation: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select sexual orientation" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.sexualOrientationOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                        {profile.sexualOrientation === 'Other' && (
                          <Input
                            value={profile.sexualOrientationOther || ''}
                            onChange={e => setProfile(prev => ({ ...prev, sexualOrientationOther: e.target.value }))}
                            placeholder="Please specify"
                            className="transition-all duration-200 mt-2"
                            disabled={!isEditing}
                          />
                        )}
                      </div>
                      <div><Label>Relationship Tradition</Label><Input value={profile.relationshipTradition || ''} onChange={e => setProfile(prev => ({ ...prev, relationshipTradition: e.target.value }))} disabled={!isEditing} /></div>
                      <div>
                        <Label>Long Distance OK</Label>
                        <Select
                          value={profile.longDistanceOk || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, longDistanceOk: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select long distance" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.longDistanceOkOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                      </div>
                      <div>
                        <Label>Dating Perspective</Label>
                        <Input 
                          value={profile.datingPerspective || ''} 
                          onChange={e => {
                            const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                            setProfile(prev => ({ ...prev, datingPerspective: value }));
                          }}
                          placeholder="What's your perspective on dating?"
                          disabled={!isEditing}
                        />
                        <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                          {profile.datingPerspective?.trim() ? profile.datingPerspective.trim().split(/\s+/).length : 0}/25 words
                        </div>
                      </div>
                      <div>
                        <Label>Deal Breakers</Label>
                        <Input 
                          value={profile.dealBreakers || ''} 
                          onChange={e => {
                            const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                            setProfile(prev => ({ ...prev, dealBreakers: value }));
                          }}
                          placeholder="What are your deal breakers?"
                          disabled={!isEditing}
                        />
                        <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                          {profile.dealBreakers?.trim() ? profile.dealBreakers.trim().split(/\s+/).length : 0}/25 words
                        </div>
                      </div>
                      <div>
                        <Label>Relationship Goals</Label>
                        <Input 
                          value={profile.relationshipHopes || ''} 
                          onChange={e => {
                            const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                            setProfile(prev => ({ ...prev, relationshipHopes: value }));
                          }}
                          placeholder="What do you hope for in a relationship?"
                          disabled={!isEditing}
                        />
                        <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                          {profile.relationshipHopes?.trim() ? profile.relationshipHopes.trim().split(/\s+/).length : 0}/25 words
                        </div>
                      </div>
                      <div>
                        <Label>Partner Preferences</Label>
                        <Input 
                          value={profile.partnerPreferences || ''} 
                          onChange={e => {
                            const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                            setProfile(prev => ({ ...prev, partnerPreferences: value }));
                          }}
                          placeholder="What are you looking for in a partner?"
                          disabled={!isEditing}
                        />
                        <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                          {profile.partnerPreferences?.trim() ? profile.partnerPreferences.trim().split(/\s+/).length : 0}/25 words
                        </div>
                      </div>
                      <div>
                        <Label>Personality Type</Label>
                        <Select
                          value={profile.personalityType || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, personalityType: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select personality type" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.personalityTypeOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                      </div>
                      <div>
                        <Label>Don't Contact If</Label>
                        <Input 
                          value={profile.dontContactIf || ''} 
                          onChange={e => {
                            const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                            setProfile(prev => ({ ...prev, dontContactIf: value }));
                          }}
                          placeholder="What would make you not want to be contacted?"
                          disabled={!isEditing}
                        />
                        <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                          {profile.dontContactIf?.trim() ? profile.dontContactIf.trim().split(/\s+/).length : 0}/25 words
                        </div>
                      </div>
                      <div>
                        <Label>If we end up together, here's what you can expect from me</Label>
                        <Input 
                          value={profile.expectFromMe || ''} 
                          onChange={e => {
                            const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                            setProfile(prev => ({ ...prev, expectFromMe: value }));
                          }}
                          placeholder="Describe what your partner can expect from you"
                          disabled={!isEditing}
                        />
                        <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                          {profile.expectFromMe?.trim() ? profile.expectFromMe.trim().split(/\s+/).length : 0}/25 words
                        </div>
                      </div>
                      <div>
                        <Label>Imperfections</Label>
                        <Input 
                          value={profile.imperfections || ''} 
                          onChange={e => {
                            const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                            setProfile(prev => ({ ...prev, imperfections: value }));
                          }}
                          placeholder="What are some of your imperfections?"
                          disabled={!isEditing}
                        />
                        <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                          {profile.imperfections?.trim() ? profile.imperfections.trim().split(/\s+/).length : 0}/25 words
                        </div>
                      </div>
                      <div><Label>Political Views</Label><Input value={profile.politicalViews || ''} onChange={e => setProfile(prev => ({ ...prev, politicalViews: e.target.value }))} disabled={!isEditing} /></div>
                      <div>
                        <Label>Date Different Politics</Label>
                        <Select
                          value={profile.dateDifferentPolitics || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, dateDifferentPolitics: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select date different politics" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.dateDifferentPoliticsOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                      </div>
                      <div>
                        <Label>Believes in Marriage</Label>
                        <Select
                          value={profile.believesInMarriage || ''}
                          onValueChange={value => setProfile(prev => ({ ...prev, believesInMarriage: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select believes in marriage" />
                    </SelectTrigger>
                    <SelectContent>
                            {DATA_CONSTANTS.believesInMarriageOptions.map(option => (
                              <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                            ))}
                    </SelectContent>
                  </Select>
                      </div>
                    </div>
                  </div>
                  {/* About Me */}
                  <div>
                    <h3 className="font-bold text-lg text-[#B22222] mb-2">About Me</h3>
                    <Textarea 
                      value={profile.bio || profile.selfDescription || ''} 
                      onChange={e => {
                        const value = e.target.value.split(/\s+/).slice(0, 25).join(" ");
                        setProfile(prev => ({ ...prev, bio: value, selfDescription: value }));
                      }}
                      placeholder="Describe yourself in your own words"
                      disabled={!isEditing}
                    />
                    <div className="text-xs text-gray-700 mt-1 block w-full text-right whitespace-nowrap">
                      {((profile.bio || profile.selfDescription)?.trim() || '').split(/\s+/).length}/25 words
                    </div>
                  </div>
                </CardContent>
              </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Dating Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#B22222] scrollbar-track-gray-200 dark:scrollbar-thumb-red-400 dark:scrollbar-track-gray-800">
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-3 block">
                    Age Range: {profile.preferences?.ageRange?.[0] || 25} - {profile.preferences?.ageRange?.[1] || 35} years
                  </Label>
                  <Slider
                    value={profile.preferences?.ageRange || [25, 35]}
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
                    value={profile.preferences?.lookingFor || "serious"}
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
  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Health</summary>
  <div className="space-y-3 mt-2">
    {/* HIV Status */}
    <Label>HIV Status</Label>
    <Select value={profile.preferences?.hivStatus || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, hivStatus: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any HIV Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="negative">Negative</SelectItem>
        <SelectItem value="positive">Positive</SelectItem>
        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
      </SelectContent>
    </Select>
    {/* Disability */}
    <Label>Disability</Label>
    <Select value={profile.preferences?.disability || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, disability: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Disability" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="none">None</SelectItem>
        <SelectItem value="physical">Physical</SelectItem>
        <SelectItem value="visual">Visual</SelectItem>
        <SelectItem value="hearing">Hearing</SelectItem>
        <SelectItem value="cognitive">Cognitive</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
    {/* Chronic Illness */}
    <Label>Chronic Illness</Label>
    <Select value={profile.preferences?.chronicIllness || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, chronicIllness: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Chronic Illness" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="none">None</SelectItem>
        <SelectItem value="diabetes">Diabetes</SelectItem>
        <SelectItem value="hypertension">Hypertension</SelectItem>
        <SelectItem value="asthma">Asthma</SelectItem>
        <SelectItem value="arthritis">Arthritis</SelectItem>
        <SelectItem value="heart-disease">Heart Disease</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
    {/* Allergies */}
    <Label>Allergies</Label>
    <Select value={profile.preferences?.allergies || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, allergies: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Allergies" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="none">None</SelectItem>
        <SelectItem value="food">Food</SelectItem>
        <SelectItem value="medication">Medication</SelectItem>
        <SelectItem value="environmental">Environmental</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
    {/* Blood Type */}
    <Label>Blood Type</Label>
    <Select value={profile.preferences?.bloodType || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, bloodType: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Blood Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="a-positive">A+</SelectItem>
        <SelectItem value="a-negative">A-</SelectItem>
        <SelectItem value="b-positive">B+</SelectItem>
        <SelectItem value="b-negative">B-</SelectItem>
        <SelectItem value="ab-positive">AB+</SelectItem>
        <SelectItem value="ab-negative">AB-</SelectItem>
        <SelectItem value="o-positive">O+</SelectItem>
        <SelectItem value="o-negative">O-</SelectItem>
      </SelectContent>
    </Select>
    {/* Exercise Frequency */}
    <Label>Exercise Frequency</Label>
    <Select value={profile.preferences?.exerciseFrequency || "any"} onValueChange={value => setProfile(prev => ({ ...prev, preferences: { ...prev.preferences, exerciseFrequency: value } }))} disabled={!isEditing}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Any Exercise Frequency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="never">Never</SelectItem>
        <SelectItem value="rarely">Rarely</SelectItem>
        <SelectItem value="sometimes">Sometimes</SelectItem>
        <SelectItem value="regularly">Regularly</SelectItem>
        <SelectItem value="daily">Daily</SelectItem>
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
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
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 h-10"
                  >
                    Manage
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <UserX className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
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
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 h-10"
                  >
                    View
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
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
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 h-10"
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

      {/* Only show password change for admin */}
      {isAdmin && (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Change Admin Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => setIsPasswordModalOpen(true)} className="bg-[#B22222] hover:bg-[#8B0000] text-white">
              Change Password
            </Button>
            <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Admin Password</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Label htmlFor="oldPassword">Old Password</Label>
                  <Input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    className="w-full"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setShowOldPassword(v => !v)}>
                    {showOldPassword ? 'Hide' : 'Show'}
                  </Button>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setShowNewPassword(v => !v)}>
                    {showNewPassword ? 'Hide' : 'Show'}
                  </Button>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setShowConfirmPassword(v => !v)}>
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </Button>
                </div>
                <DialogFooter>
                  <Button onClick={handlePasswordChange} disabled={isChangingPassword} className="bg-[#B22222] hover:bg-[#8B0000] text-white">
                    {isChangingPassword ? 'Changing...' : 'Change Password'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
