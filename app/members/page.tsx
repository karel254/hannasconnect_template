"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Heart,
  MapPin,
  GraduationCap,
  Users,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

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
    avatar: "/images/avatar1.png",
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
    avatar: "/images/avatar2.png",
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
    avatar: "/images/avatar3.png",
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
    avatar: "/images/avatar4.png",
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
    avatar: "/images/avatar1.png",
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
    avatar: "/images/avatar2.png",
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
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const membersPerPage = 12

  const tabs = [
    { id: "all", label: "All Members", shortLabel: "All", icon: Users },
    { id: "online", label: "Online Now", shortLabel: "Online", icon: Clock },
    { id: "new", label: "New Members", shortLabel: "New", icon: Star },
    { id: "match", label: "High Match", shortLabel: "Match", icon: Heart },
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

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage)
  const startIndex = (currentPage - 1) * membersPerPage
  const currentMembers = filteredMembers.slice(startIndex, startIndex + membersPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchTerm, ageFilter, locationFilter, educationFilter, goalFilter])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF69B4]/5 to-[#FF9CC0]/5 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#B22222] dark:text-red-400 mb-4">
            Discover Amazing People
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Connect with like-minded individuals who share your values and interests
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name or occupation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Filter Toggle Button - Mobile */}
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters || "hidden md:grid"}`}>
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
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
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
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
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Education" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Education</SelectItem>
                <SelectItem value="Bachelor's Degree">Bachelor's</SelectItem>
                <SelectItem value="Master's Degree">Master's</SelectItem>
              </SelectContent>
            </Select>

            <Select value={goalFilter} onValueChange={setGoalFilter}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
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

        {/* Responsive Tabs */}
        <div className="mb-6">
          {/* Desktop Tabs */}
          <div className="hidden md:flex bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-[#B22222] text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-[#B22222] dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Mobile Tabs - Horizontal Scroll */}
          <div className="md:hidden bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-[#B22222] text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#B22222] dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            <span className="hidden sm:inline">Showing </span>
            {startIndex + 1}-{Math.min(startIndex + membersPerPage, filteredMembers.length)} of {filteredMembers.length}{" "}
            members
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
          {currentMembers.map((member) => (
            <Card
              key={member.id}
              className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 dark:bg-gray-800"
            >
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#FF69B4]/10 to-[#FF69B4]/5">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{member.name}</h3>
                    <Badge variant="secondary" className="bg-[#FF69B4]/10 text-[#B22222] dark:text-red-400 text-xs">
                      {member.compatibility}% match
                    </Badge>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.age} years old</p>

                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{member.location}</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                    <GraduationCap className="w-3 h-3" />
                    <span className="truncate">{member.occupation}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2 leading-relaxed">{member.bio}</p>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white text-xs">
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white text-xs"
                    >
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            {/* Mobile Pagination */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-300 px-3">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Desktop Pagination */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? "bg-[#B22222] hover:bg-[#8B0000]" : ""}
                  >
                    {pageNum}
                  </Button>
                )
              })}

              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
