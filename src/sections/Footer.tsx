import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        <a href="https://t.me/Night3098" className={styles.social} aria-label="Telegram">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M21.9 4.3 18.6 19c-.25 1.1-.9 1.37-1.82.85l-5.03-3.7-2.43 2.33c-.27.27-.5.5-1 .5l.36-5.1L18.1 6.6c.4-.36-.09-.56-.62-.2L6.72 13.5l-4.96-1.55c-1.08-.34-1.1-1.08.23-1.6l19.37-7.47c.9-.34 1.69.2 1.4 1.42Z" />
          </svg>
        </a>
        <a href="https://nighty3098.vercel.app" className={styles.social} aria-label="Website">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
          </svg>
        </a>
      </div>

      <p className={styles.bottom}>
        © 2026 SkyFall Project · coded by Nighty3098 · Python / PySide6
      </p>
    </footer>
  )
}