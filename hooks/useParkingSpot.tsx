import { useQuery } from "@tanstack/react-query";
import { getParkingSpot } from "@/lib/getParkingSpot";

export default function useParkingSpot(id:string){
    return useQuery({
        queryKey:["parkingSpot", id],
        queryFn:() => getParkingSpot(id),
        enabled:!!id,
        staleTime:1000 * 60 * 5,
    })
}