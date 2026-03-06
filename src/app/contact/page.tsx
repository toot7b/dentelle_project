import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageSection from "@/components/contact/ContactPageSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez les Fuseaux Asseventois. Posez vos questions sur nos ateliers de dentelle aux fuseaux à Assevent et Maubeuge. Nous vous répondons rapidement.",
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
