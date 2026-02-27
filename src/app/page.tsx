import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ActivitiesSection } from "@/components/activities";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ActivitiesSection />
    </main>
  );
}
