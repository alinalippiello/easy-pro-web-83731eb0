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
  },
): string {
  const t = escapeHtml(meta.title);
  const d = escapeHtml(meta.description);
  const u = escapeHtml(meta.url);
  const img = escapeHtml(meta.image);

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

  // Replace OG/Twitter image
  out = out.replace(
    /<meta\s+property="og:image"[^>]*>/i,
    `<meta property="og:image" content="${img}">`,
  );
  out = out.replace(
    /<meta\s+name="twitter:image"[^>]*>/i,
    `<meta name="twitter:image" content="${img}">`,
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

async function main() {
  const indexPath = path.join(DIST, 'index.html');
  const indexHtml = await fs.readFile(indexPath, 'utf8');
  const assets = await readDistAssets();

  const fallbackImage =
    'https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/124cc589-c1fe-48eb-893f-c37534e42c31';

  let generated = 0;
  const missingImages: string[] = [];

  for (const p of projectsSeo) {
    const hashed = findHashedAsset(assets, p.thumbnailSource);
    if (!hashed) missingImages.push(p.thumbnailSource);
    const image = hashed ? `${SITE}${hashed}` : fallbackImage;
    const url = `${SITE}/progetti/${p.slug}`;

    const html = injectMeta(indexHtml, {
      title: `${p.title} — Alina Lippiello`,
      description: p.description,
      url,
      image,
    });

    const outDir = path.join(DIST, 'progetti', p.slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
    generated++;
  }

  console.log(
    `[prerender] Generated ${generated} project pages under dist/progetti/.`,
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
