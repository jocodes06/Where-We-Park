"use client"
import {useQuery} from "@tanstack/react-query"
import type { FavoriteSpot } from "@/types/types";
import { getFavorites } from "@/lib/driverFavorites";

export default function useFavorites(){


    return useQuery<FavoriteSpot[]>({
         queryKey:["favoriteSpots"],

         queryFn: async () => {
                     const data = await getFavorites()
                     return data?.favoriteSpots ?? []
                 },

                 staleTime: 1000 * 60 * 5,
    })

}