export async function addFavorites(lot_id:string){
    
    const response = await fetch("/api/favorites", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lot_id
        })
    })

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error);
        
    }

    return data;
}

export async function getFavorites(){

        const response = await fetch("/api/favorites",{
            method:"GET",
        })

        if(!response.ok){
            throw new Error("Failed to get favorite spots!")
        }

        const data = await response.json();


        return {
            favoriteSpots: Array.isArray(data.favoriteSpots) ? data.favoriteSpots : [],
        }

}