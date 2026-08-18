import { useEffect, useState } from 'react'
import styles from './Nav.module.css'

const links = [
  {
    label: 'Modules',
    href: '#modules',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 6.5h10M4 12h16M4 17.5h8" />
      </svg>
    ),
    hover: 'spin',
  },
  {
    label: 'Workflow',
    href: '#workflow',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="6" r="2.4" />
        <circle cx="18" cy="18" r="2.4" />
        <path d="M7.5 7.5 13 13M18 15.6l-3.5-3.9" />
      </svg>
    ),
    hover: 'wiggle',
  },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="nav">
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>skyfall</a>

        <div className={styles.links}>
          {links.map((l) => (
            <a key={l.label} href={l.href} className={`${styles.link} ${styles[`link${l.hover}`]}`}>
              <span className={styles.linkIcon}>{l.icon}</span>
              <span>{l.label}</span>
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <a href="https://t.me/Night3098" className={styles.tg}>
            <svg className={styles.tgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12m0 0 4.5-4.5M12 15 7.5 10.5" />
              <path d="M4.5 20.5h15" />
            </svg>
            <span className={styles.tgText}>Get access</span>
            <svg className={styles.tgArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4.5 12h13.25M12.75 5.25 19.5 12l-6.75 6.75" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}