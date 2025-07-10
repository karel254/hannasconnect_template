"use client"

import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, Heart, ChevronLeft, ChevronRight, Loader2, MessageCircle, User, Calendar, Info, Settings, Heart as HeartIcon, Users, MessagePlus, UserPlus, Search, ArrowLeft } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProfileModal from "@/components/ProfileModal";

// Extended sample user data for pagination
const baseUsers = [
  // Kenyan users
  {
    id: 1,
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
    interests: ["Technology", "Football", "Travel"],
    bio: "Engineer from Kisumu.",
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
    selfDescription: "I'm a dedicated engineer who loves solving problems and building things that make a difference. When I'm not coding, you'll find me playing football or exploring new places. I believe in the power of community and am always looking for ways to give back."
  },
  {
    id: 2,
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
    interests: ["Finance", "Cooking", "Reading"],
    bio: "Banker in Nairobi.",
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
    selfDescription: "I'm a passionate banker who believes in financial literacy and helping others achieve their dreams. I love experimenting with new recipes and getting lost in good books. I value honesty, family, and building meaningful connections."
  },
  {
    id: 3,
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
    interests: ["Education", "Music", "Volunteering"],
    bio: "Teacher from Machakos.",
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
    selfDescription: "I'm a dedicated teacher who believes in the power of education to transform lives. I love music and find joy in helping others through community service. I'm looking for someone who shares my values and commitment to making a positive impact."
  },
  {
    id: 4,
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
    interests: ["Business", "Golf", "Travel"],
    bio: "Businessman in Nakuru.",
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
    selfDescription: "I'm a successful businessman who values hard work and family. I enjoy golf and traveling to new places. I'm looking for someone who is independent, ambitious, and shares my values of family and success."
  },
  // Other Kenyans
  {
    id: 5,
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
    interests: ["Art", "Travel", "Photography"],
    bio: "Creative designer from Nairobi.",
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
    selfDescription: "I'm a creative soul who finds beauty in everything around me. I love expressing myself through art and capturing moments through photography. I'm looking for someone who appreciates creativity and shares my love for adventure and growth."
  },
  {
    id: 6,
    name: "Kiptoo",
    username: "kiptoo",
    age: 26,
    gender: "Male",
    dateOfBirth: "1998-07-22",
    occupation: "Marketing Manager",
    location: "Eldoret, Kenya",
    county: "Uasin Gishu",
    country: "Kenya",
    tribe: "Kalenjin",
    languages: ["English", "Swahili", "Kalenjin"],
    avatar: "/images/male1.jpg",
    interests: ["Fitness", "Cooking", "Music"],
    bio: "Marketing manager in Eldoret.",
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
    selfDescription: "I'm a driven marketing professional who loves staying active and creating delicious meals. I believe in hard work, family values, and building meaningful relationships. I'm looking for someone who shares my passion for life and commitment to growth."
  },
  // International users
  {
    id: 7,
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
    interests: ["Tech", "Travel", "Yoga"],
    bio: "Engineer from London.",
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
    selfDescription: "I'm a tech enthusiast who loves solving complex problems and exploring new places. I value independence, growth, and meaningful connections. I'm looking for someone who shares my curiosity and passion for life."
  },
  {
    id: 8,
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
    interests: ["Medicine", "Cricket", "Cooking"],
    bio: "Doctor from Mumbai.",
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
    selfDescription: "I'm a dedicated doctor who believes in serving others and maintaining strong family values. I love cricket and cooking traditional Indian dishes. I'm looking for someone who shares my values of family, education, and service to others."
  },
  {
    id: 9,
    name: "Jessica Brown",
    username: "jessicabrown",
    age: 29,
    gender: "Female",
    dateOfBirth: "1995-08-30",
    occupation: "Artist",
    location: "New York, USA",
    county: "New York",
    country: "USA",
    tribe: "N/A",
    languages: ["English", "Spanish"],
    avatar: "/images/female6.jpg",
    interests: ["Art", "Music", "Travel"],
    bio: "Artist in New York.",
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
    selfDescription: "I'm a free-spirited artist who finds beauty in everything around me. I love expressing myself through various art forms and connecting with people who appreciate creativity. I'm looking for someone who shares my passion for art and life."
  },
];

const USERS_PER_PAGE = 6 // Show 2x3 grid per page

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

// Generate users for pagination (mix of Kenyans and international, prioritizing Kenyans)
function generateUsers() {
  const users = [];
  const kenyanUsers = baseUsers.slice(0, 6); // First 6 are Kenyans
  const internationalUsers = baseUsers.slice(6); // Last 3 are international
  
  for (let i = 0; i < 60; i++) {
    // 70% chance of Kenyan user, 30% chance of international user
    const isKenyan = Math.random() < 0.7;
    
    if (isKenyan) {
      const baseUser = kenyanUsers[i % kenyanUsers.length];
      users.push({
        ...baseUser,
        id: i + 1,
        name: `${baseUser.name.split(" ")[0]} ${String.fromCharCode(65 + (i % 26))}${baseUser.name.split(" ")[1]}`,
        age: baseUser.age + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3),
        gender: baseUser.gender,
        avatar: baseUser.avatar,
        country: "Kenya",
        county: baseUser.county,
        location: baseUser.location,
      });
    } else {
      const baseUser = internationalUsers[i % internationalUsers.length];
      users.push({
        ...baseUser,
        id: i + 1,
        name: baseUser.name,
        age: baseUser.age + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3),
        gender: baseUser.gender,
        avatar: baseUser.avatar,
        country: baseUser.location.split(", ")[1] || "Unknown",
        county: baseUser.county,
        location: baseUser.location,
      });
    }
  }
  return users;
}

export default function Browse() {
  const router = useRouter()
  const { toast } = useToast();
  const [allUsers] = useState(generateUsers())
  const [currentPage, setCurrentPage] = useState(1)
  const [ageRange, setAgeRange] = useState([25, 45])
  const [selectedGoals, setSelectedGoals] = useState<string>("any")
  const [isLoading, setIsLoading] = useState(false)
  const [likedUsers, setLikedUsers] = useState<Set<number>>(new Set())
  // Find the state for modal open/close and selected profile
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  // Simulate connection status (replace with real logic)
  const [connectedUsers, setConnectedUsers] = useState<Set<number>>(new Set([2, 4]))
  // Add a new state for sent requests
  const [sentRequests, setSentRequests] = useState<Set<number>>(new Set());

  // Add member type filter state
  const [memberType, setMemberType] = useState<"all" | "local" | "diaspora">("all")

  // 1. Add state for all new filters at the top of the Browse component
  const [selectedGender, setSelectedGender] = useState<string>("any");
  const [selectedRace, setSelectedRace] = useState<string>("any");
  const [selectedCountry, setSelectedCountry] = useState<string>("any");
  const [selectedCounty, setSelectedCounty] = useState<string>("any");
  const [selectedTribe, setSelectedTribe] = useState<string>("any");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedReligion, setSelectedReligion] = useState<string>("any");
  const [selectedDenomination, setSelectedDenomination] = useState<string>("any");
  const [selectedReligiousness, setSelectedReligiousness] = useState<number>(0);
  const [selectedChurchAttendance, setSelectedChurchAttendance] = useState<string>("any");
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<string>("any");
  const [selectedHasChildren, setSelectedHasChildren] = useState<string>("any");
  const [selectedWantsChildren, setSelectedWantsChildren] = useState<string>("any");
  const [selectedAcceptsPartnerWithKids, setSelectedAcceptsPartnerWithKids] = useState<string>("any");
  const [selectedSmoking, setSelectedSmoking] = useState<string>("any");
  const [selectedAlcohol, setSelectedAlcohol] = useState<string>("any");
  const [selectedDietaryPreference, setSelectedDietaryPreference] = useState<string>("any");
  const [selectedPets, setSelectedPets] = useState<string>("any");
  const [selectedSnoring, setSelectedSnoring] = useState<string>("any");
  const [selectedOpenToRelocate, setSelectedOpenToRelocate] = useState<string>("any");
  const [selectedSexualOrientation, setSelectedSexualOrientation] = useState<string>("any");
  const [selectedRelationshipTradition, setSelectedRelationshipTradition] = useState<string>("any");

  // Get user's country from localStorage or default to Kenya
  const userCountry = localStorage.getItem("userCountry") || "Kenya"

  // Filter users based on criteria
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      // Member type filter
      if (memberType === "local" && user.country !== "Kenya") return false;
      if (memberType === "diaspora" && user.country === "Kenya") return false;
      
      // Age Range
      if (user.age < ageRange[0] || user.age > ageRange[1]) return false;
      // Relationship Goals
      if (selectedGoals !== "any" && user.relationshipGoals !== selectedGoals) return false;
      // Gender
      if (selectedGender !== "any" && user.gender !== selectedGender) return false;
      // Race
      if (selectedRace !== "any" && user.race !== selectedRace) return false;
      // Country
      if (selectedCountry && selectedCountry !== "any" && user.country !== selectedCountry) return false;
      // County
      if (selectedCounty && selectedCounty !== "any" && user.county !== selectedCounty) return false;
      // Tribe
      if (selectedTribe && selectedTribe !== "any" && user.tribe !== selectedTribe) return false;
      // Languages
      if (selectedLanguages.length > 0 && !selectedLanguages.some(lang => user.languages?.includes(lang))) return false;
      // Religion
      if (selectedReligion && selectedReligion !== "any" && user.religion !== selectedReligion) return false;
      // Denomination
      if (selectedDenomination && selectedDenomination !== "any" && user.denomination !== selectedDenomination) return false;
      // Religiousness
      if (selectedReligiousness > 0 && user.religiousness !== undefined && user.religiousness < selectedReligiousness) return false;
      // Church Attendance
      if (selectedChurchAttendance !== "any" && user.churchAttendance !== selectedChurchAttendance) return false;
      // Marital Status
      if (selectedMaritalStatus !== "any" && user.maritalStatus !== selectedMaritalStatus) return false;
      // Has Children
      if (selectedHasChildren !== "any" && user.hasChildren !== selectedHasChildren) return false;
      // Wants Children
      if (selectedWantsChildren !== "any" && user.wantsChildren !== selectedWantsChildren) return false;
      // Accepts Partner with Kids
      if (selectedAcceptsPartnerWithKids !== "any" && user.acceptsPartnerWithKids !== selectedAcceptsPartnerWithKids) return false;
      // Smoking
      if (selectedSmoking !== "any" && user.smoking !== selectedSmoking) return false;
      // Alcohol
      if (selectedAlcohol !== "any" && user.alcohol !== selectedAlcohol) return false;
      // Dietary Preference
      if (selectedDietaryPreference && selectedDietaryPreference !== "any" && user.dietaryPreference !== selectedDietaryPreference) return false;
      // Pets
      if (selectedPets !== "any" && user.pets !== selectedPets) return false;
      // Snoring
      if (selectedSnoring !== "any" && user.snoring !== selectedSnoring) return false;
      // Open to Relocate
      if (selectedOpenToRelocate !== "any" && user.openToRelocate !== selectedOpenToRelocate) return false;
      // Sexual Orientation
      if (selectedSexualOrientation && selectedSexualOrientation !== "any" && user.sexualOrientation !== selectedSexualOrientation) return false;
      // Relationship Tradition
      if (selectedRelationshipTradition && selectedRelationshipTradition !== "any" && user.relationshipTradition !== selectedRelationshipTradition) return false;
      return true;
    });
  }, [allUsers, memberType, userCountry, ageRange, selectedGoals, selectedGender, selectedRace, selectedCountry, selectedCounty, selectedTribe, selectedLanguages, selectedReligion, selectedDenomination, selectedReligiousness, selectedChurchAttendance, selectedMaritalStatus, selectedHasChildren, selectedWantsChildren, selectedAcceptsPartnerWithKids, selectedSmoking, selectedAlcohol, selectedDietaryPreference, selectedPets, selectedSnoring, selectedOpenToRelocate, selectedSexualOrientation, selectedRelationshipTradition]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  const startIndex = (currentPage - 1) * USERS_PER_PAGE
  const endIndex = startIndex + USERS_PER_PAGE
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  // Handle page change with loading simulation
  const handlePageChange = useCallback((page: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsLoading(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 300)
  }, [])

  const handleFilterChange = useCallback(() => {
    setCurrentPage(1) // Reset to first page when filters change
  }, [])

  const handleLike = (userId: number) => {
    setLikedUsers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  const handleChat = (user: any) => {
    // Navigate to messages page with user context
    router.push(
      `/messages?user=${encodeURIComponent(
        JSON.stringify({
          id: user.id,
          name: user.name,
          icon: user.icon,
          age: user.age,
          occupation: user.occupation,
        }),
      )}`,
    )
  }

  const handleConnect = (user: any) => {
    if (connectedUsers.has(user.id)) {
      handleChat(user)
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

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 pb-20">
      {/* Mobile App Header with Back Navigation */}
      <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Browse Profiles</h1>
          </div>
          <div className="text-sm text-white/80">{filteredUsers.length} profiles</div>
        </div>
      </div>

      <div className="h-full w-full">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Filters - Mobile */}
          <div className="lg:hidden w-full p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            {/* Member Type Filter */}
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={memberType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMemberType("all")}
                  className={`text-xs ${memberType === "all" ? "bg-[#B22222] hover:bg-[#8B0000] text-white" : "border-gray-300 dark:border-gray-600"}`}
                >
                  All Members
                </Button>
                <Button
                  variant={memberType === "local" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMemberType("local")}
                  className={`text-xs ${memberType === "local" ? "bg-[#B22222] hover:bg-[#8B0000] text-white" : "border-gray-300 dark:border-gray-600"}`}
                >
                  Local Members
                </Button>
                <Button
                  variant={memberType === "diaspora" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMemberType("diaspora")}
                  className={`text-xs ${memberType === "diaspora" ? "bg-[#B22222] hover:bg-[#8B0000] text-white" : "border-gray-300 dark:border-gray-600"}`}
                >
                  Members in Diaspora
                </Button>
              </div>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full flex items-center justify-center gap-2 bg-[#B22222] hover:bg-[#8B0000] rounded-xl py-3 min-h-[44px]">
                  <Filter size={16} /> Filter Profiles
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-800">
                <SheetHeader>
                  <SheetTitle className="text-[#B22222] dark:text-red-400">Filter Profiles</SheetTitle>
                  <SheetDescription className="dark:text-gray-400">
                    Find your ideal match by filtering profiles based on your preferences.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#B22222] scrollbar-track-gray-200 dark:scrollbar-thumb-red-400 dark:scrollbar-track-gray-800">
                  {/* Age Range */}
                  <div>
                    <Label className="text-base font-medium text-gray-900 dark:text-gray-100">
                      Age Range: {ageRange[0]} - {ageRange[1]}
                    </Label>
                    <Slider
                      defaultValue={ageRange}
                      min={18}
                      max={70}
                      step={1}
                      onValueChange={setAgeRange}
                      className="mt-3"
                    />
                  </div>

                  {/* Relationship Goals */}
                  <div>
                    <Label htmlFor="goals-mobile" className="text-base font-medium text-gray-900 dark:text-gray-100">
                      Relationship Goals
                    </Label>
                    <Select value={selectedGoals} onValueChange={setSelectedGoals}>
                      <SelectTrigger id="goals-mobile" className="mt-2 rounded-xl">
                        <SelectValue placeholder="Any Relationship Goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Relationship Goal</SelectItem>
                        <SelectItem value="Marriage">Marriage</SelectItem>
                        <SelectItem value="Long-term relationship">Long-term Relationship</SelectItem>
                        <SelectItem value="Friendship">Friendship First</SelectItem>
                        <SelectItem value="Casual dating">Casual Dating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Demographics */}
                  <details className="mb-4">
                    <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Demographics</summary>
                    <div className="space-y-3 mt-2">
                      {/* Gender */}
                      <Label>Gender</Label>
                      <Select value={selectedGender} onValueChange={setSelectedGender}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Any Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Gender</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* Race */}
                      <Label>Race</Label>
                      <Select value={selectedRace} onValueChange={setSelectedRace}>
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
                      <Input value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} placeholder="Any Country" className="rounded-xl" />
                      {/* County */}
                      <Label>County</Label>
                      <Input value={selectedCounty} onChange={e => setSelectedCounty(e.target.value)} placeholder="Any County" className="rounded-xl" />
                      {/* Tribe */}
                      <Label>Tribe</Label>
                      <Input value={selectedTribe} onChange={e => setSelectedTribe(e.target.value)} placeholder="Any Tribe" className="rounded-xl" />
                      {/* Languages */}
                      <Label>Fluent in (comma separated)</Label>
                      <Input value={selectedLanguages.join(", ")} onChange={e => setSelectedLanguages(e.target.value.split(",").map(s => s.trim()))} placeholder="e.g. English, Swahili" className="rounded-xl" />
                    </div>
                  </details>

                  {/* Beliefs */}
                  <details className="mb-4">
                    <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Beliefs</summary>
                    <div className="space-y-3 mt-2">
                      {/* Religion */}
                      <Label>Religion</Label>
                      <Input value={selectedReligion} onChange={e => setSelectedReligion(e.target.value)} placeholder="Any Religion" className="rounded-xl" />
                      {/* Denomination */}
                      <Label>Denomination</Label>
                      <Input value={selectedDenomination} onChange={e => setSelectedDenomination(e.target.value)} placeholder="Any Denomination" className="rounded-xl" />
                      {/* Religiousness */}
                      <Label>Religiousness</Label>
                      <Slider min={0} max={10} step={1} value={[selectedReligiousness]} onValueChange={v => setSelectedReligiousness(v[0])} className="mt-2" />
                      {/* Church Attendance */}
                      <Label>Church Attendance</Label>
                      <Select value={selectedChurchAttendance} onValueChange={setSelectedChurchAttendance}>
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

                  {/* Lifestyle */}
                  <details className="mb-4">
                    <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Lifestyle</summary>
                    <div className="space-y-3 mt-2">
                      {/* Smoking */}
                      <Label>Smoking</Label>
                      <Select value={selectedSmoking} onValueChange={setSelectedSmoking}>
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
                      <Select value={selectedAlcohol} onValueChange={setSelectedAlcohol}>
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
                      <Input value={selectedDietaryPreference} onChange={e => setSelectedDietaryPreference(e.target.value)} placeholder="Any Diet" className="rounded-xl" />
                      {/* Pets */}
                      <Label>Pets</Label>
                      <Select value={selectedPets} onValueChange={setSelectedPets}>
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
                      <Select value={selectedSnoring} onValueChange={setSelectedSnoring}>
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

                  {/* Family */}
                  <details className="mb-4">
                    <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Family</summary>
                    <div className="space-y-3 mt-2">
                      {/* Marital Status */}
                      <Label>Marital Status</Label>
                      <Select value={selectedMaritalStatus} onValueChange={setSelectedMaritalStatus}>
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
                      <Select value={selectedHasChildren} onValueChange={setSelectedHasChildren}>
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
                      <Select value={selectedWantsChildren} onValueChange={setSelectedWantsChildren}>
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
                      <Select value={selectedAcceptsPartnerWithKids} onValueChange={setSelectedAcceptsPartnerWithKids}>
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

                  {/* Preferences */}
                  <details className="mb-4">
                    <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Preferences</summary>
                    <div className="space-y-3 mt-2">
                      {/* Open to Relocate */}
                      <Label>Open to Relocate</Label>
                      <Select value={selectedOpenToRelocate} onValueChange={setSelectedOpenToRelocate}>
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
                      <Input value={selectedSexualOrientation} onChange={e => setSelectedSexualOrientation(e.target.value)} placeholder="Any" className="rounded-xl" />
                      {/* Relationship Tradition */}
                      <Label>Relationship Tradition</Label>
                      <Input value={selectedRelationshipTradition} onChange={e => setSelectedRelationshipTradition(e.target.value)} placeholder="Any" className="rounded-xl" />
                    </div>
                  </details>

                  <Button
                    className="w-full bg-[#B22222] hover:bg-[#8B0000] mt-6 rounded-xl py-3"
                    onClick={handleFilterChange}
                  >
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Filters - Desktop */}
          <div className="hidden lg:block w-80 bg-white dark:bg-gray-800 shadow-lg h-full overflow-y-auto">
            <div className="p-6 fixed top-0 w-80 bg-white dark:bg-gray-800 z-40">
              <h2 className="text-xl font-bold text-[#B22222] dark:text-red-400 mb-6">Filter Profiles</h2>

              {/* Member Type filter removed from sidebar for desktop */}
              <div className="space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#B22222] scrollbar-track-gray-200 dark:scrollbar-thumb-red-400 dark:scrollbar-track-gray-800">
                {/* Age Range */}
                <div>
                  <Label className="text-base font-medium text-gray-900 dark:text-gray-100">
                    Age Range: {ageRange[0]} - {ageRange[1]}
                  </Label>
                  <Slider
                    defaultValue={ageRange}
                    min={18}
                    max={70}
                    step={1}
                    onValueChange={setAgeRange}
                    className="mt-3"
                  />
                </div>

                {/* Relationship Goals */}
                <div>
                  <Label htmlFor="goals" className="text-base font-medium text-gray-900 dark:text-gray-100">
                    Relationship Goals
                  </Label>
                  <Select value={selectedGoals} onValueChange={setSelectedGoals}>
                    <SelectTrigger id="goals" className="mt-2 rounded-xl">
                      <SelectValue placeholder="Any Relationship Goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Relationship Goal</SelectItem>
                      <SelectItem value="Marriage">Marriage</SelectItem>
                      <SelectItem value="Long-term relationship">Long-term Relationship</SelectItem>
                      <SelectItem value="Friendship">Friendship First</SelectItem>
                      <SelectItem value="Casual dating">Casual Dating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Demographics */}
                <details className="mb-4">
                  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Demographics</summary>
                  <div className="space-y-3 mt-2">
                    {/* Gender */}
                    <Label>Gender</Label>
                    <Select value={selectedGender} onValueChange={setSelectedGender}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Any Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Gender</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Race */}
                    <Label>Race</Label>
                    <Select value={selectedRace} onValueChange={setSelectedRace}>
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
                    <Input value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} placeholder="Any Country" className="rounded-xl" />
                    {/* County */}
                    <Label>County</Label>
                    <Input value={selectedCounty} onChange={e => setSelectedCounty(e.target.value)} placeholder="Any County" className="rounded-xl" />
                    {/* Tribe */}
                    <Label>Tribe</Label>
                    <Input value={selectedTribe} onChange={e => setSelectedTribe(e.target.value)} placeholder="Any Tribe" className="rounded-xl" />
                    {/* Languages */}
                    <Label>Fluent in (comma separated)</Label>
                    <Input value={selectedLanguages.join(", ")} onChange={e => setSelectedLanguages(e.target.value.split(",").map(s => s.trim()))} placeholder="e.g. English, Swahili" className="rounded-xl" />
                  </div>
                </details>

                {/* Beliefs */}
                <details className="mb-4">
                  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Beliefs</summary>
                  <div className="space-y-3 mt-2">
                    {/* Religion */}
                    <Label>Religion</Label>
                    <Input value={selectedReligion} onChange={e => setSelectedReligion(e.target.value)} placeholder="Any Religion" className="rounded-xl" />
                    {/* Denomination */}
                    <Label>Denomination</Label>
                    <Input value={selectedDenomination} onChange={e => setSelectedDenomination(e.target.value)} placeholder="Any Denomination" className="rounded-xl" />
                    {/* Religiousness */}
                    <Label>Religiousness</Label>
                    <Slider min={0} max={10} step={1} value={[selectedReligiousness]} onValueChange={v => setSelectedReligiousness(v[0])} className="mt-2" />
                    {/* Church Attendance */}
                    <Label>Church Attendance</Label>
                    <Select value={selectedChurchAttendance} onValueChange={setSelectedChurchAttendance}>
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

                {/* Lifestyle */}
                <details className="mb-4">
                  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Lifestyle</summary>
                  <div className="space-y-3 mt-2">
                    {/* Smoking */}
                    <Label>Smoking</Label>
                    <Select value={selectedSmoking} onValueChange={setSelectedSmoking}>
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
                    <Select value={selectedAlcohol} onValueChange={setSelectedAlcohol}>
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
                    <Input value={selectedDietaryPreference} onChange={e => setSelectedDietaryPreference(e.target.value)} placeholder="Any Diet" className="rounded-xl" />
                    {/* Pets */}
                    <Label>Pets</Label>
                    <Select value={selectedPets} onValueChange={setSelectedPets}>
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
                    <Select value={selectedSnoring} onValueChange={setSelectedSnoring}>
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

                {/* Family */}
                <details className="mb-4">
                  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Family</summary>
                  <div className="space-y-3 mt-2">
                    {/* Marital Status */}
                    <Label>Marital Status</Label>
                    <Select value={selectedMaritalStatus} onValueChange={setSelectedMaritalStatus}>
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
                    <Select value={selectedHasChildren} onValueChange={setSelectedHasChildren}>
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
                    <Select value={selectedWantsChildren} onValueChange={setSelectedWantsChildren}>
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
                    <Select value={selectedAcceptsPartnerWithKids} onValueChange={setSelectedAcceptsPartnerWithKids}>
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

                {/* Preferences */}
                <details className="mb-4">
                  <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer py-2">Preferences</summary>
                  <div className="space-y-3 mt-2">
                    {/* Open to Relocate */}
                    <Label>Open to Relocate</Label>
                    <Select value={selectedOpenToRelocate} onValueChange={setSelectedOpenToRelocate}>
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
                    <Input value={selectedSexualOrientation} onChange={e => setSelectedSexualOrientation(e.target.value)} placeholder="Any" className="rounded-xl" />
                    {/* Relationship Tradition */}
                    <Label>Relationship Tradition</Label>
                    <Input value={selectedRelationshipTradition} onChange={e => setSelectedRelationshipTradition(e.target.value)} placeholder="Any" className="rounded-xl" />
                  </div>
                </details>

                <Button
                  className="w-full bg-[#B22222] hover:bg-[#8B0000] mt-6 rounded-xl py-3"
                  onClick={handleFilterChange}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4">
            {/* Member Type Filter for Desktop only, above profiles grid */}
            <div className="hidden lg:flex w-full mb-6">
              <Button
                variant={memberType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setMemberType("all")}
                className={`text-sm flex-1 rounded-l-lg rounded-r-none h-10 py-0 ${memberType === "all" ? "bg-[#B22222] hover:bg-[#8B0000] text-white" : "border-gray-300 dark:border-gray-600"}`}
              >
                All Members
              </Button>
              <Button
                variant={memberType === "local" ? "default" : "outline"}
                size="sm"
                onClick={() => setMemberType("local")}
                className={`text-sm flex-1 rounded-none h-10 py-0 ${memberType === "local" ? "bg-[#B22222] hover:bg-[#8B0000] text-white" : "border-gray-300 dark:border-gray-600"}`}
              >
                Local Members
              </Button>
              <Button
                variant={memberType === "diaspora" ? "default" : "outline"}
                size="sm"
                onClick={() => setMemberType("diaspora")}
                className={`text-sm flex-1 rounded-r-lg rounded-l-none h-10 py-0 ${memberType === "diaspora" ? "bg-[#B22222] hover:bg-[#8B0000] text-white" : "border-gray-300 dark:border-gray-600"}`}
              >
                Members in Diaspora
              </Button>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[#B22222]" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No profiles found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters to see more profiles.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {currentUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => { setSelectedProfile(user); setIsProfileModalOpen(true); }}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="relative">
                        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-3 ring-2 ring-white dark:ring-gray-600">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-[#B22222] text-white text-sm sm:text-lg">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add like functionality if needed
                          }}
                          className="absolute top-0 right-0 p-1.5 rounded-full bg-white dark:bg-gray-600 shadow-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                      <div className="text-center space-y-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                          {user.name}, {user.age}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-xs truncate">{user.occupation}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{user.location}</p>
                        <div className="flex items-center justify-center gap-1">
                          <Badge className="bg-[#B22222] text-white text-xs">
                            {user.compatibility}% match
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0">
                      <div className="flex space-x-2 w-full">
                        <Button
                          size="sm"
                          className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl h-8 text-xs min-h-[36px] max-w-[50%]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConnect(user);
                          }}
                          disabled={sentRequests.has(user.id) && !connectedUsers.has(user.id)}
                        >
                          {connectedUsers.has(user.id) ? "Chat" : sentRequests.has(user.id) ? "Sent" : "Connect"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl h-8 text-xs min-h-[36px] bg-transparent max-w-[50%]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProfile(user);
                            setIsProfileModalOpen(true);
                          }}
                        >
                          View Profile
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="min-h-[44px]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {getPageNumbers().map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={`min-h-[44px] ${
                      currentPage === page
                        ? "bg-[#B22222] hover:bg-[#8B0000] text-white"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="min-h-[44px]"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} profile={selectedProfile} />
    </div>
  )
}
