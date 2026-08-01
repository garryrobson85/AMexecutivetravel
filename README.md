# AM Executive Travel

Production website for AM Executive Travel & Transfers Ltd.

## Publish from the main branch

The finished static website is included in `/docs`, so no GitHub Actions workflow is required.

1. Use the public GitHub repository named `AMexecutivetravel`.
2. Upload every file and folder from this package to the `main` branch.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch **main**, folder **/docs**, then click **Save**.

GitHub will publish the site at `https://garryrobson85.github.io/AMexecutivetravel/`.

## Custom domain

In **Settings → Pages**, enter `www.amexectravel.co.uk` under **Custom domain**, then follow GitHub's DNS instructions.

## Run or edit locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

## Enable Google Calendar booking

Paste the public Google Calendar appointment-schedule URL into `googleBookingUrl` in `app/site-config.ts`, rebuild the site, and replace the `/docs` folder with the new static output.

## Main files

- `docs/` — finished website served by GitHub Pages
- `app/page.tsx` — page structure, copy and WhatsApp enquiry behaviour
- `app/globals.css` — brand styling, responsiveness and motion
- `app/site-config.ts` — Google Calendar booking URL
- `public/brand/` — approved logo artwork
- `public/images/` — current photography

The WhatsApp form opens a prepared message to `07448 369112`; visitor details are not stored by the website.
