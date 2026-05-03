/**
 * Static prerender for /progetti/:slug routes.
 *
 * Runs as a postbuild step. For every project in projectsSeo.ts it copies
 * dist/index.html into dist/progetti/<slug>/index.html and rewrites the
 * <head> with project-specific title, description, canonical, Open Graph
 * and Twitter Card tags. The OG image is resolved against the hashed
 * asset filename produced by Vite (basename match in dist/assets/).
 *
 * Result: social crawlers and search engines see correct meta tags
 * without executing JavaScript. The React app then hydrates as usual.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectsSeo } from '../src/data/projectsSeo';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://alinalippiello.com';

/**
 * Centralized OG fallback image.
 *
 * Rules:
 *  - Absolute URL on our own domain (NO external buckets like GCS / S3).
 *    Social crawlers trust assets served from the canonical domain far more
 *    than third-party storage URLs.
 *  - Must correspond to a real file under public/ (copied verbatim into dist/),
 *    so the validation pass (isImageAccessible) can confirm it exists.
 *  - Single source of truth: change this constant to update the fallback
 *    everywhere (per-project pages + sitemap entries).
 */
const FALLBACK_OG_PATH = '/og-image.jpg';
const FALLBACK_OG_IMAGE = `${SITE}${FALLBACK_OG_PATH}`;

async function readDistAssets(): Promise<string[]> {
  const assetsDir = path.join(DIST, 'assets');
  try {
    return await fs.readdir(assetsDir);
  } catch {
    return [];
  }
}

function findHashedAsset(
  assets: string[],
  basename: string,
): string | null {
  // Vite hashes assets as <basename>-<hash>.<ext>.
  // The original extension may have been transformed (e.g. .png/.jpg -> .webp via vite-imagetools),
  // so we match on the basename prefix only.
  const candidates = assets.filter((f) =>
    f.startsWith(basename + '-') || f.startsWith(basename + '.'),
  );
  if (candidates.length === 0) return null;
  // Prefer non-source-map and webp variants when available.
  const preferred =
    candidates.find((f) => f.endsWith('.webp')) ??
    candidates.find((f) => /\.(jpg|jpeg|png|gif)$/i.test(f)) ??
    candidates[0];
  return `/assets/${preferred}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectMeta(
  html: string,
  meta: {
    title: string;
    description: string;
    url: string;
    image: string;
    imageAlt: string;
  },
): string {
  const t = escapeHtml(meta.title);
  const d = escapeHtml(meta.description);
  const u = escapeHtml(meta.url);
  const img = escapeHtml(meta.image);
  const alt = escapeHtml(meta.imageAlt);

  // Sanity: og:image MUST be an absolute URL or social crawlers will ignore it.
  if (!/^https?:\/\//i.test(meta.image)) {
    throw new Error(`[prerender] og:image is not absolute: ${meta.image}`);
  }

  // Replace <title>
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);

  // Replace standard description
  out = out.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${d}">`,
  );

  // Replace OG/Twitter title
  out = out.replace(
    /<meta\s+property="og:title"[^>]*>/i,
    `<meta property="og:title" content="${t}">`,
  );
  out = out.replace(
    /<meta\s+name="twitter:title"[^>]*>/i,
    `<meta name="twitter:title" content="${t}">`,
  );

  // Replace OG/Twitter description
  out = out.replace(
    /<meta\s+property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${d}">`,
  );
  out = out.replace(
    /<meta\s+name="twitter:description"[^>]*>/i,
    `<meta name="twitter:description" content="${d}">`,
  );

  // Replace OG/Twitter image (absolute URL).
  out = out.replace(
    /<meta\s+property="og:image"[^>]*>/i,
    `<meta property="og:image" content="${img}">\n    <meta property="og:image:secure_url" content="${img}">\n    <meta property="og:image:alt" content="${alt}">`,
  );
  out = out.replace(
    /<meta\s+name="twitter:image"[^>]*>/i,
    `<meta name="twitter:image" content="${img}">\n    <meta name="twitter:image:alt" content="${alt}">`,
  );

  // Replace og:url
  out = out.replace(
    /<meta\s+property="og:url"[^>]*>/i,
    `<meta property="og:url" content="${u}">`,
  );

  // Replace canonical
  out = out.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${u}">`,
  );

  // Force og:type=article for individual project pages.
  out = out.replace(
    /<meta\s+property="og:type"[^>]*>/i,
    `<meta property="og:type" content="article">`,
  );

  return out;
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  image?: { loc: string; title: string; caption: string };
  alternates?: Array<{ hreflang: string; href: string }>;
}

function buildSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map((e) => {
      const alt = (e.alternates ?? [])
        .map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${escapeHtml(a.href)}"/>`,
        )
        .join('\n');
      const img = e.image
        ? `\n    <image:image>\n      <image:loc>${escapeHtml(e.image.loc)}</image:loc>\n      <image:title>${escapeHtml(e.image.title)}</image:title>\n      <image:caption>${escapeHtml(e.image.caption)}</image:caption>\n    </image:image>`
        : '';
      return `  <url>\n    <loc>${escapeHtml(e.loc)}</loc>${alt ? '\n' + alt : ''}\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>${img}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

async function main() {
  const indexPath = path.join(DIST, 'index.html');
  const indexHtml = await fs.readFile(indexPath, 'utf8');
  const assets = await readDistAssets();

  // Verify the centralized fallback image is actually shipped under dist/.
  // If this is missing the whole strategy collapses, so fail fast.
  const fallbackLocal = path.join(DIST, FALLBACK_OG_PATH.replace(/^\//, ''));
  try {
    const st = await fs.stat(fallbackLocal);
    if (!st.isFile() || st.size === 0) throw new Error('empty');
  } catch {
    throw new Error(
      `[prerender] Fallback OG image missing in dist/: ${FALLBACK_OG_PATH}. ` +
        `Place the file under public/${FALLBACK_OG_PATH.replace(/^\//, '')} so it is copied into dist/.`,
    );
  }

  // <lastmod> uses the build date in W3C YYYY-MM-DD form (Google accepts this).
  const today = new Date().toISOString().slice(0, 10);

  const sitemapEntries: SitemapEntry[] = [
    {
      loc: `${SITE}/`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '1.0',
      alternates: [
        { hreflang: 'it-IT', href: `${SITE}/` },
        { hreflang: 'en-US', href: `${SITE}/?lang=en` },
        { hreflang: 'es-ES', href: `${SITE}/?lang=es` },
        { hreflang: 'x-default', href: `${SITE}/` },
      ],
    },
  ];

  let generated = 0;
  const missingImages: string[] = [];

  for (const p of projectsSeo) {
    const hashed = findHashedAsset(assets, p.thumbnailSource);
    if (!hashed) missingImages.push(p.thumbnailSource);

    // Priority:
    //   1. Project-specific thumbnail resolved from projectsSeo.ts (hashed asset).
    //   2. Centralized fallback (FALLBACK_OG_IMAGE) if the field is empty,
    //      the asset cannot be resolved, or it is not accessible on disk.
    let image = hashed ? `${SITE}${hashed}` : FALLBACK_OG_IMAGE;
    if (hashed && !(await isImageAccessible(image))) {
      console.warn(
        `[prerender] ${p.slug}: resolved asset ${image} is not accessible — falling back to ${FALLBACK_OG_IMAGE}`,
      );
      image = FALLBACK_OG_IMAGE;
    }
    const url = `${SITE}/progetti/${p.slug}`;

    const html = injectMeta(indexHtml, {
      title: `${p.title} — Alina Lippiello`,
      description: p.description,
      url,
      image,
      imageAlt: `${p.title} — immagine di copertina`,
    });

    const outDir = path.join(DIST, 'progetti', p.slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
    generated++;
    console.log(`[prerender] ${p.slug} → og:image = ${image}`);

    sitemapEntries.push({
      loc: url,
      lastmod: today,
      changefreq: 'yearly',
      priority: '0.8',
      image: {
        loc: image,
        title: p.title,
        caption: p.description,
      },
    });
  }

  // Static auxiliary pages.
  // We prerender /legal/index.html from index.html so social crawlers see a
  // dedicated <title> + description, and so the validator can check it as a
  // standalone page.
  const legalHtml = injectMeta(indexHtml, {
    title: 'Note Legali | Alina Lippiello',
    description:
      'Note legali, privacy policy e informativa cookie del portfolio professionale di Alina Lippiello, architetto.',
    url: `${SITE}/legal`,
    image: FALLBACK_OG_IMAGE,
    imageAlt: 'Alina Lippiello — Portfolio di Architettura',
  });
  // injectMeta forces og:type=article — for /legal we want website.
  const legalHtmlFinal = legalHtml.replace(
    /<meta\s+property="og:type"[^>]*>/i,
    `<meta property="og:type" content="website">`,
  );
  await fs.mkdir(path.join(DIST, 'legal'), { recursive: true });
  await fs.writeFile(path.join(DIST, 'legal', 'index.html'), legalHtmlFinal, 'utf8');
  console.log('[prerender] legal → static page emitted');

  sitemapEntries.push({
    loc: `${SITE}/legal`,
    lastmod: today,
    changefreq: 'yearly',
    priority: '0.3',
  });

  await fs.writeFile(
    path.join(DIST, 'sitemap.xml'),
    buildSitemap(sitemapEntries),
    'utf8',
  );

  console.log(
    `[prerender] Generated ${generated} project pages and sitemap.xml (${sitemapEntries.length} URLs).`,
  );
  if (missingImages.length) {
    console.warn(
      `[prerender] Could not resolve hashed asset for: ${missingImages.join(', ')} — used fallback OG image.`,
    );
  }

  // Before validation, ensure the Home and any auxiliary static pages
  // (which are emitted as-is by Vite from index.html) carry the full set of
  // social meta tags. The Home in particular must advertise the canonical
  // FALLBACK_OG_IMAGE on og:image / og:image:secure_url / twitter:image.
  await ensureStaticPageMeta(path.join(DIST, 'index.html'), FALLBACK_OG_IMAGE);
  for (const aux of ['legal']) {
    const file = path.join(DIST, aux, 'index.html');
    try {
      await fs.stat(file);
      await ensureStaticPageMeta(file, FALLBACK_OG_IMAGE);
    } catch {
      // not built as a separate HTML file — skip
    }
  }

  // Final validation pass: parse every generated page and verify that
  // og:image, og:image:secure_url and twitter:image are absolute, point to the
  // same resource, and the resource is actually accessible.
  await validateGeneratedPages();
}

/**
 * Ensure a static HTML file (Home, /legal, …) has all three social image tags
 * (og:image, og:image:secure_url, twitter:image) pointing at the same absolute
 * URL. Missing tags are injected from the base og:image (or from `defaultImage`
 * if og:image itself is missing). Writes the file back only if changed.
 */
async function ensureStaticPageMeta(
  filePath: string,
  defaultImage: string,
): Promise<void> {
  let html: string;
  try {
    html = await fs.readFile(filePath, 'utf8');
  } catch {
    return;
  }

  const original = html;
  const existing =
    extractMetaContent(html, /<meta\s+property="og:image"[^>]*>/i) ??
    extractMetaContent(html, /<meta\s+name="twitter:image"[^>]*>/i) ??
    defaultImage;

  // Force og:image to the canonical URL (defaultImage). For the Home this
  // guarantees the canonical hero/fallback wins over any placeholder.
  const canonical = filePath.endsWith(path.join('dist', 'index.html'))
    ? defaultImage
    : existing;
  const img = escapeHtml(canonical);

  if (/<meta\s+property="og:image"[^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+property="og:image"[^>]*>/i,
      `<meta property="og:image" content="${img}">`,
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `    <meta property="og:image" content="${img}">\n  </head>`,
    );
  }

  if (/<meta\s+property="og:image:secure_url"[^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+property="og:image:secure_url"[^>]*>/i,
      `<meta property="og:image:secure_url" content="${img}">`,
    );
  } else {
    html = html.replace(
      /<meta\s+property="og:image"[^>]*>/i,
      (m) => `${m}\n    <meta property="og:image:secure_url" content="${img}">`,
    );
  }

  if (/<meta\s+name="twitter:image"[^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+name="twitter:image"[^>]*>/i,
      `<meta name="twitter:image" content="${img}">`,
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `    <meta name="twitter:image" content="${img}">\n  </head>`,
    );
  }

  if (html !== original) {
    await fs.writeFile(filePath, html, 'utf8');
    console.log(`[prerender] ensured social meta tags in ${path.relative(DIST, filePath)} → ${canonical}`);
  }
}

/**
 * Extract the `content` attribute of a meta tag selected by `selector`
 * (e.g. `property="og:image"` or `name="twitter:image"`).
 */
function extractMetaContent(html: string, selector: RegExp): string | null {
  const tagMatch = html.match(selector);
  if (!tagMatch) return null;
  const contentMatch = tagMatch[0].match(/content="([^"]*)"/i);
  return contentMatch ? contentMatch[1] : null;
}

/**
 * Verify that an absolute image URL is actually reachable.
 *  - URLs under ${SITE}/assets/... are resolved against dist/assets/ on disk.
 *  - Any other absolute URL (e.g. the remote fallback) is probed via HTTP HEAD,
 *    falling back to a ranged GET if HEAD is not allowed.
 */
async function isImageAccessible(url: string): Promise<boolean> {
  if (url.startsWith(`${SITE}/`)) {
    const rel = url.slice(SITE.length); // "/assets/foo-hash.webp"
    const localPath = path.join(DIST, rel);
    try {
      const st = await fs.stat(localPath);
      return st.isFile() && st.size > 0;
    } catch {
      return false;
    }
  }

  try {
    let res = await fetch(url, { method: 'HEAD' });
    if (!res.ok || res.status === 405) {
      res = await fetch(url, {
        method: 'GET',
        headers: { Range: 'bytes=0-0' },
      });
    }
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Per-page social meta snapshot, collected during validation and printed
 * as a final report so differences across pages are easy to eyeball.
 */
interface PageMetaReport {
  label: string;
  file: string;
  url: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ogImageSecureUrl: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  imageAccessible: boolean | null;
  consistent: boolean;
  issues: number;
}

/**
 * Normalize an image/page URL for diff comparison.
 *
 * Removes querystring, hash fragment and trailing slash so cosmetic changes
 * (cache-busting params, normalisation differences) don't surface as false
 * positives in the diff. Returns null if the input is empty.
 */
function normalizeUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  let v = value.trim();
  if (!v) return null;
  v = v.split('#')[0];
  v = v.split('?')[0];
  if (v.length > 1 && v.endsWith('/')) v = v.slice(0, -1);
  // Strip Vite hash from /assets/<basename>-<hash>.<ext> so re-builds that only
  // change the content-hash don't surface as image regressions.
  // Matches: -<8+ hex/alnum> right before the extension.
  v = v.replace(/(\/assets\/[^/?#]+?)-[A-Za-z0-9_-]{8,}(\.[A-Za-z0-9]+)$/, '$1$2');
  return v;
}

/**
 * Validate the social meta tags of a single generated HTML file.
 * Pushes any issues into `errors`. Uses `cache` to avoid re-fetching the same image URL.
 * Returns a structured snapshot of what was found, for the final report.
 */
async function validatePageMeta(
  label: string,
  filePath: string,
  errors: string[],
  cache: Map<string, boolean>,
  opts: {
    expectedImage?: string;
    requireTitleIncludes?: string[];
    requireDescriptionIncludesAny?: string[];
  } = {},
): Promise<PageMetaReport> {
  const report: PageMetaReport = {
    label,
    file: path.relative(DIST, filePath),
    url: null,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    ogImageSecureUrl: null,
    twitterCard: null,
    twitterTitle: null,
    twitterDescription: null,
    twitterImage: null,
    imageAccessible: null,
    consistent: true,
    issues: 0,
  };
  const errCountBefore = errors.length;

  let html: string;
  try {
    html = await fs.readFile(filePath, 'utf8');
  } catch {
    errors.push(`[${label}] generated HTML missing at ${filePath}`);
    report.issues = errors.length - errCountBefore;
    return report;
  }

  // Capture the full Twitter set + canonical URL alongside OG tags so the
  // diff/report can highlight any divergence between the two card systems.
  report.url = extractMetaContent(html, /<meta\s+property="og:url"[^>]*>/i);
  report.twitterCard = extractMetaContent(html, /<meta\s+name="twitter:card"[^>]*>/i);
  report.twitterTitle = extractMetaContent(html, /<meta\s+name="twitter:title"[^>]*>/i);
  report.twitterDescription = extractMetaContent(html, /<meta\s+name="twitter:description"[^>]*>/i);

  // -------- Text validation (runs BEFORE image checks) --------
  const ogTitle = extractMetaContent(html, /<meta\s+property="og:title"[^>]*>/i);
  const ogDescription = extractMetaContent(html, /<meta\s+property="og:description"[^>]*>/i);
  report.ogTitle = ogTitle;
  report.ogDescription = ogDescription;

  if (!ogTitle || !ogTitle.trim()) {
    errors.push(`[${label}] missing or empty <meta property="og:title">`);
  }
  if (!ogDescription || !ogDescription.trim()) {
    errors.push(`[${label}] missing or empty <meta property="og:description">`);
  }

  if (ogTitle && opts.requireTitleIncludes?.length) {
    for (const needle of opts.requireTitleIncludes) {
      if (!ogTitle.toLowerCase().includes(needle.toLowerCase())) {
        errors.push(
          `[${label}] og:title must contain "${needle}", got "${ogTitle}"`,
        );
      }
    }
  }
  if (ogDescription && opts.requireDescriptionIncludesAny?.length) {
    const lower = ogDescription.toLowerCase();
    const hit = opts.requireDescriptionIncludesAny.some((n) =>
      lower.includes(n.toLowerCase()),
    );
    if (!hit) {
      errors.push(
        `[${label}] og:description must mention at least one of [${opts.requireDescriptionIncludesAny.join(', ')}], got "${ogDescription}"`,
      );
    }
  }

  // -------- Image validation --------
  const ogImage = extractMetaContent(html, /<meta\s+property="og:image"[^>]*>/i);
  const ogSecure = extractMetaContent(html, /<meta\s+property="og:image:secure_url"[^>]*>/i);
  const twImage = extractMetaContent(html, /<meta\s+name="twitter:image"[^>]*>/i);
  report.ogImage = ogImage;
  report.ogImageSecureUrl = ogSecure;
  report.twitterImage = twImage;

  const tags: Record<string, string | null> = {
    'og:image': ogImage,
    'og:image:secure_url': ogSecure,
    'twitter:image': twImage,
  };

  // 1. Presence + absolute https URL.
  for (const [name, value] of Object.entries(tags)) {
    if (!value) {
      errors.push(`[${label}] missing <meta ${name}>`);
      continue;
    }
    if (!/^https:\/\//i.test(value)) {
      errors.push(`[${label}] ${name} is not an absolute https URL: "${value}"`);
    }
  }

  // 2. Consistency.
  if (ogImage && ogSecure && twImage) {
    if (ogImage !== ogSecure || ogImage !== twImage) {
      report.consistent = false;
      errors.push(
        `[${label}] image tags are inconsistent:\n` +
          `        og:image            = ${ogImage}\n` +
          `        og:image:secure_url = ${ogSecure}\n` +
          `        twitter:image       = ${twImage}`,
      );
    }
  }

  // 3. Page-specific expectation (e.g. Home must use the canonical fallback).
  if (opts.expectedImage && ogImage && ogImage !== opts.expectedImage) {
    errors.push(
      `[${label}] og:image must be the canonical hero/fallback "${opts.expectedImage}", got "${ogImage}"`,
    );
  }

  // 4. Accessibility.
  if (ogImage && /^https:\/\//i.test(ogImage)) {
    let ok = cache.get(ogImage);
    if (ok === undefined) {
      ok = await isImageAccessible(ogImage);
      cache.set(ogImage, ok);
    }
    report.imageAccessible = ok;
    if (!ok) {
      errors.push(`[${label}] image is not accessible: ${ogImage}`);
    }
  }

  report.issues = errors.length - errCountBefore;
  return report;
}

/**
 * Pretty-print a per-page summary of the social meta tags discovered during
 * validation. The goal is to make differences between pages immediately
 * visible in build logs (different titles, mismatched images, missing tags).
 */
function printSocialMetaReport(reports: PageMetaReport[]): void {
  const trunc = (s: string | null, n: number): string => {
    if (s === null) return '∅ (missing)';
    if (s.length <= n) return s;
    return s.slice(0, n - 1) + '…';
  };
  const flag = (r: PageMetaReport): string => {
    if (r.issues > 0) return '✗';
    if (!r.consistent) return '!';
    if (r.imageAccessible === false) return '✗';
    return '✓';
  };

  console.log('\n[prerender] ───── Social meta report (per page) ─────');
  for (const r of reports) {
    const sameImage =
      r.ogImage && r.ogImage === r.ogImageSecureUrl && r.ogImage === r.twitterImage;
    console.log(
      `\n  ${flag(r)} ${r.label}  (${r.file})\n` +
        `      og:title            : ${trunc(r.ogTitle, 90)}\n` +
        `      og:description      : ${trunc(r.ogDescription, 110)}\n` +
        `      og:image            : ${trunc(r.ogImage, 110)}\n` +
        `      og:image:secure_url : ${
          sameImage ? '↳ same as og:image' : trunc(r.ogImageSecureUrl, 110)
        }\n` +
        `      twitter:image       : ${
          sameImage ? '↳ same as og:image' : trunc(r.twitterImage, 110)
        }\n` +
        `      image accessible    : ${
          r.imageAccessible === null ? 'n/a' : r.imageAccessible ? 'yes' : 'NO'
        }` +
        (r.issues > 0 ? `   [${r.issues} issue(s)]` : ''),
    );
  }
  console.log('\n[prerender] ──────────────────────────────────────────\n');
}

async function validateGeneratedPages(): Promise<void> {
  const errors: string[] = [];
  const cache = new Map<string, boolean>();

  // Pages to validate: Home + every static auxiliary page + every project page.
  // Add new top-level pages here (e.g. about, contatti) as the site grows.
  const pages: Array<{
    label: string;
    file: string;
    expectedImage?: string;
    requireTitleIncludes?: string[];
    requireDescriptionIncludesAny?: string[];
  }> = [
    {
      label: 'home',
      file: path.join(DIST, 'index.html'),
      // The Home must advertise the canonical hero/fallback image served from
      // our own domain — never a per-project asset, never an external bucket.
      expectedImage: FALLBACK_OG_IMAGE,
      // The Home title must carry the author name; the description must
      // reference at least one core research theme so social previews always
      // communicate what the portfolio is about.
      requireTitleIncludes: ['Alina Lippiello'],
      requireDescriptionIncludesAny: [
        'Hejduk',
        'Branzi',
        'tipologia',
        'tipologica',
        'modelli abitativi',
        'ricerca',
      ],
    },
  ];

  // Auxiliary static pages emitted by Vite (only validate if they actually exist).
  for (const aux of ['legal']) {
    const file = path.join(DIST, aux, 'index.html');
    try {
      await fs.stat(file);
      pages.push({
        label: `/${aux}`,
        file,
        // /legal must have a clear, branded title to avoid empty social previews.
        requireTitleIncludes: ['Note Legali', 'Alina Lippiello'],
      });
    } catch {
      // not built as a separate HTML file — skip silently
    }
  }

  for (const p of projectsSeo) {
    pages.push({
      label: p.slug,
      file: path.join(DIST, 'progetti', p.slug, 'index.html'),
    });
  }

  const reports: PageMetaReport[] = [];
  for (const page of pages) {
    const r = await validatePageMeta(page.label, page.file, errors, cache, {
      expectedImage: page.expectedImage,
      requireTitleIncludes: page.requireTitleIncludes,
      requireDescriptionIncludesAny: page.requireDescriptionIncludesAny,
    });
    reports.push(r);
  }

  // -------- Detailed per-page report --------
  // Printed before the pass/fail summary so it's visible in build logs even
  // when validation fails. Also persisted as JSON for tooling/diffing.
  printSocialMetaReport(reports);

  // Load the previous build's report (if any) and diff against it.
  // The historical baseline lives under scripts/ so it survives `dist/` cleans.
  const previous = await loadPreviousReport();
  const diff = diffSocialMetaReports(previous, reports);
  if (diff.regressions.length) {
    for (const r of diff.regressions) errors.push(r);
  }

  // Always emit the HTML diff report (even on first run / failure) so the
  // user has a single artefact to open and inspect.
  try {
    const html = renderDiffReportHtml(diff, reports);
    const htmlPath = path.join(ROOT, 'scripts', 'diff-report.html');
    await fs.writeFile(htmlPath, html, 'utf8');
    console.log(`[prerender] HTML diff report written to ${path.relative(ROOT, htmlPath)}`);
  } catch (err) {
    console.warn('[prerender] Could not write HTML diff report:', err);
  }

  // Machine-readable diff report for CI / automated checks. Includes a
  // summary plus, for every page, the baseline snapshot, the current
  // snapshot and the per-field changes (Twitter tags included).
  try {
    const diffJson = buildDiffReportJson(diff, previous, reports);
    const diffJsonPath = path.join(ROOT, 'scripts', 'diff-report.json');
    await fs.writeFile(diffJsonPath, JSON.stringify(diffJson, null, 2), 'utf8');
    console.log(`[prerender] JSON diff report written to ${path.relative(ROOT, diffJsonPath)}`);
  } catch (err) {
    console.warn('[prerender] Could not write JSON diff report:', err);
  }

  try {
    await fs.writeFile(
      path.join(DIST, 'social-meta-report.json'),
      JSON.stringify(reports, null, 2),
      'utf8',
    );
    console.log('[prerender] Detailed report written to dist/social-meta-report.json');
  } catch {
    // best-effort; do not block the build on report serialization
  }

  if (errors.length) {
    console.error(
      `\n[prerender] Validation FAILED — ${errors.length} issue(s) detected across ${pages.length} page(s).\n` +
        `Refusing to ship dist/ with broken social previews:\n\n` +
        errors.map((e) => '  • ' + e).join('\n') +
        '\n',
    );
    // Tear down generated artifacts so a subsequent deploy cannot accidentally
    // pick up a half-validated build.
    await fs.rm(path.join(DIST, 'progetti'), { recursive: true, force: true });
    await fs.rm(path.join(DIST, 'sitemap.xml'), { force: true });
    process.exit(1);
  }

  // Persist the validated report as the new baseline for the next build.
  // Done only after validation passes so a broken build cannot poison the diff.
  await saveBaselineReport(reports);

  const projectCount = projectsSeo.length;
  const extraCount = pages.length - projectCount - 1; // minus home, minus projects
  console.log(
    `[prerender] ✓ All pages (Home + ${extraCount} extra + ${projectCount} projects = ${pages.length} total) ` +
      `have valid OG/Twitter meta tags with absolute, consistent and accessible images.`,
  );
}

const BASELINE_REPORT_PATH = path.join(ROOT, 'scripts', 'social-meta-report.json');

async function loadPreviousReport(): Promise<PageMetaReport[] | null> {
  try {
    const raw = await fs.readFile(BASELINE_REPORT_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed as PageMetaReport[];
  } catch {
    return null;
  }
}

async function saveBaselineReport(reports: PageMetaReport[]): Promise<void> {
  try {
    await fs.writeFile(BASELINE_REPORT_PATH, JSON.stringify(reports, null, 2), 'utf8');
    console.log(`[prerender] Baseline updated at ${path.relative(ROOT, BASELINE_REPORT_PATH)}`);
  } catch (err) {
    console.warn('[prerender] Could not persist baseline report:', err);
  }
}

/**
 * Per-page diff entry produced by `diffSocialMetaReports`. Drives both the
 * console output and the HTML report.
 */
interface PageDiffEntry {
  label: string;
  status: 'OK' | 'CHANGED' | 'REGRESSION' | 'NEW' | 'REMOVED';
  url: string | null;
  fieldChanges: Array<{
    field: string;
    before: string | null;
    after: string | null;
    severity: 'block' | 'warn' | 'info';
    note: string;
  }>;
}

interface DiffResult {
  entries: PageDiffEntry[];
  regressions: string[]; // hard-error messages (build-blocking)
  unchanged: number;
  updated: number;
  newCount: number;
  removedCount: number;
}

/**
 * Compare the new reports against the previous baseline.
 *
 * Strict vs soft semantics:
 *   - BLOCK (regression, build fails): `og:image` or `og:image:secure_url`
 *     for an existing page either disappears OR changes to a different
 *     normalised URL. These are critical for social previews.
 *   - WARN (logged as [CHANGED], does not fail the build): textual fields
 *     (`og:title`, `og:description`, twitter title/description) and
 *     `twitter:image` changes.
 *
 * Image URLs are compared after `normalizeUrl()` so cosmetic differences
 * (querystrings, trailing slashes) don't trip the strict check.
 */
function diffSocialMetaReports(
  previous: PageMetaReport[] | null,
  current: PageMetaReport[],
): DiffResult {
  const result: DiffResult = {
    entries: [],
    regressions: [],
    unchanged: 0,
    updated: 0,
    newCount: 0,
    removedCount: 0,
  };

  if (!previous) {
    console.log(
      '[prerender] No previous baseline found — treating this build as the new baseline (point zero).',
    );
    for (const curr of current) {
      result.entries.push({
        label: curr.label,
        status: 'NEW',
        url: curr.url,
        fieldChanges: [],
      });
    }
    result.newCount = current.length;
    return result;
  }

  const prevByLabel = new Map(previous.map((r) => [r.label, r]));
  const currByLabel = new Map(current.map((r) => [r.label, r]));

  // Field config: which fields are block-level (image) vs warn-level (text).
  const fieldConfig: Array<{
    field: keyof PageMetaReport;
    label: string;
    severity: 'block' | 'warn';
    normalizeForCompare: boolean;
  }> = [
    { field: 'ogImage', label: 'og:image', severity: 'block', normalizeForCompare: true },
    { field: 'ogImageSecureUrl', label: 'og:image:secure_url', severity: 'block', normalizeForCompare: true },
    { field: 'twitterImage', label: 'twitter:image', severity: 'warn', normalizeForCompare: true },
    { field: 'ogTitle', label: 'og:title', severity: 'warn', normalizeForCompare: false },
    { field: 'ogDescription', label: 'og:description', severity: 'warn', normalizeForCompare: false },
    { field: 'twitterTitle', label: 'twitter:title', severity: 'warn', normalizeForCompare: false },
    { field: 'twitterDescription', label: 'twitter:description', severity: 'warn', normalizeForCompare: false },
    { field: 'twitterCard', label: 'twitter:card', severity: 'warn', normalizeForCompare: false },
  ];

  console.log('\n[prerender] ───── Diff vs previous build ─────');

  for (const curr of current) {
    const prev = prevByLabel.get(curr.label);
    if (!prev) {
      result.entries.push({ label: curr.label, status: 'NEW', url: curr.url, fieldChanges: [] });
      result.newCount++;
      console.log(`  [NEW] ${curr.label}`);
      continue;
    }

    const fieldChanges: PageDiffEntry['fieldChanges'] = [];
    let hasRegression = false;

    for (const cfg of fieldConfig) {
      const beforeRaw = (prev[cfg.field] as string | null | undefined) ?? null;
      const afterRaw = (curr[cfg.field] as string | null | undefined) ?? null;

      const beforeCmp = cfg.normalizeForCompare ? normalizeUrl(beforeRaw) : beforeRaw;
      const afterCmp = cfg.normalizeForCompare ? normalizeUrl(afterRaw) : afterRaw;
      if (beforeCmp === afterCmp) {
        // Raw value differs but normalized matches → only the Vite content-hash
        // changed. Surface as an informational note so the HTML report can warn
        // the reader that this diff was intentionally ignored.
        if (cfg.normalizeForCompare && beforeRaw && afterRaw && beforeRaw !== afterRaw) {
          fieldChanges.push({
            field: cfg.label,
            before: beforeRaw,
            after: afterRaw,
            severity: 'info',
            note: 'hash-only change (ignored)',
          });
        }
        continue;
      }

      // Block-severity rule: image disappears or changes URL → regression.
      if (cfg.severity === 'block') {
        if (beforeRaw && !afterRaw) {
          const msg = `[REGRESSION] ${curr.label}: ${cfg.label} was "${beforeRaw}" but is now missing`;
          result.regressions.push(msg);
          hasRegression = true;
          fieldChanges.push({
            field: cfg.label,
            before: beforeRaw,
            after: afterRaw,
            severity: 'block',
            note: 'tag disappeared',
          });
          continue;
        }
        if (beforeRaw && afterRaw && beforeCmp !== afterCmp) {
          // URL changed but tag still present → soft change, do not block build.
          fieldChanges.push({
            field: cfg.label,
            before: beforeRaw,
            after: afterRaw,
            severity: 'warn',
            note: 'image URL changed (non-blocking)',
          });
          continue;
        }
      }

      // Warn-severity (or first-time addition for block fields).
      if (!beforeRaw && afterRaw) {
        fieldChanges.push({
          field: cfg.label,
          before: beforeRaw,
          after: afterRaw,
          severity: 'info',
          note: 'newly added',
        });
      } else if (beforeRaw && !afterRaw) {
        fieldChanges.push({
          field: cfg.label,
          before: beforeRaw,
          after: afterRaw,
          severity: 'warn',
          note: 'value removed',
        });
      } else {
        fieldChanges.push({
          field: cfg.label,
          before: beforeRaw,
          after: afterRaw,
          severity: 'warn',
          note: 'value updated',
        });
      }
    }

    if (fieldChanges.length === 0) {
      result.unchanged++;
      result.entries.push({ label: curr.label, status: 'OK', url: curr.url, fieldChanges: [] });
    } else {
      const status: PageDiffEntry['status'] = hasRegression ? 'REGRESSION' : 'CHANGED';
      result.updated++;
      result.entries.push({ label: curr.label, status, url: curr.url, fieldChanges });
      console.log(`  [${status}] ${curr.label}`);
      for (const c of fieldChanges) {
        const tag = c.severity === 'block' ? '✗' : c.severity === 'warn' ? '~' : '+';
        console.log(`    ${tag} ${c.field} (${c.note}):\n        before: "${c.before ?? '∅'}"\n        after : "${c.after ?? '∅'}"`);
      }
    }
  }

  for (const prev of previous) {
    if (!currByLabel.has(prev.label)) {
      result.entries.push({ label: prev.label, status: 'REMOVED', url: prev.url, fieldChanges: [] });
      result.removedCount++;
      console.log(`  [REMOVED] ${prev.label}`);
    }
  }

  console.log(
    `\n[prerender] Diff summary: ${result.unchanged} unchanged, ${result.updated} updated, ` +
      `${result.newCount} new, ${result.removedCount} removed.`,
  );
  if (result.regressions.length) {
    console.log(
      `[prerender] ${result.regressions.length} regression(s) detected — build will be blocked.`,
    );
  }
  console.log('[prerender] ──────────────────────────────────────\n');

  return result;
}

/**
 * Render a self-contained HTML diff report for human inspection.
 * Saved to scripts/diff-report.html so it survives `dist/` cleans.
 */
/**
 * Build the machine-readable diff report payload (saved as
 * scripts/diff-report.json). Designed for CI consumption: a stable summary
 * plus per-page entries with baseline + current snapshots and field-level
 * changes (Twitter tags included).
 */
function buildDiffReportJson(
  diff: DiffResult,
  previous: PageMetaReport[] | null,
  current: PageMetaReport[],
) {
  const prevByLabel = new Map((previous ?? []).map((r) => [r.label, r]));
  const currByLabel = new Map(current.map((r) => [r.label, r]));

  const pages = diff.entries.map((entry) => ({
    label: entry.label,
    status: entry.status,
    url: entry.url,
    baseline: prevByLabel.get(entry.label) ?? null,
    current: currByLabel.get(entry.label) ?? null,
    changes: entry.fieldChanges,
  }));

  return {
    generatedAt: new Date().toISOString(),
    baselineExisted: previous !== null,
    summary: {
      totalPages: current.length,
      unchanged: diff.unchanged,
      updated: diff.updated,
      new: diff.newCount,
      removed: diff.removedCount,
      regressions: diff.regressions.length,
    },
    regressions: diff.regressions,
    pages,
  };
}

function renderDiffReportHtml(diff: DiffResult, current: PageMetaReport[]): string {
  const esc = (s: string | null | undefined): string =>
    s == null ? '' : String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const statusBadge = (s: PageDiffEntry['status']): string => {
    const colors: Record<PageDiffEntry['status'], string> = {
      OK: '#1a7f37',
      CHANGED: '#9a6700',
      REGRESSION: '#cf222e',
      NEW: '#0969da',
      REMOVED: '#6e7781',
    };
    return `<span style="background:${colors[s]};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;letter-spacing:.04em;">[${s}]</span>`;
  };

  const currByLabel = new Map(current.map((r) => [r.label, r]));

  const rows = diff.entries
    .map((entry) => {
      const meta = currByLabel.get(entry.label);
      const link = entry.url
        ? `<a href="${esc(entry.url)}" target="_blank" rel="noopener noreferrer">${esc(entry.label)}</a>`
        : esc(entry.label);

      const changesHtml = entry.fieldChanges.length
        ? `<table class="changes"><thead><tr><th>Field</th><th>Severity</th><th>Before</th><th>After</th></tr></thead><tbody>` +
          entry.fieldChanges
            .map(
              (c) =>
                `<tr class="sev-${c.severity}"><td><code>${esc(c.field)}</code></td><td>${c.severity.toUpperCase()}</td><td><code>${esc(c.before) || '<em>∅</em>'}</code></td><td><code>${esc(c.after) || '<em>∅</em>'}</code></td></tr>`,
            )
            .join('') +
          `</tbody></table>`
        : entry.status === 'OK'
          ? `<span class="muted">no changes</span>`
          : `<span class="muted">—</span>`;

      const currentSnapshot = meta
        ? `<details><summary>current meta snapshot</summary>
            <ul class="snapshot">
              <li><code>og:title</code>: ${esc(meta.ogTitle)}</li>
              <li><code>og:description</code>: ${esc(meta.ogDescription)}</li>
              <li><code>og:image</code>: ${esc(meta.ogImage)}</li>
              <li><code>og:image:secure_url</code>: ${esc(meta.ogImageSecureUrl)}</li>
              <li><code>twitter:card</code>: ${esc(meta.twitterCard)}</li>
              <li><code>twitter:title</code>: ${esc(meta.twitterTitle)}</li>
              <li><code>twitter:description</code>: ${esc(meta.twitterDescription)}</li>
              <li><code>twitter:image</code>: ${esc(meta.twitterImage)}</li>
            </ul>
          </details>`
        : '';

      return `<tr>
        <td class="page">${link}<div class="file">${esc(meta?.file ?? '')}</div></td>
        <td>${statusBadge(entry.status)}</td>
        <td>${changesHtml}${currentSnapshot}</td>
      </tr>`;
    })
    .join('\n');

  const generatedAt = new Date().toISOString();

  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <title>Social meta diff report — Alina Lippiello</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 32px; color: #1f2328; background: #f6f8fa; }
    h1 { margin: 0 0 8px; font-size: 22px; }
    .meta { color: #6e7781; font-size: 13px; margin-bottom: 20px; }
    .summary { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
    .summary div { background: #fff; border: 1px solid #d0d7de; padding: 10px 14px; border-radius: 6px; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #d0d7de; border-radius: 6px; overflow: hidden; }
    th, td { padding: 10px 12px; text-align: left; vertical-align: top; border-bottom: 1px solid #eaeef2; font-size: 13px; }
    th { background: #f6f8fa; font-weight: 600; }
    td.page { width: 24%; word-break: break-word; }
    td.page a { color: #0969da; text-decoration: none; font-weight: 600; }
    td.page a:hover { text-decoration: underline; }
    .file { color: #6e7781; font-size: 11px; margin-top: 2px; font-family: ui-monospace, SFMono-Regular, monospace; }
    .muted { color: #6e7781; font-style: italic; }
    table.changes { margin: 0; border: 1px solid #eaeef2; border-radius: 4px; }
    table.changes th { background: #fafbfc; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
    table.changes td { font-size: 12px; word-break: break-word; }
    table.changes code { background: #f6f8fa; padding: 1px 4px; border-radius: 3px; font-size: 11px; }
    tr.sev-block td { background: #ffebe9; }
    tr.sev-warn td { background: #fff8c5; }
    tr.sev-info td { background: #ddf4ff; }
    details.snapshot, details summary { font-size: 12px; }
    details { margin-top: 8px; }
    details summary { cursor: pointer; color: #6e7781; }
    ul.snapshot { margin: 8px 0 0; padding-left: 18px; }
    ul.snapshot li { margin-bottom: 2px; font-size: 12px; word-break: break-word; }
    ul.snapshot code { background: #f6f8fa; padding: 1px 4px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>Social meta diff report</h1>
  <p class="meta">Generated ${esc(generatedAt)} — comparing current build against <code>scripts/social-meta-report.json</code> baseline.</p>
  <div class="summary">
    <div><strong>${diff.unchanged}</strong> unchanged</div>
    <div><strong>${diff.updated}</strong> updated</div>
    <div><strong>${diff.newCount}</strong> new</div>
    <div><strong>${diff.removedCount}</strong> removed</div>
    <div><strong>${diff.regressions.length}</strong> regression(s)</div>
  </div>
  <table>
    <thead>
      <tr><th>Page</th><th>Status</th><th>Changes / current snapshot</th></tr>
    </thead>
    <tbody>
${rows}
    </tbody>
  </table>
</body>
</html>
`;
}


main().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
