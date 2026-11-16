
export async function removeFavorite(lot_id:string){
    try{
        const response = await fetch("/api/favorites", {
            method:"PATCH",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({lot_id})
        })

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.error)
        }

        return data;


    }catch(error){
        throw error;
    }

}