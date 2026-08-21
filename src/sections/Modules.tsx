import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import RevealText from '@/components/RevealText'
import styles from './Modules.module.css'

const modules = [
  { title: 'Telegram Analyzer', desc: 'Multi-account profiling, channel collection, interaction graphs, media extraction.' },
  { title: 'Telegram Downloader', desc: 'Media, documents and messages from channels and groups with speed throttling.' },
  { title: 'Dorking', desc: '7,944 Google dorks across 14 categories via DuckDuckGo or SearXNG.' },
  { title: 'Username Search', desc: 'Presence across 3,300+ sites using Sherlock and Maigret dual-engine.' },
  { title: 'Git Research', desc: 'User profiling, secret scanning (270+ patterns), email extraction, code dorking.' },
  { title: 'Graph Analytics', desc: 'Relationship graphs between users, channels and domains. 13 entity types.' },
  { title: 'Domain Analyzer', desc: 'WHOIS, DNS records, subdomain enumeration, SSL analysis, nmap scans.' },
  { title: 'Email OSINT', desc: 'Breach searches via IntelX, HIBP check, bucket content discovery.' },
  { title: 'Phone OSINT', desc: 'Validation, carrier lookup, social association, leak checks.' },
  { title: 'Crypto Analysis', desc: 'Address tracing and transaction search across 10 networks.' },
  { title: 'File Analysis', desc: 'Metadata extraction, embedded objects, hash lookups, VirusTotal verdicts.' },
  { title: 'Steganography', desc: 'Hidden data detection via LSB, spectral analysis and EOI markers.' },
  { title: 'MCP Server', desc: '55 tools that plug SkyFall into AI agents and LLM workflows.' },
  { title: 'AI Report', desc: 'Automated intelligence reports via local LLM. Data never leaves your machine.' },
]

export default function Modules() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(`.${styles.card}`).forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="modules" ref={rootRef}>
      <header className={styles.header}>
        <RevealText
          as="h2"
          className="section-title"
          lines={['Fourteen tools.', 'One case file.']}
          scrollTrigger
        />
        <p className={styles.subtitle}>
          Every module covers a stage of the intelligence lifecycle — from collection to reporting —
          and feeds structured evidence into a single case graph.
        </p>
      </header>

      <div className={styles.grid}>
        {modules.map((m, i) => (
          <article className={styles.card} key={m.title}>
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className={styles.title}>{m.title}</h3>
            <p className={styles.desc}>{m.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
