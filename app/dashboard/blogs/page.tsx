"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Dating Tips for Modern Relationships",
    excerpt:
      "Navigate the world of modern dating with confidence. Learn the key strategies that successful couples use to build lasting connections in today's digital age.",
    content:
      "Full article content for 10 Essential Dating Tips for Modern Relationships...",
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
      "Distance doesn't have to mean disconnection. Discover proven methods to maintain intimacy and trust when miles apart, including communication strategies and virtual date ideas.",
    content:
      "Full article content for Building Trust in Long-Distance Relationships...",
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
      "Read how Emma and James found love through Hanna's Connect and built a beautiful life together. Their journey from first message to wedding day will inspire you.",
    content:
      "Full article content for Success Story: From Online Match to Marriage...",
    author: "Hanna's Connect Team",
    date: "December 10, 2024",
    readTime: "4 min read",
    category: "Success Stories",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "The Psychology of Attraction: What Really Matters",
    excerpt:
      "Dive deep into the science behind attraction and learn what psychological factors contribute to lasting romantic connections beyond physical appearance.",
    content:
      "Full article content for The Psychology of Attraction: What Really Matters...",
    author: "Dr. Amanda Rodriguez",
    date: "December 8, 2024",
    readTime: "8 min read",
    category: "Psychology",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Navigating Cultural Differences in Relationships",
    excerpt:
      "Learn how to embrace and celebrate cultural differences in your relationship. Tips for building understanding and creating harmony across different backgrounds.",
    content:
      "Full article content for Navigating Cultural Differences in Relationships...",
    author: "Adaora Okonkwo",
    date: "December 5, 2024",
    readTime: "6 min read",
    category: "Cultural Insights",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Digital Dating Safety: Protecting Yourself Online",
    excerpt:
      "Essential safety tips for online dating. Learn how to protect your personal information, recognize red flags, and stay safe while meeting new people online.",
    content:
      "Full article content for Digital Dating Safety: Protecting Yourself Online...",
    author: "Security Team",
    date: "December 3, 2024",
    readTime: "5 min read",
    category: "Safety",
    image: "/placeholder.svg?height=200&width=400",
  },
  // Additional mock articles
  {
    id: 7,
    title: "How to Write the Perfect Dating Profile Bio",
    excerpt:
      "Tips and tricks to craft a dating profile bio that stands out and attracts genuine matches.",
    content:
      "Full article content for How to Write the Perfect Dating Profile Bio...",
    author: "Jane Doe",
    date: "November 28, 2024",
    readTime: "4 min read",
    category: "Profile Tips",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 8,
    title: "First Date Ideas That Go Beyond Coffee",
    excerpt:
      "Creative and memorable first date ideas to help you make a great impression.",
    content:
      "Full article content for First Date Ideas That Go Beyond Coffee...",
    author: "John Smith",
    date: "November 20, 2024",
    readTime: "6 min read",
    category: "Date Ideas",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 9,
    title: "Dealing with Rejection: Staying Positive in the Dating World",
    excerpt:
      "How to handle rejection gracefully and keep your confidence high while dating.",
    content:
      "Full article content for Dealing with Rejection: Staying Positive in the Dating World...",
    author: "Dr. Mark Evans",
    date: "November 15, 2024",
    readTime: "5 min read",
    category: "Mindset",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 10,
    title: "Balancing Faith and Modern Dating",
    excerpt:
      "Explore how to maintain your faith and values while navigating the modern dating scene.",
    content:
      "Full article content for Balancing Faith and Modern Dating...",
    author: "Pastor Grace Mwangi",
    date: "November 10, 2024",
    readTime: "7 min read",
    category: "Faith & Values",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 11,
    title: "How to Spot a Catfish: Online Dating Safety Essentials",
    excerpt:
      "Learn the warning signs of online dating scams and how to protect yourself from catfishing.",
    content:
      "Full article content for How to Spot a Catfish: Online Dating Safety Essentials...",
    author: "Security Team",
    date: "November 5, 2024",
    readTime: "6 min read",
    category: "Safety",
    image: "/placeholder.svg?height=200&width=400",
  },
];

export default function BlogsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">All Blog Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
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
                  {expandedId === post.id ? post.content : post.excerpt}
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
                  onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                >
                  {expandedId === post.id ? "Hide Article" : "Read Article"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 