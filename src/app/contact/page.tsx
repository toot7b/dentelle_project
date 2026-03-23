import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageSection from "@/components/contact/ContactPageSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez les Fuseaux Asseventois. Posez vos questions sur nos ateliers de dentelle aux fuseaux et de broderie hardanger à Assevent et Maubeuge. Nous vous répondons rapidement.",
  alternates: {
    canonical: "https://fuseaux-asseventois.fr/contact",
  },
  openGraph: {
    title: "Contact — Les Fuseaux Asseventois",
    description:
      "Posez vos questions sur nos ateliers de dentelle aux fuseaux et de broderie hardanger à Assevent et Maubeuge.",
    url: "https://fuseaux-asseventois.fr/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactPageSection />
      <Footer hideSeparator />
    </main>
  );
}
