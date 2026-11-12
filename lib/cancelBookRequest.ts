

export default async function cancelBookRequest(id : string){

    const response = await fetch("/api/request-booking",{
        method:"DELETE",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(id)
    })

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error)
    }

    return data;


}