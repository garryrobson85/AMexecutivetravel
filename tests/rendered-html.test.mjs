import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("static export contains the complete AM Executive Travel website", async () => {
  const [html, airportPage, sitemap, robots] = await Promise.all([
    readFile(new URL("../out/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/services/airport-transfers/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../out/robots.txt", import.meta.url), "utf8"),
  ]);
  assert.match(html, /AM Executive Travel/);
  assert.match(html, /Travel,/);
  assert.match(html, /Team travel/);
  assert.match(html, /Corporate travel/);
  assert.match(html, /Airport transfers/);
  assert.match(html, /Online booking/);
  assert.match(html, /Send by email/);
  assert.match(html, /Continue in WhatsApp/);
  assert.match(html, /Let’s Chat!/);
  assert.match(html, /Write a message below, then choose WhatsApp or email/);
  assert.match(html, /Genuine client reviews will appear here once services are live/);
  assert.match(html, /07448 369112/);
  assert.match(html, /bookings@amexecutivetravel\.vip/);
  assert.match(html, /Company No\. 16773040/);
  assert.match(html, /application\/ld\+json/);
  assert.match(airportPage, /Airport Transfers Sheffield/);
  assert.match(airportPage, /Manchester Airport/);
  assert.match(sitemap, /services\/corporate-travel/);
  assert.match(robots, /Sitemap: https:\/\/www\.amexectravel\.co\.uk\/sitemap\.xml/);
});
