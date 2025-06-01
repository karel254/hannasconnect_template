"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-[#B22222]">Create an Account</CardTitle>
          <CardDescription>Join Hanna's Connect and find meaningful connections</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Enter your full name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="Choose a username" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Create a password" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input id="occupation" name="occupation" placeholder="Enter your occupation" required />
              </div>

              <div className="space-y-2">
                <Label>Choose Your Icon</Label>
                <div className="grid grid-cols-4 gap-4 mt-2">
                  {icons.map((icon, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-lg p-2 ${
                        selectedIcon === icon ? "bg-[#FF69B4]/20 ring-2 ring-[#FF69B4]" : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedIcon(icon)}
                    >
                      <Avatar className="h-16 w-16 mx-auto">
                        <AvatarImage src={icon || "/placeholder.svg"} alt={`Icon option ${index + 1}`} />
                        <AvatarFallback>{index + 1}</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white"
                disabled={isRegistering}
              >
                {isRegistering ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-500">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-[#B22222] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#B22222] hover:underline">
              Privacy Policy
            </Link>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#B22222] hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
