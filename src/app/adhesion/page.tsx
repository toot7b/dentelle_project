import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdhesionSection from "@/components/adhesion/AdhesionSection";

export const metadata: Metadata = {
  title: "Adhésion",
  description:
    "Rejoignez les Fuseaux Asseventois ! Inscrivez-vous à notre association de dentelle aux fuseaux à Assevent, près de Maubeuge. Ateliers hebdomadaires ouverts à tous niveaux.",
  alternates: {
    canonical: "https://fuseaux-asseventois.fr/adhesion",
  },
  openGraph: {
    title: "Adhésion — Les Fuseaux Asseventois",
    description:
      "Rejoignez notre association de dentelle aux fuseaux. Ateliers ouverts à tous niveaux à Assevent.",
    url: "https://fuseaux-asseventois.fr/adhesion",
  },
};

export default function AdhesionPage() {
  return (
    <main>
      <Navbar />
      <AdhesionSection />
      <Footer hideSeparator />
    </main>
  );
}
