import type { review } from "@/types/types";

export default function reviewAvarage({ review }: { review: review }) {
  const total_reviews = review.length;

  const total_star_sum = review.reduce(
    (sum, item) => sum + item.stars,
    0
  );

  const average = total_reviews ? total_star_sum / total_reviews : 0;

  return average;
}