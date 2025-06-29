import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Search, Heart, MessageCircle, Users, BookOpen } from "lucide-react"

export default function BlogPage() {
  const featuredPost = {
    title: "10 Essential Dating Tips for Finding Your Perfect Match",
    excerpt: "Discover proven strategies to improve your dating success and build meaningful connections that last.",
    author: "Dr. Sarah Johnson",
    date: "January 15, 2024",
    readTime: "8 min read",
    image: "/images/hero-couple.jpg",
    category: "Dating Tips",
    link: "/blog/dating-tips",
  }

  const blogCategories = [
    {
      icon: Heart,
      title: "Dating Tips",
      description: "Expert advice on dating, first dates, and building connections",
      link: "/blog/dating-tips",
      color: "text-pink-500",
      bgColor: "bg-pink-100",
      count: "24 articles",
    },
    {
      icon: MessageCircle,
      title: "Relationship Advice",
      description: "Guidance on maintaining healthy, long-term relationships",
      link: "/blog/relationship-advice",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      count: "18 articles",
    },
    {
      icon: Users,
      title: "Success Stories",
      description: "Real couples sharing their journey to finding love",
      link: "/blog/success-stories",
      color: "text-green-500",
      bgColor: "bg-green-100",
      count: "32 stories",
    },
    {
      icon: BookOpen,
      title: "Community",
      description: "Tips for engaging with the Hanna's Connect community",
      link: "/blog/community",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Dating & Relationship Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expert advice, success stories, and practical tips to help you navigate the world of online dating and build
            meaningful relationships.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
        </section>

        {/* Featured Post */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-pink-500">{featuredPost.category}</Badge>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <User className="h-4 w-4 mr-1" />
                  {featuredPost.author}
                  <Calendar className="h-4 w-4 ml-4 mr-1" />
                  {featuredPost.date}
                  <span className="ml-4">{featuredPost.readTime}</span>
                </div>
                <Link href={featuredPost.link}>
                  <Button className="bg-pink-500 hover:bg-pink-600 w-fit">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Blog Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogCategories.map((category, index) => (
              <Link key={index} href={category.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`${category.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                    >
                      <category.icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Badge variant="outline" className="mb-4">
                      {category.count}
                    </Badge>
                    <Button variant="outline" className="w-full bg-transparent">
                      Explore Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Recent Articles</h2>
            <div className="space-y-6">
              {recentPosts.map((post, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                        <Calendar className="h-4 w-4 ml-4 mr-1" />
                        {post.date}
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-8 opacity-90">
                Get the latest dating tips, relationship advice, and success stories delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input placeholder="Enter your email" className="bg-white text-gray-900" />
                <Button className="bg-white text-pink-600 hover:bg-gray-100 whitespace-nowrap">Subscribe Now</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
