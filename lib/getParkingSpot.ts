

export async function getParkingSpot(id:string){

    const response = await fetch(`/api/parking-spot/${id}`, {
        method:"GET"
    });

    if(!response.ok){
        throw new Error("Failed to fetch this spot!")
    }

    const data = await response.json();

    return data;


}