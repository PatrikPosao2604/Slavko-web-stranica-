import { RenderMode, ServerRoute } from '@angular/ssr';
import { SERVICES } from './core/data/services.data';

/**
 * Sve stranice se prerenderiraju u statični HTML pri buildu
 * (brzo učitavanje + potpun sadržaj za tražilice).
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'usluge/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SERVICES.map((s) => ({ slug: s.slug })),
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
