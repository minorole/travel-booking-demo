import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { ProductCard } from "./ProductCard";
import productsData from "@/data/products.json";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

const products = productsData as Product[];

export function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-secondary/30 via-background to-background">
      {/* Decorative elements */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 mb-4",
              "bg-blue-500/10 rounded-full",
              "animate-fade-in"
            )}>
              <ShoppingBag className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Shop</span>
            </div>
            <h2 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground",
              "animate-slide-up"
            )} style={{ animationFillMode: 'forwards' }}>
              Travel Essentials
            </h2>
            <p className={cn(
              "mt-4 text-lg text-muted-foreground",
              "animate-slide-up opacity-0"
            )} style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Curated gear from brands travelers trust
            </p>
          </div>

          <Link
            href="/shop"
            className={cn(
              "group inline-flex items-center gap-2",
              "text-sm font-semibold text-foreground",
              "hover:text-orange-600 transition-colors duration-300",
              "animate-fade-in opacity-0"
            )}
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            View all products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid - Horizontal scroll on mobile, grid on desktop */}
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          {/* Scroll indicators for mobile */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 md:hidden">
            <div className={cn(
              "w-8 h-8 rounded-full bg-white shadow-lg",
              "flex items-center justify-center",
              "animate-pulse"
            )}>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-4 md:gap-6 lg:gap-8 md:overflow-visible md:pb-0">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "w-[280px] flex-shrink-0 md:w-auto",
                  "animate-slide-up opacity-0",
                  `stagger-${Math.min(index + 1, 8)}`
                )}
                style={{ animationFillMode: 'forwards' }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
