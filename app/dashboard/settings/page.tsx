"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, Bell, Shield, Eye, Moon, Linkedin } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    eventReminders: true,
    communityUpdates: false,
    marketingEmails: false,
  })
  const [privacySettings, setPrivacySettings] = useState({
    privateProfile: false,
    showOnlineStatus: true,
    allowMessagesFromNonConnections: true,
    showActivityStatus: true,
  })
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: "30",
  })
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    fontSize: "medium",
    language: "english",
  })

  const handleSaveSettings = async (settingType: string) => {
    setSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: `Your ${settingType} settings have been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-6">
        <Tabs defaultValue="notifications">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-pink-600" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Control how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Message Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified when you receive a new message</p>
                  </div>
                  <Switch
                    checked={notificationSettings.messageNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, messageNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Event Reminders</h4>
                    <p className="text-sm text-muted-foreground">Receive reminders about upcoming events</p>
                  </div>
                  <Switch
                    checked={notificationSettings.eventReminders}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, eventReminders: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Community Updates</h4>
                    <p className="text-sm text-muted-foreground">Get updates about community activity</p>
                  </div>
                  <Switch
                    checked={notificationSettings.communityUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, communityUpdates: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Emails</h4>
                    <p className="text-sm text-muted-foreground">Receive promotional emails and newsletters</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleSaveSettings("notification")} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-pink-600" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>Control your privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Private Profile</h4>
                    <p className="text-sm text-muted-foreground">Only verified members can see your profile</p>
                  </div>
                  <Switch
                    checked={privacySettings.privateProfile}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, privateProfile: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show Online Status</h4>
                    <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                  </div>
                  <Switch
                    checked={privacySettings.showOnlineStatus}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showOnlineStatus: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Allow Messages from Non-Connections</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive messages from members you haven't connected with
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.allowMessagesFromNonConnections}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, allowMessagesFromNonConnections: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show Activity Status</h4>
                    <p className="text-sm text-muted-foreground">Let others see your recent activity</p>
                  </div>
                  <Switch
                    checked={privacySettings.showActivityStatus}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, showActivityStatus: checked })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleSaveSettings("privacy")} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-pink-600" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Login Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
                  </div>
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, loginNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Session Timeout</h4>
                  <p className="text-sm text-muted-foreground">Automatically log out after a period of inactivity</p>
                  <Select
                    value={securitySettings.sessionTimeout}
                    onValueChange={(value) => setSecuritySettings({ ...securitySettings, sessionTimeout: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Change Password</h4>
                  <p className="text-sm text-muted-foreground">Update your password regularly for better security</p>
                  <Button variant="outline">Change Password</Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Connected Accounts</h4>
                  <p className="text-sm text-muted-foreground">Manage your connected social accounts</p>
                  <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-5 w-5 text-blue-600" />
                      <span>LinkedIn</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Connected
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleSaveSettings("security")} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-pink-600" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize how SheLink looks for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Theme</h4>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                  <Select
                    value={appearanceSettings.theme}
                    onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, theme: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Font Size</h4>
                  <p className="text-sm text-muted-foreground">Adjust the text size</p>
                  <Select
                    value={appearanceSettings.fontSize}
                    onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, fontSize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Language</h4>
                  <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                  <Select
                    value={appearanceSettings.language}
                    onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleSaveSettings("appearance")} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

