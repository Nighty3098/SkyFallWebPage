import { useEffect, useState } from 'react'
import styles from './Nav.module.css'

const links = [
  { label: 'Modules', href: '#modules' },
  { label: 'Workflow', href: '#workflow' },
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
        <a href="#top" className={styles.logo}>
          <span className={styles.logoMark} />
          <span className={styles.logoText}>skyfall</span>
        </a>

        <div className={styles.links}>
          {links.map((l) => (
            <a key={l.label} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <a href="https://t.me/Night3098" className={styles.tg}>
            Get access →
          </a>
        </div>
      </div>
    </nav>
  )
}
