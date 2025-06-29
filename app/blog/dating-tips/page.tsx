import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, MessageCircle, Share2, Calendar, User } from "lucide-react"

export default function DatingTipsPage() {
  const articles = [
    {
      id: 1,
      title: "10 Essential Dating Tips for Modern Romance",
      excerpt:
        "Navigate the world of modern dating with confidence using these proven strategies that work in today's digital age.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      likes: 124,
      comments: 18,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "First Date Conversation Starters That Actually Work",
      excerpt: "Break the ice and keep the conversation flowing with these engaging topics and questions.",
      author: "Emma Davis",
      date: "2024-01-12",
      readTime: "4 min read",
      likes: 89,
      comments: 12,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Online Dating Profile Tips: Stand Out From the Crowd",
      excerpt: "Create a compelling dating profile that attracts the right matches and showcases your authentic self.",
      author: "Mike Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      likes: 156,
      comments: 24,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Dating Red Flags: What to Watch Out For",
      excerpt:
        "Learn to identify warning signs early in the dating process to protect yourself and make better choices.",
      author: "Dr. Lisa Chen",
      date: "2024-01-08",
      readTime: "7 min read",
      likes: 203,
      comments: 31,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-pink-500 hover:bg-pink-600">Dating Tips</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dating Tips & Advice</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert advice and practical tips to help you navigate the dating world with confidence and authenticity.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl hover:text-pink-600 transition-colors cursor-pointer">
                  {article.title}
                </CardTitle>
                <p className="text-gray-600">{article.excerpt}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {article.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {article.comments}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Tips Section */}
        <section className="bg-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Dating Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-2">Be Authentic</h3>
              <p className="text-gray-600 text-sm">
                Stay true to yourself and let your genuine personality shine through.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Listen Actively</h3>
              <p className="text-gray-600 text-sm">
                Show genuine interest in your date by listening and asking follow-up questions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Stay Positive</h3>
              <p className="text-gray-600 text-sm">
                Maintain a positive attitude and focus on enjoying the experience.
              </p>
            </div>
          </div>
        </section>

        {/* Load More */}
        <div className="text-center">
          <Button className="bg-pink-500 hover:bg-pink-600">Load More Articles</Button>
        </div>
      </div>
    </div>
  )
}
