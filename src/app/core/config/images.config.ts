/**
 * ============================================================================
 *  CENTRALNA KONFIGURACIJA FOTOGRAFIJA
 * ============================================================================
 *  Sve fotografije na stranici dolaze iz ove datoteke.
 *
 *  KAKO ZAMIJENITI FOTOGRAFIJU:
 *   1. Pripremite fotografiju u .webp formatu (preporuka: 1600 px širine,
 *      kvaliteta 75–82). Za manje ekrane dodajte i verziju od 800 px
 *      s nastavkom "-800" (npr. injector-hero-800.webp).
 *   2. Spremite je u  public/assets/images/  pod ISTIM imenom
 *      – stranica će je automatski koristiti.
 *   3. Ako mijenjate dimenzije ili omjer, ažurirajte `width` i `height`
 *      (sprječava pomicanje layouta), a po potrebi i `alt` tekst.
 *   4. Ako nemate verziju od 800 px, postavite `responsive: false`.
 *
 *  Trenutne slike su generirane ilustracije (placeholderi) – zamijenite ih
 *  stvarnim fotografijama iz vlastite radionice. Autentične fotografije
 *  vlastitog rada grade više povjerenja od bilo koje stock fotografije.
 * ============================================================================
 */

export interface ImageAsset {
  /** Putanja do izvorne (najveće) verzije, relativno na /public */
  src: string;
  /** Opisni alt tekst na hrvatskom */
  alt: string;
  width: number;
  height: number;
  /** Postoji li dodatna verzija od 800 px (<ime>-800.webp) */
  responsive?: boolean;
}

const BASE = '/assets/images/';

function img(
  file: string,
  alt: string,
  width = 1600,
  height = 1067,
  responsive = true,
): ImageAsset {
  return { src: BASE + file, alt, width, height, responsive };
}

export const IMAGES = {
  // --- Hero -----------------------------------------------------------------
  hero: img(
    'injector-hero.webp',
    'Common Rail diesel injektor pod radioničkim svjetlom na tamnoj podlozi',
    1920,
    1200,
  ),

  // --- Usluge ---------------------------------------------------------------
  injectorRepair: img(
    'injector-repair.webp',
    'Rastavljeni Common Rail injektor – ventil, igla, opruga i matica poredani na radnoj podlozi',
  ),
  injectorTesting: img(
    'injector-testing.webp',
    'Testni stol za injektore s manometrom i mjernim posudama za povrat goriva',
  ),
  commonRail: img(
    'common-rail.webp',
    'Common Rail sustav – visokotlačna letva s četiri injektora i cijevima',
  ),
  injectorSolenoid: img(
    'injector-solenoid.webp',
    'Elektromagnetski (solenoidni) Common Rail injektor',
  ),
  injectorDelphi: img('injector-delphi.webp', 'Kompaktni Common Rail injektor sa sivim konektorom'),
  injectorDenso: img('injector-denso.webp', 'Common Rail injektor s bočnim priključkom goriva'),
  injectorPiezo: img('injector-piezo.webp', 'Piezo Common Rail injektor s izduženim kućištem'),
  highPressurePump: img(
    'high-pressure-pump.webp',
    'Visokotlačna diesel pumpa Common Rail sustava na radnom stolu',
  ),
  diagnostics: img(
    'diagnostics.webp',
    'Dijagnostički softver s prikazom korekcija količine ubrizgavanja po cilindrima',
  ),
  injectorCoding: img(
    'injector-coding.webp',
    'Oznaka korekcijskog koda na kućištu injektora spremna za kodiranje u upravljačku jedinicu',
  ),

  // --- Oprema i proces ------------------------------------------------------
  workshop: img('workshop.webp', 'Uredna radionica za servis diesel sustava ubrizgavanja'),
  technician: img(
    'diesel-technician.webp',
    'Serviser momentnim ključem priteže maticu injektora na radnom stolu',
  ),
  nozzleMacro: img('nozzle-macro.webp', 'Makro snimka vrha dizne s mlaznim otvorima', 1600, 1600),
  microscope: img(
    'microscope-inspection.webp',
    'Pregled sjedišta ventila injektora pod mikroskopom',
    1600,
    1600,
  ),
  ultrasonic: img(
    'ultrasonic-cleaning.webp',
    'Ultrazvučna kada s dijelovima injektora tijekom čišćenja',
  ),
  flowMeasurement: img(
    'flow-measurement.webp',
    'Mjerne posude za usporedbu količine ubrizgavanja i povrata goriva po injektoru',
    1600,
    2000,
  ),
  newParts: img(
    'new-parts.webp',
    'Novi zamjenski dijelovi za reparaciju injektora – ventili, dizne i brtve',
  ),
  car: img('car-diesel.webp', 'Osobno vozilo s diesel motorom spremno za dijagnostiku', 1600, 900),

  // --- Prije / poslije --------------------------------------------------------
  before: img(
    'before-repair.webp',
    'Vrh dizne prije reparacije – vidljive naslage čađe i karbona oko mlaznih otvora',
    1600,
    1000,
  ),
  after: img(
    'after-repair.webp',
    'Vrh dizne nakon reparacije – čista površina i jasno definirani mlazni otvori',
    1600,
    1000,
  ),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof IMAGES;

/** Generira srcset za responzivne slike po konvenciji <ime>-800.webp */
export function srcsetFor(image: ImageAsset): string | null {
  if (!image.responsive) return null;
  const small = image.src.replace(/\.webp$/, '-800.webp');
  return `${small} 800w, ${image.src} ${image.width}w`;
}
