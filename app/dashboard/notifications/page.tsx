"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { MessageSquare, Heart, Calendar, Users, Bell, CheckCheck, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Notification = {
  id: string
  type: "message" | "like" | "comment" | "event" | "connection" | "mention"
  content: string
  created_at: string
  read: boolean
  sender?: {
    id: string
    username: string
    full_name: string
    avatar_url: string | null
  }
}

export default function NotificationsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock notifications data
        const mockNotifications: Notification[] = [
          {
            id: "1",
            type: "message",
            content: "Priya Sharma sent you a message",
            created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            read: false,
            sender: {
              id: "user1",
              username: "priya_sharma",
              full_name: "Priya Sharma",
              avatar_url: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "2",
            type: "like",
            content: "Neha Patel liked your post",
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            read: false,
            sender: {
              id: "user2",
              username: "neha_patel",
              full_name: "Neha Patel",
              avatar_url: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "3",
            type: "event",
            content: "New event: Women in Tech Conference",
            created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            read: false,
          },
          {
            id: "4",
            type: "comment",
            content: "Anjali Gupta commented on your post",
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
            sender: {
              id: "user3",
              username: "anjali_gupta",
              full_name: "Anjali Gupta",
              avatar_url: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "5",
            type: "connection",
            content: "Meera Singh connected with you",
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
            sender: {
              id: "user4",
              username: "meera_singh",
              full_name: "Meera Singh",
              avatar_url: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "6",
            type: "mention",
            content: "Divya Kumar mentioned you in a comment",
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
            sender: {
              id: "user5",
              username: "divya_kumar",
              full_name: "Divya Kumar",
              avatar_url: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "7",
            type: "message",
            content: "Ritu Verma sent you a message",
            created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
            sender: {
              id: "user6",
              username: "ritu_verma",
              full_name: "Ritu Verma",
              avatar_url: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "8",
            type: "like",
            content: "Priya Sharma liked your comment",
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
            sender: {
              id: "user1",
              username: "priya_sharma",
              full_name: "Priya Sharma",
              avatar_url: "/placeholder.svg?height=40&width=40",
            },
          },
        ]

        setNotifications(mockNotifications)
      } catch (error) {
        console.error("Error fetching notifications:", error)
        toast({
          title: "Error",
          description: "Failed to load notifications. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [toast])

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    )

    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))

    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "like":
        return <Heart className="h-4 w-4 text-pink-500" />
      case "event":
        return <Calendar className="h-4 w-4 text-purple-500" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "connection":
        return <Users className="h-4 w-4 text-orange-500" />
      case "mention":
        return <MessageSquare className="h-4 w-4 text-teal-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)
    const diffHours = Math.round(diffMins / 60)
    const diffDays = Math.round(diffHours / 24)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else {
      return `${diffDays}d ago`
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Notifications</CardTitle>
                <CardDescription>Stay updated with what's happening in your network</CardDescription>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setActiveTab("all")}>All Notifications</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("unread")}>Unread</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("message")}>Messages</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("like")}>Likes</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("comment")}>Comments</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("connection")}>Connections</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("event")}>Events</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark All as Read
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-7 mb-6">
                <TabsTrigger value="all" className="relative">
                  All
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-pink-600">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="message">Messages</TabsTrigger>
                <TabsTrigger value="like">Likes</TabsTrigger>
                <TabsTrigger value="comment">Comments</TabsTrigger>
                <TabsTrigger value="connection">Connections</TabsTrigger>
                <TabsTrigger value="event">Events</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                  </div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No notifications</h3>
                    <p className="text-muted-foreground">
                      You don't have any {activeTab !== "all" ? activeTab : ""} notifications at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 flex items-start gap-3 ${!notification.read ? "bg-muted/50" : ""}`}
                      >
                        {notification.sender ? (
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={notification.sender.avatar_url || ""}
                              alt={notification.sender.full_name}
                            />
                            <AvatarFallback>{notification.sender.full_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                        <div className="flex-1">
                          <p className={`${!notification.read ? "font-medium" : ""}`}>{notification.content}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(notification.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && <Badge className="bg-pink-600">New</Badge>}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <span className="sr-only">Actions</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="12" cy="5" r="1" />
                                  <circle cx="12" cy="19" r="1" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                                Mark as read
                              </DropdownMenuItem>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

