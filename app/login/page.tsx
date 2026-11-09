"use client";
import React from "react";
import styles from "./login.module.css"
import Link from "next/link"
import AnimatedRoute2 from "@/components/LogIn/AnimatedRoute2";
import { useRouter } from "next/navigation";
import { userAuth } from "@/lib/auth";

import { useQueryClient } from "@tanstack/react-query";


export default function Login() {

    const queryClient = useQueryClient();

    const router = useRouter();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const data = await userAuth(email,password);

        if(!data){
            return;
        }
        
       queryClient.setQueryData(["user"], data.user);
       if(data.user.role==="OWNER"){
        router.push("/owner/dashboard")
       }else if(data.user.role==="DRIVER"){
        router.push("/driver/dashboard");
       }
    }

    return (
        <main className={styles.logInPage}>
            <header>
                <Link href="/"><h1>WhereWePark</h1></Link>
                <div>
                    <p>New here?</p>
                    <Link href="/signup">Sign Up</Link>
                </div>
            </header>
            <section className={styles.logInHero}>
                <div>
                    <h2>Welcome back</h2>
                    <p>Log in to find a spot or manage your listings.</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email}
                            placeholder="janedoe@mail.com" required onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={password}
                            placeholder="••••••••••" required onChange={(e) => setPassword(e.target.value)} />
                        <button className={styles.logInButton} type="submit"
                        >Log In</button>
                        <div className={styles.dontHaveAnAccount}>
                            <p>Don't have an account?</p>
                            <Link href="/signup">Sign Up</Link>
                        </div>
                    </form>
                </div>
                <div>
                    <AnimatedRoute2 />
                </div>
            </section>


        </main>
    )
}