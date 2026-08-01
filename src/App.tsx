import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Steps from "@/sections/Steps";
import Cta from "@/sections/Cta";
import Footer from "@/sections/Footer";

export default function App() {
  return (
    <SmoothScroll>
      <Hero />
      <Features />
      <Steps />
      <Cta />
      <Footer />
    </SmoothScroll>
  );
}
