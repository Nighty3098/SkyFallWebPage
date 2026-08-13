import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark} />
            <span className={styles.logoText}>skyfall</span>
          </div>
          <p className={styles.desc}>
            OSINT investigation toolkit.
            <br />
            Coded by <a href="https://t.me/Night3098" className={styles.link}>Nighty3098</a>.
          </p>
        </div>

        <div className={styles.bottom}>
          <span>&copy; 2026 SkyFall Project.</span>
          <div className={styles.socials}>
            <a href="https://t.me/Night3098" className={styles.social}>
              telegram
            </a>
            <a href="https://nighty3098.vercel.app" className={styles.social}>
              website
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
