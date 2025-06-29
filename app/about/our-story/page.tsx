import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Users, Award, Globe } from "lucide-react"

export default function OurStoryPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h1>
            <p className="text-xl text-gray-600">
              The journey that led to creating meaningful connections for thousands of people.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Heart className="h-8 w-8 text-pink-500 mr-4" />
                    <h2 className="text-2xl font-bold text-gray-900">The Beginning</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Hanna's Connect was born from a simple belief: everyone deserves to find meaningful love and
                    connection. Founded in 2020 by Hanna Martinez, our platform emerged from her personal journey
                    through the world of online dating and the realization that existing platforms were missing
                    something crucial - genuine human connection.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    After experiencing the frustration of superficial matches and endless swiping, Hanna envisioned a
                    platform that would prioritize compatibility, shared values, and authentic relationships over quick
                    hookups and surface-level attractions.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Users className="h-8 w-8 text-purple-500 mr-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Building Community</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    What started as a small platform for friends and family quickly grew into a thriving community. We
                    realized that dating isn't just about finding "the one" - it's about building connections,
                    friendships, and a support network that enriches your entire life.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our community-first approach means we host regular events, provide relationship coaching, and create
                    safe spaces for people to share their experiences and support each other's journeys.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Award className="h-8 w-8 text-green-500 mr-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Our Achievements</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">50,000+ Active Users</h3>
                      <p className="text-gray-600 text-sm">
                        Growing community of genuine people seeking meaningful connections.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">1,200+ Success Stories</h3>
                      <p className="text-gray-600 text-sm">Real couples who found love through our platform.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">95% User Satisfaction</h3>
                      <p className="text-gray-600 text-sm">
                        Consistently high ratings for user experience and support.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                      <p className="text-gray-600 text-sm">Dedicated team ensuring safe and positive experiences.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Globe className="h-8 w-8 text-blue-500 mr-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Looking Forward</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    As we continue to grow, our mission remains the same: to create a world where finding love is
                    accessible, safe, and meaningful for everyone. We're constantly innovating, listening to our
                    community, and improving our platform to serve you better.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The future holds exciting developments including AI-powered compatibility matching, virtual reality
                    dates, and expanded community features. But through it all, we'll never lose sight of what makes us
                    special - putting human connection first.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
