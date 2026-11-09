
import { currentUser } from "@/lib/currentUser"
import {useQuery} from "@tanstack/react-query"


export default function useCurrentUser(){

     return useQuery({
            queryKey:["user"],
    
            queryFn: async () => {
                const data = await currentUser()
                return data ?? null
    
            },
    
    
        })
}