"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, X, MapPin, Briefcase, GraduationCap } from "lucide-react"

export default function Browse() {
  const [currentProfile, setCurrentProfile] = useState(0)

  const profiles = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 28,
      location: "New York, NY",
      profession: "Marketing Manager",
      education: "Columbia University",
      bio: "Love hiking, coffee, and good conversations. Looking for someone genuine to explore the city with!",
      images: ["/images/avatar1.jpg"],
      interests: ["Hiking", "Coffee", "Travel", "Photography"],
    },
    {
      id: 2,
      name: "Emily Chen",
      age: 26,
      location: "San Francisco, CA",
      profession: "Software Engineer",
      education: "Stanford University",
      bio: "Tech enthusiast by day, foodie by night. Let's grab dinner and talk about our favorite apps!",
      images: ["/images/avatar2.jpg"],
      interests: ["Technology", "Food", "Cooking", "Gaming"],
    },
    {
      id: 3,
      name: "Jessica Williams",
      age: 30,
      location: "Los Angeles, CA",
      profession: "Graphic Designer",
      education: "Art Center College",
      bio: "Creative soul looking for someone who appreciates art, music, and spontaneous adventures.",
      images: ["/images/avatar3.jpg"],
      interests: ["Art", "Music", "Design", "Adventure"],
    },
  ]

  const handleLike = () => {
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile(currentProfile + 1)
    } else {
      setCurrentProfile(0)
    }
  }

  const handlePass = () => {
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile(currentProfile + 1)
    } else {
      setCurrentProfile(0)
    }
  }

  const profile = profiles[currentProfile]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Discover</h1>
          <p className="text-gray-600">Find your perfect match</p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden shadow-lg">
          <div className="relative">
            <img
              src={profile.images[0] || "/placeholder.svg"}
              alt={profile.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h2 className="text-2xl font-bold text-white mb-1">
                {profile.name}, {profile.age}
              </h2>
              <div className="flex items-center text-white/90 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{profile.location}</span>
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-4 h-4 mr-2" />
                <span className="text-sm">{profile.profession}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <GraduationCap className="w-4 h-4 mr-2" />
                <span className="text-sm">{profile.education}</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-6 pb-6">
          <Button
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-red-300 hover:bg-red-50 bg-transparent"
            onClick={handlePass}
          >
            <X className="w-6 h-6 text-gray-600 hover:text-red-500" />
          </Button>
          <Button size="lg" className="w-16 h-16 rounded-full bg-[#B22222] hover:bg-[#A01E1E]" onClick={handleLike}>
            <Heart className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}
