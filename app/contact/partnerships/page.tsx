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
import { ArrowLeft, Handshake, Building, Users, Zap } from "lucide-react"

export default function PartnershipsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    title: "",
    partnershipType: "",
    description: "",
    website: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Partnership inquiry submitted:", formData)
    alert(
      "Thank you for your partnership inquiry! Our business development team will review your proposal and get back to you within 3-5 business days.",
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const partnershipTypes = [
    {
      icon: Building,
      title: "Corporate Partnerships",
      description: "Employee benefits, wellness programs, and corporate dating services",
      examples: ["Employee dating benefits", "Corporate wellness programs", "Team building events"],
    },
    {
      icon: Users,
      title: "Event Partnerships",
      description: "Collaborate on dating events, mixers, and community gatherings",
      examples: ["Speed dating events", "Singles mixers", "Community workshops"],
    },
    {
      icon: Zap,
      title: "Technology Integration",
      description: "API partnerships, white-label solutions, and technical collaborations",
      examples: ["API integrations", "White-label platforms", "Technical partnerships"],
    },
    {
      icon: Handshake,
      title: "Brand Collaborations",
      description: "Marketing partnerships, co-branding opportunities, and cross-promotions",
      examples: ["Co-marketing campaigns", "Brand collaborations", "Affiliate programs"],
    },
  ]

  const currentPartners = [
    { name: "Local Event Venues", type: "Event Partners" },
    { name: "Relationship Coaches", type: "Service Partners" },
    { name: "Dating Safety Organizations", type: "Safety Partners" },
    { name: "Corporate Wellness Programs", type: "Corporate Partners" },
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Partnership Opportunities</h1>
            <p className="text-xl text-gray-600">
              Join us in creating meaningful connections and building a better dating experience for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {partnershipTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <type.icon className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    {type.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex}>• {example}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Partnership Inquiry</CardTitle>
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
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="partnershipType">Partnership Type</Label>
                        <Select onValueChange={(value) => handleInputChange("partnershipType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select partnership type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corporate">Corporate Partnership</SelectItem>
                            <SelectItem value="event">Event Partnership</SelectItem>
                            <SelectItem value="technology">Technology Integration</SelectItem>
                            <SelectItem value="brand">Brand Collaboration</SelectItem>
                            <SelectItem value="affiliate">Affiliate Program</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="website">Company Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Partnership Proposal</Label>
                      <Textarea
                        id="description"
                        rows={6}
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Please describe your partnership proposal, including goals, expected outcomes, and how it would benefit both parties..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                      Submit Partnership Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Partner with Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      50,000+ active, engaged users
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      High-quality, verified user base
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Strong brand reputation and trust
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Innovative technology platform
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Commitment to user safety and success
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span>
                      Growing market presence
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentPartners.map((partner, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900">{partner.name}</span>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">{partner.type}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
                <CardContent className="p-6 text-center">
                  <Handshake className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Partner?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Let's explore how we can work together to create meaningful connections and grow our businesses.
                  </p>
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>Response Time:</strong> 3-5 business days
                    </div>
                    <div>
                      <strong>Contact:</strong> partnerships@hannasconnect.com
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
