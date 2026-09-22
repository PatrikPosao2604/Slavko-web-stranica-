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
 * Animirani brojač. Server-renderirani HTML sadrži konačnu vrijednost;
 * u pregledniku se broj animira od nule kad element uđe u vidno polje.
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly value = input.required<number>({ alias: 'appCountUp' });
  readonly duration = input(1600);

  private readonly format = new Intl.NumberFormat('hr-HR');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const node = this.el.nativeElement;
      const target = this.value();
      node.textContent = this.format.format(target);

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !('IntersectionObserver' in window)) return;

      let frame = 0;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          observer.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / this.duration(), 1);
            const eased = 1 - Math.pow(1 - t, 4);
            node.textContent = this.format.format(Math.round(target * eased));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        },
        { threshold: 0.6 },
      );
      observer.observe(node);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }
}
