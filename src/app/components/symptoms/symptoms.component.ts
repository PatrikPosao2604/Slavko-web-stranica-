import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SYMPTOMS, SYMPTOM_ZONES, SymptomZone } from '../../core/data/content.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Hotspot {
  zone: SymptomZone;
  x: number;
  y: number;
}

@Component({
  selector: 'app-symptoms',
  imports: [RouterLink, IconComponent, SectionHeadingComponent, RevealDirective],
  templateUrl: './symptoms.component.html',
  styleUrl: './symptoms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SymptomsComponent {
  protected readonly symptoms = SYMPTOMS;
  protected readonly zones = SYMPTOM_ZONES;

  /** Pozicije točaka na ilustraciji vozila (viewBox 800×320) */
  protected readonly hotspots: Hotspot[] = [
    { zone: 'engine', x: 138, y: 186 },
    { zone: 'cabin', x: 318, y: 132 },
    { zone: 'fuel', x: 515, y: 208 },
    { zone: 'exhaust', x: 742, y: 246 },
  ];

  protected readonly activeZone = signal<SymptomZone | null>(null);
  protected readonly activeIndex = signal<number | null>(null);

  protected readonly zoneCount = computed(() => {
    const counts: Record<SymptomZone, number> = { engine: 0, exhaust: 0, cabin: 0, fuel: 0 };
    for (const s of this.symptoms) counts[s.zone]++;
    return counts;
  });

  selectSymptom(index: number | null): void {
    this.activeIndex.set(index);
    this.activeZone.set(index === null ? null : this.symptoms[index].zone);
  }

  toggleZone(zone: SymptomZone): void {
    this.activeIndex.set(null);
    this.activeZone.update((z) => (z === zone ? null : zone));
  }
}
