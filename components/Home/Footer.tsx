import styles from '../../app/page.module.css'

export default function Footer(){


    return(
        <section className={styles.homeFooter}>
        <div>
          <h2>Ready to park smarter?</h2>
          <div>
            <button className={styles.signUp}>Sign up for free</button>
            <button className={styles.logIn}>Log In</button>
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