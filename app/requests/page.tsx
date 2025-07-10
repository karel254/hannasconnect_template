"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, X, User, Clock, Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "../../hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import ProfileModal from "@/components/ProfileModal";

interface ConnectionRequest {
  id: string
  userId: string
  name: string
  age: number
  occupation: string
  location: string
  avatar: string
  message?: string
  timestamp: Date
  status: "pending" | "accepted" | "rejected" | "sent"
  compatibility: number
  dateOfBirth?: string // Added for mock data
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

export default function RequestsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [requests, setRequests] = useState<ConnectionRequest[]>([])
  const [activeTab, setActiveTab] = useState("pending")
  // Add state for modal open/close and selected profile
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ConnectionRequest | null>(null);
  // 1. Add a sentRequests state to track sent connection requests if not already present
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
    
    // Load sample requests
    loadRequests()
    // Load sent requests from localStorage
    const sent = localStorage.getItem('sentRequests');
    if (sent) {
      try {
        const sentParsed = JSON.parse(sent).map((r: any) => ({ ...r, timestamp: new Date(r.timestamp) }));
        setRequests(prev => [...prev, ...sentParsed]);
      } catch {}
    }
  }, [router])

  const loadRequests = () => {
    // Sample connection requests data
    const sampleRequests: ConnectionRequest[] = [
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
        message: "I would love to connect and know you better",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "pending",
        compatibility: 93,
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
        message: "I would love to connect and know you better",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        status: "pending",
        compatibility: 89,
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
        message: "I would love to connect and know you better",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: "accepted",
        compatibility: 91,
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
        message: "I would love to connect and know you better",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: "rejected",
        compatibility: 87,
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
      // Other Kenyans
      {
        id: "5",
        userId: "akinyi254",
        name: "Akinyi",
        username: "akinyi254",
        age: 28,
        gender: "Female",
        dateOfBirth: "1996-03-15",
        occupation: "Graphic Designer",
        location: "Nairobi, Kenya",
        county: "Nairobi",
        country: "Kenya",
        tribe: "Luo",
        languages: ["English", "Swahili", "Dholuo"],
        avatar: "/images/female1.jpg",
        message: "I would love to connect and know you better",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: "pending",
        compatibility: 92,
        // Personal Info
        race: "African",
        // Physical Appearance
        height: "5'8\"",
        weight: "62kg",
        bodyType: "Slim",
        complexion: "Dark",
        eyeColor: "Brown",
        dimples: "Yes",
        teethFeatures: "Straight",
        tattoos: "Small one on wrist",
        piercings: "Earrings only",
        glasses: "No",
        selfDescriptionPhysical: "Slim build with artistic flair and a creative spirit",
        // Health
        hivStatus: "Negative",
        disability: "None",
        chronicIllness: "None",
        allergies: "None",
        bloodType: "A+",
        snoring: "No",
        // Work & Lifestyle
        employmentStatus: "Self-employed",
        workCountry: "Kenya",
        workCounty: "Nairobi",
        workConstituency: "Nairobi Central",
        workWard: "Nairobi Central",
        workState: "Nairobi",
        financialStability: "Stable",
        alcohol: "Occasionally",
        smoking: "No",
        dietaryPreference: "No restrictions",
        hasPets: "Yes",
        exerciseFrequency: "Yoga and walking",
        hobbies: "Painting, photography, exploring new places",
        // Beliefs
        religion: "Christian",
        religiousness: 5,
        denomination: "Protestant",
        churchAttendance: "Occasional",
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
        relationshipTradition: "Modern",
        longDistanceOk: "Yes",
        datingPerspective: "Serious",
        dealBreakers: "Lack of creativity, closed-mindedness",
        relationshipHopes: "Partnership and growth",
        partnerPreferences: "Creative, open-minded, adventurous",
        personalityType: "ENFP",
        dontContactIf: "Not interested in serious relationships",
        imperfections: "I embrace my quirks and imperfections",
        politicalViews: "Liberal",
        dateDifferentPolitics: "Yes",
        believesInMarriage: "Yes",
        // About Me
        bio: "Creative designer from Nairobi with a passion for art and travel.",
        selfDescription: "I'm a creative soul who finds beauty in everything around me. I love expressing myself through art and capturing moments through photography. I'm looking for someone who appreciates creativity and shares my love for adventure and growth."
      },
      // International users
      {
        id: "6",
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
        message: "I would love to connect and know you better",
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        status: "pending",
        compatibility: 80,
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
        id: "7",
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
        message: "I would love to connect and know you better",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: "pending",
        compatibility: 78,
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
    setRequests(sampleRequests)
  }

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "accepted" as const }
          : req
      )
    )
    
    toast({
      title: "Request Accepted!",
      description: "You can now start chatting with this person.",
    })
  }

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "rejected" as const }
          : req
      )
    )
    
    toast({
      title: "Request Rejected",
      description: "The request has been declined.",
    })
  }

  const formatTime = (date: Date): string => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  // Update filteredRequests logic for accepted and rejected to include both sent and received
  const filteredRequests = requests.filter(request => {
    if (activeTab === "pending") return request.status === "pending"
    if (activeTab === "accepted") return request.status === "accepted"
    if (activeTab === "rejected") return request.status === "rejected"
    if (activeTab === "sent") return request.status === "sent"
    return true
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
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Connection Requests</h1>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {requests.filter(r => r.status === "pending").length} pending
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Connection Requests</h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {requests.filter(r => r.status === "pending").length} pending requests
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger 
              value="pending" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white text-xs sm:text-sm"
            >
              Pending
              <Badge className="ml-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                {requests.filter(r => r.status === "pending").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="accepted" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white text-xs sm:text-sm"
            >
              Accepted
            </TabsTrigger>
            <TabsTrigger 
              value="sent" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white text-xs sm:text-sm"
            >
              Sent
              <Badge className="ml-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                {requests.filter(r => r.status === "sent").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="rejected" 
              className="data-[state=active]:bg-[#B22222] data-[state=active]:text-white text-xs sm:text-sm"
            >
              Rejected
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {filteredRequests.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Pending Requests
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    You don't have any pending connection requests at the moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((request) => (
                <Card key={request.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback className="bg-[#B22222] text-white">
                          {request.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {request.name}, {request.age || calculateAge(request.dateOfBirth)}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {request.occupation} • {request.location}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {request.compatibility}% Match
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(request.timestamp)}
                            </div>
                          </div>
                        </div>
                        
                        {request.message && (
                          <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                            "{request.message}"
                          </p>
                        )}
                        
                        <div className="flex space-x-3">
                          <Button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white min-h-[44px]"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleRejectRequest(request.id)}
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 min-h-[44px]"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {filteredRequests.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Accepted Requests
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    You haven't accepted any connection requests yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((request) => (
                <Card key={request.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback className="bg-[#B22222] text-white">
                          {request.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {request.name}, {request.age || calculateAge(request.dateOfBirth)}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {request.occupation} • {request.location}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Connected
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(request.timestamp)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-nowrap gap-3 mt-2">
                          <Button
                            className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white min-h-[44px]"
                            disabled={sentRequests.has(request.userId) && request.status !== 'accepted'}
                            onClick={() => {
                              if (!sentRequests.has(request.userId) && request.status !== 'accepted') {
                                setSentRequests(prev => new Set(prev).add(request.userId));
                                // Simulate sending request
                              }
                              if (request.status === 'accepted') {
                                router.push(`/messages?user=${request.userId}`)
                              }
                            }}
                          >
                            {request.status === 'accepted' ? 'Chat' : sentRequests.has(request.userId) ? 'Sent' : 'Connect'}
                          </Button>
                          <Button
                            onClick={() => { setSelectedProfile(request); setIsProfileModalOpen(true); }}
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 min-h-[44px]"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            {filteredRequests.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Sent Requests</h3>
                  <p className="text-gray-500 dark:text-gray-400">You haven't sent any connection requests yet.</p>
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((request) => (
                <Card key={request.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback className="bg-[#B22222] text-white">{request.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{request.name}, {request.age || calculateAge(request.dateOfBirth)}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{request.occupation} • {request.location}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Sent</Badge>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(request.timestamp)}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 italic">Request sent. Waiting for response.</p>
                        <Button
                          variant="outline"
                          className="mt-2 border-red-300 text-red-700 hover:bg-red-50"
                          onClick={() => {
                            setRequests(prev => {
                              const updated = prev.filter(r => r.id !== request.id);
                              // Also update localStorage
                              const sent = localStorage.getItem('sentRequests');
                              if (sent) {
                                try {
                                  const sentParsed = JSON.parse(sent).filter((r: any) => r.id !== request.id);
                                  localStorage.setItem('sentRequests', JSON.stringify(sentParsed));
                                } catch {}
                              }
                              return updated;
                            });
                            toast({
                              title: "Request undone",
                              description: `Your connection request to ${request.name} has been cancelled.`,
                            });
                          }}
                        >
                          Undo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {filteredRequests.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <X className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Rejected Requests
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    You haven't rejected any connection requests.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((request) => (
                <Card key={request.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback className="bg-[#B22222] text-white">
                          {request.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {request.name}, {request.age || calculateAge(request.dateOfBirth)}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {request.occupation} • {request.location}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              Rejected
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(request.timestamp)}
                            </div>
                          </div>
                        </div>
                        
                        {request.message && (
                          <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                            "{request.message}"
                          </p>
                        )}
                      </div>
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