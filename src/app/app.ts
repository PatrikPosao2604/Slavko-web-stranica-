import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MobileCtaComponent } from './components/mobile-cta/mobile-cta.component';
import { SeoService } from './core/services/seo.service';
import { localBusinessSchema } from './core/services/structured-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MobileCtaComponent],
  template: `
    <a class="skip-link" href="#sadrzaj">Preskoči na sadržaj</a>
    <app-header />
    <main id="sadrzaj" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-mobile-cta />
  `,
  styles: `
    main {
      display: block;
      outline: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor() {
    // LocalBusiness strukturirani podaci prisutni su na svim stranicama
    inject(SeoService).setJsonLd('business', localBusinessSchema());
  }
}
