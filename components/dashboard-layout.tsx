"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Package2,
  Settings,
  Users,
  Truck,
  Warehouse,
  LogOut,
  Menu,
  RefreshCw,
  Shield,
  User,
  MapPin,
  ClipboardList,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getRoleName } from "@/lib/users"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const { user, logout } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Set initial refresh time
  useEffect(() => {
    setLastRefreshed(new Date())
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      setLastRefreshed(new Date())
    }, 1500)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // If no user yet, show nothing (will redirect)
  if (!user) {
    return null
  }

  const userRole = user.role

  // Get role icon based on role ID
  const getRoleIcon = (roleId: number) => {
    const icons = [Shield, User, Warehouse, Truck, Package2]
    const Icon = icons[roleId] || User
    return <Icon className="h-6 w-6" />
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U"
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Navigation items based on user role
  const getNavItems = (role: number) => {
    // Common navigation items for all roles
    const commonItems = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: BarChart3,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ]

    // Role-specific navigation items
    const roleSpecificItems = {
      0: [
        // Admin
        {
          title: "Users",
          href: "/dashboard/users",
          icon: Users,
        },
        {
          title: "Providers",
          href: "/dashboard/providers",
          icon: User,
        },
        {
          title: "Stock",
          href: "/dashboard/stock",
          icon: Warehouse,
        },
        {
          title: "Shippers",
          href: "/dashboard/shippers",
          icon: Truck,
        },
      ],
      1: [
        // Provider
        {
          title: "Products",
          href: "/dashboard/products",
          icon: Package2,
        },
        {
          title: "Orders",
          href: "/dashboard/orders",
          icon: Package2,
        },
        {
          title: "Address Form",
          href: "/dashboard/address-form",
          icon: MapPin,
        },
        {
          title: "Stock Form",
          href: "/dashboard/stock-form",
          icon: ClipboardList,
        },
      ],
      2: [
        // Stock
        {
          title: "Inventory",
          href: "/dashboard/inventory",
          icon: Warehouse,
        },
        {
          title: "Address Form",
          href: "/dashboard/address-form",
          icon: MapPin,
        },
        {
          title: "Stock Form",
          href: "/dashboard/stock-form",
          icon: ClipboardList,
        },
      ],
      3: [
        // Shipper
        {
          title: "Shipments",
          href: "/dashboard/shipments",
          icon: Truck,
        },
        {
          title: "Routes",
          href: "/dashboard/routes",
          icon: Truck,
        },
      ],
      4: [
        // Receiver
        {
          title: "Deliveries",
          href: "/dashboard/deliveries",
          icon: Package2,
        },
        {
          title: "Address Form",
          href: "/dashboard/address-form",
          icon: MapPin,
        },
        {
          title: "History",
          href: "/dashboard/history",
          icon: Package2,
        },
      ],
    }

    return [...commonItems, ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || [])]
  }

  const navItems = getNavItems(userRole)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span>LogiTrack</span>
              </Link>
              <div className="my-4 border-t" />
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground",
                    pathname === item.href && "bg-muted text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
              <div className="my-4 border-t" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span>LogiTrack</span>
        </Link>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
                  <span className="sr-only">Refresh data</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh data</p>
                {lastRefreshed && (
                  <p className="text-xs text-muted-foreground">Last refreshed: {lastRefreshed.toLocaleTimeString()}</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{getRoleName(user.role)}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground",
                  pathname === item.href && "bg-muted font-medium text-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
            <div className="my-4 border-t" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
