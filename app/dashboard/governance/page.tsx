// Replace the governance page with a community guidelines page
// This removes the blockchain voting system and replaces it with community guidelines

"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Users, AlertTriangle, CheckCircle, FileText, Wallet } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useGovernance } from "@/lib/web3-provider"
import { Badge } from "@/components/ui/badge"

export default function CommunityGuidelinesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("guidelines")
  const { contractAddress, isConnected, connectWallet, disconnectWallet } = useGovernance()

  const handleReportIssue = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for helping keep our community safe. Our team will review your report.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Governance</CardTitle>
              <CardDescription>Connect your wallet to participate in governance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Wallet Status</span>
                  <Badge variant={isConnected ? "success" : "secondary"}>
                    {isConnected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Governance Contract:</p>
                  <p className="text-sm font-mono break-all">{contractAddress}</p>
                </div>
                <Button 
                  onClick={isConnected ? disconnectWallet : connectWallet}
                  className="w-full"
                  variant={isConnected ? "outline" : "default"}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Safety</CardTitle>
              <CardDescription>Our commitment to keeping SheLink a safe space for women</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                SheLink is dedicated to providing a harassment-free, supportive environment for all women. Our
                AI-powered moderation system and dedicated team work together to ensure community safety.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>AI-Powered Content Moderation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-green-500" />
                  <span>Human Moderation Team</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-green-500" />
                  <span>Report Inappropriate Content</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report an Issue</CardTitle>
              <CardDescription>Help us maintain community standards</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                If you encounter content that violates our community guidelines, please report it immediately. Your
                reports help us keep SheLink safe.
              </p>
              <Button onClick={handleReportIssue} className="w-full">
                Report Inappropriate Content
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="guidelines" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="safety">Safety Tips</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="guidelines" className="space-y-4">
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
                      Be authentic and engage in meaningful conversations. Spam, excessive self-promotion, and
                      misleading content are not allowed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Appropriate Content
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Share content that is appropriate for a diverse community. Explicit, violent, or disturbing
                      content is prohibited.
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

            <TabsContent value="safety" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Online Safety Tips</CardTitle>
                  <CardDescription>Protecting yourself in digital spaces</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Protect Your Personal Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Be cautious about sharing personal details online. Avoid sharing your home address, phone number,
                      or financial information.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Use Strong, Unique Passwords</h3>
                    <p className="text-sm text-muted-foreground">
                      Create strong passwords for your accounts and avoid using the same password across multiple
                      platforms.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Be Aware of Phishing Attempts</h3>
                    <p className="text-sm text-muted-foreground">
                      Be skeptical of suspicious messages or links, even if they appear to come from someone you know.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Trust Your Instincts</h3>
                    <p className="text-sm text-muted-foreground">
                      If something feels wrong or uncomfortable, trust your gut feeling and disengage from the
                      situation.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Report Concerning Behavior</h3>
                    <p className="text-sm text-muted-foreground">
                      Don't hesitate to report harassment, threats, or suspicious behavior to our moderation team.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Support Resources</CardTitle>
                  <CardDescription>Helpful resources for women</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Mental Health Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Access to mental health resources, counseling services, and support groups for women.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <FileText className="mr-2 h-4 w-4" />
                      View Resources
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Career Development</h3>
                    <p className="text-sm text-muted-foreground">
                      Resources for professional growth, job opportunities, and mentorship programs.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <FileText className="mr-2 h-4 w-4" />
                      View Resources
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Legal Aid</h3>
                    <p className="text-sm text-muted-foreground">
                      Information on legal services, rights, and advocacy for women facing discrimination or harassment.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <FileText className="mr-2 h-4 w-4" />
                      View Resources
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Safety Resources</h3>
                    <p className="text-sm text-muted-foreground">
                      Resources for women dealing with domestic violence, stalking, or other safety concerns.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <FileText className="mr-2 h-4 w-4" />
                      View Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

