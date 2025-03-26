"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, MessageCircle, Users, FileText, Settings, User, Bell, HelpCircle } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageCircle,
  },
  {
    title: "Community",
    href: "/dashboard/community",
    icon: Users,
  },
  {
    title: "Guidelines",
    href: "/dashboard/governance",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex w-64 flex-col border-r bg-background">
      <div className="flex flex-col gap-2 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-pink-600 text-white" : "hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

