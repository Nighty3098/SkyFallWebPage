import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Hero.module.css'

const rowCells = [0, 1, 2, 3, 4, 5]

const tgRows = [
  ['username', '@user1313'],
  ['firstname', 'Иван'],
  ['phone', '+7 ••• ••• 14'],
  ['location', 'RU · Moscow'],
  ['memberships', '14 groups'],
  ['shared media', '1,204 items'],
  ['interactions', '2h ago'],
]

const dorks = [
  ['intext:"@gmail.com" intext:"password"', '✓ 1.2k'],
  ['filetype:xls inurl:password', '✓ 340'],
  ['intitle:"index of" "backup"', '✓ 780'],
  ['inurl:viewer.php? filetype:db', '✓ 95'],
  ['allintext:"admin" "login"', '✓ 2.1k'],
]

const graphNodes = [
  { id: 'person', x: 62, y: 128, color: 'var(--nf-cyan)' },
  { id: 'phone', x: 196, y: 58, color: 'var(--nf-yellow)' },
  { id: 'domain', x: 322, y: 118, color: 'var(--nf-blue)' },
  { id: 'email', x: 132, y: 212, color: 'var(--nf-purple)' },
  { id: 'crypto', x: 302, y: 232, color: 'var(--nf-green)' },
]

const graphEdges = [
  ['person', 'phone'],
  ['person', 'email'],
  ['person', 'domain'],
  ['email', 'domain'],
  ['domain', 'crypto'],
]

function GraphSvg() {
  const pos = Object.fromEntries(graphNodes.map((n) => [n.id, n]))
  return (
    <svg className={styles.graphSvg} viewBox="0 0 380 290" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--nf-border)" />
          <stop offset="1" stopColor="var(--nf-blue)" />
        </linearGradient>
      </defs>
      {graphEdges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={pos[a].x}
          y1={pos[a].y}
          x2={pos[b].x}
          y2={pos[b].y}
          stroke="url(#edgeGrad)"
          strokeWidth="1.2"
          strokeDasharray="4 5"
          className={styles.graphEdge}
        />
      ))}
      {graphNodes.map((n) => (
        <g key={n.id}>
          <rect x={n.x - 16} y={n.y - 16} width="32" height="32" fill="var(--card-solid)" stroke={n.color} strokeWidth="1.5" />
          <rect x={n.x - 4.5} y={n.y - 4.5} width="9" height="9" fill={n.color} />
          <text
            x={n.x}
            y={n.y + 32}
            textAnchor="middle"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            fill="var(--fg-muted)"
            letterSpacing="0.05em"
          >
            {n.id}
          </text>
        </g>
      ))}
    </svg>
  )
}

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
      {/* row 1 — empty top row with visible column dividers */}
      <div className={styles.emptyTop} aria-hidden="true">
        {rowCells.map((i) => (
          <div key={i} />
        ))}
      </div>

      {/* row 2 — telegram analyzer (cols 1–2) */}
      <div className={`${styles.cell} ${styles.tg}`} data-reveal>
        <div className={styles.tgCard}>
          <div className={styles.tgRows}>
            {tgRows.map(([k, v]) => (
              <div key={k} className={styles.tgRow}>
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* row 2 — empty mid zone (cols 3–4) */}
      <div className={styles.emptyMidTop} aria-hidden="true" />

      {/* row 2 — dorking (cols 5–6) */}
      <div className={`${styles.cell} ${styles.dork}`} data-reveal>
        <div className={styles.dorkCard}>
          {dorks.map(([q, n]) => (
            <div key={q} className={styles.dorkRow}>
              <span className={styles.dorkQuery}>{q}</span>
              <span className={styles.dorkCount}>{n}</span>
            </div>
          ))}
          <p className={styles.dorkFoot}>7,944 dorks · 14 categories · via SearXNG / DuckDuckGo</p>
        </div>
      </div>

      {/* row 3 — center lime band (all 6 cols) */}
      <div className={styles.center} data-reveal>
        <div className={styles.centerLime}>
          <h1 className={styles.wordmark}>skyfall</h1>
        </div>
      </div>

      {/* row 4 — txfetch crypto search (cols 1–2) */}
      <div className={`${styles.cell} ${styles.data}`} data-reveal>
        <div className={styles.dataWrap}>
          <div className={`${styles.dataCard} ${styles.data1}`}>
            <div className={styles.dataHeader}>query · tron</div>
            <div className={styles.dataRows}>
              <div className={styles.dataRow}>
                <span>date</span>
                <span>07.04.2026</span>
              </div>
              <div className={styles.dataRow}>
                <span>time</span>
                <span>17:38:00 UTC</span>
              </div>
              <div className={styles.dataRow}>
                <span>coin</span>
                <span>USDT</span>
              </div>
            </div>
          </div>
          <div className={`${styles.dataCard} ${styles.data2}`}>
            <div className={styles.dataHeader}>filters</div>
            <div className={styles.dataRows}>
              <div className={styles.dataRow}>
                <span>amount</span>
                <span>800</span>
              </div>
              <div className={styles.dataRow}>
                <span>memo</span>
                <span>—</span>
              </div>
              <div className={styles.dataRow}>
                <span>range</span>
                <span>±5 min</span>
              </div>
              <div className={styles.dataRow}>
                <span>tolerance</span>
                <span>±1%</span>
              </div>
            </div>
          </div>
          <div className={`${styles.dataCard} ${styles.data3}`}>
            <div className={styles.dataHeader}>candidates · 2</div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>txid</th>
                  <th>conf</th>
                  <th>amount</th>
                  <th>time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>6d2902a3ad…</td>
                  <td className={styles.confHi}>100%</td>
                  <td>800.00</td>
                  <td>17:38:00</td>
                </tr>
                <tr>
                  <td>7ac5197403…</td>
                  <td>74%</td>
                  <td>797.80</td>
                  <td>17:38:15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* row 4 — empty mid zone (cols 3–4) */}
      <div className={styles.emptyMidBottom} aria-hidden="true" />

      {/* row 4 — graph analytics (cols 5–6) */}
      <div className={`${styles.cell} ${styles.graph}`} data-reveal>
        <div className={styles.graphCard}>
          <div className={styles.graphHeader}>
            <span>link graph</span>
            <span>5 nodes · 5 edges</span>
          </div>
          <GraphSvg />
        </div>
      </div>

      {/* row 5 — empty bottom row with visible column dividers */}
      <div className={styles.emptyBottom} aria-hidden="true">
        {rowCells.map((i) => (
          <div key={i} />
        ))}
      </div>
    </section>
  )
}

export default Hero
