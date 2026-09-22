import {
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Suptilna animacija pojavljivanja pri skrolanju (fade-in / slide-up).
 *
 * Element je vidljiv u server-renderiranom HTML-u (SEO, bez JS-a).
 * Skrivanje se aktivira tek kad je JavaScript dostupan (klasa `js` na <html>),
 * a animacije se potpuno isključuju uz `prefers-reduced-motion`.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    'data-reveal': '',
    '[style.--reveal-delay]': 'delay() + "ms"',
    '[attr.data-reveal-variant]': 'variant()',
  },
})
export class RevealDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  /** Kašnjenje u milisekundama (za stagger efekt) */
  readonly delay = input(0, { alias: 'appRevealDelay' });
  readonly variant = input<'up' | 'fade' | 'image'>('up', { alias: 'appRevealVariant' });

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const node = this.el.nativeElement;
      if (!('IntersectionObserver' in window)) {
        node.classList.add('is-visible');
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('is-visible');
              observer.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );
      observer.observe(node);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
