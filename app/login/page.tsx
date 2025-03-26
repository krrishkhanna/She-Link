"use client"

import type React from "react"
<<<<<<< HEAD

import { useState } from "react"
=======
import { useState, useEffect } from "react"
>>>>>>> 0379c66 (Initial commit - added VS Code project files)
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useSupabase } from "@/lib/supabase-provider"
<<<<<<< HEAD
=======
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FaceRecognitionSignIn from "@/components/face-recognition/FaceRecognitionSignIn"
>>>>>>> 0379c66 (Initial commit - added VS Code project files)

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { supabase } = useSupabase()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

<<<<<<< HEAD
=======
  useEffect(() => {
    const handleFaceRecognitionSuccess = () => {
      toast({
        title: "Face Recognition Successful",
        description: "Welcome back! You have been successfully authenticated.",
      })
      router.push("/dashboard")
    }

    window.addEventListener('faceRecognitionSuccess', handleFaceRecognitionSuccess)
    return () => {
      window.removeEventListener('faceRecognitionSuccess', handleFaceRecognitionSuccess)
    }
  }, [router, toast])

>>>>>>> 0379c66 (Initial commit - added VS Code project files)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
<<<<<<< HEAD
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-pink-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            {/* Demo button for hackathon */}
            <Button type="button" variant="outline" className="w-full mt-2" onClick={() => router.push("/dashboard")}>
              Demo Login (Skip Authentication)
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">
            Don't have an account?{" "}
            <Link href="/signup" className="text-pink-600 hover:underline">
              Create account
            </Link>
          </p>
=======
          <CardDescription className="text-center">Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Password Login</TabsTrigger>
              <TabsTrigger value="face">Face Recognition</TabsTrigger>
            </TabsList>
            <TabsContent value="password">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-pink-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="face">
              <div className="space-y-4">
                <p className="text-sm text-center text-gray-500">
                  This feature is only available for women. Please position your face clearly in front of the camera.
                </p>
                <FaceRecognitionSignIn />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-pink-600 hover:underline">
              Sign up
            </Link>
          </div>
>>>>>>> 0379c66 (Initial commit - added VS Code project files)
        </CardFooter>
      </Card>
    </div>
  )
}

