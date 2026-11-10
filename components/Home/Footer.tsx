import styles from  "./home.module.css"
import Link from 'next/link'

export default function Footer(){


    return(
        <section className={styles.homeFooter}>
        <div>
          <h2>Ready to park smarter?</h2>
          <div>
            <Link href="/signup" className={styles.signUp}>Sign up for free</Link>
            <Link href="/login" className={styles.logIn}>Log In</Link>
          </div>
        </div>
        <footer>
          <p>© 2026 WhereWePark</p>
          <div>
            <p>About</p>
            <p>Help</p>
            <p>Privacy</p>
            <p>Terms</p>
          </div>
        </footer>
      </section>
    )
}