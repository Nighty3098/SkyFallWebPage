import styles from './Steps.module.css'

const steps = [
  {
    title: 'Collect',
    desc: 'Start with any lead - username, phone, email, domain, or wallet. SkyFall fans out across 15 modules.',
    tags: ['username', 'phone', 'email', 'domain', 'crypto'],
  },
  {
    title: 'Correlate',
    desc: 'Raw findings merge into a unified case graph. Entities link automatically across services and networks.',
    tags: ['graph', 'entities', 'relations'],
  },
  {
    title: 'Analyze',
    desc: 'Run dorks, scan for secrets, trace transactions, and inspect files. Each module feeds structured evidence back.',
    tags: ['dorks', 'secrets', 'ledger'],
  },
  {
    title: 'Report',
    desc: 'Export a clean intelligence report - or let LLM write it for you. Data never leaves your machine.',
    tags: ['llm', 'pdf', 'json'],
  },
]

export default function Steps() {
  return (
    <section className={styles.section} id="workflow">
      <header className={styles.header}>
        <h2 className="section-title">
          From lead to report.
        </h2>
      </header>

      <div className={styles.grid}>
        {steps.map((s) => (
          <article key={s.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.tags}>
              {s.tags.map((t) => (
                <span key={t} className={styles.tag}>
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