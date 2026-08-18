import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Cta.module.css'

export default function Cta() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const cells = ref.current?.querySelectorAll('[data-reveal]')
    if (!cells) return
    gsap.fromTo(
      cells,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 },
    )
  }, [])

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.card} data-reveal>
        <h2 className={styles.title}>
          Ready to investigate?
        </h2>
        <p className={styles.context}>
          Extensible, modular, and built for investigators.
          <br />
          Talk to the developer - access is granted personally.
        </p>
        <a href="https://t.me/Night3098" className={styles.action}>
          <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M21.9 4.3 18.6 19c-.25 1.1-.9 1.37-1.82.85l-5.03-3.7-2.43 2.33c-.27.27-.5.5-1 .5l.36-5.1L18.1 6.6c.4-.36-.09-.56-.62-.2L6.72 13.5l-4.96-1.55c-1.08-.34-1.1-1.08.23-1.6l19.37-7.47c.9-.34 1.69.2 1.4 1.42Z" />
          </svg>
          <span className={styles.actionText}>Telegram</span>
          <svg className={styles.actionArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4.5 12h13.25M12.75 5.25 19.5 12l-6.75 6.75" />
          </svg>
        </a>
      </div>
    </section>
  )
}