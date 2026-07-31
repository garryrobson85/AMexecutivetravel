import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.amexectravel.co.uk"),
  title: "AM Executive Travel | Chauffeur Travel Sheffield & Nationwide",
  description: "Calm, discreet and dependable chauffeur-driven travel for teams, executives and private clients in Sheffield and nationwide.",
  openGraph: {
    title: "AM Executive Travel",
    description: "Executive chauffeur travel in Sheffield and nationwide.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport: Viewport = { themeColor: "#071a2f", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
