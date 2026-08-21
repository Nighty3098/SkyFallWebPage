import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import styles from './Footer.module.css'

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll('[data-footer-fade]'),
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: 'top 60%', once: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <footer className={styles.footer} id="contacts" ref={rootRef}>
      <div className={styles.center}>
        <span className={styles.label} data-footer-fade>
          Contact
        </span>
        <a
          href="https://t.me/Night3098"
          target="_blank"
          rel="noreferrer"
          className={styles.main}
          data-footer-fade
        >
          @Night3098
        </a>
      </div>

      <p className={styles.copyright} data-footer-fade>
        ©2026 SkyFall Project · Coded by Nighty3098
      </p>
    </footer>
  )
}
