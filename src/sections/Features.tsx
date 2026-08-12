import type { CSSProperties } from 'react'
import styles from './Features.module.css'

const features = [
  {
    title: 'Telegram Analyzer',
    color: 'var(--nf-cyan)',
    desc: 'Multi-account user profiling, channel collection, interaction graphs, media extraction with proxy rotation.',
    img: '/assets/imgs/tg_analyzer.png',
    wide: true,
  },
  {
    title: 'Telegram Downloader',
    color: 'var(--nf-cyan)',
    desc: 'Download media, documents, and messages from channels and groups with speed throttling.',
    img: '/assets/imgs/tg_downloader.png',
    wide: false,
  },
  {
    title: 'Dorking',
    color: 'var(--lime)',
    desc: '7,944 Google dorks across 14 categories via DuckDuckGo or self-hosted SearXNG.',
    img: '/assets/imgs/dorking.png',
    wide: true,
  },
  {
    title: 'Username Search',
    color: 'var(--nf-blue)',
    desc: 'Username presence across 3,300+ sites using Sherlock and Maigret dual-engine.',
    img: '/assets/imgs/username.png',
    wide: false,
  },
  {
    title: 'Git Research',
    color: 'var(--nf-orange)',
    desc: 'User profiling, secret scanning (270+ patterns), email extraction, and code dorking.',
    img: '/assets/imgs/git_research.png',
    wide: true,
  },
  {
    title: 'Graph Analytics',
    color: 'var(--nf-blue)',
    desc: 'Relationship graphs between users, channels, and domains. 13 entity types, auto-layout, JSON export.',
    img: '/assets/imgs/graph.png',
    wide: true,
  },
  {
    title: 'Domain Analyzer',
    color: 'var(--nf-cyan)',
    desc: 'WHOIS, DNS records, subdomain enumeration, SSL analysis, hosting history, nmap port scans.',
    img: '/assets/imgs/domain_analyzer.png',
    wide: false,
  },
  {
    title: 'Email OSINT',
    color: 'var(--nf-purple)',
    desc: 'Breach searches via IntelX, HIBP check, and bucket content discovery.',
    img: '/assets/imgs/mail.png',
    wide: false,
  },
  {
    title: 'Phone OSINT',
    color: 'var(--nf-yellow)',
    desc: 'Validation, carrier lookup, social association, and leak checks via NumVerify & AbstractAPI.',
    img: '/assets/imgs/phone.png',
    wide: false,
  },
  {
    title: 'Crypto Analysis',
    color: 'var(--lime)',
    desc: 'Address tracing and transaction search across 10 networks by date, amount, and memo.',
    img: '/assets/imgs/crypto.png',
    wide: false,
  },
  {
    title: 'File Analysis',
    color: 'var(--nf-red)',
    desc: 'Metadata extraction, embedded object detection, hash lookups, VirusTotal verdicts.',
    img: '/assets/imgs/file_analyze.png',
    wide: false,
  },
  {
    title: 'Steganography',
    color: 'var(--nf-pink)',
    desc: 'Detect hidden data via LSB, spectral analysis, and EOI markers in images and audio.',
    img: '/assets/imgs/stegano.png',
    wide: false,
  },
  {
    title: 'MCP Server',
    color: 'var(--nf-purple)',
    desc: 'Model Context Protocol server — 55 tools that plug SkyFall into AI agents and LLM workflows.',
    img: '/assets/imgs/mcp.png',
    wide: false,
  },
  {
    title: 'AI Report',
    color: 'var(--lime)',
    desc: 'Automated intelligence reports via local Ollama — no data ever leaves your machine.',
    img: '/assets/imgs/ai_report.png',
    wide: false,
  },
]

export default function Features() {
  return (
    <section className={styles.section} id="modules">
      <header className={styles.header}>
        <h2 className={`section-title ${styles.title}`}>Built different.</h2>
        <p className={styles.subtitle}>
          Fourteen modules covering the full intelligence lifecycle — from collection to reporting.
        </p>
      </header>

      <div className={styles.grid}>
        {features.map((f) => (
          <article
            key={f.title}
            className={`${styles.card} ${f.wide ? styles.wide : ''}`}
            style={{ '--accent': f.color } as CSSProperties}
          >
            <div className={styles.graphic}>
              <img src={f.img} alt={f.title} loading="lazy" />
            </div>
            <div className={styles.body}>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
