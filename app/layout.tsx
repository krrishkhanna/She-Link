import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SupabaseProvider } from "@/lib/supabase-provider"
import { EncryptionProvider } from "@/lib/encryption-provider"
import { Web3Provider } from "@/lib/web3-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SheLink - Women's Community Forum",
  description: "A secure, decentralized community forum for women",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SupabaseProvider>
            <EncryptionProvider>
              <Web3Provider>
                {children}
                <Toaster />
              </Web3Provider>
            </EncryptionProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'