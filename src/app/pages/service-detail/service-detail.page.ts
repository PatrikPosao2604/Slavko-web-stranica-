import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHONE_HREF, SITE } from '../../core/config/site.config';
import { SERVICES, findService } from '../../core/data/services.data';
import { SeoService } from '../../core/services/seo.service';
import { breadcrumbSchema, serviceSchema } from '../../core/services/structured-data';
import { CtaComponent } from '../../components/cta/cta.component';
import { ProcessComponent } from '../../components/process/process.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ResponsiveImageComponent } from '../../shared/components/responsive-image/responsive-image.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { NotFoundPage } from '../not-found/not-found.page';

@Component({
  selector: 'app-service-detail-page',
  imports: [
    RouterLink,
    IconComponent,
    PageHeroComponent,
    ResponsiveImageComponent,
    RevealDirective,
    ProcessComponent,
    CtaComponent,
    NotFoundPage,
  ],
  templateUrl: './service-detail.page.html',
  styleUrl: './service-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDetailPage {
  private readonly seo = inject(SeoService);

  /** Parametar rute (:slug) – povezan preko withComponentInputBinding */
  readonly slug = input<string>();

  protected readonly service = computed(() => findService(this.slug()));
  protected readonly others = computed(() =>
    SERVICES.filter((s) => s.slug !== this.slug()).slice(0, 4),
  );
  protected readonly phoneHref = PHONE_HREF;
  protected readonly site = SITE;

  constructor() {
    effect(() => {
      const s = this.service();
      if (!s) {
        this.seo.setPage({
          title: 'Stranica nije pronađena',
          path: `/usluge/${this.slug()}`,
          noindex: true,
        });
        this.seo.removeJsonLd('service');
        this.seo.removeJsonLd('breadcrumb');
        return;
      }
      this.seo.setPage({
        title: s.title,
        description: `${s.short} ${SITE.name} – specijalizirani servis dizni i Common Rail injektora.`,
        path: `/usluge/${s.slug}`,
      });
      this.seo.setJsonLd('service', serviceSchema(s));
      this.seo.setJsonLd(
        'breadcrumb',
        breadcrumbSchema([
          { name: 'Početna', path: '/' },
          { name: 'Usluge', path: '/#usluge' },
          { name: s.title, path: `/usluge/${s.slug}` },
        ]),
      );
    });

    inject(DestroyRef).onDestroy(() => {
      this.seo.removeJsonLd('service');
      this.seo.removeJsonLd('breadcrumb');
    });
  }
}
