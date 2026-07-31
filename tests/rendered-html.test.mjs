import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("static export contains the complete AM Executive Travel website", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /AM Executive Travel/);
  assert.match(html, /Travel,/);
  assert.match(html, /Team travel/);
  assert.match(html, /Corporate travel/);
  assert.match(html, /Airport transfers/);
  assert.match(html, /Online booking/);
  assert.match(html, /07448 369112/);
  assert.match(html, /bookings@amexecutivetravel\.vip/);
  assert.match(html, /Company No\. 16773040/);
});
