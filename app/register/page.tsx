"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "../actions"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedIcon, setSelectedIcon] = useState("/images/avatar1.png")
  const [isRegistering, setIsRegistering] = useState(false)

  const icons = ["/images/avatar1.png", "/images/avatar2.png", "/images/avatar3.png", "/images/avatar4.png"]

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsRegistering(true)

    const formData = new FormData(event.currentTarget)
    formData.append("icon", selectedIcon)

    try {
      const result = await registerUser(formData)

      if (result.success) {
        toast({
          title: "Registration Successful",
          description: "Please check your email for verification instructions.",
        })

        // Store user info in localStorage (in a real app, this would be handled differently)
        if (typeof window !== "undefined") {
          localStorage.setItem("username", formData.get("username") as string)
          localStorage.setItem("name", formData.get("name") as string)
          localStorage.setItem("occupation", formData.get("occupation") as string)
        }

        // Redirect to verification page
        router.push("/verification")
      } else {
        toast({
          title: "Registration Failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-[#B22222] dark:text-red-400">Create an Account</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Join Hanna's Connect and find meaningful connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-gray-200">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="dark:text-gray-200">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-gray-200">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation" className="dark:text-gray-200">
                  Occupation
                </Label>
                <Input
                  id="occupation"
                  name="occupation"
                  placeholder="Enter your occupation"
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>

              <div className="space-y-3">
                <Label className="dark:text-gray-200">Choose Your Icon</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {icons.map((icon, index) => (
                    <div
                      key={index}
                      className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 aspect-square ${
                        selectedIcon === icon
                          ? "border-[#FF69B4] ring-4 ring-[#FF69B4]/30 scale-105 shadow-lg"
                          : "border-gray-200 dark:border-gray-600 hover:border-[#FF69B4]/50 hover:scale-102"
                      }`}
                      onClick={() => setSelectedIcon(icon)}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-[#FF69B4]/10 to-[#FF69B4]/5 flex items-center justify-center p-1">
                        <img
                          src={icon || "/placeholder.svg"}
                          alt={`Profile icon ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      {selectedIcon === icon && (
                        <div className="absolute inset-0 bg-[#FF69B4]/20 flex items-center justify-center">
                          <div className="bg-white rounded-full p-1 shadow-lg">
                            <svg className="w-4 h-4 text-[#FF69B4]" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white transition-all duration-200"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-[#B22222] dark:text-red-400 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#B22222] dark:text-red-400 hover:underline">
              Privacy Policy
            </Link>
          </div>
          <div className="text-center text-sm dark:text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="text-[#B22222] dark:text-red-400 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
