import { SITE } from '../config/site.config';
import { FaqItem } from '../data/content.data';
import { ServiceItem } from '../data/services.data';

/**
 * Generatori schema.org strukturiranih podataka.
 * Svi poslovni podaci dolaze iz SITE konfiguracije – ništa nije izmišljeno.
 */

const BUSINESS_ID = `${SITE.url}/#business`;

export function localBusinessSchema(): object {
  const hours = SITE.openingHours
    .filter((h) => h.schemaDays.length && h.opens && h.closes)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schemaDays,
      opens: h.opens,
      closes: h.closes,
    }));

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': BUSINESS_ID,
    name: SITE.name,
    description: SITE.seo.defaultDescription,
    url: SITE.url,
    telephone: SITE.contact.phoneHref,
    email: SITE.contact.email,
    image: SITE.url + SITE.seo.ogImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.address.region,
    knowsAbout: [
      'Common Rail injektori',
      'Reparacija dizni',
      'Testiranje injektora',
      'Kodiranje injektora',
      'Visokotlačne diesel pumpe',
    ],
  };

  if (hours.length) schema['openingHoursSpecification'] = hours;
  if (SITE.address.geo) {
    schema['geo'] = {
      '@type': 'GeoCoordinates',
      latitude: SITE.address.geo.lat,
      longitude: SITE.address.geo.lng,
    };
  }
  // Placeholder linkovi (samo domena mreže, bez profila) se ne navode.
  const sameAs = SITE.social.map((s) => s.url).filter((u) => !/\.com\/?$/.test(u));
  if (sameAs.length) schema['sameAs'] = sameAs;

  return schema;
}

export function serviceSchema(service: ServiceItem): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.intro,
    serviceType: service.title,
    url: `${SITE.url}/usluge/${service.slug}`,
    areaServed: SITE.address.region,
    provider: { '@id': BUSINESS_ID, '@type': 'AutoRepair', name: SITE.name },
  };
}

export function serviceCatalogSchema(services: ServiceItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Usluge servisa dizni i injektora',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.short,
        url: `${SITE.url}/usluge/${s.slug}`,
        provider: { '@id': BUSINESS_ID },
      },
    })),
  };
}

export function faqSchema(items: FaqItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: SITE.url + item.path,
    })),
  };
}
