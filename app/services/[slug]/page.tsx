import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import logo from "../../../public/brand/logo-horizontal.png";
import heroImage from "../../../public/images/executive-vehicle.png";

const servicePages = {
  "team-travel": {
    title: "Football Team Travel Sheffield",
    description: "Discreet, coordinated chauffeur and team travel in Sheffield and nationwide for football clubs, management teams and travelling parties.",
    eyebrow: "Football clubs & teams",
    heading: "Team travel,<br/><em>precisely coordinated.</em>",
    intro: "Professional transport for football clubs, coaching staff, executives and travelling parties, planned around the timings and discretion elite sport demands.",
    paragraphs: [
      "From fixtures and training movements to hotels, airports and multi-vehicle itineraries, AM Executive Travel provides a calm, dependable point of coordination.",
      "Every booking is tailored to the number of passengers, required arrival times and any privacy or presentation requirements. Sheffield-based and available for journeys throughout the UK.",
    ],
    features: ["Fixture and training travel", "Hotel and airport movements", "Club executives and invited guests", "Multi-stop and multi-vehicle planning"],
  },
  "corporate-travel": {
    title: "Corporate Chauffeur Sheffield",
    description: "Executive and corporate chauffeur travel in Sheffield and nationwide for meetings, client journeys, events and multi-stop itineraries.",
    eyebrow: "Corporate chauffeur travel",
    heading: "Business travel,<br/><em>without distraction.</em>",
    intro: "Punctual, polished executive transport for people whose time, privacy and professional presentation matter.",
    paragraphs: [
      "We support executives, consultants, corporate guests and organisations travelling to meetings, events, hotels and airports across Sheffield and the UK.",
      "Single journeys and more complex multi-stop schedules are planned individually, with clear communication and an unobtrusive standard of service from collection to arrival.",
    ],
    features: ["Executive and client travel", "Meetings and corporate events", "Roadshows and multi-stop itineraries", "Airport and hotel connections"],
  },
  "airport-transfers": {
    title: "Airport Transfers Sheffield",
    description: "Executive airport transfers from Sheffield to Manchester, East Midlands, Leeds Bradford and every UK airport, available early or late.",
    eyebrow: "Sheffield airport transfers",
    heading: "The airport journey,<br/><em>made effortless.</em>",
    intro: "Dependable, door-to-door airport transfers from Sheffield and South Yorkshire to every UK airport.",
    paragraphs: [
      "Whether you are travelling through Manchester Airport, East Midlands, Leeds Bradford, Birmingham, Heathrow or another UK terminal, your journey is planned around the flight and the passengers involved.",
      "Early departures, late arrivals, luggage requirements and long-distance connections are handled with the same calm, discreet attention to detail.",
    ],
    features: ["All UK airports", "Door-to-door collection", "Early and late journeys", "Business and private travellers"],
  },
  "weddings-special-occasions": {
    title: "Wedding Chauffeur Sheffield",
    description: "Refined wedding chauffeur and special occasion travel in Sheffield, including bridal parties, guests, hotels and venue transfers.",
    eyebrow: "Weddings & occasions",
    heading: "Important moments,<br/><em>beautifully handled.</em>",
    intro: "Refined chauffeur travel for weddings, celebrations and personal events across Sheffield and beyond.",
    paragraphs: [
      "We coordinate bridal party journeys, guest transfers, hotel movements and venue travel with close attention to presentation and timing.",
      "Each occasion is quoted individually so the route, schedule, passenger requirements and finer details can be planned around the event rather than fitted into a standard package.",
    ],
    features: ["Bridal party travel", "Guest and hotel transfers", "Venue movements", "Private special occasions"],
  },
} as const;

type ServiceSlug = keyof typeof servicePages;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages[slug as ServiceSlug];
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${slug}/` },
    openGraph: { title: `${service.title} | AM Executive Travel`, description: service.description, url: `/services/${slug}/`, type: "website" },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicePages[slug as ServiceSlug];
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `https://www.amexectravel.co.uk/services/${slug}/`,
    areaServed: ["Sheffield", "South Yorkshire", "United Kingdom"],
    provider: { "@id": "https://www.amexectravel.co.uk/#business" },
  };

  return (
    <main className="service-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }} />
      <header className="detail-header">
        <Link className="brand" href="/" aria-label="AM Executive Travel home"><Image src={logo} alt="AM Executive Travel" priority /></Link>
        <Link className="detail-back" href="/#services">All services</Link>
        <Link className="nav-cta" href="/#quote">Request a quote</Link>
      </header>

      <section className="detail-hero">
        <Image src={heroImage} alt="Executive chauffeur vehicle" fill priority sizes="100vw" />
        <div className="detail-shade" />
        <div className="detail-hero-copy">
          <p className="eyebrow">{service.eyebrow}</p>
          <h1 dangerouslySetInnerHTML={{ __html: service.heading }} />
          <p>{service.intro}</p>
          <Link className="button button-gold" href="/#quote">Request a tailored quote</Link>
        </div>
      </section>

      <section className="detail-content section-shell">
        <div>
          <p className="eyebrow">AM Executive Travel</p>
          <h2>Professional service.<br /><em>Personal attention.</em></h2>
        </div>
        <div className="detail-prose">
          {service.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </div>
      </section>

      <section className="detail-cta">
        <p className="eyebrow">Sheffield & nationwide</p>
        <h2>Let’s plan<br /><em>your journey.</em></h2>
        <p>Every quote is prepared around your route, timings, party and requirements.</p>
        <div><Link className="button button-gold" href="/#quote">Start your enquiry</Link><a href="tel:+447448369112">Call 07448 369112</a></div>
      </section>

      <footer className="detail-footer"><span>© 2026 AM Executive Travel &amp; Transfers Ltd</span><Link href="/">Return home</Link></footer>
    </main>
  );
}
