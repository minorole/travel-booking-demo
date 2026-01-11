"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/components/cart/CartProvider";
import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

const products = productsData as Product[];

// Extract unique categories from products
const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const { addItem } = useCart();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === "All"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    // Sort products
    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "featured":
      default:
        return [...filtered].sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#1a56db] to-[#1e40af] py-16 text-white">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Shop</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Travel Essentials Shop
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Everything you need for your next adventure. From luggage to
            electronics, we have got you covered.
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Category Tabs & Sort */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#1a56db] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <p className="mb-6 text-sm text-gray-500">
          Showing {filteredAndSortedProducts.length} products
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Product Image */}
              <Link href={`/shop/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.originalPrice && (
                  <Badge className="absolute left-3 top-3 bg-red-500 text-white">
                    Sale
                  </Badge>
                )}
              </Link>

              {/* Product Info */}
              <div className="flex flex-1 flex-col p-4">
                <Link href={`/shop/${product.id}`}>
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <h3 className="mt-1 font-medium text-gray-900 line-clamp-2 group-hover:text-[#1a56db]">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-auto pt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => addItem(product)}
                  className="mt-3 w-full bg-[#f97316] text-white hover:bg-[#ea580c]"
                  size="sm"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-500">
              No products found in this category.
            </p>
            <Button
              onClick={() => setSelectedCategory("All")}
              variant="outline"
              className="mt-4"
            >
              View All Products
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
