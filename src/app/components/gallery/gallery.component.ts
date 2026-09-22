import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GALLERY, GALLERY_CATEGORIES, GalleryCategory } from '../../core/data/content.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ResponsiveImageComponent } from '../../shared/components/responsive-image/responsive-image.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LightboxComponent } from './lightbox.component';

@Component({
  selector: 'app-gallery',
  imports: [
    IconComponent,
    ResponsiveImageComponent,
    SectionHeadingComponent,
    RevealDirective,
    LightboxComponent,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  protected readonly categories = GALLERY_CATEGORIES;
  protected readonly filter = signal<GalleryCategory | 'sve'>('sve');
  protected readonly openIndex = signal<number | null>(null);

  protected readonly items = computed(() => {
    const f = this.filter();
    return f === 'sve' ? GALLERY : GALLERY.filter((g) => g.category === f);
  });

  private lastTrigger: HTMLElement | null = null;

  open(index: number, trigger: HTMLElement): void {
    this.lastTrigger = trigger;
    this.openIndex.set(index);
  }

  close(): void {
    this.openIndex.set(null);
    // Vraćanje fokusa na sličicu koja je otvorila lightbox
    this.lastTrigger?.focus({ preventScroll: true });
  }
}
