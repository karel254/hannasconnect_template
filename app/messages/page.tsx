"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Search, Send, MoreVertical, Phone, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Messages() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userParam = searchParams.get("user")
  const [selectedUser, setSelectedUser] = useState<string | null>(userParam)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }
  }, [router])

  // Sample conversations data with new avatars
  const conversations = [
    {
      id: "amara",
      name: "Amara",
      avatar: "/images/avatar1.jpg",
      lastMessage: "That sounds like a great plan! I'd love to join you for coffee this weekend.",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
    },
    {
      id: "kemi",
      name: "Kemi",
      avatar: "/images/avatar2.jpg",
      lastMessage: "Thanks for the book recommendation! I just started reading it.",
      timestamp: "1 hour ago",
      unread: 0,
      online: true,
    },
    {
      id: "david",
      name: "David",
      avatar: "/images/avatar3.jpg",
      lastMessage: "The concert was amazing! You would have loved it.",
      timestamp: "3 hours ago",
      unread: 1,
      online: false,
    },
    {
      id: "funmi",
      name: "Funmi",
      avatar: "/images/avatar4.jpg",
      lastMessage: "Hope you're having a great day! 😊",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: "tunde",
      name: "Tunde",
      avatar: "/images/avatar5.jpg",
      lastMessage: "Let's catch up soon. It's been too long!",
      timestamp: "2 days ago",
      unread: 0,
      online: true,
    },
  ]

  // Sample messages for selected conversation
  const getMessages = (userId: string) => {
    const messageData: { [key: string]: any[] } = {
      amara: [
        { id: 1, text: "Hey! How was your day?", sender: "amara", timestamp: "10:30 AM" },
        { id: 2, text: "It was great! Just finished a new project at work.", sender: "me", timestamp: "10:32 AM" },
        { id: 3, text: "That's awesome! What kind of project?", sender: "amara", timestamp: "10:33 AM" },
        {
          id: 4,
          text: "A mobile app for a local restaurant. Really proud of how it turned out!",
          sender: "me",
          timestamp: "10:35 AM",
        },
        {
          id: 5,
          text: "That sounds like a great plan! I'd love to join you for coffee this weekend.",
          sender: "amara",
          timestamp: "10:40 AM",
        },
      ],
      kemi: [
        { id: 1, text: "Hi there! How are you doing?", sender: "kemi", timestamp: "Yesterday" },
        { id: 2, text: "I'm doing well, thanks! How about you?", sender: "me", timestamp: "Yesterday" },
        {
          id: 3,
          text: "Thanks for the book recommendation! I just started reading it.",
          sender: "kemi",
          timestamp: "1 hour ago",
        },
      ],
      david: [
        { id: 1, text: "The concert was amazing! You would have loved it.", sender: "david", timestamp: "3 hours ago" },
        { id: 2, text: "Which band was playing?", sender: "me", timestamp: "2 hours ago" },
      ],
      funmi: [{ id: 1, text: "Hope you're having a great day! 😊", sender: "funmi", timestamp: "Yesterday" }],
      tunde: [
        { id: 1, text: "Let's catch up soon. It's been too long!", sender: "tunde", timestamp: "2 days ago" },
        { id: 2, text: "How about this weekend?", sender: "me", timestamp: "2 days ago" },
      ],
    }
    return messageData[userId] || []
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedConversation = conversations.find((conv) => conv.id === selectedUser)
  const messages = selectedUser ? getMessages(selectedUser) : []

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Contacts List */}
      <div
        className={`${selectedUser ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden`}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2 p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedUser(conversation.id)}
                className={`p-3 rounded-xl cursor-pointer transition-colors ${
                  selectedUser === conversation.id
                    ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <AvatarFallback className="bg-[#B22222] text-white">{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{conversation.name}</h3>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{conversation.timestamp}</span>
                        {conversation.unread > 0 && (
                          <Badge className="bg-[#B22222] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full px-1">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate pr-2">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      {selectedUser ? (
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 overflow-hidden">
          {/* Chat Header */}
          <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSelectedUser(null)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedConversation?.avatar || "/placeholder.svg"}
                      alt={selectedConversation?.name}
                    />
                    <AvatarFallback className="bg-[#B22222] text-white">
                      {selectedConversation?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation?.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-gray-100">{selectedConversation?.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedConversation?.online ? "Online" : "Last seen recently"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.sender === "me" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  {msg.sender !== "me" && (
                    <Avatar className="h-6 w-6 flex-shrink-0">
                      <AvatarImage
                        src={selectedConversation?.avatar || "/placeholder.svg"}
                        alt={selectedConversation?.name}
                      />
                      <AvatarFallback className="bg-[#B22222] text-white text-xs">
                        {selectedConversation?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.sender === "me"
                        ? "bg-[#B22222] text-white rounded-br-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${msg.sender === "me" ? "text-white/70" : "text-gray-500 dark:text-gray-400"}`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-[#B22222] hover:bg-[#8B0000] text-white rounded-xl px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Select a conversation</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Choose a conversation from the sidebar to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
