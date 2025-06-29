import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, MessageCircle, Calendar, User } from "lucide-react"

export default function RelationshipAdvicePage() {
  const articles = [
    {
      id: 1,
      title: "Building Trust in Your Relationship",
      excerpt: "Learn the fundamental principles of establishing and maintaining trust with your partner.",
      author: "Dr. Sarah Wilson",
      date: "2024-01-14",
      readTime: "8 min read",
      likes: 189,
      comments: 25,
    },
    {
      id: 2,
      title: "Effective Communication Strategies for Couples",
      excerpt: "Master the art of healthy communication to strengthen your relationship bond.",
      author: "Michael Thompson",
      date: "2024-01-11",
      readTime: "6 min read",
      likes: 156,
      comments: 18,
    },
    {
      id: 3,
      title: "Navigating Long-Distance Relationships",
      excerpt: "Practical tips and strategies for maintaining intimacy across the miles.",
      author: "Emma Rodriguez",
      date: "2024-01-09",
      readTime: "7 min read",
      likes: 134,
      comments: 22,
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
          <Badge className="mb-4 bg-purple-500 hover:bg-purple-600">Relationship Advice</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Relationship Advice</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert guidance for building and maintaining healthy, lasting relationships.
          </p>
        </div>

        <div className="space-y-8">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3 hover:text-purple-600 transition-colors cursor-pointer">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                  <div className="mt-4 md:mt-0 md:ml-8 flex items-center space-x-4">
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
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
