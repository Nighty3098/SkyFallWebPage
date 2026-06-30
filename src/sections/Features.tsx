import styles from './Features.module.css'

const features = [
  {
    title: 'Telegram OSINT',
    desc: 'Multi-account user profiling, channel collection, interaction graphs, media extraction with proxy rotation.',
    img: '/assets/imgs/tg.png',
  },
  {
    title: 'Dorking',
    desc: 'Search across 3,300+ platforms via Sherlock and Maigret engines with WAF detection and IntelX lookups.',
    img: '/assets/imgs/dorks.png',
  },
  {
    title: 'Email OSINT',
    desc: 'Search email addresses via IntelX for data breaches, bucket content, and record details.',
    img: '/assets/imgs/mail.png',
  },
  {
    title: 'GitHub Recon',
    desc: 'User profiling, secret scanning (270+ patterns, 17 categories), email extraction, and code dorking.',
    img: '/assets/imgs/github.png',
  },
  {
    title: 'Username Search',
    desc: 'Search 3,300+ sites for a username using Sherlock and Maigret dual-engine.',
    img: '/assets/imgs/username.png',
  },
  {
    title: 'Graph Analytics',
    desc: 'Relationship graphs between users, channels, and domains. Export to JSON.',
    img: '/assets/imgs/graph.png',
  },
]

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.header}>
        <h2 className={styles.title}>Everything you need.</h2>
        <p className={styles.subtitle}>Six modules that cover the full intelligence lifecycle.</p>
      </div>

      <div className={styles.main}>
        {features.map((f) => (
          <article key={f.title} className={styles.work}>
            <div className={styles.workImg}>
              <img src={f.img} alt={f.title} className={styles.screenshot} />
            </div>
            <div className={styles.works}>
              <h3 className={styles.workName}>{f.title}</h3>
              <p className={styles.workDesc}>{f.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
