import { DOCUMENT, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SITE } from '../config/site.config';

export interface InquiryPayload {
  fullName: string;
  phone: string;
  email: string;
  make: string;
  model: string;
  year: string;
  engine: string;
  message: string;
  files: File[];
}

export type InquiryResult = { kind: 'sent' } | { kind: 'mailto' };

/**
 * Slanje upita. Ako je u konfiguraciji postavljen `formEndpoint`,
 * upit se šalje kao multipart/form-data (s privicima).
 * U suprotnom se otvara e-mail klijent s popunjenim upitom.
 */
@Injectable({ providedIn: 'root' })
export class ContactFormService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);

  async send(payload: InquiryPayload): Promise<InquiryResult> {
    if (SITE.formEndpoint) {
      const body = new FormData();
      body.append('_subject', `Upit s web stranice – ${payload.make} ${payload.model}`);
      body.append('ime_prezime', payload.fullName);
      body.append('telefon', payload.phone);
      body.append('email', payload.email);
      body.append('marka', payload.make);
      body.append('model', payload.model);
      body.append('godiste', payload.year);
      body.append('motor', payload.engine);
      body.append('opis', payload.message);
      payload.files.forEach((file) => body.append('privitci', file, file.name));

      await firstValueFrom(
        this.http.post(SITE.formEndpoint, body, { headers: { Accept: 'application/json' } }),
      );
      return { kind: 'sent' };
    }

    this.openMailClient(payload);
    return { kind: 'mailto' };
  }

  private openMailClient(p: InquiryPayload): void {
    const subject = `Upit – ${p.make} ${p.model}`.trim();
    const lines = [
      `Ime i prezime: ${p.fullName}`,
      `Telefon: ${p.phone}`,
      `E-mail: ${p.email}`,
      '',
      `Vozilo: ${p.make} ${p.model}`,
      `Godište: ${p.year || '-'}`,
      `Motor: ${p.engine || '-'}`,
      '',
      'Opis problema:',
      p.message,
    ];
    if (p.files.length) {
      lines.push('', `(Molim priložite ${p.files.length} datoteku/e uz ovaj e-mail.)`);
    }
    const href = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join('\n'))}`;
    this.document.defaultView?.location.assign(href);
  }
}
