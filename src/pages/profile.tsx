"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Camera, MapPin, Briefcase, GraduationCap, Settings, Bell, Shield, Eye } from "lucide-react"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    age: 28,
    location: "New York, NY",
    profession: "Software Engineer",
    education: "MIT",
    bio: "Passionate about technology, love hiking and trying new restaurants. Looking for someone to share adventures with!",
    interests: ["Technology", "Hiking", "Food", "Travel", "Photography", "Music"],
  })

  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    likes: false,
    profileViews: true,
    marketing: false,
  })

  const [privacy, setPrivacy] = useState({
    showAge: true,
    showLocation: true,
    showLastSeen: false,
    allowMessages: true,
    publicProfile: true,
  })

  const availableInterests = [
    "Technology",
    "Hiking",
    "Food",
    "Travel",
    "Photography",
    "Music",
    "Sports",
    "Art",
    "Reading",
    "Movies",
    "Gaming",
    "Fitness",
    "Cooking",
    "Dancing",
    "Yoga",
    "Swimming",
    "Running",
    "Cycling",
  ]

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, this would save to backend
  }

  const toggleInterest = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your dating profile</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Photo */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block">
                  <img
                    src="/images/avatar1.jpg"
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mx-auto"
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-[#B22222] hover:bg-[#A01E1E]"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">{profile.name}</h2>
                <p className="text-gray-600">{profile.age} years old</p>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Basic Information</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Age</label>
                        <Input
                          type="number"
                          value={profile.age}
                          onChange={(e) => setProfile({ ...profile, age: Number.parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Profession</label>
                      <Input
                        value={profile.profession}
                        onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Education</label>
                      <Input
                        value={profile.education}
                        onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleSave} className="bg-[#B22222] hover:bg-[#A01E1E]">
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{profile.profession}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{profile.education}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    placeholder="Tell others about yourself..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Interests</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Select your interests:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableInterests.map((interest) => (
                        <div key={interest} className="flex items-center space-x-3">
                          <Checkbox
                            id={`interest-${interest}`}
                            checked={profile.interests.includes(interest)}
                            onCheckedChange={() => toggleInterest(interest)}
                          />
                          <label
                            htmlFor={`interest-${interest}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {interest}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Profile Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#B22222]">127</div>
                    <div className="text-sm text-gray-600">Profile Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#B22222]">45</div>
                    <div className="text-sm text-gray-600">Likes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#B22222]">8</div>
                    <div className="text-sm text-gray-600">Matches</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="new-matches"
                        checked={notifications.newMatches}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, newMatches: checked as boolean }))
                        }
                      />
                      <label htmlFor="new-matches" className="text-sm font-medium cursor-pointer">
                        New matches
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="messages"
                        checked={notifications.messages}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, messages: checked as boolean }))
                        }
                      />
                      <label htmlFor="messages" className="text-sm font-medium cursor-pointer">
                        New messages
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="likes"
                        checked={notifications.likes}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, likes: checked as boolean }))
                        }
                      />
                      <label htmlFor="likes" className="text-sm font-medium cursor-pointer">
                        Someone likes you
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="profile-views"
                        checked={notifications.profileViews}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, profileViews: checked as boolean }))
                        }
                      />
                      <label htmlFor="profile-views" className="text-sm font-medium cursor-pointer">
                        Profile views
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="marketing"
                        checked={notifications.marketing}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, marketing: checked as boolean }))
                        }
                      />
                      <label htmlFor="marketing" className="text-sm font-medium cursor-pointer">
                        Marketing emails
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="show-age"
                        checked={privacy.showAge}
                        onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showAge: checked as boolean }))}
                      />
                      <label htmlFor="show-age" className="text-sm font-medium cursor-pointer">
                        Show my age
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="show-location"
                        checked={privacy.showLocation}
                        onCheckedChange={(checked) =>
                          setPrivacy((prev) => ({ ...prev, showLocation: checked as boolean }))
                        }
                      />
                      <label htmlFor="show-location" className="text-sm font-medium cursor-pointer">
                        Show my location
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="show-last-seen"
                        checked={privacy.showLastSeen}
                        onCheckedChange={(checked) =>
                          setPrivacy((prev) => ({ ...prev, showLastSeen: checked as boolean }))
                        }
                      />
                      <label htmlFor="show-last-seen" className="text-sm font-medium cursor-pointer">
                        Show when I was last active
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="allow-messages"
                        checked={privacy.allowMessages}
                        onCheckedChange={(checked) =>
                          setPrivacy((prev) => ({ ...prev, allowMessages: checked as boolean }))
                        }
                      />
                      <label htmlFor="allow-messages" className="text-sm font-medium cursor-pointer">
                        Allow messages from matches
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="public-profile"
                        checked={privacy.publicProfile}
                        onCheckedChange={(checked) =>
                          setPrivacy((prev) => ({ ...prev, publicProfile: checked as boolean }))
                        }
                      />
                      <label htmlFor="public-profile" className="text-sm font-medium cursor-pointer">
                        Make my profile discoverable
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  Privacy Policy
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
