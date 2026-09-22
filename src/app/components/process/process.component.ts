import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROCESS_STEPS } from '../../core/data/content.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-process',
  imports: [IconComponent, SectionHeadingComponent, RevealDirective],
  template: `
    <section id="kako-radimo" class="section process" aria-labelledby="proces-title">
      <div class="process__bg grid-bg" aria-hidden="true"></div>
      <div class="container">
        <app-section-heading
          eyebrow="Kako radimo"
          index="02"
          title="Pet koraka do pouzdanog motora"
          headingId="proces-title"
          lead="Jasan i provjerljiv postupak. Svaka odluka temelji se na izmjerenim vrijednostima, a vi u svakom koraku znate što se radi i zašto."
        />

        <div class="process__timeline" appReveal appRevealVariant="fade">
          <span class="process__track" aria-hidden="true"
            ><span class="process__progress"></span
          ></span>
          <ol class="process__list">
            @for (step of steps; track step.number; let i = $index) {
              <li class="step" [class.step--measure]="i === 2 || i === 4" [style.--i]="i">
                <div class="step__node">
                  <span class="step__num mono">{{ step.number }}</span>
                </div>
                <div class="step__body">
                  <span class="step__icon"><app-icon [name]="step.icon" [size]="22" /></span>
                  <h3 class="step__title">{{ step.title }}</h3>
                  <p class="step__text">{{ step.text }}</p>
                  @if (i === 2 || i === 4) {
                    <span class="step__tag mono">Mjerenje na testnom stolu</span>
                  }
                </div>
              </li>
            }
          </ol>
        </div>

        <aside class="process__note" appReveal>
          <span class="process__note-icon"
            ><app-icon name="gauge" [size]="28" [stroke]="1.4"
          /></span>
          <div>
            <p class="process__note-title">Bez završnog testa nema predaje.</p>
            <p>
              Nakon reparacije svaki injektor ponovno ide na testni stol. Tek kada su količina
              ubrizgavanja, povrat i nepropusnost unutar dopuštenih odstupanja, injektor dobiva novi
              korekcijski kod i vraća se u vozilo. Rezultate dobivate u pisanom izvještaju.
            </p>
          </div>
        </aside>
      </div>
    </section>
  `,
  styleUrl: './process.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessComponent {
  protected readonly steps = PROCESS_STEPS;
}
