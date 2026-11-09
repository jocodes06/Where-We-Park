"use client";

import React from "react";
import styles from "./owner.module.css"
import useCurrentUser from "@/hooks/useCurrentUser";
import Loading from "@/components/Loading";
import Header from "@/components/Header";




export default function Owner({children}: {
    children:React.ReactNode;
}){
    const {data : user ,isLoading,isError, error} = useCurrentUser();

    if(isLoading) return <Loading/>
    if(isError) return <p>{error.message}</p>

    console.log(user)


    return(
        <main className={styles.ownerMain}>
            <Header/>
            {children}    
        </main>
    )
}