"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, UserX, MessageCircle, MoreVertical, Search, Filter, ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "../../hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProfileModal from "@/components/ProfileModal";

interface Connection {
  id: string
  userId: string
  username: string
  name: string
  age: number
  occupation: string
  location: string
  avatar: string
  lastSeen: Date
  isOnline: boolean
  compatibility: number
  status: "connected" | "blocked"
}

export default function ConnectionsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [connections, setConnections] = useState<Connection[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("connected")
  // Add state for modal open/close and selected profile
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
    
    // Load sample connections
    loadConnections()
  }, [router])

  const loadConnections = () => {
    // Sample connections data
    const sampleConnections: Connection[] = [
      // Kenyan users
      {
        id: "1",
        userId: "brianotieno",
        name: "Brian Otieno",
        username: "brianotieno",
        age: 34,
        gender: "Male",
        dateOfBirth: "1990-02-10",
        occupation: "Engineer",
        location: "Kisumu, Kenya",
        county: "Kisumu",
        country: "Kenya",
        tribe: "Luo",
        languages: ["English", "Swahili", "Dholuo"],
        avatar: "/images/male3.jpg",
        lastSeen: new Date(Date.now() - 30 * 60 * 1000),
        isOnline: true,
        compatibility: 93,
        status: "connected",
        // Personal Info
        race: "African",
        // Physical Appearance
        height: "5'10\"",
        weight: "75kg",
        bodyType: "Athletic",
        complexion: "Dark",
        eyeColor: "Brown",
        dimples: "No",
        teethFeatures: "Straight",
        tattoos: "No",
        piercings: "No",
        glasses: "No",
        selfDescriptionPhysical: "Athletic build with a warm smile",
        // Health
        hivStatus: "Negative",
        disability: "None",
        chronicIllness: "None",
        allergies: "None",
        bloodType: "O+",
        snoring: "Occasionally",
        // Work & Lifestyle
        employmentStatus: "Employed",
        workCountry: "Kenya",
        workCounty: "Kisumu",
        workConstituency: "Kisumu Central",
        workWard: "Kisumu Central",
        workState: "Kisumu",
        financialStability: "Stable",
        alcohol: "Occasionally",
        smoking: "No",
        dietaryPreference: "No restrictions",
        hasPets: "No",
        exerciseFrequency: "3-4 times per week",
        hobbies: "Reading, hiking, cooking",
        // Beliefs
        religion: "Christian",
        religiousness: 7,
        denomination: "Protestant",
        churchAttendance: "Regular",
        // Family
        maritalStatus: "Single",
        hasChildren: "No",
        numberOfChildren: 0,
        childrenAges: "N/A",
        childrenLiveWithUser: "N/A",
        wantsChildren: "Yes",
        acceptsPartnerWithKids: "Yes",
        // Preferences
        openToRelocate: "Yes",
        sexualOrientation: "Straight",
        relationshipTradition: "Traditional",
        longDistanceOk: "Yes",
        datingPerspective: "Serious",
        dealBreakers: "Dishonesty, lack of ambition",
        relationshipHopes: "Marriage and family",
        partnerPreferences: "Kind, ambitious, family-oriented",
        personalityType: "INTJ",
        dontContactIf: "Not interested in serious relationships",
        imperfections: "I'm not perfect, and I don't expect perfection",
        politicalViews: "Moderate",
        dateDifferentPolitics: "Yes",
        believesInMarriage: "Yes",
        // About Me
        bio: "Engineer from Kisumu with a passion for technology and community development.",
        selfDescription: "I'm a dedicated engineer who loves solving problems and building things that make a difference. When I'm not coding, you'll find me playing football or exploring new places. I believe in the power of community and am always looking for ways to give back."
      },
      {
        id: "2",
        userId: "faithwambui",
        name: "Faith Wambui",
        username: "faithwambui",
        age: 27,
        gender: "Female",
        dateOfBirth: "1997-06-18",
        occupation: "Banker",
        location: "Nairobi, Kenya",
        county: "Nairobi",
        country: "Kenya",
        tribe: "Kikuyu",
        languages: ["English", "Swahili", "Kikuyu"],
        avatar: "/images/female3.jpg",
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isOnline: false,
        compatibility: 89,
        status: "connected",
        // Personal Info
        race: "African",
        // Physical Appearance
        height: "5'6\"",
        weight: "60kg",
        bodyType: "Slim",
        complexion: "Medium",
        eyeColor: "Brown",
        dimples: "Yes",
        teethFeatures: "Straight",
        tattoos: "No",
        piercings: "Earrings only",
        glasses: "No",
        selfDescriptionPhysical: "Slim build with a bright smile and dimples",
        // Health
        hivStatus: "Negative",
        disability: "None",
        chronicIllness: "None",
        allergies: "None",
        bloodType: "A+",
        snoring: "No",
        // Work & Lifestyle
        employmentStatus: "Employed",
        workCountry: "Kenya",
        workCounty: "Nairobi",
        workConstituency: "Nairobi Central",
        workWard: "Nairobi Central",
        workState: "Nairobi",
        financialStability: "Stable",
        alcohol: "No",
        smoking: "No",
        dietaryPreference: "Vegetarian",
        hasPets: "Yes",
        exerciseFrequency: "2-3 times per week",
        hobbies: "Baking, yoga, reading novels",
        // Beliefs
        religion: "Christian",
        religiousness: 8,
        denomination: "Catholic",
        churchAttendance: "Regular",
        // Family
        maritalStatus: "Single",
        hasChildren: "No",
        numberOfChildren: 0,
        childrenAges: "N/A",
        childrenLiveWithUser: "N/A",
        wantsChildren: "Yes",
        acceptsPartnerWithKids: "Yes",
        // Preferences
        openToRelocate: "Within Kenya",
        sexualOrientation: "Straight",
        relationshipTradition: "Traditional",
        longDistanceOk: "No",
        datingPerspective: "Serious",
        dealBreakers: "Smoking, dishonesty",
        relationshipHopes: "Marriage and family",
        partnerPreferences: "Honest, family-oriented, ambitious",
        personalityType: "ENFJ",
        dontContactIf: "Not looking for serious relationships",
        imperfections: "I'm a work in progress, just like everyone else",
        politicalViews: "Conservative",
        dateDifferentPolitics: "Yes",
        believesInMarriage: "Yes",
        // About Me
        bio: "Banker in Nairobi with a love for cooking and reading.",
        selfDescription: "I'm a passionate banker who believes in financial literacy and helping others achieve their dreams. I love experimenting with new recipes and getting lost in good books. I value honesty, family, and building meaningful connections."
      },
      {
        id: "3",
        userId: "janetmwikali",
        name: "Janet Mwikali",
        username: "janetmwikali",
        age: 29,
        gender: "Female",
        dateOfBirth: "1995-04-12",
        occupation: "Teacher",
        location: "Machakos, Kenya",
        county: "Machakos",
        country: "Kenya",
        tribe: "Kamba",
        languages: ["English", "Swahili", "Kikamba"],
        avatar: "/images/female4.jpg",
        lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isOnline: false,
        compatibility: 91,
        status: "connected",
        // Personal Info
        race: "African",
        // Physical Appearance
        height: "5'7\"",
        weight: "65kg",
        bodyType: "Average",
        complexion: "Medium",
        eyeColor: "Brown",
        dimples: "No",
        teethFeatures: "Straight",
        tattoos: "No",
        piercings: "No",
        glasses: "Yes",
        selfDescriptionPhysical: "Average build with glasses and a warm smile",
        // Health
        hivStatus: "Negative",
        disability: "None",
        chronicIllness: "None",
        allergies: "Dust",
        bloodType: "B+",
        snoring: "No",
        // Work & Lifestyle
        employmentStatus: "Employed",
        workCountry: "Kenya",
        workCounty: "Machakos",
        workConstituency: "Machakos Town",
        workWard: "Machakos Town",
        workState: "Machakos",
        financialStability: "Stable",
        alcohol: "No",
        smoking: "No",
        dietaryPreference: "No restrictions",
        hasPets: "No",
        exerciseFrequency: "Daily walks",
        hobbies: "Singing, community service, reading",
        // Beliefs
        religion: "Christian",
        religiousness: 9,
        denomination: "Protestant",
        churchAttendance: "Regular",
        // Family
        maritalStatus: "Single",
        hasChildren: "No",
        numberOfChildren: 0,
        childrenAges: "N/A",
        childrenLiveWithUser: "N/A",
        wantsChildren: "Yes",
        acceptsPartnerWithKids: "Yes",
        // Preferences
        openToRelocate: "Within Kenya",
        sexualOrientation: "Straight",
        relationshipTradition: "Traditional",
        longDistanceOk: "No",
        datingPerspective: "Serious",
        dealBreakers: "Lack of values, dishonesty",
        relationshipHopes: "Marriage and family",
        partnerPreferences: "Values-driven, family-oriented, kind",
        personalityType: "INFJ",
        dontContactIf: "Not interested in serious relationships",
        imperfections: "I'm perfectly imperfect and embrace it",
        politicalViews: "Moderate",
        dateDifferentPolitics: "Yes",
        believesInMarriage: "Yes",
        // About Me
        bio: "Teacher from Machakos passionate about education and community service.",
        selfDescription: "I'm a dedicated teacher who believes in the power of education to transform lives. I love music and find joy in helping others through community service. I'm looking for someone who shares my values and commitment to making a positive impact."
      },
      {
        id: "4",
        userId: "petermwangi",
        name: "Peter Mwangi",
        username: "petermwangi",
        age: 44,
        gender: "Male",
        dateOfBirth: "1980-09-03",
        occupation: "Businessman",
        location: "Nakuru, Kenya",
        county: "Nakuru",
        country: "Kenya",
        tribe: "Kikuyu",
        languages: ["English", "Swahili", "Kikuyu"],
        avatar: "/images/male4.jpeg",
        lastSeen: new Date(Date.now() - 48 * 60 * 60 * 1000),
        isOnline: true,
        compatibility: 87,
        status: "connected",
        // Personal Info
        race: "African",
        // Physical Appearance
        height: "6'0\"",
        weight: "85kg",
        bodyType: "Athletic",
        complexion: "Medium",
        eyeColor: "Brown",
        dimples: "No",
        teethFeatures: "Straight",
        tattoos: "No",
        piercings: "No",
        glasses: "No",
        selfDescriptionPhysical: "Athletic build with a confident presence",
        // Health
        hivStatus: "Negative",
        disability: "None",
        chronicIllness: "None",
        allergies: "None",
        bloodType: "O+",
        snoring: "Occasionally",
        // Work & Lifestyle
        employmentStatus: "Self-employed",
        workCountry: "Kenya",
        workCounty: "Nakuru",
        workConstituency: "Nakuru Town East",
        workWard: "Nakuru Town East",
        workState: "Nakuru",
        financialStability: "Very stable",
        alcohol: "Occasionally",
        smoking: "No",
        dietaryPreference: "No restrictions",
        hasPets: "Yes",
        exerciseFrequency: "3 times per week",
        hobbies: "Golf, business networking, travel",
        // Beliefs
        religion: "Christian",
        religiousness: 6,
        denomination: "Protestant",
        churchAttendance: "Occasional",
        // Family
        maritalStatus: "Divorced",
        hasChildren: "Yes",
        numberOfChildren: 2,
        childrenAges: "12, 15",
        childrenLiveWithUser: "Part-time",
        wantsChildren: "Open to more",
        acceptsPartnerWithKids: "Yes",
        // Preferences
        openToRelocate: "No",
        sexualOrientation: "Straight",
        relationshipTradition: "Traditional",
        longDistanceOk: "No",
        datingPerspective: "Serious",
        dealBreakers: "Dishonesty, lack of ambition",
        relationshipHopes: "Companionship and partnership",
        partnerPreferences: "Independent, ambitious, family-oriented",
        personalityType: "ENTJ",
        dontContactIf: "Not interested in serious relationships",
        imperfections: "I'm human and embrace my flaws",
        politicalViews: "Conservative",
        dateDifferentPolitics: "Yes",
        believesInMarriage: "Yes",
        // About Me
        bio: "Businessman in Nakuru with a passion for golf and travel.",
        selfDescription: "I'm a successful businessman who values hard work and family. I enjoy golf and traveling to new places. I'm looking for someone who is independent, ambitious, and shares my values of family and success."
      },
      // International users
      {
        id: "5",
        userId: "emilysmith",
        name: "Emily Smith",
        username: "emilysmith",
        age: 31,
        gender: "Female",
        dateOfBirth: "1993-11-10",
        occupation: "Software Engineer",
        location: "London, UK",
        county: "Greater London",
        country: "UK",
        tribe: "N/A",
        languages: ["English", "French"],
        avatar: "/images/female5.jpg",
        lastSeen: new Date(Date.now() - 72 * 60 * 60 * 1000),
        isOnline: false,
        compatibility: 80,
        status: "connected",
        // Personal Info
        race: "Caucasian",
        // Physical Appearance
        height: "5'7\"",
        weight: "65kg",
        bodyType: "Slim",
        complexion: "Fair",
        eyeColor: "Blue",
        dimples: "No",
        teethFeatures: "Straight",
        tattoos: "No",
        piercings: "Earrings only",
        glasses: "No",
        selfDescriptionPhysical: "Slim build with blue eyes and a warm smile",
        // Health
        hivStatus: "Negative",
        disability: "None",
        chronicIllness: "None",
        allergies: "None",
        bloodType: "A+",
        snoring: "No",
        // Work & Lifestyle
        employmentStatus: "Employed",
        workCountry: "UK",
        workCounty: "Greater London",
        workConstituency: "N/A",
        workWard: "N/A",
        workState: "London",
        financialStability: "Stable",
        alcohol: "Occasionally",
        smoking: "No",
        dietaryPreference: "Vegetarian",
        hasPets: "Yes",
        exerciseFrequency: "Yoga and gym",
        hobbies: "Coding, yoga, exploring new cities",
        // Beliefs
        religion: "Agnostic",
        religiousness: 3,
        denomination: "N/A",
        churchAttendance: "Never",
        // Family
        maritalStatus: "Single",
        hasChildren: "No",
        numberOfChildren: 0,
        childrenAges: "N/A",
        childrenLiveWithUser: "N/A",
        wantsChildren: "Maybe",
        acceptsPartnerWithKids: "Yes",
        // Preferences
        openToRelocate: "Yes",
        sexualOrientation: "Straight",
        relationshipTradition: "Modern",
        longDistanceOk: "Yes",
        datingPerspective: "Casual to serious",
        dealBreakers: "Lack of ambition, closed-mindedness",
        relationshipHopes: "Partnership and growth",
        partnerPreferences: "Ambitious, open-minded, adventurous",
        personalityType: "INTJ",
        dontContactIf: "Not interested in relationships",
        imperfections: "I embrace my imperfections and quirks",
        politicalViews: "Liberal",
        dateDifferentPolitics: "Yes",
        believesInMarriage: "Maybe",
        // About Me
        bio: "Software engineer from London with a passion for technology and travel.",
        selfDescription: "I'm a tech enthusiast who loves solving complex problems and exploring new places. I value independence, growth, and meaningful connections. I'm looking for someone who shares my curiosity and passion for life."
      },
      {
        id: "6",
        userId: "rajpatel",
        name: "Raj Patel",
        username: "rajpatel",
        age: 36,
        gender: "Male",
        dateOfBirth: "1988-05-22",
        occupation: "Doctor",
        location: "Mumbai, India",
        county: "Maharashtra",
        country: "India",
        tribe: "N/A",
        languages: ["English", "Hindi", "Gujarati"],
        avatar: "/images/male2.jpg",
        lastSeen: new Date(Date.now() - 96 * 60 * 60 * 1000),
        isOnline: false,
        compatibility: 78,
        status: "connected",
        // Personal Info
        race: "Asian",
        // Physical Appearance
        height: "5'9\"",
        weight: "72kg",
        bodyType: "Average",
        complexion: "Medium",
        eyeColor: "Brown",
        dimples: "No",
        teethFeatures: "Straight",
        tattoos: "No",
        piercings: "No",
        glasses: "No",
        selfDescriptionPhysical: "Average build with a professional appearance",
        // Health
        hivStatus: "Negative",
        disability: "None",
        chronicIllness: "None",
        allergies: "None",
        bloodType: "B+",
        snoring: "Occasionally",
        // Work & Lifestyle
        employmentStatus: "Employed",
        workCountry: "India",
        workCounty: "Maharashtra",
        workConstituency: "Mumbai Central",
        workWard: "Mumbai Central",
        workState: "Maharashtra",
        financialStability: "Very stable",
        alcohol: "No",
        smoking: "No",
        dietaryPreference: "Vegetarian",
        hasPets: "No",
        exerciseFrequency: "3 times per week",
        hobbies: "Cricket, cooking, reading medical journals",
        // Beliefs
        religion: "Hindu",
        religiousness: 8,
        denomination: "N/A",
        churchAttendance: "Regular temple visits",
        // Family
        maritalStatus: "Single",
        hasChildren: "No",
        numberOfChildren: 0,
        childrenAges: "N/A",
        childrenLiveWithUser: "N/A",
        wantsChildren: "Yes",
        acceptsPartnerWithKids: "Yes",
        // Preferences
        openToRelocate: "Within India",
        sexualOrientation: "Straight",
        relationshipTradition: "Traditional",
        longDistanceOk: "No",
        datingPerspective: "Serious",
        dealBreakers: "Dishonesty, lack of family values",
        relationshipHopes: "Marriage and family",
        partnerPreferences: "Family-oriented, educated, kind",
        personalityType: "ISFJ",
        dontContactIf: "Not interested in serious relationships",
        imperfections: "I'm human and embrace my flaws",
        politicalViews: "Moderate",
        dateDifferentPolitics: "Yes",
        believesInMarriage: "Yes",
        // About Me
        bio: "Doctor from Mumbai with a passion for medicine and cricket.",
        selfDescription: "I'm a dedicated doctor who believes in serving others and maintaining strong family values. I love cricket and cooking traditional Indian dishes. I'm looking for someone who shares my values of family, education, and service to others."
      },
    ]
    setConnections(sampleConnections)
  }

  const handleUnfriend = (connectionId: string) => {
    setConnections(prev => 
      prev.filter(conn => conn.id !== connectionId)
    )
    
    toast({
      title: "Connection Removed",
      description: "The connection has been removed from your list.",
    })
  }

  const handleBlock = (connectionId: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: "blocked" as const }
          : conn
      )
    )
    
    toast({
      title: "User Blocked",
      description: "The user has been blocked successfully.",
    })
  }

  const handleUnblock = (connectionId: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: "connected" as const }
          : conn
      )
    )
    
    toast({
      title: "User Unblocked",
      description: "The user has been unblocked successfully.",
    })
  }

  const formatLastSeen = (date: Date): string => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.occupation.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "connected" ? connection.status === "connected" : connection.status === "blocked"
    return matchesSearch && matchesTab
  })

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
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Connections</h1>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {connections.length} connections
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Connections</h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {connections.length} connections
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger 
              value="connected" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white"
            >
              Connected
              <Badge className="ml-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                {connections.filter(c => c.status === "connected").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="blocked" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white"
            >
              Blocked
              <Badge className="ml-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                {connections.filter(c => c.status === "blocked").length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>

          <TabsContent value="connected" className="space-y-4">
            {filteredConnections.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Connections Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery ? "No connections match your search." : "You don't have any connections yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredConnections.map((connection) => (
                <Card key={connection.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Avatar className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
                        <AvatarImage src={connection.avatar} alt={connection.name} />
                        <AvatarFallback className="bg-[#B22222] text-white text-sm sm:text-lg">{connection.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
                              @{connection.username}, {connection.age}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm truncate">{connection.occupation}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{connection.location}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                              Connected
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(connection.lastSeen)}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <Button
                            onClick={() => router.push(`/messages?user=${connection.userId}`)}
                            size="sm"
                            className="bg-[#B22222] hover:bg-[#8B0000] text-white text-sm min-h-[44px]"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="min-h-[44px]">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => { setSelectedProfile(connection); setIsProfileModalOpen(true); }}>
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUnfriend(connection.id)}>
                                <UserX className="h-4 w-4 mr-2" />
                                Remove Connection
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleBlock(connection.id)}>
                                <UserX className="h-4 w-4 mr-2" />
                                Block User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="blocked" className="space-y-4">
            {filteredConnections.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Blocked Users
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery ? "No blocked users match your search." : "You haven't blocked any users."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredConnections.map((connection) => (
                <Card key={connection.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={connection.avatar} alt={connection.name} />
                          <AvatarFallback className="bg-[#B22222] text-white">
                            {connection.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              @{connection.username}, {connection.age}
                            </h3>
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              Blocked
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {connection.occupation} • {connection.location}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Blocked on {connection.lastSeen.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleUnblock(connection.id)}
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
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
      <ProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} profile={selectedProfile} />
    </div>
  )
} 