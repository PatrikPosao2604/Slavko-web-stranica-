import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BRANDS } from '../../core/data/content.data';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * Podržani / kompatibilni sustavi. Nazivi su prikazani tekstualno
 * (bez službenih logotipa) i uz jasnu napomenu da servis nije ovlašteni partner.
 */
@Component({
  selector: 'app-brands',
  imports: [SectionHeadingComponent, RevealDirective],
  template: `
    <section class="section brands" aria-labelledby="brands-title">
      <div class="container">
        <app-section-heading
          eyebrow="Podržani sustavi"
          index="09"
          title="Kompatibilni sustavi ubrizgavanja"
          headingId="brands-title"
          align="center"
          lead="Servisiramo injektore i komponente sustava ubrizgavanja vodećih proizvođača – za osobna, dostavna i gospodarska vozila."
        />

        <ul class="brands__grid">
          @for (b of brands; track b.name; let i = $index) {
            <li class="brand" appReveal [appRevealDelay]="i * 60">
              <span class="brand__name">{{ b.name }}</span>
              <span class="brand__note mono">{{ b.note }}</span>
            </li>
          }
        </ul>

        <p class="brands__disclaimer" appReveal>
          Nismo ovlašteni servis navedenih proizvođača. Nazivi i zaštitni znakovi pripadaju njihovim
          vlasnicima i koriste se isključivo za označavanje kompatibilnih sustava.
        </p>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .brands__grid {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      border-top: 1px solid var(--c-line);
      border-left: 1px solid var(--c-line);

      @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (min-width: 1100px) {
        grid-template-columns: repeat(5, 1fr);
      }
    }
    .brand {
      position: relative;
      display: grid;
      place-items: center;
      gap: 0.6rem;
      min-height: clamp(8rem, 14vw, 11rem);
      padding: 1.5rem 1rem;
      text-align: center;
      border-right: 1px solid var(--c-line);
      border-bottom: 1px solid var(--c-line);
      overflow: hidden;
      transition: background 0.4s var(--ease-out);

      &::after {
        content: '';
        position: absolute;
        inset: auto 0 0;
        height: 2px;
        background: var(--c-accent);
        transform: scaleX(0);
        transition: transform 0.5s var(--ease-out);
      }

      &:hover {
        background: var(--c-surface);

        &::after {
          transform: scaleX(1);
        }

        .brand__name {
          color: var(--c-text);
        }
      }

      &:last-child:nth-child(odd) {
        @media (max-width: 767px) {
          grid-column: span 2;
        }
      }
    }
    .brand__name {
      font-family: var(--ff-display);
      font-weight: 700;
      font-size: clamp(1.6rem, 1.2rem + 1.4vw, 2.3rem);
      letter-spacing: 0.08em;
      line-height: 1;
      color: var(--c-steel);
      transition: color 0.3s;
    }
    .brand__note {
      font-size: 0.66rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--c-text-dim);
    }
    .brands__disclaimer {
      max-width: 44rem;
      margin: 2rem auto 0;
      font-size: 0.82rem;
      text-align: center;
      color: var(--c-text-dim);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsComponent {
  protected readonly brands = BRANDS;
}
