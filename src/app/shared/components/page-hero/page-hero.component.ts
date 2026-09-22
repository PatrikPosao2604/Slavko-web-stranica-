import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageKey } from '../../../core/config/images.config';
import { ResponsiveImageComponent } from '../responsive-image/responsive-image.component';

export interface Crumb {
  label: string;
  path?: string;
}

/** Zaglavlje podstranice: breadcrumb, naslov, uvod i opcionalna slika. */
@Component({
  selector: 'app-page-hero',
  imports: [RouterLink, ResponsiveImageComponent],
  template: `
    <header class="ph" [class.ph--image]="!!image()">
      @if (image(); as img) {
        <div class="ph__media" aria-hidden="true">
          <app-img [key]="img" [priority]="true" [decorative]="true" class="ph__img" />
          <div class="ph__shade"></div>
        </div>
      }
      <div class="container ph__inner">
        <nav aria-label="Putanja" class="ph__crumbs">
          <ol>
            @for (c of crumbs(); track c.label; let last = $last) {
              <li>
                @if (c.path && !last) {
                  <a [routerLink]="c.path">{{ c.label }}</a>
                } @else {
                  <span [attr.aria-current]="last ? 'page' : null">{{ c.label }}</span>
                }
              </li>
            }
          </ol>
        </nav>
        @if (eyebrow()) {
          <p class="eyebrow">{{ eyebrow() }}</p>
        }
        <h1 class="ph__title">{{ title() }}</h1>
        @if (lead()) {
          <p class="lead ph__lead">{{ lead() }}</p>
        }
        <ng-content />
      </div>
    </header>
  `,
  styles: `
    :host {
      display: block;
    }
    .ph {
      position: relative;
      padding: calc(var(--header-h) + clamp(3rem, 8vw, 6rem)) 0 clamp(3rem, 6vw, 5rem);
      border-bottom: 1px solid var(--c-line);
      overflow: hidden;
      isolation: isolate;
    }
    .ph--image {
      min-height: min(78vh, 44rem);
      display: flex;
      align-items: flex-end;
    }
    .ph__media {
      position: absolute;
      inset: 0;
      z-index: -1;
    }
    .ph__img {
      height: 100%;
      --img-position: 70% 50%;
    }
    .ph__shade {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(180deg, rgba(11, 12, 14, 0.4), var(--c-bg) 98%),
        linear-gradient(90deg, rgba(11, 12, 14, 0.9), rgba(11, 12, 14, 0.2));
    }
    .ph__inner {
      position: relative;
      width: 100%;
    }
    .ph__crumbs ol {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      list-style: none;
      margin-bottom: 1.75rem;
      font-family: var(--ff-mono);
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--c-text-dim);
    }
    .ph__crumbs li:not(:last-child)::after {
      content: '/';
      margin-left: 0.4rem;
      opacity: 0.5;
    }
    .ph__crumbs a:hover {
      color: var(--c-text);
    }
    .ph__crumbs [aria-current] {
      color: var(--c-text-muted);
    }
    .ph__title {
      margin-top: 1rem;
      font-size: var(--fs-h1);
      max-width: 22ch;
      animation: ph-rise 0.9s var(--ease-out) both;
    }
    .ph__lead {
      margin-top: 1.5rem;
      animation: ph-rise 0.9s var(--ease-out) 0.1s both;
    }
    @keyframes ph-rise {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeroComponent {
  readonly title = input.required<string>();
  readonly eyebrow = input('');
  readonly lead = input('');
  readonly image = input<ImageKey | null>(null);
  readonly crumbs = input<Crumb[]>([]);
}
