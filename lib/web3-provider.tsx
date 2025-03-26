"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Ethereum window object type declaration
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (eventName: string, callback: (params: any) => void) => void
      removeListener: (eventName: string, callback: (params: any) => void) => void
    }
  }
}

// AI content moderation interface
type ContentModerationContext = {
  moderateContent: (content: string) => Promise<{
    isAppropriate: boolean
    moderatedContent?: string
    reason?: string
  }>
  isModerating: boolean
}

const Context = createContext<ContentModerationContext | undefined>(undefined)

// Governance contract interface
type GovernanceContext = {
  contractAddress: string
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
}

const GovernanceContext = createContext<GovernanceContext | undefined>(undefined)

// Governance contract address
const GOVERNANCE_CONTRACT_ADDRESS = "0x29BE647ce7dec119Cf68766f571a981A54CfFBf6"

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [isModerating, setIsModerating] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setIsConnected(true)
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been connected successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Please install MetaMask or another Web3 wallet to connect.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection Error",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Disconnect wallet function
  const disconnectWallet = async () => {
    try {
      setIsConnected(false)
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      })
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
      toast({
        title: "Error",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  // AI-based content moderation function
  const moderateContent = async (content: string) => {
    try {
      setIsModerating(true)

      // In a real implementation, this would call an AI moderation API
      // For demo purposes, we'll simulate moderation with basic checks

      const inappropriateTerms = [
        "hate",
        "kill",
        "attack",
        "stupid",
        "idiot",
        "dumb",
        "offensive",
        "racist",
        "sexist",
        "violent",
      ]

      let isAppropriate = true
      let reason = ""
      let moderatedContent = content

      // Check for inappropriate content
      for (const term of inappropriateTerms) {
        if (content.toLowerCase().includes(term)) {
          isAppropriate = false
          reason = `Content contains inappropriate language: "${term}"`
          moderatedContent = content.replace(new RegExp(term, "gi"), "***")
        }
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      return {
        isAppropriate,
        moderatedContent,
        reason,
      }
    } catch (error) {
      console.error("Error moderating content:", error)
      toast({
        title: "Moderation Error",
        description: "Failed to moderate content. Please try again.",
        variant: "destructive",
      })
      return { isAppropriate: true }
    } finally {
      setIsModerating(false)
    }
  }

  return (
    <Context.Provider value={{ moderateContent, isModerating }}>
      <GovernanceContext.Provider 
        value={{ 
          contractAddress: GOVERNANCE_CONTRACT_ADDRESS,
          isConnected,
          connectWallet,
          disconnectWallet
        }}
      >
        {children}
      </GovernanceContext.Provider>
    </Context.Provider>
  )
}

export const useWeb3 = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useWeb3 must be used inside Web3Provider")
  }
  return context
}

export const useGovernance = () => {
  const context = useContext(GovernanceContext)
  if (context === undefined) {
    throw new Error("useGovernance must be used inside Web3Provider")
  }
  return context
}

