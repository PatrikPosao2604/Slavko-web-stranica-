import { ImageKey } from '../config/images.config';
import { IconName } from '../../shared/components/icon/icons';

/* --------------------------------------------------------------------------
 *  Navigacija
 * ------------------------------------------------------------------------ */
export interface NavItem {
  label: string;
  /** Ruta ('/' za početnu) */
  path: string;
  /** Sidro na početnoj stranici */
  fragment?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Početna', path: '/', fragment: 'pocetak' },
  { label: 'Usluge', path: '/', fragment: 'usluge' },
  { label: 'Kako radimo', path: '/', fragment: 'kako-radimo' },
  { label: 'O nama', path: '/o-nama' },
  { label: 'Galerija', path: '/', fragment: 'galerija' },
  { label: 'FAQ', path: '/', fragment: 'faq' },
  { label: 'Kontakt', path: '/', fragment: 'kontakt' },
];

/* --------------------------------------------------------------------------
 *  Prednosti (USP)
 * ------------------------------------------------------------------------ */
export interface Usp {
  icon: IconName;
  title: string;
  text: string;
}

export const USPS: Usp[] = [
  {
    icon: 'activity',
    title: 'Precizna dijagnostika',
    text: 'Prije skidanja dizni provjeravamo greške, korekcije i tlak – da se ne mijenja ono što je ispravno.',
  },
  {
    icon: 'gauge',
    title: 'Profesionalno testiranje',
    text: 'Količina ubrizgavanja, povrat i nepropusnost mjere se na testnom stolu u više radnih točaka.',
  },
  {
    icon: 'wrench',
    title: 'Reparacija injektora',
    text: 'Zamjena istrošenih dijelova, čišćenje i podešavanje prema referentnim vrijednostima.',
  },
  {
    icon: 'injector',
    title: 'Common Rail stručnost',
    text: 'Elektromagnetski i piezo injektori, visokotlačne pumpe i kodiranje korekcija.',
  },
  {
    icon: 'shield',
    title: 'Jamstvo na rad',
    text: 'Na obavljene radove dobivate jamstvo i pisani izvještaj s izmjerenim vrijednostima.',
  },
];

/* --------------------------------------------------------------------------
 *  Proces rada
 * ------------------------------------------------------------------------ */
export interface ProcessStep {
  number: string;
  title: string;
  text: string;
  icon: IconName;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Dijagnostika',
    text: 'Očitavamo greške, korekcije po cilindrima i tlak u sustavu. Cilj je potvrditi da je problem zaista u diznama.',
    icon: 'activity',
  },
  {
    number: '02',
    title: 'Demontaža i pregled',
    text: 'Dizne se pažljivo skidaju, označavaju po cilindrima i vizualno pregledavaju – kao i brtve, cijevi i sjedišta.',
    icon: 'search',
  },
  {
    number: '03',
    title: 'Testiranje',
    text: 'Na testnom stolu mjerimo ubrizgavanje, povrat i nepropusnost. Rezultati pokazuju koja dizna treba zahvat.',
    icon: 'gauge',
  },
  {
    number: '04',
    title: 'Reparacija / kalibracija',
    text: 'Čišćenje, zamjena istrošenih dijelova i podešavanje prema referentnim vrijednostima za pojedini tip.',
    icon: 'wrench',
  },
  {
    number: '05',
    title: 'Završna kontrola',
    text: 'Ponovno testiranje nakon reparacije, novi korekcijski kod i provjera rada na vozilu nakon ugradnje.',
    icon: 'check-circle',
  },
];

/* --------------------------------------------------------------------------
 *  Simptomi
 * ------------------------------------------------------------------------ */
export type SymptomZone = 'engine' | 'exhaust' | 'cabin' | 'fuel';

export interface Symptom {
  title: string;
  text: string;
  icon: IconName;
  zone: SymptomZone;
}

export const SYMPTOM_ZONES: Record<SymptomZone, { label: string }> = {
  engine: { label: 'Motor' },
  exhaust: { label: 'Ispuh / DPF' },
  cabin: { label: 'Vožnja i dijagnostika' },
  fuel: { label: 'Gorivo' },
};

export const SYMPTOMS: Symptom[] = [
  {
    title: 'Teško paljenje',
    text: 'Motor se dugo vrti prije paljenja, osobito kada je hladan ili vrlo topao.',
    icon: 'key',
    zone: 'engine',
  },
  {
    title: 'Nepravilan rad motora',
    text: 'Vibracije i neujednačen prazni hod – često znak razlike među cilindrima.',
    icon: 'engine',
    zone: 'engine',
  },
  {
    title: 'Povećana potrošnja goriva',
    text: 'Dizna koja kapa ili loše raspršuje gorivo troši više za isti učinak.',
    icon: 'fuel',
    zone: 'fuel',
  },
  {
    title: 'Dimljenje',
    text: 'Crni dim pri ubrzanju ili bijeli/plavi dim pri paljenju.',
    icon: 'smoke',
    zone: 'exhaust',
  },
  {
    title: 'Gubitak snage',
    text: 'Vozilo sporije ubrzava ili prelazi u sigurnosni način rada.',
    icon: 'trending-down',
    zone: 'cabin',
  },
  {
    title: 'Trzanje motora',
    text: 'Povremeni trzaji i „štucanje“ tijekom vožnje pri stalnoj brzini.',
    icon: 'zap',
    zone: 'cabin',
  },
  {
    title: 'Povećane korekcije dizni',
    text: 'Dijagnostika pokazuje da upravljačka jedinica sve više kompenzira pojedini cilindar.',
    icon: 'bar-chart',
    zone: 'cabin',
  },
  {
    title: 'Problemi s DPF-om',
    text: 'Česte regeneracije i brzo punjenje filtera čestica zbog lošeg izgaranja.',
    icon: 'filter',
    zone: 'exhaust',
  },
  {
    title: 'Miris goriva',
    text: 'Miris diesela u kabini ili oko motora – moguće propuštanje povrata ili brtvi.',
    icon: 'droplet',
    zone: 'fuel',
  },
  {
    title: 'Metalni zvukovi',
    text: 'Izraženo „kuckanje“ motora koje se razlikuje od uobičajenog zvuka diesela.',
    icon: 'volume',
    zone: 'engine',
  },
];

/* --------------------------------------------------------------------------
 *  Oprema / tehnologija
 *  Napomena: proizvođači opreme namjerno nisu navedeni. Dodajte ih samo ako
 *  su poznati i točni.
 * ------------------------------------------------------------------------ */
export interface EquipmentItem {
  icon: IconName;
  title: string;
  text: string;
  image?: ImageKey;
}

export const EQUIPMENT: EquipmentItem[] = [
  {
    icon: 'gauge',
    title: 'Testni stolovi',
    text: 'Simulacija rada injektora pri različitim tlakovima i duljinama impulsa.',
    image: 'injectorTesting',
  },
  {
    icon: 'ruler',
    title: 'Mjerna oprema',
    text: 'Precizno mjerenje hoda, zazora i sila – vrijednosti koje odlučuju o ispravnom radu.',
    image: 'newParts',
  },
  {
    icon: 'waves',
    title: 'Ultrazvučno čišćenje',
    text: 'Uklanjanje karbona i naslaga iz kanala i otvora bez oštećenja površina.',
    image: 'ultrasonic',
  },
  {
    icon: 'microscope',
    title: 'Mikroskop',
    text: 'Pregled sjedišta ventila i vrha dizne na razini tragova trošenja.',
    image: 'microscope',
  },
  {
    icon: 'sliders',
    title: 'Kalibracija',
    text: 'Podešavanje prema referentnim vrijednostima i generiranje korekcijskih kodova.',
    image: 'injectorCoding',
  },
  {
    icon: 'flask',
    title: 'Mjerenje protoka',
    text: 'Usporedba ubrizgane količine i povrata između injektora istog motora.',
    image: 'flowMeasurement',
  },
  {
    icon: 'cpu',
    title: 'Elektronička dijagnostika',
    text: 'Očitavanje grešaka, korekcija i parametara rada izravno iz vozila.',
    image: 'diagnostics',
  },
];

/* --------------------------------------------------------------------------
 *  Podržani sustavi
 * ------------------------------------------------------------------------ */
export interface Brand {
  name: string;
  note: string;
}

export const BRANDS: Brand[] = [
  { name: 'BOSCH', note: 'Solenoid i piezo CRI' },
  { name: 'DELPHI', note: 'Common Rail' },
  { name: 'DENSO', note: 'Common Rail' },
  { name: 'SIEMENS VDO', note: 'Piezo' },
  { name: 'CONTINENTAL', note: 'Piezo' },
];

/* --------------------------------------------------------------------------
 *  Galerija
 * ------------------------------------------------------------------------ */
export type GalleryCategory = 'injektori' | 'testiranje' | 'reparacija' | 'radionica';

export const GALLERY_CATEGORIES: { id: GalleryCategory | 'sve'; label: string }[] = [
  { id: 'sve', label: 'Sve' },
  { id: 'injektori', label: 'Injektori' },
  { id: 'testiranje', label: 'Testiranje' },
  { id: 'reparacija', label: 'Reparacija' },
  { id: 'radionica', label: 'Radionica' },
];

export interface GalleryItem {
  image: ImageKey;
  caption: string;
  category: GalleryCategory;
  /** Veći format u gridu */
  wide?: boolean;
  tall?: boolean;
}

export const GALLERY: GalleryItem[] = [
  { image: 'hero', caption: 'Common Rail injektor', category: 'injektori', wide: true },
  {
    image: 'flowMeasurement',
    caption: 'Mjerenje protoka po injektoru',
    category: 'testiranje',
    tall: true,
  },
  { image: 'injectorRepair', caption: 'Rastavljeni injektor', category: 'reparacija' },
  { image: 'nozzleMacro', caption: 'Vrh dizne pod povećanjem', category: 'injektori' },
  { image: 'injectorTesting', caption: 'Testni stol', category: 'testiranje' },
  { image: 'commonRail', caption: 'Common Rail sustav', category: 'injektori', wide: true },
  { image: 'technician', caption: 'Montaža uz propisani moment', category: 'radionica' },
  {
    image: 'microscope',
    caption: 'Mikroskopski pregled sjedišta',
    category: 'reparacija',
    tall: true,
  },
  { image: 'ultrasonic', caption: 'Ultrazvučno čišćenje', category: 'reparacija' },
  { image: 'newParts', caption: 'Novi dijelovi za reparaciju', category: 'reparacija' },
  { image: 'workshop', caption: 'Radionica', category: 'radionica', wide: true },
  { image: 'highPressurePump', caption: 'Visokotlačna pumpa', category: 'injektori' },
  { image: 'diagnostics', caption: 'Očitavanje korekcija', category: 'testiranje' },
  { image: 'car', caption: 'Vozilo na dijagnostici', category: 'radionica', wide: true },
  { image: 'before', caption: 'Dizna prije reparacije', category: 'reparacija', wide: true },
  { image: 'after', caption: 'Dizna nakon reparacije', category: 'reparacija', wide: true },
  {
    image: 'injectorBatchCaliper',
    caption: 'Injektori spremni za mjerenje',
    category: 'injektori',
    wide: true,
  },
  {
    image: 'injectorNozzleTips',
    caption: 'Vrhovi injektora s oznakama',
    category: 'injektori',
    tall: true,
  },
  {
    image: 'injectorTesterScreen',
    caption: 'Ispitivanje na Mega Tester uređaju',
    category: 'testiranje',
    tall: true,
  },
  {
    image: 'workshopWorkbench',
    caption: 'Radni stol servisa',
    category: 'radionica',
    tall: true,
  },
  {
    image: 'injectorTestReports',
    caption: 'Injektori uz zapisnike ispitivanja',
    category: 'testiranje',
    tall: true,
  },
];

/* --------------------------------------------------------------------------
 *  FAQ
 * ------------------------------------------------------------------------ */
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  {
    q: 'Kako znam jesu li dizne neispravne?',
    a: 'Najčešći znakovi su teško paljenje, nepravilan rad motora, dimljenje, gubitak snage i povećana potrošnja. Sigurnu potvrdu daju tek dijagnostika (korekcije po cilindrima, test povrata) i testiranje na testnom stolu – simptomi mogu imati i druge uzroke.',
  },
  {
    q: 'Koliko traje testiranje?',
    a: 'Testiranje jednog kompleta injektora obično se obavi unutar jednog radnog dana, ovisno o tipu injektora i trenutnoj zauzetosti. Točan termin dogovaramo pri zaprimanju.',
  },
  {
    q: 'Može li se svaka dizna reparirati?',
    a: 'Ne. Ako je oštećeno kućište, zavojnica ili piezo element, ili ako za određeni tip nisu dostupni kvalitetni dijelovi, reparacija nije isplativa. U tom slučaju vas obavještavamo prije bilo kakvog zahvata i predlažemo rješenje.',
  },
  {
    q: 'Što je Common Rail?',
    a: 'Common Rail je sustav ubrizgavanja kod kojeg visokotlačna pumpa puni zajedničku cijev (rail) gorivom pod vrlo visokim tlakom, a elektronički upravljani injektori ubrizgavaju gorivo u cilindre. Omogućuje više ubrizgavanja po ciklusu, tiši rad i manju potrošnju.',
  },
  {
    q: 'Treba li kodirati diznu nakon reparacije?',
    a: 'Kod većine modernih sustava – da. Nakon reparacije dizna dobiva nove korekcijske vrijednosti koje se moraju unijeti u upravljačku jedinicu motora kako bi motor ravnomjerno radio.',
  },
  {
    q: 'Kako prepoznati neispravnu diznu?',
    a: 'Neispravna dizna često uzrokuje razliku u radu jednog cilindra: vibracije u praznom hodu, veće korekcije za taj cilindar ili veći povrat goriva. Test povrata na vozilu i dijagnostika brzo pokazuju o kojoj se dizni radi.',
  },
  {
    q: 'Koliko traje reparacija?',
    a: 'Ovisi o tipu injektora i dostupnosti dijelova. Kada su dijelovi dostupni, reparacija s testiranjem najčešće traje 1–3 radna dana. Rok vam potvrđujemo nakon ulaznog testiranja.',
  },
  {
    q: 'Dobivam li jamstvo?',
    a: 'Da, na obavljene radove i ugrađene dijelove dobivate jamstvo. Uvjete i trajanje jamstva navodimo na ponudi i računu.',
  },
  {
    q: 'Mogu li poslati samo injektore?',
    a: 'Da. Injektore možete donijeti ili poslati dostavnom službom. Dobro ih zapakirajte, zaštitite priključke i uz pošiljku priložite podatke o vozilu i opis problema. Nakon testiranja javljamo vam rezultate i prijedlog daljnjih koraka.',
  },
  {
    q: 'Radite li dizne za osobna i gospodarska vozila?',
    a: 'Da, servisiramo injektore osobnih i dostavnih vozila, a za gospodarska vozila i radne strojeve javite nam tip motora i injektora kako bismo potvrdili mogućnost servisa.',
  },
];
