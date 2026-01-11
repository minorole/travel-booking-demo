"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  Tag,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/cart/CartProvider";

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount for demo
  const total = subtotal + shippingCost - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "travel10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h1>
            <p className="mt-2 max-w-md text-gray-500">
              Looks like you have not added any items to your cart yet. Browse
              our shop to find travel essentials for your next adventure.
            </p>
            <Button
              asChild
              className="mt-8 bg-[#f97316] px-8 hover:bg-[#ea580c]"
              size="lg"
            >
              <Link href="/shop">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/shop" className="text-gray-500 hover:text-gray-700">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Cart</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="mt-2 text-gray-500">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-white shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="font-semibold text-gray-900">Cart Items</h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-6">
                    {/* Image */}
                    <Link
                      href={`/shop/${item.product.id}`}
                      className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/shop/${item.product.id}`}
                            className="font-medium text-gray-900 hover:text-[#1a56db]"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-500">
                              ${item.product.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[#1a56db] hover:underline"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="font-medium text-green-600">Free</span>
                  ) : (
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                  )}
                </div>

                {/* Free shipping progress */}
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <div className="rounded-lg bg-blue-50 p-3">
                    <div className="flex items-center gap-2 text-sm text-[#1a56db]">
                      <Truck className="h-4 w-4" />
                      <span>
                        Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more
                        for free shipping!
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100">
                      <div
                        className="h-full bg-[#1a56db] transition-all"
                        style={{
                          width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Discount */}
                {promoApplied && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <Separator />

                {/* Promo Code */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Promo Code
                  </label>
                  <div className="mt-2 flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="pl-9"
                      />
                    </div>
                    <Button
                      onClick={handleApplyPromo}
                      variant="outline"
                      disabled={!promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoError && (
                    <p className="mt-1 text-sm text-red-500">{promoError}</p>
                  )}
                  {promoApplied && (
                    <p className="mt-1 text-sm text-green-600">
                      Promo code applied!
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-400">
                    Try &quot;TRAVEL10&quot; for 10% off
                  </p>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                className="mt-6 w-full bg-[#f97316] py-6 text-lg font-semibold shadow-lg shadow-orange-500/25 hover:bg-[#ea580c] hover:shadow-orange-500/40"
                size="lg"
              >
                Proceed to Checkout
              </Button>

              {/* Trust indicators */}
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                <span>Secure Checkout</span>
                <span>|</span>
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
