import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Star,
  Share,
  Heart,
  Award,
  MapPin,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { ImageGallery } from "@/components/listing/ImageGallery";
import { PricingCard } from "@/components/listing/PricingCard";
import { AmenityList } from "@/components/listing/AmenityList";
import { ReviewSection } from "@/components/listing/ReviewSection";

import listingsData from "@/data/listings.json";
import reviewsData from "@/data/reviews.json";
import type { Listing, Review } from "@/types/listing";

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return listingsData.map((listing) => ({
    id: listing.id,
  }));
}

export async function generateMetadata({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = listingsData.find((l) => l.id === id);

  if (!listing) {
    return { title: "Listing Not Found" };
  }

  return {
    title: `${listing.title} - Voyager`,
    description: listing.description.slice(0, 160),
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = listingsData.find((l) => l.id === id) as Listing | undefined;

  if (!listing) {
    notFound();
  }

  // Get reviews for this listing
  const listingReviews = (reviewsData as Review[]).filter(
    (review) => review.listingId === listing.id
  );

  // Get related listings (same destination or type, excluding current)
  const relatedListings = listingsData
    .filter(
      (l) =>
        l.id !== listing.id &&
        (l.destinationId === listing.destinationId || l.type === listing.type)
    )
    .slice(0, 4) as Listing[];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/search" className="hover:text-foreground transition-colors">
            Search
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate max-w-[200px]">
            {listing.title}
          </span>
        </nav>

        {/* Title section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
              {listing.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">{listing.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({listing.reviews} reviews)
              </span>
              <span className="text-muted-foreground">|</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{listing.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Share className="w-4 h-4" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Heart className="w-4 h-4" />
              Save
            </Button>
          </div>
        </div>

        {/* Image gallery */}
        <ImageGallery images={listing.images} title={listing.title} />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
          {/* Left column - main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property type and host info */}
            <div className="flex items-start justify-between pb-8 border-b">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)} hosted by {listing.host.name}
                </h2>
                <p className="text-muted-foreground">
                  Hosting since {listing.host.since} | {listing.host.responseRate} response rate
                </p>
              </div>
              <Avatar className="w-14 h-14">
                <AvatarImage src={listing.host.image} alt={listing.host.name} />
                <AvatarFallback>
                  {listing.host.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Highlights */}
            <div className="pb-8 border-b">
              <div className="space-y-4">
                {listing.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-0.5">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="pb-8 border-b">
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <div className="prose prose-sm max-w-none">
                {listing.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="pb-8 border-b">
              <h2 className="text-xl font-semibold mb-6">What this place offers</h2>
              <AmenityList amenities={listing.amenities} showAll />
              {listing.amenities.length > 8 && (
                <Button variant="outline" className="mt-6">
                  Show all {listing.amenities.length} amenities
                </Button>
              )}
            </div>

            {/* Reviews section */}
            <div className="pb-8">
              <h2 className="text-xl font-semibold mb-6">Reviews</h2>
              <ReviewSection
                reviews={listingReviews}
                averageRating={listing.rating}
                totalReviews={listing.reviews}
              />
            </div>
          </div>

          {/* Right column - pricing card */}
          <div className="lg:col-span-1">
            <PricingCard
              price={listing.price}
              originalPrice={listing.originalPrice}
              rating={listing.rating}
              reviews={listing.reviews}
              unitsLeft={listing.viewers}
            />
          </div>
        </div>

        {/* Related listings */}
        {relatedListings.length > 0 && (
          <section className="mt-16 pt-12 border-t">
            <h2 className="text-2xl font-semibold mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedListings.map((related) => (
                <Link
                  key={related.id}
                  href={`/listing/${related.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={related.images[0]}
                        alt={related.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {related.originalPrice && (
                        <Badge className="absolute top-3 left-3 bg-green-600">
                          {Math.round(
                            ((related.originalPrice - related.price) /
                              related.originalPrice) *
                              100
                          )}
                          % off
                        </Badge>
                      )}
                    </div>
                    <CardContent className="px-1 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate pr-2">
                          {related.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm shrink-0">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{related.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {related.location}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">${related.price}</span>
                        {related.originalPrice && (
                          <span className="text-muted-foreground line-through ml-2">
                            ${related.originalPrice}
                          </span>
                        )}
                        <span className="text-muted-foreground"> / night</span>
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
