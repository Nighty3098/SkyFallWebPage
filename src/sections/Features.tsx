import styles from './Features.module.css'

const features = [
  {
    title: 'Telegram Analyzer',
    desc: 'Multi-account user profiling, channel collection, interaction graphs, media extraction with proxy rotation.',
    img: '/assets/imgs/tg_analyzer.png',
  },
  {
    title: 'Telegram Downloader',
    desc: 'Download media, documents, and messages from Telegram channels and groups with speed throttling.',
    img: '/assets/imgs/tg_downloader.png',
  },
  {
    title: 'Dorking',
    desc: 'Search across 3,300+ platforms via Sherlock and Maigret engines with WAF detection and IntelX lookups.',
    img: '/assets/imgs/dorking.png',
  },
  {
    title: 'Email OSINT',
    desc: 'Search email addresses via IntelX for data breaches, bucket content, and record details.',
    img: '/assets/imgs/mail.png',
  },
  {
    title: 'Git Research',
    desc: 'User profiling, secret scanning (270+ patterns, 17 categories), email extraction, and code dorking.',
    img: '/assets/imgs/git_research.png',
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
  {
    title: 'Domain Analyzer',
    desc: 'WHOIS lookup, DNS records, subdomain enumeration, SSL certificate analysis, and hosting history.',
    img: '/assets/imgs/domain_analyzer.png',
  },
  {
    title: 'Phone OSINT',
    desc: 'Phone number validation, carrier lookup, social media association, and location metadata extraction.',
    img: '/assets/imgs/phone.png',
  },
  {
    title: 'Crypto Analysis',
    desc: 'Blockchain address tracing, transaction flow mapping, exchange attribution, and risk scoring.',
    img: '/assets/imgs/crypto.png',
  },
  {
    title: 'File Analysis',
    desc: 'Metadata extraction, embedded object detection, hash lookups, and automated threat classification.',
    img: '/assets/imgs/file_analyze.png',
  },
  {
    title: 'AI Report',
    desc: 'Automated intelligence report generation with AI-powered summarization and risk assessment.',
    img: '/assets/imgs/ai_report.png',
  },
  {
    title: 'Steganography',
    desc: 'Detect hidden data in images, audio, and documents using spectral and statistical analysis.',
    img: '/assets/imgs/stegano.png',
  },
  {
    title: 'MCP Server',
    desc: 'Model Context Protocol server for integrating SkyFall OSINT modules into AI agents and LLM workflows.',
    img: '/assets/imgs/mcp.png',
  },
]

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.header}>
        <h2 className={styles.title}>Everything you need.</h2>
        <p className={styles.subtitle}>Fourteen modules that cover the full intelligence lifecycle.</p>
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
