import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageSection from "@/components/contact/ContactPageSection";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactPageSection />
      <Footer hideSeparator />
    </main>
  );
}
