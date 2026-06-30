import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src="/skyfall.jpg" alt="SkyFall" className={styles.logoImg} />
            <span className={styles.logoText}>SkyFall</span>
          </div>
          <p className={styles.desc}>
            Open source intelligence platform for investigators, security
            teams, and threat researchers.
          </p>
        </div>
        <div className={styles.copy}>
          <span>&copy; 2026 SkyFall Project. All rights reserved.</span>
          <div className={styles.socials}>
            <a href="https://github.com/Nighty3098">GitHub</a>
            <a href="https://t.me/Night3098">Telegram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
