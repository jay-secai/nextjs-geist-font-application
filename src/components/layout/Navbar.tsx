"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  ClipboardList,
  Users,
  UserCircle,
  Settings,
  Menu,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

const routes = [
  {
    href: "/technicians",
    label: "Technicians",
    icon: Users,
  },
  {
    href: "/work-orders",
    label: "Work Orders",
    icon: ClipboardList,
  },
  {
    href: "/schedule",
    label: "Schedule",
    icon: Calendar,
  },
  {
    href: "/customer",
    label: "Customer Portal",
    icon: UserCircle,
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl mr-8">
          TechScheduler
        </Link>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col space-y-4 mt-4">
              {routes.map((route) => {
                const Icon = route.icon
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors",
                      pathname === route.href && "text-foreground font-medium"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{route.label}</span>
                  </Link>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 ml-6">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors",
                  pathname === route.href && "text-foreground font-medium"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{route.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
