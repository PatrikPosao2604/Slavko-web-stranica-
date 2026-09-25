import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  EMISSION_COMPARE,
  EMISSION_RANGE,
  EMISSION_SCENARIO,
  NOP_MDP,
  TEST_POINTS,
} from '../../core/data/content.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/** Skala mjerne trake – 5 mm³ prostora ispod i iznad tolerancije. */
const SCALE_MIN = EMISSION_RANGE.min - 5;
const SCALE_MAX = EMISSION_RANGE.max + 5;
const pct = (v: number) => ((v - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;

@Component({
  selector: 'app-emission',
  imports: [IconComponent, SectionHeadingComponent, RevealDirective],
  template: `
    <section id="emisija" class="section emission" aria-labelledby="emisija-title">
      <div class="emission__bg grid-bg" aria-hidden="true"></div>
      <div class="container">
        <app-section-heading
          eyebrow="Emisija · NOP · MDP"
          index="03"
          title="Pali bez ključa. Šapuće na leru. Spašava kad zagusti."
          headingId="emisija-title"
          lead="Većina servisa nakon reparacije gleda samo paljenje i prazni hod – i tu dijagnostika pokazuje da je sve u redu. Vrh kvalitete je ono što se ne vidi na prvu: visoka emisija, točka punog opterećenja koja odlučuje ima li motor snage u trenutku kada vam zatreba."
        />

        <!-- Tri radne točke testa -->
        <ol class="points">
          @for (p of points; track p.code; let i = $index) {
            <li class="point" [class.point--hot]="p.highlight" appReveal [appRevealDelay]="i * 90">
              <div class="point__head">
                <span class="point__icon"><app-icon [name]="p.icon" [size]="24" /></span>
                <span class="point__code mono">{{ p.code }}</span>
              </div>
              <p class="point__motto">{{ p.motto }}</p>
              <h3 class="point__title mono">{{ p.title }}</h3>
              <p class="point__text">{{ p.text }}</p>
            </li>
          }
        </ol>

        <!-- Usporedba emisije -->
        <div class="meter" appReveal appRevealVariant="fade">
          <div class="meter__intro">
            <p class="eyebrow">Test emisije · primjer</p>
            <h3 class="meter__title">
              Isti test. Isti „prolaz“.<br /><span class="accent">Potpuno drugi auto.</span>
            </h3>
            <p class="meter__lead">
              Tolerancija za jedan tip injektora je npr. {{ range.min }}–{{ range.max }} mm³. Na
              {{ compare[0].value }} mm³ injektor prolazi test – ali igla se nikad neće podići više
              nego što je namješteno. Mi ciljamo gornji dio raspona. Vozač to ne zna, mnogi
              mehaničari to ne znaju, a dijagnostika na vozilu to ne može očitati.
            </p>
          </div>

          <div class="meter__rows">
            @for (c of compare; track c.label) {
              <div class="bar" [class.bar--best]="c.best" [style.--pos]="pos(c.value) + '%'">
                <div class="bar__label">
                  <span>{{ c.label }}</span>
                  <span class="bar__value mono">{{ c.value }} <small>mm³</small></span>
                </div>
                <div
                  class="bar__track"
                  role="img"
                  [attr.aria-label]="
                    c.label +
                    ': ' +
                    c.value +
                    ' mm³ unutar tolerancije ' +
                    range.min +
                    '–' +
                    range.max +
                    ' mm³'
                  "
                >
                  <span
                    class="bar__zone"
                    [style.left.%]="zoneLeft"
                    [style.width.%]="zoneWidth"
                  ></span>
                  <span class="bar__fill"></span>
                  <span class="bar__needle"></span>
                </div>
                <p class="bar__verdict">{{ c.verdict }}</p>
              </div>
            }
            <div class="scale mono" aria-hidden="true">
              @for (t of ticks; track t) {
                <span [style.left.%]="pos(t)">{{ t }}</span>
              }
            </div>
            <p class="meter__note">
              Vrijednosti su ilustrativne – stvarne ovise o tipu injektora i testnom planu.
            </p>
          </div>
        </div>

        <!-- Scenarij -->
        <div class="scenario">
          <p class="eyebrow">Kad se sekunde broje</p>
          <ol class="scenario__list">
            @for (s of scenario; track s.time; let i = $index; let last = $last) {
              <li
                class="scenario__step"
                [class.scenario__step--last]="last"
                appReveal
                [appRevealDelay]="i * 120"
              >
                <span class="scenario__time mono">{{ s.time }}</span>
                <p>{{ s.text }}</p>
              </li>
            }
          </ol>
        </div>

        <!-- NOP i MDP -->
        <div class="nm">
          <div class="nm__intro" appReveal>
            <p class="eyebrow eyebrow--measure">Mjerenja koja drugi preskaču</p>
            <h3 class="nm__title">NOP i MDP</h3>
            <p>
              Testni stol nudi i ova dva mjerenja – ali se plaćaju zasebno, po injektoru. Injektor
              lako prođe sve ostale točke, a onda padne na NOP ili MDP i sve kreće ispočetka. Mi ih
              ne preskačemo.
            </p>
          </div>
          <ul class="nm__grid">
            @for (n of nopMdp; track n.code; let i = $index) {
              <li class="nm__card" appReveal [appRevealDelay]="i * 90">
                <span class="nm__code mono">{{ n.code }}</span>
                <span class="nm__name mono">{{ n.name }}</span>
                <h4 class="nm__card-title">{{ n.title }}</h4>
                <p>{{ n.text }}</p>
              </li>
            }
          </ul>
          <div class="nm__cost" appReveal>
            <div class="nm__cost-math mono">
              <span>4 injektora</span><span>×</span><span>(5 € NOP + 5 € MDP)</span><span>=</span
              ><strong>20 €</strong>
            </div>
            <p>
              Dodatni trošak i dodatno vrijeme samo za dva mjerenja – jer tek kad injektor prođe i
              njih, znamo da je zaista ispravan.
            </p>
          </div>
        </div>

        <!-- Tesa i citat -->
        <div class="finale">
          <div class="tesa" appReveal>
            <span class="tesa__icon"><app-icon name="target" [size]="30" [stroke]="1.4" /></span>
            <p class="tesa__big">Par mikrona<br /><span class="accent">radi čuda.</span></p>
            <p>
              Mjerimo švicarskim <strong>Tesa</strong> komparatorima – svjetski broj 1 u preciznom
              mjerenju. U radionici ih imamo više od deset. Da se injektor „upuca“, treba složiti
              sve staze, jednu po jednu. To uzima vremena – i upravo zato radi.
            </p>
          </div>
          <figure class="quote" appReveal [appRevealDelay]="120">
            <blockquote>
              <p>
                „Mora paliti bez ključa, mora šaputati na leru. A kad se, ne daj Bože, nađete u
                nevolji i stisnete gas do poda –
                <span class="accent">sjetit ćete me se.</span>“
              </p>
            </blockquote>
            <figcaption class="mono">— Slavko Miškulin</figcaption>
          </figure>
        </div>
      </div>
    </section>
  `,
  styleUrl: './emission.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmissionComponent {
  protected readonly points = TEST_POINTS;
  protected readonly compare = EMISSION_COMPARE;
  protected readonly scenario = EMISSION_SCENARIO;
  protected readonly nopMdp = NOP_MDP;
  protected readonly range = EMISSION_RANGE;
  protected readonly zoneLeft = pct(EMISSION_RANGE.min);
  protected readonly zoneWidth = pct(EMISSION_RANGE.max) - pct(EMISSION_RANGE.min);
  protected readonly ticks = [SCALE_MIN, EMISSION_RANGE.min, 25, 30, EMISSION_RANGE.max, SCALE_MAX];
  protected readonly pos = pct;
}
