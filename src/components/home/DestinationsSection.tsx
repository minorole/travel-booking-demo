import { DestinationCard } from "./DestinationCard";
import destinations from "@/data/destinations.json";
import type { Destination } from "@/types/destination";

export function DestinationsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Popular destinations
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore our top picks for your next trip
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {(destinations as Destination[]).map((destination, index) => (
            <DestinationCard
              key={destination.id}
              id={destination.id}
              name={destination.name}
              country={destination.country}
              image={destination.image}
              listingCount={destination.listingCount}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
