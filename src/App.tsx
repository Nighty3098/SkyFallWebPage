import { useScrollRefreshOnLoad } from '@/lib/gsap'
import SmoothScroll from '@/components/SmoothScroll'
import Nav from '@/components/Nav'
import Noise from '@/components/Noise'
import Hero from '@/sections/Hero'
import Manifesto from '@/sections/Manifesto'
import Modules from '@/sections/Modules'
import Workflow from '@/sections/Workflow'
import Footer from '@/sections/Footer'

export default function App() {
  useScrollRefreshOnLoad()

  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Modules />
        <Workflow />
      </main>
      <Footer />
      <Noise opacity={0.4} />
    </SmoothScroll>
  )
}
