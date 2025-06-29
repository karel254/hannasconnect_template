"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MessageSquare, Lightbulb, Star, ThumbsUp } from "lucide-react"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    rating: "",
    subject: "",
    feedback: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Feedback submitted:", formData)
    alert("Thank you for your feedback! We appreciate your input and will use it to improve our platform.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const feedbackTypes = [
    {
      icon: ThumbsUp,
      title: "General Feedback",
      description: "Share your overall experience with Hanna's Connect",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: Lightbulb,
      title: "Feature Request",
      description: "Suggest new features or improvements",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      icon: Star,
      title: "Success Story",
      description: "Share your dating success story with us",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      icon: MessageSquare,
      title: "Bug Report",
      description: "Report technical issues or problems",
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link href="/contact" className="inline-flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contact
          </Link>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Share Your Feedback</h1>
            <p className="text-xl text-gray-600">
              Your feedback helps us improve Hanna's Connect and create better experiences for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {feedbackTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div
                    className={`${type.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                  >
                    <type.icon className={`h-8 w-8 ${type.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Your Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">Feedback Type</Label>
                        <Select onValueChange={(value) => handleInputChange("type", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select feedback type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Feedback</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="success">Success Story</SelectItem>
                            <SelectItem value="bug">Bug Report</SelectItem>
                            <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="rating">Overall Rating</Label>
                        <Select onValueChange={(value) => handleInputChange("rating", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Rate your experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                            <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                            <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                            <SelectItem value="2">⭐⭐ Poor</SelectItem>
                            <SelectItem value="1">⭐ Very Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief summary of your feedback"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="feedback">Your Feedback</Label>
                      <Textarea
                        id="feedback"
                        rows={6}
                        value={formData.feedback}
                        onChange={(e) => handleInputChange("feedback", e.target.value)}
                        placeholder="Please share your detailed feedback, suggestions, or experience..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                      Submit Feedback
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Your Feedback Matters</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Helps us improve the user experience
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Guides our feature development priorities
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Identifies and fixes technical issues
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Inspires other users with success stories
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Shapes the future of online dating
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Success Story</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Found love through Hanna's Connect? We'd love to feature your story and inspire others!
                  </p>
                  <Link href="/blog/success-stories">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Success Stories
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Improvements</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Enhanced matching algorithm
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Improved mobile app performance
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      New safety features added
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Better profile verification
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
