import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SITE } from '../../../core/config/site.config';

/** Logotip: znak (vrh dizne s mlazom) + naziv iz konfiguracije. */
@Component({
  selector: 'app-logo',
  template: `
    <span class="logo" [class.logo--compact]="compact()">
      <svg class="logo__mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <rect x="1" y="1" width="38" height="38" rx="9" class="logo__frame" />
        <path d="M15 8h10v6l-2 2v8l-3 5-3-5v-8l-2-2z" class="logo__body" />
        <path d="M20 29l-6 5M20 29l0 6M20 29l6 5" class="logo__spray" />
      </svg>
      <span class="logo__text">
        <span class="logo__name">{{ site.shortName }}</span>
        @if (!compact()) {
          <span class="logo__tag">{{ site.logoTagline }}</span>
        }
      </span>
    </span>
  `,
  styles: `
    .logo {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--c-text);
    }
    .logo__mark {
      width: 2.5rem;
      height: 2.5rem;
      flex-shrink: 0;
    }
    .logo__frame {
      fill: var(--c-surface-2);
      stroke: var(--c-line-strong);
    }
    .logo__body {
      fill: none;
      stroke: var(--c-text);
      stroke-width: 1.8;
      stroke-linejoin: round;
    }
    .logo__spray {
      stroke: var(--c-accent);
      stroke-width: 2;
      stroke-linecap: round;
    }
    .logo__text {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }
    .logo__name {
      font-family: var(--ff-display);
      font-weight: 700;
      font-size: 1.3rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .logo__tag {
      font-family: var(--ff-mono);
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--c-text-dim);
      margin-top: 0.35rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  readonly compact = input(false);
  protected readonly site = SITE;
}
