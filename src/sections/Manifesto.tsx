import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import styles from './Manifesto.module.css'

const slides = [
  {
    lines: ['Every footprint', 'leaves a trace.'],
    align: 'left',
    img: '/assets/imgs/username.png',
  },
  {
    lines: ['Traces form patterns.'],
    align: 'left',
    img: '/assets/imgs/dorking.png',
  },
  {
    lines: ['Patterns expose', 'identity.'],
    align: 'left',
    img: '/assets/imgs/graph.png',
  },
]

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const slideEls = gsap.utils.toArray<HTMLElement>(`.${styles.slide}`)
      const previewEls = gsap.utils.toArray<HTMLElement>(`.${styles.preview}`)

      // words: each word wrapped with a sweep block
      const wordsPerSlide = slideEls.map((el) =>
        gsap.utils.toArray<HTMLElement>(`.${styles.word}`, el),
      )
      const blocksPerSlide = wordsPerSlide.map((words) =>
        words.map((w) => w.querySelector<HTMLElement>(`.${styles.wordBlock}`)),
      )

      gsap.set(wordsPerSlide.flat(), { opacity: 0 })
      gsap.set(previewEls, { clipPath: 'polygon(0% 100%,100% 100%,100% 100%,0% 100%)' })

      const D = slides.length * 1.6

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${D * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      slides.forEach((_, i) => {
        const words = wordsPerSlide[i]
        const blocks = blocksPerSlide[i]
        const at = i * 1.6

        if (i > 0) {
          tl.to(
            wordsPerSlide[i - 1],
            { opacity: 0, duration: 0.3 },
            at - 0.3,
          )
          tl.to(
            previewEls[i - 1],
            { clipPath: 'polygon(0% 0%,100% 0%,100% 0%,0% 0%)', duration: 0.3 },
            at - 0.3,
          )
        }

        tl.to(
          previewEls[i],
          {
            clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)',
            duration: 0.45,
            ease: 'power3.inOut',
          },
          at,
        )

        words.forEach((word, wi) => {
          const block = blocks[wi]
          const wAt = at + 0.35 + wi * 0.14
          tl.set(word, { opacity: 1 }, wAt)
          if (block) {
            tl.fromTo(
              block,
              { scaleX: 1 },
              { scaleX: 0, duration: 0.22, ease: 'power2.inOut', transformOrigin: 'right center' },
              wAt + 0.06,
            )
          }
        })

        tl.to({}, { duration: 0.35 })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="manifesto" ref={sectionRef}>
      <div className={styles.previews}>
        {slides.map((s) => (
          <figure className={styles.preview} key={s.img}>
            <img src={s.img} alt="" loading="lazy" />
          </figure>
        ))}
      </div>

      <div className={styles.slides}>
        {slides.map((s, i) => (
          <div className={`${styles.slide} ${s.align === 'center' ? styles.center : ''}`} key={i}>
            <p className={styles.text}>
              {s.lines.map((line, li) => (
                <span className={styles.lineRow} key={li}>
                  {line.split(' ').map((word, wi) => (
                    <span className={styles.word} key={wi}>
                      <span className={styles.wordBlock} aria-hidden="true" />
                      <span className={styles.wordText}>{word}</span>
                    </span>
                  ))}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
