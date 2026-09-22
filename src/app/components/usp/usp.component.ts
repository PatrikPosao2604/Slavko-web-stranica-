import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../core/config/site.config';
import { USPS } from '../../core/data/content.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CountUpDirective } from '../../shared/directives/count-up.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-usp',
  imports: [IconComponent, RevealDirective, CountUpDirective],
  template: `
    <section class="usp" aria-labelledby="usp-title">
      <div class="container">
        <div class="usp__intro" appReveal>
          <h2 id="usp-title" class="usp__title">
            Specijalizirani<br />za ubrizgavanje<span class="accent">.</span>
          </h2>
          <p class="lead">
            Ne radimo sve na vozilu – radimo jednu stvar temeljito. Dizne, injektori i visokotlačne
            pumpe traže preciznu opremu, iskustvo i kontrolu nakon svakog zahvata.
          </p>
        </div>

        <ul class="usp__grid">
          @for (u of usps; track u.title; let i = $index) {
            <li class="usp__card" appReveal [appRevealDelay]="i * 70">
              <span class="usp__icon"><app-icon [name]="u.icon" [size]="30" [stroke]="1.4" /></span>
              <h3 class="usp__card-title">{{ u.title }}</h3>
              <p>{{ u.text }}</p>
            </li>
          }
        </ul>

        @if (stats.length) {
          <!-- PLACEHOLDER brojke – vrijednosti se postavljaju u site.config.ts -->
          <dl class="usp__stats" appReveal>
            @for (s of stats; track s.label) {
              <div class="usp__stat">
                <dt class="visually-hidden">{{ s.label }}</dt>
                <dd>
                  <span class="usp__num">
                    @if (s.prefix) {
                      <span class="accent">{{ s.prefix }}</span>
                    }
                    <span [appCountUp]="s.value">{{ s.value }}</span>
                    @if (s.suffix) {
                      <span class="accent">{{ s.suffix }}</span>
                    }
                  </span>
                  <span class="usp__label" aria-hidden="true">{{ s.label }}</span>
                </dd>
              </div>
            }
          </dl>
        }
      </div>
    </section>
  `,
  styleUrl: './usp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UspComponent {
  protected readonly usps = USPS;
  protected readonly stats = SITE.stats;
}
