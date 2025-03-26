"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { HelpCircle, Search, MessageSquare, FileText, BookOpen, ArrowRight } from "lucide-react"

export default function HelpSupportPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Support request submitted",
        description: "We've received your message and will get back to you shortly.",
      })

      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      question: "How does SheLink verify that only women can join?",
      answer:
        "SheLink uses a multi-step verification process that includes ID verification and LinkedIn profile integration. Our AI system analyzes submitted documents to verify gender, and we also review LinkedIn profiles to ensure authenticity. This helps maintain our women-only community standard.",
    },
    {
      question: "Is my data secure on SheLink?",
      answer:
        "Yes, we take data security very seriously. All messages are end-to-end encrypted, meaning only you and your intended recipient can read them. We also implement strict data protection measures and never share your personal information with third parties without your explicit consent.",
    },
    {
      question: "How do I report inappropriate behavior?",
      answer:
        "You can report inappropriate behavior by clicking the 'Report' option available on posts, messages, or user profiles. Our moderation team reviews all reports within 24 hours and takes appropriate action according to our community guidelines.",
    },
    {
      question: "Can I delete my account and all my data?",
      answer:
        "Yes, you have complete control over your data. You can delete your account at any time from the Settings page. When you delete your account, all your personal information, posts, and messages are permanently removed from our servers within 30 days.",
    },
    {
      question: "What is Sakhi AI Assistant and how does it work?",
      answer:
        "Sakhi is our AI assistant powered by Gemini 2.0 Flash. It can help you navigate the platform, answer questions about features, provide resources, and offer general support. Sakhi uses advanced natural language processing to understand your queries and provide helpful responses.",
    },
    {
      question: "How can I organize or join events on SheLink?",
      answer:
        "You can browse upcoming events in the Events tab on your dashboard. To join an event, simply click the 'RSVP' button. If you want to organize your own event, click the 'Create Event' button in the Events section and fill out the event details form.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-pink-600" />
                Help & Support
              </CardTitle>
              <CardDescription>Find answers and get assistance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for help..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Quick Links</h3>
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="#faqs">
                      <FileText className="mr-2 h-4 w-4 text-pink-600" />
                      Frequently Asked Questions
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="#contact">
                      <MessageSquare className="mr-2 h-4 w-4 text-pink-600" />
                      Contact Support
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="#guides">
                      <BookOpen className="mr-2 h-4 w-4 text-pink-600" />
                      User Guides
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>24/7 Support</CardTitle>
              <CardDescription>We're here to help anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our dedicated support team is available 24/7 to assist you with any questions or issues you may have.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Email Support:</span>
                  <span className="text-muted-foreground">support@shelink.com</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Response Time:</span>
                  <span className="text-muted-foreground">Within 2 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="faqs">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="guides">User Guides</TabsTrigger>
            </TabsList>

            <TabsContent value="faqs" id="faqs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about SheLink</CardDescription>
                </CardHeader>
                <CardContent>
                  {searchQuery && filteredFaqs.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-2">No results found for "{searchQuery}"</p>
                      <p className="text-sm">Try a different search term or contact our support team for assistance.</p>
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {(searchQuery ? filteredFaqs : faqs).map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" id="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get in touch with our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleContactFormChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleContactFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactFormChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Support Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guides" id="guides" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Guides</CardTitle>
                  <CardDescription>Learn how to use SheLink effectively</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Getting Started</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn the basics of SheLink and how to set up your profile.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <Button variant="outline" className="justify-between">
                        Creating Your Profile
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        Verification Process
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        Privacy Settings
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        Navigating the Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Community Features</h3>
                    <p className="text-sm text-muted-foreground">Discover how to engage with the SheLink community.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <Button variant="outline" className="justify-between">
                        Posting & Commenting
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        Messaging Other Members
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        Joining & Creating Events
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        Using Sakhi AI Assistant
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Safety & Security</h3>
                    <p className="text-sm text-muted-foreground">Learn how to stay safe and secure on SheLink.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <Button variant="outline" className="justify-between">
                        Reporting Inappropriate Content
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        Understanding Encryption
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        Account Security Best Practices
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between">
                        Community Guidelines
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Guides
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

