import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Steps from "@/sections/Steps";
import Footer from "@/sections/Footer";

export default function App() {
  return (
    <SmoothScroll>
      <Nav />
      <Hero />
      <Features />
      <Steps />
      <Footer />
    </SmoothScroll>
  );
}
