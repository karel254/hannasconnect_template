"use client"

import Link from "next/link"
import { ArrowLeft, Clock, User, Calendar, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  // Limited blog posts for non-signed users
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Dating Tips for Modern Relationships",
      excerpt:
        "Navigate the world of modern dating with confidence. Learn the key strategies that successful couples use to build lasting connections.",
      author: "Dr. Sarah Johnson",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Dating Tips",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Building Trust in Long-Distance Relationships",
      excerpt:
        "Distance doesn't have to mean disconnection. Discover proven methods to maintain intimacy and trust when miles apart.",
      author: "Michael Chen",
      date: "December 12, 2024",
      readTime: "7 min read",
      category: "Relationship Advice",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Success Story: From Online Match to Marriage",
      excerpt:
        "Read how Emma and James found love through Hanna's Connect and built a beautiful life together. Their journey will inspire you.",
      author: "Hanna's Connect Team",
      date: "December 10, 2024",
      readTime: "4 min read",
      category: "Success Stories",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Hanna's Connect Blog</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover insights, tips, and stories to help you build meaningful relationships
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Sign Up CTA */}
        <div className="bg-gradient-to-r from-[#B22222]/10 to-[#DAA520]/10 rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Want Access to More Content?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Join Hanna's Connect to unlock our complete library of relationship advice, dating tips, and exclusive
            content from relationship experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-[#B22222] hover:bg-[#8B0000] text-white px-8 py-3 rounded-xl">
                Sign Up for Free
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-[#B22222] text-[#B22222] hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20 px-8 py-3 rounded-xl bg-transparent"
              >
                Already a Member? Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-[#DAA520]/20 text-[#8B4513] border-[#DAA520] dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-600">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl"
                  onClick={() => {
                    // Redirect to sign up for full access
                    window.location.href = "/register"
                  }}
                >
                  Read Full Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Stay Updated with Our Newsletter</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Get the latest relationship tips, dating advice, and success stories delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
            <Button className="bg-[#B22222] hover:bg-[#8B0000] text-white px-6 py-3 rounded-xl whitespace-nowrap">
              <Mail className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
