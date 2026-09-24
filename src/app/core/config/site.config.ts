/**
 * ============================================================================
 *  CENTRALNA KONFIGURACIJA SERVISA
 * ============================================================================
 *  Svi poslovni podaci nalaze se ISKLJUČIVO u ovoj datoteci.
 *  Prije objave stranice zamijenite sve vrijednosti označene s `PLACEHOLDER`
 *  stvarnim podacima servisa. Ti se podaci automatski koriste u:
 *   - headeru, footeru, kontakt sekciji i mobilnom CTA-u
 *   - SEO meta oznakama, Open Graph oznakama i canonical URL-ovima
 *   - strukturiranim podacima (LocalBusiness / Service / FAQ JSON-LD)
 *
 *  Napomena: nemojte ovdje upisivati podatke koji nisu provjereni
 *  (npr. broj godina iskustva ili broj repariranih injektora).
 * ============================================================================
 */

export interface OpeningHours {
  /** Oznaka za prikaz, npr. "Pon – Pet" */
  label: string;
  /** Vrijeme za prikaz, npr. "08:00 – 16:00" ili "Zatvoreno" */
  hours: string;
  /** Schema.org dani (za strukturirane podatke); prazno = zatvoreno */
  schemaDays: string[];
  opens?: string;
  closes?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: 'facebook' | 'instagram' | 'youtube' | 'linkedin';
}

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const SITE = {
  /** puni naziv servisa (koristi se u SEO-u i footeru) */
  name: 'ZIBEL autodijelovi',
  /** kratki naziv za logo */
  shortName: 'ZIBEL',
  /** Podnaslov uz logo */
  logoTagline: 'Diesel injection lab',
  /** pravni naziv tvrtke za footer i pravne stranice */
  legalName: 'ZIBEL, obrt za trgovinu, vl. Slavko Miškulin',
  /** OIB */
  oib: '56069968965',

  /** TODO – produkcijska domena BEZ završne kose crte, popuniti nakon objave stranice */
  url: 'https://www.example.com',

  /** Kratki opis za footer */
  description:
    'ZIBEL – obrt za trgovinu autodijelovima i opremom, vl. Slavko Miškulin. Prodaja auto dijelova te dijagnostika, testiranje i reparacija dizni i Common Rail injektora u Sisku.',

  contact: {
    /** telefon za prikaz */
    phoneDisplay: '+385 44 531 789',
    /** telefon u E.164 formatu (za tel: linkove i JSON-LD) */
    phoneHref: '+38544531789',
    /** TODO – e-mail adresa nije javno dostupna u dostupnim izvorima, potrebno dopuniti */
    email: 'info@example.com',
    /** WhatsApp/Viber broj bez razmaka (prazno = ne prikazuj) */
    whatsapp: '',
  },

  address: {
    street: 'Ulica hrvatskih domobrana 80',
    postalCode: '44000',
    city: 'Sisak',
    region: 'Hrvatska',
    country: 'HR',
    /** koordinate za strukturirane podatke (null = izostavi) */
    geo: null as { lat: number; lng: number } | null,
    /** Upit za Google Maps (adresa ili naziv tvrtke). */
    mapsQuery: 'ZIBEL, Ulica hrvatskih domobrana 80, 44000 Sisak',
  },

  /** radno vrijeme */
  openingHours: [
    {
      label: 'Ponedjeljak – Petak',
      hours: '08:00 – 17:00',
      schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    {
      label: 'Subota',
      hours: '08:00 – 12:00',
      schemaDays: ['Saturday'],
      opens: '08:00',
      closes: '12:00',
    },
    { label: 'Nedjelja', hours: 'Zatvoreno', schemaDays: [] },
  ] satisfies OpeningHours[],

  /** TODO – društvene mreže: nije pronađena službena Facebook/Instagram stranica obrta, dopuniti kad bude poznato (prazan niz = sekcija se ne prikazuje) */
  social: [] as SocialLink[],

  /**
   * Brojke za animirani brojač.
   * Obrt je registriran 18.06.1991., što je javno provjerljivo (sudski/obrtni registar).
   * Ostale brojke (broj testiranih injektora i sl.) nisu javno provjerljive pa nisu navedene.
   */
  stats: [{ value: 35, prefix: '+', label: 'godina iskustva (od 1991.)' }] satisfies Stat[],

  /** PLACEHOLDER – jamstvo (prikazuje se u USP-u i FAQ-u; prazno = općeniti tekst) */
  warrantyText: '',

  /**
   * Endpoint za slanje kontakt forme (POST multipart/form-data).
   * Npr. vlastiti backend, Formspree, Getform, Basin…
   * Ako je prazno, forma otvara korisnikov e-mail klijent s popunjenim upitom.
   */
  formEndpoint: '',

  /** Maksimalan broj i veličina privitaka u kontakt formi */
  upload: {
    maxFiles: 5,
    maxFileSizeMb: 10,
    accept: 'image/jpeg,image/png,image/webp,image/heic,application/pdf',
  },

  seo: {
    defaultTitle: 'ZIBEL autodijelovi Sisak | Servis dizni i injektora',
    defaultDescription:
      'ZIBEL, obrt za trgovinu autodijelovima, vl. Slavko Miškulin – Sisak. Prodaja auto dijelova te profesionalna dijagnostika, testiranje i reparacija dizni i Common Rail injektora.',
    ogImage: '/assets/images/og-image.jpg',
    locale: 'hr_HR',
    themeColor: '#0b0c0e',
  },
} as const;

export type SiteConfig = typeof SITE;

/** Pomoćni linkovi izvedeni iz konfiguracije */
export const PHONE_HREF = `tel:${SITE.contact.phoneHref}`;
export const EMAIL_HREF = `mailto:${SITE.contact.email}`;
export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`;
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SITE.address.mapsQuery,
)}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  SITE.address.mapsQuery,
)}&output=embed`;
