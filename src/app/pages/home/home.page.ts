import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { faqSchema, serviceCatalogSchema } from '../../core/services/structured-data';
import { FAQ } from '../../core/data/content.data';
import { SERVICES } from '../../core/data/services.data';
import { HeroComponent } from '../../components/hero/hero.component';
import { UspComponent } from '../../components/usp/usp.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ProcessComponent } from '../../components/process/process.component';
import { EmissionComponent } from '../../components/emission/emission.component';
import { LabComponent } from '../../components/lab/lab.component';
import { SymptomsComponent } from '../../components/symptoms/symptoms.component';
import { EquipmentComponent } from '../../components/equipment/equipment.component';
import { BeforeAfterComponent } from '../../components/before-after/before-after.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { BrandsComponent } from '../../components/brands/brands.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroComponent,
    UspComponent,
    ServicesComponent,
    ProcessComponent,
    EmissionComponent,
    LabComponent,
    SymptomsComponent,
    EquipmentComponent,
    BeforeAfterComponent,
    GalleryComponent,
    BrandsComponent,
    FaqComponent,
    CtaComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-usp />
    <app-services />
    <app-process />
    <app-emission />
    <app-lab />
    <app-symptoms />
    <app-equipment />
    <app-before-after />
    <app-gallery />
    <app-brands />
    <app-faq />
    <app-cta />
    <app-contact />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  constructor() {
    const seo = inject(SeoService);
    seo.setPage({ path: '/' });
    seo.setJsonLd('services', serviceCatalogSchema(SERVICES));
    seo.setJsonLd('faq', faqSchema(FAQ));
    inject(DestroyRef).onDestroy(() => {
      seo.removeJsonLd('services');
      seo.removeJsonLd('faq');
    });
  }
}
