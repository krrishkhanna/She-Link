"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { MessageSquare, ThumbsUp, Share2, Users, UserPlus, Filter, Calendar } from "lucide-react"

// Mock data for community members
const communityMembers = [
  {
    id: "1",
    name: "Priya Sharma",
    username: "priya_sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Software Engineer | Women in Tech Advocate",
    interests: ["Technology", "Coding", "Leadership"],
    isFollowing: false,
  },
  {
    id: "2",
    name: "Neha Patel",
    username: "neha_patel",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Digital Marketing Specialist | Content Creator",
    interests: ["Marketing", "Content", "Social Media"],
    isFollowing: true,
  },
  {
    id: "3",
    name: "Anjali Gupta",
    username: "anjali_gupta",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Healthcare Professional | Mental Health Advocate",
    interests: ["Healthcare", "Wellness", "Mental Health"],
    isFollowing: false,
  },
  {
    id: "4",
    name: "Meera Singh",
    username: "meera_singh",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Financial Analyst | Investment Advisor",
    interests: ["Finance", "Investing", "Economics"],
    isFollowing: true,
  },
  {
    id: "5",
    name: "Divya Kumar",
    username: "divya_kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "UX Designer | Creative Thinker",
    interests: ["Design", "UX", "Art"],
    isFollowing: false,
  },
  {
    id: "6",
    name: "Ritu Verma",
    username: "ritu_verma",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Entrepreneur | Business Coach",
    interests: ["Business", "Entrepreneurship", "Coaching"],
    isFollowing: false,
  },
]

// Mock data for posts
const communityPosts = [
  {
    id: "1",
    author: {
      name: "Priya Sharma",
      username: "priya_sharma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just finished a great workshop on women in leadership! So many inspiring stories and practical advice. Who else is focusing on developing their leadership skills this year?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: "2",
    author: {
      name: "Neha Patel",
      username: "neha_patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I'm organizing a virtual meetup for women in tech next Friday. We'll be discussing career growth strategies and networking. DM me if you're interested in joining!",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 15,
    isLiked: true,
  },
  {
    id: "3",
    author: {
      name: "Anjali Gupta",
      username: "anjali_gupta",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just published my article on work-life balance for working mothers. It's been a journey to find what works for me, and I'm sharing my experiences in hopes it helps others. Link in my profile!",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 56,
    comments: 12,
    isLiked: false,
  },
]

// Mock data for events
const communityEvents = [
  {
    id: "1",
    title: "Women in Tech Conference",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Virtual",
    description: "Join us for a day of inspiring talks, networking, and workshops focused on women in technology.",
    attendees: 156,
    isAttending: false,
  },
  {
    id: "2",
    title: "Leadership Workshop",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Mumbai, India",
    description: "Develop your leadership skills in this interactive workshop led by industry experts.",
    attendees: 78,
    isAttending: true,
  },
  {
    id: "3",
    title: "Wellness Retreat",
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Bangalore, India",
    description: "Take a break and focus on your wellbeing with this weekend retreat designed for women in tech.",
    attendees: 42,
    isAttending: false,
  },
]

export default function CommunityPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [posts, setPosts] = useState(communityPosts)
  const [members, setMembers] = useState(communityMembers)
  const [events, setEvents] = useState(communityEvents)
  const [isPostingLoading, setIsPostingLoading] = useState(false)

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return

    setIsPostingLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newPost = {
        id: Date.now().toString(),
        author: {
          name: "Jane Doe",
          username: "jane_doe",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: newPostContent,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        isLiked: false,
      }

      setPosts([newPost, ...posts])
      setNewPostContent("")

      toast({
        title: "Post created",
        description: "Your post has been published to the community.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPostingLoading(false)
    }
  }

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  const handleFollowMember = (memberId: string) => {
    setMembers(
      members.map((member) => {
        if (member.id === memberId) {
          const newFollowState = !member.isFollowing

          toast({
            title: newFollowState ? "Following" : "Unfollowed",
            description: newFollowState ? `You are now following ${member.name}` : `You have unfollowed ${member.name}`,
          })

          return {
            ...member,
            isFollowing: newFollowState,
          }
        }
        return member
      }),
    )
  }

  const handleAttendEvent = (eventId: string) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          const newAttendingState = !event.isAttending

          toast({
            title: newAttendingState ? "RSVP Confirmed" : "RSVP Cancelled",
            description: newAttendingState
              ? `You are now attending ${event.title}`
              : `You have cancelled your RSVP for ${event.title}`,
          })

          return {
            ...event,
            attendees: newAttendingState ? event.attendees + 1 : event.attendees - 1,
            isAttending: newAttendingState,
          }
        }
        return event
      }),
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Community Feed</CardTitle>
              <CardDescription>Share and connect with other members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="What's on your mind?"
                    className="min-h-[100px]"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim() || isPostingLoading}
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      {isPostingLoading ? "Posting..." : "Post to Community"}
                    </Button>
                  </div>
                </div>

                <Separator />

                {posts.map((post) => (
                  <Card key={post.id} className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{post.author.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                @{post.author.username} • {formatDate(post.timestamp)}
                              </p>
                            </div>
                          </div>
                          <p className="mt-2">{post.content}</p>

                          <div className="flex gap-4 mt-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`gap-1 ${post.isLiked ? "text-pink-600" : ""}`}
                              onClick={() => handleLikePost(post.id)}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Share2 className="h-4 w-4" />
                              <span>Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3 space-y-6">
          <Tabs defaultValue="members">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="mt-4 space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {filteredMembers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No members found</p>
                ) : (
                  filteredMembers.map((member) => (
                    <Card key={member.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{member.name}</h3>
                                <p className="text-xs text-muted-foreground">@{member.username}</p>
                              </div>
                              <Button
                                variant={member.isFollowing ? "default" : "outline"}
                                size="sm"
                                className={member.isFollowing ? "bg-pink-600 hover:bg-pink-700" : ""}
                                onClick={() => handleFollowMember(member.id)}
                              >
                                {member.isFollowing ? (
                                  "Following"
                                ) : (
                                  <>
                                    <UserPlus className="h-3 w-3 mr-1" />
                                    Follow
                                  </>
                                )}
                              </Button>
                            </div>
                            <p className="text-sm mt-1 line-clamp-2">{member.bio}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {member.interests.map((interest, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              <div className="flex justify-center">
                <Button variant="outline" className="w-full">
                  View All Members
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Upcoming Events</h3>
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Create Event</span>
                </Button>
              </div>

              <div className="space-y-4">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg">{event.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees} attending</span>
                      </div>
                      <p className="text-sm mt-2">{event.description}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm font-medium">{event.location}</span>
                        <Button
                          variant={event.isAttending ? "default" : "outline"}
                          size="sm"
                          className={event.isAttending ? "bg-pink-600 hover:bg-pink-700" : ""}
                          onClick={() => handleAttendEvent(event.id)}
                        >
                          {event.isAttending ? "Attending" : "RSVP"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline" className="w-full">
                  View All Events
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-pink-600 hover:bg-pink-700 cursor-pointer">#WomenInTech</Badge>
                <Badge className="bg-pink-600 hover:bg-pink-700 cursor-pointer">#Leadership</Badge>
                <Badge className="bg-pink-600 hover:bg-pink-700 cursor-pointer">#CareerGrowth</Badge>
                <Badge className="bg-pink-600 hover:bg-pink-700 cursor-pointer">#WorkLifeBalance</Badge>
                <Badge className="bg-pink-600 hover:bg-pink-700 cursor-pointer">#SelfCare</Badge>
                <Badge className="bg-pink-600 hover:bg-pink-700 cursor-pointer">#Entrepreneurship</Badge>
                <Badge className="bg-pink-600 hover:bg-pink-700 cursor-pointer">#MentalHealth</Badge>
                <Badge className="bg-pink-600 hover:bg-pink-700 cursor-pointer">#FinancialLiteracy</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

