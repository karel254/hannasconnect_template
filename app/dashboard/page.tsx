// =========================
// BACKEND MIGRATION NOTES
// =========================
// This file currently uses mock data and localStorage for user suggestions, stats, and current user info.
// All data fetching, filtering, and compatibility logic is done on the frontend.
//
// For backend migration:
// - Replace all mock user/profile data (suggestions, stats, etc.) with API calls to the backend.
// - Replace localStorage usage for current user with secure authentication/session management.
// - Filtering, pagination, and compatibility calculation should be moved to the backend for scalability.
// - If using websockets for real-time updates (e.g., new matches, live stats), add websocket hooks here.
// - All UI/UX must remain unchanged.
// - See README.md for more details and API contract.
// =========================
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, MessageCircle, Users, TrendingUp, Clock, User, Calendar, ArrowRight, BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import ProfileModal from "@/components/ProfileModal";
import { calculateCompatibility } from "@/lib/compatibility";

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

// Helper to calculate age from date of birth string (YYYY-MM-DD)
function calculateAge(dateOfBirth) {
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

// Helper to get the current username
function getCurrentUsername(user) {
  return (
    user?.username ||
    (typeof window !== 'undefined' ? localStorage.getItem('userUsername') : null) ||
    'User'
  );
}

export default function Dashboard() {
  const router = useRouter()
  const { toast } = useToast();
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

  // MOCK: current user is loaded from localStorage. Replace with real auth/session.
  const currentUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("demoUser") || '{}') : {};

  // People you might be interested in
  // MOCK DATA: suggestions and stats are placeholders. Replace with API calls to fetch real user data from backend.
  const suggestions = [
    // Kenyan users
    {
      id: 1,
      name: "Brian Otieno",
      username: "brianotieno",
      age: 34,
      dateOfBirth: "1990-02-10",
      gender: "Male",
      occupation: "Engineer",
      location: "Kisumu, Kenya",
      county: "Kisumu",
      country: "Kenya",
      tribe: "Luo",
      languages: ["English", "Swahili", "Dholuo"],
      interests: ["Technology", "Football", "Travel"],
      avatar: "/images/male3.jpg",
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
      selfDescription: "I'm a dedicated engineer who loves solving problems and building things that make a difference. When I'm not coding, you'll find me playing football or exploring new places. I believe in the power of community and am always looking for ways to give back.",
      relationshipGoals: "To find a long-term partner who shares my passion for technology and community development.",
      pets: "No pets, but I love animals and would consider adopting a dog if my partner is open to it."
    },
    {
      id: 2,
      name: "Faith Wambui",
      username: "faithwambui",
      age: 27,
      dateOfBirth: "1997-06-18",
      gender: "Female",
      occupation: "Banker",
      location: "Nairobi, Kenya",
      county: "Nairobi",
      country: "Kenya",
      tribe: "Kikuyu",
      languages: ["English", "Swahili", "Kikuyu"],
      interests: ["Finance", "Cooking", "Reading"],
      avatar: "/images/female3.jpg",
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
      selfDescription: "I'm a passionate banker who believes in financial literacy and helping others achieve their dreams. I love experimenting with new recipes and getting lost in good books. I value honesty, family, and building meaningful connections.",
      relationshipGoals: "To find a partner who shares my love for cooking and reading, and who is ambitious and family-oriented.",
      pets: "Yes, I have a cat named Whiskers. I love animals and would consider adopting more if my partner is open to it."
    },
    {
      id: 3,
      name: "Janet Mwikali",
      username: "janetmwikali",
      age: 29,
      dateOfBirth: "1995-04-12",
      gender: "Female",
      occupation: "Teacher",
      location: "Machakos, Kenya",
      county: "Machakos",
      country: "Kenya",
      tribe: "Kamba",
      languages: ["English", "Swahili", "Kikamba"],
      interests: ["Education", "Music", "Volunteering"],
      avatar: "/images/female4.jpg",
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
      selfDescription: "I'm a dedicated teacher who believes in the power of education to transform lives. I love music and find joy in helping others through community service. I'm looking for someone who shares my values and commitment to making a positive impact.",
      relationshipGoals: "To find a partner who shares my passion for education and community service, and who is ambitious and family-oriented.",
      pets: "No pets, but I love animals and would consider adopting a dog if my partner is open to it."
    },
    {
      id: 4,
      name: "Peter Mwangi",
      username: "petermwangi",
      age: 44,
      dateOfBirth: "1980-09-03",
      gender: "Male",
      occupation: "Businessman",
      location: "Nakuru, Kenya",
      county: "Nakuru",
      country: "Kenya",
      tribe: "Kikuyu",
      languages: ["English", "Swahili", "Kikuyu"],
      interests: ["Business", "Golf", "Travel"],
      avatar: "/images/male4.jpeg",
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
      selfDescription: "I'm a successful businessman who values hard work and family. I enjoy golf and traveling to new places. I'm looking for someone who is independent, ambitious, and shares my values of family and success.",
      relationshipGoals: "To find a partner who is independent, ambitious, and shares my values of family and success.",
      pets: "No pets, but I love animals and would consider adopting a dog if my partner is open to it."
    },
    // Other Kenyans
    {
      id: 5,
      name: "Akinyi",
      username: "akinyi254",
      age: 28,
      dateOfBirth: "1996-03-15",
      gender: "Female",
      occupation: "Graphic Designer",
      location: "Nairobi, Kenya",
      county: "Nairobi",
      country: "Kenya",
      tribe: "Luo",
      languages: ["English", "Swahili", "Dholuo"],
      interests: ["Art", "Travel", "Photography"],
      avatar: "/images/female1.jpg",
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
      selfDescription: "I'm a creative soul who finds beauty in everything around me. I love expressing myself through art and capturing moments through photography. I'm looking for someone who appreciates creativity and shares my love for adventure and growth.",
      relationshipGoals: "To find a partner who shares my passion for art and travel, and who is adventurous and open-minded.",
      pets: "No pets, but I love animals and would consider adopting a dog if my partner is open to it."
    },
    {
      id: 6,
      name: "Kiptoo",
      username: "kiptoo",
      age: 26,
      dateOfBirth: "1998-07-22",
      gender: "Male",
      occupation: "Marketing Manager",
      location: "Eldoret, Kenya",
      county: "Uasin Gishu",
      country: "Kenya",
      tribe: "Kalenjin",
      languages: ["English", "Swahili", "Kalenjin"],
      interests: ["Fitness", "Cooking", "Music"],
      avatar: "/images/male1.jpg",
      compatibility: 88,
      // Personal Info
      race: "African",
      // Physical Appearance
      height: "5'11\"",
      weight: "78kg",
      bodyType: "Athletic",
      complexion: "Dark",
      eyeColor: "Brown",
      dimples: "No",
      teethFeatures: "Straight",
      tattoos: "No",
      piercings: "No",
      glasses: "No",
      selfDescriptionPhysical: "Athletic build with a friendly smile",
      // Health
      hivStatus: "Negative",
      disability: "None",
      chronicIllness: "None",
      allergies: "None",
      bloodType: "O+",
      snoring: "No",
      // Work & Lifestyle
      employmentStatus: "Employed",
      workCountry: "Kenya",
      workCounty: "Uasin Gishu",
      workConstituency: "Eldoret North",
      workWard: "Eldoret North",
      workState: "Uasin Gishu",
      financialStability: "Stable",
      alcohol: "Occasionally",
      smoking: "No",
      dietaryPreference: "No restrictions",
      hasPets: "No",
      exerciseFrequency: "Daily",
      hobbies: "Running, cooking, playing guitar",
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
      openToRelocate: "Within Kenya",
      sexualOrientation: "Straight",
      relationshipTradition: "Traditional",
      longDistanceOk: "No",
      datingPerspective: "Serious",
      dealBreakers: "Lack of ambition, dishonesty",
      relationshipHopes: "Marriage and family",
      partnerPreferences: "Ambitious, family-oriented, active",
      personalityType: "ESTJ",
      dontContactIf: "Not interested in serious relationships",
      imperfections: "I'm perfectly imperfect and proud of it",
      politicalViews: "Moderate",
      dateDifferentPolitics: "Yes",
      believesInMarriage: "Yes",
      // About Me
      bio: "Marketing manager in Eldoret with a passion for fitness and cooking.",
      selfDescription: "I'm a driven marketing professional who loves staying active and creating delicious meals. I believe in hard work, family values, and building meaningful relationships. I'm looking for someone who shares my passion for life and commitment to growth.",
      relationshipGoals: "To find a partner who shares my passion for fitness and cooking, and who is ambitious and family-oriented.",
      pets: "No pets, but I love animals and would consider adopting a dog if my partner is open to it."
    },
    // International users
    {
      id: 7,
      name: "Emily Smith",
      username: "emilysmith",
      age: 31,
      dateOfBirth: "1993-11-10",
      gender: "Female",
      occupation: "Software Engineer",
      location: "London, UK",
      county: "Greater London",
      country: "UK",
      tribe: "N/A",
      languages: ["English", "French"],
      interests: ["Tech", "Travel", "Yoga"],
      avatar: "/images/female5.jpg",
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
      selfDescription: "I'm a tech enthusiast who loves solving complex problems and exploring new places. I value independence, growth, and meaningful connections. I'm looking for someone who shares my curiosity and passion for life.",
      relationshipGoals: "To find a partner who shares my passion for technology and travel, and who is ambitious and open-minded.",
      pets: "No pets, but I love animals and would consider adopting a dog if my partner is open to it."
    },
    {
      id: 8,
      name: "Raj Patel",
      username: "rajpatel",
      age: 36,
      dateOfBirth: "1988-05-22",
      gender: "Male",
      occupation: "Doctor",
      location: "Mumbai, India",
      county: "Maharashtra",
      country: "India",
      tribe: "N/A",
      languages: ["English", "Hindi", "Gujarati"],
      interests: ["Medicine", "Cricket", "Cooking"],
      avatar: "/images/male2.jpg",
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
      selfDescription: "I'm a dedicated doctor who believes in serving others and maintaining strong family values. I love cricket and cooking traditional Indian dishes. I'm looking for someone who shares my values of family, education, and service to others.",
      relationshipGoals: "To find a partner who shares my passion for medicine and cricket, and who is family-oriented and educated.",
      pets: "No pets, but I love animals and would consider adopting a dog if my partner is open to it."
    },
    {
      id: 9,
      name: "Jessica Brown",
      username: "jessicabrown",
      age: 29,
      dateOfBirth: "1995-08-30",
      gender: "Female",
      occupation: "Artist",
      location: "New York, USA",
      county: "New York",
      country: "USA",
      tribe: "N/A",
      languages: ["English", "Spanish"],
      interests: ["Art", "Music", "Travel"],
      avatar: "/images/female6.jpg",
      compatibility: 77,
      // Personal Info
      race: "Caucasian",
      // Physical Appearance
      height: "5'6\"",
      weight: "58kg",
      bodyType: "Slim",
      complexion: "Fair",
      eyeColor: "Green",
      dimples: "Yes",
      teethFeatures: "Straight",
      tattoos: "Several artistic pieces",
      piercings: "Multiple ear piercings",
      glasses: "No",
      selfDescriptionPhysical: "Slim build with artistic tattoos and a creative spirit",
      // Health
      hivStatus: "Negative",
      disability: "None",
      chronicIllness: "None",
      allergies: "None",
      bloodType: "O+",
      snoring: "No",
      // Work & Lifestyle
      employmentStatus: "Self-employed",
      workCountry: "USA",
      workCounty: "New York",
      workConstituency: "N/A",
      workWard: "N/A",
      workState: "New York",
      financialStability: "Stable",
      alcohol: "Occasionally",
      smoking: "No",
      dietaryPreference: "Vegan",
      hasPets: "Yes",
      exerciseFrequency: "Yoga and dancing",
      hobbies: "Painting, playing guitar, exploring galleries",
      // Beliefs
      religion: "Spiritual",
      religiousness: 4,
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
      dealBreakers: "Lack of creativity, closed-mindedness",
      relationshipHopes: "Partnership and growth",
      partnerPreferences: "Creative, open-minded, adventurous",
      personalityType: "ENFP",
      dontContactIf: "Not interested in relationships",
      imperfections: "I celebrate my imperfections and quirks",
      politicalViews: "Liberal",
      dateDifferentPolitics: "Yes",
      believesInMarriage: "Maybe",
      // About Me
      bio: "Artist in New York with a passion for creativity and self-expression.",
      selfDescription: "I'm a free-spirited artist who finds beauty in everything around me. I love expressing myself through various art forms and connecting with people who appreciate creativity. I'm looking for someone who shares my passion for art and life.",
      relationshipGoals: "To find a partner who shares my passion for creativity and self-expression, and who is adventurous and open-minded.",
      pets: "No pets, but I love animals and would consider adopting a dog if my partner is open to it."
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
  // 1. Add a sentRequests state to track sent connection requests
  const [sentRequests, setSentRequests] = useState<Set<number>>(new Set());

  const handleConnect = (user: any) => {
    if (connectedUsers.has(user.id)) {
      router.push(`/messages?user=${encodeURIComponent(JSON.stringify({ id: user.id, name: user.name, icon: user.avatar, age: user.age, occupation: user.occupation }))}`)
    } else if (!sentRequests.has(user.id)) {
      setSentRequests(prev => new Set(prev).add(user.id));
      toast({
        title: "Connection request sent!",
        description: `Your request to connect with ${user.name} has been sent.`,
        action: (
          <ToastAction altText="Undo" onClick={() => {
            setSentRequests(prev => {
              const updated = new Set(prev);
              updated.delete(user.id);
              return updated;
            });
          }}>Undo</ToastAction>
        ),
      });
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
      {/* Mobile Header - No Back Navigation */}
      <div className="md:hidden bg-[#B22222] text-white border-b border-[#B22222] px-4 py-3">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-xl font-bold text-white">Welcome back, {getCurrentUsername(user)}!</h1>
          <span className="text-xs text-white/90 font-normal">Ready to make new connections today?</span>
        </div>
      </div>

      {/* Desktop Header - No Back Navigation */}
      <div className="hidden md:block bg-[#B22222] text-white border-b border-[#B22222] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-2xl font-bold text-white">Welcome back, {getCurrentUsername(user)}!</h1>
            <span className="text-sm text-white/90 font-normal">Ready to make new connections today?</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {suggestions.slice(0, 6).map((person) => (
                <Card
                  key={person.id}
                  className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                  onClick={() => { setSelectedProfile(person); setIsProfileModalOpen(true); }}
                >
                  <CardHeader className="p-3 sm:p-4 pb-2">
                    <div className="relative flex flex-col items-center">
                      <Avatar className="h-14 w-14 sm:h-16 sm:w-16 mb-2 ring-2 ring-white dark:ring-gray-600">
                        <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                        <AvatarFallback className="bg-[#B22222] text-white text-xs sm:text-sm">{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span
                        className="absolute top-0 right-0 p-0 m-0 bg-transparent shadow-none pointer-events-none"
                        style={{ width: '1.5rem', height: '1.5rem' }}
                        aria-hidden="true"
                      >
                        <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                      </span>
                    </div>
                    <div className="text-center space-y-1 mt-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm truncate">
                        {person.name}, {person.age}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs truncate">{person.occupation}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{person.location}</p>
                    </div>
                  </CardHeader>
                  <CardFooter className="p-3 sm:p-4 pt-0">
                    <div className="flex space-x-2 w-full">
                      <Button
                        size="sm"
                        className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl h-8 text-xs min-h-[36px] max-w-[50%]"
                        onClick={(e) => { e.stopPropagation(); handleConnect(person); }}
                        disabled={sentRequests.has(person.id) && !connectedUsers.has(person.id)}
                      >
                        {connectedUsers.has(person.id) ? "Chat" : sentRequests.has(person.id) ? "Sent" : "Connect"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl h-8 text-xs min-h-[36px] bg-transparent max-w-[50%]"
                        onClick={(e) => { e.stopPropagation(); setSelectedProfile(person); setIsProfileModalOpen(true); }}
                      >
                        View
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
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
            <div className="flex flex-col gap-6">
              {blogPosts.slice(0, 6).map((post) => (
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
                    <Button size="sm" className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl text-xs min-h-[44px]" onClick={() => setExpandedBlogId(expandedBlogId === post.id ? null : post.id)}>
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

      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        {/* Replace old modal with shared ProfileModal */}
        <ProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} profile={selectedProfile} />
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
