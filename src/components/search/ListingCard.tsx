"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Waves,
  UtensilsCrossed,
  Snowflake,
  Dumbbell,
  Sparkles,
  Tv,
  WashingMachine,
  Coffee,
  Eye,
  Mountain,
  Bike,
  Heater,
  Bath as BathIcon,
  Utensils,
  Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/types/listing";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

const amenityIcons: Record<string, React.ElementType> = {
  "WiFi": Wifi,
  "Free Parking": Car,
  "Pool": Waves,
  "Kitchen": UtensilsCrossed,
  "Air Conditioning": Snowflake,
  "Gym": Dumbbell,
  "Spa": Sparkles,
  "TV": Tv,
  "Washer": WashingMachine,
  "Breakfast Included": Coffee,
  "Ocean View": Eye,
  "Caldera View": Eye,
  "Mountain View": Mountain,
  "Hot Tub": BathIcon,
  "Bicycle Rental": Bike,
  "Heating": Heater,
  "Traditional Garden": Sparkles,
  "Room Service": Utensils,
};

export function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const {
    id,
    title,
    location,
    image,
    images,
    price,
    originalPrice,
    rating,
    reviews,
    type,
    amenities,
    viewers,
    host,
  } = listing;

  const displayedAmenities = amenities.slice(0, 4);
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const displayImage = image || images?.[0] || "/placeholder.jpg";
  const displayType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <Link
      href={`/listing/${id}`}
      className={cn(
        "block group animate-slide-up opacity-0",
        `stagger-${Math.min(index + 1, 8)}`
      )}
      style={{ animationFillMode: 'forwards' }}
    >
      <article className={cn(
        "flex flex-col sm:flex-row bg-card rounded-2xl overflow-hidden",
        "border border-border/40 shadow-md",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:border-border/60",
        "hover:-translate-y-1"
      )}>
        {/* Image Section */}
        <div className="relative w-full sm:w-80 h-56 sm:h-auto sm:min-h-[260px] flex-shrink-0 overflow-hidden">
          <Image
            src={displayImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 320px"
          />

          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Type Badge */}
          <Badge
            className={cn(
              "absolute top-4 left-4",
              "bg-white/95 text-foreground backdrop-blur-sm",
              "border-0 shadow-sm font-medium",
              "hover:bg-white"
            )}
          >
            {displayType}
          </Badge>

          {/* Discount Badge */}
          {discount && (
            <Badge className={cn(
              "absolute top-4 right-4",
              "bg-gradient-to-r from-red-500 to-rose-500 text-white",
              "border-0 shadow-md font-semibold"
            )}>
              -{discount}%
            </Badge>
          )}

          {/* Save Button */}
          <button
            className={cn(
              "absolute bottom-4 right-4",
              "w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm",
              "flex items-center justify-center",
              "opacity-0 group-hover:opacity-100",
              "transition-all duration-300",
              "hover:bg-white hover:scale-110",
              "shadow-md"
            )}
            onClick={(e) => {
              e.preventDefault();
              // Save functionality
            }}
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 sm:p-6">
          {/* Header */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className={cn(
                "font-display font-semibold text-lg leading-tight",
                "text-foreground group-hover:text-primary",
                "transition-colors duration-200 line-clamp-2"
              )}>
                {title}
              </h3>

              {/* Rating Badge - Premium Style */}
              <div className={cn(
                "flex items-center gap-1.5 flex-shrink-0",
                "bg-gradient-to-r from-[#1a56db] to-[#1e40af]",
                "text-white px-3 py-1.5 rounded-lg",
                "shadow-sm"
              )}>
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-sm font-bold">{rating}</span>
              </div>
            </div>

            {/* Location & Reviews */}
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <MapPin className="w-4 h-4 text-[#1a56db]" />
              <span className="text-sm font-medium">{location}</span>
              <span className="text-border">•</span>
              <span className="text-sm">{reviews.toLocaleString()} reviews</span>
            </div>

            {/* Host info */}
            {host && (
              <p className="text-sm text-muted-foreground mb-4">
                Hosted by <span className="font-medium text-foreground">{host.name}</span>
                <span className="mx-1.5">·</span>
                <span className="text-green-600 font-medium">{host.responseRate}</span> response rate
              </p>
            )}

            {/* Amenities - Pill Style */}
            <div className="flex flex-wrap gap-2 mb-4">
              {displayedAmenities.map((amenity) => {
                const IconComponent = amenityIcons[amenity] || Sparkles;
                return (
                  <div
                    key={amenity}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5",
                      "bg-secondary/80 rounded-full",
                      "text-sm text-muted-foreground",
                      "transition-colors duration-200",
                      "group-hover:bg-secondary"
                    )}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{amenity}</span>
                  </div>
                );
              })}
              {amenities.length > 4 && (
                <span className={cn(
                  "px-3 py-1.5 rounded-full",
                  "bg-secondary/50 text-sm text-muted-foreground"
                )}>
                  +{amenities.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Footer - Price & CTA */}
          <div className="flex items-end justify-between gap-4 pt-4 border-t border-border/50">
            <div>
              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-foreground">
                  ${price}
                </span>
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${originalPrice}
                  </span>
                )}
                <span className="text-muted-foreground text-sm">/ night</span>
              </div>

              {/* Urgency Indicator */}
              {viewers > 0 && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-sm text-red-600 font-medium">
                    {viewers} people viewing now
                  </span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Button className={cn(
              "flex-shrink-0 px-5",
              "bg-gradient-to-r from-[#f97316] to-[#ea580c]",
              "hover:from-[#ea580c] hover:to-[#dc2626]",
              "text-white font-semibold shadow-md",
              "hover:shadow-lg hover:shadow-orange-500/25",
              "transition-all duration-300",
              "active:scale-[0.98]"
            )}>
              See availability
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}
