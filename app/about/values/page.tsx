import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Shield, Users, Lightbulb, Globe, Award } from "lucide-react"

export default function ValuesPage() {
  const coreValues = [
    {
      icon: Heart,
      title: "Love First",
      description:
        "Every decision we make is guided by our commitment to helping people find genuine love and connection.",
      details:
        "We prioritize meaningful relationships over quick matches, focusing on compatibility and shared values.",
    },
    {
      icon: Shield,
      title: "Safety & Trust",
      description: "Creating a secure environment where users feel protected and can be their authentic selves.",
      details: "Advanced verification systems, 24/7 moderation, and strict community guidelines ensure user safety.",
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "Celebrating diversity and welcoming people from all backgrounds, orientations, and life stages.",
      details: "Our platform is designed to be accessible and welcoming to everyone seeking meaningful connections.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously evolving our platform with cutting-edge technology and user-centered design.",
      details: "AI-powered matching, advanced compatibility algorithms, and intuitive user experiences.",
    },
    {
      icon: Globe,
      title: "Community",
      description: "Building a supportive network where members help each other on their journey to find love.",
      details: "Regular events, support groups, and mentorship programs foster genuine community connections.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Striving for the highest standards in everything we do, from user experience to customer support.",
      details: "Continuous improvement, user feedback integration, and commitment to delivering exceptional service.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link href="/about" className="inline-flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to About Us
          </Link>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape the Hanna's Connect experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {coreValues.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="bg-pink-100 rounded-full p-3 mr-4">
                      <value.icon className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">{value.description}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="mb-12">
            <Card className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold mb-6 text-center">Living Our Values</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">In Our Product</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Advanced matching algorithms prioritize compatibility</li>
                      <li>• Comprehensive safety features and verification</li>
                      <li>• Inclusive design for all users and preferences</li>
                      <li>• Continuous innovation based on user feedback</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">In Our Community</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Regular events and meetups for members</li>
                      <li>• 24/7 customer support and community moderation</li>
                      <li>• Educational content and relationship resources</li>
                      <li>• Success story celebrations and member spotlights</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="p-8">
              <CardContent className="p-0 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Values in Action</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Our values aren't just words on a page - they're the foundation of every feature we build, every
                  interaction we facilitate, and every success story we celebrate.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-pink-600 mb-2">50,000+</div>
                    <div className="text-sm text-gray-600">Happy Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 mb-2">1,200+</div>
                    <div className="text-sm text-gray-600">Success Stories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-2">95%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
