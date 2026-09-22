import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE } from '../config/site.config';

export interface PageSeo {
  /** Naslov stranice; ako se izostavi, koristi se zadani naslov */
  title?: string;
  description?: string;
  /** Putanja stranice (npr. '/o-nama') – za canonical i og:url */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

/**
 * Upravljanje SEO oznakama: title, meta description, Open Graph, Twitter,
 * canonical i JSON-LD strukturirani podaci. Radi i pri prerenderiranju,
 * pa su sve oznake prisutne u statičnom HTML-u.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  setPage(page: PageSeo): void {
    const title = page.title ? `${page.title} | ${SITE.name}` : SITE.seo.defaultTitle;
    const description = page.description ?? SITE.seo.defaultDescription;
    const url = this.absoluteUrl(page.path);
    const image = this.absoluteUrl(page.image ?? SITE.seo.ogImage);

    this.title.setTitle(title);
    this.setName('description', description);
    this.setName(
      'robots',
      page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    );

    this.setProperty('og:type', page.type ?? 'website');
    this.setProperty('og:site_name', SITE.name);
    this.setProperty('og:locale', SITE.seo.locale);
    this.setProperty('og:title', title);
    this.setProperty('og:description', description);
    this.setProperty('og:url', url);
    this.setProperty('og:image', image);
    this.setProperty('og:image:width', '1200');
    this.setProperty('og:image:height', '630');

    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', title);
    this.setName('twitter:description', description);
    this.setName('twitter:image', image);

    this.setCanonical(url);
  }

  /** Dodaje ili zamjenjuje JSON-LD blok s danim identifikatorom. */
  setJsonLd(id: string, data: object | object[]): void {
    const head = this.document.head;
    const scriptId = `ld-${id}`;
    let script = head.querySelector<HTMLScriptElement>(`script#${scriptId}`);
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      head.appendChild(script);
    }
    // Sprječava zatvaranje <script> taga iz sadržaja
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  }

  removeJsonLd(id: string): void {
    this.document.head.querySelector(`script#ld-${id}`)?.remove();
  }

  absoluteUrl(path: string): string {
    if (/^https?:\/\//.test(path)) return path;
    return SITE.url + (path.startsWith('/') ? path : `/${path}`);
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }
}
