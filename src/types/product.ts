export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  description?: string;
}
