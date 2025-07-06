import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, MapPin, Quote, ArrowRight } from "lucide-react"

export default function SuccessStoriesPage() {
  const stories = [
    {
      names: "Sarah & Michael",
      location: "New York, NY",
      duration: "Together 2 years",
      image: "/images/hero-couple.jpg",
      story:
        "We matched on Hanna's Connect after both being disappointed with other dating apps. What drew us together was our shared love of hiking and similar life goals. Our first date was a coffee that turned into a 6-hour conversation. We're now engaged and planning our wedding!",
      quote: "Hanna's Connect helped us find each other when we had almost given up on online dating.",
    },
    {
      names: "Jessica & David",
      location: "Los Angeles, CA",
      duration: "Together 18 months",
      image: "/images/avatar1.png",
      story:
        "As busy professionals, we appreciated how Hanna's Connect focused on quality matches rather than endless swiping. The compatibility assessment really worked - we aligned on values, career ambitions, and family goals. We just moved in together!",
      quote: "The algorithm really understood what we were both looking for in a partner.",
    },
    {
      names: "Emma & James",
      location: "Chicago, IL",
      duration: "Together 3 years",
      image: "/images/avatar2.png",
      story:
        "We were both skeptical about online dating, but Hanna's Connect felt different. The detailed profiles and personality matching helped us connect on a deeper level before even meeting. We have so much in common and complement each other perfectly.",
      quote: "We knew we were meant for each other from our very first conversation.",
    },
    {
      names: "Maria & Alex",
      location: "Austin, TX",
      duration: "Together 1 year",
      image: "/images/female3.jpg",
      story:
        "After several failed relationships, we were both looking for something real. Hanna's Connect's focus on long-term compatibility over superficial attraction was exactly what we needed. We're now planning our future together.",
      quote: "Finally, a dating app that cares about finding lasting love, not just hookups.",
    },
    {
      names: "Rachel & Tom",
      location: "Seattle, WA",
      duration: "Together 2.5 years",
      image: "/images/male3.jpg",
      story:
        "We lived in the same city for years but never met until Hanna's Connect brought us together. The platform's safety features made us both feel comfortable, and the conversation starters helped break the ice. We're now married!",
      quote: "Hanna's Connect didn't just find us a date - it found us our soulmate.",
    },
    {
      names: "Lisa & Kevin",
      location: "Miami, FL",
      duration: "Together 14 months",
      image: "/placeholder-user.jpg",
      story:
        "As single parents, dating was complicated for both of us. Hanna's Connect's detailed profiles helped us find someone who understood our situation and shared our family values. Our kids get along great too!",
      quote: "We found love and created a beautiful blended family.",
    },
  ]

  const stats = [
    { number: "1,200+", label: "Success Stories" },
    { number: "85%", label: "Match Success Rate" },
    { number: "6 months", label: "Average Time to Relationship" },
    { number: "92%", label: "User Satisfaction" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real couples who found lasting love through Hanna's Connect. Their stories inspire us to keep helping people
            find meaningful relationships.
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

        {/* Stories Grid */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {stories.map((story, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt={story.names}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{story.names}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {story.location}
                          <Calendar className="h-4 w-4 ml-3 mr-1" />
                          {story.duration}
                        </div>
                      </div>
                    </div>
                    <div className="relative mb-4">
                      <Quote className="h-6 w-6 text-pink-300 absolute -top-2 -left-2" />
                      <p className="text-gray-600 italic pl-4">{story.quote}</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{story.story}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Share Your Story */}
        <section className="mb-16">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-pink-100 to-purple-100">
            <CardContent className="p-8 text-center">
              <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Success Story</h2>
              <p className="text-xl text-gray-600 mb-6">
                Found love through Hanna's Connect? We'd love to feature your story and inspire others on their journey
                to finding meaningful relationships.
              </p>
              <Link href="/contact/feedback">
                <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                  Share Your Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Your Love Story Starts Here</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of people who have found their perfect match through Hanna's Connect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-pink-600 bg-transparent"
                  >
                    How It Works
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
