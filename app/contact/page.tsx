import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail, Users, Handshake, Camera, ArrowRight } from "lucide-react"

export default function ContactPage() {
  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Customer Support",
      description: "Get help with your account, technical issues, or general questions",
      link: "/contact/support",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: Mail,
      title: "Feedback & Suggestions",
      description: "Share your thoughts, ideas, or report bugs to help us improve",
      link: "/contact/feedback",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      icon: Handshake,
      title: "Business Partnerships",
      description: "Explore partnership opportunities and business collaborations",
      link: "/contact/partnerships",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      icon: Camera,
      title: "Media Inquiries",
      description: "Press resources, interviews, and media kit for journalists",
      link: "/contact/media",
      color: "text-pink-500",
      bgColor: "bg-pink-100",
    },
  ]

  const quickContacts = [
    {
      type: "General Support",
      email: "support@hannasconnect.com",
      phone: "1-800-HANNA-CONNECT",
      hours: "24/7 Available",
    },
    {
      type: "Business Inquiries",
      email: "business@hannasconnect.com",
      phone: "1-800-HANNA-BIZ",
      hours: "Mon-Fri 9AM-6PM EST",
    },
    {
      type: "Media Relations",
      email: "media@hannasconnect.com",
      phone: "1-800-HANNA-MEDIA",
      hours: "Mon-Fri 9AM-5PM EST",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're here to help! Choose the best way to get in touch with our team based on your needs.
          </p>
        </section>

        {/* Contact Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How Can We Help?</h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactOptions.map((option, index) => (
              <Link key={index} href={option.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`${option.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                    >
                      <option.icon className={`h-8 w-8 ${option.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{option.title}</h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Contact Info */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quick Contact Information</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {quickContacts.map((contact, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{contact.type}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <a href={`mailto:${contact.email}`} className="text-pink-600 hover:text-pink-700">
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <a href={`tel:${contact.phone}`} className="text-pink-600 hover:text-pink-700">
                          {contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">{contact.hours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Office Information */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Office</h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Headquarters</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>Hanna's Connect Inc.</p>
                      <p>123 Love Street, Suite 456</p>
                      <p>San Francisco, CA 94102</p>
                      <p>United States</p>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                        <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Users className="h-16 w-16 mx-auto mb-4" />
                      <p>Interactive Map</p>
                      <p className="text-sm">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
              <p className="text-xl mb-8 opacity-90">
                Our support team is available 24/7 to help you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact/support">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                    Start Live Chat
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-pink-600 bg-transparent"
                  >
                    Browse FAQ
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
