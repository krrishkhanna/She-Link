"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Upload, ArrowLeft, Linkedin } from "lucide-react"
import { verifyGender } from "@/lib/gender-verification"
import { useSupabase } from "@/lib/supabase-provider"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { supabase } = useSupabase()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  })
  const [idDocument, setIdDocument] = useState<File | null>(null)
  const [verificationMethod, setVerificationMethod] = useState("drivers_license")
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "verified" | "failed">("idle")
  const [linkedInAuth, setLinkedInAuth] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0])
    }
  }

  const handleLinkedInAuth = async () => {
    setLoading(true)

    try {
      // Simulate LinkedIn OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setLinkedInAuth(true)
      toast({
        title: "LinkedIn Connected",
        description: "Your LinkedIn profile has been successfully connected and verified.",
      })

      // Move to next step after LinkedIn verification
      setStep(2)
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Failed to connect with LinkedIn. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async () => {
    if (!idDocument && !linkedInAuth) {
      toast({
        title: "Error",
        description: "Please upload an identification document or connect with LinkedIn",
        variant: "destructive",
      })
      return
    }

    setVerificationStatus("verifying")

    try {
      if (idDocument) {
        // Use AI-powered gender verification
        const result = await verifyGender(idDocument, verificationMethod)

        if (result.verified && result.gender === "female") {
          setVerificationStatus("verified")
          toast({
            title: "Verification Successful",
            description: "Your identity has been verified. You can now complete your registration.",
          })
          setStep(2)
        } else {
          setVerificationStatus("failed")
          toast({
            title: "Verification Failed",
            description:
              result.message || "We could not verify your identity. Please try again or use LinkedIn verification.",
            variant: "destructive",
          })
        }
      } else if (linkedInAuth) {
        // LinkedIn verification already completed
        setVerificationStatus("verified")
        setStep(2)
      }
    } catch (error) {
      setVerificationStatus("failed")
      toast({
        title: "Verification Failed",
        description: "We could not verify your identity. Please try again or use a different method.",
        variant: "destructive",
      })
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError

      if (!authData.user) throw new Error("Failed to create user")

      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: formData.fullName,
        username: formData.username,
        email: formData.email,
        is_verified: verificationStatus === "verified",
        verification_method: linkedInAuth ? "linkedin" : verificationMethod,
      })

      if (profileError) throw profileError

      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during signup.",
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
          <div className="flex items-center">
            {step === 2 && (
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => setStep(1)}>
                <ArrowLeft size={16} />
              </Button>
            )}
            <CardTitle className="text-2xl">Create an account</CardTitle>
          </div>
          <CardDescription>Join SheLink, a secure community for women</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  To ensure our community remains a safe space for women, we require identity verification. Your
                  document will be processed securely and not stored after verification.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <h3 className="font-medium">Verify with LinkedIn</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect your LinkedIn profile for quick verification
                      </p>
                    </div>
                    <Button
                      onClick={handleLinkedInAuth}
                      disabled={loading || linkedInAuth}
                      className={linkedInAuth ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : linkedInAuth ? (
                        "Connected ✓"
                      ) : (
                        "Connect"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-muted"></div>
                  <span className="flex-shrink mx-4 text-muted-foreground text-sm">or</span>
                  <div className="flex-grow border-t border-muted"></div>
                </div>
              </div>

              <Tabs defaultValue="drivers_license" onValueChange={(value) => setVerificationMethod(value)}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="drivers_license">Driver's License</TabsTrigger>
                  <TabsTrigger value="passport">Passport</TabsTrigger>
                  <TabsTrigger value="id_card">ID Card</TabsTrigger>
                </TabsList>

                <TabsContent value="drivers_license" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="license">Upload Driver's License</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                      <Input id="license" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      <Button variant="outline" onClick={() => document.getElementById("license")?.click()}>
                        Select File
                      </Button>
                      {idDocument && <p className="text-sm mt-2">{idDocument.name}</p>}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="passport" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="passport">Upload Passport</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                      <Input
                        id="passport"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <Button variant="outline" onClick={() => document.getElementById("passport")?.click()}>
                        Select File
                      </Button>
                      {idDocument && <p className="text-sm mt-2">{idDocument.name}</p>}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="id_card" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="id_card">Upload ID Card</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                      <Input id="id_card" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      <Button variant="outline" onClick={() => document.getElementById("id_card")?.click()}>
                        Select File
                      </Button>
                      {idDocument && <p className="text-sm mt-2">{idDocument.name}</p>}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                className="w-full bg-pink-600 hover:bg-pink-700"
                onClick={handleVerification}
                disabled={(!idDocument && !linkedInAuth) || verificationStatus === "verifying"}
              >
                {verificationStatus === "verifying" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : verificationStatus === "verified" ? (
                  "Verified ✓"
                ) : (
                  "Verify Identity"
                )}
              </Button>

              {/* Demo button for hackathon */}
              <Button type="button" variant="outline" className="w-full mt-2" onClick={() => setStep(2)}>
                Skip Verification (Demo)
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Jane Doe"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="janedoe"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

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
                <Label htmlFor="password">Password</Label>
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
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>

              {/* Demo button for hackathon */}
              <Button type="button" variant="outline" className="w-full mt-2" onClick={() => router.push("/dashboard")}>
                Demo Login (Skip Registration)
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">
            Already have an account?{" "}
            <Link href="/login" className="text-pink-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

