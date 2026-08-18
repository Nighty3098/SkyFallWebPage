import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Hero.module.css'

function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cells = container.querySelectorAll('[data-reveal]')
    gsap.fromTo(
      cells,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.1,
      },
    )
  }, [])

  return (
    <section className={styles.hero} id="top" ref={containerRef}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.intro} data-reveal>
        <h1 className={styles.title}>
          OSINT investigation
          <br />
          toolkit
        </h1>

        <div className={styles.actions}>
          <a href="https://t.me/Night3098" className={styles.primary}>
            <svg className={styles.primaryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12m0 0 4.5-4.5M12 15 7.5 10.5" />
              <path d="M4.5 20.5h15" />
            </svg>
            <span className={styles.primaryText}>Get access</span>
            <svg className={styles.primaryArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4.5 12h13.25M12.75 5.25 19.5 12l-6.75 6.75" />
            </svg>
          </a>
          <a href="#modules" className={styles.secondary}>
            <svg className={styles.secondaryIcon} viewBox="0 0 28 28" fill="currentColor" aria-hidden="true">
              <g>
                <path className={styles.spinPart} d="M7.21 24.471h2.542c.235 0 .41.07.586.246l1.805 1.793c1.477 1.488 2.848 1.477 4.324 0l1.805-1.793c.188-.175.352-.246.598-.246h2.53c2.099 0 3.071-.96 3.071-3.07V18.87c0-.247.07-.41.246-.598l1.793-1.805c1.488-1.476 1.477-2.847 0-4.324l-1.793-1.805a.763.763 0 0 1-.246-.586V7.21c0-2.085-.96-3.07-3.07-3.07H18.87a.777.777 0 0 1-.598-.234l-1.805-1.793c-1.476-1.488-2.847-1.477-4.324 0l-1.805 1.793a.752.752 0 0 1-.586.234H7.21c-2.097 0-3.07.961-3.07 3.07v2.543c0 .235-.058.41-.234.586l-1.793 1.805c-1.488 1.477-1.477 2.848 0 4.324l1.793 1.805a.777.777 0 0 1 .234.598v2.53c0 2.099.973 3.071 3.07 3.071Z" />
              </g>
              <path d="M12.998 20.03c-.398 0-.726-.153-1.03-.563l-2.942-3.61c-.176-.233-.281-.503-.281-.76 0-.54.41-.973.949-.973.328 0 .586.117.879.503l2.379 3.07 5.004-8.038c.222-.364.527-.54.843-.54.504 0 .985.352.985.891 0 .27-.153.54-.293.774l-5.508 8.683c-.246.375-.586.563-.985.563Z" />
            </svg>
            <span>Explore the toolkit</span>
          </a>
        </div>

        <p className={styles.sys}>Python 3.13+ · PySide6 · Windows / Linux / macOS</p>
      </div>
    </section>
  )
}

export default Hero