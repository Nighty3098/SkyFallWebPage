import type { CSSProperties } from 'react'
import styles from './Steps.module.css'

const steps = [
  {
    n: '01',
    title: 'Collect',
    accent: 'var(--nf-cyan)',
    desc: 'Start with any lead — username, phone, email, domain, or wallet. SkyFall fans out across 15 modules.',
    tags: ['username', 'phone', 'email', 'domain', 'crypto'],
  },
  {
    n: '02',
    title: 'Correlate',
    accent: 'var(--nf-blue)',
    desc: 'Raw findings merge into a unified case graph. Entities link automatically across services and networks.',
    tags: ['graph', 'entities', 'relations'],
  },
  {
    n: '03',
    title: 'Analyze',
    accent: 'var(--nf-purple)',
    desc: 'Run dorks, scan for secrets, trace transactions, and inspect files. Each module feeds structured evidence back.',
    tags: ['dorks', 'secrets', 'ledger'],
  },
  {
    n: '04',
    title: 'Report',
    accent: 'var(--lime)',
    desc: 'Export a clean intelligence report — or let local Ollama write it for you. Data never leaves your machine.',
    tags: ['ollama', 'pdf', 'json'],
  },
]

export default function Steps() {
  return (
    <section className={styles.section} id="workflow">
      <header className={styles.header}>
        <h2 className={`section-title ${styles.title}`}>From lead to report.</h2>
      </header>

      <div className={styles.list}>
        {steps.map((s) => (
          <article key={s.n} className={styles.step} style={{ '--accent': s.accent } as CSSProperties}>
            <span className={styles.num}>{s.n}</span>
            <div className={styles.mid}>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
            <div className={styles.tags}>
              {s.tags.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
