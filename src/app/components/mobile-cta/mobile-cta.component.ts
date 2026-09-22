import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { PHONE_HREF } from '../../core/config/site.config';
import { IconComponent } from '../../shared/components/icon/icon.component';

/**
 * Sticky CTA traka na dnu ekrana (samo mobitel/tablet).
 * Pojavljuje se nakon hero sekcije i skriva se dok je kontakt forma vidljiva.
 */
@Component({
  selector: 'app-mobile-cta',
  imports: [RouterLink, IconComponent],
  template: `
    <div
      class="mcta"
      [class.mcta--visible]="visible()"
      [attr.aria-hidden]="!visible()"
      [attr.inert]="visible() ? null : ''"
    >
      <a class="btn btn--ghost mcta__btn" [href]="phoneHref">
        <app-icon name="phone" [size]="18" /> Nazovi
      </a>
      <a
        class="btn btn--primary mcta__btn"
        routerLink="/"
        fragment="kontakt"
        (click)="scrollToContact()"
      >
        <app-icon name="send" [size]="18" /> Pošalji upit
      </a>
    </div>
  `,
  styles: `
    .mcta {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 90;
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 0.6rem;
      padding: 0.7rem var(--gutter) calc(0.7rem + env(safe-area-inset-bottom));
      background: rgba(11, 12, 14, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid var(--c-line);
      transform: translateY(110%);
      transition: transform 0.45s var(--ease-out);
    }
    .mcta--visible {
      transform: none;
    }
    .mcta__btn {
      min-height: 3rem;
      padding-inline: 0.75rem;
      font-size: 0.8rem;
    }
    @media (min-width: 768px) {
      .mcta {
        display: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileCtaComponent {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  protected readonly phoneHref = PHONE_HREF;
  protected readonly visible = signal(false);

  private scrolledPast = false;
  private contactVisible = false;
  private observer?: IntersectionObserver;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const win = this.document.defaultView!;
      const onScroll = () => {
        this.scrolledPast = win.scrollY > win.innerHeight * 0.6;
        this.update();
      };
      onScroll();
      win.addEventListener('scroll', onScroll, { passive: true });
      this.observeContact();
      destroyRef.onDestroy(() => {
        win.removeEventListener('scroll', onScroll);
        this.observer?.disconnect();
      });
    });

    const sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => this.observeContact(), 50));
    destroyRef.onDestroy(() => sub.unsubscribe());
  }

  scrollToContact(): void {
    this.document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  }

  private observeContact(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    this.observer?.disconnect();
    this.contactVisible = false;
    const target = this.document.getElementById('kontakt');
    if (!target) {
      this.update();
      return;
    }
    this.observer = new IntersectionObserver(([entry]) => {
      this.contactVisible = !!entry?.isIntersecting;
      this.update();
    });
    this.observer.observe(target);
  }

  private update(): void {
    this.visible.set(this.scrolledPast && !this.contactVisible);
  }
}
