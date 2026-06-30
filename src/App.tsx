import SmoothScroll from '@/components/SmoothScroll'
import Hero from '@/sections/Hero'

import Features from '@/sections/Features'
import Steps from '@/sections/Steps'
import CTA from '@/sections/CTA'
import Footer from '@/sections/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <Hero />

      <Features />
      <Steps />
      <CTA />
      <Footer />
    </SmoothScroll>
  )
}
