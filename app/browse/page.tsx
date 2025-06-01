"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, Heart, MessageCircle, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"

// Sample user data
const users = [
  {
    id: 1,
    name: "Alex Johnson",
    age: 32,
    occupation: "Software Engineer",
    education: "Master's Degree",
    tribe: "Yoruba",
    relationshipGoals: "Marriage",
    bio: "I'm passionate about technology and building meaningful relationships. Looking for someone who shares my values and enjoys deep conversations.",
    icon: "/images/avatar1.png",
    interests: ["Technology", "Reading", "Hiking", "Cooking"],
  },
  {
    id: 2,
    name: "Amina Okafor",
    age: 28,
    occupation: "Financial Analyst",
    education: "Bachelor's Degree",
    tribe: "Igbo",
    relationshipGoals: "Long-term relationship",
    bio: "Ambitious and goal-oriented professional seeking a partner who values growth, family, and spiritual connection.",
    icon: "/images/avatar2.png",
    interests: ["Finance", "Fitness", "Travel", "Faith"],
  },
  {
    id: 3,
    name: "David Mensah",
    age: 35,
    occupation: "Doctor",
    education: "Doctorate",
    tribe: "Ashanti",
    relationshipGoals: "Marriage",
    bio: "Dedicated healthcare professional with a passion for helping others. Looking for a supportive partner to build a future with.",
    icon: "/images/avatar3.png",
    interests: ["Healthcare", "Music", "Community Service", "Sports"],
  },
  {
    id: 4,
    name: "Sarah Osei",
    age: 30,
    occupation: "Corporate Lawyer",
    education: "Juris Doctor",
    tribe: "Akan",
    relationshipGoals: "Long-term relationship",
    bio: "Driven professional with a balanced approach to life. Seeking someone who values intellectual conversations and shared goals.",
    icon: "/images/avatar4.png",
    interests: ["Law", "Art", "Politics", "Culinary Arts"],
  },
]

export default function Browse() {
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [ageRange, setAgeRange] = useState([25, 45])
  const [selectedEducation, setSelectedEducation] = useState<string>("any")
  const [selectedGoals, setSelectedGoals] = useState<string>("any")
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)

  const handleFilterChange = () => {
    // In a real app, this would filter based on all criteria
    // This is a simplified example
    const filtered = users.filter(
      (user) =>
        user.age >= ageRange[0] &&
        user.age <= ageRange[1] &&
        (selectedEducation !== "any" ? user.education.includes(selectedEducation) : true) &&
        (selectedGoals !== "any" ? user.relationshipGoals === selectedGoals : true),
    )
    setFilteredUsers(filtered)
  }

  const viewProfile = (user: (typeof users)[0]) => {
    setSelectedUser(user)
  }

  const closeProfile = () => {
    setSelectedUser(null)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Mobile */}
          <div className="md:hidden w-full mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full flex items-center justify-center gap-2 bg-[#B22222]">
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
                    <Label className="text-base">
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
                    <Label htmlFor="education-mobile" className="text-base">
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
                    <Label htmlFor="goals-mobile" className="text-base">
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

                  {/* More filters would go here */}

                  <Button className="w-full bg-[#B22222] hover:bg-[#8B0000] mt-4" onClick={handleFilterChange}>
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Filters - Desktop */}
          <div className="hidden md:block w-full md:w-1/4 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-[#B22222] mb-6">Filter Profiles</h2>

            <div className="space-y-6">
              {/* Age Range */}
              <div>
                <Label className="text-base">
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
                <Label htmlFor="education" className="text-base">
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
                <Label htmlFor="goals" className="text-base">
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

              {/* Tribe/Ethnicity */}
              <div>
                <Label htmlFor="tribe" className="text-base">
                  Tribe/Ethnicity
                </Label>
                <Input id="tribe" placeholder="Enter tribe or ethnicity" className="mt-1" />
              </div>

              {/* Has Children */}
              <div className="space-y-2">
                <Label className="text-base">Has Children</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="no-children" />
                  <Label htmlFor="no-children" className="text-sm">
                    No children
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="has-children" />
                  <Label htmlFor="has-children" className="text-sm">
                    Has children
                  </Label>
                </div>
              </div>

              <Button className="w-full bg-[#B22222] hover:bg-[#8B0000] mt-4" onClick={handleFilterChange}>
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Profile Grid */}
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold text-[#B22222] mb-6">Browse Profiles</h1>

            {filteredUsers.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-lg text-gray-600">No profiles match your current filters.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-[#B22222] text-[#B22222]"
                  onClick={() => {
                    setAgeRange([25, 45])
                    setSelectedEducation("any")
                    setSelectedGoals("any")
                    setFilteredUsers(users)
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="bg-[#DAA520]/20 p-4 flex justify-center">
                        <img
                          src={user.icon || "/placeholder.svg"}
                          alt={`${user.name}'s profile icon`}
                          className="w-32 h-32 object-cover rounded-full border-4 border-white"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <CardTitle className="text-xl text-[#B22222]">
                            {user.name}, {user.age}
                          </CardTitle>
                          <CardDescription className="text-gray-600">{user.occupation}</CardDescription>
                        </div>
                        <Badge className="bg-[#DAA520]">{user.relationshipGoals}</Badge>
                      </div>

                      <div className="mt-4 space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Education:</span> {user.education}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Tribe:</span> {user.tribe}
                        </p>
                        <p className="text-sm line-clamp-3 mt-2">{user.bio}</p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {user.interests.slice(0, 3).map((interest, index) => (
                          <Badge key={index} variant="outline" className="bg-[#F5F5F5]">
                            {interest}
                          </Badge>
                        ))}
                        {user.interests.length > 3 && (
                          <Badge variant="outline" className="bg-[#F5F5F5]">
                            +{user.interests.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-4 flex justify-between">
                      <Button
                        variant="outline"
                        className="flex-1 mr-2 border-[#B22222] text-[#B22222]"
                        onClick={() => viewProfile(user)}
                      >
                        View Profile
                      </Button>
                      <Button className="flex-1 bg-[#B22222] hover:bg-[#8B0000]">
                        <Heart size={16} className="mr-2" /> Connect
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#B22222]">{selectedUser.name}'s Profile</h2>
              <Button variant="ghost" size="icon" onClick={closeProfile}>
                <X size={20} />
              </Button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="bg-[#DAA520]/20 p-4 rounded-full">
                    <img
                      src={selectedUser.icon || "/placeholder.svg"}
                      alt={`${selectedUser.name}'s profile icon`}
                      className="w-48 h-48 object-cover rounded-full border-4 border-white"
                    />
                  </div>

                  <div className="mt-6 w-full space-y-4">
                    <Button className="w-full bg-[#B22222] hover:bg-[#8B0000]">
                      <Heart size={16} className="mr-2" /> Connect
                    </Button>
                    <Button variant="outline" className="w-full border-[#B22222] text-[#B22222]">
                      <MessageCircle size={16} className="mr-2" /> Message
                    </Button>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[#B22222]">
                        {selectedUser.name}, {selectedUser.age}
                      </h3>
                      <p className="text-gray-600">{selectedUser.occupation}</p>
                    </div>
                    <Badge className="bg-[#DAA520]">{selectedUser.relationshipGoals}</Badge>
                  </div>

                  <Tabs defaultValue="about" className="mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="interests">Interests</TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="mt-4 space-y-4">
                      <div className="bg-[#F5F5F5] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Bio</h4>
                        <p>{selectedUser.bio}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="details" className="mt-4">
                      <div className="bg-[#F5F5F5] p-4 rounded-lg space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm text-gray-500">Age</h4>
                            <p>{selectedUser.age}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-500">Education</h4>
                            <p>{selectedUser.education}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-500">Tribe/Ethnicity</h4>
                            <p>{selectedUser.tribe}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-500">Relationship Goals</h4>
                            <p>{selectedUser.relationshipGoals}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-500">Occupation</h4>
                            <p>{selectedUser.occupation}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="interests" className="mt-4">
                      <div className="bg-[#F5F5F5] p-4 rounded-lg">
                        <h4 className="font-semibold mb-4">Interests & Hobbies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedUser.interests.map((interest, index) => (
                            <Badge key={index} className="bg-[#DAA520]/20 text-[#8B4513] border-[#DAA520]">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
