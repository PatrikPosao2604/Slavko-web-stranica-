import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BENCH_MACHINES, REPORT_PAGES } from '../../core/data/content.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ResponsiveImageComponent } from '../../shared/components/responsive-image/responsive-image.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-bench',
  imports: [IconComponent, ResponsiveImageComponent, SectionHeadingComponent, RevealDirective],
  template: `
    <section id="testni-stolovi" class="section bench" aria-labelledby="bench-title">
      <div class="bench__bg grid-bg" aria-hidden="true"></div>
      <div class="container">
        <app-section-heading
          eyebrow="Bosch DCI 200 + Hartridge Sabre CRi Expert"
          index="05"
          title="Ne mjerimo samo koliko. Mjerimo kada, kako brzo i koliko precizno."
          headingId="bench-title"
          lead="Kod nas se common-rail injektor ne provjerava samo po količini goriva. Testira se kompletan radni profil – od visokog tlaka do 2700 bara, preko povrata i nepropusnosti, do odziva, višetočkastih količina i korekcijskog koda za ECU."
        />

        <!-- Dva stroja -->
        <div class="machines">
          @for (m of machines; track m.name; let i = $index) {
            <article class="machine" appReveal [appRevealDelay]="i * 100">
              <div class="machine__media">
                <app-img
                  [key]="m.image"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  class="machine__img"
                />
                <div class="machine__stat">
                  <span class="machine__stat-num">{{ m.stat }}</span>
                  <span class="machine__stat-label mono">{{ m.statLabel }}</span>
                </div>
              </div>
              <div class="machine__body">
                <span class="machine__role mono">{{ m.role }}</span>
                <h3 class="machine__name">
                  <span class="machine__maker">{{ m.maker }}</span> {{ m.name }}
                </h3>
                @for (t of m.text; track $index) {
                  <p class="machine__text">{{ t }}</p>
                }
                <ul class="machine__checks">
                  @for (c of m.checks; track c) {
                    <li><app-icon name="check" [size]="16" [stroke]="2.2" />{{ c }}</li>
                  }
                </ul>
              </div>
            </article>
          }
        </div>

        <!-- Pravo pitanje -->
        <div class="question" appReveal>
          <p class="question__lead">
            Injektor može na jednostavnom testu imati dobru količinu goriva, a u vozilu ipak
            stvarati problem – ako kasni s otvaranjem, sporo reagira, ima prevelik povrat ili ne
            drži ponašanje pri promjeni tlaka i kratkim impulsima. Posljedica: težak start,
            neravnomjeran ler, dim, veća potrošnja, lupanje ili greška sustava. Zato nije dovoljno
            reći „injektor baca gorivo“. Pravo pitanje je:
          </p>
          <p class="question__big">
            Ubrizgava li <span class="accent">pravu količinu</span>, pri
            <span class="accent">pravom tlaku</span>, u
            <span class="accent">pravom trenutku</span> i s
            <span class="accent">dovoljno brzim odzivom</span>?
          </p>
        </div>

        <!-- Izvještaj -->
        <div class="report">
          <div class="report__intro" appReveal>
            <p class="eyebrow">Mjerni protokol</p>
            <h3 class="report__title">Ne dobivate samo test –<br />dobivate dokaz.</h3>
            <p>
              Softver uspoređuje svaki rezultat s dopuštenim granicama. Svaka stavka ima minimum,
              maksimum, izmjerenu vrijednost, jedinicu i status. Kad injektor prođe, dobivate
              ispisani izvještaj i generirani korekcijski kod za upravljačku jedinicu motora.
            </p>

            <figure class="curves" aria-labelledby="curves-cap">
              <svg viewBox="0 0 320 190" role="img" aria-labelledby="curves-cap">
                <g class="curves__grid">
                  @for (y of [30, 70, 110, 150]; track y) {
                    <line x1="36" [attr.y1]="y" x2="310" [attr.y2]="y" />
                  }
                </g>
                <line class="curves__axis" x1="36" y1="10" x2="36" y2="160" />
                <line class="curves__axis" x1="36" y1="160" x2="310" y2="160" />
                <path
                  class="curves__line curves__line--hi"
                  d="M60 160 C 95 158, 110 120, 150 92 S 250 30, 300 18"
                />
                <path
                  class="curves__line curves__line--mid"
                  d="M70 160 C 110 158, 130 132, 170 116 S 260 72, 300 62"
                />
                <path
                  class="curves__line curves__line--lo"
                  d="M80 160 C 125 159, 150 144, 190 136 S 265 112, 300 106"
                />
                <text x="304" y="14" class="curves__lbl curves__lbl--hi">1600</text>
                <text x="304" y="58" class="curves__lbl curves__lbl--mid">800</text>
                <text x="304" y="102" class="curves__lbl curves__lbl--lo">400</text>
                <text x="173" y="182" class="curves__ax">trajanje impulsa (µs) →</text>
                <text x="14" y="85" class="curves__ax" transform="rotate(-90 14 85)">
                  količina (mm³) →
                </text>
              </svg>
              <figcaption id="curves-cap" class="mono">
                Krivulje ubrizgavanja pri ~400, 800 i 1600 bara · ilustracija
              </figcaption>
            </figure>
          </div>

          <div class="report__side">
            <ol class="pages">
              @for (p of pages; track p.pages; let i = $index) {
                <li class="page" appReveal [appRevealDelay]="i * 90">
                  <span class="page__tag mono">{{ p.pages }}</span>
                  <h4 class="page__title">{{ p.title }}</h4>
                  <p>{{ p.text }}</p>
                  <ul class="page__items">
                    @for (it of p.items; track it) {
                      <li class="mono">{{ it }}</li>
                    }
                  </ul>
                </li>
              }
            </ol>
            <figure class="report__photo" appReveal appRevealVariant="image">
              <app-img
                key="injectorTestReports"
                sizes="(min-width: 1024px) 25vw, 100vw"
                class="report__img"
              />
              <figcaption>Reparirani injektori uz ispisane mjerne protokole.</figcaption>
            </figure>
          </div>
        </div>

        <!-- Zaključak -->
        <aside class="verdict" appReveal>
          <span class="verdict__icon"><app-icon name="file" [size]="28" [stroke]="1.4" /></span>
          <div>
            <p class="verdict__title">Ne vraćamo injektor na motor zato što „izgleda dobro“.</p>
            <p>
              Vraćamo ga s mjernim protokolom koji pokazuje kako radi pri 400, 800 i 1600 bara – od
              kratkog impulsa do punog opterećenja. Gdje to injektor i test-plan podržavaju, slijedi
              i dodatna provjera otvaranja i odziva – <a href="#emisija">NOP i MDP</a>: otvara li se
              sapnica na pravom tlaku, reagira li dovoljno brzo na električni signal i ponaša li se
              stabilno pri kratkom i dugom ubrizgavanju.
            </p>
          </div>
        </aside>
      </div>
    </section>
  `,
  styleUrl: './bench.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenchComponent {
  protected readonly machines = BENCH_MACHINES;
  protected readonly pages = REPORT_PAGES;
}
