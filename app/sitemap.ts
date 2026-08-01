import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://www.amexectravel.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/`, lastModified: new Date("2026-08-01"), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/services/team-travel/`, lastModified: new Date("2026-08-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/corporate-travel/`, lastModified: new Date("2026-08-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/airport-transfers/`, lastModified: new Date("2026-08-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/weddings-special-occasions/`, lastModified: new Date("2026-08-01"), changeFrequency: "monthly", priority: 0.7 },
  ];
}
