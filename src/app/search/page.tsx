"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FilterSidebarDesktop, FilterSidebarMobile } from "@/components/search/FilterSidebar";
import { ListingCard } from "@/components/search/ListingCard";
import { SortDropdown } from "@/components/search/SortDropdown";
import listingsData from "@/data/listings.json";
import type { Listing, FilterState, SortOption } from "@/types/listing";

const listings = listingsData as Listing[];

const MAX_PRICE = Math.max(...listings.map((l) => l.price));

const defaultFilters: FilterState = {
  priceRange: [0, MAX_PRICE],
  ratings: [],
  propertyTypes: [],
  amenities: [],
};

function filterListings(listings: Listing[], filters: FilterState): Listing[] {
  return listings.filter((listing) => {
    // Price filter
    if (
      listing.price < filters.priceRange[0] ||
      listing.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Rating filter
    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings.map(Number));
      if (listing.rating < minRating) {
        return false;
      }
    }

    // Property type filter
    if (
      filters.propertyTypes.length > 0 &&
      !filters.propertyTypes.includes(listing.type)
    ) {
      return false;
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        listing.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }

    return true;
  });
}

function sortListings(listings: Listing[], sortOption: SortOption): Listing[] {
  const sorted = [...listings];

  switch (sortOption) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "recommended":
    default:
      // Recommended: combination of rating and reviews
      return sorted.sort(
        (a, b) => b.rating * Math.log(b.reviews + 1) - a.rating * Math.log(a.reviews + 1)
      );
  }
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "All Destinations";

  const [filters, setFilters] = React.useState<FilterState>(defaultFilters);
  const [sortOption, setSortOption] = React.useState<SortOption>("recommended");

  const filteredListings = React.useMemo(() => {
    return filterListings(listings, filters);
  }, [filters]);

  const sortedListings = React.useMemo(() => {
    return sortListings(filteredListings, sortOption);
  }, [filteredListings, sortOption]);

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const filterProps = {
    filters,
    onFiltersChange: setFilters,
    onClearAll: handleClearFilters,
    maxPrice: MAX_PRICE,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {sortedListings.length} stays in {destination}
          </h1>
          <p className="text-muted-foreground">
            Find the perfect place for your next adventure
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Mobile filter button */}
            <FilterSidebarMobile {...filterProps} />
            <span className="text-sm text-muted-foreground hidden sm:inline lg:hidden">
              {sortedListings.length} properties found
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Sort by:
            </span>
            <SortDropdown value={sortOption} onValueChange={setSortOption} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <FilterSidebarDesktop {...filterProps} />

          {/* Results Grid */}
          <div className="flex-1 min-w-0">
            {sortedListings.length > 0 ? (
              <div className="space-y-4">
                {sortedListings.map((listing, index) => (
                  <ListingCard key={listing.id} listing={listing} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-card border rounded-lg p-12 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-2">
                    No properties found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to see more results.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="text-primary hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchPageLoading() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="h-9 w-64 bg-muted animate-pulse rounded-lg mb-2" />
          <div className="h-5 w-48 bg-muted animate-pulse rounded-lg" />
        </div>
        <div className="flex gap-8">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-card border rounded-lg p-5 h-96 animate-pulse" />
          </div>
          <div className="flex-1 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border rounded-lg h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}
