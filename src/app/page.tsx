import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ActivitiesSection } from "@/components/activities";
import GalerieSection from "@/components/galerie/GalerieSection";
import CoursSection from "@/components/cours/CoursSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ActivitiesSection />
      <GalerieSection />
      <CoursSection />
    </main>
  );
}
