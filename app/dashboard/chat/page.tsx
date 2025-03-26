"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Send, Lock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import ChatbotInterface from "@/components/chatbot-interface"

type Message = {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  sender?: {
    username: string
    full_name: string
    avatar_url: string | null
  }
}

type Contact = {
  id: string
  username: string
  full_name: string
  avatar_url: string | null
  last_message?: string
  last_message_time?: string
  online?: boolean
}

// Mock data for demo
const mockContacts: Contact[] = [
  {
    id: "1",
    username: "priya_sharma",
    full_name: "Priya Sharma",
    avatar_url: "/placeholder.svg?height=40&width=40",
    online: true,
    last_message: "Hey, how are you doing today?",
    last_message_time: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    username: "neha_patel",
    full_name: "Neha Patel",
    avatar_url: "/placeholder.svg?height=40&width=40",
    online: false,
    last_message: "Thanks for sharing that resource!",
    last_message_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    username: "anjali_gupta",
    full_name: "Anjali Gupta",
    avatar_url: "/placeholder.svg?height=40&width=40",
    online: true,
    last_message: "Are you attending the workshop tomorrow?",
    last_message_time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    username: "meera_singh",
    full_name: "Meera Singh",
    avatar_url: "/placeholder.svg?height=40&width=40",
    online: false,
    last_message: "I'll send you the details soon.",
    last_message_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    username: "divya_kumar",
    full_name: "Divya Kumar",
    avatar_url: "/placeholder.svg?height=40&width=40",
    online: false,
    last_message: "",
    last_message_time: "",
  },
]

// Mock messages for the first contact
const mockMessages: Message[] = [
  {
    id: "1",
    sender_id: "1",
    receiver_id: "current_user",
    content: "Hey there! How are you doing today?",
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    sender: {
      username: "priya_sharma",
      full_name: "Priya Sharma",
      avatar_url: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    sender_id: "current_user",
    receiver_id: "1",
    content: "Hi Priya! I'm doing well, thanks for asking. How about you?",
    created_at: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    sender_id: "1",
    receiver_id: "current_user",
    content: "I'm good too! Just preparing for the women's leadership workshop next week. Are you planning to attend?",
    created_at: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    sender: {
      username: "priya_sharma",
      full_name: "Priya Sharma",
      avatar_url: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "4",
    sender_id: "current_user",
    receiver_id: "1",
    content:
      "Yes, I've already registered! I'm really looking forward to it. I heard the speakers are amazing this year.",
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    sender_id: "1",
    receiver_id: "current_user",
    content:
      "They are! Dr. Mehta's session on women in STEM is supposed to be particularly good. Maybe we can meet up there?",
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    sender: {
      username: "priya_sharma",
      full_name: "Priya Sharma",
      avatar_url: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "6",
    sender_id: "current_user",
    receiver_id: "1",
    content: "That sounds great! Let's plan to grab coffee during one of the breaks.",
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
]

export default function ChatPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading contacts
    const loadData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setContacts(mockContacts)
      setSelectedContact(mockContacts[0])
      setMessages(mockMessages)
      setLoading(false)
    }

    loadData()
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !selectedContact) return

    try {
      setSendingMessage(true)

      // Simulate message sending delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Create new message
      const newMsg: Message = {
        id: Date.now().toString(),
        sender_id: "current_user",
        receiver_id: selectedContact.id,
        content: newMessage,
        created_at: new Date().toISOString(),
      }

      // Add message to state
      setMessages((prev) => [...prev, newMsg])

      // Update contact's last message
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === selectedContact.id
            ? {
                ...contact,
                last_message: newMessage.length > 30 ? newMessage.substring(0, 30) + "..." : newMessage,
                last_message_time: new Date().toISOString(),
              }
            : contact,
        ),
      )

      setNewMessage("")

      // Simulate response after a delay (for demo purposes)
      setTimeout(() => {
        const responseMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender_id: selectedContact.id,
          receiver_id: "current_user",
          content: "Thanks for your message! This is a demo response for the hackathon.",
          created_at: new Date().toISOString(),
          sender: {
            username: selectedContact.username,
            full_name: selectedContact.full_name,
            avatar_url: selectedContact.avatar_url,
          },
        }

        setMessages((prev) => [...prev, responseMsg])
      }, 2000)
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSendingMessage(false)
    }
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="h-[calc(100vh-8rem)]">
      <Tabs defaultValue="direct" className="h-full flex flex-col">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="direct">Direct Messages</TabsTrigger>
          <TabsTrigger value="ai">Sakhi AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="direct" className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="px-4 py-3 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Messages</CardTitle>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <Lock className="h-3 w-3" />
                  End-to-End Encrypted
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-1 overflow-hidden">
              {/* Contacts sidebar */}
              <div className="w-1/3 border-r overflow-y-auto">
                <div className="p-3">
                  <Input
                    placeholder="Search contacts..."
                    className="mb-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="divide-y">
                  {filteredContacts.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      <p>No contacts found</p>
                    </div>
                  ) : (
                    filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/50 ${
                          selectedContact?.id === contact.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.avatar_url || ""} alt={contact.full_name} />
                            <AvatarFallback>{contact.full_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-medium truncate">{contact.full_name}</h3>
                            {contact.last_message_time && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(contact.last_message_time).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            )}
                          </div>
                          {contact.last_message ? (
                            <p className="text-sm text-muted-foreground truncate">{contact.last_message}</p>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">No messages yet</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Chat area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {selectedContact ? (
                  <>
                    <div className="p-3 border-b flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedContact.avatar_url || ""} alt={selectedContact.full_name} />
                          <AvatarFallback>{selectedContact.full_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {selectedContact.online && (
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedContact.full_name}</h3>
                        <p className="text-xs text-muted-foreground">@{selectedContact.username}</p>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {loading ? (
                        <div className="h-full flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-pink-600" />
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-center p-4">
                          <div>
                            <p className="text-muted-foreground mb-2">No messages yet</p>
                            <p className="text-sm">Send a message to start the conversation</p>
                          </div>
                        </div>
                      ) : (
                        messages.map((message) => {
                          const isCurrentUser = message.sender_id === "current_user"

                          return (
                            <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                              <div className="flex items-end gap-2 max-w-[80%]">
                                {!isCurrentUser && (
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={message.sender?.avatar_url || ""}
                                      alt={message.sender?.full_name}
                                    />
                                    <AvatarFallback>{message.sender?.full_name.charAt(0) || "U"}</AvatarFallback>
                                  </Avatar>
                                )}
                                <div
                                  className={`rounded-lg p-3 ${isCurrentUser ? "bg-pink-600 text-white" : "bg-muted"}`}
                                >
                                  <p>{message.content}</p>
                                  <p className="text-xs mt-1 opacity-70">
                                    {new Date(message.created_at).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                </div>
                                {isCurrentUser && (
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                                    <AvatarFallback>You</AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                            </div>
                          )
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={sendingMessage}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="bg-pink-600 hover:bg-pink-700"
                        disabled={sendingMessage || !newMessage.trim()}
                      >
                        {sendingMessage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-4">
                    <div>
                      <p className="text-muted-foreground mb-2">Select a contact to start chatting</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="flex-1">
          <ChatbotInterface />
        </TabsContent>
      </Tabs>
    </div>
  )
}

