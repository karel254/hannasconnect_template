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
import { ArrowLeft, MessageCircle, Phone, Mail, Clock } from "lucide-react"

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Support form submitted:", formData)
    alert("Thank you for contacting us! We'll get back to you within 24 hours.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 Available",
      action: "Start Chat",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call Now",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "Response within 24 hours",
      action: "Send Email",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ]

  const commonIssues = [
    { title: "Account Login Issues", link: "/faq/account" },
    { title: "Billing Questions", link: "/faq/billing" },
    { title: "Matching Problems", link: "/faq/matching" },
    { title: "Profile Verification", link: "/faq/account" },
    { title: "Safety Concerns", link: "/how-it-works/safety" },
    { title: "Technical Issues", link: "/faq/general" },
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Support</h1>
            <p className="text-xl text-gray-600">
              We're here to help! Choose the best way to get in touch with our support team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {supportOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div
                    className={`${option.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                  >
                    <option.icon className={`h-8 w-8 ${option.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-3">{option.description}</p>
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    {option.availability}
                  </div>
                  <Button className="w-full bg-pink-500 hover:bg-pink-600">{option.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
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

                    <div>
                      <Label htmlFor="category">Issue Category</Label>
                      <Select onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="account">Account Issues</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="matching">Matching Problems</SelectItem>
                          <SelectItem value="technical">Technical Issues</SelectItem>
                          <SelectItem value="safety">Safety Concerns</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please describe your issue in detail..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Common Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {commonIssues.map((issue, index) => (
                      <Link
                        key={index}
                        href={issue.link}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm text-gray-700 hover:text-pink-600">{issue.title}</span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Support</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Premium members get priority support with faster response times and dedicated assistance.
                  </p>
                  <Link href="/how-it-works/premium">
                    <Button variant="outline" className="w-full bg-transparent">
                      Learn About Premium
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div>
                      <strong>Email:</strong> support@hannasconnect.com
                    </div>
                    <div>
                      <strong>Phone:</strong> 1-800-HANNA-CONNECT
                    </div>
                    <div>
                      <strong>Hours:</strong> 24/7 Chat, Phone Mon-Fri 9AM-6PM EST
                    </div>
                    <div>
                      <strong>Response Time:</strong> Within 24 hours
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
