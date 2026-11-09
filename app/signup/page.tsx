"use client";

import styles from "./signup.module.css"
import React from "react";

import Link from "next/link"
import AnimatedRoute from "@/components/SignUp/AnimatedRoute"
import { useRouter } from "next/navigation";


export default function Singup() {

    const router = useRouter();


    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showConfirmPassword, setConfirmShowPassword] = React.useState<boolean>(false);
    const [firstName, setFirstName] = React.useState<string>("");
    const [lastName, setLastName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [confirmPassword, setConfirmPassword] = React.useState<string>("")
    const [role, setRole] = React.useState<"DRIVER" | "OWNER">("DRIVER");

    

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password doesn't match");
            return;
        }

        const respone = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                role
            })
        })

        const data = await respone.json();

        if (!respone.ok) {
            alert(data.error);
            return;
        }
        if (respone.ok) {
            alert("user registered!")
        }
        router.push("/login")
    }


    return (
        <main className={styles.signUpPage}>
            <header>
                <Link href="/"><h1>WhereWePark</h1></Link>
                <div>
                    <p>Already have an account?</p>
                    <Link href="/login">Log In</Link>
                </div>
            </header>
            <section className={styles.signUpHero}>
                <div>
                    <AnimatedRoute />
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <h2>Create your account</h2>
                        <p>Choose how you'll use WhereWePark.</p>
                        <div className={styles.ChooseRole}>
                            <button onClick={() => setRole("DRIVER")} type="button"
                                className={role === "DRIVER" ? styles.roleActive : ""}>
                                I need parking</button>
                            <button onClick={() => setRole("OWNER")} type="button"
                                className={role === "OWNER" ? styles.roleActive : ""}>
                                I own a space</button>
                        </div>
                        <div className={styles.SignUpNames}>
                            <div>
                                <label htmlFor="first-name">First name</label>
                                <input type="text" name="" id="first-name" required placeholder="Jane"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName} />
                            </div>
                            <div>
                                <label htmlFor="last-name">Last name</label>
                                <input type="text" name="" id="last-name" placeholder="Doe"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName} />
                            </div>
                        </div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="" id="email" required placeholder="janedoe@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />


                        <label htmlFor="password">Password</label>
                        <div className={styles.passwordDivs}>
                            <input type={showPassword ? "text" : "password"} name="" id="password" required placeholder="••••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password} />
                            <i onClick={() => setShowPassword(prev => !prev)}
                                className={showPassword? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                        </div>
                        <p>Use at least 8 characters.</p>
                        <label htmlFor="repeat-password">Repeat Password</label>
                        <div className={styles.passwordDivs}>
                            <input type={showConfirmPassword ? "text" : "password"} name="" id="repeat-password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword} required placeholder="••••••••••" />
                            <i onClick={() => setConfirmShowPassword(prev => !prev)}
                                className={showConfirmPassword? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                        </div>
                        {confirmPassword!=password && <p id="error">Password doesn't match</p>}
                        <div className={styles.SignUpCheckbox}>
                            <input type="checkbox" name="" id="" required />
                            <p>I agree to WhereWeGo's <span>Terms of Service </span>and
                                <span> Privacy Policy.</span></p>
                        </div>
                        <button className={styles.createAccountButton}
                            type="submit">Create an account</button>
                        <div className={styles.haveAnAccount}>
                            <p>Already have an account?</p>
                            <Link href="/login">Log In</Link>
                        </div>
                    </form>

                </div>
            </section>
        </main>
    )
}