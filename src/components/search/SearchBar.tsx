"use client";

import * as React from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "hero" | "compact";
  onSearch?: () => void;
}

export function SearchBar({ variant = "hero", onSearch }: SearchBarProps) {
  const [destination, setDestination] = React.useState("");
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [guestsOpen, setGuestsOpen] = React.useState(false);
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);

  const isHero = variant === "hero";

  const handleSearch = () => {
    onSearch?.();
  };

  const guestsText = `${adults} adult${adults !== 1 ? "s" : ""}, ${children} child${children !== 1 ? "ren" : ""}`;

  return (
    <div
      className={cn(
        "w-full bg-white rounded-lg shadow-lg",
        "border border-gray-100",
        isHero
          ? "p-4 md:p-6 rounded-xl shadow-xl"
          : "p-2 md:p-3 rounded-lg shadow-md"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          "md:flex-row md:items-center md:gap-2",
          isHero ? "lg:gap-3" : "lg:gap-2"
        )}
      >
        {/* Destination Input */}
        <div className={cn("flex-1 min-w-0", isHero ? "md:flex-[2]" : "")}>
          <div className="relative group">
            <MapPin
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors",
                "group-focus-within:text-orange-500",
                isHero ? "h-5 w-5" : "h-4 w-4"
              )}
            />
            <Input
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={cn(
                "w-full border-gray-200 bg-gray-50/50",
                "placeholder:text-gray-400",
                "focus:bg-white focus:border-orange-300 focus-visible:ring-orange-100",
                "transition-all duration-200",
                isHero ? "h-12 md:h-14 pl-11 text-base" : "h-10 pl-10 text-sm"
              )}
            />
          </div>
        </div>

        {/* Divider (desktop only) */}
        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Check-in Date */}
        <div className={cn("flex-1 min-w-0", isHero ? "md:flex-1" : "")}>
          <div className="relative group">
            <Calendar
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors",
                "group-focus-within:text-orange-500",
                isHero ? "h-5 w-5" : "h-4 w-4"
              )}
            />
            <Input
              type="text"
              placeholder="Check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className={cn(
                "w-full border-gray-200 bg-gray-50/50",
                "placeholder:text-gray-400",
                "focus:bg-white focus:border-orange-300 focus-visible:ring-orange-100",
                "transition-all duration-200",
                isHero ? "h-12 md:h-14 pl-11 text-base" : "h-10 pl-10 text-sm"
              )}
            />
          </div>
        </div>

        {/* Divider (desktop only) */}
        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Check-out Date */}
        <div className={cn("flex-1 min-w-0", isHero ? "md:flex-1" : "")}>
          <div className="relative group">
            <Calendar
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors",
                "group-focus-within:text-orange-500",
                isHero ? "h-5 w-5" : "h-4 w-4"
              )}
            />
            <Input
              type="text"
              placeholder="Check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={cn(
                "w-full border-gray-200 bg-gray-50/50",
                "placeholder:text-gray-400",
                "focus:bg-white focus:border-orange-300 focus-visible:ring-orange-100",
                "transition-all duration-200",
                isHero ? "h-12 md:h-14 pl-11 text-base" : "h-10 pl-10 text-sm"
              )}
            />
          </div>
        </div>

        {/* Divider (desktop only) */}
        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Guests Dropdown */}
        <div className={cn("flex-1 min-w-0 relative", isHero ? "md:flex-1" : "")}>
          <div className="relative group">
            <Users
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors",
                "group-focus-within:text-orange-500",
                isHero ? "h-5 w-5" : "h-4 w-4"
              )}
            />
            <button
              type="button"
              onClick={() => setGuestsOpen(!guestsOpen)}
              className={cn(
                "w-full text-left border border-gray-200 bg-gray-50/50 rounded-md",
                "focus:bg-white focus:border-orange-300 focus:outline-none focus:ring-[3px] focus:ring-orange-100",
                "transition-all duration-200",
                "hover:bg-gray-50",
                isHero
                  ? "h-12 md:h-14 pl-11 pr-4 text-base"
                  : "h-10 pl-10 pr-3 text-sm"
              )}
            >
              <span className="text-gray-700 truncate block">{guestsText}</span>
            </button>
          </div>

          {/* Guests Dropdown Panel */}
          {guestsOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setGuestsOpen(false)}
              />
              {/* Dropdown */}
              <div
                className={cn(
                  "absolute z-20 mt-2 bg-white rounded-lg shadow-xl border border-gray-100",
                  "p-4 min-w-[240px]",
                  "left-0 right-0 md:left-auto md:right-0"
                )}
              >
                {/* Adults */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-gray-900">Adults</p>
                    <p className="text-sm text-gray-500">Ages 18+</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className={cn(
                        "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center",
                        "hover:border-orange-500 hover:text-orange-500 transition-colors",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                      disabled={adults <= 1}
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-medium">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(Math.min(10, adults + 1))}
                      className={cn(
                        "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center",
                        "hover:border-orange-500 hover:text-orange-500 transition-colors",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                      disabled={adults >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Children</p>
                    <p className="text-sm text-gray-500">Ages 0-17</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className={cn(
                        "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center",
                        "hover:border-orange-500 hover:text-orange-500 transition-colors",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                      disabled={children <= 0}
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-medium">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(Math.min(10, children + 1))}
                      className={cn(
                        "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center",
                        "hover:border-orange-500 hover:text-orange-500 transition-colors",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                      disabled={children >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Done Button */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Button
                    type="button"
                    onClick={() => setGuestsOpen(false)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Search Button */}
        <div className={cn(isHero ? "md:flex-shrink-0" : "")}>
          <Button
            type="button"
            onClick={handleSearch}
            className={cn(
              "w-full md:w-auto",
              "bg-[#f97316] hover:bg-[#ea580c] active:bg-[#c2410c]",
              "text-white font-semibold",
              "shadow-md hover:shadow-lg",
              "transition-all duration-200",
              isHero
                ? "h-12 md:h-14 px-8 text-base gap-2"
                : "h-10 px-6 text-sm gap-1.5"
            )}
          >
            <Search className={cn(isHero ? "h-5 w-5" : "h-4 w-4")} />
            <span>Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
