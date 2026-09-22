import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { EQUIPMENT } from '../../core/data/content.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ResponsiveImageComponent } from '../../shared/components/responsive-image/responsive-image.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-equipment',
  imports: [IconComponent, ResponsiveImageComponent, SectionHeadingComponent, RevealDirective],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentComponent {
  protected readonly items = EQUIPMENT;
  protected readonly active = signal(0);
  protected readonly activeItem = computed(() => this.items[this.active()]);
}
