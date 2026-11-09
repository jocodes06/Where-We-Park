"use client"
import type { User } from "@/types/types";

export default async function fetchRequests(user: User){

    let url=""
    if(user?.role==="OWNER"){
        url = "/api/request-booking"
    }
    else if(
        user?.role==="DRIVER"
    ){
        url="/api/drivers-bookings"
    }

    const response = await fetch(url, {
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json();

     if(!response.ok){
       alert("Failed to fetch booking requests");
    }

    return data;


}