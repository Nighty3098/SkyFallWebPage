import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Marquee.module.css'

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface MarqueeProps {
  text: string
  speed?: number
}

export default function Marquee({ text, speed = 240 }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [copies, setCopies] = useState(4)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return
    if (prefersReducedMotion()) return

    const measure = () => {
      const unit = track.querySelector('[data-unit]')
      if (!unit) return
      const unitW = unit.getBoundingClientRect().width
      if (!unitW) return
      const needed = Math.ceil(container.offsetWidth / unitW) + 2
      setCopies((c) => (needed > c ? needed : c))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track || prefersReducedMotion()) return

    const totalW = track.scrollWidth / 2
    const dur = totalW / speed

    const tween = gsap.to(track, {
      x: -totalW,
      duration: dur,
      repeat: -1,
      ease: 'none',
    })

    return () => { tween.kill() }
  }, [copies, speed])

  const units = Array.from({ length: copies }, (_, i) => (
    <span key={i} data-unit className={styles.unit}>
      {text}
    </span>
  ))

  return (
    <div className={styles.container} ref={containerRef} aria-hidden="true">
      <div className={styles.track} ref={trackRef}>
        {units}
      </div>
    </div>
  )
}
