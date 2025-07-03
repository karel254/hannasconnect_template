"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail } from "lucide-react"

export default function VerificationPage() {
  const [email, setEmail] = useState("")

  useEffect(() => {
    // In a real app, this would come from the registration process
    const storedEmail = localStorage.getItem("email") || "your.email@example.com"
    setEmail(storedEmail)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#FF69B4]/10 p-3 rounded-full">
              <Mail className="h-10 w-10 text-[#FF69B4]" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#B22222]">Check Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">
            Please check your email and click on the verification link to complete your registration.
          </p>

          <div className="bg-[#F5F5F5] p-4 rounded-lg mb-6">
            <h3 className="font-medium text-gray-800 mb-2 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> What to expect in your email:
            </h3>
            <ul className="text-sm text-gray-600 text-left space-y-2">
              <li>• Verification link to activate your account</li>
              <li>• Your login credentials for reference</li>
              <li>• Welcome information about Hanna's Connect</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            If you don't see the email, please check your spam folder or request a new verification link.
          </p>

          <Button className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white">Resend Verification Email</Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already verified?{" "}
            <Link href="/login" className="text-[#B22222] hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
