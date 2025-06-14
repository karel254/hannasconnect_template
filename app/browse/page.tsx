"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, Heart, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Extended sample user data for pagination
const generateUsers = () => {
  const baseUsers = [
    {
      id: 1,
      name: "Alex Johnson",
      age: 32,
      occupation: "Software Engineer",
      education: "Master's Degree",
      tribe: "Yoruba",
      relationshipGoals: "Marriage",
      bio: "Passionate about technology and building meaningful relationships. Looking for someone who shares my values.",
      icon: "/images/avatar1.png",
      interests: ["Technology", "Reading", "Hiking", "Cooking"],
      skills: "Full-stack development, AI/ML",
    },
    {
      id: 2,
      name: "Amina Okafor",
      age: 28,
      occupation: "Financial Analyst",
      education: "Bachelor's Degree",
      tribe: "Igbo",
      relationshipGoals: "Long-term relationship",
      bio: "Ambitious professional seeking a partner who values growth, family, and spiritual connection.",
      icon: "/images/avatar2.png",
      interests: ["Finance", "Fitness", "Travel", "Faith"],
      skills: "Investment analysis, Risk management",
    },
    {
      id: 3,
      name: "David Mensah",
      age: 35,
      occupation: "Doctor",
      education: "Doctorate",
      tribe: "Ashanti",
      relationshipGoals: "Marriage",
      bio: "Healthcare professional with passion for helping others. Looking for a supportive partner.",
      icon: "/images/avatar3.png",
      interests: ["Healthcare", "Music", "Community Service", "Sports"],
      skills: "Emergency medicine, Patient care",
    },
    {
      id: 4,
      name: "Sarah Osei",
      age: 30,
      occupation: "Corporate Lawyer",
      education: "Juris Doctor",
      tribe: "Akan",
      relationshipGoals: "Long-term relationship",
      bio: "Driven professional seeking someone who values intellectual conversations and shared goals.",
      icon: "/images/avatar4.png",
      interests: ["Law", "Art", "Politics", "Culinary Arts"],
      skills: "Corporate law, Contract negotiation",
    },
  ]

  // Generate more users for pagination demo
  const users = []
  for (let i = 0; i < 50; i++) {
    const baseUser = baseUsers[i % baseUsers.length]
    users.push({
      ...baseUser,
      id: i + 1,
      name: `${baseUser.name.split(" ")[0]} ${String.fromCharCode(65 + (i % 26))}${baseUser.name.split(" ")[1]}`,
      age: 25 + (i % 15),
    })
  }
  return users
}

const USERS_PER_PAGE = 12

export default function Browse() {
  const [allUsers] = useState(generateUsers())
  const [currentPage, setCurrentPage] = useState(1)
  const [ageRange, setAgeRange] = useState([25, 45])
  const [selectedEducation, setSelectedEducation] = useState<string>("any")
  const [selectedGoals, setSelectedGoals] = useState<string>("any")
  const [isLoading, setIsLoading] = useState(false)

  // Filter users based on criteria
  const filteredUsers = useMemo(() => {
    return allUsers.filter(
      (user) =>
        user.age >= ageRange[0] &&
        user.age <= ageRange[1] &&
        (selectedEducation !== "any" ? user.education.includes(selectedEducation) : true) &&
        (selectedGoals !== "any" ? user.relationshipGoals === selectedGoals : true),
    )
  }, [allUsers, ageRange, selectedEducation, selectedGoals])

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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile */}
          <div className="lg:hidden w-full mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full flex items-center justify-center gap-2 bg-[#B22222] hover:bg-[#8B0000]">
                  <Filter size={16} /> Filter Profiles
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filter Profiles</SheetTitle>
                  <SheetDescription>
                    Find your ideal match by filtering profiles based on your preferences.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
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

                  {/* Education */}
                  <div>
                    <Label htmlFor="education-mobile" className="text-base font-medium">
                      Education Level
                    </Label>
                    <Select value={selectedEducation} onValueChange={setSelectedEducation}>
                      <SelectTrigger id="education-mobile" className="mt-1">
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
                    <Label htmlFor="goals-mobile" className="text-base font-medium">
                      Relationship Goals
                    </Label>
                    <Select value={selectedGoals} onValueChange={setSelectedGoals}>
                      <SelectTrigger id="goals-mobile" className="mt-1">
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
              </SheetContent>
            </Sheet>
          </div>

          {/* Filters - Desktop */}
          <div className="hidden lg:block w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-[#B22222] dark:text-[#FF6B6B] mb-6">Filter Profiles</h2>

            <div className="space-y-6">
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

          {/* Profile Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-[#B22222] dark:text-[#FF6B6B]">Browse Profiles</h1>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} profiles
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#B22222]" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">Loading profiles...</span>
              </div>
            )}

            {/* Profile Grid */}
            {!isLoading && (
              <>
                {currentUsers.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-400">No profiles match your current filters.</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white"
                      onClick={() => {
                        setAgeRange([25, 45])
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
                    {currentUsers.map((user) => (
                      <Card
                        key={user.id}
                        className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border-0 shadow-lg"
                      >
                        <CardHeader className="p-0">
                          <div className="bg-gradient-to-br from-[#DAA520]/20 to-[#B22222]/10 p-6 flex justify-center">
                            <img
                              src={user.icon || "/placeholder.svg?height=120&width=120"}
                              alt={`${user.name}'s profile`}
                              className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <CardTitle className="text-lg font-bold text-[#B22222] dark:text-[#FF6B6B] group-hover:text-[#8B0000] transition-colors">
                                {user.name}, {user.age}
                              </CardTitle>
                              <CardDescription className="text-gray-600 dark:text-gray-400 font-medium">
                                {user.occupation}
                              </CardDescription>
                            </div>
                            <Badge className="bg-[#DAA520] hover:bg-[#B8860B] text-white font-medium">
                              {user.relationshipGoals}
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-semibold">Skills:</span> {user.skills}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{user.bio}</p>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {user.interests.slice(0, 2).map((interest, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                              >
                                {interest}
                              </Badge>
                            ))}
                            {user.interests.length > 2 && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                              >
                                +{user.interests.length - 2}
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
                            View Profile
                          </Button>
                          <Button
                            className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white transition-all duration-200"
                            size="sm"
                          >
                            <Heart size={14} className="mr-1" /> Connect
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
