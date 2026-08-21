import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, CustomEase)

CustomEase.create('hop', '0.9, 0, 0.1, 1')

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Refresh ScrollTrigger after fonts/images settle. */
export function useScrollRefreshOnLoad() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') {
      refresh()
      return
    }
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
}

export { gsap, ScrollTrigger, CustomEase }
