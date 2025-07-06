"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Heart, MapPin, GraduationCap, Users, Clock, Star, X } from "lucide-react"

// Mock data for members
const mockMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 28,
    location: "New York, NY",
    occupation: "Marketing Manager",
    education: "Bachelor's Degree",
    relationshipGoal: "Long-term",
    avatar: "/images/female1.jpg",
    isOnline: true,
    isVerified: true,
    compatibility: 95,
    joinedDays: 5,
    bio: "Love hiking, reading, and trying new restaurants. Looking for someone genuine and kind.",
  },
  {
    id: 2,
    name: "Emily Chen",
    age: 26,
    location: "San Francisco, CA",
    occupation: "Software Engineer",
    education: "Master's Degree",
    relationshipGoal: "Serious Dating",
    avatar: "/images/female2.jpg",
    isOnline: false,
    isVerified: true,
    compatibility: 88,
    joinedDays: 12,
    bio: "Tech enthusiast who loves cooking and traveling. Seeking meaningful connections.",
  },
  {
    id: 3,
    name: "Jessica Williams",
    age: 30,
    location: "Chicago, IL",
    occupation: "Teacher",
    education: "Bachelor's Degree",
    relationshipGoal: "Marriage",
    avatar: "/images/female3.jpg",
    isOnline: true,
    isVerified: false,
    compatibility: 92,
    joinedDays: 8,
    bio: "Passionate about education and community service. Family-oriented and looking for my life partner.",
  },
  {
    id: 4,
    name: "Amanda Davis",
    age: 27,
    location: "Austin, TX",
    occupation: "Graphic Designer",
    education: "Bachelor's Degree",
    relationshipGoal: "Long-term",
    avatar: "/images/female4.jpg",
    isOnline: false,
    isVerified: true,
    compatibility: 85,
    joinedDays: 20,
    bio: "Creative soul who loves art, music, and outdoor adventures. Looking for someone to share life's beautiful moments.",
  },
  {
    id: 5,
    name: "Rachel Martinez",
    age: 29,
    location: "Miami, FL",
    occupation: "Nurse",
    education: "Bachelor's Degree",
    relationshipGoal: "Serious Dating",
    avatar: "/images/female5.jpg",
    isOnline: true,
    isVerified: true,
    compatibility: 90,
    joinedDays: 3,
    bio: "Healthcare professional with a big heart. Love beach walks, yoga, and helping others.",
  },
  {
    id: 6,
    name: "Lisa Thompson",
    age: 31,
    location: "Seattle, WA",
    occupation: "Architect",
    education: "Master's Degree",
    relationshipGoal: "Marriage",
    avatar: "/images/female6.jpg",
    isOnline: false,
    isVerified: true,
    compatibility: 87,
    joinedDays: 15,
    bio: "Design-minded professional who appreciates good coffee and great conversations.",
  },
]

export default function MembersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [ageFilter, setAgeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [educationFilter, setEducationFilter] = useState("all")
  const [goalFilter, setGoalFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const tabs = [
    { id: "all", label: "All", icon: Users },
    { id: "online", label: "Online", icon: Clock },
    { id: "new", label: "New", icon: Star },
    { id: "match", label: "Match", icon: Heart },
  ]

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.occupation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAge =
      ageFilter === "all" ||
      (ageFilter === "20-25" && member.age >= 20 && member.age <= 25) ||
      (ageFilter === "26-30" && member.age >= 26 && member.age <= 30) ||
      (ageFilter === "31-35" && member.age >= 31 && member.age <= 35)
    const matchesLocation = locationFilter === "all" || member.location.includes(locationFilter)
    const matchesEducation = educationFilter === "all" || member.education === educationFilter
    const matchesGoal = goalFilter === "all" || member.relationshipGoal === goalFilter

    let matchesTab = true
    switch (activeTab) {
      case "online":
        matchesTab = member.isOnline
        break
      case "new":
        matchesTab = member.joinedDays <= 7
        break
      case "match":
        matchesTab = member.compatibility >= 90
        break
    }

    return matchesSearch && matchesAge && matchesLocation && matchesEducation && matchesGoal && matchesTab
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Discover People</h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name or occupation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full border-gray-300"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id ? "bg-[#B22222] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                showFilters ? "bg-[#B22222] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="flex items-center justify-between py-3">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="text-gray-500">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Age Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="20-25">20-25</SelectItem>
                  <SelectItem value="26-30">26-30</SelectItem>
                  <SelectItem value="31-35">31-35</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="Texas">Texas</SelectItem>
                  <SelectItem value="Florida">Florida</SelectItem>
                </SelectContent>
              </Select>

              <Select value={educationFilter} onValueChange={setEducationFilter}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Education</SelectItem>
                  <SelectItem value="Bachelor's Degree">Bachelor's</SelectItem>
                  <SelectItem value="Master's Degree">Master's</SelectItem>
                </SelectContent>
              </Select>

              <Select value={goalFilter} onValueChange={setGoalFilter}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Relationship Goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Goals</SelectItem>
                  <SelectItem value="Serious Dating">Serious Dating</SelectItem>
                  <SelectItem value="Long-term">Long-term</SelectItem>
                  <SelectItem value="Marriage">Marriage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Results Info */}
      <div className="px-4 py-3 bg-gray-50 pt-32">
        <p className="text-sm text-gray-600">{filteredMembers.length} members found</p>
      </div>

      {/* Members Grid */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="bg-white border-gray-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-50">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {member.isOnline && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                  )}
                  {member.isVerified && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full p-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <div className="text-white">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm">{member.name}</h3>
                        <Badge className="bg-[#B22222] text-white text-xs px-2 py-0.5">{member.compatibility}%</Badge>
                      </div>
                      <p className="text-xs opacity-90">{member.age} years old</p>
                      <div className="flex items-center gap-1 text-xs opacity-90 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{member.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                    <GraduationCap className="w-3 h-3" />
                    <span className="truncate">{member.occupation}</span>
                  </div>
                  <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed mb-3">{member.bio}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white text-xs h-8">
                      <Heart className="w-3 h-3 mr-1" />
                      Like
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white text-xs h-8 bg-transparent"
                    >
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
