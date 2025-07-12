"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Search, Send, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: number
  text: string
  sender: "me" | string
  timestamp: Date
  status?: "sent" | "delivered" | "read"
  isTyping?: boolean
}

export default function Messages() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userParam = searchParams.get("user")
  const [selectedUser, setSelectedUser] = useState<string | null>(userParam)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }
  }, [router])

  useEffect(() => {
    if (selectedUser) {
      // Load initial messages
      const initialMessages = getMessages(selectedUser)
      setMessages(initialMessages)
      
      // Simulate typing indicator after a delay
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          // Add a simulated response
          const newMessage: Message = {
            id: Date.now(),
            text: getRandomResponse(selectedUser),
            sender: selectedUser,
            timestamp: new Date(),
          }
          setMessages(prev => [...prev, newMessage])
        }, 2000)
      }, 1000)
    }
  }, [selectedUser])

  // Sample conversations data with connection status
  const conversations = [
    {
      id: "amara",
      name: "Amara",
      avatar: "/images/male1.jpg",
      lastMessage: "That sounds like a great plan! I'd love to join you for coffee this weekend.",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      isConnected: true, // Only connected users can be messaged
    },
    {
      id: "kemi",
      name: "Kemi",
      avatar: "/images/female1.jpg",
      lastMessage: "Thanks for the book recommendation! I just started reading it.",
      timestamp: "1 hour ago",
      unread: 0,
      online: true,
      isConnected: true,
    },
    {
      id: "david",
      name: "David",
      avatar: "/images/male2.jpg",
      lastMessage: "The concert was amazing! You would have loved it.",
      timestamp: "3 hours ago",
      unread: 1,
      online: false,
      isConnected: true,
    },
    {
      id: "funmi",
      name: "Funmi",
      avatar: "/images/female2.jpg",
      lastMessage: "Hope you're having a great day! 😊",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
      isConnected: false, // Not connected - can't message
    },
    {
      id: "tunde",
      name: "Tunde",
      avatar: "/images/male3.jpg",
      lastMessage: "Let's catch up soon. It's been too long!",
      timestamp: "2 days ago",
      unread: 0,
      online: true,
      isConnected: true,
    },
  ]

  // Sample messages for selected conversation
  const getMessages = (userId: string): Message[] => {
    const messageData: { [key: string]: Message[] } = {
      amara: [
        { id: 1, text: "Hey! How was your day?", sender: "amara", timestamp: new Date(Date.now() - 30 * 60 * 1000) },
        { id: 2, text: "It was great! Just finished a new project at work.", sender: "me", timestamp: new Date(Date.now() - 28 * 60 * 1000), status: "read" },
        { id: 3, text: "That's awesome! What kind of project?", sender: "amara", timestamp: new Date(Date.now() - 27 * 60 * 1000) },
        {
          id: 4,
          text: "A mobile app for a local restaurant. Really proud of how it turned out!",
          sender: "me",
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          status: "read"
        },
        {
          id: 5,
          text: "That sounds like a great plan! I'd love to join you for coffee this weekend.",
          sender: "amara",
          timestamp: new Date(Date.now() - 20 * 60 * 1000),
        },
      ],
      kemi: [
        { id: 1, text: "Hi there! How are you doing?", sender: "kemi", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        { id: 2, text: "I'm doing well, thanks! How about you?", sender: "me", timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000), status: "read" },
        {
          id: 3,
          text: "Thanks for the book recommendation! I just started reading it.",
          sender: "kemi",
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
        },
      ],
      david: [
        { id: 1, text: "The concert was amazing! You would have loved it.", sender: "david", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        { id: 2, text: "Which band was playing?", sender: "me", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), status: "read" },
      ],
      funmi: [{ id: 1, text: "Hope you're having a great day! 😊", sender: "funmi", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) }],
      tunde: [
        { id: 1, text: "Let's catch up soon. It's been too long!", sender: "tunde", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        { id: 2, text: "How about this weekend?", sender: "me", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), status: "read" },
      ],
    }
    return messageData[userId] || []
  }

  const getRandomResponse = (userId: string): string => {
    const responses: { [key: string]: string[] } = {
      amara: [
        "That's really interesting! Tell me more about it.",
        "I'd love to hear more about your day!",
        "Sounds like you had a productive time!",
        "That's fantastic! I'm happy for you.",
      ],
      kemi: [
        "That's wonderful! I'm glad to hear that.",
        "You always have such great stories!",
        "I'd love to know more about that.",
        "That sounds like a lot of fun!",
      ],
      david: [
        "That's amazing! I'm impressed.",
        "You're really talented at what you do!",
        "I'd love to see that sometime.",
        "That's definitely something to be proud of!",
      ],
      funmi: [
        "That's so exciting! I'm happy for you.",
        "You always make everything sound so interesting!",
        "I'd love to hear more details.",
        "That's definitely worth celebrating!",
      ],
      tunde: [
        "That's really cool! I'm impressed.",
        "You have such great ideas!",
        "I'd love to learn more about that.",
        "That's definitely something special!",
      ],
    }
    const userResponses = responses[userId] || ["That's great!", "I'm happy for you!", "Tell me more!"]
    return userResponses[Math.floor(Math.random() * userResponses.length)]
  }

  // Replace the formatTime function with WhatsApp-style formatting
  const formatTime = (date: Date): string => {
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    const isYesterday = date.toDateString() === yesterday.toDateString()
    if (isToday) {
      // Show time only
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (isYesterday) {
      return 'Yesterday'
    } else {
      // Show date in user's locale (e.g., 4/21/2024)
      return date.toLocaleDateString()
    }
  }

  // Helper for conversation list: parse relative timestamps to Date
  const parseTimestamp = (timestamp: string): Date => {
    const now = new Date()
    if (timestamp.includes('min')) {
      const mins = parseInt(timestamp)
      return new Date(now.getTime() - mins * 60 * 1000)
    } else if (timestamp.includes('hour')) {
      const hours = parseInt(timestamp)
      return new Date(now.getTime() - hours * 60 * 60 * 1000)
    } else if (timestamp === 'Yesterday') {
      const yesterday = new Date(now)
      yesterday.setDate(now.getDate() - 1)
      return yesterday
    } else if (timestamp.includes('day')) {
      const days = parseInt(timestamp)
      const date = new Date(now)
      date.setDate(now.getDate() - days)
      return date
    } else {
      // fallback: now
      return now
    }
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedConversation = conversations.find((conv) => conv.id === selectedUser)

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: message.trim(),
        sender: "me",
        timestamp: new Date(),
        status: "sent"
      }
      setMessages(prev => [...prev, newMessage])
      setMessage("")

      // Simulate status updates for demo
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: "delivered" } : m))
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: "read" } : m))
        }, 1200)
      }, 1000)
      
      // Simulate typing indicator and response
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const response: Message = {
            id: Date.now() + 1,
            text: getRandomResponse(selectedUser!),
            sender: selectedUser!,
            timestamp: new Date(),
          }
          setMessages(prev => [...prev, response])
        }, 2000)
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId)
    // Update URL to reflect the selected user
    router.push(`/messages?user=${userId}`)
  }

  // Get current user's privacy settings from localStorage (simulate profile)
  let showReadReceipts = true;
  try {
    const demoUser = JSON.parse(localStorage.getItem("demoUser") || '{}');
    showReadReceipts = demoUser?.settings?.privacy?.showReadReceipts !== false;
  } catch {}

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex w-screen max-w-none">
      {/* Contacts List */}
      <div
        className={`${selectedUser ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 h-full`}
      >
        {/* Header */}
          {!selectedUser && (
          <div className="flex-shrink-0 h-[56px] p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2 sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-0">Messages</h1>
        </div>
        )}
        <div className="relative px-4 pb-4">
          <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl"
          />
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="space-y-2 p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => conversation.isConnected && handleUserSelect(conversation.id)}
                className={`p-3 rounded-xl transition-colors ${
                  selectedUser === conversation.id
                    ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    : conversation.isConnected 
                      ? "hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      : "opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <AvatarFallback className="bg-[#B22222] text-white">{conversation.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    {conversation.online && conversation.isConnected && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                    {!conversation.isConnected && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                        <UserX className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate text-sm">{conversation.name}</h3>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(parseTimestamp(conversation.timestamp))}</span>
                        {conversation.unread > 0 && conversation.isConnected && (
                          <Badge className="bg-[#B22222] text-white text-xs min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">
                            {conversation.unread > 99 ? '99+' : conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate pr-2">
                      {conversation.isConnected ? conversation.lastMessage : "Not connected - Send a connection request first"}
                    </p>
                    {!conversation.isConnected && (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                        Connect to start messaging
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      {selectedUser ? (
        <div className="h-full min-h-0 flex flex-col bg-white dark:bg-gray-800 flex-1 w-full max-w-none relative">
          {/* Chat Header - Sticky at the very top, replaces main header */}
          <div className="sticky top-0 z-50 px-6 py-4 h-[64px] border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md flex items-center">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => {
                setSelectedUser(null)
                router.push("/messages")
              }}>
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <div className="relative">
                <Avatar className="h-14 w-14 ring-2 ring-green-500">
                  <AvatarImage
                    src={selectedConversation?.avatar || "/placeholder.svg"}
                    alt={selectedConversation?.name}
                  />
                  <AvatarFallback className="bg-[#B22222] text-white text-xl">
                    {selectedConversation?.username?.charAt(0) || selectedConversation?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                {selectedConversation?.online && (
                  <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 bg-green-500 shadow-lg"></span>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100 leading-tight">{selectedConversation?.name}</span>
                <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm">
                  {selectedConversation?.online && <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span>}
                  {selectedConversation?.online ? "Online" : <span className="text-gray-500 dark:text-gray-400 font-normal">Last seen recently</span>}
                </span>
              </div>
            </div>
          </div>

          {/* Messages - Scrollable with top padding for sticky headers */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 pt-4 pb-32">
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
                        {selectedConversation?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl relative ${
                      msg.sender === "me"
                        ? "bg-[#B22222] text-white rounded-br-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    {msg.sender === "me" ? (
                      <div className="flex items-center justify-end gap-1 mt-1 w-full">
                        <span className="text-xs text-white/70" style={{marginRight: 2}}>{formatTime(msg.timestamp)}</span>
                        {/* WhatsApp-style ticks */}
                        {showReadReceipts ? (
                          <>
                            <span className={`transition-all duration-200 ease-in-out ${msg.status === "sent" ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                              style={{ display: msg.status === "sent" ? 'inline' : 'none' }}>
                              {/* Single gray tick */}
                              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 9.5L8 12.5L13 7.5" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            <span className={`transition-all duration-200 ease-in-out ${msg.status === "delivered" ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                              style={{ display: msg.status === "delivered" ? 'inline' : 'none' }}>
                              {/* Two light-gray ticks */}
                              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.5 10L7.5 13L12.5 8" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 10L10 13L15 8" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            <span className={`transition-all duration-200 ease-in-out ${msg.status === "read" ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                              style={{ display: msg.status === "read" ? 'inline' : 'none' }}>
                              {/* Two green ticks */}
                              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.5 10L7.5 13L12.5 8" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 10L10 13L15 8" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </>
                        ) : (
                          <>
                            {/* Only show delivered (grey) ticks, never green */}
                            <span className={`transition-all duration-200 ease-in-out ${(msg.status === "sent" || msg.status === "delivered" || msg.status === "read") ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                              style={{ display: (msg.status === "sent" || msg.status === "delivered" || msg.status === "read") ? 'inline' : 'none' }}>
                              {/* Two light-gray ticks always */}
                              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.5 10L7.5 13L12.5 8" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 10L10 13L15 8" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </>
                        )}
                      </div>
                    ) : (
                      <p
                        className={`text-xs mt-1 text-gray-500 dark:text-gray-400`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2">
                  <Avatar className="h-6 w-6 flex-shrink-0">
                    <AvatarImage
                      src={selectedConversation?.avatar || "/placeholder.svg"}
                      alt={selectedConversation?.name}
                    />
                    <AvatarFallback className="bg-[#B22222] text-white text-xs">
                      {selectedConversation?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-700 rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input - Fixed Bottom */}
          <div className="fixed bottom-0 z-50 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 md:left-80 left-0 right-0 pb-20">
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
