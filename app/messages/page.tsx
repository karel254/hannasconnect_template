"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Search } from "lucide-react"

// Sample conversation data
const conversations = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Alex Johnson",
      icon: "/images/avatar1.png",
      lastActive: "2 min ago",
    },
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi there! I noticed we have similar interests in technology and hiking. What kind of hiking trails do you enjoy?",
        timestamp: "Yesterday, 2:30 PM",
      },
      {
        id: 2,
        sender: "you",
        text: "Hello! Nice to connect with you. I love mountain trails with scenic views. Have you hiked any trails recently?",
        timestamp: "Yesterday, 3:15 PM",
      },
      {
        id: 3,
        sender: "them",
        text: "Yes! I just went to Mount Kilimanjaro last month. It was challenging but the views were absolutely worth it. Do you have any favorite hiking spots?",
        timestamp: "Yesterday, 3:45 PM",
      },
    ],
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Amina Okafor",
      icon: "/images/avatar2.png",
      lastActive: "Online",
    },
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hello! I saw that you're also interested in finance. What aspects of finance do you work with?",
        timestamp: "2 days ago, 10:20 AM",
      },
      {
        id: 2,
        sender: "you",
        text: "Hi Amina! I specialize in investment banking and portfolio management. How about you?",
        timestamp: "2 days ago, 11:05 AM",
      },
    ],
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "David Mensah",
      icon: "/images/avatar3.png",
      lastActive: "5 hours ago",
    },
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi there! I noticed we both enjoy community service. What kind of volunteer work are you involved in?",
        timestamp: "3 days ago, 9:15 AM",
      },
    ],
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "Sarah Osei",
      icon: "/images/avatar4.png",
      lastActive: "1 day ago",
    },
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hello! I see you're interested in art as well. Do you have a favorite art style or artist?",
        timestamp: "1 week ago, 3:30 PM",
      },
      {
        id: 2,
        sender: "you",
        text: "Hi Sarah! I'm a big fan of contemporary African art. I particularly enjoy the works of El Anatsui and Yinka Shonibare. How about you?",
        timestamp: "1 week ago, 4:10 PM",
      },
      {
        id: 3,
        sender: "them",
        text: "That's wonderful! I love El Anatsui's work too. Have you ever visited any art exhibitions recently?",
        timestamp: "1 week ago, 5:00 PM",
      },
    ],
  },
]

export default function Messages() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    // In a real app, this would send the message to the backend
    console.log("Sending message:", newMessage)

    // Clear the input
    setNewMessage("")
  }

  const filteredConversations = conversations.filter((convo) =>
    convo.user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-[#B22222] mb-6">Messages</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row h-[calc(100vh-200px)]">
            {/* Conversation List */}
            <div className="w-full md:w-1/3 border-r">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search conversations"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-y-auto h-[calc(100%-73px)]">
                {filteredConversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No conversations found</div>
                ) : (
                  filteredConversations.map((convo) => (
                    <div
                      key={convo.id}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        activeConversation.id === convo.id ? "bg-[#F5F5F5]" : ""
                      }`}
                      onClick={() => setActiveConversation(convo)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={convo.user.icon || "/placeholder.svg"} alt={convo.user.name} />
                          <AvatarFallback>{convo.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-[#B22222]">{convo.user.name}</h3>
                            <span className="text-xs text-gray-500">
                              {convo.messages[convo.messages.length - 1].timestamp.split(",")[0]}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {convo.messages[convo.messages.length - 1].sender === "you" ? "You: " : ""}
                            {convo.messages[convo.messages.length - 1].text}
                          </p>
                          <span className="text-xs text-gray-500">{convo.user.lastActive}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Active Conversation */}
            <div className="w-full md:w-2/3 flex flex-col">
              {/* Conversation Header */}
              <div className="p-4 border-b flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={activeConversation.user.icon || "/placeholder.svg"}
                    alt={activeConversation.user.name}
                  />
                  <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="font-medium">{activeConversation.user.name}</h3>
                  <p className="text-xs text-gray-500">{activeConversation.user.lastActive}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "them" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage
                          src={activeConversation.user.icon || "/placeholder.svg"}
                          alt={activeConversation.user.name}
                        />
                        <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="max-w-[70%]">
                      <Card className={`${message.sender === "you" ? "bg-[#B22222] text-white" : "bg-[#F5F5F5]"}`}>
                        <CardContent className="p-3">
                          <p>{message.text}</p>
                        </CardContent>
                      </Card>
                      <p className="text-xs text-gray-500 mt-1 px-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="ml-2 bg-[#B22222] hover:bg-[#8B0000]"
                    disabled={newMessage.trim() === ""}
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
