# Les Fuseaux Asseventois

Showcase website for **Les Fuseaux Asseventois**, a bobbin lace club based in Assevent (Nord, Hauts-de-France, northern France).

**[fuseaux-asseventois.fr](https://fuseaux-asseventois.fr)**

---

## Tech Stack

| Technology | Version | Usage |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | React framework, App Router, SSR |
| [React](https://react.dev/) | 19 | UI components |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Static typing |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first CSS |
| [GSAP](https://gsap.com/) | 3.14 | Scroll animations (ScrollTrigger), timelines |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Mount/unmount animations, hover, lightbox |
| [SplitType](https://github.com/lukePeavey/SplitType) | 0.3 | Letter-by-letter text animation |
| [MapLibre GL](https://maplibre.org/) | 5 | Interactive map (contact page) |


## Getting Started

```bash
# Clone the repo
git clone https://github.com/toot7b/dentelle_project.git
cd dentelle_project

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The site is available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    layout.tsx              # Global layout, SEO metadata, JSON-LD
    page.tsx                # Homepage (all sections)
    globals.css             # Tailwind v4 theme, fonts, CSS animations
    icon.svg                # Favicon (golden star SVG)
    robots.ts               # Auto-generated robots.txt
    sitemap.ts              # Auto-generated sitemap.xml
    adhesion/page.tsx        # Membership page
    contact/page.tsx         # Contact page with map
    mentions-legales/        # Legal notice + GDPR
  components/
    Navbar.tsx              # Fixed navigation, desktop 3-col grid, mobile hamburger
    Hero.tsx                # Hero section: floral wallpaper, SplitType, 2 CTAs
    PhotoWall.tsx           # Wall of 6 framed photos (absolute desktop, grid mobile)
    PhotoFrame.tsx          # SVG frame (3 variants: baroque/classic/ornate)
    Footer.tsx              # Footer
    about/                  # "About us" section + framed photo
    activities/             # Activities section: clothesline, medallions, clouds
    adhesion/               # Membership form and content
    contact/                # CTA section + contact page with MapLibre map
    faq/                    # FAQ accordion
    galerie/                # Gallery of 12 photos + fullscreen lightbox
    transitions/            # Page transitions (TransitionLink, TransitionWrapper)
public/
    photos/                 # WebP site images
    patterns/               # Decorative SVGs (flower.svg for wallpaper)
    neulis/                 # Neulis typeface (WOFF2 + TTF, 16 weights)
```

## Homepage Sections

1. **Hero** -- Floral wallpaper 60% right (desktop) / 65% bottom (mobile), letter-by-letter animated title with SplitType, wall of 6 photos with screws + wire + ornamental SVG frames
2. **Activities** -- 3 oval medallions hanging from a clothesline (desktop) or stacked with nails (mobile), decorative SVG clouds
3. **Gallery** -- 12 "polaroid" photos on green background, scroll-triggered falling animation, click-to-open lightbox with blur
4. **About** -- Presentation text + large photo in a classic frame, floral wallpaper background
5. **FAQ** -- Accordion with frequently asked questions
6. **Contact** -- CTA with decorative clouds, links to membership and contact info

## Design

### Color Palette

| Color | Hex | Usage |
|---|---|---|
| Cream | `#FEF5EB` | Main background |
| Dark brown | `#2C1A0E` | Primary text |
| Medium brown | `#5C3D26` | Secondary text |
| Gold | `#C2AE4C` | Accents, frames, ornaments |
| Sand | `#E9BA85` | Decorations |
| Blush | `#F0DBD8` | Delicate touches |
| Green | `#B2C5A8` | Gallery background (wallpaper) |
| Muted brown | `#9A7558` | Subtle elements |

### Typography

- **Neulis** (serif) -- Headings and accents. Local files in `/public/neulis/` (WOFF2 + TTF, 16 weights).
- **Satoshi** (sans-serif) -- Body text. Loaded via [FontShare API](https://www.fontshare.com/fonts/satoshi).

### Mood

Artisanal, warm, inspired by bobbin lace. Every visual element (frames, screws, wires, clouds, dandelions) is hand-drawn in SVG.

## Animations

The site uses a two-layer animation system to avoid conflicts:

### GSAP + ScrollTrigger

- **PhotoWall**: sequenced timeline (screw pops -> frame drops -> wire stretches -> elastic bounce)
- **Gallery**: photos fall with random rotation on scroll
- **Sections**: fade-in + translateY triggered on scroll
- **Mobile**: quick drop-in + subtle rotation parallax

### Framer Motion

- **Hover**: swing on frames (spring, stiffness 200, damping 12)
- **Lightbox**: overlay fade + content scale 0.93->1 + translateY
- **Page transitions**: fade between routes

### CSS

- **Clouds**: 5 drift animations (`cloud-drift-a` through `cloud-drift-e`)

### Important Rules

- **Never** animate `y` via ScrollTrigger on photo frames (breaks wallpaper layout)
- **Separate** intro (outer `data-frame`) and parallax (inner `data-parallax`) into two distinct elements to avoid GSAP conflicts on `rotation`
- `fromTo` with `scrub` can force an initial value and create a visual jump -> prefer `gsap.to` from 0
- **Mobile**: hover disabled (`disableHover`), shorter animations, detection via `window.matchMedia("(max-width: 767px)").matches`

## SEO

- Full metadata: title, description, keywords, OpenGraph, Twitter Cards, canonical URL
- JSON-LD Schema.org: `Organization` with address, region, `areaServed` (Assevent + Maubeuge), `sameAs` (Facebook)
- `robots.ts` and `sitemap.ts` auto-generated by Next.js App Router
- Descriptive alt text on all images (`"Bobbin lace -- a tree of thread"`)
- Per-page metadata (membership, contact, legal notice)
- Geolocation: Assevent, Maubeuge, Hauts-de-France

## Responsive

Key breakpoints: `md` = 768px, `lg` = 1024px.

| Element | Desktop | Mobile |
|---|---|---|
| Navbar | 3-column grid | Hamburger + dropdown |
| Hero wallpaper | 60% right | 65% bottom |
| PhotoWall | Absolute positioning | 2-column grid |
| Activities | Horizontal clothesline | Vertical stack + nails |
| Gallery | 3 columns | 1 column |
| Frame hover | Swing active | Disabled |
| Animations | Full timelines | Faster, simplified |

## 100% European Hosting

This project is hosted and operated on an **entirely European infrastructure**, with zero dependency on American cloud providers (AWS, Vercel, Cloudflare, etc.).

| Layer | Provider | Country |
|---|---|---|
| **VPS** | [Contabo](https://contabo.com/) | Germany |
| **Deployment** | [Dokploy](https://dokploy.com/) | Self-hosted (open-source) |
| **CDN** | [Gcore](https://gcore.com/) | Luxembourg |
| **Transactional emails** | [Sweego](https://www.sweego.io/) | France |
| **Domain name** | [Infomaniak](https://www.infomaniak.com/) | Switzerland |
| **DNS** | [Infomaniak](https://www.infomaniak.com/) | Switzerland |

**Why?** Digital sovereignty, native GDPR compliance, no data transfer outside the EU, and support for the European tech ecosystem.

### Cache Headers (CDN-friendly)

Cache headers are configured in `next.config.ts` to maximize CDN efficiency:

| Resource | Cache-Control | Duration |
|---|---|---|
| Images (WebP, SVG, PNG...) | `public, max-age=31536000, immutable` | 1 year |
| Neulis fonts (WOFF2, TTF) | `public, max-age=31536000, immutable` | 1 year |
| SVG patterns | `public, max-age=31536000, immutable` | 1 year |
| Build output (`/_next/static/`) | Handled automatically by Next.js | Long-term |

Static assets are marked `immutable`: the CDN serves them indefinitely without revalidating with the origin server. Next.js already handles cache-busting via hashed filenames in the build output (`/_next/static/`).

## Environment Variables

```bash
# Sweego (email sending)
SWEEGO_API_KEY=sw_...
```

## Scripts

```bash
pnpm dev       # Development server (http://localhost:3000)
pnpm build     # Production build
pnpm start     # Production server
pnpm lint      # ESLint
```

---

## The Studio

This project was designed and developed by **Nualt Studio**, a web and application development studio founded by Thomas Sarazin, based in northern France.

Nualt (a portmanteau of "nuage" -- French for "cloud" -- and "alt") was born from a simple conviction: European tech has nothing to envy from anyone, and it's time to prove it in practice. The studio has gone through several lives -- first as BigXBang Studio, then Les Amants Terribles, before finding its definitive identity. Its logo, a pixel art cloud in the rain, visually anchors the brand in northern France -- where it rains, and where we code.

### What Nualt Does

Nualt builds websites, applications, and custom tools, from the first pixel to the last byte deployed in production. The studio doesn't just deliver code: it supports clients across the entire chain, from development to hosting, including system architecture and scaling.

Hosting is a central pillar. Nualt deploys exclusively on European infrastructure (Scaleway, Hetzner, Contabo) and gives clients direct access to their own servers. No black box, no vendor lock-in, no surprises. The client owns their code, accesses their hosting, and keeps the keys to their entire technical ecosystem.

The studio also actively promotes open-source and self-hosting, both internally and for clients. Every building block is chosen for its longevity, transparency, and independence from major cloud players.

### Core Principles

- **The code belongs to the client.** No retention clause, no lock-in. The source code is delivered, documented, and the client can do whatever they want with it.
- **The client has direct access to their hosting.** They can connect to their servers, check their logs, manage their data. The studio guides, but does not control.
- **No vendor lock-in.** Every technical decision is made to maximize the client's independence. If the client wants to switch providers tomorrow, they can do so without friction.
- **Open-source preferred.** Open-source solutions are systematically preferred over proprietary alternatives, unless there is a major technical counter-indication.
- **Partnership mindset.** Nualt is not a contractor that disappears after delivery. It's a technical partner that remains available, follows the project's evolution, and shares knowledge.

### The Ideology -- Tech with European Values

Europe has already produced the foundations of global tech: Linux (Linus Torvalds, Finland), Docker (Solomon Hykes, France), GitLab (Sytse Sijbrandij, Netherlands). The talent is there. The tools are there. The proof that world-class tech can be built without depending on Silicon Valley already exists.

Nualt carries this legacy forward. The studio's central axis is building tech with European values -- data sovereignty, transparency, privacy, native GDPR compliance. Not as a marketing argument. As a core stance that translates into every technical decision, every infrastructure choice, and every client relationship.

This project is a concrete example: **zero US dependency** across the entire chain (hosting, CDN, emails, DNS, domain name). Every building block is European, every piece of data stays in Europe, and every provider shares the same values of transparency and sovereignty.

A small easter egg betrays this stance in the site's footer: a pixel art Space Invaders, a nod to the American cloud providers invading the European web.

---

## License

Source code available under the MIT license.

Content (text, photos) remains the exclusive property of the Les Fuseaux Asseventois association.

---

Design & Development: **Thomas Sarazin** -- [Nualt Studio](https://nualt.studio) (formerly BigXBang Studio)
