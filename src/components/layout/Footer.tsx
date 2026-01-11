"use client";

import {
  Lock,
  Headphones,
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Link from "next/link";

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
  partners: {
    title: "For Partners",
    links: [
      { label: "List your property", href: "/list-property" },
      { label: "Affiliate program", href: "/affiliate" },
      { label: "Partner Hub", href: "/partner-hub" },
    ],
  },
};

const trustBadges = [
  {
    icon: Lock,
    label: "Secure payments",
  },
  {
    icon: Headphones,
    label: "24/7 Support",
  },
  {
    icon: ShieldCheck,
    label: "Best price guarantee",
  },
];

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Apple Pay"];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Trust Badges Section */}
      <div className="border-b border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-left"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-800">
                  <badge.icon className="h-6 w-6 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-gray-200">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors hover:text-white"
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
      <div className="border-t border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              &copy; 2025 TravelHub. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="rounded bg-slate-800 px-3 py-1 text-xs font-medium text-gray-300"
                >
                  {method}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
