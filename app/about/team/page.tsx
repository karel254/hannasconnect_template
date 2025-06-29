import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Linkedin, Twitter, Mail } from "lucide-react"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Hanna Martinez",
      role: "Founder & CEO",
      bio: "Passionate about connecting hearts and building meaningful relationships. 10+ years in tech and psychology.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      twitter: "#",
      email: "hanna@hannasconnect.com",
    },
    {
      name: "David Chen",
      role: "CTO",
      bio: "Tech visionary with expertise in AI and machine learning. Former Google engineer with a passion for innovation.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      twitter: "#",
      email: "david@hannasconnect.com",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Community",
      bio: "Community builder and relationship coach. Dedicated to creating safe spaces for authentic connections.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      twitter: "#",
      email: "sarah@hannasconnect.com",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      bio: "UX expert focused on creating intuitive and meaningful user experiences. Former design lead at top dating apps.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      twitter: "#",
      email: "michael@hannasconnect.com",
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

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The passionate individuals behind Hanna's Connect, dedicated to helping you find meaningful connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-pink-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.linkedin}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={member.twitter}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-400 hover:text-pink-600 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-16 bg-white rounded-lg p-8 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-gray-600 mb-6">
            We're always looking for passionate individuals who share our mission of connecting hearts and building
            meaningful relationships.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            View Open Positions
          </Link>
        </section>
      </div>
    </div>
  )
}
