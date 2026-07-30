import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Hero.module.css'

const BASE_SPEED = 60
const SMOOTH = 4

function Hero() {
  const text = ' skyfall · osint · threat intel · reconnaissance · telegram osint · blockchain · github recon · '

  const containerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [copies, setCopies] = useState(4)

  const anim = useRef({
    pos: 0,
    vel: BASE_SPEED,
    target: BASE_SPEED,
    wrap: (v: number) => v,
  })

  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const setX = gsap.quickSetter(track, 'x', 'px')
    const s = anim.current

    const measure = () => {
      const unit = track.querySelector('[data-unit]')
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
      setX(s.pos)
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    const section = containerRef.current
    const spotlight = spotlightRef.current
    if (!section || !spotlight) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      spotlight.style.setProperty('--mx', `${x}%`)
      spotlight.style.setProperty('--my', `${y}%`)
    }

    const randomize = () => {
      const rx = 260 + Math.random() * 80
      const ry = 200 + Math.random() * 80
      spotlight.style.setProperty('--rx', `${rx}px`)
      spotlight.style.setProperty('--ry', `${ry}px`)
    }

    randomize()
    section.addEventListener('mousemove', handleMouseMove)
    const interval = setInterval(randomize, 400)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const identity = containerRef.current?.querySelector('[data-identity]')
    if (!identity) return

    gsap.fromTo(identity, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 })
  }, [])

  const units = Array.from({ length: copies }, (_, i) => (
    <span key={i} data-unit className={styles.unit}>
      {text}
    </span>
  ))

  return (
    <section className={styles.container} ref={containerRef}>
      <div className={styles.spotlight} ref={spotlightRef} />

      <div className={styles.marqueeOverlay}>
        <div className={styles.track} ref={trackRef}>
          {units}
        </div>
      </div>

      <p className={styles.identity} data-identity>SkyFall</p>
    </section>
  )
}

export default Hero
