import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
// @ts-ignore
import 'lenis/dist/lenis.css'

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      lerp: 0.045,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      syncTouch: true,
      touchMultiplier: 0.8,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      overscroll: false,
      prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => { lenis.destroy() }
  }, [])

  return <>{children}</>
}
