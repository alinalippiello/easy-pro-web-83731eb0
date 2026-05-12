import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import {
  sourceTiles,
  defaultConcepts,
  descriptionTemplates,
  MAX_TEXT_TILES,
  slugifyKey,
  type Concept,
} from './stratiConfig';

type Orientation = 'portrait' | 'landscape' | 'square';

interface LayoutTile {
  id: string;
  kind: 'image' | 'text';
  cover?: string;
  alt?: string;
  description?: string;
  colSpan: number;
  rowSpan: number;
  conceptKey?: string;
  imageScale?: number;
  imagePosX?: number;
  imagePosY?: number;
}

function spansFor(orientation: Orientation, cols: number): { c: number; r: number } {
  if (cols <= 3) {
    if (orientation === 'portrait')  return { c: 1, r: 2 };
    if (orientation === 'landscape') return { c: 2, r: 1 };
    return { c: 1, r: 1 };
  }
  if (orientation === 'portrait')  return { c: 1, r: 2 };
  if (orientation === 'landscape') return { c: 2, r: 1 };
  return { c: 1, r: 1 };
}

function classify(w: number, h: number): Orientation {
  const ratio = w / h;
  if (ratio > 1.15) return 'landscape';
  if (ratio < 0.87) return 'portrait';
  return 'square';
}

function buildLayout(
  imageTiles: LayoutTile[],
  cols: number,
  conceptKeys: string[],
): { tiles: LayoutTile[]; rows: number } {
  // Alternate image orientations: portrait / non-portrait, preserving order.
  const portraits = imageTiles.filter((t) => t.rowSpan > t.colSpan);
  const others = imageTiles.filter((t) => t.rowSpan <= t.colSpan);
  const interleavedImages: LayoutTile[] = [];
  let pi = 0, oi = 0;
  while (pi < portraits.length || oi < others.length) {
    if (oi < others.length) interleavedImages.push(others[oi++]);
    if (pi < portraits.length) interleavedImages.push(portraits[pi++]);
  }

  // Build text tiles: one per concept, max 5, no duplicates.
  const textCount = Math.min(5, conceptKeys.length);
  const textTiles: LayoutTile[] = [];
  for (let i = 0; i < textCount; i++) {
    textTiles.push({
      id: `text-${conceptKeys[i]}`,
      kind: 'text',
      colSpan: 1,
      rowSpan: 1,
      conceptKey: conceptKeys[i],
    });
  }

  // Mix: distribute text tiles evenly across the image stream.
  const mixed: LayoutTile[] = [];
  const step = textTiles.length > 0 ? Math.max(2, Math.floor(interleavedImages.length / (textTiles.length + 1))) : 0;
  let ti = 0;
  interleavedImages.forEach((img, i) => {
    mixed.push(img);
    if (ti < textTiles.length && step > 0 && (i + 1) % step === 0) mixed.push(textTiles[ti++]);
  });
  while (ti < textTiles.length) mixed.push(textTiles[ti++]);

  // Pack with text-adjacency avoidance.
  const owner: number[][] = [];
  const placed: { tile: LayoutTile; r: number; c: number }[] = [];
  const ensureRow = (r: number) => { while (owner.length <= r) owner.push(new Array(cols).fill(-1)); };
  const fits = (r: number, c: number, cs: number, rs: number) => {
    if (c + cs > cols) return false;
    for (let i = 0; i < rs; i++) {
      ensureRow(r + i);
      for (let j = 0; j < cs; j++) if (owner[r + i][c + j] !== -1) return false;
    }
    return true;
  };
  const stamp = (r: number, c: number, cs: number, rs: number, idx: number) => {
    for (let i = 0; i < rs; i++) {
      ensureRow(r + i);
      for (let j = 0; j < cs; j++) owner[r + i][c + j] = idx;
    }
  };
  const hasTextNeighbor = (r: number, c: number, cs: number, rs: number) => {
    const isText = (rr: number, cc: number) => {
      if (rr < 0 || cc < 0 || cc >= cols || rr >= owner.length) return false;
      const i = owner[rr][cc];
      return i !== -1 && placed[i]?.tile.kind === 'text';
    };
    for (let i = 0; i < rs; i++) {
      if (isText(r + i, c - 1)) return true;
      if (isText(r + i, c + cs)) return true;
    }
    for (let j = 0; j < cs; j++) {
      if (isText(r - 1, c + j)) return true;
      if (isText(r + rs, c + j)) return true;
    }
    return false;
  };
  const findSlot = (cs: number, rs: number, avoidText: boolean): [number, number] => {
    if (avoidText) {
      // Strictly avoid placing text tiles next to other text tiles — extend search far.
      const maxR = owner.length + 40;
      for (let r = 0; r < maxR; r++) {
        ensureRow(r);
        for (let c = 0; c <= cols - cs; c++)
          if (fits(r, c, cs, rs) && !hasTextNeighbor(r, c, cs, rs)) return [r, c];
      }
    }
    for (let r = 0; ; r++) {
      ensureRow(r);
      for (let c = 0; c <= cols - cs; c++) if (fits(r, c, cs, rs)) return [r, c];
    }
  };

  for (const t of mixed) {
    const [r, c] = findSlot(t.colSpan, t.rowSpan, t.kind === 'text');
    placed.push({ tile: t, r, c });
    stamp(r, c, t.colSpan, t.rowSpan, placed.length - 1);
  }

  // Drop trailing empty rows.
  while (owner.length && owner[owner.length - 1].every((v) => v === -1)) owner.pop();

  // Fill remaining holes by extending nearest image tiles into them.
  const tryExtend = (cell: { r: number; c: number }): boolean => {
    const candidates: { ownerIdx: number; newCs?: number; newRs?: number }[] = [];
    if (cell.c > 0 && owner[cell.r][cell.c - 1] !== -1) {
      const oi2 = owner[cell.r][cell.c - 1];
      const p = placed[oi2];
      if (p && p.tile.kind === 'image' && p.r <= cell.r && cell.r < p.r + p.tile.rowSpan && p.c + p.tile.colSpan === cell.c) {
        let ok = true;
        for (let i = 0; i < p.tile.rowSpan; i++) if (owner[p.r + i]?.[cell.c] !== -1) { ok = false; break; }
        if (ok) candidates.push({ ownerIdx: oi2, newCs: p.tile.colSpan + 1 });
      }
    }
    if (cell.r > 0 && owner[cell.r - 1][cell.c] !== -1) {
      const oi2 = owner[cell.r - 1][cell.c];
      const p = placed[oi2];
      if (p && p.tile.kind === 'image' && p.c <= cell.c && cell.c < p.c + p.tile.colSpan && p.r + p.tile.rowSpan === cell.r) {
        let ok = true;
        for (let j = 0; j < p.tile.colSpan; j++) if (owner[cell.r]?.[p.c + j] !== -1) { ok = false; break; }
        if (ok) candidates.push({ ownerIdx: oi2, newRs: p.tile.rowSpan + 1 });
      }
    }
    if (candidates.length === 0) return false;
    const ch = candidates[0];
    const p = placed[ch.ownerIdx];
    if (ch.newCs) {
      for (let i = 0; i < p.tile.rowSpan; i++) owner[p.r + i][p.c + p.tile.colSpan] = ch.ownerIdx;
      p.tile.colSpan = ch.newCs;
    } else if (ch.newRs) {
      ensureRow(p.r + p.tile.rowSpan);
      for (let j = 0; j < p.tile.colSpan; j++) owner[p.r + p.tile.rowSpan][p.c + j] = ch.ownerIdx;
      p.tile.rowSpan = ch.newRs;
    }
    return true;
  };

  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    for (let r = 0; r < owner.length; r++)
      for (let c = 0; c < cols; c++)
        if (owner[r][c] === -1) if (tryExtend({ r, c })) changed = true;
    if (!changed) break;
  }

  // Guarantee a perfect rectangle: drop any trailing rows that still have holes.
  while (owner.length && owner[owner.length - 1].some((v) => v === -1)) {
    const lastRow = owner.length - 1;
    // Shrink any tile that extends into this row; remove tiles whose origin is here.
    for (let c = 0; c < cols; c++) {
      const idx = owner[lastRow][c];
      if (idx === -1) continue;
      const p = placed[idx];
      if (p.r === lastRow) {
        // origin in dropped row — mark for removal
        p.tile.rowSpan = 0;
      } else {
        p.tile.rowSpan = lastRow - p.r;
      }
    }
    owner.pop();
  }
  const finalTiles = placed.filter((p) => p.tile.rowSpan > 0).map((p) => p.tile);

  return { tiles: finalTiles, rows: owner.length };
}

// Fixed breakpoints — keep grid identical between Lovable preview (≈941px)
// and the published site (≥1024px). Single md breakpoint at 768px.
function colsForWidth(w: number): number {
  if (w >= 768) return 6;
  return 3;
}

interface Override {
  description: string;
  conceptKey?: string | null;
  position?: number | null;
  imageScale?: number;
  imagePosX?: number;
  imagePosY?: number;
  colSpan?: number | null;
  rowSpan?: number | null;
}

const Strati = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAdmin();

  // i18n helper: returns translation if defined, otherwise the provided fallback.
  const tr = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };
  const trConceptTitle = (c?: Concept) => (c ? tr(`strati.concept.${c.key}.title`, c.title) : '');
  const trConceptPhrase = (c?: Concept) => (c ? tr(`strati.concept.${c.key}.phrase`, c.phrase) : '');
  const trAlt = (id: string, fallback: string) => tr(`strati.alt.${id}`, fallback);

  // ── Cloud-backed state ──
  const [conceptsMap, setConceptsMap] = useState<Record<string, Concept>>(() => {
    const m: Record<string, Concept> = {};
    defaultConcepts.forEach((c) => (m[c.key] = c));
    return m;
  });
  const [overrides, setOverrides] = useState<Record<string, Override>>({});
  const [conceptPositions, setConceptPositions] = useState<Record<string, number | null>>({});

  // Load + realtime subscribe
  useEffect(() => {
    let alive = true;

    const seed = async () => {
      // Ensure default concepts exist in DB (idempotent upsert, ignore on conflict)
      await supabase.from('strati_concepts').upsert(
        defaultConcepts.map((c) => ({ key: c.key, title: c.title, phrase: c.phrase })),
        { onConflict: 'key', ignoreDuplicates: true },
      );
      const [{ data: cs }, { data: os }] = await Promise.all([
        supabase.from('strati_concepts').select('*'),
        supabase.from('strati_overrides').select('*'),
      ]);
      if (!alive) return;
      if (cs) {
        const m: Record<string, Concept> = {};
        defaultConcepts.forEach((c) => (m[c.key] = c));
        const pos: Record<string, number | null> = {};
        cs.forEach((c: any) => {
          m[c.key] = { key: c.key, title: c.title, phrase: c.phrase };
          pos[c.key] = c.position ?? null;
        });
        setConceptsMap(m);
        setConceptPositions(pos);
      }
      if (os) {
        const o: Record<string, Override> = {};
        os.forEach((row: any) => (o[row.tile_id] = {
          description: row.description ?? '',
          conceptKey: row.concept_key,
          position: row.position ?? null,
          imageScale: row.image_scale != null ? Number(row.image_scale) : 1,
          imagePosX: row.image_pos_x != null ? Number(row.image_pos_x) : 50,
          imagePosY: row.image_pos_y != null ? Number(row.image_pos_y) : 50,
        }));
        setOverrides(o);
      }
    };
    seed();

    const ch = supabase
      .channel('strati-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'strati_concepts' }, (p) => {
        const row = (p.new ?? p.old) as { key: string; title?: string; phrase?: string; position?: number | null };
        if (!row?.key) return;
        setConceptsMap((prev) => {
          const next = { ...prev };
          if (p.eventType === 'DELETE') {
            const def = defaultConcepts.find((d) => d.key === row.key);
            if (def) next[row.key] = def; else delete next[row.key];
          } else {
            next[row.key] = { key: row.key, title: row.title ?? row.key, phrase: row.phrase ?? '' };
          }
          return next;
        });
        setConceptPositions((prev) => {
          const next = { ...prev };
          if (p.eventType === 'DELETE') delete next[row.key];
          else next[row.key] = row.position ?? null;
          return next;
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'strati_overrides' }, (p) => {
        const row = (p.new ?? p.old) as any;
        if (!row?.tile_id) return;
        setOverrides((prev) => {
          const next = { ...prev };
          if (p.eventType === 'DELETE') delete next[row.tile_id];
          else next[row.tile_id] = {
            description: row.description ?? '',
            conceptKey: row.concept_key,
            position: row.position ?? null,
            imageScale: row.image_scale != null ? Number(row.image_scale) : 1,
            imagePosX: row.image_pos_x != null ? Number(row.image_pos_x) : 50,
            imagePosY: row.image_pos_y != null ? Number(row.image_pos_y) : 50,
          };
          return next;
        });
      })
      .subscribe();

    return () => { alive = false; supabase.removeChannel(ch); };
  }, []);

  // ── Lightbox state ──
  const [expandedTile, setExpandedTile] = useState<{ id: string; kind: 'image' | 'text'; src?: string; alt: string; conceptKey?: string } | null>(null);
  const [activeTile, setActiveTile] = useState<string | null>(null);
  const [draftDescription, setDraftDescription] = useState<string>('');
  const [draftKeyword, setDraftKeyword] = useState<string>(''); // free-text keyword (title)
  const [draftScale, setDraftScale] = useState<number>(1);
  const [draftPosX, setDraftPosX] = useState<number>(50);
  const [draftPosY, setDraftPosY] = useState<number>(50);
  const [savedFlash, setSavedFlash] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  // ── Measure orientations ──
  const [orientations, setOrientations] = useState<Record<string, Orientation>>({});
  useEffect(() => {
    let cancelled = false;
    sourceTiles.forEach((tile) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setOrientations((prev) =>
          prev[tile.id] ? prev : { ...prev, [tile.id]: classify(img.naturalWidth, img.naturalHeight) },
        );
      };
      img.src = tile.cover;
    });
    return () => { cancelled = true; };
  }, []);

  // ── Breakpoint ──
  const [cols, setCols] = useState<number>(() =>
    typeof window === 'undefined' ? 6 : colsForWidth(window.innerWidth),
  );
  useEffect(() => {
    const onResize = () => setCols(colsForWidth(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── Layout ──
  const layout = useMemo(() => {
    // Sort image source tiles by override.position (admin-set), fallback to source order.
    const indexed = sourceTiles.map((tile, idx) => ({ tile, idx }));
    indexed.sort((a, b) => {
      const pa = overrides[a.tile.id]?.position;
      const pb = overrides[b.tile.id]?.position;
      const ka = pa != null ? pa : a.idx;
      const kb = pb != null ? pb : b.idx;
      if (ka !== kb) return ka - kb;
      return a.idx - b.idx;
    });
    const tiles: LayoutTile[] = indexed.map(({ tile }) => {
      const o = orientations[tile.id] ?? 'square';
      const { c, r } = spansFor(o, cols);
      const ov = overrides[tile.id];
      return {
        id: tile.id,
        kind: 'image' as const,
        cover: tile.cover,
        alt: tile.alt,
        description: ov?.description || tile.description,
        conceptKey: ov?.conceptKey ?? tile.conceptKey,
        colSpan: c,
        rowSpan: r,
        imageScale: ov?.imageScale ?? 1,
        imagePosX: ov?.imagePosX ?? 50,
        imagePosY: ov?.imagePosY ?? 50,
      };
    });
    // Concept keys sorted by saved position (admin), fallback to insertion order.
    const allKeys = Object.keys(conceptsMap);
    const keyIndex: Record<string, number> = {};
    allKeys.forEach((k, i) => (keyIndex[k] = i));
    const conceptKeys = [...allKeys].sort((a, b) => {
      const pa = conceptPositions[a];
      const pb = conceptPositions[b];
      const ka = pa != null ? pa : keyIndex[a];
      const kb = pb != null ? pb : keyIndex[b];
      if (ka !== kb) return ka - kb;
      return keyIndex[a] - keyIndex[b];
    });
    return buildLayout(tiles, cols, conceptKeys);
  }, [orientations, cols, overrides, conceptsMap, conceptPositions]);

  const openTile = useCallback(
    (tile: LayoutTile) => {
      const ov = overrides[tile.id];
      const desc = ov?.description ?? tile.description ?? '';
      const ck = tile.conceptKey;
      setExpandedTile({
        id: tile.id,
        kind: tile.kind,
        src: tile.cover,
        alt: tile.alt ?? '',
        conceptKey: ck,
      });
      setDraftDescription(desc);
      setDraftKeyword(ck ? conceptsMap[ck]?.title ?? '' : '');
      setDraftScale(ov?.imageScale ?? 1);
      setDraftPosX(ov?.imagePosX ?? 50);
      setDraftPosY(ov?.imagePosY ?? 50);
      setSavedFlash(false);
    },
    [overrides, conceptsMap],
  );
  const closeImage = useCallback(() => setExpandedTile(null), []);

  // ── Drag & drop reordering (admin) ──
  // Resolved index of an image tile in the current sorted source list.
  const imageOrderIndex = useCallback((id: string): number => {
    const indexed = sourceTiles.map((t, i) => ({ id: t.id, i }));
    indexed.sort((a, b) => {
      const pa = overrides[a.id]?.position;
      const pb = overrides[b.id]?.position;
      const ka = pa != null ? pa : a.i;
      const kb = pb != null ? pb : b.i;
      if (ka !== kb) return ka - kb;
      return a.i - b.i;
    });
    return indexed.findIndex((x) => x.id === id);
  }, [overrides]);

  const conceptOrderIndex = useCallback((key: string): number => {
    const allKeys = Object.keys(conceptsMap);
    const idx: Record<string, number> = {};
    allKeys.forEach((k, i) => (idx[k] = i));
    const sorted = [...allKeys].sort((a, b) => {
      const pa = conceptPositions[a];
      const pb = conceptPositions[b];
      const ka = pa != null ? pa : idx[a];
      const kb = pb != null ? pb : idx[b];
      if (ka !== kb) return ka - kb;
      return idx[a] - idx[b];
    });
    return sorted.indexOf(key);
  }, [conceptsMap, conceptPositions]);

  const handleTileDrop = useCallback(async (sourceTile: LayoutTile, targetTile: LayoutTile) => {
    if (!isAdmin) return;
    if (sourceTile.id === targetTile.id) return;
    if (sourceTile.kind !== targetTile.kind) return;
    if (sourceTile.kind === 'image') {
      const a = imageOrderIndex(sourceTile.id);
      const b = imageOrderIndex(targetTile.id);
      if (a < 0 || b < 0) return;
      // Swap positions of the two tiles.
      await supabase.from('strati_overrides').upsert([
        { tile_id: sourceTile.id, position: b, description: overrides[sourceTile.id]?.description ?? '', concept_key: overrides[sourceTile.id]?.conceptKey ?? null },
        { tile_id: targetTile.id, position: a, description: overrides[targetTile.id]?.description ?? '', concept_key: overrides[targetTile.id]?.conceptKey ?? null },
      ], { onConflict: 'tile_id' });
      setOverrides((prev) => ({
        ...prev,
        [sourceTile.id]: { ...(prev[sourceTile.id] ?? { description: '' }), position: b },
        [targetTile.id]: { ...(prev[targetTile.id] ?? { description: '' }), position: a },
      }));
    } else if (sourceTile.kind === 'text' && sourceTile.conceptKey && targetTile.conceptKey) {
      const a = conceptOrderIndex(sourceTile.conceptKey);
      const b = conceptOrderIndex(targetTile.conceptKey);
      if (a < 0 || b < 0) return;
      await supabase.from('strati_concepts').upsert([
        { key: sourceTile.conceptKey, title: conceptsMap[sourceTile.conceptKey].title, phrase: conceptsMap[sourceTile.conceptKey].phrase, position: b },
        { key: targetTile.conceptKey, title: conceptsMap[targetTile.conceptKey].title, phrase: conceptsMap[targetTile.conceptKey].phrase, position: a },
      ], { onConflict: 'key' });
      setConceptPositions((prev) => ({
        ...prev,
        [sourceTile.conceptKey!]: b,
        [targetTile.conceptKey!]: a,
      }));
    }
  }, [isAdmin, overrides, conceptsMap, conceptPositions, imageOrderIndex, conceptOrderIndex]);

  const handleSave = useCallback(async () => {
    if (!expandedTile) return;
    let resolvedKey: string | null = null;
    const titleInput = draftKeyword.trim();

    if (titleInput) {
      // Match an existing concept by title (case-insensitive); else create new.
      const existing = Object.values(conceptsMap).find(
        (c) => c.title.trim().toLowerCase() === titleInput.toLowerCase(),
      );
      if (existing) {
        resolvedKey = existing.key;
      } else {
        const baseKey = slugifyKey(titleInput) || `k-${Date.now()}`;
        let key = baseKey;
        let n = 2;
        while (conceptsMap[key]) key = `${baseKey}-${n++}`;
        const newConcept: Concept = { key, title: titleInput.toUpperCase(), phrase: '' };
        await supabase.from('strati_concepts').insert(newConcept);
        setConceptsMap((prev) => ({ ...prev, [key]: newConcept }));
        resolvedKey = key;
      }
    }

    await supabase.from('strati_overrides').upsert(
      {
        tile_id: expandedTile.id,
        description: draftDescription,
        concept_key: resolvedKey,
        image_scale: draftScale,
        image_pos_x: draftPosX,
        image_pos_y: draftPosY,
      },
      { onConflict: 'tile_id' },
    );
    setOverrides((prev) => ({
      ...prev,
      [expandedTile.id]: {
        ...(prev[expandedTile.id] ?? {}),
        description: draftDescription,
        conceptKey: resolvedKey,
        imageScale: draftScale,
        imagePosX: draftPosX,
        imagePosY: draftPosY,
      },
    }));
    setExpandedTile((prev) => (prev ? { ...prev, conceptKey: resolvedKey ?? undefined } : prev));
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1600);
  }, [expandedTile, draftDescription, draftKeyword, draftScale, draftPosX, draftPosY, conceptsMap]);

  // For text-tile lightbox: allow editing the phrase (the concept's extended text)
  const handleSaveTextTile = useCallback(async () => {
    if (!expandedTile || expandedTile.kind !== 'text' || !expandedTile.conceptKey) return;
    const key = expandedTile.conceptKey;
    const titleInput = draftKeyword.trim();
    const newTitle = titleInput ? titleInput.toUpperCase() : conceptsMap[key]?.title ?? key;
    await supabase.from('strati_concepts').upsert(
      { key, title: newTitle, phrase: draftDescription },
      { onConflict: 'key' },
    );
    setConceptsMap((prev) => ({ ...prev, [key]: { key, title: newTitle, phrase: draftDescription } }));
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1600);
  }, [expandedTile, draftDescription, draftKeyword, conceptsMap]);

  const gridColsClass =
    cols === 6 ? 'grid-cols-6' : cols === 5 ? 'grid-cols-5' : 'grid-cols-3';

  const expandedConcept = expandedTile?.conceptKey ? conceptsMap[expandedTile.conceptKey] : undefined;

  return (
    <section id="strati" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide mb-4 text-center">
              {t('strati.heading')}
            </h2>
          </div>

          <div className="space-y-4 font-body text-sm md:text-base text-foreground leading-[1.6] mb-12 md:mb-16">
            <p>{t('strati.text')}</p>
          </div>

          {isAdmin && (
            <div className="mb-4 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/30 bg-background font-body text-[10px] uppercase tracking-[0.2em] text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                Admin · trascina i tasselli per riordinare · click per inquadrare
              </div>
            </div>
          )}

          <div
            className={`grid ${gridColsClass} auto-rows-[90px] md:auto-rows-[110px] lg:auto-rows-[120px] gap-1 md:gap-2 lg:gap-2.5`}
            style={{ gridAutoFlow: 'dense' }}
          >
            {layout.tiles.map((tile) => {
              const concept = tile.conceptKey ? conceptsMap[tile.conceptKey] : undefined;
              const isActive = activeTile === tile.id;
              const isText = tile.kind === 'text';
              return (
              <motion.div
                  key={tile.id}
                  className={`relative overflow-hidden rounded-sm group ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${
                    isText ? 'bg-background border border-border/40' : 'bg-card'
                  } ${isAdmin && dragId && dragId !== tile.id ? 'ring-1 ring-foreground/20' : ''} ${isAdmin && dragId === tile.id ? 'opacity-60' : ''}`}
                  style={{
                    gridColumn: `span ${tile.colSpan}`,
                    gridRow: `span ${tile.rowSpan}`,
                  }}
                  draggable={isAdmin}
                  onDragStart={((e: React.DragEvent<HTMLDivElement>) => {
                    if (!isAdmin) return;
                    setDragId(tile.id);
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', tile.id);
                  }) as any}
                  onDragEnd={(() => setDragId(null)) as any}
                  onDragOver={((e: React.DragEvent<HTMLDivElement>) => {
                    if (!isAdmin || !dragId) return;
                    const src = layout.tiles.find((t) => t.id === dragId);
                    if (src && src.kind === tile.kind) {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                    }
                  }) as any}
                  onDrop={((e: React.DragEvent<HTMLDivElement>) => {
                    if (!isAdmin) return;
                    e.preventDefault();
                    const srcId = e.dataTransfer.getData('text/plain') || dragId;
                    if (!srcId) return;
                    const src = layout.tiles.find((t) => t.id === srcId);
                    if (src) handleTileDrop(src, tile);
                    setDragId(null);
                  }) as any}
                  onClick={() => { if (!dragId) openTile(tile); }}
                  onMouseEnter={() => !isText && concept && setActiveTile(tile.id)}
                  onMouseLeave={() => !isText && concept && setActiveTile((prev) => (prev === tile.id ? null : prev))}
                  whileHover={isText ? undefined : { scale: 1.015 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {!isText && tile.cover && (
                    <img
                      src={tile.cover}
                      alt={trAlt(tile.id, tile.alt ?? '')}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      style={{
                        transform: `scale(${tile.imageScale ?? 1})`,
                        transformOrigin: `${tile.imagePosX ?? 50}% ${tile.imagePosY ?? 50}%`,
                        objectPosition: `${tile.imagePosX ?? 50}% ${tile.imagePosY ?? 50}%`,
                      }}
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500"
                    />
                  )}

                  {isText && concept && (() => {
                    const title = trConceptTitle(concept);
                    const isVertical = tile.rowSpan > tile.colSpan || title.length > 8;
                    return (
                      <div className="absolute inset-0 flex items-center justify-center text-center px-1 md:px-2 overflow-hidden">
                        <span
                          className="font-display font-light text-foreground leading-none"
                          style={
                            isVertical
                              ? {
                                  writingMode: 'vertical-rl',
                                  textOrientation: 'upright',
                                  letterSpacing: '0.08em',
                                  fontSize: 'clamp(9px, 1.1vw, 13px)',
                                }
                              : {
                                  letterSpacing: '0.12em',
                                  fontSize: 'clamp(9px, 1.1vw, 14px)',
                                }
                          }
                        >
                          {title}
                        </span>
                      </div>
                    );
                  })()}

                  {!isText && concept && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-background/75 backdrop-blur-[2px] pointer-events-none"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            key="concept"
                            className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 md:px-6 pointer-events-none"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                          >
                            <span className="font-display font-medium tracking-[0.2em] text-foreground text-xs md:text-base lg:text-lg leading-tight">
                              {trConceptTitle(concept)}
                            </span>
                            <span className="font-body font-normal text-foreground/90 text-[10px] md:text-xs lg:text-sm leading-snug mt-2 md:mt-3 max-w-[92%] hidden md:block">
                              {trConceptPhrase(concept)}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {expandedTile && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 flex flex-col items-center justify-center p-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeImage}
          >
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
              aria-label={t('strati.close')}
            >
              <X className="w-5 h-5" />
            </button>

            {expandedTile.kind === 'image' && expandedTile.src ? (
              <motion.img
                src={expandedTile.src}
                alt={expandedTile.alt}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                className="max-w-[90vw] max-h-[60vh] object-contain select-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              expandedConcept && (
                <motion.div
                  className="max-w-[90vw] text-center px-6"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="font-display font-light tracking-[0.22em] text-foreground text-3xl md:text-5xl lg:text-6xl leading-tight">
                    {trConceptTitle(expandedConcept)}
                  </div>
                  {trConceptPhrase(expandedConcept) && (
                    <div className="font-body font-light text-foreground/80 text-sm md:text-base lg:text-lg leading-relaxed mt-6 md:mt-8 max-w-2xl mx-auto whitespace-pre-line">
                      {trConceptPhrase(expandedConcept)}
                    </div>
                  )}
                </motion.div>
              )
            )}

            <motion.div
              className="mt-6 w-full max-w-xl text-center px-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              {expandedTile.kind === 'image' && expandedTile.alt && (
                <div className="font-body font-light text-muted-foreground text-[11px] md:text-xs leading-snug mb-4">
                  {trAlt(expandedTile.id, expandedTile.alt)}
                </div>
              )}

              {isAdmin ? (
                <div className="mt-2 text-left grid gap-3">
                  {/* Keyword field — editable + datalist of existing concepts */}
                  <div>
                    <label className="block font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      Keyword
                    </label>
                    <input
                      type="text"
                      list="strati-keywords"
                      value={draftKeyword}
                      onChange={(e) => setDraftKeyword(e.target.value)}
                      placeholder="Scegli o scrivi una keyword (es. POROSITÀ)"
                      className="w-full rounded-sm border border-border bg-background/60 px-3 py-2 font-body text-xs md:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground/40"
                    />
                    <datalist id="strati-keywords">
                      {Object.values(conceptsMap).map((c) => (
                        <option key={c.key} value={c.title} />
                      ))}
                    </datalist>
                  </div>

                  {/* Image framing — admin can scale + reposition image inside the tile */}
                  {expandedTile.kind === 'image' && expandedTile.src && (
                    <div className="grid gap-2">
                      <label className="block font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Inquadratura immagine
                      </label>
                      <div
                        className="relative w-full overflow-hidden rounded-sm border border-border bg-card aspect-[3/2] cursor-crosshair touch-none select-none"
                        onPointerDown={(e) => {
                          const el = e.currentTarget;
                          el.setPointerCapture(e.pointerId);
                          const apply = (cx: number, cy: number) => {
                            const r = el.getBoundingClientRect();
                            const x = ((cx - r.left) / r.width) * 100;
                            const y = ((cy - r.top) / r.height) * 100;
                            setDraftPosX(Math.max(0, Math.min(100, Math.round(x * 10) / 10)));
                            setDraftPosY(Math.max(0, Math.min(100, Math.round(y * 10) / 10)));
                          };
                          apply(e.clientX, e.clientY);
                          const move = (ev: PointerEvent) => apply(ev.clientX, ev.clientY);
                          const up = (ev: PointerEvent) => {
                            el.removeEventListener('pointermove', move);
                            el.removeEventListener('pointerup', up);
                            el.removeEventListener('pointercancel', up);
                            try { el.releasePointerCapture(ev.pointerId); } catch {}
                          };
                          el.addEventListener('pointermove', move);
                          el.addEventListener('pointerup', up);
                          el.addEventListener('pointercancel', up);
                        }}
                      >
                        <img
                          src={expandedTile.src}
                          alt=""
                          draggable={false}
                          className="w-full h-full object-cover pointer-events-none select-none"
                          style={{
                            transform: `scale(${draftScale})`,
                            transformOrigin: `${draftPosX}% ${draftPosY}%`,
                            objectPosition: `${draftPosX}% ${draftPosY}%`,
                          }}
                        />
                        {/* Rule-of-thirds grid */}
                        <div className="pointer-events-none absolute inset-0">
                          <div className="absolute inset-y-0 left-1/3 w-px bg-foreground/25" />
                          <div className="absolute inset-y-0 left-2/3 w-px bg-foreground/25" />
                          <div className="absolute inset-x-0 top-1/3 h-px bg-foreground/25" />
                          <div className="absolute inset-x-0 top-2/3 h-px bg-foreground/25" />
                          {/* Center crosshair */}
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                            <div className="absolute inset-x-0 top-1/2 h-px bg-foreground/60" />
                            <div className="absolute inset-y-0 left-1/2 w-px bg-foreground/60" />
                          </div>
                          {/* Current focus marker */}
                          <div
                            className="absolute w-3 h-3 rounded-full border border-background bg-foreground/80 -translate-x-1/2 -translate-y-1/2 shadow"
                            style={{ left: `${draftPosX}%`, top: `${draftPosY}%` }}
                          />
                        </div>
                      </div>
                      <p className="font-body text-[10px] text-muted-foreground/80 normal-case tracking-normal -mt-1">
                        Clicca o trascina sull'anteprima per spostare il punto focale.
                      </p>
                      <div className="grid grid-cols-3 gap-3 mt-1">
                        <label className="flex flex-col gap-1 font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          Zoom
                          <input
                            type="range" min={1} max={4} step={0.05}
                            value={draftScale}
                            onChange={(e) => setDraftScale(parseFloat(e.target.value))}
                          />
                          <input
                            type="number" min={1} max={4} step={0.01}
                            value={Number(draftScale.toFixed(2))}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value);
                              if (!isNaN(v)) setDraftScale(Math.max(1, Math.min(4, v)));
                            }}
                            className="w-full rounded-sm border border-border bg-background/60 px-2 py-1 font-body text-[11px] text-foreground normal-case tracking-normal focus:outline-none focus:ring-1 focus:ring-foreground/40"
                          />
                        </label>
                        <label className="flex flex-col gap-1 font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          Pos. X
                          <input
                            type="range" min={0} max={100} step={0.5}
                            value={draftPosX}
                            onChange={(e) => setDraftPosX(parseFloat(e.target.value))}
                          />
                          <input
                            type="number" min={0} max={100} step={0.5}
                            value={Number(draftPosX.toFixed(1))}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value);
                              if (!isNaN(v)) setDraftPosX(Math.max(0, Math.min(100, v)));
                            }}
                            className="w-full rounded-sm border border-border bg-background/60 px-2 py-1 font-body text-[11px] text-foreground normal-case tracking-normal focus:outline-none focus:ring-1 focus:ring-foreground/40"
                          />
                        </label>
                        <label className="flex flex-col gap-1 font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          Pos. Y
                          <input
                            type="range" min={0} max={100} step={0.5}
                            value={draftPosY}
                            onChange={(e) => setDraftPosY(parseFloat(e.target.value))}
                          />
                          <input
                            type="number" min={0} max={100} step={0.5}
                            value={Number(draftPosY.toFixed(1))}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value);
                              if (!isNaN(v)) setDraftPosY(Math.max(0, Math.min(100, v)));
                            }}
                            className="w-full rounded-sm border border-border bg-background/60 px-2 py-1 font-body text-[11px] text-foreground normal-case tracking-normal focus:outline-none focus:ring-1 focus:ring-foreground/40"
                          />
                        </label>
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <button
                          type="button"
                          onClick={() => { setDraftScale(1); setDraftPosX(50); setDraftPosY(50); }}
                          className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition"
                        >
                          Reset inquadratura
                        </button>
                        <button
                          type="button"
                          onClick={() => { setDraftPosX(50); setDraftPosY(50); }}
                          className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition"
                        >
                          Centra punto focale
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Description field + template selector */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <label className="block font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {expandedTile.kind === 'text' ? 'Frase del concetto' : 'Descrizione'}
                      </label>
                      <select
                        value=""
                        onChange={(e) => {
                          const tpl = descriptionTemplates.find((d) => d.id === e.target.value);
                          if (tpl) setDraftDescription(tpl.text);
                          e.target.value = '';
                        }}
                        className="rounded-sm border border-border bg-background/60 px-2 py-1 font-body text-[11px] md:text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/40"
                      >
                        <option value="">Modello…</option>
                        {descriptionTemplates.map((tpl) => (
                          <option key={tpl.id} value={tpl.id}>{tpl.label}</option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      value={draftDescription}
                      onChange={(e) => setDraftDescription(e.target.value)}
                      placeholder={
                        expandedTile.kind === 'text'
                          ? 'Frase descrittiva associata alla keyword…'
                          : 'Aggiungi o modifica la descrizione di questa immagine…'
                      }
                      rows={4}
                      className="w-full resize-y rounded-sm border border-border bg-background/60 p-3 font-body text-xs md:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground/40 transition"
                    />
                  </div>

                  <div className="mt-1 flex items-center justify-end gap-3">
                    {savedFlash && (
                      <span className="font-body text-[11px] text-muted-foreground">Salvato</span>
                    )}
                    <button
                      type="button"
                      onClick={expandedTile.kind === 'text' ? handleSaveTextTile : handleSave}
                      className="px-4 py-1.5 rounded-sm border border-foreground/70 bg-foreground text-background font-body text-[11px] md:text-xs uppercase tracking-[0.18em] hover:bg-foreground/90 transition"
                    >
                      Salva
                    </button>
                  </div>
                </div>
              ) : (
                expandedTile.kind === 'image' && draftDescription && (
                  <div className="mt-2 font-body font-light text-foreground/80 text-sm md:text-base leading-relaxed text-center max-w-2xl mx-auto whitespace-pre-line">
                    {draftDescription}
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Strati;
