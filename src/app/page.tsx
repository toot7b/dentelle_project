import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ActivitiesSection } from "@/components/activities";
import GalerieSection from "@/components/galerie/GalerieSection";
import FaqSection from "@/components/faq/FaqSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ActivitiesSection />
      <GalerieSection />
      <FaqSection />
    </main>
  );
}
