import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react"

export default function CommunityPage() {
  const events = [
    {
      id: 1,
      title: "Singles Mixer: Wine & Dine",
      date: "February 14, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Downtown Wine Bar, NYC",
      attendees: 45,
      description: "Join us for an elegant evening of wine tasting and meaningful conversations.",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Speed Dating Event",
      date: "February 20, 2024",
      time: "6:30 PM - 9:00 PM",
      location: "Community Center, LA",
      attendees: 32,
      description: "Meet multiple potential matches in a fun, structured environment.",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Couples Game Night",
      date: "January 28, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Board Game Cafe, Chicago",
      attendees: 28,
      description: "A fun evening for couples to connect and play games together.",
      status: "past",
    },
  ]

  const communityStats = [
    { label: "Active Members", value: "50,000+" },
    { label: "Events This Month", value: "25" },
    { label: "Success Stories", value: "1,200+" },
    { label: "Cities", value: "150+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </nav>

        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-500 hover:bg-blue-600">Community</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Events</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with like-minded singles and couples in your area through our exciting community events.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-pink-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Events */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="space-y-6">
            {events
              .filter((event) => event.status === "upcoming")
              .map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-8 text-center">
                        <div className="flex items-center justify-center mb-2 text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-1" />
                          {event.attendees} attending
                        </div>
                        <Button className="bg-pink-500 hover:bg-pink-600">Join Event</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Past Events */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>
          <div className="space-y-4">
            {events
              .filter((event) => event.status === "past")
              .map((event) => (
                <Card key={event.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {event.date}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {event.attendees} attended
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Join Community CTA */}
        <section className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Be the first to know about upcoming events and connect with amazing people in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-pink-500 hover:bg-pink-600">Join Community</Button>
            <Button variant="outline">Host an Event</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
