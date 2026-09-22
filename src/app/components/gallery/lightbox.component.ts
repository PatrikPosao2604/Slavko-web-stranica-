import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { IMAGES, srcsetFor } from '../../core/config/images.config';
import { GalleryItem } from '../../core/data/content.data';
import { ScrollLockService } from '../../core/services/scroll-lock.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

/**
 * Fullscreen lightbox na temelju nativnog <dialog> elementa
 * (fokus ostaje unutar dijaloga, Esc zatvara). Podržava strelice na
 * tipkovnici, swipe na dodirnim ekranima i klik izvan fotografije.
 */
@Component({
  selector: 'app-lightbox',
  imports: [IconComponent],
  template: `
    <dialog
      #dialog
      class="lb"
      aria-label="Galerija fotografija"
      (close)="closed.emit()"
      (click)="onBackdrop($event)"
      (keydown)="onKey($event)"
    >
      <div class="lb__top">
        <span class="lb__counter mono" aria-live="polite">
          {{ index()! + 1 }} / {{ items().length }}
        </span>
        <button
          type="button"
          class="lb__btn lb__close"
          (click)="dialog.close()"
          aria-label="Zatvori galeriju"
        >
          <app-icon name="x" [size]="22" />
        </button>
      </div>

      <figure
        class="lb__stage"
        (pointerdown)="onPointerDown($event)"
        (pointerup)="onPointerUp($event)"
      >
        @for (i of [index()!]; track i) {
          <img
            class="lb__img"
            [src]="current().src"
            [attr.srcset]="srcset()"
            sizes="100vw"
            [alt]="current().alt"
            [width]="current().width"
            [height]="current().height"
            decoding="async"
          />
        }
        <figcaption class="lb__caption">{{ item().caption }}</figcaption>
      </figure>

      @if (items().length > 1) {
        <button
          type="button"
          class="lb__btn lb__nav lb__nav--prev"
          (click)="prev()"
          aria-label="Prethodna fotografija"
        >
          <app-icon name="chevron-left" [size]="26" />
        </button>
        <button
          type="button"
          class="lb__btn lb__nav lb__nav--next"
          (click)="next()"
          aria-label="Sljedeća fotografija"
        >
          <app-icon name="chevron-right" [size]="26" />
        </button>
      }
    </dialog>
  `,
  styleUrl: './lightbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightboxComponent {
  private readonly scrollLock = inject(ScrollLockService);
  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  readonly items = input.required<GalleryItem[]>();
  readonly index = model.required<number | null>();
  readonly closed = output<void>();

  protected readonly item = computed(() => this.items()[this.index() ?? 0]);
  protected readonly current = computed(() => IMAGES[this.item().image]);
  protected readonly srcset = computed(() => srcsetFor(this.current()));

  private startX = 0;
  private startY = 0;

  constructor() {
    afterNextRender(() => {
      this.dialogRef().nativeElement.showModal();
      this.scrollLock.lock();
    });
    inject(DestroyRef).onDestroy(() => this.scrollLock.unlock());
  }

  next(): void {
    const n = this.items().length;
    this.index.update((i) => ((i ?? 0) + 1) % n);
  }

  prev(): void {
    const n = this.items().length;
    this.index.update((i) => ((i ?? 0) - 1 + n) % n);
  }

  protected onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prev();
    }
  }

  /** Klik na pozadinu (izvan fotografije i kontrola) zatvara lightbox */
  protected onBackdrop(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target === this.dialogRef().nativeElement || target.classList.contains('lb__stage')) {
      this.dialogRef().nativeElement.close();
    }
  }

  protected onPointerDown(event: PointerEvent): void {
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  protected onPointerUp(event: PointerEvent): void {
    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }
}
