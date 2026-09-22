import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHONE_HREF, SITE } from '../../core/config/site.config';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ResponsiveImageComponent } from '../../shared/components/responsive-image/responsive-image.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-cta',
  imports: [RouterLink, IconComponent, ResponsiveImageComponent, RevealDirective],
  template: `
    <section class="cta" aria-labelledby="cta-title">
      <div class="container">
        <div class="cta__box" appReveal appRevealVariant="image">
          <app-img key="hero" class="cta__img" sizes="100vw" [decorative]="true" />
          <div class="cta__shade" aria-hidden="true"></div>
          <div class="cta__content">
            <p class="eyebrow">Stručna procjena</p>
            <h2 id="cta-title" class="cta__title">
              Imate problem<br />s diznama<span class="accent">?</span>
            </h2>
            <p class="cta__text">
              Pošaljite nam podatke o vozilu i opis problema. Naš tim će procijeniti koji je
              najbolji sljedeći korak.
            </p>
            <div class="cta__actions">
              <a class="btn btn--primary" routerLink="/" fragment="kontakt">
                Pošalji upit <app-icon name="arrow-right" [size]="18" class="btn__arrow" />
              </a>
              <a class="btn btn--ghost" [href]="phoneHref">
                <app-icon name="phone" [size]="18" /> Nazovi nas
              </a>
            </div>
            <p class="cta__phone mono">{{ site.contact.phoneDisplay }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .cta {
      padding-block: var(--section-y) 0;
    }
    .cta__box {
      position: relative;
      min-height: clamp(30rem, 55vw, 38rem);
      display: flex;
      align-items: center;
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--c-line);
      isolation: isolate;
    }
    .cta__img {
      position: absolute;
      inset: 0;
      z-index: -2;
      --img-position: 70% 50%;
    }
    .cta__shade {
      position: absolute;
      inset: 0;
      z-index: -1;
      background:
        radial-gradient(60% 90% at 0% 100%, rgba(255, 90, 31, 0.35), transparent 60%),
        linear-gradient(
          90deg,
          rgba(11, 12, 14, 0.95) 0%,
          rgba(11, 12, 14, 0.8) 45%,
          rgba(11, 12, 14, 0.2) 100%
        );

      @media (max-width: 767px) {
        background:
          radial-gradient(90% 60% at 0% 100%, rgba(255, 90, 31, 0.3), transparent 60%),
          linear-gradient(180deg, rgba(11, 12, 14, 0.6), rgba(11, 12, 14, 0.92));
      }
    }
    .cta__content {
      padding: clamp(2rem, 6vw, 5rem);
      max-width: 44rem;
    }
    .cta__title {
      margin-top: 1.25rem;
      font-size: clamp(3rem, 1.5rem + 6vw, 7rem);
      line-height: 0.88;
    }
    .cta__text {
      margin-top: 1.5rem;
      font-size: var(--fs-lead);
      color: var(--c-text-muted);
      max-width: 34rem;
    }
    .cta__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 2.25rem;

      @media (max-width: 479px) {
        .btn {
          flex: 1 1 100%;
        }
      }
    }
    .cta__phone {
      margin-top: 1.25rem;
      font-size: 0.85rem;
      color: var(--c-text-dim);
      letter-spacing: 0.06em;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaComponent {
  protected readonly site = SITE;
  protected readonly phoneHref = PHONE_HREF;
}
