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
  /** PLACEHOLDER – puni naziv servisa (koristi se u SEO-u i footeru) */
  name: 'Naziv Servisa',
  /** PLACEHOLDER – kratki naziv za logo */
  shortName: 'NAZIV SERVISA',
  /** Podnaslov uz logo */
  logoTagline: 'Diesel injection lab',
  /** PLACEHOLDER – pravni naziv tvrtke (npr. "Naziv d.o.o.") za footer i pravne stranice */
  legalName: 'Naziv tvrtke d.o.o.',
  /** PLACEHOLDER – OIB (ostavite prazno ako ga ne želite prikazati) */
  oib: '',

  /** PLACEHOLDER – produkcijska domena BEZ završne kose crte */
  url: 'https://www.example.com',

  /** Kratki opis za footer */
  description:
    'Specijalizirani servis za dijagnostiku, testiranje i reparaciju dizni, Common Rail injektora i visokotlačnih pumpi.',

  contact: {
    /** PLACEHOLDER – telefon za prikaz */
    phoneDisplay: '+385 00 000 0000',
    /** PLACEHOLDER – telefon u E.164 formatu (za tel: linkove i JSON-LD) */
    phoneHref: '+385000000000',
    /** PLACEHOLDER – e-mail */
    email: 'info@example.com',
    /** PLACEHOLDER – WhatsApp/Viber broj bez razmaka (prazno = ne prikazuj) */
    whatsapp: '',
  },

  address: {
    /** PLACEHOLDER */
    street: 'Ulica i kućni broj',
    /** PLACEHOLDER */
    postalCode: '10000',
    /** PLACEHOLDER */
    city: 'Grad',
    region: 'Hrvatska',
    country: 'HR',
    /** PLACEHOLDER – koordinate za strukturirane podatke (null = izostavi) */
    geo: null as { lat: number; lng: number } | null,
    /** Upit za Google Maps (adresa ili naziv tvrtke). */
    mapsQuery: 'Zagreb, Hrvatska',
  },

  /** PLACEHOLDER – radno vrijeme */
  openingHours: [
    {
      label: 'Ponedjeljak – Petak',
      hours: '08:00 – 16:00',
      schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '16:00',
    },
    { label: 'Subota', hours: 'Po dogovoru', schemaDays: [] },
    { label: 'Nedjelja', hours: 'Zatvoreno', schemaDays: [] },
  ] satisfies OpeningHours[],

  /** PLACEHOLDER – društvene mreže (prazan niz = sekcija se ne prikazuje) */
  social: [
    { label: 'Facebook', url: 'https://www.facebook.com/', icon: 'facebook' },
    { label: 'Instagram', url: 'https://www.instagram.com/', icon: 'instagram' },
  ] satisfies SocialLink[],

  /**
   * PLACEHOLDER – brojke za animirani brojač.
   * OVO NISU STVARNI PODACI. Upišite samo provjerene vrijednosti
   * ili postavite `stats: []` da se traka ne prikazuje.
   */
  stats: [
    { value: 10, prefix: '+', label: 'godina iskustva' },
    { value: 1000, suffix: '+', label: 'testiranih injektora' },
    { value: 4, suffix: '+', label: 'proizvođača sustava' },
    { value: 100, suffix: '%', label: 'injektora testirano prije predaje' },
  ] satisfies Stat[],

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
    defaultTitle: 'Servis dizni i injektora | Reparacija Common Rail sustava',
    defaultDescription:
      'Profesionalna dijagnostika, testiranje i reparacija dizni i Common Rail injektora. Precizna kontrola, kalibracija i stručan servis diesel sustava.',
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
