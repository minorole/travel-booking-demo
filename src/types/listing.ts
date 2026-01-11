export interface ListingHost {
  name: string;
  image: string;
  since: string;
  responseRate: string;
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  destinationId: string;
  image: string;
  images: string[];
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  amenities: string[];
  description: string;
  highlights: string[];
  host: ListingHost;
  type: string;
  featured: boolean;
  viewers: number;
}

export interface Review {
  id: string;
  listingId: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export interface FilterState {
  priceRange: [number, number];
  ratings: string[];
  propertyTypes: string[];
  amenities: string[];
}

export type SortOption =
  | "recommended"
  | "price-low"
  | "price-high"
  | "rating";
