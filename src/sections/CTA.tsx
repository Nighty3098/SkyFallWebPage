import styles from './CTA.module.css'

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.context}>
        <div className={styles.contextDiv}>
          <p className={styles.contextText}>
            Start collecting actionable intelligence in minutes.
            Open source, extensible, and built for investigators.
          </p>
          <p className={styles.contactMe}>Get started</p>
        </div>
      </div>

      <div className={styles.actions}>
        <a href="https://t.me/Night3098" className={styles.actionBtn}>
          Contact developer for access
        </a>
      </div>
    </section>
  )
}
