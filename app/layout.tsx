import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.amexectravel.co.uk"),
  title: {
    default: "Executive Chauffeur Service Sheffield | AM Executive Travel",
    template: "%s | AM Executive Travel",
  },
  description: "Premium executive chauffeur service in Sheffield and nationwide for corporate clients, football teams, airport transfers, weddings and private travel.",
  applicationName: "AM Executive Travel",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Executive Chauffeur Service Sheffield | AM Executive Travel",
    description: "Premium chauffeur-driven travel for executives, football teams and private clients in Sheffield and nationwide.",
    url: "/",
    siteName: "AM Executive Travel",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "AM Executive Travel Sheffield",
    description: "Executive chauffeur travel in Sheffield and nationwide.",
  },
};

export const viewport: Viewport = { themeColor: "#071a2f", width: "device-width", initialScale: 1 };

const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.amexectravel.co.uk/#business",
      name: "AM Executive Travel & Transfers Ltd",
      alternateName: "AM Executive Travel",
      description: "Executive chauffeur travel for corporate clients, football teams, airport transfers, weddings and private clients in Sheffield and nationwide.",
      url: "https://www.amexectravel.co.uk/",
      telephone: "+447448369112",
      email: "bookings@amexecutivetravel.vip",
      logo: "https://www.amexectravel.co.uk/brand/logo-horizontal.png",
      image: "https://www.amexectravel.co.uk/images/executive-vehicle.png",
      priceRange: "£££",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sheffield",
        addressRegion: "South Yorkshire",
        addressCountry: "GB",
      },
      areaServed: [
        { "@type": "City", name: "Sheffield" },
        { "@type": "AdministrativeArea", name: "South Yorkshire" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      sameAs: [
        "https://www.facebook.com/share/1BJfzGZs9e/",
        "https://www.instagram.com/amexecutivetravelltd",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.amexectravel.co.uk/#website",
      url: "https://www.amexectravel.co.uk/",
      name: "AM Executive Travel",
      publisher: { "@id": "https://www.amexectravel.co.uk/#business" },
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema).replace(/</g, "\\u003c") }} /></head>
      <body>{children}</body>
    </html>
  );
}
