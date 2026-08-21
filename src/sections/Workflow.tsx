import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import RevealText from '@/components/RevealText'
import styles from './Workflow.module.css'

const steps = [
  {
    title: 'Collect',
    desc: 'Start with any lead — username, phone, email, domain or wallet. SkyFall fans out across 15 modules.',
    tags: ['username', 'phone', 'email', 'domain', 'crypto'],
  },
  {
    title: 'Correlate',
    desc: 'Raw findings merge into a unified case graph. Entities link automatically across services and networks.',
    tags: ['graph', 'entities', 'relations'],
  },
  {
    title: 'Analyze',
    desc: 'Run dorks, scan for secrets, trace transactions, inspect files. Each module feeds structured evidence back.',
    tags: ['dorks', 'secrets', 'ledger'],
  },
  {
    title: 'Report',
    desc: 'Export a clean intelligence report — or let the LLM write it for you. Data never leaves your machine.',
    tags: ['llm', 'pdf', 'json'],
  },
]

export default function Workflow() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(`.${styles.row}`).forEach((row) => {
        gsap.fromTo(
          row,
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="workflow" ref={rootRef}>
      <header className={styles.header}>
        <RevealText as="h2" className="section-title" lines={['From lead', 'to report.']} scrollTrigger />
      </header>

      <div className={styles.rows}>
        {steps.map((s, i) => (
          <article className={styles.row} key={s.title}>
            <span className={styles.index}>0{i + 1}</span>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.desc}>{s.desc}</p>
            <div className={styles.tags}>
              {s.tags.map((t) => (
                <span className={styles.tag} key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
