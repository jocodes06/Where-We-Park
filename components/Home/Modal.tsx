"use client";
import React from "react";
import styles from "./modal.module.css"

import {isModalOpen} from "../Contexts/ModalContext"
import Link from "next/link";

export default function Modal(){

    const {setOpenModal} = React.useContext(isModalOpen)

    return(
        <dialog open className={styles.authModal}> 
        <p>🔒</p>
        <h3>Log in to search spots</h3>
        <p>Create a free account or log in to see available parking,
        prices, and instant booking near you.</p>
        <Link href="/login" className={styles.logIn} onClick={()=>setOpenModal(false)}>Log In</Link>
        <Link href="/signup" className={styles.signUp}
        onClick={()=> setOpenModal(false)}>Sign Up</Link>
        <p onClick={()=> setOpenModal(false)}>Continue browsing without an account.</p>
        </dialog>
    )
}