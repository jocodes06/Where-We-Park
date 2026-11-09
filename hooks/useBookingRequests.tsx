"use client";
import fetchRequests from "@/lib/fetchRequests";
import { BookingRequest } from "@/types/types";
import {useQuery} from "@tanstack/react-query"
import useCurrentUser from "./useCurrentUser";


export default function useBookingRequests() {

    const { data : user} = useCurrentUser();

    return useQuery<BookingRequest[]>({
        queryKey:["bookingRequests", user?.id],

        queryFn: async () => {
            const data = await fetchRequests(user)
            return data?.bookingRequests ?? []

        },

        enabled: !!user,
        staleTime: 1000 * 60 * 5,

    })

}


