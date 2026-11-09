

export async function currentUser(){
    
    const response = await fetch("/api/auth/me",{
        method:"GET",
    })

    if(!response.ok){
        throw new Error("There has been an error");
    }

    const data = await response.json();

    return data.user;





}