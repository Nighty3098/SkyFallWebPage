import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import styles from './RevealText.module.css'

interface RevealTextProps {
  readonly lines: readonly string[]
  readonly as?: 'h1' | 'h2' | 'h3' | 'p'
  readonly className?: string
  /** Animate when scrolled into view instead of immediately. */
  readonly scrollTrigger?: boolean
  /** Gate animation until preloader is done. */
  readonly active?: boolean
  readonly delay?: number
  readonly stagger?: number
}

export default function RevealText({
  lines,
  as: Tag = 'p',
  className,
  scrollTrigger = false,
  active = true,
  delay = 0,
  stagger = 0.12,
}: RevealTextProps) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !active) return

    const ctx = gsap.context(() => {
      const blocks = root.querySelectorAll<HTMLElement>(`.${styles.block}`)
      const texts = root.querySelectorAll<HTMLElement>(`.${styles.text}`)

      if (prefersReducedMotion()) {
        gsap.set(blocks, { scaleX: 0 })
        gsap.set(texts, { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        delay,
        ...(scrollTrigger
          ? {
              scrollTrigger: {
                trigger: root,
                start: 'top 85%',
                once: true,
              },
            }
          : {}),
      })

      tl.set(texts, { opacity: 1 }, 0)
        .to(blocks, { scaleX: 1, duration: 0.55, ease: 'power3.inOut', stagger }, 0)
        .set(blocks, { transformOrigin: 'right center' })
        .to(blocks, { scaleX: 0, duration: 0.55, ease: 'power3.inOut', stagger }, 0.5)
        .fromTo(
          texts,
          { y: '0.35em' },
          { y: '0em', duration: 0.7, ease: 'hop', stagger },
          0.35,
        )
    }, root)

    return () => ctx.revert()
  }, [active, delay, stagger, scrollTrigger])

  return (
    <Tag className={className} ref={rootRef as never}>
      {lines.map((line, i) => (
        <span key={i} className={styles.row}>
          <span className={styles.block} aria-hidden="true" />
          <span className={styles.text}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
