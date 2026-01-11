import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/product";

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
    <Card className="group relative overflow-hidden border-0 bg-white py-0 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:bg-zinc-900">
      <Link href={`/shop/${id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {hasDiscount && (
            <Badge
              variant="destructive"
              className="absolute left-3 top-3 rounded-md text-xs font-semibold"
            >
              -{discountPercent}%
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <CardContent className="space-y-3 p-4">
          {/* Category Badge */}
          <Badge variant="secondary" className="text-xs font-normal text-muted-foreground">
            {category}
          </Badge>

          {/* Product Name */}
          <h3 className="line-clamp-2 text-sm font-medium leading-tight text-foreground group-hover:text-primary">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-foreground">${price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
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
          className="w-full gap-2"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add to cart logic
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
