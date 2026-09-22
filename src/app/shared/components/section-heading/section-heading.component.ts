import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

/** Standardni naslov sekcije: oznaka (eyebrow), naslov i uvodni tekst. */
@Component({
  selector: 'app-section-heading',
  imports: [RevealDirective],
  template: `
    <header class="heading" [class.heading--center]="align() === 'center'" appReveal>
      @if (eyebrow()) {
        <p class="eyebrow">
          @if (index()) {
            <span class="heading__index">{{ index() }}</span>
          }
          {{ eyebrow() }}
        </p>
      }
      <h2 class="heading__title" [id]="headingId() || null">{{ title() }}</h2>
      @if (lead()) {
        <p class="lead heading__lead">{{ lead() }}</p>
      }
      <ng-content />
    </header>
  `,
  styles: `
    .heading {
      max-width: 52rem;
      margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }
    .heading--center {
      margin-inline: auto;
      text-align: center;
    }
    .heading--center .eyebrow {
      justify-content: center;
    }
    .heading__index {
      color: var(--c-text-dim);
      margin-right: 0.25rem;
    }
    .heading__title {
      font-size: var(--fs-h2);
      margin: 0.9rem 0 0;
    }
    .heading__lead {
      margin-top: 1.25rem;
    }
    .heading--center .heading__lead {
      margin-inline: auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadingComponent {
  readonly eyebrow = input('');
  readonly index = input('');
  readonly title = input.required<string>();
  readonly lead = input('');
  readonly align = input<'left' | 'center'>('left');
  readonly headingId = input('');
}
