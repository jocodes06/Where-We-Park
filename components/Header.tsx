"use client";
import styles from "./comps.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

import useCurrentUser from "@/hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user, isLoading, isError, error } = useCurrentUser();
  const pathname = usePathname();

  const logoutButton = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({ queryKey: ["favoriteSpots"] });
      queryClient.removeQueries({ queryKey: ["bookingRequests"] });
      router.push("/");
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1>WhereWePark</h1>
        <div className={styles.userInfo}>
          <h5 className={styles.userLetter}>{user?.first_name?.charAt(0)}</h5>
          <div className={styles.roleSwitch}>
            <button className={user?.role ==="OWNER" ? styles.roleActive : ""}>Owner</button>
            <button className={user?.role ==="DRIVER" ? styles.roleActive : ""}>Driver</button>
          </div>
          <button
            type="button"
            onClick={logoutButton}
            className={styles.logOutButton}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </header>
      <nav className={styles.navigation}>
        {user?.role === "DRIVER" && (
          <>
            <Link
              href="/driver/dashboard"
              className={
                pathname === "/driver/dashboard" ? styles.activeLink : ""
              }
            >
              Parking Spots
            </Link>
            <Link
              href="/driver/dashboard/bookings"
              className={
                pathname === "/driver/dashboard/bookings"
                  ? styles.activeLink
                  : ""
              }
            >
              My bookings
            </Link>
            <Link
              href="/driver/dashboard/favorites"
              className={
                pathname === "/driver/dashboard/favorites"
                  ? styles.activeLink
                  : ""
              }
            >
              My favorites
            </Link>
          </>
        )}
        {user?.role === "OWNER" && (
          <>
            <Link
              href="/owner/dashboard"
              className={
                pathname === "/owner/dashboard" ? styles.activeLink : ""
              }
            >
              Overview
            </Link>
            <Link
              href="/owner/dashboard/listings"
              className={
                pathname === "/owner/dashboard/listings"
                  ? styles.activeLink
                  : ""
              }
            >
              Listings
            </Link>
            <Link
              href="/owner/dashboard/bookings"
              className={
                pathname === "/owner/dashboard/bookings"
                  ? styles.activeLink
                  : ""
              }
            >
              Bookings
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
