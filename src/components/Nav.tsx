import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import styles from './Nav.module.css'

const links = [
  { label: 'Modules', href: '#modules' },
  { label: 'Workflow', href: '#workflow' },
]

export default function Nav() {
  const rootRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const items = rootRef.current?.querySelectorAll('[data-nav-item]')
    const scrollDown = document.querySelector(`.${styles.scrollDown}`)
    if (!items?.length) return
    if (prefersReducedMotion()) {
      gsap.set(items, { visibility: 'visible' })
      gsap.set(scrollDown, { opacity: 0.5 })
      return
    }
    gsap.set(items, { yPercent: 120, visibility: 'visible' })
    gsap.to(items, {
      yPercent: 0,
      duration: 1,
      ease: 'hop',
      stagger: 0.08,
      delay: 0.2,
    })
    gsap.fromTo(
      scrollDown,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.8, delay: 1.2, ease: 'power2.out' },
    )
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (prefersReducedMotion()) {
      gsap.set(overlay, { display: open ? 'flex' : 'none' })
      return
    }

    if (open) {
      gsap.set(overlay, { display: 'flex' })
      gsap.fromTo(
        overlay,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.9, ease: 'hop' },
      )
      gsap.fromTo(
        overlay.querySelectorAll('[data-menu-item]'),
        { y: '110%' },
        { y: '0%', duration: 0.8, ease: 'hop', stagger: 0.06, delay: 0.3 },
      )
    } else {
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.7,
        ease: 'hop',
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      })
    }
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={styles.nav} ref={rootRef} aria-label="Main">
        <a href="#top" className={`${styles.mask} ${styles.logo}`}>
          <span className={styles.inner} data-nav-item>
            SkyFall<sup>&reg;</sup>
          </span>
        </a>

        <div className={styles.right}>
          <div className={styles.links}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleAnchor(e, l.href)}
              >
                <span className={styles.mask}>
                  <span className={styles.inner} data-nav-item>
                    {l.label}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <a
            href="https://t.me/Night3098"
            target="_blank"
            rel="noreferrer"
            className={`${styles.cta} ${styles.mask}`}
          >
            <span className={styles.inner} data-nav-item>
              Get access
            </span>
          </a>
        </div>

        <button
          type="button"
          className={`${styles.menuBtn} ${open ? styles.hidden : ''}`}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className={styles.mask}>
            <span className={styles.inner} data-nav-item>
              Menu
            </span>
          </span>
        </button>
      </nav>

      <p className={`${styles.scrollDown} ${open ? styles.hidden : ''}`}>
        Scroll Down
      </p>

      <div className={styles.overlay} ref={overlayRef} role="dialog" aria-modal="true">
        <div className={styles.overlayTop}>
          <span>SkyFall<sup>&reg;</sup></span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
            Close
          </button>
        </div>

        <nav className={styles.overlayLinks} aria-label="Menu">
          {[...links, { label: 'Get access', href: 'https://t.me/Night3098' }].map((l) => (
            <span className={styles.overlayMask} key={l.label}>
              <a
                href={l.href}
                data-menu-item
                className={styles.overlayLink}
                onClick={(e) => handleAnchor(e, l.href)}
              >
                {l.label}
              </a>
            </span>
          ))}
        </nav>

        <p className={styles.overlayNote}>OSINT investigation toolkit</p>
      </div>
    </>
  )
}
