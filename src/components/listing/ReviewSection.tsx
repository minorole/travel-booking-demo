"use client";

import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Review } from "@/types/listing";

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

function RatingBar({ label, percentage }: { label: string; percentage: number }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-24">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-800 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="py-6 border-b last:border-0">
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={review.userImage} alt={review.userName} />
          <AvatarFallback>
            {review.userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{review.userName}</p>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < review.rating
                ? "fill-current text-gray-800"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        {review.comment}
      </p>

      <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gray-800 transition-colors">
        <ThumbsUp className="w-4 h-4" />
        <span>Helpful ({review.helpful})</span>
      </button>
    </div>
  );
}

export function ReviewSection({
  reviews,
  averageRating,
  totalReviews,
}: ReviewSectionProps) {
  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  const ratingDistribution = ratingCounts
    .map((count) => (reviews.length > 0 ? (count / reviews.length) * 100 : 0))
    .reverse();

  const categories = [
    { label: "Cleanliness", score: 4.9 },
    { label: "Accuracy", score: 4.8 },
    { label: "Communication", score: 5.0 },
    { label: "Location", score: 4.9 },
    { label: "Check-in", score: 4.8 },
    { label: "Value", score: 4.7 },
  ];

  return (
    <section>
      {/* Overall rating header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 fill-current" />
          <span className="text-2xl font-semibold">{averageRating}</span>
        </div>
        <span className="text-muted-foreground">|</span>
        <span className="text-lg">{totalReviews} reviews</span>
      </div>

      {/* Rating breakdown grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-8 pb-8 border-b">
        {categories.map((category) => (
          <div key={category.label} className="flex items-center justify-between">
            <span className="text-sm">{category.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-800 rounded-full"
                  style={{ width: `${(category.score / 5) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium w-8">{category.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Rating distribution */}
      <div className="mb-8 pb-8 border-b">
        <h3 className="font-medium mb-4">Rating breakdown</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <RatingBar
              key={rating}
              label={`${rating} star${rating !== 1 ? "s" : ""}`}
              percentage={ratingDistribution[index]}
            />
          ))}
        </div>
      </div>

      {/* Review list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
        {reviews.slice(0, 6).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Show all reviews button */}
      {totalReviews > 6 && (
        <div className="mt-8">
          <Button variant="outline" size="lg" className="font-medium">
            Show all {totalReviews} reviews
          </Button>
        </div>
      )}
    </section>
  );
}
