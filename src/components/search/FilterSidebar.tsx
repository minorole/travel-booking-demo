"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import type { FilterState } from "@/types/listing";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearAll: () => void;
  maxPrice: number;
}

const ratingOptions = [
  { value: "4.5", label: "4.5+" },
  { value: "4", label: "4+" },
  { value: "3", label: "3+" },
];

const propertyTypeOptions = [
  { value: "villa", label: "Villa" },
  { value: "hotel", label: "Hotel" },
  { value: "apartment", label: "Apartment" },
  { value: "resort", label: "Resort" },
];

const amenityOptions = [
  { value: "WiFi", label: "WiFi" },
  { value: "Pool", label: "Pool" },
  { value: "Kitchen", label: "Kitchen" },
  { value: "Air Conditioning", label: "Air Conditioning" },
  { value: "Free Parking", label: "Parking" },
  { value: "Gym", label: "Gym" },
  { value: "Spa", label: "Spa" },
  { value: "Breakfast Included", label: "Breakfast" },
  { value: "Ocean View", label: "Ocean View" },
  { value: "Hot Tub", label: "Hot Tub" },
];

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-4 border-b last:border-b-0">
      <h3 className="font-semibold text-sm mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Checkbox({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 cursor-pointer py-1.5 hover:text-primary transition-colors"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-input accent-primary cursor-pointer"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

function FilterContent({
  filters,
  onFiltersChange,
  onClearAll,
  maxPrice,
  showApplyButton = false,
}: FilterSidebarProps & { showApplyButton?: boolean }) {
  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 0;
    onFiltersChange({
      ...filters,
      priceRange: [Math.min(value, filters.priceRange[1]), filters.priceRange[1]],
    });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || maxPrice;
    onFiltersChange({
      ...filters,
      priceRange: [filters.priceRange[0], Math.max(value, filters.priceRange[0])],
    });
  };

  const toggleArrayFilter = (
    key: "ratings" | "propertyTypes" | "amenities",
    value: string
  ) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];
    onFiltersChange({ ...filters, [key]: newArray });
  };

  const hasActiveFilters =
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < maxPrice ||
    filters.ratings.length > 0 ||
    filters.propertyTypes.length > 0 ||
    filters.amenities.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-1">
        {/* Price Range */}
        <FilterSection title="Price per night">
          <div className="space-y-4">
            <Slider
              min={0}
              max={maxPrice}
              step={10}
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
            />
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">
                  Min
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    $
                  </span>
                  <Input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={handleMinPriceChange}
                    className="pl-7"
                    min={0}
                    max={filters.priceRange[1]}
                  />
                </div>
              </div>
              <span className="text-muted-foreground mt-5">-</span>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">
                  Max
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    $
                  </span>
                  <Input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={handleMaxPriceChange}
                    className="pl-7"
                    min={filters.priceRange[0]}
                    max={maxPrice}
                  />
                </div>
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Star Rating */}
        <FilterSection title="Star rating">
          <div className="space-y-1">
            {ratingOptions.map((option) => (
              <Checkbox
                key={option.value}
                id={`rating-${option.value}`}
                checked={filters.ratings.includes(option.value)}
                onChange={() => toggleArrayFilter("ratings", option.value)}
                label={option.label}
              />
            ))}
          </div>
        </FilterSection>

        {/* Property Type */}
        <FilterSection title="Property type">
          <div className="space-y-1">
            {propertyTypeOptions.map((option) => (
              <Checkbox
                key={option.value}
                id={`type-${option.value}`}
                checked={filters.propertyTypes.includes(option.value)}
                onChange={() => toggleArrayFilter("propertyTypes", option.value)}
                label={option.label}
              />
            ))}
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection title="Amenities">
          <div className="space-y-1">
            {amenityOptions.map((option) => (
              <Checkbox
                key={option.value}
                id={`amenity-${option.value}`}
                checked={filters.amenities.includes(option.value)}
                onChange={() => toggleArrayFilter("amenities", option.value)}
                label={option.label}
              />
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Action Buttons */}
      <div className="border-t pt-4 mt-4 flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onClearAll}
          disabled={!hasActiveFilters}
        >
          Clear all
        </Button>
        {showApplyButton && <Button className="flex-1">Apply</Button>}
      </div>
    </div>
  );
}

function getActiveFilterCount(filters: FilterState, maxPrice: number) {
  return (
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0) +
    filters.ratings.length +
    filters.propertyTypes.length +
    filters.amenities.length
  );
}

export function FilterSidebarDesktop(props: FilterSidebarProps) {
  const activeFilterCount = getActiveFilterCount(props.filters, props.maxPrice);

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-4 bg-card border rounded-lg p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-lg">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="text-sm text-muted-foreground">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <FilterContent {...props} showApplyButton={false} />
      </div>
    </aside>
  );
}

export function FilterSidebarMobile(props: FilterSidebarProps) {
  const activeFilterCount = getActiveFilterCount(props.filters, props.maxPrice);

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="size-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground size-5 rounded-full text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-md p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="p-4 h-[calc(100vh-140px)] overflow-y-auto">
            <FilterContent {...props} showApplyButton={true} />
          </div>
          <SheetFooter className="border-t p-4">
            <SheetClose asChild>
              <Button className="w-full">Show results</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
