"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Heart, Settings, User, MessageCircle, LogOut, Upload, X } from "lucide-react"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile")
  const [selectedIcon, setSelectedIcon] = useState(1)

  // Sample user data
  const userData = {
    name: "Your Name",
    age: 30,
    occupation: "Software Developer",
    education: "Master's Degree",
    tribe: "Yoruba",
    relationshipGoals: "Long-term relationship",
    bio: "I'm passionate about technology and building meaningful relationships. Looking for someone who shares my values and enjoys deep conversations.",
    interests: ["Technology", "Reading", "Hiking", "Cooking", "Travel", "Music"],
    children: "No children",
    healthStatus: "Healthy, non-smoker",
  }

  // Sample connections data
  const connections = [
    {
      id: 1,
      name: "Alex Johnson",
      age: 32,
      occupation: "Software Engineer",
      icon: "/images/avatar1.png",
      matchDate: "2 weeks ago",
    },
    {
      id: 2,
      name: "Amina Okafor",
      age: 28,
      occupation: "Financial Analyst",
      icon: "/images/avatar2.png",
      matchDate: "1 week ago",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={`/images/avatar${selectedIcon}.png`} alt="Your profile icon" />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-[#B22222]">{userData.name}</h2>
                  <p className="text-gray-600">{userData.occupation}</p>
                </div>

                <div className="mt-6 space-y-2">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "profile" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" /> My Profile
                  </Button>
                  <Button
                    variant={activeTab === "connections" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "connections" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => setActiveTab("connections")}
                  >
                    <Heart className="mr-2 h-4 w-4" /> My Connections
                  </Button>
                  <Button
                    variant={activeTab === "messages" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "messages" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> Messages
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "notifications" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" /> Notifications
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "settings" ? "bg-[#B22222] text-white" : ""}`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl text-[#B22222]">My Profile</CardTitle>
                        <CardDescription>Manage your profile information</CardDescription>
                      </div>
                      <Button className="bg-[#B22222] hover:bg-[#8B0000]">Save Changes</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="personal">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="personal">Personal Info</TabsTrigger>
                        <TabsTrigger value="preferences">Preferences</TabsTrigger>
                        <TabsTrigger value="icon">Profile Icon</TabsTrigger>
                      </TabsList>

                      <TabsContent value="personal" className="space-y-6 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue={userData.name} />
                          </div>
                          <div>
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" defaultValue={userData.age} />
                          </div>
                          <div>
                            <Label htmlFor="occupation">Occupation</Label>
                            <Input id="occupation" defaultValue={userData.occupation} />
                          </div>
                          <div>
                            <Label htmlFor="education">Education Level</Label>
                            <Select defaultValue={userData.education}>
                              <SelectTrigger id="education">
                                <SelectValue placeholder="Select education level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="High School">High School</SelectItem>
                                <SelectItem value="Associate's Degree">Associate's Degree</SelectItem>
                                <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                                <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                                <SelectItem value="Doctorate">Doctorate</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="tribe">Tribe/Ethnicity</Label>
                            <Input id="tribe" defaultValue={userData.tribe} />
                          </div>
                          <div>
                            <Label htmlFor="children">Children</Label>
                            <Select defaultValue={userData.children}>
                              <SelectTrigger id="children">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="No children">No children</SelectItem>
                                <SelectItem value="Have children, living with me">
                                  Have children, living with me
                                </SelectItem>
                                <SelectItem value="Have children, not living with me">
                                  Have children, not living with me
                                </SelectItem>
                                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="healthStatus">Health Status</Label>
                            <Textarea id="healthStatus" defaultValue={userData.healthStatus} rows={3} />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="bio">About Me</Label>
                            <Textarea id="bio" defaultValue={userData.bio} rows={5} />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="preferences" className="space-y-6 mt-6">
                        <div>
                          <Label htmlFor="relationshipGoals">Relationship Goals</Label>
                          <Select defaultValue={userData.relationshipGoals}>
                            <SelectTrigger id="relationshipGoals">
                              <SelectValue placeholder="Select your relationship goals" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Marriage">Marriage</SelectItem>
                              <SelectItem value="Long-term relationship">Long-term relationship</SelectItem>
                              <SelectItem value="Friendship">Friendship first</SelectItem>
                              <SelectItem value="Casual dating">Casual dating</SelectItem>
                              <SelectItem value="Undecided">Still figuring it out</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="block mb-2">Interests</Label>
                          <div className="flex flex-wrap gap-2">
                            {userData.interests.map((interest, index) => (
                              <Badge key={index} className="bg-[#DAA520]/20 text-[#8B4513] border-[#DAA520] px-3 py-1">
                                {interest} <span className="ml-2 cursor-pointer">×</span>
                              </Badge>
                            ))}
                            <div className="flex items-center">
                              <Input placeholder="Add interest" className="w-40 h-8" />
                              <Button variant="ghost" size="sm" className="ml-1 text-[#B22222]">
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label className="block mb-2">Privacy Settings</Label>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Show my profile to all users</span>
                              <div className="relative inline-block w-10 h-5 rounded-full bg-gray-200">
                                <input type="checkbox" className="sr-only" id="toggle-profile" defaultChecked />
                                <span className="block absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform duration-200 transform translate-x-4"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Allow messages from connections only</span>
                              <div className="relative inline-block w-10 h-5 rounded-full bg-gray-200">
                                <input type="checkbox" className="sr-only" id="toggle-messages" />
                                <span className="block absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform duration-200 transform"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Hide my online status</span>
                              <div className="relative inline-block w-10 h-5 rounded-full bg-gray-200">
                                <input type="checkbox" className="sr-only" id="toggle-online" />
                                <span className="block absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform duration-200 transform"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="icon" className="space-y-6 mt-6">
                        <div>
                          <Label className="block mb-4">Current Profile Icon</Label>
                          <div className="flex justify-center mb-6">
                            <Avatar className="h-40 w-40">
                              <AvatarImage src={`/images/avatar${selectedIcon}.png`} alt="Your profile icon" />
                              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>

                          <Label className="block mb-3">Choose a Different Icon</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((iconNumber) => (
                              <div
                                key={iconNumber}
                                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                                  selectedIcon === iconNumber
                                    ? "border-[#B22222] ring-2 ring-[#B22222]/50"
                                    : "border-transparent hover:border-gray-300"
                                }`}
                                onClick={() => setSelectedIcon(iconNumber)}
                              >
                                <img
                                  src={`/images/avatar${iconNumber}.png`}
                                  alt={`Profile icon ${iconNumber}`}
                                  className="w-full h-auto"
                                />
                              </div>
                            ))}
                          </div>

                          <div className="mt-6">
                            <Label className="block mb-2">Upload Custom Icon</Label>
                            <div className="flex items-center">
                              <Button variant="outline" className="mr-2">
                                <Upload className="mr-2 h-4 w-4" /> Upload Image
                              </Button>
                              <p className="text-sm text-gray-500">Supported formats: PNG, JPG, SVG (Max 2MB)</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === "connections" && (
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-[#B22222]">My Connections</CardTitle>
                    <CardDescription>People you've connected with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {connections.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">You haven't made any connections yet.</p>
                        <Button className="bg-[#B22222] hover:bg-[#8B0000]">Browse Profiles</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {connections.map((connection) => (
                          <Card key={connection.id}>
                            <CardContent className="p-6">
                              <div className="flex items-center">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={connection.icon || "/placeholder.svg"} alt={connection.name} />
                                  <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium text-lg text-[#B22222]">
                                        {connection.name}, {connection.age}
                                      </h3>
                                      <p className="text-gray-600">{connection.occupation}</p>
                                      <p className="text-sm text-gray-500">Connected {connection.matchDate}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button variant="outline" size="sm" className="border-[#B22222] text-[#B22222]">
                                        <MessageCircle className="mr-2 h-4 w-4" /> Message
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-red-600 text-red-600 hover:bg-red-50"
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
            {activeTab === "messages" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#B22222]">Messages</CardTitle>
                  <CardDescription>Your conversations</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500 mb-4">View and manage your messages with connections.</p>
                  <Button className="bg-[#B22222] hover:bg-[#8B0000]">Go to Messages</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#B22222]">Notifications</CardTitle>
                  <CardDescription>Your alerts and updates</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500 mb-4">You have no new notifications at this time.</p>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#B22222]">Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500 mb-4">Account settings and privacy options will be displayed here.</p>
                  <Button className="bg-[#B22222] hover:bg-[#8B0000]">Update Settings</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
