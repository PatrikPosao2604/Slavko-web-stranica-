import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EMAIL_HREF, FULL_ADDRESS, SITE } from '../../core/config/site.config';
import { SeoService } from '../../core/services/seo.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';

/**
 * Predložak pravila privatnosti. PRIJE OBJAVE provjerite sadržaj s pravnim
 * savjetnikom i uskladite ga sa stvarnim načinom obrade podataka.
 */
@Component({
  selector: 'app-privacy-page',
  imports: [PageHeroComponent],
  template: `
    <app-page-hero
      title="Pravila privatnosti"
      eyebrow="Pravne informacije"
      [crumbs]="[{ label: 'Početna', path: '/' }, { label: 'Pravila privatnosti' }]"
    />
    <section class="section">
      <div class="container prose">
        <p>
          Ovim pravilima opisujemo kako {{ site.legalName }} ({{ address }}) prikuplja i obrađuje
          osobne podatke posjetitelja web stranice, sukladno Općoj uredbi o zaštiti podataka (GDPR).
        </p>

        <h2>Voditelj obrade</h2>
        <p>
          {{ site.legalName }}, {{ address }}. Kontakt za pitanja o zaštiti podataka:
          <a [href]="emailHref">{{ site.contact.email }}</a
          >.
        </p>

        <h2>Koje podatke prikupljamo</h2>
        <ul>
          <li>
            podatke koje sami unesete u kontakt formu: ime i prezime, telefon, e-mail, podatke o
            vozilu i opis problema;
          </li>
          <li>datoteke koje priložite uz upit (fotografije, dokumenti);</li>
          <li>tehničke podatke nužne za rad stranice (npr. IP adresa u zapisima poslužitelja).</li>
        </ul>

        <h2>Svrha i pravna osnova</h2>
        <p>
          Podatke iz kontakt forme koristimo isključivo za odgovor na vaš upit i pripremu ponude
          (predugovorne radnje, čl. 6. st. 1. t. b GDPR-a) te na temelju vaše privole.
        </p>

        <h2>Rok čuvanja</h2>
        <p>
          Podatke iz upita čuvamo onoliko dugo koliko je potrebno za obradu upita, odnosno dok to
          zahtijevaju zakonske obveze ako dođe do sklapanja ugovora.
        </p>

        <h2>Primatelji podataka</h2>
        <p>
          Podatke ne prodajemo niti ustupamo trećim stranama u marketinške svrhe. Mogu ih obrađivati
          isključivo pružatelji usluga koji nam omogućuju rad stranice i e-pošte (izvršitelji
          obrade).
        </p>

        <h2>Vaša prava</h2>
        <p>
          Imate pravo na pristup, ispravak, brisanje i ograničenje obrade podataka, pravo na
          prigovor te pravo povući privolu u bilo kojem trenutku. Prigovor možete podnijeti i
          Agenciji za zaštitu osobnih podataka (AZOP).
        </p>

        <h2>Google Maps</h2>
        <p>
          Karta na stranici učitava se tek kada kliknete „Prikaži kartu“. Tada se uspostavlja veza s
          poslužiteljima tvrtke Google, koja može obrađivati vaše podatke sukladno vlastitim
          pravilima privatnosti.
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPage {
  protected readonly site = SITE;
  protected readonly address = FULL_ADDRESS;
  protected readonly emailHref = EMAIL_HREF;

  constructor() {
    inject(SeoService).setPage({
      title: 'Pravila privatnosti',
      description: `Pravila privatnosti i zaštite osobnih podataka – ${SITE.name}.`,
      path: '/pravila-privatnosti',
    });
  }
}
