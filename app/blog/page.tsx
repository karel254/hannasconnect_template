import Link from "next/link"
import { ArrowLeft, Calendar, User, ArrowRight, Search, Heart, MessageCircle, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function BlogPage() {
  const featuredPost = {
    title: "The Science Behind Lasting Relationships: What Research Tells Us",
    excerpt:
      "Recent studies reveal the key factors that predict relationship success. Discover the evidence-based approach to finding your perfect match.",
    author: "Dr. Sarah Chen",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Relationship Science",
    image: "/placeholder.svg?height=400&width=600&text=Featured+Article",
  }

  const blogCategories = [
    {
      icon: Heart,
      title: "Dating Tips",
      description: "Expert advice on dating, first dates, and building connections",
      link: "/blog/dating-tips",
      color: "text-red-700",
      bgColor: "bg-red-100",
      count: "24 articles",
    },
    {
      icon: MessageCircle,
      title: "Relationship Advice",
      description: "Guidance on maintaining healthy, long-term relationships",
      link: "/blog/relationship-advice",
      color: "text-amber-700",
      bgColor: "bg-amber-100",
      count: "18 articles",
    },
    {
      icon: Users,
      title: "Success Stories",
      description: "Real couples sharing their journey to finding love",
      link: "/blog/success-stories",
      color: "text-orange-700",
      bgColor: "bg-orange-100",
      count: "32 stories",
    },
    {
      icon: BookOpen,
      title: "Community",
      description: "Tips for engaging with the Hanna's Connect community",
      link: "/blog/community",
      color: "text-red-600",
      bgColor: "bg-red-100",
      count: "12 articles",
    },
  ]

  const recentPosts = [
    {
      title: "How to Write the Perfect Dating Profile",
      excerpt: "Learn what makes a profile stand out and attract quality matches.",
      author: "Emma Rodriguez",
      date: "January 12, 2024",
      category: "Dating Tips",
      readTime: "6 min read",
    },
    {
      title: "Red Flags to Watch Out for When Online Dating",
      excerpt: "Stay safe by recognizing warning signs in potential matches.",
      author: "Dr. Michael Chen",
      date: "January 10, 2024",
      category: "Safety",
      readTime: "5 min read",
    },
    {
      title: "From First Message to First Date: A Complete Guide",
      excerpt: "Master the art of online conversation and secure that first date.",
      author: "Lisa Thompson",
      date: "January 8, 2024",
      category: "Dating Tips",
      readTime: "7 min read",
    },
    {
      title: "Building Trust in Online Relationships",
      excerpt: "How to develop genuine connections before meeting in person.",
      author: "Dr. Sarah Johnson",
      date: "January 5, 2024",
      category: "Relationship Advice",
      readTime: "9 min read",
    },
    {
      title: "Why Slow Dating is the New Fast Track to Love",
      excerpt:
        "Discover how taking your time in the early stages of dating can lead to stronger, more lasting relationships.",
      author: "Dr. Sarah Chen",
      date: "December 1, 2024",
      category: "Relationship Science",
      readTime: "6 min read",
    },
    {
      title: "Navigating Long-Distance Relationships in the Digital Age",
      excerpt:
        "Modern tools and timeless principles for making long-distance relationships work in today's connected world.",
      author: "Rachel Kim",
      date: "December 3, 2024",
      category: "Relationship Advice",
      readTime: "9 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hanna&apos;s Connect™ Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert advice, relationship insights, and dating tips to help you build meaningful connections.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {blogCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.title}
                  className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-amber-100"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`${category.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-red-100">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4 bg-red-100 text-red-700">{featuredPost.category}</Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Button className="gap-2 bg-red-700 hover:bg-red-800">
                  Read Full Article
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-2 border-amber-100"
              >
                <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <span className="text-amber-700 font-semibold">Article Image</span>
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-amber-100 text-amber-700">{post.category}</Badge>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent border-amber-600 text-amber-700 hover:bg-amber-50"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-red-800 to-amber-700 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest dating tips and relationship advice delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input placeholder="Enter your email" className="bg-white text-gray-900" />
            <Button className="bg-white text-red-800 hover:bg-gray-100 whitespace-nowrap">Subscribe Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
