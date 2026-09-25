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
  { label: 'Emisija', path: '/', fragment: 'emisija' },
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
    icon: 'zap',
    title: 'Snaga kad zatreba',
    text: 'Emisiju podešavamo u gornji dio tolerancije. Kad stisnete gas do poda, igla se digne i motor povuče – baš kad vam to spašava situaciju.',
  },
  {
    icon: 'shield',
    title: 'Jamstvo na rad',
    text: 'Na obavljene radove dobivate jamstvo i pisani izvještaj s izmjerenim vrijednostima.',
  },
  {
    icon: 'fuel',
    title: 'Manja potrošnja goriva',
    text: 'Injektor je jedini dio na vozilu koji nakon stručne reparacije mjerljivo smanjuje potrošnju – i do 2 litre na 100 km. Cijena zahvata na prvi pogled djeluje visoko, no kroz prijeđene kilometre se vraća.',
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
    text: 'Dizne se pažljivo skidaju i označavaju po cilindrima. Prvi korak je čišćenje vanjskog kućišta, nakon čega slijedi elektronička provjera u 6 faza – zavojnica, otpor, izolacija i signali prema upravljačkoj jedinici prolaze kroz sve faze prije nego se dizna rastavi.',
    icon: 'search',
  },
  {
    number: '03',
    title: 'Testiranje',
    text: 'Na Hartridge Sabre i CRI Expert testnim stolovima očitava se stvarno stanje dizne – tehničar mora razumjeti i iščitati svaku fazu simulacije rada injektora. Samo vrhunska, skupa oprema dodatno mjeri NOP i MDP te prikazuje grafove vremena i količine ubrizgavanja, gdje se vide odstupanja koja jeftinija oprema ne otkriva. Posebnu pažnju dajemo točki emisije – punom opterećenju kada stisnete gas do poda.',
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
 *  Emisija, NOP i MDP
 * ------------------------------------------------------------------------ */
export interface TestPoint {
  code: string;
  title: string;
  motto: string;
  text: string;
  icon: IconName;
  /** Istaknuta točka (emisija) */
  highlight?: boolean;
}

export const TEST_POINTS: TestPoint[] = [
  {
    code: 'PI',
    title: 'Pilot',
    motto: 'Pali bez ključa',
    text: 'Predubrizgavanje – mala količina goriva koja omogućuje mekano i brzo paljenje.',
    icon: 'key',
  },
  {
    code: 'LL',
    title: 'Prazni hod (ler)',
    motto: 'Na leru šapuće',
    text: 'Miran, ujednačen rad motora bez vibracija. Ovdje većina servisa staje – dijagnostika pokazuje da je sve „top“.',
    icon: 'activity',
  },
  {
    code: 'EM',
    title: 'Emisija',
    motto: 'Gas do poda – spašava',
    text: 'Puno opterećenje, od 800 bara naviše. Točka koja odlučuje ima li motor snage kad vam zatreba – i koju dijagnostika na vozilu ne može očitati.',
    icon: 'zap',
    highlight: true,
  },
];

export interface EmissionCompare {
  label: string;
  value: number;
  verdict: string;
  best?: boolean;
}

/** Primjer tolerancije emisije za jedan tip injektora (mm³/hod). */
export const EMISSION_RANGE = { min: 20, max: 35 };

export const EMISSION_COMPARE: EmissionCompare[] = [
  {
    label: 'Prosječna reparacija',
    value: 25,
    verdict: 'Prođe test – ali kad stisnete gas do poda, igla se ne digne više od toga.',
  },
  {
    label: 'Naša reparacija',
    value: 30,
    verdict:
      'Igla se digne više, u cilindar ulazi više goriva – auto povuče kao da se upalio dodatni turbo.',
    best: true,
  },
];

export interface ScenarioStep {
  time: string;
  text: string;
}

export const EMISSION_SCENARIO: ScenarioStep[] = [
  { time: '0,0 s', text: 'Vozite 100 km/h i krenete pretjecati.' },
  { time: '1,2 s', text: 'Vozilo iz suprotnog smjera dolazi brže nego što ste mislili.' },
  {
    time: '1,5 s',
    text: 'Instinkt: gas do poda. Igla se diže, gorivo – „hrana“ za eksploziju – ulazi u cilindar i motor vas izvuče.',
  },
];

export interface NopMdpItem {
  code: string;
  name: string;
  title: string;
  text: string;
}

export const NOP_MDP: NopMdpItem[] = [
  {
    code: 'NOP',
    name: 'Nozzle Opening Pressure',
    title: 'Tlak otvaranja igle',
    text: 'Okrenete ključ, signal ide iz računala na senzore, pumpa diže tlak – i kad u sustavu dosegne zadanu vrijednost (npr. 150 bara), igla se mora otvoriti. Ni prije, ni kasnije.',
  },
  {
    code: 'MDP',
    name: 'Minimum Drive Pulse',
    title: 'Najkraći upravljački impuls',
    text: 'Najkraći električni impuls na koji injektor još ubrizga gorivo. Od njega ovise precizna pred-ubrizgavanja, tiho paljenje i miran prazni hod.',
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
 *  Napomena: proizvođače opreme navodite samo ako su poznati i točni.
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
    icon: 'target',
    title: 'Tesa komparatori',
    text: 'Švicarski Tesa komparatori – svjetski broj 1 u preciznom mjerenju. U radionici ih imamo više od deset, jer par mikrona na hodu igle radi čuda.',
    image: 'injectorBatchCaliper',
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
    icon: 'diamond',
    title: 'Poliranje na dijamantnim pločama',
    text: 'Sjedišta i dosjedne površine dizne fino se poliraju na dijamantnim pločama do potpune ravnosti – uvjet za nepropusnost pod visokim tlakom.',
    image: 'nozzleMacro',
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
  {
    image: 'workshopTestStations',
    caption: 'Radne stanice za testiranje injektora',
    category: 'radionica',
    wide: true,
  },
  {
    image: 'injectorPressGauge',
    caption: 'Hidraulična preša s manometrom',
    category: 'testiranje',
    tall: true,
  },
  {
    image: 'injectorCodingStation',
    caption: 'Bosch stanica za kodiranje injektora',
    category: 'radionica',
    wide: true,
  },
  {
    image: 'injectorTestFixture',
    caption: 'Ispitna naprava za dizne',
    category: 'testiranje',
    tall: true,
  },
];

/* --------------------------------------------------------------------------
 *  Certifikati i priznanja
 * ------------------------------------------------------------------------ */
export interface Certificate {
  image: ImageKey;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    image: 'certificateSiskAward',
    title: 'Godišnja nagrada Grada Siska',
    issuer: 'Gradsko vijeće Grada Siska',
    date: '2. lipnja 2020.',
    description:
      'Javno priznanje Grada Siska dodijeljeno Slavku Miškulinu za uspješno poduzetništvo prilagođeno osobama s invaliditetom. Nagrada se dodjeljuje pojedincima i tvrtkama koje svojim radom pridonose ugledu i razvoju grada.',
  },
  {
    image: 'certificateBoschComfortElectronics',
    title: 'Bosch Service Training – Komforna elektronika 1',
    issuer: 'Robert Bosch d.o.o., Auto oprema',
    date: '27.–28. rujna 2021.',
    description:
      'Potvrda o sudjelovanju i stečenim teoretskim i praktičnim znanjima na Boschevom stručnom seminaru o komfornoj elektronici vozila. Dio je Boschevog programa trajne izobrazbe servisera koji prati suvremeno stanje automobilske tehnologije.',
  },
  {
    image: 'certificateBoschInjectionPartner',
    title: 'Bosch modul partner – Sustavi i ubrizgavanje',
    issuer: 'Robert Bosch d.o.o., Auto oprema',
    date: 'za 2024. godinu',
    description:
      'Certifikat kojim Bosch potvrđuje status ovlaštenog modul partnera za sustave i ubrizgavanje goriva. Dodjeljuje se radionicama s opremom, alatima i osposobljenošću tima za dijagnostiku i popravak Bosch sustava ubrizgavanja prema tvorničkim standardima.',
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
    q: 'Što je emisija na testu injektora i zašto je važna?',
    a: 'Emisija je točka testa pri punom opterećenju (od 800 bara naviše) – ono što injektor daje kad stisnete gas do poda. Većina servisa gleda samo pilot (paljenje) i prazni hod, pa auto pali bez ključa i šapuće na leru. No ako je emisija namještena na donju granicu tolerancije, u kritičnoj situaciji, npr. pri pretjecanju, motoru nedostaje snage. Mi emisiju podešavamo u gornji dio dopuštenog raspona, a to traži vrijeme i precizno slaganje svih radnih točaka.',
  },
  {
    q: 'Što su NOP i MDP?',
    a: 'NOP (Nozzle Opening Pressure) je tlak pri kojem se igla injektora otvara, a MDP (Minimum Drive Pulse) najkraći upravljački impuls na koji injektor još ubrizgava. To su dodatna mjerenja koja se na testnom stolu plaćaju po injektoru – za set od 4 injektora to je dodatnih 20 €. Injektor koji prođe sve ostale testove često padne upravo na NOP ili MDP, pa se podešavanje radi ispočetka. Mi ta mjerenja radimo, jer tek tada znamo da je injektor zaista ispravan.',
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
    q: 'Isplati li se profesionalna reparacija injektora?',
    a: 'Da. Injektor je jedini element na vozilu koji nakon stručne reparacije mjerljivo smanjuje potrošnju goriva – i do 2 litre na 100 km, ovisno o stupnju oštećenja diznih otvora. Na prvi pogled cijena zahvata djeluje visoko, no kroz prijeđene kilometre uloženi novac se vraća kroz manju potrošnju i miran rad motora.',
  },
  {
    q: 'Radite li dizne za osobna i gospodarska vozila?',
    a: 'Da, servisiramo injektore osobnih i dostavnih vozila, a za gospodarska vozila i radne strojeve javite nam tip motora i injektora kako bismo potvrdili mogućnost servisa.',
  },
];
