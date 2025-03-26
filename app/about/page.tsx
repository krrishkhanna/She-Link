import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Users,
  MessageCircle,
  Calendar,
  Sparkles,
  BookOpen,
  Lock,
  CheckCircle,
  Zap,
  Settings,
  Bell,
  HelpCircle,
  Fingerprint,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            About SheLink
          </h1>
          <p className="text-xl text-muted-foreground">
            A secure, women-only community platform designed to connect, support, and empower.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            SheLink was created with a clear mission: to provide women with a safe, secure, and supportive online
            community where they can connect, share experiences, and grow together. In a digital world where online
            harassment and privacy concerns are prevalent, we've built a platform that prioritizes women's safety and
            well-being above all else.
          </p>
          <p className="text-lg text-muted-foreground">
            We believe that by creating a space exclusively for women, we can foster meaningful connections, facilitate
            knowledge sharing, and build a powerful network of support that transcends geographical boundaries.
          </p>
        </div>

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="features">Platform Features</TabsTrigger>
            <TabsTrigger value="security">Security & Privacy</TabsTrigger>
            <TabsTrigger value="community">Community Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-pink-600" />
                    Secure Messaging
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    End-to-end encrypted messaging ensures your conversations remain private. Connect with other members
                    through our secure messaging system.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-pink-600" />
                    Community Forums
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Engage in discussions on various topics with like-minded women. Share experiences, seek advice, and
                    offer support in our moderated forums.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-pink-600" />
                    Events & Workshops
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Discover and participate in virtual and in-person events designed specifically for women. From
                    networking events to skill-building workshops.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-pink-600" />
                    Sakhi AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get instant support with our Gemini 2.0 Flash-powered AI assistant. Sakhi can answer questions,
                    provide resources, and help you navigate the platform.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Fingerprint className="h-5 w-5 text-pink-600" />
                    Verified Women-Only Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our rigorous verification process, including ID verification and LinkedIn profile integration,
                    ensures our community remains exclusively for women.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-pink-600" />
                    Resource Library
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Access a curated collection of resources for women's personal and professional development,
                    including articles, guides, and tools.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-pink-600" />
                    Customizable Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stay updated with personalized notification settings. Choose how and when you receive alerts about
                    messages, events, and community activity.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-pink-600" />
                    24/7 Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our dedicated support team is available around the clock to assist with any questions or concerns
                    you may have about the platform.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security & Privacy Features</CardTitle>
                <CardDescription>How we keep your data safe and secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-pink-600" />
                    <h3 className="font-semibold text-lg">End-to-End Encryption</h3>
                  </div>
                  <p className="text-muted-foreground pl-7">
                    All messages and sensitive data are encrypted using military-grade encryption. Only you and your
                    intended recipients can read your messages.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-pink-600" />
                    <h3 className="font-semibold text-lg">Strict Verification Process</h3>
                  </div>
                  <p className="text-muted-foreground pl-7">
                    Our multi-step verification process includes ID verification and LinkedIn profile integration to
                    ensure only women can join the platform.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-pink-600" />
                    <h3 className="font-semibold text-lg">AI-Powered Content Moderation</h3>
                  </div>
                  <p className="text-muted-foreground pl-7">
                    Our advanced AI systems automatically detect and filter inappropriate content, ensuring a safe
                    environment for all members.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-pink-600" />
                    <h3 className="font-semibold text-lg">Customizable Privacy Settings</h3>
                  </div>
                  <p className="text-muted-foreground pl-7">
                    Take control of your privacy with granular settings. Choose who can see your profile, contact you,
                    and view your activity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
                <CardDescription>Standards we uphold in our community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Respect and Inclusivity
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Treat all members with respect and dignity. Discrimination, hate speech, or harassment of any kind
                    is not tolerated.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Privacy and Confidentiality
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Respect the privacy of others. Do not share personal information or private conversations without
                    explicit permission.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Authentic Engagement
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Be authentic and engage in meaningful conversations. Spam, excessive self-promotion, and misleading
                    content are not allowed.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Appropriate Content
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Share content that is appropriate for a diverse community. Explicit, violent, or disturbing content
                    is prohibited.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Supportive Environment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Foster a supportive environment where members can share experiences and seek advice without
                    judgment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="text-lg text-muted-foreground">
            Ready to be part of a supportive community of women? Join SheLink today and connect with like-minded women
            from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700" asChild>
              <Link href="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

