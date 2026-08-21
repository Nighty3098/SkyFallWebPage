import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
// @ts-ignore
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

function isDesktop() {
  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches
}

export default function SmoothScroll({ children }: { readonly children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion() || !isDesktop()) return

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      overscroll: false,
      prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
