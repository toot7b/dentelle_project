import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdhesionSection from "@/components/adhesion/AdhesionSection";

export default function AdhesionPage() {
  return (
    <main>
      <Navbar />
      <AdhesionSection />
      <Footer hideSeparator />
    </main>
  );
}
