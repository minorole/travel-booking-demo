import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  image: string;
  listingCount: number;
  className?: string;
  index?: number;
}

export function DestinationCard({
  id,
  name,
  country,
  image,
  listingCount,
  className,
  index = 0,
}: DestinationCardProps) {
  return (
    <Link
      href={`/search?destination=${id}`}
      className={cn(
        "group relative block aspect-[4/5] overflow-hidden rounded-2xl",
        "animate-slide-up opacity-0",
        `stagger-${Math.min(index + 1, 8)}`,
        className
      )}
      style={{ animationFillMode: 'forwards' }}
    >
      {/* Image with zoom effect */}
      <Image
        src={image}
        alt={`${name}, ${country}`}
        fill
        sizes="(max-width: 640px) 50vw, 25vw"
        className={cn(
          "object-cover",
          "transition-transform duration-700 ease-out",
          "group-hover:scale-110"
        )}
      />

      {/* Multi-layer gradient overlay for depth */}
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-t from-black/80 via-black/20 to-transparent",
        "transition-opacity duration-300"
      )} />

      {/* Hover overlay with blue tint */}
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-t from-[#1a56db]/60 via-[#1a56db]/20 to-transparent",
        "opacity-0 group-hover:opacity-100",
        "transition-opacity duration-300"
      )} />

      {/* Animated border on hover */}
      <div className={cn(
        "absolute inset-0 rounded-2xl",
        "ring-2 ring-white/0 ring-inset",
        "group-hover:ring-white/30",
        "transition-all duration-300"
      )} />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        {/* Location icon badge */}
        <div className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 mb-3",
          "bg-white/20 backdrop-blur-sm rounded-full",
          "transform translate-y-2 opacity-0",
          "group-hover:translate-y-0 group-hover:opacity-100",
          "transition-all duration-300 delay-100"
        )}>
          <MapPin className="w-3 h-3 text-white" />
          <span className="text-xs font-medium text-white">{country}</span>
        </div>

        {/* Destination name */}
        <h3 className={cn(
          "font-display text-2xl font-bold text-white mb-1",
          "transform translate-y-1",
          "group-hover:translate-y-0",
          "transition-transform duration-300"
        )}>
          {name}
        </h3>

        {/* Property count */}
        <p className={cn(
          "text-sm font-medium text-white/80",
          "transform translate-y-1",
          "group-hover:translate-y-0",
          "transition-transform duration-300 delay-75"
        )}>
          {listingCount.toLocaleString()} properties
        </p>

        {/* Explore indicator on hover */}
        <div className={cn(
          "flex items-center gap-1.5 mt-3",
          "transform translate-y-4 opacity-0",
          "group-hover:translate-y-0 group-hover:opacity-100",
          "transition-all duration-300 delay-150"
        )}>
          <span className="text-sm font-semibold text-white">Explore</span>
          <svg
            className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Subtle shadow on card */}
      <div className={cn(
        "absolute inset-0 rounded-2xl",
        "shadow-xl shadow-black/20",
        "group-hover:shadow-2xl group-hover:shadow-black/30",
        "transition-shadow duration-300",
        "pointer-events-none"
      )} />
    </Link>
  );
}
