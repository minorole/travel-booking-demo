"use client";

import { Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden lg:min-h-[700px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/travel-hero/1920/800')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full min-h-[600px] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:min-h-[700px] lg:px-8">
        {/* Heading with fade-in animation */}
        <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Find your next adventure
        </h1>

        {/* Subheading */}
        <p className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-forwards mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl md:text-2xl">
          Discover amazing places at exclusive deals
        </p>

        {/* SearchBar Placeholder */}
        <div className="animate-in fade-in duration-700 delay-300 fill-mode-forwards w-full max-w-4xl">
          {/* SearchBar component will go here */}
        </div>

        {/* Trust Indicators */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500 fill-mode-forwards mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-200 sm:text-base">
            Over 500,000 stays worldwide
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
