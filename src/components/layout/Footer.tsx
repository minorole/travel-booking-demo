"use client";

import {
  Lock,
  Headphones,
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
  Plane,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinks = {
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Safety", href: "/safety" },
      { label: "Cancellation options", href: "/cancellation" },
      { label: "Report concern", href: "/report" },
    ],
  },
  discover: {
    title: "Discover",
    links: [
      { label: "Travel guides", href: "/guides" },
      { label: "Deals", href: "/deals" },
      { label: "Reviews", href: "/reviews" },
      { label: "Mobile app", href: "/app" },
    ],
  },
};

const trustBadges = [
  {
    icon: Lock,
    label: "Secure payments",
    description: "256-bit SSL encryption",
  },
  {
    icon: Headphones,
    label: "24/7 Support",
    description: "Always here to help",
  },
  {
    icon: ShieldCheck,
    label: "Best price guarantee",
    description: "Or we'll match it",
  },
];

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Trust Badges Section */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {trustBadges.map((badge, index) => (
              <div
                key={badge.label}
                className={cn(
                  "flex items-center gap-4 text-center sm:text-left",
                  "sm:justify-start justify-center"
                )}
              >
                <div className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
                  "bg-gradient-to-br from-white/10 to-white/5",
                  "border border-white/10",
                  "shadow-lg shadow-black/20"
                )}>
                  <badge.icon className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-white">
                    {badge.label}
                  </span>
                  <span className="block text-xs text-gray-400 mt-0.5">
                    {badge.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                "bg-gradient-to-br from-orange-500 to-orange-600",
                "shadow-lg shadow-orange-500/30"
              )}>
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Voyager</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-8">
              Discover extraordinary places and create unforgettable memories. Your next adventure starts here.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    "bg-white/5 border border-white/10",
                    "text-gray-400 transition-all duration-300",
                    "hover:bg-white/10 hover:text-white hover:border-white/20",
                    "hover:-translate-y-0.5"
                  )}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-500">
                {section.title}
              </h3>
              <ul className="space-y-3.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-gray-400 transition-colors duration-200",
                        "hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            {/* Copyright */}
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Voyager. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium",
                    "bg-white/5 text-gray-400 border border-white/10"
                  )}
                >
                  {method}
                </span>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
