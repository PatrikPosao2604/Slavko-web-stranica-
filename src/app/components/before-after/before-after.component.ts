import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IMAGES } from '../../core/config/images.config';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ResponsiveImageComponent } from '../../shared/components/responsive-image/responsive-image.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * Interaktivna usporedba prije/poslije.
 * Koristi nativni <input type="range"> preko cijele slike – radi mišem,
 * dodirom i tipkovnicom (strelice, Home/End) bez dodatnog JS-a za drag.
 */
@Component({
  selector: 'app-before-after',
  imports: [SectionHeadingComponent, ResponsiveImageComponent, RevealDirective],
  template: `
    <section class="section section--alt ba" aria-labelledby="ba-title">
      <div class="container">
        <div class="ba__head">
          <app-section-heading
            eyebrow="Prije / poslije"
            index="08"
            title="Razlika koja se vidi – i mjeri"
            headingId="ba-title"
            lead="Naslage karbona na vrhu dizne mijenjaju oblik mlaza i uzrokuju lošije izgaranje. Povucite klizač i usporedite stanje prije i nakon reparacije."
          />
        </div>

        <figure class="ba__frame" appReveal appRevealVariant="image" [style.--p]="position() / 100">
          <app-img key="after" class="ba__img" sizes="(min-width: 1344px) 1300px, 100vw" />
          <div class="ba__before" aria-hidden="true">
            <app-img
              key="before"
              class="ba__img"
              sizes="(min-width: 1344px) 1300px, 100vw"
              [decorative]="true"
            />
          </div>

          <span class="ba__tag ba__tag--before mono">Prije reparacije</span>
          <span class="ba__tag ba__tag--after mono">Nakon reparacije</span>

          <span class="ba__handle" aria-hidden="true">
            <span class="ba__knob">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </span>
          </span>

          <input
            type="range"
            class="ba__range"
            min="0"
            max="100"
            step="1"
            [value]="position()"
            (input)="onInput($event)"
            aria-label="Usporedba prije i nakon reparacije – pomaknite za prikaz"
            [attr.aria-valuetext]="position() + '% prikazano stanje prije reparacije'"
          />

          <figcaption class="visually-hidden">{{ before.alt }}. {{ after.alt }}.</figcaption>
        </figure>

        <dl class="ba__facts">
          <div appReveal>
            <dt class="mono">Prije</dt>
            <dd>Naslage oko mlaznih otvora, nepravilan mlaz, povećan povrat i korekcije.</dd>
          </div>
          <div appReveal [appRevealDelay]="80">
            <dt class="mono">Postupak</dt>
            <dd>Ultrazvučno čišćenje, zamjena istrošenih dijelova i podešavanje.</dd>
          </div>
          <div appReveal [appRevealDelay]="160">
            <dt class="mono accent">Poslije</dt>
            <dd>Čisti otvori, pravilan mlaz i vrijednosti unutar tolerancije na testu.</dd>
          </div>
        </dl>
      </div>
    </section>
  `,
  styleUrl: './before-after.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeforeAfterComponent {
  protected readonly position = signal(50);
  protected readonly before = IMAGES.before;
  protected readonly after = IMAGES.after;

  onInput(event: Event): void {
    this.position.set(Number((event.target as HTMLInputElement).value));
  }
}
