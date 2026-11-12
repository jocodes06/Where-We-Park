import type { Booking } from "@/types/types";


export async function requestBooking(booking: Booking){

    const response = await fetch("/api/request-booking", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(booking)
    })

    const data = await response.json();

    if(!response.ok){
       throw new Error("There has been an error");
    }

    return data;

}


