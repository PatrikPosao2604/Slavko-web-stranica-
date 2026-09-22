import { DOCUMENT, Injectable, inject } from '@angular/core';

/** Zaključavanje skrolanja stranice (izbornik, lightbox). Podržava ugniježđene pozive. */
@Injectable({ providedIn: 'root' })
export class ScrollLockService {
  private readonly document = inject(DOCUMENT);
  private locks = 0;

  lock(): void {
    if (this.locks++ === 0) this.document.body.classList.add('no-scroll');
  }

  unlock(): void {
    if (this.locks === 0) return;
    if (--this.locks === 0) this.document.body.classList.remove('no-scroll');
  }
}
