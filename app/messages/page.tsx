"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Search, MoreVertical, UserMinus, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface ChatUser {
  id: number
  name: string
  icon: string
  lastMessage: string
  time: string
  unread: boolean
  email: string
  isOnline: boolean
  responses: string[]
}

interface Message {
  id: number
  sender: "you" | "them"
  text: string
  timestamp: string
  fullTimestamp: string
}

export default function Messages() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [activeChatUser, setActiveChatUser] = useState<ChatUser | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const [chatUsers, setChatUsers] = useState<ChatUser[]>([
    {
      id: 1,
      name: "Alex Johnson",
      icon: "/images/avatar1.png",
      lastMessage: "I'd love to hear more about your hiking experiences!",
      time: "2 hours ago",
      unread: true,
      email: "alex@example.com",
      isOnline: true,
      responses: [
        "That sounds amazing! I love hiking too. Have you been to any good trails recently?",
        "I'm always looking for new hiking buddies. What's your favorite trail?",
        "The sunrise views from mountain peaks are incredible, aren't they?",
        "I just got back from a weekend camping trip. The stars were beautiful!",
        "Do you prefer day hikes or multi-day backpacking trips?",
      ],
    },
    {
      id: 2,
      name: "Amina Okafor",
      icon: "/images/avatar2.png",
      lastMessage: "That sounds like a great plan for the weekend.",
      time: "Yesterday",
      unread: false,
      email: "amina@example.com",
      isOnline: false,
      responses: [
        "Thanks for sharing that! I've been following the market trends closely too.",
        "That's a really interesting perspective on the current economic situation.",
        "I work in finance as well, so I appreciate your insights.",
        "Have you been keeping up with the latest M&A activity in tech?",
        "The investment opportunities in emerging markets look promising.",
      ],
    },
    {
      id: 3,
      name: "David Mensah",
      icon: "/images/avatar3.png",
      lastMessage: "Looking forward to our conversation!",
      time: "3 days ago",
      unread: false,
      email: "david@example.com",
      isOnline: true,
      responses: [
        "Thank you for reaching out! I really appreciate connecting with like-minded people.",
        "Community service is so important. I volunteer at the local hospital on weekends.",
        "It's wonderful to meet someone who cares about making a difference.",
        "Have you been involved in any volunteer work lately?",
        "I believe we can all contribute to making our communities better.",
      ],
    },
    {
      id: 4,
      name: "Sarah Osei",
      icon: "/images/avatar4.png",
      lastMessage: "The art exhibition was incredible!",
      time: "1 week ago",
      unread: false,
      email: "sarah@example.com",
      isOnline: false,
      responses: [
        "I'm so glad you enjoyed it! Art has always been a passion of mine.",
        "There's something magical about experiencing art in person, isn't there?",
        "I love discovering new artists and supporting local galleries.",
        "Have you been to any good exhibitions recently?",
        "Contemporary African art is having such an amazing moment right now.",
      ],
    },
  ])

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("demoUser")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getFullTimestamp = () => {
    return new Date().toISOString()
  }

  const openChat = (user: ChatUser) => {
    setActiveChatUser(user)

    // Mark as read
    setChatUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, unread: false } : u)))

    // Load chat history with realistic timestamps
    const now = new Date()
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60000)
    const eightMinutesAgo = new Date(now.getTime() - 8 * 60000)
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000)

    setMessages([
      {
        id: 1,
        sender: "them",
        text: `Hi there! I'm ${user.name}. It's nice to connect with you!`,
        timestamp: tenMinutesAgo.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
        fullTimestamp: tenMinutesAgo.toISOString(),
      },
      {
        id: 2,
        sender: "you",
        text: "Hello! It's great to connect with you too. How are you doing today?",
        timestamp: eightMinutesAgo.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
        fullTimestamp: eightMinutesAgo.toISOString(),
      },
      {
        id: 3,
        sender: "them",
        text: "I'm doing well, thank you! I noticed we have some common interests. Would you like to chat more about them?",
        timestamp: fiveMinutesAgo.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
        fullTimestamp: fiveMinutesAgo.toISOString(),
      },
    ])
  }

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value)

    // Show typing indicator
    setIsTyping(true)

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to hide typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || !activeChatUser) return

    // Clear typing indicator
    setIsTyping(false)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Add message to chat with real-time timestamp
    const newMessage: Message = {
      id: Date.now(),
      sender: "you",
      text: messageInput,
      timestamp: getCurrentTime(),
      fullTimestamp: getFullTimestamp(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessageInput("")

    // Update last message in chat list
    setChatUsers((prev) =>
      prev.map((u) => (u.id === activeChatUser.id ? { ...u, lastMessage: messageInput, time: "Just now" } : u)),
    )

    // Show other user typing indicator
    setTimeout(() => {
      setOtherUserTyping(true)
    }, 500)

    // Simulate response after 1-3 seconds with real-time timestamp
    const responseDelay = Math.random() * 2000 + 1000 // 1-3 seconds
    setTimeout(() => {
      setOtherUserTyping(false)

      // Get a random response from the user's response set
      const responses = activeChatUser.responses
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const responseMessage: Message = {
        id: Date.now() + 1,
        sender: "them",
        text: randomResponse,
        timestamp: getCurrentTime(),
        fullTimestamp: getFullTimestamp(),
      }
      setMessages((prev) => [...prev, responseMessage])

      // Update last message in chat list
      setChatUsers((prev) =>
        prev.map((u) => (u.id === activeChatUser.id ? { ...u, lastMessage: randomResponse, time: "Just now" } : u)),
      )
    }, responseDelay)
  }

  const handleUnfriendUser = (user: ChatUser) => {
    setChatUsers((prev) => prev.filter((u) => u.id !== user.id))
    if (activeChatUser?.id === user.id) {
      setActiveChatUser(null)
    }
    toast({
      title: "Connection Removed",
      description: `You have removed ${user.name} from your connections.`,
    })
  }

  const handleBlockUser = (user: ChatUser) => {
    setChatUsers((prev) => prev.filter((u) => u.id !== user.id))
    if (activeChatUser?.id === user.id) {
      setActiveChatUser(null)
    }
    toast({
      title: "User Blocked",
      description: `You have blocked ${user.name}. They will no longer be able to contact you.`,
    })
  }

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-700 rounded-2xl rounded-bl-md max-w-[70%] shadow-sm">
      <Avatar className="h-6 w-6">
        <AvatarImage src={activeChatUser?.icon || "/placeholder.svg"} alt={activeChatUser?.name} />
        <AvatarFallback className="text-xs">{activeChatUser?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">typing...</span>
    </div>
  )

  // Show loading state while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B22222] mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white p-4">
        <div className="flex items-center gap-3">
          {activeChatUser && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setActiveChatUser(null)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="text-xl font-bold">{activeChatUser ? activeChatUser.name : "Messages"}</h1>
            <p className="text-white/80 text-sm">
              {activeChatUser ? (activeChatUser.isOnline ? "Online" : "Last seen recently") : "Your conversations"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {!activeChatUser ? (
          // Messages List
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-[#B22222]">Messages</CardTitle>
              <CardDescription>Your conversations with matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input placeholder="Search conversations" className="pl-10 h-10" />
              </div>

              <div className="space-y-2">
                {chatUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="mx-auto mb-4 bg-gray-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No Messages Yet</h3>
                    <p className="text-gray-500 mt-2">
                      When you connect with someone, you'll be able to message them here.
                    </p>
                  </div>
                ) : (
                  chatUsers.map((user) => (
                    <Card
                      key={user.id}
                      className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
                        user.unread ? "border-l-4 border-l-[#DAA520] bg-[#DAA520]/5" : ""
                      }`}
                      onClick={() => openChat(user)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <div className="relative mr-4 flex-shrink-0">
                            <Avatar className="h-14 w-14">
                              <AvatarImage src={user.icon || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {user.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-[#B22222] truncate flex items-center text-lg">
                                  {user.name}
                                  {user.unread && <div className="ml-2 w-2 h-2 bg-[#DAA520] rounded-full"></div>}
                                </h3>
                                <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                                <p className="text-xs text-gray-500 flex items-center mt-1">
                                  {user.isOnline ? <span className="text-green-500">Online</span> : user.time}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleUnfriendUser(user)
                                      }}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <UserMinus className="mr-2 h-4 w-4" />
                                      Unfriend
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleBlockUser(user)
                                      }}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <X className="mr-2 h-4 w-4" />
                                      Block User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          // Active Chat
          <Card className="shadow-md flex flex-col h-[calc(100vh-200px)]">
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}>
                  {message.sender === "them" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage src={activeChatUser.icon || "/placeholder.svg"} alt={activeChatUser.name} />
                      <AvatarFallback className="text-xs">{activeChatUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="max-w-[75%]">
                    <div
                      className={`rounded-2xl px-4 py-3 transition-all duration-200 ${
                        message.sender === "you"
                          ? "bg-[#B22222] text-white rounded-br-md"
                          : "bg-white text-gray-800 rounded-bl-md shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed break-words">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">{message.timestamp}</p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {otherUserTyping && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            <div className="p-4 border-t flex-shrink-0 bg-white">
              {isTyping && <div className="text-xs text-gray-500 mb-2 px-1">You are typing...</div>}
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={handleMessageInputChange}
                  className="flex-1 h-12 rounded-full px-4"
                  disabled={otherUserTyping}
                />
                <Button
                  type="submit"
                  className="bg-[#B22222] hover:bg-[#8B0000] h-12 w-12 p-0 rounded-full flex-shrink-0"
                  disabled={!messageInput.trim() || otherUserTyping}
                >
                  <Send size={16} />
                </Button>
              </form>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
