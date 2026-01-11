import {
  Wifi,
  Waves,
  UtensilsCrossed,
  Wind,
  Car,
  Tv,
  WashingMachine,
  Laptop,
  Dumbbell,
  Bath,
  Coffee,
  Mountain,
  Sunrise,
  TreePine,
  Snowflake,
  Flame,
  Dog,
  Bike,
  Plane,
  Utensils,
  type LucideIcon,
} from "lucide-react";

// Mapping of amenity names to icons
const amenityIcons: Record<string, LucideIcon> = {
  // Standard amenities from spec
  wifi: Wifi,
  "WiFi": Wifi,
  pool: Waves,
  "Pool": Waves,
  kitchen: UtensilsCrossed,
  "Kitchen": UtensilsCrossed,
  ac: Wind,
  "Air Conditioning": Wind,
  parking: Car,
  "Free Parking": Car,
  tv: Tv,
  washer: WashingMachine,
  "Washer": WashingMachine,
  workspace: Laptop,
  // Additional amenities
  "Gym Access": Dumbbell,
  gym: Dumbbell,
  spa: Bath,
  "Spa": Bath,
  "Breakfast Included": Coffee,
  breakfast: Coffee,
  "Ocean View": Sunrise,
  "Sea View": Sunrise,
  "Caldera View": Sunrise,
  "Lake View": Sunrise,
  "Desert View": Sunrise,
  "Garden View": TreePine,
  "Garden": TreePine,
  "Traditional Garden": TreePine,
  "Mountain View": Mountain,
  "Hot Tub": Flame,
  "Fireplace": Flame,
  "Heating": Snowflake,
  "Bicycle Rental": Bike,
  "Airport Transfer": Plane,
  "Room Service": Utensils,
  "Hammam": Bath,
  "Onsen": Bath,
  "Yoga Deck": TreePine,
  "Outdoor Shower": Bath,
  "Pool Access": Waves,
  "Ocean Access": Waves,
  "Glass Floor": Waves,
  "Butler Service": Coffee,
  "All Inclusive": Utensils,
  "Snorkeling Gear": Waves,
  "Rooftop Terrace": Sunrise,
  "Ski Storage": Snowflake,
  "Concierge": Coffee,
  "Yukata Provided": Bath,
  "Tea Ceremony": Coffee,
  "Kaiseki Dinner": Utensils,
  "City View": Sunrise,
  "Beach Access": Waves,
  "Private Garden": TreePine,
  "Half Board": Utensils,
  "Spa Credits": Bath,
  "Diving Center": Waves,
  "Tennis Court": Dumbbell,
};

// Get icon for an amenity, with fallback
function getAmenityIcon(amenity: string): LucideIcon {
  return amenityIcons[amenity] || amenityIcons[amenity.toLowerCase()] || Wifi;
}

interface AmenityListProps {
  amenities: string[];
  showAll?: boolean;
}

export function AmenityList({ amenities, showAll = false }: AmenityListProps) {
  const displayAmenities = showAll ? amenities : amenities.slice(0, 8);

  return (
    <div className="grid grid-cols-2 gap-4">
      {displayAmenities.map((amenity) => {
        const Icon = getAmenityIcon(amenity);
        return (
          <div key={amenity} className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm">{amenity}</span>
          </div>
        );
      })}
    </div>
  );
}
