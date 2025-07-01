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
import { CheckCircle, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Register() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    occupation: "",
    selectedIcon: 1,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleIconSelect = (iconNumber: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedIcon: iconNumber,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
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

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store user data in localStorage (in a real app, this would be sent to a server)
    const userData = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      occupation: formData.occupation,
      selectedIcon: formData.selectedIcon,
      avatar: `/images/avatar${formData.selectedIcon}.jpg`,
    }

    localStorage.setItem("demoUser", JSON.stringify(userData))
    localStorage.setItem("username", formData.username)
    localStorage.setItem("name", formData.name)
    localStorage.setItem("occupation", formData.occupation)
    localStorage.setItem("selectedIcon", formData.selectedIcon.toString())

    toast({
      title: "Registration Successful!",
      description: "Welcome to Hanna's Connect! Your account has been created.",
    })

    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#B22222] dark:text-red-400">Join Hanna's Connect</CardTitle>
          <CardDescription className="dark:text-gray-400">Create your account to start connecting</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium dark:text-gray-200">Choose Your Profile Icon</Label>
              <div className="flex justify-center mb-4">
                <Avatar className="h-20 w-20 ring-2 ring-[#B22222]/20 dark:ring-red-400/20">
                  <AvatarImage src={`/images/avatar${formData.selectedIcon}.jpg`} alt="Selected avatar" />
                  <AvatarFallback className="text-lg font-bold text-[#B22222] dark:text-red-400">
                    {formData.name.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((iconNumber) => (
                  <div
                    key={iconNumber}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all aspect-square ${
                      formData.selectedIcon === iconNumber
                        ? "border-[#B22222] dark:border-red-400 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                    onClick={() => handleIconSelect(iconNumber)}
                  >
                    <img
                      src={`/images/avatar${iconNumber}.jpg`}
                      alt={`Avatar ${iconNumber}`}
                      className="w-full h-full object-cover"
                    />
                    {formData.selectedIcon === iconNumber && (
                      <div className="absolute inset-0 bg-[#B22222]/10 dark:bg-red-400/10 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-[#B22222] dark:text-red-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-gray-200">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="dark:text-gray-200">
                Username *
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation" className="dark:text-gray-200">
                Occupation *
              </Label>
              <Input
                id="occupation"
                name="occupation"
                type="text"
                placeholder="What do you do for work?"
                value={formData.occupation}
                onChange={handleInputChange}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-200">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="dark:text-gray-200">
                Password *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent dark:hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="dark:text-gray-200">
                Confirm Password *
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent dark:hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-[#B22222] dark:text-red-400 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
