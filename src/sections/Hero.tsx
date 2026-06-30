import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Hero.module.css'

const BASE_SPEED = 120
const SMOOTH = 6

function Hero() {
  const text = ' skyfall · osint · threat intel · reconnaissance · forensics · telegram osint · blockchain · github recon · '

  const containerRef = useRef<HTMLDivElement>(null)
  const whiteTrackRef = useRef<HTMLDivElement>(null)
  const greyTrackRef = useRef<HTMLDivElement>(null)
  const [copies, setCopies] = useState(4)

  const anim = useRef({
    pos: 0,
    vel: BASE_SPEED,
    target: BASE_SPEED,
    wrap: (v: number) => v,
  })

  useEffect(() => {
    const white = whiteTrackRef.current
    const grey = greyTrackRef.current
    const container = containerRef.current
    if (!white || !grey || !container) return

    const setWhite = gsap.quickSetter(white, 'x', 'px')
    const setGrey = gsap.quickSetter(grey, 'x', 'px')
    const s = anim.current

    const measure = () => {
      const unit = white.querySelector('[data-unit]')
      if (!unit) return
      const unitW = unit.getBoundingClientRect().width
      if (!unitW) return
      s.wrap = gsap.utils.wrap(-unitW, 0)
      s.pos = s.wrap(s.pos)
      const needed = Math.ceil(container.offsetWidth / unitW) + 2
      setCopies((c) => (needed > c ? needed : c))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)

    const tick = (_time: number, deltaMS: number) => {
      const dt = Math.min(deltaMS, 50) / 1000
      const k = 1 - Math.exp(-dt * SMOOTH)
      s.vel += (s.target - s.vel) * k
      s.pos = s.wrap(s.pos - s.vel * dt)
      setWhite(s.pos)
      setGrey(s.pos)
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
    }
  }, [])

  const units = Array.from({ length: copies }, (_, i) => (
    <span key={i} data-unit className={styles.unit}>
      {text}
    </span>
  ))

  return (
    <section className={styles.container} ref={containerRef}>
      <div className={styles.topbar}>
        <span className={styles.clock}>SkyFall</span>
        <span className={styles.tag}>osint platform</span>
      </div>

      <p className={styles.identity} aria-hidden="true">OSINT Intelligence Platform</p>

      <div className={styles.square}>
        <img src="/skyfall.jpg" alt="SkyFall" className={styles.squareImg} />
      </div>

      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeLight}>
          <div className={styles.track} ref={whiteTrackRef}>
            {units}
          </div>
        </div>
        <div className={styles.marqueeDark}>
          <div className={styles.track} ref={greyTrackRef}>
            {units}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
