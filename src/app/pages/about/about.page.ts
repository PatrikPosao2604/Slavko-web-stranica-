import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../core/config/site.config';
import { SeoService } from '../../core/services/seo.service';
import { CtaComponent } from '../../components/cta/cta.component';
import { UspComponent } from '../../components/usp/usp.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { IconName } from '../../shared/components/icon/icons';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ResponsiveImageComponent } from '../../shared/components/responsive-image/responsive-image.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about-page',
  imports: [
    RouterLink,
    IconComponent,
    PageHeroComponent,
    ResponsiveImageComponent,
    RevealDirective,
    UspComponent,
    CtaComponent,
  ],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  protected readonly site = SITE;

  protected readonly principles: { icon: IconName; title: string; text: string }[] = [
    {
      icon: 'gauge',
      title: 'Mjerenje umjesto pretpostavke',
      text: 'Odluke donosimo na temelju izmjerenih vrijednosti. Dizna koja je ispravna ne mijenja se samo zato što je „na redu“.',
    },
    {
      icon: 'search',
      title: 'Transparentnost',
      text: 'Prije zahvata objašnjavamo što je izmjereno, što predlažemo i koliko to košta. Bez skrivenih radova.',
    },
    {
      icon: 'file',
      title: 'Dokumentiran rad',
      text: 'Uz reparirane injektore dobivate izvještaj s ulaznim i izlaznim vrijednostima testiranja.',
    },
    {
      icon: 'shield',
      title: 'Odgovornost za rad',
      text: 'Stojimo iza svakog zahvata – na obavljeni rad i ugrađene dijelove dajemo jamstvo.',
    },
  ];

  constructor() {
    inject(SeoService).setPage({
      title: 'O nama',
      description: `${SITE.name} – specijalizirani servis za dijagnostiku, testiranje i reparaciju dizni i Common Rail injektora. Upoznajte naš način rada.`,
      path: '/o-nama',
    });
  }
}
