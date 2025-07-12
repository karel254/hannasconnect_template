"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, Heart, MessageCircle, Users, Star, Clock, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const notifications = [
  {
    id: 1,
    type: "match",
    title: "New Match!",
    message: "You and @sarahj are a 95% match",
    time: "2 min ago",
    read: false,
    avatar: "/images/female1.jpg",
    icon: Heart,
    color: "text-red-500",
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    message: "@alexj sent you a message",
    time: "5 min ago",
    read: false,
    avatar: "/images/male1.jpg",
    icon: MessageCircle,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "profile_view",
    title: "Profile View",
    message: "@emilyc viewed your profile",
    time: "1 hour ago",
    read: true,
    avatar: "/images/female2.jpg",
    icon: Users,
    color: "text-green-500",
  },
  {
    id: 4,
    type: "like",
    title: "Someone Liked You",
    message: "You received a new like",
    time: "2 hours ago",
    read: false,
    avatar: null,
    icon: Star,
    color: "text-yellow-500",
  },
  {
    id: 5,
    type: "reminder",
    title: "Complete Your Profile",
    message: "Add more photos to get better matches",
    time: "1 day ago",
    read: true,
    avatar: null,
    icon: Clock,
    color: "text-gray-500",
  },
]

export default function NotificationsPage() {
  const router = useRouter()
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/dashboard")}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Bell className="w-6 h-6 text-[#B22222]" />
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && <Badge className="bg-[#B22222] text-white text-xs">{unreadCount}</Badge>}
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-[#B22222] hover:bg-red-50">
                Mark all read
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 py-4 space-y-3 pt-20">
        {notificationList.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          notificationList.map((notification) => {
            const IconComponent = notification.icon
            return (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all duration-200 ${
                  !notification.read ? "bg-red-50 border-red-100 shadow-sm" : "bg-white border-gray-200 hover:shadow-sm"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar or Icon */}
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={notification.avatar || "/placeholder.svg"} alt="User" />
                          <AvatarFallback>{notification.title?.charAt(0) || 'N'}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <IconComponent className={`w-5 h-5 ${notification.color}`} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3
                            className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {notification.title}
                          </h3>
                          <p className={`text-sm mt-1 ${!notification.read ? "text-gray-700" : "text-gray-500"}`}>
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-400">{notification.time}</span>
                          {!notification.read && <div className="w-2 h-2 bg-[#B22222] rounded-full" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Empty State for No Notifications */}
      {notificationList.length > 0 && (
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-gray-500">That's all your notifications for now</p>
        </div>
      )}
    </div>
  )
}
