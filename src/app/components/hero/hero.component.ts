import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHONE_HREF, SITE } from '../../core/config/site.config';
import { BRANDS } from '../../core/data/content.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ResponsiveImageComponent } from '../../shared/components/responsive-image/responsive-image.component';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, IconComponent, ResponsiveImageComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly site = SITE;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly brands = BRANDS.slice(0, 4).map((b) => b.name);

  /** Ilustrativni primjer očitanja korekcija (nije stvarno mjerenje). */
  protected readonly readings = [
    { cyl: 'C1', value: 0.4 },
    { cyl: 'C2', value: -0.6 },
    { cyl: 'C3', value: 3.8, alert: true },
    { cyl: 'C4', value: 0.2 },
  ];

  protected barWidth(value: number): number {
    return Math.min(Math.abs(value) / 4, 1) * 50;
  }
}
