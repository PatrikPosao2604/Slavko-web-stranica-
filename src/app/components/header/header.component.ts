import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { NAV_ITEMS, NavItem } from '../../core/data/content.data';
import { PHONE_HREF, SITE } from '../../core/config/site.config';
import { ScrollLockService } from '../../core/services/scroll-lock.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, IconComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollLock = inject(ScrollLockService);

  protected readonly site = SITE;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly nav = NAV_ITEMS;
  protected readonly homeNav: NavItem = { label: 'Početna', path: '/', fragment: 'pocetak' };
  protected readonly contactNav: NavItem = { label: 'Kontakt', path: '/', fragment: 'kontakt' };

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly activeFragment = signal<string | null>(null);
  protected readonly onHome = signal(true);

  private spy?: IntersectionObserver;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const win = this.document.defaultView!;
      const onScroll = () => this.scrolled.set(win.scrollY > 24);
      onScroll();
      win.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => win.removeEventListener('scroll', onScroll));
      this.setupScrollSpy();
    });

    const sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const path = e.urlAfterRedirects.split(/[?#]/)[0];
        this.onHome.set(path === '/' || path === '');
        this.closeMenu();
        if (isPlatformBrowser(this.platformId)) {
          // Pričekaj render nove stranice prije postavljanja scroll-spyja
          setTimeout(() => this.setupScrollSpy(), 50);
        }
      });

    destroyRef.onDestroy(() => {
      sub.unsubscribe();
      this.spy?.disconnect();
      if (this.menuOpen()) this.scrollLock.unlock();
    });
  }

  toggleMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    } else {
      this.menuOpen.set(true);
      this.scrollLock.lock();
    }
  }

  closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.scrollLock.unlock();
  }

  /**
   * Router ignorira navigaciju na isti URL, pa ponovni klik na isto sidro
   * ne bi skrolao. Na početnoj stranici zato skrolamo ručno.
   */
  onNavClick(item: NavItem): void {
    this.closeMenu();
    if (!item.fragment || !this.onHome()) return;
    const target = this.document.getElementById(item.fragment);
    if (target) {
      target.scrollIntoView({ behavior: this.prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  }

  protected isActive(item: NavItem): boolean {
    if (!item.fragment) return false;
    return this.onHome() && this.activeFragment() === item.fragment;
  }

  private setupScrollSpy(): void {
    this.spy?.disconnect();
    if (!this.onHome() || !('IntersectionObserver' in window)) {
      this.activeFragment.set(null);
      return;
    }
    this.spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.activeFragment.set(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const item of this.nav) {
      const el = item.fragment ? this.document.getElementById(item.fragment) : null;
      if (el) this.spy.observe(el);
    }
  }

  private prefersReducedMotion(): boolean {
    return !!this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
