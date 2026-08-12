import styles from './Cta.module.css'

export default function Cta() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>get started</p>
        <h2 className={styles.title}>
          Ready to investigate<span className={styles.titleDot}>.</span>
        </h2>
        <p className={styles.context}>
          Extensible, modular, and built for investigators. Clone the repo or talk to the
          developer.
        </p>
        <div className={styles.actions}>
          <a href="https://github.com/Nighty3098/SkyFall" className={styles.actionBtn}>
            GitHub <span className={styles.btnArrow}>→</span>
          </a>
          <a href="https://t.me/Night3098" className={styles.actionTg}>
            Contact on Telegram
          </a>
        </div>
      </div>
    </section>
  )
}
