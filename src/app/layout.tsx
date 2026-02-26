import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Club de Dentelle",
  description: "Club de dentelle — Rejoignez notre communauté de passionnés",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
