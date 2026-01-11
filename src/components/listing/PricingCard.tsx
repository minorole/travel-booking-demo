"use client";

import { useState } from "react";
import { Star, ChevronDown, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  unitsLeft?: number;
}

export function PricingCard({
  price,
  originalPrice,
  rating,
  reviews,
  unitsLeft = 3,
}: PricingCardProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const nights = 5; // Example calculation
  const subtotal = price * nights;
  const cleaningFee = 75;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaningFee + serviceFee;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="sticky top-24 shadow-lg border-0">
      <CardContent className="p-6">
        {/* Price header */}
        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">${price}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
            <span className="text-muted-foreground">night</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({reviews} reviews)</span>
          </div>
        </div>

        {discount > 0 && (
          <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium mb-4">
            {discount}% off - Limited time offer
          </div>
        )}

        {/* Date inputs */}
        <div className="border rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-2">
            <div className="p-3 border-r">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-sm bg-transparent outline-none"
                placeholder="Add date"
              />
            </div>
            <div className="p-3">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1">
                Checkout
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-sm bg-transparent outline-none"
                placeholder="Add date"
              />
            </div>
          </div>
          <div className="border-t p-3 relative">
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1">
              Guests
            </label>
            <button
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              className="w-full flex items-center justify-between text-sm"
            >
              <span>{guests} guest{guests > 1 ? 's' : ''}</span>
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform",
                showGuestDropdown && "rotate-180"
              )} />
            </button>
            {showGuestDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-xl shadow-lg p-4 z-10">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Guests</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-full border flex items-center justify-center hover:border-gray-400"
                      disabled={guests <= 1}
                    >
                      -
                    </button>
                    <span className="w-4 text-center">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-8 h-8 rounded-full border flex items-center justify-center hover:border-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reserve button */}
        <Button
          className="w-full h-12 text-base font-semibold bg-orange-500 hover:bg-orange-600"
          size="lg"
        >
          Reserve
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-3">
          You won't be charged yet
        </p>

        {/* Price breakdown */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="underline">${price} x {nights} nights</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="underline">Cleaning fee</span>
            <span>${cleaningFee}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="underline">Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total before taxes</span>
            <span>${total}</span>
          </div>
        </div>

        {/* Urgency message */}
        {unitsLeft <= 5 && (
          <div className="mt-4 flex items-center gap-2 text-orange-600 text-sm font-medium">
            <Flame className="w-4 h-4" />
            <span>Only {unitsLeft} left at this price!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
