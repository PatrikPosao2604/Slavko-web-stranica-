import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  EMAIL_HREF,
  FULL_ADDRESS,
  MAPS_EMBED,
  MAPS_LINK,
  PHONE_HREF,
  SITE,
} from '../../core/config/site.config';
import { ContactFormService } from '../../core/services/contact-form.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { FIELD_MESSAGES, FieldName, yearValidator } from './contact.validators';

type InquiryType = 'ponuda' | 'termin' | 'pitanje';
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, IconComponent, SectionHeadingComponent, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly contact = inject(ContactFormService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly site = SITE;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly emailHref = EMAIL_HREF;
  protected readonly address = FULL_ADDRESS;
  protected readonly mapsLink = MAPS_LINK;
  protected readonly mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(MAPS_EMBED);
  protected readonly maxYear = new Date().getFullYear() + 1;

  protected readonly types: { id: InquiryType; label: string }[] = [
    { id: 'ponuda', label: 'Zatražiti ponudu' },
    { id: 'termin', label: 'Dogovoriti servis' },
    { id: 'pitanje', label: 'Imam pitanje' },
  ];

  protected readonly form = this.fb.group({
    type: this.fb.control<InquiryType>('ponuda'),
    fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s/()-]{6,20}$/)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    make: ['', [Validators.required, Validators.maxLength(40)]],
    model: ['', [Validators.required, Validators.maxLength(60)]],
    year: ['', [yearValidator(1980, new Date().getFullYear() + 1)]],
    engine: ['', [Validators.maxLength(60)]],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(3000)]],
    consent: [false, [Validators.requiredTrue]],
    /** Honeypot – ljudi ga ne vide; botovi ga popune */
    website: [''],
  });

  protected readonly files = signal<File[]>([]);
  protected readonly fileError = signal<string | null>(null);
  protected readonly dragOver = signal(false);
  protected readonly submitted = signal(false);
  protected readonly status = signal<Status>('idle');
  protected readonly mapLoaded = signal(false);
  protected readonly messageLength = signal(0);

  protected readonly totalSize = computed(() => this.files().reduce((sum, f) => sum + f.size, 0));

  constructor() {
    // Preuzimanje vrste upita iz URL-a (npr. ?upit=termin iz hero CTA-a)
    const sub = inject(ActivatedRoute).queryParamMap.subscribe((params) => {
      const type = params.get('upit') as InquiryType | null;
      if (type && this.types.some((t) => t.id === type)) {
        this.form.controls.type.setValue(type);
      }
    });
    const msgSub = this.form.controls.message.valueChanges.subscribe((v) =>
      this.messageLength.set(v.length),
    );
    inject(DestroyRef).onDestroy(() => {
      sub.unsubscribe();
      msgSub.unsubscribe();
    });
  }

  /** Vraća poruku o grešci za polje (ili null) */
  protected error(name: FieldName): string | null {
    const control = this.form.controls[name];
    if (!control.invalid || !(control.touched || this.submitted())) return null;
    const messages = FIELD_MESSAGES[name];
    const key = Object.keys(control.errors ?? {})[0];
    return (key && messages[key]) || 'Provjerite unos.';
  }

  /* --- Datoteke -------------------------------------------------------------- */

  protected onFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addFiles(Array.from(input.files ?? []));
    input.value = '';
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(false);
    this.addFiles(Array.from(event.dataTransfer?.files ?? []));
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(true);
  }

  protected removeFile(index: number): void {
    this.files.update((list) => list.filter((_, i) => i !== index));
    this.fileError.set(null);
  }

  protected formatSize(bytes: number): string {
    return bytes > 1024 * 1024
      ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
      : `${Math.max(1, Math.round(bytes / 1024))} kB`;
  }

  private addFiles(incoming: File[]): void {
    const { maxFiles, maxFileSizeMb, accept } = SITE.upload;
    const allowed = accept.split(',');
    const current = [...this.files()];
    let error: string | null = null;

    for (const file of incoming) {
      const typeOk = allowed.includes(file.type) || /\.(jpe?g|png|webp|heic|pdf)$/i.test(file.name);
      if (!typeOk) {
        error = `Datoteka „${file.name}“ nije podržana. Dozvoljene su fotografije i PDF.`;
        continue;
      }
      if (file.size > maxFileSizeMb * 1024 * 1024) {
        error = `Datoteka „${file.name}“ je veća od ${maxFileSizeMb} MB.`;
        continue;
      }
      if (current.length >= maxFiles) {
        error = `Moguće je priložiti najviše ${maxFiles} datoteka.`;
        break;
      }
      if (!current.some((f) => f.name === file.name && f.size === file.size)) {
        current.push(file);
      }
    }
    this.files.set(current);
    this.fileError.set(error);
  }

  /* --- Slanje ---------------------------------------------------------------- */

  async submit(): Promise<void> {
    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.focusFirstInvalid();
      return;
    }

    const v = this.form.getRawValue();
    if (v.website) {
      // Honeypot popunjen – vjerojatno bot; tiho "uspješno"
      this.status.set('sent');
      return;
    }

    this.status.set('sending');
    const typeLabel = this.types.find((t) => t.id === v.type)?.label ?? '';
    try {
      const result = await this.contact.send({
        fullName: v.fullName.trim(),
        phone: v.phone.trim(),
        email: v.email.trim(),
        make: v.make.trim(),
        model: v.model.trim(),
        year: v.year.trim(),
        engine: v.engine.trim(),
        message: `[${typeLabel}]\n${v.message.trim()}`,
        files: this.files(),
      });
      this.status.set(result.kind === 'sent' ? 'sent' : 'mailto');
      if (result.kind === 'sent') {
        this.form.reset();
        this.files.set([]);
        this.submitted.set(false);
      }
    } catch {
      this.status.set('error');
    }
  }

  protected resetStatus(): void {
    this.status.set('idle');
  }

  private focusFirstInvalid(): void {
    queueMicrotask(() => {
      const el = this.host.nativeElement.querySelector<HTMLElement>(
        'form .ng-invalid:not(form):not(fieldset)',
      );
      el?.focus();
    });
  }
}
