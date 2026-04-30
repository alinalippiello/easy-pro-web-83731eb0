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

  const fallbackImage =
    'https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/124cc589-c1fe-48eb-893f-c37534e42c31';

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
    // Always emit an absolute URL — social crawlers ignore relative paths.
    // Fallback to the site-wide OG image only when the per-project asset cannot be resolved.
    const image = hashed ? `${SITE}${hashed}` : fallbackImage;
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
}

main().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
