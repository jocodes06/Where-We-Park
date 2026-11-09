import { getCurrentUser } from "@/app/api/lib/auth";
import {redirect} from "next/navigation"

export default async function OwnerLayout({
    children
}:{ children : React.ReactNode}){


    const user = await getCurrentUser();

    if(!user){
        redirect("/login")
    }

    if(user.role!="OWNER"){
        redirect("/driver/dashboard")
    }


    return <>{children}</>
}