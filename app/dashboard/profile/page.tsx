"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase-provider"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Loader2, Upload, Save, LogOut } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { supabase, session } = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    bio: "",
    location: "",
    website: "",
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [settings, setSettings] = useState({
    email_notifications: true,
    two_factor_auth: false,
    private_profile: false,
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)

        if (!session?.user) {
          router.push("/login")
          return
        }

        const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (error) throw error

        setProfile(data)
        setFormData({
          full_name: data.full_name || "",
          username: data.username || "",
          bio: data.bio || "",
          location: data.location || "",
          website: data.website || "",
        })

        if (data.avatar_url) {
          setAvatarUrl(data.avatar_url)
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [supabase, session, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setSaving(true)

      if (!session?.user) {
        toast({
          title: "Error",
          description: "You must be logged in to update your profile.",
          variant: "destructive",
        })
        return
      }

      // Upload avatar if changed
      let newAvatarUrl = profile.avatar_url

      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop()
        const filePath = `avatars/${session.user.id}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, avatarFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath)

        newAvatarUrl = urlData.publicUrl
      }

      // Update profile
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          username: formData.username,
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id)

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl || ""} alt={formData.full_name} />
                  <AvatarFallback>{formData.full_name.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
                >
                  <Upload className="h-4 w-4" />
                  <Input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <h3 className="text-xl font-semibold">{formData.full_name}</h3>
              <p className="text-muted-foreground">@{formData.username}</p>
              <Button variant="outline" className="mt-4 w-full" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Change Password</h4>
                  <p className="text-sm text-muted-foreground">Update your password regularly</p>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch
                  checked={settings.two_factor_auth}
                  onCheckedChange={(checked) => setSettings({ ...settings, two_factor_auth: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Connected Devices</h4>
                  <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="profile">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={saving}>
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

            <TabsContent value="preferences" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={settings.email_notifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, email_notifications: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">New Message Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get notified when you receive a new message</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Event Reminders</h4>
                      <p className="text-sm text-muted-foreground">Receive reminders about upcoming events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Private Profile</h4>
                      <p className="text-sm text-muted-foreground">Only verified members can see your profile</p>
                    </div>
                    <Switch
                      checked={settings.private_profile}
                      onCheckedChange={(checked) => setSettings({ ...settings, private_profile: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Online Status</h4>
                      <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Usage</h4>
                      <p className="text-sm text-muted-foreground">Manage how your data is used</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

