# Web stranica – servis dizni i Common Rail injektora

Moderna, brza i SEO-optimizirana web stranica za specijalizirani servis dizni, Common Rail
injektora i diesel sustava ubrizgavanja. Izrađena u **Angularu 21** (standalone komponente,
signals, zoneless) sa **statičnim prerenderiranjem** svih stranica.

## Pokretanje

Potreban je **Node.js 20.19+ ili 22.12+**.

```bash
npm install
npm start            # razvojni server → http://localhost:4200
npm run build        # produkcijski build → dist/diesel-servis/browser
npm run serve:dist   # lokalni pregled produkcijskog builda → http://localhost:4300
```

`npm run build` prvo automatski generira `sitemap.xml` i `robots.txt`, a zatim
prerenderira sve stranice u statični HTML.

## Objava (deploy)

Sadržaj mape `dist/diesel-servis/browser` je potpuno statičan i može se postaviti na bilo
koji hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages, klasični Apache/Nginx hosting).
Nije potreban Node.js server.

- Svaka ruta ima vlastiti `index.html` (npr. `/usluge/reparacija-dizni/index.html`).
- Za nepostojeće URL-ove poslužitelj treba vratiti `index.csr.html` (SPA fallback) – tada
  Angular prikazuje stranicu „404“.

## ⚠️ Prije objave – obavezno

1. **Poslovni podaci** – `src/app/core/config/site.config.ts`
   Naziv, adresa, telefon, e-mail, radno vrijeme, društvene mreže, OIB, domena (`url`).
   Sve vrijednosti označene s `PLACEHOLDER` su izmišljeni primjeri.
2. **Brojke u traci statistike** (`stats` u istoj datoteci) – upišite samo provjerene
   podatke ili postavite `stats: []`.
3. **Fotografije** – zamijenite ilustracije stvarnim fotografijama (vidi niže).
4. **Kontakt forma** – postavite `formEndpoint` (vidi niže).
5. **Tekstovi** – provjerite rokove i jamstvo u FAQ-u (`src/app/core/data/content.data.ts`)
   te priču servisa na stranici „O nama“ (`src/app/pages/about/about.page.html`).
6. **Pravne stranice** – predložak pravila privatnosti i politike kolačića provjerite
   s pravnim savjetnikom.

## Struktura projekta

```
src/app/
├── core/
│   ├── config/
│   │   ├── site.config.ts      ← SVI poslovni podaci (jedno mjesto)
│   │   └── images.config.ts    ← SVE fotografije i alt tekstovi (jedno mjesto)
│   ├── data/
│   │   ├── services.data.ts    ← usluge (kartice + stranice usluga)
│   │   └── content.data.ts     ← navigacija, USP, proces, simptomi, oprema, galerija, FAQ
│   └── services/
│       ├── seo.service.ts      ← title, meta, Open Graph, canonical, JSON-LD
│       ├── structured-data.ts  ← LocalBusiness / Service / FAQ / Breadcrumb schema
│       ├── contact-form.service.ts
│       └── scroll-lock.service.ts
├── components/                 ← sekcije stranice
│   ├── header/  hero/  usp/  services/  process/  symptoms/  equipment/
│   ├── before-after/  gallery/ (+ lightbox)  brands/  faq/  cta/  contact/
│   └── footer/  mobile-cta/
├── pages/                      ← rute (podstranice se učitavaju lijeno)
│   ├── home/  service-detail/  about/  legal/  not-found/
└── shared/
    ├── components/  icon/  logo/  responsive-image/  section-heading/  page-hero/
    └── directives/  reveal.directive.ts  count-up.directive.ts
```

Sadržaj (tekstovi) je odvojen od komponenti – za izmjenu teksta usluge, FAQ-a ili simptoma
mijenja se samo odgovarajuća `*.data.ts` datoteka.

### Rute

| Ruta                    | Sadržaj                                       |
| ----------------------- | --------------------------------------------- |
| `/`                     | Početna (sve sekcije)                         |
| `/usluge/:slug`         | Detalji usluge (10 stranica, prerenderirano) |
| `/o-nama`               | O nama                                        |
| `/pravila-privatnosti`  | Pravila privatnosti                           |
| `/kolacici`             | Politika kolačića                             |

## Fotografije

Sve slike su u `public/assets/images/` i registrirane u
`src/app/core/config/images.config.ts`.

**Trenutne slike su generirane tehničke ilustracije (placeholderi)**, izrađene skriptom
`scripts/generate-placeholder-images.mjs`. Zamijenite ih stvarnim fotografijama iz vlastite
radionice – autentične fotografije grade najviše povjerenja.

Zamjena fotografije:

1. Pripremite `.webp` (preporuka 1600 px širine, kvaliteta ~80) i verziju od 800 px s
   nastavkom `-800` (npr. `injector-hero-800.webp`).
2. Spremite pod **istim imenom** u `public/assets/images/`.
3. Ako se promijenio omjer, ažurirajte `width`/`height` u `images.config.ts`
   (sprječava pomicanje layouta) i po potrebi `alt` tekst.

Popis datoteka: `injector-hero`, `injector-repair`, `injector-testing`, `common-rail`,
`injector-solenoid`, `injector-delphi`, `injector-denso`, `injector-piezo`,
`high-pressure-pump`, `diagnostics`, `injector-coding`, `workshop`, `diesel-technician`,
`nozzle-macro`, `microscope-inspection`, `ultrasonic-cleaning`, `flow-measurement`,
`new-parts`, `car-diesel`, `before-repair`, `after-repair` (+ `og-image.jpg` 1200×630).

Za prije/poslije slider preporučuju se dvije fotografije snimljene iz **istog kuta**.

## Kontakt forma

- Validacija: obavezna polja, format telefona, e-maila i godišta, najmanja duljina opisa,
  privola (GDPR), provjera vrste i veličine privitaka (do 5 datoteka × 10 MB).
- Zaštita od spama: skriveno „honeypot“ polje.
- **Slanje**: u `site.config.ts` postavite `formEndpoint` na URL koji prima
  `multipart/form-data` (vlastiti backend ili usluga poput Formspree, Getform, Basin…).
  Dok endpoint nije postavljen, forma otvara korisnikov e-mail klijent s popunjenim upitom
  (privitke tada korisnik prilaže ručno).
- CTA „Dogovori servis“ automatski odabire vrstu upita (`/?upit=termin#kontakt`).

## SEO

- Statični HTML za svaku stranicu (prerender) – sav sadržaj vidljiv tražilicama.
- Title / meta description / canonical / Open Graph / Twitter kartice po stranici.
- JSON-LD: `AutoRepair` (LocalBusiness), `OfferCatalog` + `Service`, `FAQPage`,
  `BreadcrumbList` – generirano iz konfiguracije, bez izmišljenih podataka.
- `sitemap.xml` i `robots.txt` generiraju se iz `site.config.ts` pri buildu.
- Semantički HTML (jedan `h1` po stranici, hijerarhija naslova, `nav`, `main`, `footer`).

## Pristupačnost

Skip-link, vidljiv fokus, ARIA atributi (izbornik, accordion, slider, lightbox),
nativni `<dialog>` za lightbox (fokus, Esc), prijava grešaka forme povezana s poljima,
kontrast gumba > 6:1, poštivanje `prefers-reduced-motion`, sav sadržaj dostupan i bez JS-a.

## Privatnost

Fontovi su self-hosted (npm `@fontsource`), nema analitike ni kolačića trećih strana.
Google Maps se učitava tek na klik korisnika.

## Pravna napomena o proizvođačima

Nazivi Bosch, Delphi, Denso, Siemens VDO i Continental prikazani su isključivo kao
**kompatibilni sustavi**, uz jasnu napomenu da servis nije ovlašteni partner. Ako servis
postane ovlašteni partner, tekst se mijenja u `content.data.ts` i `services.data.ts`.
