/**
 * Generator PRIVREMENIH ilustracija (placeholder slika) za web stranicu.
 *
 * Crta tehničke "studijske" ilustracije (injektori, testni stol, Common Rail,
 * dizne pod povećanjem…) kao SVG i pretvara ih u optimizirane WebP datoteke
 * u  public/assets/images/  – u punoj veličini i u verziji od 800 px.
 *
 * Ovo NISU fotografije. Zamijenite ih stvarnim fotografijama iz radionice
 * (ista imena datoteka) – vidi src/app/core/config/images.config.ts.
 *
 * Pokretanje:  npm run images
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'assets', 'images');
const PUBLIC = join(ROOT, 'public');
mkdirSync(OUT, { recursive: true });

/* ------------------------------------------------------------------------ */
/*  Pomoćne funkcije                                                         */
/* ------------------------------------------------------------------------ */

/** Deterministički pseudo-slučajni generator (isti rezultat pri svakom buildu) */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const ACCENT = '#ff5a1f';

/** Zajedničke definicije: metali, plastika, šum, zamućenja */
function defs(extra = '') {
  return `
  <defs>
    <linearGradient id="steel" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#1c1f23"/>
      <stop offset=".12" stop-color="#4a5058"/>
      <stop offset=".28" stop-color="#b9c0c8"/>
      <stop offset=".36" stop-color="#f1f4f7"/>
      <stop offset=".46" stop-color="#9aa2ab"/>
      <stop offset=".66" stop-color="#3b4047"/>
      <stop offset=".84" stop-color="#6f7780"/>
      <stop offset="1" stop-color="#16181b"/>
    </linearGradient>
    <linearGradient id="steelWarm" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#1a1816"/>
      <stop offset=".15" stop-color="#57504a"/>
      <stop offset=".3" stop-color="#cfc6bd"/>
      <stop offset=".37" stop-color="#fff4ea"/>
      <stop offset=".48" stop-color="#a39a91"/>
      <stop offset=".7" stop-color="#3d3833"/>
      <stop offset=".86" stop-color="#8a5a3c"/>
      <stop offset="1" stop-color="#15120f"/>
    </linearGradient>
    <linearGradient id="steelH" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#1c1f23"/>
      <stop offset=".2" stop-color="#6b737c"/>
      <stop offset=".35" stop-color="#e9edf1"/>
      <stop offset=".5" stop-color="#8e969f"/>
      <stop offset=".75" stop-color="#30343a"/>
      <stop offset="1" stop-color="#101214"/>
    </linearGradient>
    <linearGradient id="darkMetal" x1="0" x2="1">
      <stop offset="0" stop-color="#0e0f11"/>
      <stop offset=".3" stop-color="#3a3e44"/>
      <stop offset=".4" stop-color="#6c737b"/>
      <stop offset=".55" stop-color="#2a2d32"/>
      <stop offset="1" stop-color="#0c0d0f"/>
    </linearGradient>
    <linearGradient id="plasticBlack" x1="0" x2="1">
      <stop offset="0" stop-color="#070708"/>
      <stop offset=".3" stop-color="#26282c"/>
      <stop offset=".38" stop-color="#4b4f55"/>
      <stop offset=".5" stop-color="#1d1f22"/>
      <stop offset="1" stop-color="#060607"/>
    </linearGradient>
    <linearGradient id="plasticGrey" x1="0" x2="1">
      <stop offset="0" stop-color="#26282b"/>
      <stop offset=".3" stop-color="#6a6e74"/>
      <stop offset=".4" stop-color="#9ca1a7"/>
      <stop offset=".55" stop-color="#5a5e63"/>
      <stop offset="1" stop-color="#1f2123"/>
    </linearGradient>
    <linearGradient id="copper" x1="0" x2="1">
      <stop offset="0" stop-color="#3b1d0c"/>
      <stop offset=".3" stop-color="#b86a36"/>
      <stop offset=".4" stop-color="#f3b27d"/>
      <stop offset=".55" stop-color="#9a5427"/>
      <stop offset="1" stop-color="#2e160a"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".14"/>
      <stop offset=".12" stop-color="#fff" stop-opacity=".35"/>
      <stop offset=".22" stop-color="#fff" stop-opacity=".04"/>
      <stop offset=".8" stop-color="#fff" stop-opacity=".03"/>
      <stop offset=".92" stop-color="#fff" stop-opacity=".22"/>
      <stop offset="1" stop-color="#fff" stop-opacity=".08"/>
    </linearGradient>
    <linearGradient id="diesel" x1="0" x2="1">
      <stop offset="0" stop-color="#6b4a12"/>
      <stop offset=".35" stop-color="#d9a441"/>
      <stop offset=".5" stop-color="#f3c96a"/>
      <stop offset="1" stop-color="#5c3e0e"/>
    </linearGradient>
    <radialGradient id="accentGlow">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity=".55"/>
      <stop offset=".45" stop-color="${ACCENT}" stop-opacity=".14"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="whiteGlow">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="shadow">
      <stop offset="0" stop-color="#000" stop-opacity=".85"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope=".07"/></feComponentTransfer>
    </filter>
    <filter id="blur4"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="blur12"><feGaussianBlur stdDeviation="12"/></filter>
    <filter id="blur30"><feGaussianBlur stdDeviation="30"/></filter>
    <filter id="soot" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="4" seed="3"/>
      <feColorMatrix type="matrix" values="0 0 0 0 .07  0 0 0 0 .05  0 0 0 0 .03  0 0 0 -2.2 1.35"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
    <filter id="crust" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency=".12" numOctaves="3" seed="11"/>
      <feColorMatrix type="matrix" values="0 0 0 0 .33  0 0 0 0 .19  0 0 0 0 .08  0 0 0 -3 1.6"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
    <filter id="mist" x="-50%" y="-50%" width="200%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency=".02 .06" numOctaves="3" seed="5"/>
      <feDisplacementMap in="SourceGraphic" scale="40"/>
      <feGaussianBlur stdDeviation="3"/>
    </filter>
    ${extra}
  </defs>`;
}

/** Tamna "studijska" pozadina s reflektorom, vinjetom i zrnom */
function studio(
  w,
  h,
  { spotX = 0.65, spotY = 0.35, spot = 0.9, accent = 0.25, grid = false } = {},
) {
  const r = Math.max(w, h);
  return `
  <rect width="${w}" height="${h}" fill="#0a0b0d"/>
  <radialGradient id="spot" cx="${spotX}" cy="${spotY}" r=".75">
    <stop offset="0" stop-color="#3a3f46" stop-opacity="${spot}"/>
    <stop offset=".45" stop-color="#16181c" stop-opacity=".9"/>
    <stop offset="1" stop-color="#08090a"/>
  </radialGradient>
  <rect width="${w}" height="${h}" fill="url(#spot)"/>
  ${
    grid
      ? `<g stroke="#fff" stroke-opacity=".035">${Array.from({ length: Math.ceil(w / 80) }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="${h}"/>`).join('')}${Array.from({ length: Math.ceil(h / 80) }, (_, i) => `<line x1="0" y1="${i * 80}" x2="${w}" y2="${i * 80}"/>`).join('')}</g>`
      : ''
  }
  <ellipse cx="${w * 0.9}" cy="${h * 0.95}" rx="${r * 0.45}" ry="${r * 0.3}" fill="url(#accentGlow)" opacity="${accent}"/>`;
}

function vignette(w, h, strength = 0.75) {
  return `
  <radialGradient id="vig" cx=".5" cy=".5" r=".75">
    <stop offset=".55" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity="${strength}"/>
  </radialGradient>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
}

function bokeh(w, h, seed, count = 18, color = '#ffffff') {
  const rand = rng(seed);
  let out = '<g filter="url(#blur12)">';
  for (let i = 0; i < count; i++) {
    const x = rand() * w;
    const y = rand() * h * 0.7;
    const rr = 10 + rand() * 45;
    const c = rand() > 0.8 ? ACCENT : color;
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rr.toFixed(0)}" fill="${c}" opacity="${(0.03 + rand() * 0.08).toFixed(3)}"/>`;
  }
  return out + '</g>';
}

/* ------------------------------------------------------------------------ */
/*  Injektor (lokalne koordinate: os x = 0, vrh y = 0, dno ≈ 980)            */
/* ------------------------------------------------------------------------ */
function injector(variant = 'solenoid') {
  const piezo = variant === 'piezo';
  const delphi = variant === 'delphi';
  const denso = variant === 'denso';
  const bodyEnd = piezo ? 600 : delphi ? 430 : 470;
  const shift = bodyEnd - 470;
  const plastic = delphi ? 'url(#plasticGrey)' : 'url(#plasticBlack)';

  // Konektor
  let connector = `
    <rect x="-72" y="0" width="144" height="${piezo ? 190 : 150}" rx="20" fill="${plastic}"/>
    <rect x="-72" y="0" width="144" height="18" rx="9" fill="#fff" opacity=".06"/>
    <rect x="-60" y="${piezo ? 150 : 110}" width="120" height="8" rx="4" fill="#000" opacity=".5"/>`;
  if (delphi) {
    connector += `
    <rect x="-38" y="-70" width="76" height="80" rx="10" fill="${plastic}"/>
    <rect x="-26" y="-58" width="52" height="30" rx="4" fill="#0b0c0d" opacity=".8"/>`;
  } else {
    connector += `
    <rect x="60" y="34" width="${denso ? 70 : 92}" height="74" rx="12" fill="${plastic}"/>
    <rect x="${denso ? 118 : 140}" y="46" width="14" height="50" rx="4" fill="#0b0c0d"/>
    <rect x="74" y="28" width="40" height="10" rx="3" fill="#000" opacity=".6"/>`;
  }
  const neckTop = piezo ? 190 : 150;

  // Dovod goriva
  const inletY = denso ? 300 + shift : 320 + shift;
  const inlet = denso
    ? `<g transform="translate(58 ${inletY}) rotate(-38)">
         <rect x="0" y="-26" width="170" height="52" fill="url(#steelH)"/>
         <rect x="110" y="-38" width="64" height="76" rx="6" fill="url(#steelH)"/>
         ${[120, 134, 148, 162].map((x) => `<line x1="${x}" y1="-38" x2="${x}" y2="38" stroke="#000" stroke-opacity=".35" stroke-width="3"/>`).join('')}
       </g>`
    : `<rect x="56" y="${inletY}" width="150" height="54" fill="url(#steelH)"/>
       <rect x="160" y="${inletY - 12}" width="64" height="78" rx="6" fill="url(#steelH)"/>
       ${[170, 184, 198, 212].map((x) => `<line x1="${x}" y1="${inletY - 12}" x2="${x}" y2="${inletY + 66}" stroke="#000" stroke-opacity=".35" stroke-width="3"/>`).join('')}`;

  return `
  <g>
    ${connector}
    <rect x="-46" y="${neckTop}" width="92" height="44" fill="url(#darkMetal)"/>
    <!-- gornje tijelo -->
    <rect x="-62" y="${neckTop + 40}" width="124" height="${bodyEnd - neckTop - 40}" rx="6" fill="url(#steel)"/>
    ${piezo ? `<rect x="-62" y="${neckTop + 90}" width="124" height="200" fill="#000" opacity=".25"/>` : ''}
    <rect x="-62" y="${neckTop + 70}" width="124" height="6" fill="#000" opacity=".35"/>
    <!-- šesterokut -->
    <path d="M-74 ${bodyEnd - 150} h148 v70 h-148z" fill="url(#steel)"/>
    <line x1="-37" y1="${bodyEnd - 150}" x2="-37" y2="${bodyEnd - 80}" stroke="#000" stroke-opacity=".35" stroke-width="3"/>
    <line x1="37" y1="${bodyEnd - 150}" x2="37" y2="${bodyEnd - 80}" stroke="#000" stroke-opacity=".35" stroke-width="3"/>
    ${inlet}
    <!-- povrat -->
    <rect x="-100" y="${neckTop + 50}" width="40" height="34" rx="6" fill="url(#steelH)"/>
    <!-- prsten -->
    <rect x="-58" y="${bodyEnd}" width="116" height="22" fill="url(#darkMetal)"/>
    <!-- donje tijelo -->
    <rect x="-52" y="${bodyEnd + 22}" width="104" height="${700 - 492}" fill="url(#steel)"/>
    <!-- matica dizne -->
    <rect x="-60" y="${bodyEnd + 230}" width="120" height="100" rx="4" fill="url(#steel)"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="-60" y1="${bodyEnd + 240 + i * 16}" x2="60" y2="${bodyEnd + 240 + i * 16}" stroke="#000" stroke-opacity=".18" stroke-width="2"/>`).join('')}
    <path d="M-60 ${bodyEnd + 330} L60 ${bodyEnd + 330} L32 ${bodyEnd + 392} L-32 ${bodyEnd + 392} Z" fill="url(#steel)"/>
    <!-- bakrena podloška -->
    <rect x="-36" y="${bodyEnd + 392}" width="72" height="14" rx="3" fill="url(#copper)"/>
    <!-- dizna -->
    <rect x="-19" y="${bodyEnd + 406}" width="38" height="92" fill="url(#steel)"/>
    <path d="M-19 ${bodyEnd + 498} Q0 ${bodyEnd + 526} 19 ${bodyEnd + 498} Z" fill="url(#steel)"/>
  </g>`;
}

function injectorHeight(variant) {
  return (variant === 'piezo' ? 600 : variant === 'delphi' ? 430 : 470) + 526;
}

/** Postavlja injektor u scenu: centar (cx, cy), visina u px, rotacija */
function placeInjector(variant, cx, cy, heightPx, rot = 0, extra = '') {
  const hh = injectorHeight(variant);
  const s = heightPx / hh;
  return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s}) translate(0 ${-hh / 2})" ${extra}>${injector(variant)}</g>`;
}

function groundShadow(cx, cy, rx, ry, opacity = 0.8) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#shadow)" opacity="${opacity}"/>`;
}

/* ------------------------------------------------------------------------ */
/*  Scene                                                                    */
/* ------------------------------------------------------------------------ */
const scenes = {};

scenes['injector-hero'] = {
  w: 1920,
  h: 1200,
  svg: (w, h) => `
  ${studio(w, h, { spotX: 0.72, spotY: 0.4, spot: 1, accent: 0.5, grid: true })}
  ${bokeh(w, h, 4, 26)}
  <g filter="url(#blur12)" opacity=".5">${placeInjector('piezo', 1780, 520, 900, 14)}</g>
  <ellipse cx="1320" cy="560" rx="520" ry="520" fill="url(#whiteGlow)" opacity=".5"/>
  ${groundShadow(1330, 1110, 420, 50, 0.9)}
  ${placeInjector('solenoid', 1300, 560, 1060, -20)}
  <!-- rim light -->
  <g opacity=".55" style="mix-blend-mode:screen">${placeInjector(
    'solenoid',
    1306,
    556,
    1060,
    -20,
    'filter="url(#blur4)"',
  )
    .replace(/url\(#steel\)/g, '#ff6a2a')
    .replace(/url\(#plasticBlack\)/g, 'none')
    .replace(/url\(#darkMetal\)/g, 'none')
    .replace(/url\(#steelH\)/g, 'none')
    .replace(/url\(#copper\)/g, 'none')}</g>
  ${placeInjector('solenoid', 1300, 560, 1060, -20)}
  <!-- mlaz goriva -->
  <g transform="translate(1485 1045) rotate(-20)">
    <path d="M0 0 L-70 260 L70 260 Z" fill="url(#whiteGlow)" filter="url(#mist)" opacity=".9"/>
    <path d="M0 0 L-20 180 L20 180 Z" fill="#fff" opacity=".08" filter="url(#blur4)"/>
  </g>
  ${vignette(w, h, 0.8)}`,
};

scenes['injector-solenoid'] = {
  svg: (w, h) => `
  ${studio(w, h, { spotX: 0.5, spotY: 0.35, accent: 0.35 })}
  ${bokeh(w, h, 12, 14)}
  ${groundShadow(800, 990, 300, 34)}
  ${placeInjector('solenoid', 800, 520, 900, -8)}
  ${vignette(w, h)}`,
};

scenes['injector-delphi'] = {
  svg: (w, h) => `
  ${studio(w, h, { spotX: 0.4, spotY: 0.3, accent: 0.3 })}
  ${bokeh(w, h, 21, 12)}
  ${groundShadow(760, 990, 300, 34)}
  ${placeInjector('delphi', 760, 540, 860, 10)}
  ${vignette(w, h)}`,
};

scenes['injector-denso'] = {
  svg: (w, h) => `
  ${studio(w, h, { spotX: 0.6, spotY: 0.3, accent: 0.3 })}
  ${bokeh(w, h, 33, 12)}
  ${groundShadow(820, 990, 300, 34)}
  ${placeInjector('denso', 820, 530, 880, -4)}
  ${vignette(w, h)}`,
};

scenes['injector-piezo'] = {
  svg: (w, h) => `
  ${studio(w, h, { spotX: 0.5, spotY: 0.3, accent: 0.3 })}
  ${bokeh(w, h, 44, 12)}
  ${groundShadow(800, 1000, 300, 34)}
  ${placeInjector('piezo', 800, 520, 940, 58)}
  ${vignette(w, h)}`,
};

scenes['common-rail'] = {
  svg: (w, h) => {
    const xs = [400, 660, 920, 1180];
    return `
  ${studio(w, h, { spotX: 0.5, spotY: 0.3, accent: 0.3, grid: true })}
  ${bokeh(w, h, 7, 10)}
  ${groundShadow(800, 990, 640, 40)}
  <!-- letva -->
  <rect x="230" y="250" width="1150" height="70" rx="35" fill="url(#steelH)"/>
  <rect x="1360" y="240" width="90" height="90" rx="14" fill="url(#steelH)"/>
  <rect x="1440" y="262" width="60" height="46" rx="8" fill="url(#plasticBlack)"/>
  <rect x="170" y="262" width="80" height="46" rx="8" fill="url(#steelH)"/>
  ${xs.map((x) => `<rect x="${x - 28}" y="300" width="56" height="50" rx="6" fill="url(#steel)"/>`).join('')}
  <!-- cijevi -->
  ${xs.map((x, i) => `<path d="M${x} 340 C ${x} 420, ${x + 150} 430, ${x + 150} 520" fill="none" stroke="#1a1c1f" stroke-width="30" stroke-linecap="round"/><path d="M${x} 340 C ${x} 420, ${x + 150} 430, ${x + 150} 520" fill="none" stroke="#9aa2ab" stroke-width="16" stroke-linecap="round"/><path d="M${x - 4} 340 C ${x - 4} 420, ${x + 146} 430, ${x + 146} 520" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>`).join('')}
  ${xs.map((x) => placeInjector('solenoid', x + 30, 700, 520, 0)).join('')}
  <!-- tlačni vod -->
  <path d="M1450 290 C 1540 290, 1540 520, 1480 700" fill="none" stroke="#8a929b" stroke-width="16" stroke-linecap="round"/>
  <circle cx="1500" cy="620" r="4" fill="${ACCENT}"/>
  ${vignette(w, h)}`;
  },
};

scenes['injector-repair'] = {
  svg: (w, h) => {
    // Rastavljeni dijelovi na podlozi s mrežom
    const spring = Array.from(
      { length: 14 },
      (_, i) => `${i === 0 ? 'M' : 'L'}${980 + i * 16} ${i % 2 ? 720 : 770}`,
    ).join(' ');
    return `
  <rect width="${w}" height="${h}" fill="#101214"/>
  <g stroke="#2d6b5a" stroke-opacity=".22">${Array.from({ length: 41 }, (_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${h}"/>`).join('')}${Array.from({ length: 28 }, (_, i) => `<line x1="0" y1="${i * 40}" x2="${w}" y2="${i * 40}"/>`).join('')}</g>
  <ellipse cx="800" cy="500" rx="900" ry="600" fill="url(#whiteGlow)" opacity=".5"/>
  <!-- tijelo -->
  <g transform="translate(330 560) rotate(-90) scale(.62) translate(0 -500)">${injector('solenoid')}</g>
  <!-- igla -->
  <rect x="200" y="840" width="620" height="16" rx="8" fill="url(#steelH)"/>
  <path d="M820 840 L870 848 L820 856 Z" fill="#9aa2ab"/>
  <!-- matica -->
  <g transform="translate(1180 330)"><rect x="-80" y="-60" width="160" height="120" rx="10" fill="url(#steel)"/><ellipse cx="0" cy="-60" rx="80" ry="18" fill="#0b0c0e"/><ellipse cx="0" cy="-60" rx="54" ry="11" fill="#000"/></g>
  <!-- opruga -->
  <path d="${spring}" fill="none" stroke="#c9d0d8" stroke-width="7" stroke-linejoin="round"/>
  <!-- ventilski sklop -->
  <g transform="translate(1320 700)"><rect x="-50" y="-40" width="100" height="80" rx="8" fill="url(#steel)"/><rect x="-22" y="-60" width="44" height="30" rx="4" fill="url(#steel)"/><circle cx="0" cy="0" r="10" fill="#111"/></g>
  <!-- podložke -->
  ${[0, 1, 2, 3].map((i) => `<g transform="translate(${1000 + i * 90} 930)"><circle r="30" fill="url(#steel)"/><circle r="12" fill="#101214"/></g>`).join('')}
  <circle cx="1400" cy="930" r="30" fill="url(#copper)"/><circle cx="1400" cy="930" r="14" fill="#101214"/>
  <!-- dizna -->
  <g transform="translate(700 330) rotate(90)"><rect x="-26" y="-100" width="52" height="170" fill="url(#steel)"/><rect x="-14" y="70" width="28" height="80" fill="url(#steel)"/><path d="M-14 150 Q0 170 14 150Z" fill="#9aa2ab"/></g>
  <!-- oznaka alata -->
  <rect x="80" y="80" width="10" height="120" fill="${ACCENT}" opacity=".8"/>
  ${vignette(w, h, 0.7)}`;
  },
};

function gauge(cx, cy, r, value) {
  const ticks = Array.from({ length: 41 }, (_, i) => {
    const a = (-225 + i * 6.75) * (Math.PI / 180);
    const len = i % 5 ? 10 : 22;
    return `<line x1="${cx + Math.cos(a) * (r - 8)}" y1="${cy + Math.sin(a) * (r - 8)}" x2="${cx + Math.cos(a) * (r - 8 - len)}" y2="${cy + Math.sin(a) * (r - 8 - len)}" stroke="${i > 32 ? ACCENT : '#cfd5db'}" stroke-width="${i % 5 ? 2 : 4}"/>`;
  }).join('');
  const a = (-225 + value * 270) * (Math.PI / 180);
  return `
  <circle cx="${cx}" cy="${cy}" r="${r + 18}" fill="url(#steelH)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0c0d0f"/>
  ${ticks}
  <line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * (r - 30)}" y2="${cy + Math.sin(a) * (r - 30)}" stroke="${ACCENT}" stroke-width="6" stroke-linecap="round"/>
  <circle cx="${cx}" cy="${cy}" r="16" fill="url(#steelH)"/>
  <ellipse cx="${cx - r * 0.3}" cy="${cy - r * 0.45}" rx="${r * 0.6}" ry="${r * 0.3}" fill="#fff" opacity=".06"/>`;
}

function cylinder(x, y, w, hgt, level, highlight = false) {
  const lvl = y + hgt * (1 - level);
  const ticks = Array.from(
    { length: 12 },
    (_, i) =>
      `<line x1="${x + 6}" y1="${y + 20 + i * ((hgt - 40) / 11)}" x2="${x + (i % 2 ? 18 : 28)}" y2="${y + 20 + i * ((hgt - 40) / 11)}" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>`,
  ).join('');
  return `
  <rect x="${x}" y="${lvl}" width="${w}" height="${y + hgt - lvl}" fill="url(#diesel)" opacity="${highlight ? 1 : 0.85}"/>
  <ellipse cx="${x + w / 2}" cy="${lvl}" rx="${w / 2}" ry="6" fill="#f7d98d" opacity=".8"/>
  <rect x="${x}" y="${y}" width="${w}" height="${hgt}" rx="6" fill="url(#glass)" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>
  ${ticks}
  ${highlight ? `<rect x="${x - 8}" y="${lvl - 3}" width="${w + 16}" height="6" fill="${ACCENT}"/>` : ''}`;
}

scenes['injector-testing'] = {
  svg: (w, h) => {
    const xs = [620, 830, 1040, 1250];
    const levels = [0.62, 0.6, 0.38, 0.61];
    return `
  ${studio(w, h, { spotX: 0.55, spotY: 0.2, accent: 0.25 })}
  <!-- kućište stola -->
  <rect x="80" y="90" width="1440" height="900" rx="26" fill="#15171a" stroke="#2a2e34" stroke-width="3"/>
  <rect x="80" y="90" width="1440" height="80" rx="26" fill="#1c1f23"/>
  <rect x="120" y="118" width="200" height="24" rx="6" fill="${ACCENT}" opacity=".85"/>
  ${gauge(300, 420, 150, 0.72)}
  <rect x="170" y="640" width="260" height="90" rx="10" fill="#050606" stroke="#2a2e34"/>
  <text x="300" y="702" font-family="DejaVu Sans Mono" font-size="48" fill="${ACCENT}" text-anchor="middle">1600 bar</text>
  <rect x="170" y="760" width="120" height="50" rx="10" fill="#23272c"/><rect x="310" y="760" width="120" height="50" rx="10" fill="#23272c"/>
  <circle cx="200" cy="785" r="8" fill="#3ecf8e"/>
  <!-- nosač injektora -->
  <rect x="540" y="210" width="860" height="40" rx="8" fill="url(#steelH)"/>
  ${xs.map((x) => placeInjector('solenoid', x, 340, 250, 0)).join('')}
  ${xs.map((x) => `<path d="M${x} 460 L${x - 26} 540 L${x + 26} 540 Z" fill="url(#whiteGlow)" filter="url(#mist)"/>`).join('')}
  ${xs.map((x, i) => cylinder(x - 45, 560, 90, 360, levels[i], i === 2)).join('')}
  <rect x="540" y="920" width="860" height="24" rx="6" fill="url(#steelH)"/>
  ${vignette(w, h, 0.6)}`;
  },
};

scenes['high-pressure-pump'] = {
  svg: (w, h) => `
  ${studio(w, h, { spotX: 0.5, spotY: 0.35, accent: 0.3 })}
  ${bokeh(w, h, 91, 10)}
  ${groundShadow(820, 930, 520, 50)}
  <!-- vratilo i prirubnica -->
  <rect x="240" y="470" width="220" height="70" fill="url(#steelH)"/>
  <rect x="200" y="455" width="50" height="100" rx="8" fill="url(#steelH)"/>
  <ellipse cx="460" cy="505" rx="40" ry="190" fill="url(#steel)"/>
  <!-- kućište -->
  <path d="M460 340 Q470 290 560 285 L1060 285 Q1180 290 1190 380 L1200 640 Q1190 740 1060 745 L560 745 Q470 740 460 680 Z" fill="url(#steelWarm)"/>
  <path d="M560 285 L1060 285 Q1180 290 1190 380 L1190 400 L460 400 L460 340 Q470 290 560 285Z" fill="#fff" opacity=".07"/>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="${560 + i * 120}" y="760" width="70" height="30" rx="6" fill="url(#steelH)"/>`).join('')}
  <!-- glave -->
  ${[640, 900].map((x) => `<rect x="${x - 70}" y="160" width="140" height="140" rx="16" fill="url(#steel)"/><rect x="${x - 40}" y="100" width="80" height="70" rx="8" fill="url(#steel)"/><circle cx="${x}" cy="230" r="22" fill="#111"/>`).join('')}
  <!-- regulator -->
  <rect x="1180" y="440" width="170" height="120" rx="16" fill="url(#plasticBlack)"/>
  <rect x="1340" y="470" width="60" height="60" rx="10" fill="url(#plasticBlack)"/>
  <!-- izlaz -->
  <path d="M900 100 C 900 20, 1120 30, 1180 120" fill="none" stroke="#8a929b" stroke-width="18" stroke-linecap="round"/>
  ${vignette(w, h)}`,
};

scenes['diagnostics'] = {
  svg: (w, h) => {
    const bars = [0.35, -0.5, 3.6, 0.15];
    const rand = rng(3);
    const line = Array.from(
      { length: 60 },
      (_, i) => `${i ? 'L' : 'M'}${880 + i * 9} ${420 - Math.sin(i / 5) * 40 - rand() * 18}`,
    ).join(' ');
    return `
  ${studio(w, h, { spotX: 0.5, spotY: 0.45, spot: 0.7, accent: 0.4 })}
  ${bokeh(w, h, 71, 20)}
  <g transform="translate(160 130)">
    <rect width="1280" height="800" rx="30" fill="#050506" stroke="#2a2e34" stroke-width="4"/>
    <rect x="30" y="30" width="1220" height="740" rx="12" fill="#0d0f12"/>
    <rect x="30" y="30" width="1220" height="64" rx="12" fill="#15181c"/>
    <circle cx="70" cy="62" r="9" fill="${ACCENT}"/><rect x="95" y="52" width="220" height="20" rx="5" fill="#2a2e34"/>
    <rect x="1080" y="50" width="140" height="24" rx="12" fill="#3ecf8e" opacity=".25"/>
    <!-- korekcije -->
    <text x="80" y="160" font-family="DejaVu Sans Mono" font-size="24" fill="#8b929a">KOREKCIJE KOLIČINE · mg/hub</text>
    <line x1="360" y1="200" x2="360" y2="660" stroke="#3a3f46" stroke-width="2"/>
    ${bars
      .map((v, i) => {
        const y = 230 + i * 110;
        const wBar = Math.abs(v) * 40;
        const x = v < 0 ? 360 - wBar : 360;
        return `<text x="80" y="${y + 38}" font-family="DejaVu Sans Mono" font-size="30" fill="#cfd5db">CIL ${i + 1}</text><rect x="200" y="${y}" width="320" height="56" rx="8" fill="#171a1e"/><rect x="${x}" y="${y}" width="${wBar}" height="56" rx="6" fill="${Math.abs(v) > 2 ? ACCENT : '#9aa2ab'}"/><text x="560" y="${y + 38}" font-family="DejaVu Sans Mono" font-size="28" fill="${Math.abs(v) > 2 ? ACCENT : '#cfd5db'}">${v > 0 ? '+' : ''}${v.toFixed(2)}</text>`;
      })
      .join('')}
    <!-- graf tlaka -->
    <rect x="840" y="180" width="580" height="300" rx="10" fill="#111418" transform="translate(-160 0)"/>
    <g transform="translate(-160 0)">
      <text x="870" y="220" font-family="DejaVu Sans Mono" font-size="22" fill="#8b929a">TLAK RAIL · bar</text>
      ${[0, 1, 2, 3].map((i) => `<line x1="870" y1="${280 + i * 50}" x2="1390" y2="${280 + i * 50}" stroke="#23272c"/>`).join('')}
      <path d="${line}" fill="none" stroke="${ACCENT}" stroke-width="4"/>
    </g>
    <rect x="680" y="520" width="560" height="220" rx="10" fill="#111418"/>
    <text x="710" y="570" font-family="DejaVu Sans Mono" font-size="22" fill="#8b929a">STATUS</text>
    <text x="710" y="630" font-family="DejaVu Sans Mono" font-size="34" fill="${ACCENT}">CIL 3 › izvan tolerancije</text>
    <text x="710" y="690" font-family="DejaVu Sans Mono" font-size="26" fill="#cfd5db">Preporuka: test na stolu</text>
    <rect x="30" y="30" width="1220" height="740" rx="12" fill="url(#glass)" opacity=".4"/>
  </g>
  ${vignette(w, h, 0.7)}`;
  },
};

scenes['injector-coding'] = {
  svg: (w, h) => {
    const rand = rng(19);
    const cells = [];
    for (let y = 0; y < 18; y++)
      for (let x = 0; x < 18; x++) {
        const border = x === 0 || y === 17 || (y === 0 && x % 2 === 0) || (x === 17 && y % 2 === 1);
        if (border || rand() > 0.52)
          cells.push(`<rect x="${x * 16}" y="${y * 16}" width="16" height="16"/>`);
      }
    return `
  <rect width="${w}" height="${h}" fill="#0c0d0f"/>
  <!-- tijelo injektora u krupnom planu -->
  <rect x="-20" y="170" width="${w + 40}" height="720" fill="url(#steelH)"/>
  <rect x="-20" y="170" width="${w + 40}" height="720" fill="#000" opacity=".2"/>
  ${Array.from({ length: 30 }, (_, i) => `<line x1="0" y1="${190 + i * 24}" x2="${w}" y2="${190 + i * 24}" stroke="#fff" stroke-opacity=".03"/>`).join('')}
  <!-- lasersko graviranje -->
  <g transform="translate(360 380)" fill="#1a1c1f" opacity=".9">${cells.join('')}</g>
  <g font-family="DejaVu Sans Mono" fill="#15171a" opacity=".9">
    <text x="720" y="450" font-size="64" letter-spacing="6">A7F3 K2Q9</text>
    <text x="720" y="540" font-size="64" letter-spacing="6">M4TR 8XWD</text>
    <text x="720" y="630" font-size="40" letter-spacing="4">0 445 XXX XXX</text>
  </g>
  <rect x="330" y="350" width="1000" height="350" rx="10" fill="none" stroke="${ACCENT}" stroke-width="4" stroke-dasharray="18 12"/>
  <ellipse cx="800" cy="330" rx="700" ry="120" fill="#fff" opacity=".08" filter="url(#blur30)"/>
  ${vignette(w, h, 0.8)}`;
  },
};

scenes['workshop'] = {
  svg: (w, h) => {
    const vp = [800, 430];
    return `
  <rect width="${w}" height="${h}" fill="#0b0c0e"/>
  <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#15171a"/><stop offset="1" stop-color="#232629"/></linearGradient>
  <path d="M0 ${h} L0 620 L${vp[0]} ${vp[1]} L${w} 620 L${w} ${h}Z" fill="url(#floor)"/>
  ${Array.from({ length: 13 }, (_, i) => `<line x1="${vp[0]}" y1="${vp[1]}" x2="${-800 + i * 266}" y2="${h}" stroke="#fff" stroke-opacity=".05"/>`).join('')}
  ${[640, 700, 790, 920].map((y) => `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#fff" stroke-opacity=".04"/>`).join('')}
  <!-- zidovi -->
  <path d="M0 0 L${vp[0] - 300} 140 L${vp[0] - 300} ${vp[1] + 30} L0 620Z" fill="#121418"/>
  <path d="M${w} 0 L${vp[0] + 300} 140 L${vp[0] + 300} ${vp[1] + 30} L${w} 620Z" fill="#101215"/>
  <rect x="${vp[0] - 300}" y="140" width="600" height="${vp[1] - 110}" fill="#16191c"/>
  <!-- svjetla -->
  ${[0, 1, 2, 3]
    .map((i) => {
      const y = 30 + i * 30;
      const half = 520 - i * 90;
      return `<rect x="${vp[0] - half}" y="${y}" width="${half * 2}" height="${10 - i * 2}" rx="4" fill="#f5f7fa" opacity="${0.9 - i * 0.15}"/><rect x="${vp[0] - half}" y="${y}" width="${half * 2}" height="40" fill="#fff" opacity=".06" filter="url(#blur12)"/>`;
    })
    .join('')}
  <!-- radni stolovi -->
  <path d="M80 720 L520 600 L520 640 L80 780Z" fill="#2a2e33"/><path d="M80 780 L520 640 L520 760 L80 950Z" fill="#131518"/>
  <path d="M${w - 80} 720 L${w - 520} 600 L${w - 520} 640 L${w - 80} 780Z" fill="#2a2e33"/><path d="M${w - 80} 780 L${w - 520} 640 L${w - 520} 760 L${w - 80} 950Z" fill="#131518"/>
  <rect x="${vp[0] - 180}" y="420" width="360" height="130" rx="10" fill="#1b1e22" stroke="#2c3036"/>
  <rect x="${vp[0] - 150}" y="440" width="120" height="70" rx="6" fill="#0b0c0e"/><circle cx="${vp[0] + 80}" cy="475" r="32" fill="#0b0c0e" stroke="#555"/>
  <rect x="${vp[0] - 180}" y="420" width="360" height="12" fill="${ACCENT}" opacity=".85"/>
  <!-- police -->
  ${[200, 260, 320].map((y) => `<path d="M40 ${y} L420 ${y + 70} L420 ${y + 76} L40 ${y + 8}Z" fill="#2c3035"/>`).join('')}
  ${[200, 260, 320].map((y) => `<path d="M${w - 40} ${y} L${w - 420} ${y + 70} L${w - 420} ${y + 76} L${w - 40} ${y + 8}Z" fill="#2c3035"/>`).join('')}
  <!-- odraz -->
  <ellipse cx="${vp[0]}" cy="900" rx="500" ry="80" fill="#fff" opacity=".04" filter="url(#blur30)"/>
  ${bokeh(w, h, 5, 10)}
  ${vignette(w, h, 0.7)}`;
  },
};

scenes['diesel-technician'] = {
  svg: (w, h) => `
  ${studio(w, h, { spotX: 0.45, spotY: 0.3, accent: 0.35 })}
  <rect x="0" y="760" width="${w}" height="${h - 760}" fill="#141618"/>
  <rect x="0" y="760" width="${w}" height="6" fill="#2a2e33"/>
  ${groundShadow(700, 800, 480, 30)}
  <!-- škripac -->
  <rect x="520" y="620" width="360" height="150" rx="10" fill="url(#darkMetal)"/>
  <rect x="560" y="560" width="280" height="80" rx="8" fill="url(#steelH)"/>
  ${placeInjector('solenoid', 700, 360, 520, 0)}
  <!-- momentni ključ -->
  <g transform="translate(700 470) rotate(-12)">
    <rect x="0" y="-18" width="720" height="36" rx="18" fill="url(#steelH)"/>
    <rect x="420" y="-26" width="300" height="52" rx="26" fill="url(#plasticBlack)"/>
    <rect x="470" y="-26" width="16" height="52" fill="${ACCENT}"/>
    <rect x="300" y="-14" width="100" height="28" rx="4" fill="#0b0c0e"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<line x1="${310 + i * 13}" y1="-14" x2="${310 + i * 13}" y2="${i % 2 ? -2 : 4}" stroke="#cfd5db" stroke-width="2"/>`).join('')}
    <circle cx="0" cy="0" r="54" fill="url(#steel)"/><circle cx="0" cy="0" r="30" fill="#15171a"/>
  </g>
  ${bokeh(w, h, 55, 12)}
  ${vignette(w, h, 0.75)}`,
};

function nozzleFace(cx, cy, r, { dirty = false } = {}) {
  const holes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 + 0.2;
    const hx = cx + Math.cos(a) * r * 0.42;
    const hy = cy + Math.sin(a) * r * 0.42;
    return `<circle cx="${hx}" cy="${hy}" r="${r * 0.05}" fill="#050505"/><circle cx="${hx}" cy="${hy}" r="${r * 0.068}" fill="none" stroke="${dirty ? '#2a1a0c' : '#e9eef3'}" stroke-opacity="${dirty ? 0.9 : 0.5}" stroke-width="${r * 0.012}"/>`;
  }).join('');
  return `
  <radialGradient id="face" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#f4f7fa"/><stop offset=".35" stop-color="#a7afb8"/><stop offset=".75" stop-color="#454b52"/><stop offset="1" stop-color="#15171a"/></radialGradient>
  <circle cx="${cx}" cy="${cy}" r="${r * 1.12}" fill="url(#darkMetal)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#face)"/>
  ${Array.from({ length: 10 }, (_, i) => `<circle cx="${cx}" cy="${cy}" r="${r * (0.12 + i * 0.085)}" fill="none" stroke="#000" stroke-opacity=".06" stroke-width="2"/>`).join('')}
  ${holes}
  <ellipse cx="${cx - r * 0.3}" cy="${cy - r * 0.35}" rx="${r * 0.35}" ry="${r * 0.18}" fill="#fff" opacity=".18" filter="url(#blur12)"/>`;
}

scenes['nozzle-macro'] = {
  w: 1600,
  h: 1600,
  svg: (w, h) => `
  ${studio(w, h, { spotX: 0.5, spotY: 0.5, spot: 0.8, accent: 0.35 })}
  ${nozzleFace(800, 800, 520)}
  ${vignette(w, h, 0.85)}`,
};

scenes['microscope-inspection'] = {
  w: 1600,
  h: 1600,
  svg: (w, h) => {
    const cx = 800,
      cy = 800,
      r = 640;
    const rand = rng(77);
    const scratches = Array.from({ length: 26 }, () => {
      const a = rand() * Math.PI * 2;
      const rr = r * (0.3 + rand() * 0.25);
      return `<path d="M${cx + Math.cos(a) * rr} ${cy + Math.sin(a) * rr} q ${rand() * 40 - 20} ${rand() * 40 - 20} ${rand() * 90 - 45} ${rand() * 90 - 45}" stroke="#fff" stroke-opacity=".25" stroke-width="2" fill="none"/>`;
    }).join('');
    return `
  <rect width="${w}" height="${h}" fill="#050506"/>
  <clipPath id="eye"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
  <g clip-path="url(#eye)">
    <radialGradient id="seat" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#050505"/><stop offset=".18" stop-color="#1a1d21"/><stop offset=".22" stop-color="#cfd6dc"/><stop offset=".3" stop-color="#7f8891"/><stop offset=".45" stop-color="#d9e0e6"/><stop offset=".6" stop-color="#5b636b"/><stop offset=".85" stop-color="#8e979f"/><stop offset="1" stop-color="#2a2f34"/></radialGradient>
    <rect width="${w}" height="${h}" fill="url(#seat)"/>
    ${Array.from({ length: 40 }, (_, i) => `<circle cx="${cx}" cy="${cy}" r="${r * 0.25 + i * 12}" fill="none" stroke="#000" stroke-opacity=".05"/>`).join('')}
    ${scratches}
    <path d="M${cx + r * 0.25} ${cy - 60} a ${r * 0.28} ${r * 0.28} 0 0 1 40 140" stroke="${ACCENT}" stroke-width="10" fill="none" opacity=".75"/>
    <!-- reticle -->
    <g stroke="#e8ecef" stroke-opacity=".7">
      <line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke-width="2"/>
      <line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}" stroke-width="2"/>
      ${Array.from({ length: 41 }, (_, i) => `<line x1="${cx - 400 + i * 20}" y1="${cy - (i % 5 ? 10 : 22)}" x2="${cx - 400 + i * 20}" y2="${cy + (i % 5 ? 10 : 22)}" stroke-width="2"/>`).join('')}
    </g>
    <text x="${cx + 30}" y="${cy - 40}" font-family="DejaVu Sans Mono" font-size="34" fill="#e8ecef" opacity=".8">0.1 mm</text>
  </g>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#000" stroke-width="60" opacity=".6" filter="url(#blur30)"/>
  ${vignette(w, h, 0.4)}`;
  },
};

scenes['ultrasonic-cleaning'] = {
  svg: (w, h) => {
    const rand = rng(88);
    const bubbles = Array.from(
      { length: 140 },
      () =>
        `<circle cx="${320 + rand() * 960}" cy="${300 + rand() * 560}" r="${2 + rand() * 9}" fill="none" stroke="#e7f3ff" stroke-opacity="${0.2 + rand() * 0.5}" stroke-width="2"/>`,
    ).join('');
    return `
  ${studio(w, h, { spotX: 0.5, spotY: 0.2, accent: 0.2 })}
  <!-- kada -->
  <path d="M220 200 L1380 200 L1300 960 L300 960Z" fill="url(#steelH)"/>
  <path d="M270 240 L1330 240 L1260 910 L340 910Z" fill="#20303a"/>
  <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d7f93" stop-opacity=".55"/><stop offset="1" stop-color="#16242d" stop-opacity=".9"/></linearGradient>
  <path d="M290 290 L1310 290 L1255 900 L345 900Z" fill="url(#liquid)"/>
  <!-- košara s dijelovima -->
  <rect x="440" y="420" width="720" height="380" rx="12" fill="none" stroke="#9aa2ab" stroke-width="6" opacity=".6"/>
  ${Array.from({ length: 18 }, (_, i) => `<line x1="${440 + i * 40}" y1="420" x2="${440 + i * 40}" y2="800" stroke="#9aa2ab" stroke-opacity=".25" stroke-width="3"/>`).join('')}
  <g opacity=".85">
    <g transform="translate(640 610) rotate(-70) scale(.3) translate(0 -500)">${injector('solenoid')}</g>
    <rect x="780" y="520" width="200" height="40" rx="20" fill="url(#steelH)"/>
    <circle cx="1060" cy="700" r="40" fill="url(#steel)"/><circle cx="1060" cy="700" r="16" fill="#20303a"/>
    <rect x="820" y="660" width="140" height="90" rx="10" fill="url(#steel)"/>
  </g>
  ${bubbles}
  <path d="M290 290 L1310 290" stroke="#fff" stroke-opacity=".4" stroke-width="3"/>
  <ellipse cx="800" cy="300" rx="480" ry="40" fill="#fff" opacity=".08" filter="url(#blur12)"/>
  <!-- upravljanje -->
  <rect x="1180" y="120" width="200" height="60" rx="10" fill="#0b0c0e"/><text x="1280" y="162" font-family="DejaVu Sans Mono" font-size="30" fill="${ACCENT}" text-anchor="middle">40 kHz</text>
  ${vignette(w, h, 0.7)}`;
  },
};

scenes['flow-measurement'] = {
  w: 1600,
  h: 2000,
  svg: (w, h) => {
    const xs = [270, 550, 830, 1110];
    const lv = [0.58, 0.6, 0.57, 0.36];
    return `
  ${studio(w, h, { spotX: 0.5, spotY: 0.25, accent: 0.35 })}
  ${bokeh(w, h, 13, 16)}
  <rect x="140" y="260" width="1320" height="60" rx="10" fill="url(#steelH)"/>
  ${xs.map((x) => `<rect x="${x + 70}" y="320" width="80" height="120" rx="8" fill="url(#steel)"/><path d="M${x + 110} 440 L${x + 85} 520 L${x + 135} 520Z" fill="url(#whiteGlow)" filter="url(#mist)"/>`).join('')}
  ${xs.map((x, i) => cylinder(x, 520, 220, 1200, lv[i], i === 3)).join('')}
  <rect x="140" y="1720" width="1320" height="60" rx="10" fill="url(#steelH)"/>
  ${xs.map((x, i) => `<text x="${x + 110}" y="1880" font-family="DejaVu Sans Mono" font-size="44" fill="${i === 3 ? ACCENT : '#aab0b8'}" text-anchor="middle">INJ ${i + 1}</text>`).join('')}
  ${vignette(w, h, 0.7)}`;
  },
};

scenes['new-parts'] = {
  svg: (w, h) => {
    const cells = [];
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 5; c++) {
        const x = 150 + c * 270,
          y = 150 + r * 270;
        let part = '';
        const kind = (r * 5 + c) % 5;
        if (kind === 0)
          part = `<rect x="${x + 70}" y="${y + 60}" width="110" height="110" rx="12" fill="url(#steel)"/><rect x="${x + 102}" y="${y + 30}" width="46" height="40" rx="6" fill="url(#steel)"/>`;
        if (kind === 1)
          part = `<rect x="${x + 100}" y="${y + 30}" width="50" height="150" fill="url(#steel)"/><path d="M${x + 100} ${y + 180} Q${x + 125} ${y + 215} ${x + 150} ${y + 180}Z" fill="#9aa2ab"/>`;
        if (kind === 2)
          part = `<circle cx="${x + 125}" cy="${y + 115}" r="70" fill="none" stroke="#1b1d20" stroke-width="22"/><circle cx="${x + 125}" cy="${y + 115}" r="70" fill="none" stroke="#3a3f46" stroke-width="4"/>`;
        if (kind === 3)
          part = `<circle cx="${x + 125}" cy="${y + 115}" r="64" fill="url(#copper)"/><circle cx="${x + 125}" cy="${y + 115}" r="30" fill="#15171a"/>`;
        if (kind === 4)
          part = `<rect x="${x + 40}" y="${y + 100}" width="170" height="30" rx="15" fill="url(#steelH)"/><circle cx="${x + 60}" cy="${y + 115}" r="22" fill="url(#steel)"/>`;
        cells.push(
          `<rect x="${x}" y="${y}" width="250" height="250" rx="18" fill="#0e1012" stroke="#23272c" stroke-width="3"/>${part}`,
        );
      }
    return `
  <rect width="${w}" height="${h}" fill="#17191c"/>
  <rect x="110" y="110" width="1380" height="850" rx="30" fill="#1f2226"/>
  ${cells.join('')}
  <ellipse cx="700" cy="300" rx="700" ry="300" fill="#fff" opacity=".05" filter="url(#blur30)"/>
  ${vignette(w, h, 0.65)}`;
  },
};

scenes['car-diesel'] = {
  w: 1600,
  h: 900,
  svg: (w, h) => `
  ${studio(w, h, { spotX: 0.5, spotY: 0.3, accent: 0.3 })}
  <rect x="0" y="690" width="${w}" height="${h - 690}" fill="#101113"/>
  ${groundShadow(800, 700, 700, 40, 1)}
  <g transform="translate(40 150) scale(1.9)">
    <linearGradient id="paint" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4a5058"/><stop offset=".35" stop-color="#1e2125"/><stop offset=".5" stop-color="#8a929b"/><stop offset=".56" stop-color="#23262a"/><stop offset="1" stop-color="#0c0d0f"/></linearGradient>
    <path d="M40 228 L40 196 C40 180 55 170 80 166 L205 146 C240 112 275 92 320 86 L480 84 C530 86 575 112 610 146 L700 156 C735 160 752 176 752 200 L752 228 L690 228 A58 58 0 0 0 574 228 L230 228 A58 58 0 0 0 114 228 Z" fill="url(#paint)" stroke="#6b737c" stroke-width="1"/>
    <path d="M228 146 C256 118 286 101 323 97 L396 96 L396 146 Z" fill="#0b0d10"/>
    <path d="M410 96 L478 96 C514 98 546 118 572 146 L410 146 Z" fill="#0b0d10"/>
    <path d="M236 142 C262 118 290 104 322 100 L360 100 L300 142Z" fill="#fff" opacity=".06"/>
    <path d="M44 190 L70 178 L96 178 L92 192Z" fill="#f4f6f8" opacity=".9"/>
    <path d="M740 180 L752 182 L752 200 L738 198Z" fill="${ACCENT}"/>
    ${[172, 632].map((cx) => `<circle cx="${cx}" cy="232" r="46" fill="#0a0b0c"/><circle cx="${cx}" cy="232" r="30" fill="url(#steel)"/><circle cx="${cx}" cy="232" r="10" fill="#1a1c1f"/>`).join('')}
  </g>
  <rect x="0" y="700" width="${w}" height="200" fill="url(#vig)" opacity=".4"/>
  ${vignette(w, h, 0.7)}`,
};

function beforeAfter(dirty) {
  return (w, h) => `
  ${studio(w, h, { spotX: 0.5, spotY: 0.4, spot: 0.85, accent: dirty ? 0.1 : 0.35 })}
  <clipPath id="tipClip"><path d="M470 60 L1130 60 L1130 520 Q1130 600 1050 640 L940 700 Q800 760 660 700 L550 640 Q470 600 470 520Z"/></clipPath>
  <!-- tijelo dizne (bočni pogled, krupni plan) -->
  <rect x="470" y="-40" width="660" height="620" fill="url(#steel)"/>
  <path d="M470 520 Q470 600 550 640 L660 700 Q800 760 940 700 L1050 640 Q1130 600 1130 520Z" fill="url(#steel)"/>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="470" y="${40 + i * 90}" width="660" height="3" fill="#000" opacity=".15"/>`).join('')}
  <!-- mlazni otvori -->
  ${[
    [610, 640],
    [800, 710],
    [990, 640],
    [700, 690],
    [900, 690],
  ]
    .map(
      ([x, y]) =>
        `<ellipse cx="${x}" cy="${y}" rx="18" ry="12" fill="#050505"/><ellipse cx="${x}" cy="${y}" rx="26" ry="18" fill="none" stroke="${dirty ? '#1a0f06' : '#f1f4f7'}" stroke-opacity="${dirty ? 1 : 0.5}" stroke-width="4"/>`,
    )
    .join('')}
  ${
    dirty
      ? `
  <linearGradient id="fadeIn" x1="0" x2="0" y1="0" y2="1"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#fff" stop-opacity="1"/></linearGradient>
  <mask id="dirtMask"><rect width="${w}" height="${h}" fill="url(#fadeIn)"/></mask>
  <g clip-path="url(#tipClip)"><g mask="url(#dirtMask)">
    <rect x="440" y="0" width="720" height="800" fill="#000" filter="url(#soot)"/>
    <rect x="440" y="0" width="720" height="800" fill="#000" filter="url(#crust)"/>
  </g></g>
  ${[
    [610, 640],
    [800, 710],
    [990, 640],
    [700, 690],
    [900, 690],
  ]
    .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="12" ry="8" fill="#050302"/>`)
    .join('')}
  <g opacity=".5" filter="url(#blur12)"><ellipse cx="800" cy="820" rx="260" ry="50" fill="#2a1c10"/></g>
  `
      : `
  <ellipse cx="700" cy="200" rx="90" ry="340" fill="#fff" opacity=".12" filter="url(#blur30)"/>
  <path d="M800 740 L730 1000 L870 1000Z" fill="url(#whiteGlow)" filter="url(#mist)" opacity=".6"/>
  `
  }
  ${vignette(w, h, 0.75)}`;
}

scenes['before-repair'] = { w: 1600, h: 1000, svg: beforeAfter(true) };
scenes['after-repair'] = { w: 1600, h: 1000, svg: beforeAfter(false) };

/* ------------------------------------------------------------------------ */
/*  Izvoz                                                                    */
/* ------------------------------------------------------------------------ */
async function render(name, { w = 1600, h = 1067, svg }) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs()}${svg(w, h)}</svg>`;
  const base = sharp(Buffer.from(markup), { density: 72 });
  const png = await base.png().toBuffer();
  await sharp(png)
    .webp({ quality: 78, effort: 6 })
    .toFile(join(OUT, `${name}.webp`));
  await sharp(png)
    .resize({ width: 800 })
    .webp({ quality: 74, effort: 6 })
    .toFile(join(OUT, `${name}-800.webp`));
  return png;
}

async function renderOg(heroPng) {
  const w = 1200,
    h = 630;
  const bg = await sharp(heroPng)
    .resize(w, h, { fit: 'cover', position: 'right' })
    .png()
    .toBuffer();
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0b0c0e" stop-opacity=".95"/><stop offset=".6" stop-color="#0b0c0e" stop-opacity=".55"/><stop offset="1" stop-color="#0b0c0e" stop-opacity="0"/></linearGradient>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect x="70" y="170" width="60" height="4" fill="${ACCENT}"/>
    <text x="70" y="150" font-family="DejaVu Sans Mono" font-size="22" fill="${ACCENT}" letter-spacing="4">SERVIS DIZNI · COMMON RAIL</text>
    <text x="66" y="280" font-family="DejaVu Sans" font-weight="bold" font-size="76" fill="#f3f4f6">PRECIZNOST KOJA</text>
    <text x="66" y="365" font-family="DejaVu Sans" font-weight="bold" font-size="76" fill="#f3f4f6">POKREĆE MOTOR<tspan fill="${ACCENT}">.</tspan></text>
    <text x="70" y="440" font-family="DejaVu Sans" font-size="26" fill="#aab0b8">Dijagnostika, testiranje i reparacija dizni i injektora</text>
  </svg>`;
  await sharp(bg)
    .composite([{ input: Buffer.from(overlay) }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, 'og-image.jpg'));
}

async function renderIcons() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#0b0c0e"/><rect x="3" y="3" width="34" height="34" rx="8" fill="#1b1e23" stroke="#3a3f47"/><path d="M15.5 9h9v5.5l-1.8 1.8v7.4L20 28.5l-2.7-4.8v-7.4l-1.8-1.8z" fill="none" stroke="#f3f4f6" stroke-width="1.7" stroke-linejoin="round"/><path d="M20 28.5l-5.2 4.3M20 28.5v5.2M20 28.5l5.2 4.3" stroke="#ff5a1f" stroke-width="1.9" stroke-linecap="round"/></svg>`;
  const sizes = {
    'favicon-32.png': 32,
    'apple-touch-icon.png': 180,
    'icon-192.png': 192,
    'icon-512.png': 512,
  };
  for (const [file, size] of Object.entries(sizes)) {
    await sharp(Buffer.from(svg), { density: 300 })
      .resize(size, size)
      .png()
      .toFile(join(PUBLIC, file));
  }
}

const only = process.argv.slice(2);
let heroPng;
for (const [name, scene] of Object.entries(scenes)) {
  if (only.length && !only.includes(name)) continue;
  const png = await render(name, scene);
  if (name === 'injector-hero') heroPng = png;
  console.log('✓', name);
}
if (heroPng) await renderOg(heroPng);
if (!only.length) await renderIcons();
console.log('Gotovo →', OUT);
