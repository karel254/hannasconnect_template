import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Calendar, MapPin } from "lucide-react"

export default function SuccessStoriesPage() {
  const stories = [
    {
      id: 1,
      title: "Emma & Jake: A Love Story That Started Online",
      excerpt:
        "From their first message to walking down the aisle, discover how Emma and Jake found their perfect match.",
      couple: "Emma & Jake",
      location: "New York, NY",
      date: "Married: June 2023",
      image: "/placeholder.svg?height=300&width=400",
      story:
        "We matched on Hanna's Connect in January 2022 and had our first date at a cozy coffee shop in Manhattan...",
    },
    {
      id: 2,
      title: "Sarah & Michael: Finding Love After 40",
      excerpt: "Proof that it's never too late to find your soulmate. Sarah and Michael's inspiring journey to love.",
      couple: "Sarah & Michael",
      location: "Los Angeles, CA",
      date: "Engaged: December 2023",
      image: "/placeholder.svg?height=300&width=400",
      story: "After being single for years, I never thought I'd find someone who truly understood me...",
    },
    {
      id: 3,
      title: "Alex & Maria: Long Distance Love",
      excerpt: "How Alex and Maria overcame 3,000 miles to build a beautiful relationship together.",
      couple: "Alex & Maria",
      location: "Seattle, WA & Miami, FL",
      date: "Together: 2 years",
      image: "/placeholder.svg?height=300&width=400",
      story: "Distance means nothing when someone means everything. Our story began with a simple 'hello'...",
    },
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
          <Badge className="mb-4 bg-green-500 hover:bg-green-600">Success Stories</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real couples, real love stories. Be inspired by the connections made through Hanna's Connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.couple}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Heart className="h-6 w-6 text-red-500 fill-current" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{story.title}</CardTitle>
                <p className="text-gray-600">{story.excerpt}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Heart className="h-4 w-4 mr-2 text-red-500" />
                    <span className="font-semibold">{story.couple}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {story.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {story.date}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{story.story}"</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Read Full Story
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Story</h2>
          <p className="text-gray-600 mb-6">
            Found love through Hanna's Connect? We'd love to hear your story and inspire others!
          </p>
          <Button className="bg-pink-500 hover:bg-pink-600">Submit Your Story</Button>
        </section>
      </div>
    </div>
  )
}
