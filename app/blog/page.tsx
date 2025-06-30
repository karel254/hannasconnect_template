import { Calendar, User, ArrowRight, Search, Heart, MessageCircle, Users, BookOpen } from "lucide-react"
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
    image: "/placeholder.svg?height=200&width=300&text=Featured+Article",
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
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Blog & Tips</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search articles..." className="pl-10 rounded-full border-gray-300" />
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {blogCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.title}
                  className="cursor-pointer hover:shadow-sm transition-shadow bg-white border-gray-200"
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`${category.bgColor} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3`}
                    >
                      <IconComponent className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{category.title}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{category.description}</p>
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
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Article</h2>
          <Card className="overflow-hidden hover:shadow-sm transition-shadow bg-white border-gray-200">
            <div className="aspect-video bg-gradient-to-br from-red-100 to-amber-100 flex items-center justify-center">
              <span className="text-red-700 font-semibold">Featured Article</span>
            </div>
            <CardContent className="p-4">
              <Badge className="mb-3 bg-red-100 text-red-700 text-xs">{featuredPost.category}</Badge>
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{featuredPost.title}</h3>
              <p className="text-gray-600 mb-4 text-sm line-clamp-3">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {featuredPost.date}
                </div>
                <span>{featuredPost.readTime}</span>
              </div>
              <Button className="w-full bg-[#B22222] hover:bg-[#8B0000] text-white text-sm">
                Read Article
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Articles</h2>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-sm transition-shadow bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-700 font-semibold text-xs">Article</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge className="mb-2 bg-amber-100 text-amber-700 text-xs">{post.category}</Badge>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-3 text-xs line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white border-0">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-bold mb-2">Stay Updated</h2>
            <p className="text-sm mb-4 opacity-90">
              Get the latest dating tips and relationship advice delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="bg-white text-gray-900 flex-1" />
              <Button className="bg-white text-[#B22222] hover:bg-gray-100 whitespace-nowrap px-4">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
