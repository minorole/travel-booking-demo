"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plane,
  Menu,
  User,
  ChevronDown,
  Hotel,
  Car,
  Ticket,
  Globe,
  LogOut,
  Settings,
  Heart,
  Clock,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { CartDrawer } from "@/components/cart/CartDrawer";

const navItems = [
  { label: "Stays", icon: Hotel, href: "#stays" },
  { label: "Flights", icon: Plane, href: "#flights" },
  { label: "Car Rentals", icon: Car, href: "#car-rentals" },
  { label: "Attractions", icon: Ticket, href: "#attractions" },
  { label: "Shop", icon: ShoppingBag, href: "/shop" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a56db]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#1a56db]/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">TravelHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Currency Selector (simplified - just USD display) */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden text-white/90 hover:bg-white/10 hover:text-white sm:flex"
          >
            <Globe className="mr-1.5 h-4 w-4" />
            USD
          </Button>

          {/* Cart Drawer */}
          <CartDrawer />

          {/* User Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hidden gap-2 text-white/90 hover:bg-white/10 hover:text-white sm:flex"
              >
                <Avatar className="h-7 w-7 border border-white/20">
                  <AvatarImage src="/avatar-placeholder.png" alt="User" />
                  <AvatarFallback className="bg-white/10 text-xs text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Account</span>
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Guest User</p>
                  <p className="text-xs text-muted-foreground">
                    Sign in to access your bookings
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Clock className="mr-2 h-4 w-4" />
                My Bookings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                Saved
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* CTA Button - Desktop */}
          <Button
            className="hidden bg-[#f97316] font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#ea580c] hover:shadow-orange-500/40 sm:flex"
            size="sm"
          >
            List Your Property
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a56db]">
                    <Plane className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-[#1a56db]">
                    TravelHub
                  </span>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile User Section */}
              <div className="border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-[#1a56db]/20">
                    <AvatarFallback className="bg-[#1a56db]/10 text-[#1a56db]">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">Guest User</p>
                    <p className="text-sm text-gray-500">Sign in to continue</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#1a56db] text-[#1a56db] hover:bg-[#1a56db] hover:text-white"
                    size="sm"
                  >
                    Sign In
                  </Button>
                  <Button
                    className="flex-1 bg-[#1a56db] text-white hover:bg-[#1a56db]/90"
                    size="sm"
                  >
                    Register
                  </Button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Browse
                </p>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 text-[#1a56db]" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              <Separator />

              {/* Mobile Account Links */}
              <div className="p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Account
                </p>
                <div className="space-y-1">
                  <Link
                    href="#bookings"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">My Bookings</span>
                  </Link>
                  <Link
                    href="#saved"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <Heart className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Saved</span>
                  </Link>
                </div>
              </div>

              {/* Mobile Currency */}
              <div className="border-t p-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Currency</span>
                  <span className="ml-auto text-sm text-gray-500">USD</span>
                </button>
              </div>

              {/* Mobile CTA */}
              <div className="mt-auto border-t p-4">
                <Button className="w-full bg-[#f97316] font-semibold text-white hover:bg-[#ea580c]">
                  List Your Property
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
