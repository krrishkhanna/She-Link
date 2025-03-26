"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/lib/supabase-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  MessageSquare,
  Users,
  Calendar,
  Plus,
  Bell,
  TrendingUp,
  BookOpen,
  Heart,
  Shield,
  Activity,
} from "lucide-react"
import PostCard from "@/components/post-card"
import EventCard from "@/components/event-card"
import { fetchEvents } from "@/lib/events-api"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

type Event = {
  id: string
  title: string
  date: string
  location: string
  description: string
  image?: string
}

type Post = {
  id: string
  user_id: string
  content: string
  created_at: string
  likes: number
  comments: number
  user: {
    username: string
    full_name: string
    avatar_url: string | null
  }
}

type Notification = {
  id: string
  type: string
  content: string
  created_at: string
  read: boolean
  sender?: {
    username: string
    full_name: string
    avatar_url: string | null
  }
}

export default function Dashboard() {
  const { supabase, session } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [stats, setStats] = useState({
    connections: 24,
    messages: 8,
    events: 3,
    unreadNotifications: 5,
    profileCompletion: 85,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch user profile
        if (session?.user) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (profileError) throw profileError
          setProfile(profileData)
        }

        // Fetch posts
        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select(`
            *,
            user:profiles(username, full_name, avatar_url)
          `)
          .order("created_at", { ascending: false })
          .limit(5)

        if (postsError) throw postsError
        setPosts(postsData || [])

        // Fetch events
        const eventsData = await fetchEvents()
        setEvents(eventsData)

        // Mock notifications
        setNotifications([
          {
            id: "1",
            type: "message",
            content: "Priya Sharma sent you a message",
            created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            read: false,
            sender: {
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
              username: "meera_singh",
              full_name: "Meera Singh",
              avatar_url: "/placeholder.svg?height=40&width=40",
            },
          },
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase, session])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

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

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {profile?.full_name || "User"}!</h1>
              <p className="opacity-90 mt-1">Here's what's happening in your SheLink community today</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Message
              </Button>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Profile and Stats */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Manage your profile and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name} />
                  <AvatarFallback>{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{profile?.full_name}</h3>
                <p className="text-muted-foreground">@{profile?.username}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">Verified Member</Badge>
                </div>

                <div className="w-full mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profile completion</span>
                    <span>{stats.profileCompletion}%</span>
                  </div>
                  <Progress value={stats.profileCompletion} className="h-2" />
                </div>

                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link href="/dashboard/profile">Edit Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Your Activity</CardTitle>
              <CardDescription>Overview of your engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <Users className="h-5 w-5 text-pink-600 mb-1" />
                  <span className="text-2xl font-bold">{stats.connections}</span>
                  <span className="text-xs text-muted-foreground">Connections</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600 mb-1" />
                  <span className="text-2xl font-bold">{stats.messages}</span>
                  <span className="text-xs text-muted-foreground">Messages</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600 mb-1" />
                  <span className="text-2xl font-bold">{stats.events}</span>
                  <span className="text-xs text-muted-foreground">Events</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                  <Activity className="h-5 w-5 text-green-600 mb-1" />
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-xs text-muted-foreground">Posts</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/chat">
                  <MessageSquare className="mr-2 h-4 w-4 text-blue-600" />
                  Messages
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/community">
                  <Users className="mr-2 h-4 w-4 text-pink-600" />
                  Community
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/governance">
                  <Shield className="mr-2 h-4 w-4 text-purple-600" />
                  Guidelines
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/dashboard/profile">
                  <BookOpen className="mr-2 h-4 w-4 text-green-600" />
                  Resources
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Feed and Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="feed">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="feed" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Feed</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Community</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Events</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Latest Posts</h2>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  New Post
                </Button>
              </div>

              {posts.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No posts yet. Be the first to share something!</p>
                  <Button>Create Post</Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                  <div className="flex justify-center">
                    <Button variant="outline">View More Posts</Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recent Notifications</h2>
                <Button variant="outline" size="sm">
                  Mark All as Read
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {notifications.map((notification) => (
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
                        {!notification.read && <Badge className="bg-pink-600">New</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center p-4 border-t">
                  <Button variant="outline" size="sm">
                    View All Notifications
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Community Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="p-4 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">User Name</h3>
                      <p className="text-sm text-muted-foreground">@username</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Connect
                    </Button>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/community">View All Members</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.slice(0, 2).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              <div className="flex justify-center mt-4">
                <Button variant="outline">View All Events</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

