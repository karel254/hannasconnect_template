"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Filter,
  Search,
  Users,
  MapPin,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  UserPlus,
  Eye,
} from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Extended member data
const generateMembers = () => {
  const baseMemberData = [
    {
      id: 1,
      name: "Alex Johnson",
      age: 32,
      occupation: "Software Engineer",
      education: "Master's Degree",
      location: "New York, NY",
      relationshipGoals: "Marriage",
      bio: "Passionate about technology and building meaningful relationships. Looking for someone who shares my values and enjoys deep conversations about life and future goals.",
      icon: "/images/avatar1.png",
      interests: ["Technology", "Reading", "Hiking", "Cooking", "Photography"],
      skills: "Full-stack development, AI/ML, Cloud Architecture",
      isOnline: true,
      lastSeen: "Online",
      compatibility: 95,
      verified: true,
      joinedDate: "2023-08-15",
    },
    {
      id: 2,
      name: "Amina Okafor",
      age: 28,
      occupation: "Financial Analyst",
      education: "Bachelor's Degree",
      location: "Chicago, IL",
      relationshipGoals: "Long-term relationship",
      bio: "Ambitious professional seeking a partner who values growth, family, and spiritual connection. I believe in building relationships on trust and mutual respect.",
      icon: "/images/avatar2.png",
      interests: ["Finance", "Fitness", "Travel", "Faith", "Cooking"],
      skills: "Investment analysis, Risk management, Portfolio optimization",
      isOnline: false,
      lastSeen: "2 hours ago",
      compatibility: 88,
      verified: true,
      joinedDate: "2023-09-20",
    },
    {
      id: 3,
      name: "David Mensah",
      age: 35,
      occupation: "Doctor",
      education: "Doctorate",
      location: "Atlanta, GA",
      relationshipGoals: "Marriage",
      bio: "Healthcare professional with a passion for helping others. Looking for a supportive partner to build a future together and make a positive impact in our community.",
      icon: "/images/avatar3.png",
      interests: ["Healthcare", "Music", "Community Service", "Sports", "Reading"],
      skills: "Emergency medicine, Patient care, Medical research",
      isOnline: true,
      lastSeen: "Online",
      compatibility: 92,
      verified: true,
      joinedDate: "2023-07-10",
    },
    {
      id: 4,
      name: "Sarah Osei",
      age: 30,
      occupation: "Corporate Lawyer",
      education: "Juris Doctor",
      location: "Los Angeles, CA",
      relationshipGoals: "Long-term relationship",
      bio: "Driven professional seeking someone who values intellectual conversations and shared goals. I enjoy art, politics, and exploring new cuisines in my free time.",
      icon: "/images/avatar4.png",
      interests: ["Law", "Art", "Politics", "Culinary Arts", "Travel"],
      skills: "Corporate law, Contract negotiation, Legal consulting",
      isOnline: false,
      lastSeen: "1 day ago",
      compatibility: 85,
      verified: true,
      joinedDate: "2023-06-05",
    },
  ]

  // Generate more members for demonstration
  const members = []
  const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA"]
  const occupations = [
    "Software Engineer",
    "Doctor",
    "Teacher",
    "Marketing Manager",
    "Nurse",
    "Architect",
    "Designer",
    "Consultant",
  ]

  for (let i = 0; i < 48; i++) {
    const baseMember = baseMemberData[i % baseMemberData.length]
    members.push({
      ...baseMember,
      id: i + 1,
      name: `${baseMember.name.split(" ")[0]} ${String.fromCharCode(65 + (i % 26))}${baseMember.name.split(" ")[1]}`,
      age: 25 + (i % 15),
      location: locations[i % locations.length],
      occupation: occupations[i % occupations.length],
      isOnline: Math.random() > 0.7,
      lastSeen: Math.random() > 0.5 ? "Online" : `${Math.floor(Math.random() * 24) + 1} hours ago`,
      compatibility: 75 + Math.floor(Math.random() * 25),
    })
  }
  return members
}

const MEMBERS_PER_PAGE = 16

export default function Members() {
  const [allMembers] = useState(generateMembers())
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [ageRange, setAgeRange] = useState([25, 45])
  const [selectedLocation, setSelectedLocation] = useState<string>("any")
  const [selectedEducation, setSelectedEducation] = useState<string>("any")
  const [selectedGoals, setSelectedGoals] = useState<string>("any")
  const [isLoading, setIsLoading] = useState(false)

  // Filter members based on criteria and tab
  const filteredMembers = useMemo(() => {
    let filtered = allMembers.filter(
      (member) =>
        member.age >= ageRange[0] &&
        member.age <= ageRange[1] &&
        (selectedLocation !== "any" ? member.location.includes(selectedLocation.split(",")[0]) : true) &&
        (selectedEducation !== "any" ? member.education.includes(selectedEducation) : true) &&
        (selectedGoals !== "any" ? member.relationshipGoals === selectedGoals : true) &&
        (searchQuery ? member.name.toLowerCase().includes(searchQuery.toLowerCase()) : true),
    )

    // Filter by tab
    if (activeTab === "online") {
      filtered = filtered.filter((member) => member.isOnline)
    } else if (activeTab === "new") {
      filtered = filtered.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
    } else if (activeTab === "compatible") {
      filtered = filtered
        .filter((member) => member.compatibility >= 85)
        .sort((a, b) => b.compatibility - a.compatibility)
    }

    return filtered
  }, [allMembers, ageRange, selectedLocation, selectedEducation, selectedGoals, searchQuery, activeTab])

  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / MEMBERS_PER_PAGE)
  const startIndex = (currentPage - 1) * MEMBERS_PER_PAGE
  const endIndex = startIndex + MEMBERS_PER_PAGE
  const currentMembers = filteredMembers.slice(startIndex, endIndex)

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
    setCurrentPage(1)
  }, [])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8 text-[#B22222] dark:text-[#FF6B6B]" />
            <h1 className="text-3xl font-bold text-[#B22222] dark:text-[#FF6B6B]">Members</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and connect with {allMembers.length} amazing singles in our community
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile */}
          <div className="lg:hidden w-full mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full flex items-center justify-center gap-2 bg-[#B22222] hover:bg-[#8B0000]">
                  <Filter size={16} /> Filter Members
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filter Members</SheetTitle>
                  <SheetDescription>Find members that match your preferences</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  {/* Search */}
                  <div>
                    <Label htmlFor="search-mobile" className="text-base font-medium">
                      Search by Name
                    </Label>
                    <div className="relative mt-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="search-mobile"
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Age Range */}
                  <div>
                    <Label className="text-base font-medium">
                      Age Range: {ageRange[0]} - {ageRange[1]}
                    </Label>
                    <Slider
                      defaultValue={ageRange}
                      min={18}
                      max={70}
                      step={1}
                      onValueChange={setAgeRange}
                      className="mt-2"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location-mobile" className="text-base font-medium">
                      Location
                    </Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger id="location-mobile" className="mt-1">
                        <SelectValue placeholder="Any Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Location</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
                        <SelectItem value="Houston">Houston</SelectItem>
                        <SelectItem value="Phoenix">Phoenix</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-[#B22222] hover:bg-[#8B0000] mt-4" onClick={handleFilterChange}>
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Filters - Desktop */}
          <div className="hidden lg:block w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-[#B22222] dark:text-[#FF6B6B] mb-6">Filter Members</h2>

            <div className="space-y-6">
              {/* Search */}
              <div>
                <Label htmlFor="search" className="text-base font-medium">
                  Search by Name
                </Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="search"
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Age Range */}
              <div>
                <Label className="text-base font-medium">
                  Age Range: {ageRange[0]} - {ageRange[1]}
                </Label>
                <Slider
                  defaultValue={ageRange}
                  min={18}
                  max={70}
                  step={1}
                  onValueChange={setAgeRange}
                  className="mt-2"
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-base font-medium">
                  Location
                </Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger id="location" className="mt-1">
                    <SelectValue placeholder="Any Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Location</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                    <SelectItem value="Houston">Houston</SelectItem>
                    <SelectItem value="Phoenix">Phoenix</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Education */}
              <div>
                <Label htmlFor="education" className="text-base font-medium">
                  Education Level
                </Label>
                <Select value={selectedEducation} onValueChange={setSelectedEducation}>
                  <SelectTrigger id="education" className="mt-1">
                    <SelectValue placeholder="Any Education Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Education Level</SelectItem>
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="Master">Master's Degree</SelectItem>
                    <SelectItem value="Doctorate">Doctorate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Relationship Goals */}
              <div>
                <Label htmlFor="goals" className="text-base font-medium">
                  Relationship Goals
                </Label>
                <Select value={selectedGoals} onValueChange={setSelectedGoals}>
                  <SelectTrigger id="goals" className="mt-1">
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

              <Button className="w-full bg-[#B22222] hover:bg-[#8B0000] mt-4" onClick={handleFilterChange}>
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Members Grid */}
          <div className="flex-1">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
              <TabsList className="grid w-full grid-cols-4 dark:bg-gray-700">
                <TabsTrigger value="all" className="dark:data-[state=active]:bg-gray-600">
                  All Members
                </TabsTrigger>
                <TabsTrigger value="online" className="dark:data-[state=active]:bg-gray-600">
                  Online Now
                </TabsTrigger>
                <TabsTrigger value="new" className="dark:data-[state=active]:bg-gray-600">
                  New Members
                </TabsTrigger>
                <TabsTrigger value="compatible" className="dark:data-[state=active]:bg-gray-600">
                  High Match
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredMembers.length)} of {filteredMembers.length}{" "}
                members
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#B22222]" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">Loading members...</span>
              </div>
            )}

            {/* Members Grid */}
            {!isLoading && (
              <>
                {currentMembers.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">No members match your criteria.</p>
                    <Button
                      variant="outline"
                      className="border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white"
                      onClick={() => {
                        setSearchQuery("")
                        setAgeRange([25, 45])
                        setSelectedLocation("any")
                        setSelectedEducation("any")
                        setSelectedGoals("any")
                        setCurrentPage(1)
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {currentMembers.map((member) => (
                      <Card
                        key={member.id}
                        className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border-0 shadow-lg"
                      >
                        <CardHeader className="p-0 relative">
                          <div className="bg-gradient-to-br from-[#DAA520]/20 to-[#B22222]/10 p-6 flex justify-center relative">
                            <img
                              src={member.icon || "/placeholder.svg?height=120&width=120"}
                              alt={`${member.name}'s profile`}
                              className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                            {/* Online Status */}
                            {member.isOnline && (
                              <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                Online
                              </div>
                            )}
                            {/* Verified Badge */}
                            {member.verified && (
                              <div className="absolute top-4 left-4 bg-blue-500 text-white p-1 rounded-full">
                                <Star className="w-3 h-3 fill-current" />
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <CardTitle className="text-lg font-bold text-[#B22222] dark:text-[#FF6B6B] group-hover:text-[#8B0000] transition-colors">
                                {member.name}, {member.age}
                              </CardTitle>
                              <CardDescription className="text-gray-600 dark:text-gray-400 font-medium">
                                {member.occupation}
                              </CardDescription>
                            </div>
                            <Badge className="bg-[#DAA520] hover:bg-[#B8860B] text-white font-medium text-xs">
                              {member.compatibility}% Match
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <MapPin className="w-4 h-4 mr-1" />
                              {member.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="w-4 h-4 mr-1" />
                              {member.lastSeen}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{member.bio}</p>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {member.interests.slice(0, 2).map((interest, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                              >
                                {interest}
                              </Badge>
                            ))}
                            {member.interests.length > 2 && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                              >
                                +{member.interests.length - 2}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t border-gray-100 dark:border-gray-700 p-4 flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white transition-all duration-200"
                            size="sm"
                          >
                            <Eye size={14} className="mr-1" />
                            View
                          </Button>
                          <Button
                            className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white transition-all duration-200"
                            size="sm"
                          >
                            <UserPlus size={14} className="mr-1" />
                            Connect
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={16} />
                        Previous
                      </Button>

                      {/* Page Numbers */}
                      <div className="hidden sm:flex items-center gap-1">
                        {getPageNumbers().map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={
                              currentPage === page
                                ? "bg-[#B22222] hover:bg-[#8B0000] text-white"
                                : "border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white"
                            }
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      {/* Next Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
