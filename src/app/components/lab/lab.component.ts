import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LAB_DEVICES, LAB_PILLARS, LAB_STANDARD } from '../../core/data/content.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ResponsiveImageComponent } from '../../shared/components/responsive-image/responsive-image.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-lab',
  imports: [IconComponent, ResponsiveImageComponent, SectionHeadingComponent, RevealDirective],
  template: `
    <section id="dijagnostika" class="section lab" aria-labelledby="lab-title">
      <div class="container">
        <app-section-heading
          eyebrow="Referentna dijagnostika"
          index="04"
          title="Zlatni standard. Mehanika, struja i odziv – svaki posebno."
          headingId="lab-title"
          lead="Ne oslanjamo se na osnovno mjerenje otpora, vizualni pregled ili pretpostavke. Mehanički dio, električni dio i odziv aktuatora provjeravamo odvojeno, vrhunskom opremom – precizno mjerenje, ponovljivi rezultati i jasan uvid u stvarno stanje injektora prije završnog testa."
        />

        <ol class="pillars">
          @for (p of pillars; track p.device; let i = $index) {
            <li class="pillar" appReveal [appRevealDelay]="i * 90">
              <span class="pillar__num mono">0{{ i + 1 }}</span>
              <span class="pillar__icon"><app-icon [name]="p.icon" [size]="24" /></span>
              <span class="pillar__area mono">{{ p.area }}</span>
              <h3 class="pillar__device">{{ p.device }}</h3>
              <p>{{ p.text }}</p>
            </li>
          }
        </ol>

        <div class="devices">
          <figure class="devices__photo" appReveal appRevealVariant="image">
            <app-img
              key="injectorTesterScreen"
              sizes="(min-width: 1024px) 34vw, 100vw"
              class="devices__img"
            />
            <figcaption>
              Open System Mega Tester V4 i Valve Tester V1 s V2 softverom – oprema za električnu i
              funkcionalnu dijagnostiku piezo i solenoidnih common-rail injektora.
            </figcaption>
          </figure>

          <div class="devices__list">
            @for (d of devices; track d.name; let i = $index) {
              <article class="device" appReveal [appRevealDelay]="i * 90">
                <header class="device__head">
                  <div>
                    <span class="device__maker mono">{{ d.maker }}</span>
                    <h3 class="device__name">{{ d.name }}</h3>
                  </div>
                  <span class="device__badge mono">{{ d.badge }}</span>
                </header>
                <p class="device__intro">{{ d.intro }}</p>
                <ul class="device__checks">
                  @for (c of d.checks; track c) {
                    <li><app-icon name="check" [size]="16" [stroke]="2.2" />{{ c }}</li>
                  }
                </ul>
                <p class="device__note">{{ d.note }}</p>
              </article>
            }
          </div>
        </div>

        <div class="standard" appReveal>
          <div class="standard__intro">
            <p class="eyebrow">Naš standard rada</p>
            <p class="standard__big">
              „Prošao test“ nije dovoljno.<br /><span class="accent"
                >Mjerimo – ne procjenjujemo.</span
              >
            </p>
            <p>
              Cilj je potvrditi da su električni dio, aktuator, unutarnji zazori i funkcionalni
              odziv međusobno usklađeni – da se injektor ne vrati u vozilo s kvarom koji bi se
              pojavio tek u vožnji.
            </p>
          </div>
          <ol class="standard__steps">
            @for (s of standard; track s; let i = $index) {
              <li>
                <span class="mono">{{ (i + 1).toString().padStart(2, '0') }}</span
                >{{ s }}
              </li>
            }
          </ol>
        </div>
      </div>
    </section>
  `,
  styleUrl: './lab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabComponent {
  protected readonly pillars = LAB_PILLARS;
  protected readonly devices = LAB_DEVICES;
  protected readonly standard = LAB_STANDARD;
}
