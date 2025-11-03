import type { Metadata } from "next";
import { Montserrat, Open_Sans, Fira_Code } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Générateur de Mémoires Techniques",
  description: "Application de génération automatique de mémoires techniques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${openSans.variable} ${firaCode.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
