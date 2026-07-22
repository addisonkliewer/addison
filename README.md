# Addison Kliewer — Portfolio Site

A static, framework-free portfolio site built to match the "Senior SaaS Content Design Portfolio" Figma design (Stone & Sage design system). No build step required — just HTML, CSS, and a small bit of vanilla JS.

## What's here

```
index.html                          Home
about.html                          About
case-studies.html                   Case studies listing
artifacts.html                      Artifact library
resume.html                         Resume / contact
case-studies/scooproute.html        Featured case study (full detail)
case-studies/ux-writing.html        UX writing / content design case study
case-studies/academy.html           Academy training case study
case-studies/ai-content-engineer.html  AI-assisted documentation case study
css/styles.css                      Design system (colors, type, spacing) as CSS variables
js/main.js                          Dark mode toggle + mobile nav toggle
```

## Before you publish — a short checklist

1. **LinkedIn URL** — every footer and the About page link to `#`. Find-and-replace `href="#" target="_blank"` with your real LinkedIn URL across all HTML files.
3. **Images** — the Figma design includes illustrations (the ScoopRoute delivery truck, mountain motifs, a headshot/portrait on the About page) that aren't in this build; the site currently uses simple emoji/icon placeholders instead. Export the real assets from Figma (or your own photo) and swap them in — search each HTML file for `🧑‍💻`, `📖`, `🚚`-style placeholders to find the spots.
4. **Case study copy** — `scooproute.html` was built from a full read-through of your Figma file and should be accurate. `ux-writing.html`, `academy.html`, and `ai-content-engineer.html` were built from partial visibility into those pages (some sections were cut off on screen) — read through those three against your Figma file and tighten any wording that doesn't match your original intent.
5. **Favicon** — add a `favicon.ico` or `favicon.svg` and link it in each page's `<head>` if you want a browser-tab icon.

## Running it locally

No install needed. From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Deploying it for real

The easiest paths, roughly in order of simplicity:

### Netlify (drag-and-drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag this whole folder onto the page.
3. You get a live URL immediately. Add a custom domain later in Site settings → Domain management if you have one.

### GitHub Pages
1. Create a new GitHub repo and push this folder's contents to it.
2. In the repo, go to Settings → Pages, set the source to the `main` branch (root), and save.
3. Your site publishes at `https://<username>.github.io/<repo-name>/`.

### Vercel
1. Push this folder to a GitHub repo (same as above).
2. Import the repo at [vercel.com/new](https://vercel.com/new). No build command needed — set the framework preset to "Other."
3. Deploy.

All three are free for a personal portfolio and support custom domains via DNS records you add wherever your domain is registered.
