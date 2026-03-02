import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ActivitiesSection } from "@/components/activities";
import GalerieSection from "@/components/galerie/GalerieSection";
import AboutSection from "@/components/about/AboutSection";
import FaqSection from "@/components/faq/FaqSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ActivitiesSection />
      <GalerieSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
