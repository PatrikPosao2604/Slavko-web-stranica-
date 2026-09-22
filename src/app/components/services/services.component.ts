import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../core/data/services.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ResponsiveImageComponent } from '../../shared/components/responsive-image/responsive-image.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-services',
  imports: [
    RouterLink,
    IconComponent,
    ResponsiveImageComponent,
    SectionHeadingComponent,
    RevealDirective,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  protected readonly services = SERVICES;
}
