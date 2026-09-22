import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS, IconName } from './icons';

/**
 * Inline SVG ikona. Dekorativna po defaultu (aria-hidden);
 * ako se proslijedi `label`, ikona dobiva role="img" i aria-label.
 *
 * SVG se gradi kao string i postavlja preko innerHTML na host element
 * (server-side DOM ne podržava innerHTML izravno na <svg> elementu).
 */
@Component({
  selector: 'app-icon',
  template: '',
  host: {
    '[innerHTML]': 'markup()',
    '[attr.role]': "label() ? 'img' : null",
    '[attr.aria-label]': 'label() || null',
    '[attr.aria-hidden]': "label() ? null : 'true'",
  },
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
      flex-shrink: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<IconName>();
  readonly size = input<number | string>(24);
  readonly stroke = input<number>(1.6);
  readonly label = input<string>('');

  // Markup dolazi isključivo iz statičnog, internog seta ikona – siguran je.
  protected readonly markup = computed(() => {
    const s = this.size();
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${this.stroke()}" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">${ICONS[this.name()]}</svg>`,
    );
  });
}
