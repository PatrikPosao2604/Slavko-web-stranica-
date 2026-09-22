import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../core/config/site.config';
import { SeoService } from '../../core/services/seo.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';

/**
 * Politika kolačića. Stranica trenutno NE koristi analitičke ni marketinške
 * kolačiće. Ako ih dodate (npr. Google Analytics), ažurirajte ovu stranicu
 * i dodajte banner za privolu.
 */
@Component({
  selector: 'app-cookies-page',
  imports: [PageHeroComponent, RouterLink],
  template: `
    <app-page-hero
      title="Politika kolačića"
      eyebrow="Pravne informacije"
      [crumbs]="[{ label: 'Početna', path: '/' }, { label: 'Politika kolačića' }]"
    />
    <section class="section">
      <div class="container prose">
        <p>
          Kolačići su male tekstualne datoteke koje web stranica sprema u vaš preglednik. Ova
          stranica je izrađena tako da prikuplja što manje podataka.
        </p>

        <h2>Koje kolačiće koristimo</h2>
        <p>
          <strong>Stranica ne koristi analitičke ni marketinške kolačiće</strong> i ne prati vaše
          kretanje po stranici. Fontovi i sav sadržaj učitavaju se s našeg poslužitelja.
        </p>

        <h2>Sadržaj trećih strana</h2>
        <p>
          Google Maps karta u kontakt sekciji učitava se isključivo nakon vašeg klika na „Prikaži
          kartu“. Tek tada Google može postaviti vlastite kolačiće. Ako kartu ne učitate, nikakvi
          podaci se ne šalju Googleu.
        </p>

        <h2>Upravljanje kolačićima</h2>
        <p>
          Kolačiće možete u svakom trenutku obrisati ili blokirati u postavkama svog preglednika.
        </p>

        <p>
          Više o obradi osobnih podataka pročitajte u
          <a routerLink="/pravila-privatnosti">pravilima privatnosti</a>.
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookiesPage {
  constructor() {
    inject(SeoService).setPage({
      title: 'Politika kolačića',
      description: `Informacije o kolačićima na web stranici – ${SITE.name}.`,
      path: '/kolacici',
    });
  }
}
