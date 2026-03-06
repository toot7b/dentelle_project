# Les Fuseaux Asseventois

Site vitrine de l'association **Les Fuseaux Asseventois**, un club de dentelle aux fuseaux basé à Assevent (Nord, Hauts-de-France).

**[fuseaux-asseventois.fr](https://fuseaux-asseventois.fr)**

---

## Stack technique

| Technologie | Version | Usage |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | Framework React, App Router, SSR |
| [React](https://react.dev/) | 19 | UI components |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Typage statique |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Styles utilitaires |
| [GSAP](https://gsap.com/) | 3.14 | Animations scroll (ScrollTrigger), timelines |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Animations mount/unmount, hover, lightbox |
| [SplitType](https://github.com/lukePeavey/SplitType) | 0.3 | Animation lettre par lettre |
| [MapLibre GL](https://maplibre.org/) | 5 | Carte interactive (page contact) |
| [Resend](https://resend.com/) | 6 | Envoi d'emails (formulaire d'adhesion) |

## Installation

```bash
# Cloner le repo
git clone https://github.com/toot7b/dentelle_project.git
cd dentelle_project

# Installer les dependances
pnpm install

# Lancer le serveur de dev
pnpm dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
src/
  app/
    layout.tsx              # Layout global, metadata SEO, JSON-LD
    page.tsx                # Page d'accueil (toutes les sections)
    globals.css             # Theme Tailwind v4, fonts, animations CSS
    icon.svg                # Favicon (etoile doree SVG)
    robots.ts               # robots.txt auto-genere
    sitemap.ts              # sitemap.xml auto-genere
    adhesion/page.tsx       # Page adhesion
    contact/page.tsx        # Page contact avec carte
    mentions-legales/       # Mentions legales + RGPD
  components/
    Navbar.tsx              # Navigation fixe, desktop 3-col grid, mobile hamburger
    Hero.tsx                # Section hero : wallpaper floral, SplitType, 2 CTA
    PhotoWall.tsx           # Mur de 6 photos encadrees (absolu desktop, grid mobile)
    PhotoFrame.tsx          # Cadre SVG (3 variantes : baroque/classic/ornate)
    Footer.tsx              # Pied de page
    about/                  # Section "Qui sommes-nous" + photo encadree
    activities/             # Section activites : clothesline, medaillons, nuages
    adhesion/               # Formulaire et contenu adhesion
    contact/                # Section CTA + page contact avec carte MapLibre
    faq/                    # FAQ accordeon
    galerie/                # Galerie 12 photos + lightbox plein ecran
    transitions/            # Transitions de page (TransitionLink, TransitionWrapper)
public/
    photos/                 # Images WebP du site
    patterns/               # SVG decoratifs (flower.svg pour wallpaper)
    neulis/                 # Police Neulis (WOFF2 + TTF, 16 graisses)
```

## Sections de la page d'accueil

1. **Hero** -- Wallpaper floral 60% droite (desktop) / 65% bas (mobile), titre anime lettre par lettre avec SplitType, mur de 6 photos avec vis + fil + cadres SVG ornementaux
2. **Activites** -- 3 medaillons ovales suspendus a une clothesline (desktop) ou empiles avec clous (mobile), nuages SVG decoratifs
3. **Galerie** -- 12 photos "polaroid" sur fond vert, animation de chute au scroll, lightbox au clic avec blur
4. **A propos** -- Texte de presentation + grande photo encadree dans un cadre classic, tapisserie florale en arriere-plan
5. **FAQ** -- Accordeon avec questions frequentes
6. **Contact** -- CTA avec nuages decoratifs, liens vers adhesion et coordonnees

## Design

### Palette

| Couleur | Hex | Usage |
|---|---|---|
| Creme | `#FEF5EB` | Fond principal |
| Brun fonce | `#2C1A0E` | Texte principal |
| Brun moyen | `#5C3D26` | Texte secondaire |
| Or | `#C2AE4C` | Accents, cadres, ornements |
| Sable | `#E9BA85` | Decorations |
| Blush | `#F0DBD8` | Touches delicates |
| Vert | `#B2C5A8` | Fond galerie (wallpaper) |
| Brun muted | `#9A7558` | Elements discrets |

### Typographies

- **Neulis** (serif) -- Titres et accents. Fichiers locaux dans `/public/neulis/` (WOFF2 + TTF, 16 graisses).
- **Satoshi** (sans-serif) -- Corps de texte. Charge via [FontShare API](https://www.fontshare.com/fonts/satoshi).

### Ambiance

Artisanal, chaleureux, inspire de la dentelle aux fuseaux. Chaque element visuel (cadres, vis, fils, nuages, pissenlits) est dessine en SVG.

## Animations

Le site utilise un systeme d'animations en deux couches pour eviter les conflits :

### GSAP + ScrollTrigger

- **PhotoWall** : timeline sequencee (vis pop -> cadre tombe -> fil s'etire -> rebond elastique)
- **Galerie** : photos tombent avec rotation aleatoire au scroll
- **Sections** : fade-in + translateY declenches au scroll
- **Mobile** : drop-in rapide + parallax leger en rotation

### Framer Motion

- **Hover** : swing sur les cadres (spring, stiffness 200, damping 12)
- **Lightbox** : overlay fade + contenu scale 0.93->1 + translateY
- **Transitions de page** : fade entre les routes

### CSS

- **Nuages** : 5 animations de drift (`cloud-drift-a` a `cloud-drift-e`)

### Regles importantes

- Ne **jamais** animer `y` via ScrollTrigger sur les cadres photo (casse le layout du wallpaper)
- **Separer** intro (outer `data-frame`) et parallax (inner `data-parallax`) sur deux elements distincts pour eviter les conflits GSAP sur `rotation`
- `fromTo` avec `scrub` peut forcer une valeur initiale et creer un saut visuel -> preferer `gsap.to` depuis 0
- **Mobile** : hover desactive (`disableHover`), animations plus courtes, detection via `window.matchMedia("(max-width: 767px)").matches`

## SEO

- Metadata completes : titre, description, keywords, OpenGraph, Twitter Cards, canonical URL
- JSON-LD Schema.org : `Organization` avec adresse, region, `areaServed` (Assevent + Maubeuge), `sameAs` (Facebook)
- `robots.ts` et `sitemap.ts` auto-generes par Next.js App Router
- Alt descriptifs sur toutes les images (`"Dentelle aux fuseaux -- un arbre de fil"`)
- Metadata specifiques par sous-page (adhesion, contact, mentions legales)
- Geolocalisation : Assevent, Maubeuge, Hauts-de-France

## Responsive

Breakpoints cles : `md` = 768px, `lg` = 1024px.

| Element | Desktop | Mobile |
|---|---|---|
| Navbar | 3 colonnes grid | Hamburger + dropdown |
| Hero wallpaper | 60% droite | 65% bas |
| PhotoWall | Positionnement absolu | Grid 2 colonnes |
| Activites | Clothesline horizontale | Empile vertical + clous |
| Galerie | 3 colonnes | 1 colonne |
| Cadres hover | Swing actif | Desactive |
| Animations | Timelines completes | Plus rapides, simplifiees |

## Hebergement 100% europeen

Ce projet est heberge et opere avec une infrastructure **integralement europeenne**, sans aucune dependance aux cloud providers americains (AWS, Vercel, Cloudflare, etc.).

| Brique | Fournisseur | Pays |
|---|---|---|
| **VPS** | [Contabo](https://contabo.com/) | Allemagne |
| **Deploiement** | [Dokploy](https://dokploy.com/) | Self-hosted (open-source) |
| **CDN** | [Gcore](https://gcore.com/) | Luxembourg |
| **Emails transactionnels** | [Sweego](https://www.sweego.io/) | France |
| **Nom de domaine** | [Infomaniak](https://www.infomaniak.com/) | Suisse |
| **DNS** | [Infomaniak](https://www.infomaniak.com/) | Suisse |

**Pourquoi ?** Souverainete numerique, conformite RGPD native, pas de transfert de donnees hors UE, et soutien a l'ecosysteme tech europeen.

### Headers de cache (CDN-friendly)

Les headers de cache sont configures dans `next.config.ts` pour maximiser l'efficacite du CDN :

| Ressource | Cache-Control | Duree |
|---|---|---|
| Images (WebP, SVG, PNG...) | `public, max-age=31536000, immutable` | 1 an |
| Polices Neulis (WOFF2, TTF) | `public, max-age=31536000, immutable` | 1 an |
| Patterns SVG | `public, max-age=31536000, immutable` | 1 an |
| Build output (`/_next/static/`) | Gere automatiquement par Next.js | Long-term |

Les assets statiques sont marques `immutable` : le CDN les sert indefiniment sans revalider avec le serveur origin. Next.js gere deja le cache-busting via les hashes dans les noms de fichiers du build (`/_next/static/`).

## Variables d'environnement

```bash
# Sweego (envoi d'emails)
SWEEGO_API_KEY=sw_...
```

## Scripts

```bash
pnpm dev       # Serveur de developpement (http://localhost:3000)
pnpm build     # Build de production
pnpm start     # Serveur de production
pnpm lint      # ESLint
```

---

## Le Studio

Ce projet a ete concu et developpe par **Nualt Studio**, un studio de developpement web et applicatif fonde par Thomas Sarazin, base dans le nord de la France.

Nualt est ne d'une conviction simple : la tech europeenne n'a rien a envier a personne, et il est temps de le prouver dans les faits. Le studio a connu plusieurs vies -- d'abord sous le nom de BigXBang Studio, puis Les Amants Terribles, avant de trouver son identite definitive. Son logo, un nuage en pixel art sous la pluie, ancre visuellement l'identite dans le nord de la France -- la ou il pleut, la ou on code.

### Ce que fait Nualt

Nualt conçoit des sites, des applications et des outils sur-mesure, du premier pixel au dernier octet deploye en production. Le studio ne se contente pas de livrer du code : il accompagne ses clients sur toute la chaine, du developpement a l'hebergement, en passant par l'architecture systeme et le scaling.

L'hebergement est un axe central. Nualt deploie exclusivement sur des infrastructures europeennes (Scaleway, Hetzner, Contabo) et donne au client un acces direct a ses propres serveurs. Pas de boite noire, pas de dependance fournisseur, pas de mauvaise surprise. Le client possede son code, accede a son hebergement, et garde les cles de tout son ecosysteme technique.

Le studio valorise aussi activement l'open-source et l'auto-hebergement, tant en interne que pour ses clients. Chaque brique choisie l'est pour sa perennite, sa transparence et son independance vis-a-vis des grands acteurs du cloud.

### Principes fondamentaux

- **Le code appartient au client.** Pas de clause de retention, pas de lock-in. Le code source est livre, documente, et le client peut en faire ce qu'il veut.
- **Le client a son propre acces a l'hebergement.** Il peut se connecter a ses serveurs, consulter ses logs, gerer ses donnees. Le studio accompagne, mais ne controle pas.
- **Pas d'enfermement proprietaire.** Chaque decision technique est prise pour maximiser l'independance du client. Si le client veut changer de prestataire demain, il le peut sans friction.
- **Open-source privilegie.** Les solutions open-source sont systematiquement preferees aux alternatives proprietaires, sauf contre-indication technique majeure.
- **Posture de partenariat.** Nualt n'est pas un prestataire qui disparait apres la livraison. C'est un partenaire technique qui reste disponible, qui suit l'evolution du projet, et qui transmet les competences.

### L'ideologie -- Tech avec des valeurs europeennes

L'Europe a deja produit les fondations de la tech mondiale : Linux (Linus Torvalds, Finlande), Docker (Solomon Hykes, France), GitLab (Sytse Sijbrandij, Pays-Bas). Les talents sont la. Les outils sont la. La preuve que l'on peut construire de la tech de classe mondiale sans dependre de la Silicon Valley existe deja.

Nualt s'inscrit dans cette continuite. L'axe central du studio est de faire de la tech avec des valeurs europeennes -- souverainete des donnees, transparence, respect de la vie privee, conformite RGPD native. Pas comme argument marketing. Comme posture de fond qui se traduit dans chaque decision technique, chaque choix d'infrastructure, et chaque relation client.

Ce projet en est un exemple concret : **zero dependance US** sur toute la chaine (hebergement, CDN, emails, DNS, nom de domaine). Chaque brique est europeenne, chaque donnee reste en Europe, et chaque prestataire partage les memes valeurs de transparence et de souverainete.

Un petit easter egg trahit cette posture dans le footer du site : un Space Invaders en pixel art, clin d'oeil aux cloud providers americains qui envahissent le web europeen.

---

## Licence

Code source disponible sous licence MIT.

Les contenus (textes, photos) restent la propriete exclusive de l'association Les Fuseaux Asseventois.

---

Design & Developpement : **Thomas Sarazin** -- [BigxBang Studio](https://bigxbang.studio)
