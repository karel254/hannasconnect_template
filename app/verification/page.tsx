"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, Upload } from "lucide-react"

export default function VerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState({
    email: "verified",
    phone: "pending",
    identity: "not_started",
    photo: "verified",
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="secondary">Not Started</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Verification</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete your verification to unlock all features and build trust with other members
          </p>
        </div>

        <div className="space-y-4">
          {/* Email Verification */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(verificationStatus.email)}
                  <div>
                    <h3 className="font-semibold">Email Verification</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Verify your email address to secure your account
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">{getStatusBadge(verificationStatus.email)}</div>
              </div>
            </CardContent>
          </Card>

          {/* Phone Verification */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(verificationStatus.phone)}
                  <div>
                    <h3 className="font-semibold">Phone Verification</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Add your phone number for additional security
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(verificationStatus.phone)}
                  {verificationStatus.phone !== "verified" && (
                    <Button size="sm" variant="outline">
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Identity Verification */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(verificationStatus.identity)}
                  <div>
                    <h3 className="font-semibold">Identity Verification</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Upload a government-issued ID to verify your identity
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(verificationStatus.identity)}
                  {verificationStatus.identity !== "verified" && (
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload ID
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Verification */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(verificationStatus.photo)}
                  <div>
                    <h3 className="font-semibold">Photo Verification</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Take a selfie to verify your profile photos
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">{getStatusBadge(verificationStatus.photo)}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Verification Benefits</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Increased profile visibility</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Access to premium features</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Higher trust score with other members</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Priority customer support</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
