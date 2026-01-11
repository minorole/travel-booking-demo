"use client";

import Image from "next/image";
import { Grid2X2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const mainImage = images[0];
  const thumbnails = images.slice(1, 5);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
        {/* Main large image */}
        <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto md:h-full">
          <Image
            src={mainImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover hover:opacity-95 transition-opacity cursor-pointer"
            priority
          />
        </div>

        {/* Thumbnail grid */}
        {thumbnails.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative aspect-[4/3] hidden md:block",
              index === 1 && "rounded-tr-xl overflow-hidden",
              index === 3 && "rounded-br-xl overflow-hidden"
            )}
          >
            <Image
              src={image}
              alt={`${title} - Image ${index + 2}`}
              fill
              sizes="25vw"
              className="object-cover hover:opacity-95 transition-opacity cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Show all photos button */}
      <Button
        variant="outline"
        size="sm"
        className="absolute bottom-4 right-4 bg-white hover:bg-white/90 shadow-md"
      >
        <Grid2X2 className="w-4 h-4 mr-2" />
        Show all photos
      </Button>
    </div>
  );
}
