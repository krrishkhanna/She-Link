// Supabase database queries for SheLink

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

// Initialize Supabase client
const supabase = createClientComponentClient<Database>()

// Profile queries
export async function getProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateProfile(userId: string, updates: any) {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select()

  if (error) throw error
  return data
}

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split(".").pop()
  const filePath = `avatars/${userId}/${Date.now()}.${fileExt}`

  const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath)

  return urlData.publicUrl
}

// Post queries
export async function getPosts(limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles:user_id (username, full_name, avatar_url),
      likes:likes (count),
      comments:comments (count)
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

export async function createPost(userId: string, content: string, imageUrl?: string) {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: userId,
      content,
      image_url: imageUrl,
    })
    .select()

  if (error) throw error
  return data
}

export async function likePost(userId: string, postId: string) {
  const { data, error } = await supabase
    .from("likes")
    .insert({
      user_id: userId,
      post_id: postId,
    })
    .select()

  if (error) throw error
  return data
}

export async function unlikePost(userId: string, postId: string) {
  const { error } = await supabase.from("likes").delete().match({ user_id: userId, post_id: postId })

  if (error) throw error
  return true
}

// Comment queries
export async function getComments(postId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      profiles:user_id (username, full_name, avatar_url),
      likes:likes (count)
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

export async function createComment(userId: string, postId: string, content: string) {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      user_id: userId,
      post_id: postId,
      content,
    })
    .select()

  if (error) throw error
  return data
}

// Message queries
export async function getMessages(userId: string, otherUserId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select(`
      *,
      sender:sender_id (username, full_name, avatar_url)
    `)
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .or(`sender_id.eq.${otherUserId},receiver_id.eq.${otherUserId}`)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

export async function sendMessage(senderId: string, receiverId: string, content: string, encryptedContent?: string) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      encrypted_content: encryptedContent,
    })
    .select()

  if (error) throw error
  return data
}

export async function markMessageAsRead(messageId: string) {
  const { data, error } = await supabase.from("messages").update({ is_read: true }).eq("id", messageId).select()

  if (error) throw error
  return data
}

// Event queries
export async function getEvents(limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from("events")
    .select(`
      *,
      creator:creator_id (username, full_name, avatar_url),
      attendees:event_attendees (count)
    `)
    .order("start_time", { ascending: true })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

export async function createEvent(
  creatorId: string,
  title: string,
  description: string,
  location: string,
  startTime: string,
  endTime: string,
  isVirtual = false,
  virtualLink?: string,
  imageUrl?: string,
) {
  const { data, error } = await supabase
    .from("events")
    .insert({
      creator_id: creatorId,
      title,
      description,
      location,
      start_time: startTime,
      end_time: endTime,
      is_virtual: isVirtual,
      virtual_link: virtualLink,
      image_url: imageUrl,
    })
    .select()

  if (error) throw error
  return data
}

export async function attendEvent(userId: string, eventId: string) {
  const { data, error } = await supabase
    .from("event_attendees")
    .insert({
      user_id: userId,
      event_id: eventId,
    })
    .select()

  if (error) throw error
  return data
}

export async function cancelEventAttendance(userId: string, eventId: string) {
  const { error } = await supabase.from("event_attendees").delete().match({ user_id: userId, event_id: eventId })

  if (error) throw error
  return true
}

// Notification queries
export async function getNotifications(userId: string, limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from("notifications")
    .select(`
      *,
      sender:sender_id (username, full_name, avatar_url)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

export async function markNotificationAsRead(notificationId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId)
    .select()

  if (error) throw error
  return data
}

export async function markAllNotificationsAsRead(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false)
    .select()

  if (error) throw error
  return data
}

// User settings queries
export async function getUserSettings(userId: string) {
  const { data, error } = await supabase.from("user_settings").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateUserSettings(userId: string, settings: any) {
  const { data, error } = await supabase.from("user_settings").update(settings).eq("id", userId).select()

  if (error) throw error
  return data
}

// Connection/Follow queries
export async function followUser(followerId: string, followingId: string) {
  const { data, error } = await supabase
    .from("connections")
    .insert({
      follower_id: followerId,
      following_id: followingId,
    })
    .select()

  if (error) throw error
  return data
}

export async function unfollowUser(followerId: string, followingId: string) {
  const { error } = await supabase
    .from("connections")
    .delete()
    .match({ follower_id: followerId, following_id: followingId })

  if (error) throw error
  return true
}

export async function getFollowers(userId: string) {
  const { data, error } = await supabase
    .from("connections")
    .select(`
      *,
      follower:follower_id (id, username, full_name, avatar_url)
    `)
    .eq("following_id", userId)

  if (error) throw error
  return data
}

export async function getFollowing(userId: string) {
  const { data, error } = await supabase
    .from("connections")
    .select(`
      *,
      following:following_id (id, username, full_name, avatar_url)
    `)
    .eq("follower_id", userId)

  if (error) throw error
  return data
}

