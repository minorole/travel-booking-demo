import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

type ProductCardProps = Pick<
  Product,
  "id" | "name" | "category" | "image" | "price" | "originalPrice" | "rating" | "reviews"
>;

export function ProductCard({
  id,
  name,
  category,
  image,
  price,
  originalPrice,
  rating,
  reviews,
}: ProductCardProps) {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card className={cn(
      "group relative overflow-hidden py-0",
      "bg-white dark:bg-zinc-900",
      "border border-border/40 rounded-2xl",
      "shadow-sm transition-all duration-400",
      "hover:shadow-xl hover:border-border/60",
      "hover:-translate-y-1"
    )}>
      <Link href={`/shop/${id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary/50 rounded-t-2xl">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-106"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Gradient overlay on hover */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          )} />

          {hasDiscount && (
            <Badge className={cn(
              "absolute left-3 top-3",
              "bg-gradient-to-r from-red-500 to-rose-500 text-white",
              "border-0 shadow-md font-semibold rounded-lg"
            )}>
              -{discountPercent}%
            </Badge>
          )}

          {/* Quick add button - appears on hover */}
          <button
            className={cn(
              "absolute bottom-3 right-3",
              "w-10 h-10 rounded-xl bg-white shadow-lg",
              "flex items-center justify-center",
              "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
              "transition-all duration-300",
              "hover:bg-orange-500 hover:text-white",
              "active:scale-95"
            )}
            onClick={(e) => {
              e.preventDefault();
              console.log(`Added ${name} to cart`);
            }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Product Info */}
        <CardContent className="space-y-2.5 p-4">
          {/* Category Badge */}
          <span className={cn(
            "inline-block text-xs font-medium uppercase tracking-wider",
            "text-muted-foreground"
          )}>
            {category}
          </span>

          {/* Product Name */}
          <h3 className={cn(
            "line-clamp-2 text-sm font-semibold leading-snug",
            "text-foreground group-hover:text-orange-600",
            "transition-colors duration-200"
          )}>
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-display text-xl font-bold text-foreground">
              ${price}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </CardContent>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full gap-2 rounded-xl font-semibold",
            "border-border/60 hover:border-orange-500",
            "hover:bg-orange-500 hover:text-white",
            "transition-all duration-300",
            "active:scale-[0.98]"
          )}
          onClick={(e) => {
            e.preventDefault();
            console.log(`Added ${name} to cart`);
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </Button>
      </div>
    </Card>
  );
}
