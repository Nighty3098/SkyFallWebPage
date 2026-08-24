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
  stagger = 0.14,
}: RevealTextProps) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !active) return

    const ctx = gsap.context(() => {
      const words = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.word}`))
      const blocks = words.map((w) => w.querySelector<HTMLElement>(`.${styles.block}`))

      if (prefersReducedMotion()) {
        gsap.set(blocks, { scaleX: 0 })
        return
      }

      gsap.set(words, { opacity: 0 })

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

      words.forEach((word, i) => {
        const at = i * stagger
        tl.set(word, { opacity: 1 }, at)
        const block = blocks[i]
        if (block) {
          tl.to(
            block,
            {
              scaleX: 0,
              duration: 0.22,
              ease: 'power2.inOut',
              transformOrigin: 'right center',
            },
            at + 0.05,
          )
        }
      })
    }, root)

    return () => ctx.revert()
  }, [active, delay, stagger, scrollTrigger])

  return (
    <Tag className={className} ref={rootRef as never}>
      {lines.map((line, li) => (
        <span className={styles.row} key={li}>
          {line.split(' ').map((word, wi) => (
            <span className={styles.word} key={wi}>
              <span className={styles.block} aria-hidden="true" />
              <span className={styles.text}>{word}</span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
