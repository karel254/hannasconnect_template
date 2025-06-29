import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Shield, Award, ArrowRight } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Authentic Connections",
      description: "We believe in fostering genuine relationships built on shared values and mutual respect.",
    },
    {
      icon: Users,
      title: "Inclusive Community",
      description: "Our platform welcomes people from all backgrounds, orientations, and walks of life.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "User safety and privacy are our top priorities in everything we do.",
    },
    {
      icon: Award,
      title: "Quality Over Quantity",
      description: "We focus on meaningful matches rather than endless swiping.",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Active Users" },
    { number: "1,200+", label: "Success Stories" },
    { number: "85%", label: "Match Success Rate" },
    { number: "4", label: "Countries" },
  ]

  const team = [
    {
      name: "Hanna Rodriguez",
      role: "Founder & CEO",
      bio: "Former relationship counselor with 10+ years helping people find love.",
      image: "/images/avatar1.png",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech veteran focused on building safe, user-friendly dating platforms.",
      image: "/images/avatar2.png",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Safety",
      bio: "Expert in online safety and user protection with psychology background.",
      image: "/images/avatar3.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Hanna's Connect</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're on a mission to help people find meaningful, lasting relationships through authentic connections and
            innovative matching technology.
          </p>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Hanna's Connect was born from a simple belief: everyone deserves to find love. After years of working
                  as a relationship counselor, our founder Hanna Rodriguez noticed that traditional dating apps were
                  failing to create lasting connections.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Too many people were getting lost in endless swiping, superficial matches, and meaningless
                  conversations. We knew there had to be a better way - one that prioritized compatibility,
                  authenticity, and genuine connection over quick hookups.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  That's why we created Hanna's Connect: a platform that uses advanced psychology and AI to match people
                  based on deep compatibility, shared values, and relationship goals.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/images/hero-couple.jpg"
                  alt="Happy couple"
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of people who have found meaningful relationships through Hanna's Connect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/success-stories">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-pink-600 bg-transparent"
                  >
                    Read Success Stories
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
