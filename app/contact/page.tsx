import Link from "next/link"
import { ArrowLeft, Mail, Phone, MessageCircle, Users, Briefcase, Camera, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const contactOptions = [
    {
      title: "Customer Support",
      description: "Get help with your account, technical issues, or general questions",
      icon: MessageCircle,
      color: "amber",
      response: "Within 2 hours",
      available: "24/7",
    },
    {
      title: "Feedback & Suggestions",
      description: "Share your ideas to help us improve Hanna's Connect™",
      icon: Users,
      color: "red",
      response: "Within 1 business day",
      available: "Always welcome",
    },
    {
      title: "Partnership Opportunities",
      description: "Explore business partnerships and collaboration opportunities",
      icon: Briefcase,
      color: "orange",
      response: "Within 3 business days",
      available: "Business hours",
    },
    {
      title: "Media Inquiries",
      description: "Press releases, interviews, and media-related questions",
      icon: Camera,
      color: "red",
      response: "Within 1 business day",
      available: "Business hours",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're here to help! Choose the best way to reach us based on your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Options */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Can We Help You?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon
              const colorClasses = {
                amber: "bg-amber-100 text-amber-700 border-amber-200 hover:border-amber-300",
                red: "bg-red-100 text-red-700 border-red-200 hover:border-red-300",
                orange: "bg-orange-100 text-orange-700 border-orange-200 hover:border-orange-300",
              }

              return (
                <Card
                  key={index}
                  className={`border-2 hover:shadow-lg transition-all cursor-pointer ${colorClasses[option.color as keyof typeof colorClasses]}`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses[option.color as keyof typeof colorClasses]}`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{option.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Response: {option.response}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <span>Available: {option.available}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                      <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                      <SelectItem value="media">Media Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Please describe your question or concern in detail..." rows={6} />
                </div>

                <Button type="submit" className="w-full bg-red-700 hover:bg-red-800">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h2>

              <div className="space-y-6">
                <Card className="border-2 border-amber-100">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email Support</h3>
                        <p className="text-sm text-gray-600">For general inquiries</p>
                      </div>
                    </div>
                    <p className="text-amber-700 font-medium">support@hannasconnect.com</p>
                    <p className="text-sm text-gray-500 mt-1">Response within 2 hours</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-100">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-red-100 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-red-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone Support</h3>
                        <p className="text-sm text-gray-600">For urgent matters</p>
                      </div>
                    </div>
                    <p className="text-red-700 font-medium">1-800-HANNA-CONNECT</p>
                    <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-100">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <MessageCircle className="h-6 w-6 text-orange-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Live Chat</h3>
                        <p className="text-sm text-gray-600">Instant support</p>
                      </div>
                    </div>
                    <Button className="w-full bg-orange-700 hover:bg-orange-800">Start Live Chat</Button>
                    <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Office Address</h3>
                        <p className="text-sm text-gray-600">For business inquiries</p>
                      </div>
                    </div>
                    <div className="text-gray-700">
                      <p>Hanna&apos;s Connect™ Inc.</p>
                      <p>123 Love Street, Suite 456</p>
                      <p>San Francisco, CA 94102</p>
                      <p>United States</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-800 to-amber-700 text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Looking for Quick Answers?</h2>
            <p className="text-xl mb-8 opacity-90">
              Check out our comprehensive FAQ section for instant answers to common questions.
            </p>
            <Link href="/faq">
              <Button size="lg" className="bg-white text-red-800 hover:bg-gray-100">
                Visit FAQ Section
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
