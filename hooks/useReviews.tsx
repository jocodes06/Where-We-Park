"use client";
import {useQuery} from "@tanstack/react-query"
import type { Review } from "@/types/types";
import getReviews from "@/lib/getReviews";


export default function UseReviews() {
  return useQuery<Review[]>({
    queryKey: ["reviews"],

    queryFn: async () => {
      const data = await getReviews();
      return data.reviews ?? [];
    },

    staleTime: 1000 * 60 * 5,
  });
}
