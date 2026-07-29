import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StylePicker from "@/components/StylePicker";
import DemoEditor from "@/components/DemoEditor";
import Pricing from "@/components/Pricing";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <StylePicker />
      <DemoEditor />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
