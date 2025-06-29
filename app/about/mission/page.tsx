import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Shield, Users, Zap } from "lucide-react"

export default function MissionPage() {
  const values = [
    {
      icon: Heart,
      title: "Authentic Connections",
      description:
        "We believe in fostering genuine relationships built on shared values, interests, and mutual respect.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Creating a secure environment where users can explore connections without fear or harassment.",
    },
    {
      icon: Users,
      title: "Inclusive Community",
      description:
        "Welcoming people from all backgrounds, orientations, and walks of life to find their perfect match.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously improving our platform with cutting-edge technology and user-centered design.",
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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h1>
            <p className="text-xl text-gray-600">
              Empowering meaningful connections that transform lives and build lasting relationships.
            </p>
          </div>

          <section className="mb-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What We Stand For</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  At Hanna's Connect, our mission is to revolutionize the way people find love and build meaningful
                  relationships. We believe that everyone deserves to experience genuine connection, regardless of their
                  background, age, or previous dating experiences.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We're not just another dating app - we're a community dedicated to fostering authentic relationships
                  that stand the test of time. Our platform combines advanced matching technology with human insight to
                  create connections that go beyond surface-level attraction.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="bg-pink-100 rounded-full p-3 mr-4">
                        <value.icon className="h-6 w-6 text-pink-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <Card className="p-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <CardContent className="p-0 text-center">
                <h2 className="text-2xl font-bold mb-4">Our Vision for the Future</h2>
                <p className="text-lg leading-relaxed mb-6">
                  We envision a world where finding love is accessible, safe, and meaningful for everyone. A world where
                  technology enhances human connection rather than replacing it, and where every person has the
                  opportunity to find their perfect match.
                </p>
                <p className="text-lg leading-relaxed">
                  Through continuous innovation, community building, and unwavering commitment to our users' happiness,
                  we're working to make this vision a reality, one connection at a time.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="p-8">
              <CardContent className="p-0 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  Ready to be part of a community that values authentic connections and meaningful relationships?
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                >
                  Start Your Journey
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
