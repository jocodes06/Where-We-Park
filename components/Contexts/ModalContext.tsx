"use client";
import React from "react";


const isModalOpen = React.createContext<any>(null);;

export default function ModalContext({children,} : {
    children: React.ReactNode
}){

    const [openModal, setOpenModal] = React.useState<boolean>(false);

     React.useEffect(()=>{
        document.body.style.overflow = openModal ? "hidden" : "";
    
        return () => {
        document.body.style.overflow = "";
      };
      }, [openModal])

    return(
        <isModalOpen.Provider value={{openModal, setOpenModal}}>
            {children}
        </isModalOpen.Provider>

    )
}

export {isModalOpen}