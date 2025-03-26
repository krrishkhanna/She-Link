"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type PostProps = {
  post: {
    id: string
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
}

export default function PostCard({ post }: PostProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={post.user.avatar_url || ""} alt={post.user.full_name} />
            <AvatarFallback>{post.user.full_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{post.user.full_name}</h3>
                <p className="text-xs text-muted-foreground">
                  @{post.user.username} • {formatDate(post.created_at)}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Report</DropdownMenuItem>
                  <DropdownMenuItem>Mute</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="mt-2">{post.content}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-2 flex justify-between">
        <Button variant="ghost" size="sm" className={`gap-1 ${liked ? "text-primary" : ""}`} onClick={handleLike}>
          <ThumbsUp className="h-4 w-4" />
          <span>{likeCount}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>{post.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

