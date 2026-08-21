import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import styles from './Hero.module.css'

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll('[data-line] > span')
      if (prefersReducedMotion()) {
        gsap.set(root.querySelectorAll('[data-hero-fade]'), { opacity: 1 })
        gsap.set(lines, { visibility: 'visible' })
        gsap.set(`.${styles.heroBg}`, { clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)' })
        gsap.set(`.${styles.card}`, { clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)' })
        return
      }

      gsap.set(lines, { yPercent: 115, visibility: 'visible' })

      gsap
        .timeline({ delay: 0.15 })
        .fromTo(
          `.${styles.heroBg}`,
          { clipPath: 'polygon(50% 50%,50% 50%,50% 50%,50% 50%)' },
          {
            clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)',
            duration: 1.4,
            ease: 'hop',
          },
        )
        .fromTo(
          `.${styles.heroBg} img`,
          { scale: 1.72 },
          { scale: 1, duration: 1.4, ease: 'hop' },
          '<',
        )
        .fromTo(
          `.${styles.card}`,
          { clipPath: 'polygon(0% 100%,100% 100%,100% 100%,0% 100%)' },
          {
            clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)',
            duration: 1,
            ease: 'hop',
          },
          '-=0.9',
        )
        .to(lines, { yPercent: 0, duration: 0.8, ease: 'hop', stagger: 0.08 }, '-=0.5')
        .fromTo(
          root.querySelectorAll('[data-hero-fade]'),
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.05 },
          '-=0.6',
        )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.hero} id="top" ref={rootRef}>
      <div className={styles.heroBg}>
        <img src="/bg.webp" alt="" />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.card}>
        <div className={styles.topLeft}>
          <p className={styles.label}>OSINT Investigation Toolkit</p>
          <h1 className={styles.title}>
            <span className={styles.lineMask} data-line>
              <span>Find What</span>
            </span>
            <span className={styles.lineMask} data-line>
              <span>Is Hidden</span>
            </span>
          </h1>
        </div>

        <div className={styles.bottomRight}>
          <p className={styles.label}>Built for</p>
          <h1 className={`${styles.edition} ${styles.editionLong}`}>
            <span className={styles.lineMask} data-line>
              <span>Investigators</span>
            </span>
          </h1>
        </div>
      </div>

    </section>
  )
}
