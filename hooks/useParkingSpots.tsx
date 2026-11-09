"use client";
import React from "react";
import {useQuery} from "@tanstack/react-query"
import type { ParkingSpot } from "@/types/types";
import { getUsersParkingSpots } from "@/lib/parking";
import { getAllparkingSpots } from "@/lib/driverSpots";
import useCurrentUser from "./useCurrentUser";


export default function useParkingSpots() {

    const {data : user} = useCurrentUser();


    return useQuery<ParkingSpot[]>({
        queryKey: ["parkingSpots", user?.id, user?.role],

        queryFn: async () => {
            const data = user?.role === "OWNER" ?
            await getUsersParkingSpots() : await getAllparkingSpots()

            return Array.isArray(data) ? data : data?.parkingSpots ?? [];
        },

        enabled:!!user,

        staleTime: 1000 * 60 * 5
    })

}

