import type { Metadata } from "next";
import "./globals.css";
import TransitionWrapper from "@/components/transitions/TransitionWrapper";

const SITE_URL = "https://fuseaux-asseventois.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Les Fuseaux Asseventois — Dentelle aux fuseaux",
    template: "%s — Les Fuseaux Asseventois",
  },
  description:
    "Association de dentelle aux fuseaux à Assevent. Ateliers hebdomadaires, initiation et transmission d'un art artisanal millénaire. Rejoignez une communauté de passionnés.",
  keywords: [
    "dentelle aux fuseaux",
    "dentelle",
    "fuseaux",
    "association dentelle",
    "club dentelle",
    "atelier dentelle",
    "artisanat",
    "dentelle artisanale",
    "cours dentelle",
    "fuseaux asseventois",
    "dentelle assevent",
    "association assevent",
    "club assevent",
    "dentelle maubeuge",
    "atelier maubeuge",
    "loisirs créatifs maubeuge",
  ],
  authors: [{ name: "Les Fuseaux Asseventois" }],
  creator: "Les Fuseaux Asseventois",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Les Fuseaux Asseventois",
    title: "Les Fuseaux Asseventois — Dentelle aux fuseaux",
    description:
      "Association de dentelle aux fuseaux. Ateliers hebdomadaires, initiation et transmission d'un art artisanal millénaire.",
    images: [
      {
        url: "/photos/fuseaux/fuseaux.webp",
        width: 1200,
        height: 630,
        alt: "Dentelle aux fuseaux — Les Fuseaux Asseventois",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Fuseaux Asseventois — Dentelle aux fuseaux",
    description:
      "Association de dentelle aux fuseaux. Ateliers hebdomadaires, initiation et transmission d'un art artisanal millénaire.",
    images: ["/photos/fuseaux/fuseaux.webp"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "association",
  classification: "Artisanat, Loisirs créatifs, Dentelle",
  other: {
    "geo.region": "FR",
    "geo.placename": "Assevent, Maubeuge",
    "content-language": "fr",
    "revisit-after": "7 days",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Les Fuseaux Asseventois",
              url: "https://fuseaux-asseventois.fr",
              logo: "https://fuseaux-asseventois.fr/photos/fuseaux/fuseaux.webp",
              description:
                "Association de dentelle aux fuseaux. Ateliers hebdomadaires, initiation et transmission d'un art artisanal millénaire.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Assevent",
                addressRegion: "Hauts-de-France",
                addressCountry: "FR",
              },
              areaServed: [
                { "@type": "City", name: "Assevent" },
                { "@type": "City", name: "Maubeuge" },
              ],
              sameAs: [
                "https://www.facebook.com/p/Les-Fuseaux-Asseventois-100070777254573/",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Je n'ai jamais fait de dentelle, puis-je venir ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Bien sûr ! L'atelier est ouvert aux personnes de tous niveaux. Les membres plus expérimentés seront ravis de vous guider pour vos premiers croisements et pour apprendre à monter votre carreau.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Faut-il apporter son propre matériel ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Si vous débutez, l'association peut vous prêter le matériel de base (carreau et fuseaux) pour faire vos premiers essais. Vous pourrez ensuite vous équiper progressivement selon vos envies.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Où et quand se déroulent les ateliers ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nous nous retrouvons au Pôle Culturel d'Assevent. N'hésitez pas à nous contacter via la page d'adhésion pour organiser votre première venue !",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quels sont nos tarifs ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "La participation est de 5 euros par mois. Ce tarif nous permet de faire vivre l'association tout au long de l'année.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <TransitionWrapper>
          {children}
        </TransitionWrapper>
      </body>
    </html>
  );
}
