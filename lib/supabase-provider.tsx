"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient, Session } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/components/ui/use-toast"

type SupabaseContext = {
  supabase: SupabaseClient
  session: Session | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() =>
    createClientComponentClient({
      supabaseUrl: "https://jrhjpuxjtqilbmpalusd.supabase.co",
      supabaseKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyaGpwdXhqdHFpbGJtcGFsdXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODEwMTgsImV4cCI6MjA1ODQ1NzAxOH0.xRP2TF3fv5mZ2-fEcyXKTGPMR3uPbweFgPkyMSQnk4k",
    }),
  )
  const [session, setSession] = useState<Session | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) {
        console.error("Error getting session:", error)
        toast({
          title: "Authentication Error",
          description: "There was a problem with your authentication. Please try logging in again.",
          variant: "destructive",
        })
      }
      setSession(session)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, toast])

  return <Context.Provider value={{ supabase, session }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}

