"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Star, Users, TrendingUp, Calendar } from "lucide-react"

export default function Dashboard() {
  const [stats] = useState({
    profileViews: 127,
    matches: 8,
    messages: 23,
    likes: 45,
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Here's what's happening with your profile</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.profileViews}</div>
              <div className="text-sm text-gray-600">Profile Views</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.matches}</div>
              <div className="text-sm text-gray-600">Matches</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.messages}</div>
              <div className="text-sm text-gray-600">Messages</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.likes}</div>
              <div className="text-sm text-gray-600">Likes Received</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest interactions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">New match with Sarah!</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <Badge variant="secondary">New</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">3 new messages</p>
                  <p className="text-sm text-gray-600">5 hours ago</p>
                </div>
              </div>
              <Badge variant="secondary">3</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">15 profile views today</p>
                  <p className="text-sm text-gray-600">1 day ago</p>
                </div>
              </div>
              <Badge variant="outline">Popular</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these popular features</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" variant="outline">
              <Users className="w-6 h-6" />
              <span>Browse Profiles</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" variant="outline">
              <MessageCircle className="w-6 h-6" />
              <span>Check Messages</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" variant="outline">
              <Calendar className="w-6 h-6" />
              <span>Plan a Date</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
