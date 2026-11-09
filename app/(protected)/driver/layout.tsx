import { getCurrentUser } from "@/app/api/lib/auth";
import {redirect} from "next/navigation"


export default async function DriverLayout({
    children
}:{children: React.ReactNode}){

    const user = await getCurrentUser();
    
    if(!user){
        redirect("/login")
    }

    if(user.role!="DRIVER"){
        redirect("/owner/dashboard")
    }

    return <>{children}</>


}