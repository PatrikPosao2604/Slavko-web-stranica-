import { ImageKey } from '../config/images.config';
import { IconName } from '../../shared/components/icon/icons';

export interface ServiceItem {
  slug: string;
  title: string;
  /** Kratki opis za karticu */
  short: string;
  icon: IconName;
  image: ImageKey;
  /** Uvodni tekst na stranici usluge */
  intro: string;
  /** Što usluga uključuje */
  includes: string[];
  /** Kada je usluga potrebna */
  whenNeeded: string[];
  /** Dodatna stručna napomena */
  note?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: 'reparacija-dizni',
    title: 'Reparacija dizni',
    short:
      'Rastavljanje, čišćenje i zamjena istrošenih dijelova uz obavezno testiranje prije povrata u vozilo.',
    icon: 'wrench',
    image: 'injectorRepair',
    intro:
      'Reparacija nije samo zamjena dijelova. Svaka dizna se najprije testira kako bismo znali što točno ne radi, zatim se rastavlja, dijelovi se pregledavaju i mjere, a istrošeni elementi mijenjaju. Postupak završava ponovnim testiranjem i usporedbom s tvorničkim vrijednostima.',
    includes: [
      'Ulazno testiranje i zapis izmjerenih vrijednosti',
      'Rastavljanje i ultrazvučno čišćenje dijelova',
      'Pregled sjedišta, igle i ventila pod povećanjem',
      'Zamjena istrošenih dijelova (ventil, dizna, brtve, filteri)',
      'Podešavanje hoda i sila prema specifikaciji',
      'Završno testiranje i izvještaj o rezultatima',
    ],
    whenNeeded: [
      'Povećane korekcije pojedinog cilindra',
      'Dimljenje, gubitak snage ili nepravilan rad',
      'Povećan povrat goriva',
      'Teško paljenje, osobito na toplom motoru',
    ],
    note: 'Ako dizna nije isplativa za reparaciju (npr. oštećeno kućište ili zavojnica), o tome vas obavještavamo prije nastavka radova.',
  },
  {
    slug: 'testiranje-dizni',
    title: 'Testiranje dizni',
    short:
      'Mjerenje količine ubrizgavanja, povrata i nepropusnosti na testnom stolu u više radnih točaka.',
    icon: 'gauge',
    image: 'injectorTesting',
    intro:
      'Testiranje je temelj svake odluke. Na testnom stolu dizna radi u uvjetima sličnima onima u motoru – pri različitim tlakovima i duljinama impulsa – a mi mjerimo koliko goriva ubrizgava, koliko vraća i drži li tlak.',
    includes: [
      'Test nepropusnosti pri visokom tlaku',
      'Mjerenje povrata goriva',
      'Mjerenje količine u praznom hodu, djelomičnom i punom opterećenju',
      'Mjerenje predubrizgavanja',
      'Električna provjera zavojnice / piezo elementa',
      'Pisani izvještaj s izmjerenim vrijednostima',
    ],
    whenNeeded: [
      'Prije odluke o reparaciji ili zamjeni',
      'Kod sumnje na jednu neispravnu diznu',
      'Pri kupnji rabljenog vozila ili rabljenih dizni',
      'Nakon što dijagnostika pokaže odstupanja korekcija',
    ],
  },
  {
    slug: 'common-rail-injektori',
    title: 'Common Rail injektori',
    short: 'Servis elektromagnetskih i piezo injektora za osobna, dostavna i gospodarska vozila.',
    icon: 'injector',
    image: 'commonRail',
    intro:
      'Common Rail injektori rade pri tlakovima koji prelaze 2000 bara, a razlike u količini ubrizgavanja mjere se u milimetrima kubnim. Zbog toga zahtijevaju preciznu opremu, čistoću radnog prostora i strogu kontrolu nakon svakog zahvata.',
    includes: [
      'Elektromagnetski (solenoidni) injektori',
      'Piezo injektori',
      'Testiranje, reparacija i kalibracija',
      'Generiranje novih korekcijskih kodova gdje sustav to podržava',
      'Savjet o zamjeni brtvi, vijaka i visokotlačnih cijevi',
    ],
    whenNeeded: [
      'Nepravilan rad motora i trzanje',
      'Pojava crnog dima',
      'Upaljena kontrolna lampica motora',
      'Česte regeneracije ili začepljenje DPF-a',
    ],
  },
  {
    slug: 'bosch-injektori',
    title: 'Bosch injektori',
    short: 'Testiranje i reparacija Bosch CRI solenoidnih i piezo injektora.',
    icon: 'injector',
    image: 'injectorSolenoid',
    intro:
      'Bosch Common Rail injektori ugrađuju se u velik broj europskih i azijskih vozila. Servisiramo Bosch kompatibilne injektore – ispitujemo ih, rastavljamo, mijenjamo potrebne dijelove i ponovno testiramo prema referentnim vrijednostima za pojedini kataloški broj.',
    includes: [
      'Solenoidni CRI injektori',
      'Piezo injektori',
      'Zamjena ventilskog sklopa i dizne',
      'Podešavanje prema referentnim vrijednostima',
      'IMA / korekcijski kod (ovisno o sustavu)',
    ],
    whenNeeded: [
      'Povećan povrat goriva',
      'Dimljenje i gubitak snage',
      'Odstupanja korekcija u dijagnostici',
    ],
    note: 'Nismo ovlašteni Bosch servis – servisiramo Bosch kompatibilne sustave.',
  },
  {
    slug: 'delphi-injektori',
    title: 'Delphi injektori',
    short: 'Servis Delphi Common Rail injektora uz testiranje i kodiranje.',
    icon: 'injector',
    image: 'injectorDelphi',
    intro:
      'Delphi injektori posebno su osjetljivi na kvalitetu goriva i čistoću. Nakon reparacije ključno je ispravno testiranje i novi korekcijski kod (C2i / C3i), bez kojeg motor ne može optimalno raditi.',
    includes: [
      'Testiranje na testnom stolu',
      'Reparacija i zamjena kontrolnog ventila',
      'Generiranje korekcijskog koda (C2i / C3i, ovisno o tipu)',
      'Upute za unos koda u upravljačku jedinicu',
    ],
    whenNeeded: ['Teško paljenje', 'Povećan povrat goriva', 'Nepravilan prazni hod'],
    note: 'Nismo ovlašteni Delphi servis – servisiramo Delphi kompatibilne sustave.',
  },
  {
    slug: 'denso-injektori',
    title: 'Denso injektori',
    short: 'Testiranje i reparacija Denso Common Rail injektora.',
    icon: 'injector',
    image: 'injectorDenso',
    intro:
      'Denso injektori česti su u japanskim, ali i u pojedinim europskim vozilima. Servis započinje testiranjem, a nastavlja se prema stanju pojedine komponente i dostupnosti dijelova za konkretan tip injektora.',
    includes: [
      'Testiranje i električna provjera',
      'Reparacija prema dostupnosti dijelova',
      'QR / korekcijski kod (ovisno o tipu)',
      'Završni test i izvještaj',
    ],
    whenNeeded: ['Gubitak snage', 'Dimljenje', 'Kucanje i metalni zvukovi'],
    note: 'Nismo ovlašteni Denso servis – servisiramo Denso kompatibilne sustave.',
  },
  {
    slug: 'siemens-vdo-injektori',
    title: 'Siemens / VDO injektori',
    short: 'Servis piezo injektora Siemens VDO / Continental sustava.',
    icon: 'injector',
    image: 'injectorPiezo',
    intro:
      'Siemens VDO (danas Continental) sustavi većinom koriste piezo injektore. Piezo tehnologija omogućuje vrlo brza i precizna ubrizgavanja, ali zahtijeva odgovarajuću opremu za testiranje i pažljivu dijagnostiku prije bilo kakvog zahvata.',
    includes: [
      'Električna provjera piezo elementa',
      'Testiranje na testnom stolu',
      'Procjena isplativosti reparacije',
      'Korekcijski kod (ovisno o sustavu)',
    ],
    whenNeeded: ['Nepravilan rad motora', 'Motor se gasi ili teško pali', 'Pojava dima'],
    note: 'Nismo ovlašteni Siemens VDO / Continental servis – servisiramo kompatibilne sustave.',
  },
  {
    slug: 'visokotlacne-pumpe',
    title: 'Visokotlačne pumpe',
    short: 'Dijagnostika, testiranje i servis visokotlačnih pumpi Common Rail sustava.',
    icon: 'pump',
    image: 'highPressurePump',
    intro:
      'Visokotlačna pumpa stvara tlak koji dizne koriste za ubrizgavanje. Kada pumpa ne postiže potreban tlak ili se u njoj pojave metalne čestice, problem se prenosi na cijeli sustav. Zato pumpu i injektore uvijek promatramo kao cjelinu.',
    includes: [
      'Provjera tlaka i protoka',
      'Pregled na prisutnost metalnih čestica',
      'Servis ili preporuka zamjene',
      'Savjet o čišćenju sustava nakon kvara pumpe',
    ],
    whenNeeded: [
      'Motor se ne pali ili se gasi',
      'Greška niskog tlaka u sustavu (rail pressure)',
      'Metalni zvukovi iz područja pumpe',
    ],
  },
  {
    slug: 'dijagnostika-sustava-ubrizgavanja',
    title: 'Dijagnostika sustava ubrizgavanja',
    short:
      'Očitavanje grešaka, korekcija i parametara rada kako bismo pronašli pravi uzrok problema.',
    icon: 'activity',
    image: 'diagnostics',
    intro:
      'Dobra dijagnostika štedi novac. Prije skidanja dizni provjeravamo greške, korekcije količine ubrizgavanja, tlak u sustavu i ostale parametre. Tako izbjegavamo nepotrebne radove i usmjeravamo se na stvarni uzrok kvara.',
    includes: [
      'Očitavanje i tumačenje grešaka',
      'Očitavanje korekcija po cilindrima',
      'Provjera tlaka goriva i regulacije',
      'Test povrata goriva na vozilu',
      'Preporuka daljnjih koraka s procjenom',
    ],
    whenNeeded: [
      'Upaljena lampica motora',
      'Neodređeni problemi s radom motora',
      'Prije kupnje rabljenog diesel vozila',
    ],
  },
  {
    slug: 'kodiranje-kalibracija-injektora',
    title: 'Kodiranje / kalibracija injektora',
    short:
      'Unos korekcijskih kodova u upravljačku jedinicu nakon reparacije ili zamjene injektora.',
    icon: 'qr',
    image: 'injectorCoding',
    intro:
      'Svaki injektor malo se razlikuje od drugoga. Korekcijski kod (IMA, QR, C2i, C3i…) govori upravljačkoj jedinici motora kako kompenzirati te razlike. Nakon reparacije ili zamjene injektora kod se mora ispravno unijeti – inače motor ne radi optimalno.',
    includes: [
      'Generiranje novog koda nakon testiranja (gdje je podržano)',
      'Unos koda u upravljačku jedinicu vozila',
      'Provjera korekcija nakon ugradnje',
      'Prilagodba (adaptacija) prema zahtjevima proizvođača vozila',
    ],
    whenNeeded: [
      'Nakon reparacije injektora',
      'Nakon zamjene jednog ili više injektora',
      'Nakon zamjene upravljačke jedinice',
    ],
  },
];

export function findService(slug: string | null | undefined): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
