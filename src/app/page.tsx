"use client";

import Link from "next/link";
import { Star, Shield, CreditCard, Clock, Headphones, Sparkles, Users, MapPin } from "lucide-react";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { SearchBar } from "@/components/search/SearchBar";
import { cn } from "@/lib/utils";

function TrustBar() {
  const trustItems = [
    {
      icon: Shield,
      title: "Secure Booking",
      description: "SSL encrypted checkout",
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Pay in installments",
    },
    {
      icon: Clock,
      title: "Free Cancellation",
      description: "On most bookings",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here to help",
    },
  ];

  return (
    <section className="border-y border-border/50 bg-gradient-to-b from-secondary/50 to-background py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {trustItems.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "flex items-center gap-3 md:gap-4",
                "animate-slide-up opacity-0",
                `stagger-${index + 1}`
              )}
              style={{ animationFillMode: 'forwards' }}
            >
              <div className={cn(
                "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl",
                "bg-gradient-to-br from-orange-100 to-orange-50",
                "shadow-sm border border-orange-100/50"
              )}>
                <item.icon className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroWithSearch() {
  return (
    <section className="relative min-h-[650px] w-full overflow-hidden lg:min-h-[750px]">
      {/* Background Image with Ken Burns effect */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat",
          "animate-[kenburns_20s_ease-in-out_infinite_alternate]"
        )}
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80')",
        }}
      />

      {/* Multi-layer gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/70 via-[#1e3a5f]/50 to-[#0f172a]/80" />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full min-h-[650px] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:min-h-[750px] lg:px-8">
        {/* Badge */}
        <div className={cn(
          "mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full",
          "bg-white/10 backdrop-blur-md border border-white/20",
          "animate-fade-in"
        )}>
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium text-white/90">Trusted by 2M+ travelers worldwide</span>
        </div>

        {/* Heading with gradient */}
        <h1 className={cn(
          "font-display mb-6 text-4xl font-bold tracking-tight text-white",
          "sm:text-5xl md:text-6xl lg:text-7xl",
          "animate-slide-up"
        )} style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          Find your next
          <span className="block mt-2 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            adventure
          </span>
        </h1>

        {/* Subheading */}
        <p className={cn(
          "mb-10 max-w-2xl text-lg text-white/80 sm:text-xl md:text-2xl",
          "animate-slide-up opacity-0"
        )} style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Discover amazing places at exclusive deals.
          <span className="hidden sm:inline"> Book with confidence.</span>
        </p>

        {/* Search Bar */}
        <div className={cn(
          "w-full max-w-4xl",
          "animate-slide-up opacity-0"
        )} style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <Link href="/search">
            <SearchBar variant="hero" />
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className={cn(
          "mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-8",
          "animate-fade-in opacity-0"
        )} style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          {/* Rating */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-white">4.9/5 rating</span>
          </div>

          {/* Properties count */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
            <MapPin className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-medium text-white">500,000+ stays</span>
          </div>

          {/* Users count */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-white">2M+ happy guests</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className={cn(
      "relative py-20 overflow-hidden",
      "bg-gradient-to-br from-[#1a56db] via-[#1e40af] to-[#1e3a8a]"
    )}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container relative mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Icon */}
          <div className={cn(
            "inline-flex items-center justify-center w-16 h-16 mb-6",
            "bg-white/10 rounded-2xl backdrop-blur-sm",
            "border border-white/20"
          )}>
            <Sparkles className="w-8 h-8 text-orange-400" />
          </div>

          <h2 className="font-display mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Get exclusive deals
          </h2>
          <p className="mb-8 text-lg text-blue-100/80 md:text-xl">
            Subscribe to receive the best travel offers directly to your inbox
          </p>

          {/* Email form */}
          <div className={cn(
            "mx-auto flex max-w-lg flex-col gap-3 sm:flex-row",
            "p-2 rounded-2xl bg-white/10 backdrop-blur-sm",
            "border border-white/20"
          )}>
            <input
              type="email"
              placeholder="Enter your email"
              className={cn(
                "flex-1 rounded-xl border-0 px-5 py-3.5",
                "bg-white text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-orange-500/50",
                "text-base"
              )}
            />
            <button className={cn(
              "rounded-xl px-8 py-3.5",
              "bg-gradient-to-r from-orange-500 to-orange-600",
              "font-semibold text-white",
              "shadow-lg shadow-orange-500/30",
              "hover:shadow-xl hover:shadow-orange-500/40",
              "transition-all duration-300",
              "active:scale-[0.98]"
            )}>
              Subscribe
            </button>
          </div>

          <p className="mt-6 text-sm text-blue-200/60">
            Join 200,000+ travelers · No spam, unsubscribe anytime
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroWithSearch />
      <TrustBar />
      <DestinationsSection />
      <FeaturedProducts />
      <NewsletterSection />

      {/* Add Ken Burns keyframe animation */}
      <style jsx global>{`
        @keyframes kenburns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.1) translate(-2%, -1%);
          }
        }
      `}</style>
    </div>
  );
}
