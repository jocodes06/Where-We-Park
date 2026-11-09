export async function getUsersParkingSpots(){

    const response = await fetch("/api/parking-spots", {
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(response.status===401){
        return {parkingSpots:[]}
    }

    const data = await response.json();

    if(!response.ok){
        alert("Failed to fetch!")
    }

    return {
    parkingSpots: Array.isArray(data)
      ? data
      : (data.parkingSpots ?? []),
  };
}