"use client"
import styles from "@/app/(protected)/owner/dashboard/owner.module.css"

type PageHeaderProps = {
    title: string,
    description: string,
    buttonText?: string,
}

import Link from "next/link"



export default function Header({ title, description, buttonText }: PageHeaderProps) {
    return (
        <section className={styles.subpageHeader}>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            {buttonText === "+ Add a spot" && <Link href="/owner/addaspot">{buttonText}</Link>}
        </section>
    )


}