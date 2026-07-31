# AM Executive Travel

Production website for AM Executive Travel & Transfers Ltd. The repository automatically deploys to GitHub Pages whenever the `main` branch is updated.

## Publish with GitHub Pages

1. Create a new empty repository on GitHub.
2. Upload every file and folder from this package, including the hidden `.github` folder.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Open the **Actions** tab. The “Deploy website to GitHub Pages” workflow will build and publish the site automatically.

The live address appears in the completed workflow and in **Settings → Pages**. No API keys are required.

## Use a custom domain

In **Settings → Pages**, add `www.amexectravel.co.uk` under **Custom domain**. GitHub will show the DNS records that must be added with the domain provider.

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm test
```

## Enable Google Calendar booking

Open `app/site-config.ts` and paste the public Google Calendar appointment-schedule URL into `googleBookingUrl`. The booking section automatically changes from “coming soon” to a live availability button.

## Main files

- `app/page.tsx` — page structure, copy and WhatsApp enquiry behaviour
- `app/globals.css` — brand styling, responsiveness and motion
- `app/site-config.ts` — Google Calendar booking URL
- `public/brand/` — approved logo artwork
- `public/images/` — current photography, ready for the new image set
- `.github/workflows/deploy-pages.yml` — automatic GitHub Pages deployment

The WhatsApp form opens a prepared message to `07448 369112`; visitor details are not stored by the website.
