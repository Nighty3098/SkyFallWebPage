import styles from './Steps.module.css'

const steps = [
  { num: '01', title: 'Collection', desc: 'Distributed data collection across domains, IPs, Telegram channels, GitHub repositories, and blockchain networks.' },
  { num: '02', title: 'Analysis', desc: 'Correlation engine cross-references findings, builds relationship graphs, and scores confidence across linked entities.' },
  { num: '03', title: 'Dissemination', desc: 'Export intelligence via interactive graphs, HTML reports, and CSV — all through the Qt desktop interface.' },
]

export default function Steps() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <p className={styles.colTitle}>How it works</p>
        <p className={styles.colItems}>
          Three layers of intelligence gathering, correlated into a single operational picture.
        </p>
      </div>

      <div className={styles.content}>
        <p className={styles.colTitle}>The process</p>
        <div className={styles.colItems}>
          {steps.map((s) => (
            <div key={s.num} className={styles.item}>
              <span className={styles.itemNum}>{s.num}</span>
              <div>
                <h3 className={styles.itemTitle}>{s.title}</h3>
                <p className={styles.itemDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
