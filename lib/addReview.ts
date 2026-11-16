import type { Review } from "@/types/types";



export default async function AddReview(reviewForm:Review){


    const response = await fetch("/api/reviews", {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(reviewForm)
    })

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error || "Failed to create parking spot!")
    }


}