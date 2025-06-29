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
import { ArrowLeft, Camera, Newspaper, Mic, Download } from "lucide-react"

export default function MediaPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    inquiryType: "",
    deadline: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Media inquiry submitted:", formData)
    alert("Thank you for your media inquiry! Our PR team will review your request and respond within 24-48 hours.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const mediaTypes = [
    {
      icon: Newspaper,
      title: "Press Inquiries",
      description: "Journalists and reporters seeking information or interviews",
      contact: "press@hannasconnect.com",
    },
    {
      icon: Camera,
      title: "Photo/Video Requests",
      description: "Media assets, product screenshots, and promotional materials",
      contact: "media@hannasconnect.com",
    },
    {
      icon: Mic,
      title: "Interview Requests",
      description: "Podcast, radio, or TV interview opportunities with our team",
      contact: "interviews@hannasconnect.com",
    },
  ]

  const pressReleases = [
    {
      title: "Hanna's Connect Reaches 50,000 Active Users Milestone",
      date: "January 15, 2024",
      summary: "Platform celebrates significant growth in user base and successful matches.",
    },
    {
      title: "New Safety Features Launch to Enhance User Protection",
      date: "December 10, 2023",
      summary: "Advanced verification and AI-powered safety tools now available to all users.",
    },
    {
      title: "Hanna's Connect Expands to Three New Markets",
      date: "November 5, 2023",
      summary: "Dating platform now available in Canada, UK, and Australia.",
    },
  ]

  const companyStats = [
    { label: "Active Users", value: "50,000+" },
    { label: "Successful Matches", value: "1,200+" },
    { label: "Countries", value: "4" },
    { label: "Success Rate", value: "85%" },
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Media Inquiries</h1>
            <p className="text-xl text-gray-600">
              Press resources, company information, and media contact details for journalists and content creators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {mediaTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <type.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">{type.contact}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Media Inquiry Form</CardTitle>
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
                        <Label htmlFor="organization">Media Organization</Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiryType">Inquiry Type</Label>
                        <Select onValueChange={(value) => handleInputChange("inquiryType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="press">Press Release</SelectItem>
                            <SelectItem value="interview">Interview Request</SelectItem>
                            <SelectItem value="feature">Feature Story</SelectItem>
                            <SelectItem value="assets">Media Assets</SelectItem>
                            <SelectItem value="data">Company Data</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => handleInputChange("deadline", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your inquiry"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Detailed Request</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please provide details about your media request, including specific questions, required information, or interview topics..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                      Submit Media Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Press Releases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pressReleases.map((release, index) => (
                      <div key={index} className="border-l-4 border-pink-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{release.title}</h4>
                        <p className="text-sm text-gray-500 mb-2">{release.date}</p>
                        <p className="text-sm text-gray-700">{release.summary}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {companyStats.map((stat, index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-pink-600">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Media Kit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Company Logo Pack
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Executive Photos
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Product Screenshots
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Company Fact Sheet
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Contact</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <strong>PR Manager:</strong> Sarah Johnson
                    </div>
                    <div>
                      <strong>Email:</strong> media@hannasconnect.com
                    </div>
                    <div>
                      <strong>Phone:</strong> 1-800-HANNA-MEDIA
                    </div>
                    <div>
                      <strong>Response Time:</strong> 24-48 hours
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Availability</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Our executives are available for interviews about online dating trends, relationship technology, and
                    company updates.
                  </p>
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full">Schedule Interview</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
