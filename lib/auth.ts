
export async function userAuth(email:string, password:string){

    try{

    const response = await fetch("/api/auth/login",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({email,
            password})

    })
    const data = await response.json();

    if(!response.ok){
        alert(data.error ?? "Log in failed");
    }

    if(response.ok){
        alert("Logged in!")
    }
    return data;

    }catch(error){
        throw new Error("Something went wrong")
    }



}