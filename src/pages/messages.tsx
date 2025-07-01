"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, ArrowLeft } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "me" | "them"
  timestamp: string
}

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  messages: Message[]
}

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [otherPersonTyping, setOtherPersonTyping] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/images/avatar1.jpg",
      lastMessage: "Hey! How was your weekend?",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      messages: [
        { id: 1, text: "Hi there! Nice to match with you 😊", sender: "them", timestamp: "10:30" },
        { id: 2, text: "Hey! Thanks, you seem really interesting too!", sender: "me", timestamp: "10:32" },
        {
          id: 3,
          text: "I saw you like hiking. Have you been to Central Park recently?",
          sender: "them",
          timestamp: "10:35",
        },
        {
          id: 4,
          text: "Yes! I was there last weekend. The fall colors are beautiful right now",
          sender: "me",
          timestamp: "10:37",
        },
        { id: 5, text: "Hey! How was your weekend?", sender: "them", timestamp: "14:22" },
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
        { id: 3, text: "Thanks! Maybe we could grab coffee sometime?", sender: "them", timestamp: "13:45" },
        { id: 4, text: "That sounds like a great plan!", sender: "me", timestamp: "13:47" },
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
          timestamp: "11:30",
        },
        { id: 4, text: "Looking forward to it!", sender: "me", timestamp: "11:32" },
      ],
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation?.messages, otherPersonTyping])

  // Focus input when chat is selected
  useEffect(() => {
    if (selectedChat && inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedChat])

  // Format current time as HH:mm (24-hour format)
  const getCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }

  // Handle sending message
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const currentTime = getCurrentTime()
      const messageId = Date.now()

      // Add new message to conversation
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === selectedChat) {
            return {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: messageId,
                  text: newMessage.trim(),
                  sender: "me" as const,
                  timestamp: currentTime,
                },
              ],
              lastMessage: newMessage.trim(),
              timestamp: "now",
            }
          }
          return conv
        }),
      )

      setNewMessage("")
      setIsTyping(false)

      // Simulate other person stopping typing when we send a message
      setOtherPersonTyping(false)

      // Focus back to input
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  // Handle typing indicator
  const handleTyping = (value: string) => {
    setNewMessage(value)

    if (value.length > 0) {
      if (!isTyping) {
        setIsTyping(true)
        // Simulate other person seeing our typing and starting to type back
        setTimeout(
          () => {
            setOtherPersonTyping(true)
          },
          1000 + Math.random() * 2000,
        ) // Random delay 1-3 seconds
      }

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
        // Stop other person typing after we stop
        setTimeout(
          () => {
            setOtherPersonTyping(false)
          },
          500 + Math.random() * 1500,
        )
      }, 1000)
    } else {
      setIsTyping(false)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (selectedChat) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
        {/* CLEAN HEADER - ONLY BACK, AVATAR, NAME, STATUS */}
        <div className="bg-white border-b px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)} className="p-2 hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img
            src={selectedConversation?.avatar || "/placeholder.svg"}
            alt={selectedConversation?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-900 truncate">{selectedConversation?.name}</h2>
            <p className="text-sm text-gray-500 truncate">
              {otherPersonTyping ? (
                <span className="text-green-600 font-medium">typing...</span>
              ) : selectedConversation?.online ? (
                "Online now"
              ) : (
                "Last seen recently"
              )}
            </p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {selectedConversation?.messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[280px] sm:max-w-xs lg:max-w-md px-4 py-2 rounded-2xl break-words ${
                    message.sender === "me"
                      ? "bg-[#B22222] text-white rounded-br-md"
                      : "bg-white text-gray-900 border rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-1 text-right ${message.sender === "me" ? "text-red-100" : "text-gray-500"}`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {/* Other person typing indicator */}
            {otherPersonTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-900 border px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input Area - Enhanced for better UX */}
        <div className="bg-white border-t p-4 sticky bottom-0">
          <div className="flex gap-3 items-end max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full min-h-[44px] pr-12 rounded-full border-2 border-gray-200 focus:border-[#B22222] focus:ring-2 focus:ring-[#B22222]/20 text-base placeholder:text-gray-400"
                autoComplete="off"
                maxLength={1000}
              />
              {newMessage.trim() && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs text-gray-400">{newMessage.length}/1000</span>
                </div>
              )}
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-[#B22222] hover:bg-[#A01E1E] disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] h-[44px] rounded-full shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          {/* Typing indicator for user */}
          {isTyping && <div className="mt-2 text-xs text-gray-500 text-center">You are typing...</div>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Connect with your matches</p>
        </div>

        <div className="space-y-2">
          {conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className="cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
              onClick={() => setSelectedChat(conversation.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
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
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="bg-[#B22222] text-white flex-shrink-0 min-w-[20px] h-5 text-xs">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
