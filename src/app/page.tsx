import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import Process from "@/components/Process";
import WorkShowcase from "@/components/WorkShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <Process />
        <WorkShowcase />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
