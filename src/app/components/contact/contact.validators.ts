import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Godište: prazno ili četveroznamenkasta godina u zadanom rasponu */
export function yearValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = (control.value ?? '').trim();
    if (!value) return null;
    if (!/^\d{4}$/.test(value)) return { year: true };
    const year = Number(value);
    return year < min || year > max ? { yearRange: { min, max } } : null;
  };
}

export type FieldName =
  'fullName' | 'phone' | 'email' | 'make' | 'model' | 'year' | 'engine' | 'message' | 'consent';

/** Poruke o greškama za polja kontakt forme */
export const FIELD_MESSAGES: Record<FieldName, Record<string, string>> = {
  fullName: {
    required: 'Upišite ime i prezime.',
    minlength: 'Ime i prezime mora imati barem 3 znaka.',
    maxlength: 'Unos je predug.',
  },
  phone: {
    required: 'Upišite broj telefona kako bismo vas mogli nazvati.',
    pattern: 'Unesite ispravan broj telefona (npr. +385 91 234 5678).',
  },
  email: {
    required: 'Upišite e-mail adresu.',
    email: 'Unesite ispravnu e-mail adresu.',
    maxlength: 'Unos je predug.',
  },
  make: {
    required: 'Upišite marku vozila.',
    maxlength: 'Unos je predug.',
  },
  model: {
    required: 'Upišite model vozila.',
    maxlength: 'Unos je predug.',
  },
  year: {
    year: 'Godište upišite kao četveroznamenkasti broj (npr. 2014).',
    yearRange: 'Provjerite godište vozila.',
  },
  engine: {
    maxlength: 'Unos je predug.',
  },
  message: {
    required: 'Opišite problem koji primjećujete.',
    minlength: 'Opis neka ima barem 20 znakova – što više detalja, to bolja procjena.',
    maxlength: 'Opis je predug (najviše 3000 znakova).',
  },
  consent: {
    required: 'Za slanje upita potrebna je vaša privola.',
  },
};
