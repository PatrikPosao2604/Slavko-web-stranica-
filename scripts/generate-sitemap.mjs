/**
 * Generira public/sitemap.xml i public/robots.txt iz centralne konfiguracije
 * (domena iz site.config.ts, usluge iz services.data.ts).
 * Pokreće se automatski prije svakog builda (npm run build).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = readFileSync(join(ROOT, 'src/app/core/config/site.config.ts'), 'utf8');
const services = readFileSync(join(ROOT, 'src/app/core/data/services.data.ts'), 'utf8');

const url = config.match(/url:\s*'([^']+)'/)?.[1]?.replace(/\/$/, '');
if (!url) throw new Error('Nije pronađen `url` u site.config.ts');

const slugs = [...services.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const today = new Date().toISOString().slice(0, 10);

const pages = [
  { path: '/', priority: '1.0', freq: 'monthly' },
  { path: '/o-nama', priority: '0.7', freq: 'yearly' },
  ...slugs.map((s) => ({ path: `/usluge/${s}`, priority: '0.8', freq: 'yearly' })),
  { path: '/pravila-privatnosti', priority: '0.2', freq: 'yearly' },
  { path: '/kolacici', priority: '0.2', freq: 'yearly' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${url}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(ROOT, 'public/sitemap.xml'), xml);
writeFileSync(
  join(ROOT, 'public/robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`,
);
console.log(`sitemap.xml: ${pages.length} URL-ova (${url})`);
