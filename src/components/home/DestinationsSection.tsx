import { DestinationCard } from "./DestinationCard";
import { Compass } from "lucide-react";
import destinations from "@/data/destinations.json";
import type { Destination } from "@/types/destination";
import { cn } from "@/lib/utils";

export function DestinationsSection() {
  const allDestinations = destinations as Destination[];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background pointer-events-none" />

      {/* Decorative elements */}
      <div className="absolute top-20 -left-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        {/* Section header with accent */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 mb-4",
              "bg-orange-500/10 rounded-full",
              "animate-fade-in"
            )}>
              <Compass className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">Trending Now</span>
            </div>
            <h2 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground",
              "animate-slide-up"
            )} style={{ animationFillMode: 'forwards' }}>
              Where to next?
            </h2>
            <p className={cn(
              "mt-4 text-lg text-muted-foreground max-w-md",
              "animate-slide-up opacity-0"
            )} style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Explore handpicked destinations loved by travelers worldwide
            </p>
          </div>

          {/* View all link */}
          <a
            href="/search"
            className={cn(
              "group inline-flex items-center gap-2",
              "text-sm font-semibold text-foreground",
              "hover:text-orange-600 transition-colors duration-300",
              "animate-fade-in opacity-0"
            )}
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            View all destinations
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Asymmetric grid layout for visual interest */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {/* First large card */}
          <div className="col-span-2 row-span-2">
            <DestinationCard
              id={allDestinations[0].id}
              name={allDestinations[0].name}
              country={allDestinations[0].country}
              image={allDestinations[0].image}
              listingCount={allDestinations[0].listingCount}
              index={0}
              className="h-full min-h-[400px] lg:min-h-[520px]"
            />
          </div>

          {/* Smaller cards */}
          {allDestinations.slice(1, 5).map((destination, index) => (
            <DestinationCard
              key={destination.id}
              id={destination.id}
              name={destination.name}
              country={destination.country}
              image={destination.image}
              listingCount={destination.listingCount}
              index={index + 1}
              className="min-h-[200px] lg:min-h-[250px]"
            />
          ))}

          {/* Bottom row - remaining destinations */}
          {allDestinations.slice(5).map((destination, index) => (
            <DestinationCard
              key={destination.id}
              id={destination.id}
              name={destination.name}
              country={destination.country}
              image={destination.image}
              listingCount={destination.listingCount}
              index={index + 5}
              className="min-h-[200px] lg:min-h-[250px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
