"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, ArrowLeft } from "lucide-react"

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/images/avatar1.jpg",
      lastMessage: "Hey! How was your weekend?",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      messages: [
        { id: 1, text: "Hi there! Nice to match with you 😊", sender: "them", timestamp: "10:30 AM" },
        { id: 2, text: "Hey! Thanks, you seem really interesting too!", sender: "me", timestamp: "10:32 AM" },
        {
          id: 3,
          text: "I saw you like hiking. Have you been to Central Park recently?",
          sender: "them",
          timestamp: "10:35 AM",
        },
        {
          id: 4,
          text: "Yes! I was there last weekend. The fall colors are beautiful right now",
          sender: "me",
          timestamp: "10:37 AM",
        },
        { id: 5, text: "Hey! How was your weekend?", sender: "them", timestamp: "2 min ago" },
      ],
    },
    {
      id: 2,
      name: "Emily Chen",
      avatar: "/images/avatar2.jpg",
      lastMessage: "That sounds like a great plan!",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: "Hi! I love your profile photos", sender: "them", timestamp: "Yesterday" },
        { id: 2, text: "Thank you! Your travel photos are amazing", sender: "me", timestamp: "Yesterday" },
        { id: 3, text: "Thanks! Maybe we could grab coffee sometime?", sender: "them", timestamp: "1 hour ago" },
        { id: 4, text: "That sounds like a great plan!", sender: "me", timestamp: "1 hour ago" },
      ],
    },
    {
      id: 3,
      name: "Jessica Williams",
      avatar: "/images/avatar3.jpg",
      lastMessage: "Looking forward to it!",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      messages: [
        { id: 1, text: "Hey! I noticed we both love art", sender: "them", timestamp: "Yesterday" },
        { id: 2, text: "Yes! Do you have a favorite museum?", sender: "me", timestamp: "Yesterday" },
        {
          id: 3,
          text: "MoMA is my go-to. Want to check out the new exhibition together?",
          sender: "them",
          timestamp: "3 hours ago",
        },
        { id: 4, text: "Looking forward to it!", sender: "me", timestamp: "3 hours ago" },
      ],
    },
  ]

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage("")
      setIsTyping(false)
    }
  }

  const handleTyping = (value: string) => {
    setNewMessage(value)
    setIsTyping(value.length > 0)
  }

  if (selectedChat) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img
            src={selectedConversation?.avatar || "/placeholder.svg"}
            alt={selectedConversation?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{selectedConversation?.name}</h2>
            <p className="text-sm text-gray-500">
              {selectedConversation?.online ? "Online now" : "Last seen recently"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {selectedConversation?.messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === "me" ? "bg-[#B22222] text-white" : "bg-white text-gray-900 border"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "me" ? "text-red-100" : "text-gray-500"}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 border px-4 py-2 rounded-2xl">
                <p className="text-sm text-gray-500">Typing...</p>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t p-4">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => handleTyping(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-[#B22222] hover:bg-[#A01E1E]"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Connect with your matches</p>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedChat(conversation.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar || "/placeholder.svg"}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && <Badge className="bg-[#B22222] text-white">{conversation.unread}</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
