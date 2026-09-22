import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, IconComponent],
  template: `
    <section class="nf">
      <div class="container nf__inner">
        <p class="nf__code mono">404</p>
        <h1 class="nf__title">Stranica nije pronađena</h1>
        <p class="lead">
          Stranica koju tražite ne postoji ili je premještena. Vratite se na početnu ili nam
          pošaljite upit.
        </p>
        <div class="nf__actions">
          <a class="btn btn--primary" routerLink="/">
            Na početnu <app-icon name="arrow-right" [size]="18" class="btn__arrow" />
          </a>
          <a class="btn btn--ghost" routerLink="/" fragment="kontakt">Kontakt</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .nf {
      min-height: 80vh;
      display: flex;
      align-items: center;
      padding: calc(var(--header-h) + 4rem) 0 6rem;
      background: radial-gradient(60% 50% at 80% 30%, rgba(255, 90, 31, 0.1), transparent 70%);
    }
    .nf__code {
      font-size: clamp(5rem, 20vw, 12rem);
      line-height: 1;
      color: transparent;
      -webkit-text-stroke: 1px var(--c-line-strong);
    }
    .nf__title {
      font-size: var(--fs-h1);
      margin: 1rem 0 1.5rem;
    }
    .nf__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 2rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  constructor() {
    const router = inject(Router);
    inject(SeoService).setPage({
      title: 'Stranica nije pronađena',
      path: router.url,
      noindex: true,
    });
  }
}
