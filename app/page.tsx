"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "./site-config";
import logo from "../public/brand/logo-horizontal.png";
import monogram from "../public/brand/monogram.png";
import heroImage from "../public/images/executive-vehicle.png";
import serviceImage from "../public/images/chauffeur-service.jpg";

const services = [
  {
    slug: "team-travel",
    title: "Team travel",
    copy: "Discreet, coordinated transport for football clubs, management teams and travelling parties — with timing, privacy and presentation handled precisely.",
    detail: "Fixtures · Training · Hotels · Multi-vehicle planning",
  },
  {
    slug: "corporate-travel",
    title: "Corporate travel",
    copy: "Polished chauffeur travel for executives, consultants, clients and corporate guests, from a single meeting to a full multi-stop itinerary.",
    detail: "Meetings · Events · Roadshows · Client travel",
  },
  {
    slug: "airport-transfers",
    title: "Airport transfers",
    copy: "Calm, door-to-door transfers to every UK airport, planned around your flight and delivered with the same care at any hour.",
    detail: "All UK airports · Early & late · Long-distance",
  },
  {
    slug: "weddings-special-occasions",
    title: "Occasions",
    copy: "Refined travel for weddings, bridal parties, guest transfers, hotel movements and the moments where every detail deserves attention.",
    detail: "Weddings · Guest transfers · Special events",
  },
];

const steps = [
  ["Tell us the journey", "Share your date, route, party size and any timings that matter."],
  ["Receive a tailored quote", "Every journey is priced individually around the route, duration and requirements."],
  ["Travel with confidence", "Your chauffeur arrives prepared, presented and focused on a seamless experience."],
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M27 4.9A15.3 15.3 0 0 0 2.9 23.3L1 30.4l7.3-1.9A15.3 15.3 0 0 0 27 4.9Zm-11 23a12.6 12.6 0 0 1-6.4-1.8l-.5-.3-4.3 1.1 1.2-4.2-.3-.5a12.7 12.7 0 1 1 10.3 5.7Zm7-9.5c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2-.2.4-1 1.2-1.2 1.5-.2.2-.4.3-.8.1-2.2-1.1-3.6-1.9-5.1-4.4-.4-.7.4-.7 1.1-2.1.1-.2 0-.5-.1-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4 0 2 1.5 3.9 1.7 4.2.2.3 2.9 4.5 7.1 6.3 2.6 1.1 3.6 1.2 4.9 1 .8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.2-.4-.6-.5-1.5-.9Z" /></svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function closeChat(event: KeyboardEvent) {
      if (event.key === "Escape") setChatOpen(false);
    }
    document.addEventListener("keydown", closeChat);
    return () => document.removeEventListener("keydown", closeChat);
  }, []);

  function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const deliveryMethod = submitter?.value ?? "whatsapp";
    const lines = [
      "Hello AM Executive Travel, I’d like to request a quote.",
      "",
      `Name: ${data.get("name")}`,
      `Organisation / team: ${data.get("organisation") || "Not specified"}`,
      `Service: ${data.get("service")}`,
      `Date: ${data.get("date")}`,
      `Pickup: ${data.get("pickup")}`,
      `Destination: ${data.get("destination")}`,
      `Passengers: ${data.get("passengers") || "Not specified"}`,
      `Further details: ${data.get("details") || "None"}`,
    ];
    const message = lines.join("\n");

    if (deliveryMethod === "email") {
      const subject = `Journey quote request — ${data.get("name")}`;
      window.location.href = `mailto:bookings@amexecutivetravel.vip?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      return;
    }

    window.open(`https://wa.me/447448369112?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  function sendChat(method: "whatsapp" | "email") {
    const message = chatMessage.trim();
    if (!message) return;
    const preparedMessage = `Hello AM Executive Travel, I have a website enquiry.\n\n${message}`;
    if (method === "email") {
      window.location.href = `mailto:bookings@amexecutivetravel.vip?subject=${encodeURIComponent("Website travel enquiry")}&body=${encodeURIComponent(preparedMessage)}`;
      return;
    }
    window.open(`https://wa.me/447448369112?text=${encodeURIComponent(preparedMessage)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AM Executive Travel home">
          <Image src={logo} alt="AM Executive Travel" priority />
        </a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
          <span className="sr-only">Toggle navigation</span>
        </button>
        <nav id="main-nav" className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a className="nav-cta" href="#quote" onClick={() => setMenuOpen(false)}>Request a quote</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true"><Image src={heroImage} alt="" fill priority sizes="100vw" /></div>
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Executive chauffeur travel <span /> Sheffield &amp; nationwide</p>
          <h1>Travel,<br /><em>elevated.</em></h1>
          <p className="hero-copy">Calm, discreet and dependable chauffeur-driven travel for teams, executives and private clients who expect every detail to be handled.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#quote">Plan your journey <ArrowIcon /></a>
            <a className="text-link" href="#services">Explore our services <span>↓</span></a>
          </div>
        </div>
        <div className="launch-note"><span>Bookings now open</span><strong>Launching 15.08.26</strong></div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </section>

      <section className="trust-bar" aria-label="Service assurances">
        <p>Fully licensed &amp; insured</p><i />
        <p>Professional chauffeurs</p><i />
        <p>Sheffield &amp; nationwide</p><i />
        <p>Available by arrangement</p>
      </section>

      <section className="intro section-shell" data-reveal>
        <div><p className="eyebrow">The AM standard</p><h2>More than a journey.<br /><em>A considered experience.</em></h2></div>
        <div className="intro-copy">
          <p>From the first enquiry to the final arrival, we bring discretion, precision and an unwavering attention to detail.</p>
          <p>For business, sport or an important personal occasion, your travel should feel effortless. That is the standard we set.</p>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-shell">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow">Our services</p><h2>Every reason<br /><em>to travel well.</em></h2></div>
            <p>Tailored around your timings, your party and your priorities — never treated as a standard booking.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.slug} data-reveal>
                <span className="service-motif" aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <small>{service.detail}</small>
                <Link href={`/services/${service.slug}/`} aria-label={`Learn more about ${service.title}`}>View service <ArrowIcon /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="feature" id="about">
        <div className="feature-image" data-reveal><Image src={serviceImage} alt="Premium chauffeur-driven travel" fill sizes="(max-width: 1000px) 100vw, 50vw" /></div>
        <div className="feature-copy" data-reveal>
          <p className="eyebrow">Built around trust</p>
          <h2>Quietly professional.<br /><em>Consistently precise.</em></h2>
          <p>AM Executive Travel was created with a simple philosophy: to offer calm, discreet and dependable chauffeur-driven travel for people who value quality and peace of mind.</p>
          <p>Rooted in professional driving, safety, presentation and attention to detail, every journey is approached with care. Clients can expect a service that is polished, punctual and unintrusive.</p>
          <div className="signature"><Image src={monogram} alt="" /><span>Trust · Reliability · Respect</span></div>
        </div>
      </section>

      <section className="audience section-shell">
        <p className="eyebrow" data-reveal>Designed for people in motion</p>
        <div className="audience-line" data-reveal><span className="audience-mark" aria-hidden="true" /><h3>Football clubs &amp; teams</h3><p>Coordinated movement, complete discretion.</p></div>
        <div className="audience-line" data-reveal><span className="audience-mark" aria-hidden="true" /><h3>Executives &amp; organisations</h3><p>Time-conscious travel without compromise.</p></div>
        <div className="audience-line" data-reveal><span className="audience-mark" aria-hidden="true" /><h3>Private clients</h3><p>Important journeys, thoughtfully handled.</p></div>
      </section>

      <section className="local-coverage">
        <div className="section-shell local-grid">
          <div data-reveal>
            <p className="eyebrow">Local knowledge, national reach</p>
            <h2>Executive travel across<br /><em>Sheffield and beyond.</em></h2>
          </div>
          <div className="local-copy" data-reveal>
            <p>Based in Sheffield, AM Executive Travel provides professional chauffeur services across the city, South Yorkshire and nationwide.</p>
            <p>We arrange collections throughout Sheffield—including the city centre, Dore, Ecclesall, Fulwood, Ranmoor and surrounding areas—with onward travel to business destinations, hotels, venues and every major UK airport.</p>
            <div className="route-list" aria-label="Popular airport routes">
              <span>Manchester Airport</span><span>East Midlands Airport</span><span>Leeds Bradford Airport</span><span>Birmingham &amp; London</span>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials section-shell" id="testimonials">
        <div className="testimonial-heading" data-reveal>
          <p className="eyebrow">Client feedback</p>
          <h2>A reputation built<br /><em>journey by journey.</em></h2>
        </div>
        <figure className="testimonial-placeholder" data-reveal>
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>Genuine client reviews will appear here once services are live.</blockquote>
          <figcaption><strong>Launching 15 August 2026</strong><span>Bookings now open</span></figcaption>
        </figure>
      </section>

      <section className="process">
        <div className="section-shell">
          <div className="process-heading" data-reveal><p className="eyebrow">Simple by design</p><h2>From enquiry<br /><em>to arrival.</em></h2></div>
          <div className="steps">
            {steps.map(([title, copy]) => <article key={title} data-reveal><span className="step-mark" aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="online-booking section-shell" aria-labelledby="online-booking-title">
        <div className="booking-mark" data-reveal aria-hidden="true"><span>AM</span></div>
        <div className="booking-copy" data-reveal>
          <p className="eyebrow">Online booking</p>
          <h2 id="online-booking-title">Choose a time.<br /><em>We’ll handle the rest.</em></h2>
          <p>A direct Google Calendar booking service is being prepared. Once live, clients will be able to choose an available consultation or journey-planning time in just a few clicks.</p>
          {siteConfig.googleBookingUrl ? (
            <a className="button button-dark" href={siteConfig.googleBookingUrl} target="_blank" rel="noreferrer">View availability <ArrowIcon /></a>
          ) : (
            <a className="button button-outline" href="#quote">Online booking coming soon <ArrowIcon /></a>
          )}
        </div>
      </section>

      <section className="quote" id="quote">
        <div className="quote-intro" data-reveal>
          <p className="eyebrow">Request a quote</p>
          <h2>Your journey,<br /><em>carefully planned.</em></h2>
          <p>Tell us the essentials and WhatsApp will open with your enquiry ready to send. No account or website sign-in is required.</p>
          <div className="direct-contact" id="contact">
            <a href="tel:+447448369112"><small>Call</small><strong>07448 369112</strong></a>
            <a href="mailto:bookings@amexecutivetravel.vip"><small>Email</small><strong>bookings@amexecutivetravel.vip</strong></a>
          </div>
        </div>
        <form className="quote-form" onSubmit={sendEnquiry} data-reveal>
          <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" autoComplete="name" required /></div>
          <div className="field"><label htmlFor="organisation">Organisation or team</label><input id="organisation" name="organisation" autoComplete="organization" /></div>
          <div className="field field-wide"><label htmlFor="service">Service *</label><select id="service" name="service" defaultValue="" required><option value="" disabled>Select a service</option>{services.map((s) => <option key={s.title}>{s.title}</option>)}</select></div>
          <div className="field"><label htmlFor="date">Journey date *</label><input id="date" name="date" type="date" required /></div>
          <div className="field"><label htmlFor="passengers">Passengers</label><input id="passengers" name="passengers" type="number" min="1" inputMode="numeric" /></div>
          <div className="field"><label htmlFor="pickup">Pickup *</label><input id="pickup" name="pickup" autoComplete="street-address" required /></div>
          <div className="field"><label htmlFor="destination">Destination *</label><input id="destination" name="destination" required /></div>
          <div className="field field-wide"><label htmlFor="details">Further details</label><textarea id="details" name="details" rows={3} placeholder="Timings, return journey, luggage or anything else we should know" /></div>
          <div className="form-actions field-wide">
            <button className="button button-gold button-whatsapp" type="submit" name="delivery" value="whatsapp"><WhatsAppIcon /> Continue in WhatsApp <ArrowIcon /></button>
            <button className="button button-outline" type="submit" name="delivery" value="email">Send by email <ArrowIcon /></button>
          </div>
          <p className="form-note field-wide">Choose how you would like to send your enquiry. Your details are not stored by this website.</p>
        </form>
      </section>

      <footer>
        <div className="footer-main">
          <Image src={logo} alt="AM Executive Travel" />
          <p>Executive chauffeur travel in Sheffield and nationwide.</p>
          <div className="socials"><a href="https://www.facebook.com/share/1BJfzGZs9e/" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.instagram.com/amexecutivetravelltd" target="_blank" rel="noreferrer">Instagram</a></div>
        </div>
        <div className="footer-details">
          <div><small>Contact</small><a href="tel:+447448369112">07448 369112</a><a href="mailto:bookings@amexecutivetravel.vip">bookings@amexecutivetravel.vip</a></div>
          <div><small>Company</small><p>AM Executive Travel &amp; Transfers Ltd</p><p>Company No. 16773040</p><p>VAT No. GB 519 7095 63</p></div>
          <div><small>Location</small><p>Sheffield, United Kingdom</p><p>Serving clients nationwide</p></div>
        </div>
        <div className="footer-bottom"><span>© 2026 AM Executive Travel &amp; Transfers Ltd</span><span>Fully Licensed &amp; Insured</span></div>
      </footer>

      <aside className={`chat-widget ${chatOpen ? "chat-is-open" : ""}`} aria-label="Chat with AM Executive Travel">
        <section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title" aria-hidden={!chatOpen}>
          <header>
            <div><strong id="chat-title">AM Executive Travel</strong><span><i /> We’ll reply as soon as we can</span></div>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">×</button>
          </header>
          <div className="chat-welcome"><p>Welcome</p><strong>How can we help with your journey?</strong><span>Write a message below, then choose WhatsApp or email.</span></div>
          <div className="chat-compose">
            <label className="sr-only" htmlFor="chat-message">Your message</label>
            <textarea id="chat-message" value={chatMessage} onChange={(event) => setChatMessage(event.target.value)} rows={3} placeholder="Write your message…" />
            <div>
              <button type="button" disabled={!chatMessage.trim()} onClick={() => sendChat("whatsapp")}>WhatsApp</button>
              <button type="button" disabled={!chatMessage.trim()} onClick={() => sendChat("email")}>Email</button>
            </div>
          </div>
        </section>
        <button className="chat-launcher" type="button" onClick={() => setChatOpen(!chatOpen)} aria-expanded={chatOpen}>
          <span aria-hidden="true">●</span>{chatOpen ? "Close chat" : "Let’s Chat!"}
        </button>
      </aside>

      <a className="mobile-whatsapp" href="https://wa.me/447448369112" target="_blank" rel="noreferrer" aria-label="Chat with AM Executive Travel on WhatsApp"><WhatsAppIcon /><span>WhatsApp</span></a>
    </main>
  );
}
