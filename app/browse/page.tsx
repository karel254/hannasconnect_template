"use client"

import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, Heart, ChevronLeft, ChevronRight, Loader2, MessageCircle } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

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
      icon: "/images/male1.jpg",
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
      icon: "/images/female1.jpg",
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
      icon: "/images/male2.jpg",
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
      icon: "/images/female2.jpg",
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
  const router = useRouter()
  const [allUsers] = useState(generateUsers())
  const [currentPage, setCurrentPage] = useState(1)
  const [ageRange, setAgeRange] = useState([25, 45])
  const [selectedGoals, setSelectedGoals] = useState<string>("any")
  const [isLoading, setIsLoading] = useState(false)
  const [likedUsers, setLikedUsers] = useState<Set<number>>(new Set())

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

  // Filter users based on criteria
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
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
  }, [allUsers, ageRange, selectedGoals, selectedGender, selectedRace, selectedCountry, selectedCounty, selectedTribe, selectedLanguages, selectedReligion, selectedDenomination, selectedReligiousness, selectedChurchAttendance, selectedMaritalStatus, selectedHasChildren, selectedWantsChildren, selectedAcceptsPartnerWithKids, selectedSmoking, selectedAlcohol, selectedDietaryPreference, selectedPets, selectedSnoring, selectedOpenToRelocate, selectedSexualOrientation, selectedRelationshipTradition]);

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
      {/* Mobile App Header */}
      <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Browse Profiles</h1>
          <div className="text-sm text-white/80">{filteredUsers.length} profiles</div>
        </div>
      </div>

      <div className="h-full w-full">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Filters - Mobile */}
          <div className="lg:hidden w-full p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full flex items-center justify-center gap-2 bg-[#B22222] hover:bg-[#8B0000] rounded-xl py-3">
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

          {/* Profile Grid */}
          <div className="flex-1 h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-4 lg:p-6 pt-24">
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
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        No profiles match your current filters.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white rounded-xl bg-transparent"
                        onClick={() => {
                          setAgeRange([25, 45])
                          setSelectedGoals("any")
                          setCurrentPage(1)
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                      {currentUsers.map((user) => (
                        <Card
                          key={user.id}
                          className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border-0 shadow-lg rounded-2xl relative h-fit"
                        >
                          {/* Heart/Like Button - Fixed positioning with proper spacing */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`absolute top-4 right-4 z-20 w-9 h-9 rounded-full shadow-lg transition-all duration-200 ${
                              likedUsers.has(user.id)
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-white/95 text-gray-600 hover:bg-white hover:text-red-500 backdrop-blur-sm"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleLike(user.id)
                            }}
                          >
                            <Heart className={`w-4 h-4 ${likedUsers.has(user.id) ? "fill-current" : ""}`} />
                          </Button>

                          <CardHeader className="p-0">
                            <div className="bg-gradient-to-br from-[#DAA520]/20 to-[#B22222]/10 p-6 pt-8 flex justify-center">
                              <img
                                src={user.icon || "/placeholder.svg?height=120&width=120"}
                                alt={`${user.name}'s profile`}
                                className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                          </CardHeader>

                          <CardContent className="p-4 pb-2">
                            <div className="text-center mb-3">
                              <CardTitle className="text-lg font-bold text-[#B22222] dark:text-red-400 group-hover:text-[#8B0000] transition-colors">
                                {user.name}, {user.age}
                              </CardTitle>
                              <CardDescription className="text-gray-600 dark:text-gray-400 font-medium mt-1 text-sm">
                                {user.occupation}
                              </CardDescription>
                            </div>

                            <div className="space-y-2 mb-3">
                              <p className="text-xs text-gray-700 dark:text-gray-300 text-center">
                                <span className="font-semibold">Skills:</span> {user.skills}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 text-center">
                                {user.bio}
                              </p>
                            </div>

                            <div className="flex justify-center mb-3">
                              <Badge className="bg-[#DAA520] hover:bg-[#B8860B] text-white font-medium px-2 py-1 text-xs">
                                {user.relationshipGoals}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap gap-1 justify-center">
                              {user.interests.slice(0, 2).map((interest, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 px-2 py-0.5"
                                >
                                  {interest}
                                </Badge>
                              ))}
                              {user.interests.length > 2 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 px-2 py-0.5"
                                >
                                  +{user.interests.length - 2}
                                </Badge>
                              )}
                            </div>
                          </CardContent>

                          {/* Fixed footer with proper button sizing */}
                          <CardFooter className="border-t border-gray-100 dark:border-gray-700 p-3 flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white transition-all duration-200 rounded-xl py-2 text-sm bg-transparent min-h-[36px]"
                              size="sm"
                            >
                              View Profile
                            </Button>
                            <Button
                              className="flex-1 bg-[#B22222] hover:bg-[#8B0000] text-white transition-all duration-200 rounded-xl py-2 text-sm min-h-[36px]"
                              size="sm"
                              onClick={() => handleChat(user)}
                            >
                              <MessageCircle size={14} className="mr-1.5" /> Chat
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
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
                          className="border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
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
                                  ? "bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl"
                                  : "border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white rounded-xl"
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
                          className="border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
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
    </div>
  )
}
