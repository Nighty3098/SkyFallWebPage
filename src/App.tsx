import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/sections/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/sections/Features";
import Steps from "@/sections/Steps";
import Cta from "@/sections/Cta";
import Footer from "@/sections/Footer";

const marqueeText =
  "Telegram Analyzer / Dorking / Username Search / Git Research / Graph Analytics / Domain Analyzer / Email OSINT / Phone OSINT / Crypto Analysis / File Analysis / Steganography / MCP Server / AI Report";

export default function App() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <Marquee text={marqueeText} />
        <Features />
        <Steps />
        <Cta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}