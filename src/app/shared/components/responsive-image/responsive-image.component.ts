import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IMAGES, ImageKey, srcsetFor } from '../../../core/config/images.config';

/**
 * Prikaz slike iz centralne konfiguracije (IMAGES).
 * Automatski postavlja srcset, dimenzije, lazy loading i alt tekst.
 */
@Component({
  selector: 'app-img',
  template: `
    <img
      [src]="image().src"
      [attr.srcset]="srcset()"
      [attr.sizes]="srcset() ? sizes() : null"
      [alt]="decorative() ? '' : alt() || image().alt"
      [width]="image().width"
      [height]="image().height"
      [attr.loading]="priority() ? 'eager' : 'lazy'"
      [attr.fetchpriority]="priority() ? 'high' : null"
      decoding="async"
    />
  `,
  styles: `
    :host {
      display: block;
      overflow: hidden;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: var(--img-position, center);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsiveImageComponent {
  readonly key = input.required<ImageKey>();
  /** Vrijednost `sizes` atributa */
  readonly sizes = input('100vw');
  /** Slika iznad preklopa (hero) – učitava se odmah i s visokim prioritetom */
  readonly priority = input(false);
  /** Nadjačava alt tekst iz konfiguracije */
  readonly alt = input('');
  /** Čisto dekorativna slika (alt="") */
  readonly decorative = input(false);

  protected readonly image = computed(() => IMAGES[this.key()]);
  protected readonly srcset = computed(() => srcsetFor(this.image()));
}
