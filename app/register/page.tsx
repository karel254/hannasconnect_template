"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Register() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    occupation: "",
  })

  const avatarOptions = [
    { id: 1, src: "/images/avatar1.png", alt: "Avatar 1" },
    { id: 2, src: "/images/avatar2.png", alt: "Avatar 2" },
    { id: 3, src: "/images/avatar3.png", alt: "Avatar 3" },
    { id: 4, src: "/images/avatar4.png", alt: "Avatar 4" },
    { id: 5, src: "/placeholder.svg?height=100&width=100", alt: "Avatar 5" },
    { id: 6, src: "/placeholder.svg?height=100&width=100", alt: "Avatar 6" },
    { id: 7, src: "/placeholder.svg?height=100&width=100", alt: "Avatar 7" },
    { id: 8, src: "/placeholder.svg?height=100&width=100", alt: "Avatar 8" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAvatarSelect = (avatarId: number) => {
    setSelectedAvatar(avatarId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.username || !formData.occupation) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!selectedAvatar) {
      toast({
        title: "Error",
        description: "Please select an avatar.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store user data
    const userData = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      occupation: formData.occupation,
      avatar: selectedAvatar,
      registeredAt: new Date().toISOString(),
    }

    localStorage.setItem("demoUser", JSON.stringify(userData))
    localStorage.setItem("username", formData.username)
    localStorage.setItem("name", formData.name)
    localStorage.setItem("occupation", formData.occupation)
    localStorage.setItem("selectedIcon", selectedAvatar.toString())

    toast({
      title: "Success!",
      description: "Your account has been created successfully.",
    })

    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <CardTitle className="text-2xl font-bold text-[#B22222]">Create Account</CardTitle>
              <CardDescription>Join Hanna's Connect today</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation *</Label>
              <Input
                id="occupation"
                name="occupation"
                type="text"
                placeholder="Software Engineer"
                value={formData.occupation}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Avatar Selection */}
            <div className="space-y-3">
              <Label>Choose Your Avatar *</Label>
              <div className="grid grid-cols-4 gap-3">
                {avatarOptions.map((avatar) => (
                  <div
                    key={avatar.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 aspect-square ${
                      selectedAvatar === avatar.id
                        ? "border-[#B22222] ring-2 ring-[#B22222]/50 scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:scale-102"
                    }`}
                    onClick={() => handleAvatarSelect(avatar.id)}
                  >
                    <Avatar className="w-full h-full rounded-lg">
                      <AvatarImage src={avatar.src || "/placeholder.svg"} alt={avatar.alt} className="object-cover" />
                      <AvatarFallback className="text-xs">A{avatar.id}</AvatarFallback>
                    </Avatar>
                    {selectedAvatar === avatar.id && (
                      <div className="absolute inset-0 bg-[#B22222]/20 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-[#B22222]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-[#B22222] hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
