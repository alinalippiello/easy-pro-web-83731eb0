import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { toast } from 'sonner';
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
  isCustom?: boolean;
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

function textTileSize(title: string): { c: number; r: number } {
  const len = (title ?? '').trim().length;
  // Long keywords need more vertical room (rendered with vertical writing-mode).
  if (len > 14) return { c: 1, r: 3 };
  if (len > 8) return { c: 1, r: 2 };
  return { c: 1, r: 1 };
}

function buildLayout(
  imageTiles: LayoutTile[],
  cols: number,
  conceptKeys: string[],
  conceptTitles: Record<string, string>,
  conceptAnchors: Record<string, string | null>,
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
    const key = conceptKeys[i];
    const sz = textTileSize(conceptTitles[key] ?? key);
    textTiles.push({
      id: `text-${key}`,
      kind: 'text',
      colSpan: sz.c,
      rowSpan: sz.r,
      conceptKey: key,
    });
  }

  // Split anchored vs free text tiles.
  const imageIdSet = new Set(interleavedImages.map((t) => t.id));
  const anchoredAfter: Record<string, LayoutTile[]> = {};
  const freeText: LayoutTile[] = [];
  for (const tt of textTiles) {
    const anchor = tt.conceptKey ? conceptAnchors[tt.conceptKey] : null;
    if (anchor && imageIdSet.has(anchor)) {
      (anchoredAfter[anchor] ||= []).push(tt);
    } else {
      freeText.push(tt);
    }
  }

  // Mix: distribute free text tiles evenly; insert anchored ones right after their image.
  const mixed: LayoutTile[] = [];
  const step = freeText.length > 0 ? Math.max(2, Math.floor(interleavedImages.length / (freeText.length + 1))) : 0;
  let ti = 0;
  interleavedImages.forEach((img, i) => {
    mixed.push(img);
    const anchored = anchoredAfter[img.id];
    if (anchored) for (const a of anchored) mixed.push(a);
    if (ti < freeText.length && step > 0 && (i + 1) % step === 0) mixed.push(freeText[ti++]);
  });
  while (ti < freeText.length) mixed.push(freeText[ti++]);

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

  // Note: we no longer drop trailing rows with holes. The CSS grid uses
  // `grid-auto-flow: dense`, which packs tiles automatically and avoids the
  // "lost tiles" problem when admin enlarges a tile.
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
  hidden?: boolean;
  coverUrl?: string | null;
}

interface CustomTile {
  id: string;
  cover_url: string;
  alt: string;
  position: number | null;
  hidden: boolean;
}

const MIN_IMAGE_SCALE = 0.5;
const MAX_IMAGE_SCALE = 4;
const clampNumber = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const roundTo = (value: number, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

const Strati = () => {
  const { t } = useLanguage();
  const { isAdmin, realAdmin } = useAdmin();

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
  const [conceptAnchors, setConceptAnchors] = useState<Record<string, string | null>>({});
  const [customTiles, setCustomTiles] = useState<CustomTile[]>([]);

  // Undo stack for reorder operations (admin only).
  type ReorderUndo =
    | { kind: 'anchor'; conceptKey: string; prevAnchorId: string | null }
    | { kind: 'image'; prevPositions: { id: string; pos: number | null; isCustom: boolean }[] }
    | { kind: 'text'; prevPositions: { key: string; pos: number | null }[] };
  const UNDO_STORAGE_KEY = 'strati-undo-stack-v1';
  const REDO_STORAGE_KEY = 'strati-redo-stack-v1';
  const loadStack = (key: string): ReorderUndo[] => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as ReorderUndo[]).slice(-20) : [];
    } catch {
      return [];
    }
  };
  const persistStack = (key: string, stack: ReorderUndo[]) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(stack));
    } catch {
      // ignore quota / serialization errors
    }
  };
  const undoStackRef = useRef<ReorderUndo[]>(loadStack(UNDO_STORAGE_KEY));
  const redoStackRef = useRef<ReorderUndo[]>(loadStack(REDO_STORAGE_KEY));
  const [undoCount, setUndoCount] = useState(undoStackRef.current.length);
  const [redoCount, setRedoCount] = useState(redoStackRef.current.length);
  const setUndoStack = useCallback((stack: ReorderUndo[]) => {
    undoStackRef.current = stack;
    setUndoCount(stack.length);
    persistStack(UNDO_STORAGE_KEY, stack);
  }, []);
  const setRedoStack = useCallback((stack: ReorderUndo[]) => {
    redoStackRef.current = stack;
    setRedoCount(stack.length);
    persistStack(REDO_STORAGE_KEY, stack);
  }, []);
  const pushUndo = useCallback((u: ReorderUndo) => {
    setUndoStack([...undoStackRef.current, u].slice(-20));
    // A new user action invalidates the redo stack.
    setRedoStack([]);
  }, [setUndoStack, setRedoStack]);

  // Load + realtime subscribe
  useEffect(() => {
    let alive = true;

    const seed = async () => {
      // Ensure default concepts exist in DB (idempotent upsert, ignore on conflict)
      await supabase.from('strati_concepts').upsert(
        defaultConcepts.map((c) => ({ key: c.key, title: c.title, phrase: c.phrase })),
        { onConflict: 'key', ignoreDuplicates: true },
      );
      const [{ data: cs }, { data: os }, { data: ct }] = await Promise.all([
        supabase.from('strati_concepts').select('*'),
        supabase.from('strati_overrides').select('*'),
        (supabase.from('strati_custom_tiles' as any).select('*') as any),
      ]);
      if (!alive) return;
      if (cs) {
        const m: Record<string, Concept> = {};
        defaultConcepts.forEach((c) => (m[c.key] = c));
        const pos: Record<string, number | null> = {};
        const anc: Record<string, string | null> = {};
        cs.forEach((c: any) => {
          m[c.key] = { key: c.key, title: c.title, phrase: c.phrase };
          pos[c.key] = c.position ?? null;
          anc[c.key] = c.anchor_image_id ?? null;
        });
        setConceptsMap(m);
        setConceptPositions(pos);
        setConceptAnchors(anc);
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
          colSpan: row.col_span ?? null,
          rowSpan: row.row_span ?? null,
          hidden: !!row.hidden,
          coverUrl: row.cover_url ?? null,
        }));
        setOverrides(o);
      }
      if (ct) {
        setCustomTiles(
          (ct as any[]).map((r) => ({
            id: r.id,
            cover_url: r.cover_url,
            alt: r.alt ?? '',
            position: r.position ?? null,
            hidden: !!r.hidden,
          })),
        );
      }
    };
    seed();

    const ch = supabase
      .channel('strati-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'strati_concepts' }, (p) => {
        const row = (p.new ?? p.old) as { key: string; title?: string; phrase?: string; position?: number | null; anchor_image_id?: string | null };
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
        setConceptAnchors((prev) => {
          const next = { ...prev };
          if (p.eventType === 'DELETE') delete next[row.key];
          else next[row.key] = row.anchor_image_id ?? null;
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
            colSpan: row.col_span ?? null,
            rowSpan: row.row_span ?? null,
            hidden: !!row.hidden,
            coverUrl: row.cover_url ?? null,
          };
          return next;
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'strati_custom_tiles' }, (p) => {
        const row = (p.new ?? p.old) as any;
        if (!row?.id) return;
        setCustomTiles((prev) => {
          if (p.eventType === 'DELETE') return prev.filter((t) => t.id !== row.id);
          const next = prev.filter((t) => t.id !== row.id);
          next.push({
            id: row.id,
            cover_url: row.cover_url,
            alt: row.alt ?? '',
            position: row.position ?? null,
            hidden: !!row.hidden,
          });
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
  const [originalKeyword, setOriginalKeyword] = useState<string>('');
  const [originalDescription, setOriginalDescription] = useState<string>('');
  const [draftScale, setDraftScale] = useState<number>(1);
  const [draftPosX, setDraftPosX] = useState<number>(50);
  const [draftPosY, setDraftPosY] = useState<number>(50);
  const [draftColSpan, setDraftColSpan] = useState<number>(1);
  const [draftRowSpan, setDraftRowSpan] = useState<number>(1);
  const [savedFlash, setSavedFlash] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [panningTileId, setPanningTileId] = useState<string | null>(null);
  const suppressTileClickRef = useRef(false);

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

  // Combined ordered image-tile list (source + custom).
  // Hidden tiles are kept in the list ONLY for admin (rendered faded so they can be restored).
  const orderedImageSources = useMemo(() => {
    type Item = { id: string; cover: string; alt: string; conceptKey?: string; description?: string; isCustom: boolean; hidden: boolean; position: number | null; fallbackIdx: number };
    const items: Item[] = [];
    sourceTiles.forEach((tile, idx) => {
      const ov = overrides[tile.id];
      items.push({
        id: tile.id,
        cover: ov?.coverUrl || tile.cover,
        alt: tile.alt,
        conceptKey: ov?.conceptKey ?? tile.conceptKey,
        description: ov?.description || tile.description,
        isCustom: false,
        hidden: !!ov?.hidden,
        position: ov?.position ?? null,
        fallbackIdx: idx,
      });
    });
    customTiles.forEach((ct, i) => {
      const ov = overrides[ct.id];
      items.push({
        id: ct.id,
        cover: ov?.coverUrl || ct.cover_url,
        alt: ct.alt,
        conceptKey: ov?.conceptKey ?? null,
        description: ov?.description || '',
        isCustom: true,
        hidden: !!ct.hidden || !!ov?.hidden,
        position: ov?.position ?? ct.position ?? null,
        fallbackIdx: sourceTiles.length + i,
      });
    });
    items.sort((a, b) => {
      const ka = a.position != null ? a.position : a.fallbackIdx;
      const kb = b.position != null ? b.position : b.fallbackIdx;
      if (ka !== kb) return ka - kb;
      return a.fallbackIdx - b.fallbackIdx;
    });
    return items;
  }, [overrides, customTiles]);

  const layout = useMemo(() => {
    const visibleSources = orderedImageSources.filter((s) => isAdmin || !s.hidden);
    const tiles: LayoutTile[] = visibleSources.map((s) => {
      const o = orientations[s.id] ?? 'square';
      const auto = spansFor(o, cols);
      const ov = overrides[s.id];
      const cs = ov?.colSpan && ov.colSpan > 0 ? Math.min(cols, ov.colSpan) : auto.c;
      const rs = ov?.rowSpan && ov.rowSpan > 0 ? Math.min(6, ov.rowSpan) : auto.r;
      return {
        id: s.id,
        kind: 'image' as const,
        cover: s.cover,
        alt: s.alt,
        description: s.description,
        conceptKey: s.conceptKey,
        colSpan: cs,
        rowSpan: rs,
        imageScale: ov?.imageScale ?? 1,
        imagePosX: ov?.imagePosX ?? 50,
        imagePosY: ov?.imagePosY ?? 50,
        isCustom: s.isCustom,
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
    const titleMap: Record<string, string> = {};
    Object.values(conceptsMap).forEach((c) => (titleMap[c.key] = c.title));
    return buildLayout(tiles, cols, conceptKeys, titleMap, conceptAnchors);
  }, [orderedImageSources, orientations, cols, overrides, conceptsMap, conceptPositions, conceptAnchors, isAdmin]);

  const hiddenIdSet = useMemo(() => new Set(orderedImageSources.filter((s) => s.hidden).map((s) => s.id)), [orderedImageSources]);

  const openTile = useCallback(
    (tile: LayoutTile) => {
      const ov = overrides[tile.id];
      const ck = tile.conceptKey;
      // For text tiles the editable "frase" is the concept's phrase; for image tiles it's the description override.
      const initialDesc = tile.kind === 'text'
        ? (ck ? conceptsMap[ck]?.phrase ?? '' : '')
        : (ov?.description ?? tile.description ?? '');
      const initialKeyword = ck ? conceptsMap[ck]?.title ?? '' : '';
      setExpandedTile({
        id: tile.id,
        kind: tile.kind,
        src: tile.cover,
        alt: tile.alt ?? '',
        conceptKey: ck,
      });
      setDraftDescription(initialDesc);
      setDraftKeyword(initialKeyword);
      setOriginalDescription(initialDesc);
      setOriginalKeyword(initialKeyword);
      setDraftScale(ov?.imageScale ?? 1);
      setDraftPosX(ov?.imagePosX ?? 50);
      setDraftPosY(ov?.imagePosY ?? 50);
      setDraftColSpan(ov?.colSpan && ov.colSpan > 0 ? ov.colSpan : tile.colSpan);
      setDraftRowSpan(ov?.rowSpan && ov.rowSpan > 0 ? ov.rowSpan : tile.rowSpan);
      setSavedFlash(false);
    },
    [overrides, conceptsMap],
  );
  const closeImage = useCallback(() => setExpandedTile(null), []);

  // ── Drag & drop reordering (admin) ──
  // Insert-before reorder: source tile is moved to the slot occupied by target.
  // All affected tiles get a new sequential position so the order is stable.
  const handleTileDrop = useCallback(async (sourceTile: LayoutTile, targetTile: LayoutTile) => {
    if (!isAdmin) return;
    if (sourceTile.id === targetTile.id) return;

    // Cross-kind: anchor the text concept to the involved image's slot.
    if (sourceTile.kind !== targetTile.kind) {
      const textTile = sourceTile.kind === 'text' ? sourceTile : targetTile;
      const imageTile = sourceTile.kind === 'image' ? sourceTile : targetTile;
      if (!textTile.conceptKey) return;
      const c = conceptsMap[textTile.conceptKey];
      if (!c) return;
      const prevAnchor = conceptAnchors[c.key] ?? null;
      const { error } = await supabase.from('strati_concepts').upsert(
        { key: c.key, title: c.title, phrase: c.phrase, anchor_image_id: imageTile.id } as any,
        { onConflict: 'key' },
      );
      if (error) { toast.error('Permesso negato: solo l\'admin reale può salvare le modifiche'); return; }
      setConceptAnchors((prev) => ({ ...prev, [c.key]: imageTile.id }));
      pushUndo({ kind: 'anchor', conceptKey: c.key, prevAnchorId: prevAnchor });
      toast.success(`Keyword "${c.title}" spostata accanto all'immagine`);
      return;
    }

    if (sourceTile.kind === 'image') {
      // Reorder within the full ordered list (sources + customs, including hidden).
      const order = orderedImageSources.map((s) => s.id);
      const from = order.indexOf(sourceTile.id);
      const to = order.indexOf(targetTile.id);
      if (from < 0 || to < 0) return;
      const next = order.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      // Persist positions for all tiles whose index changed.
      const changed: { id: string; pos: number }[] = [];
      next.forEach((id, i) => {
        const prevPos = orderedImageSources.find((s) => s.id === id)?.position ?? null;
        if (prevPos !== i) changed.push({ id, pos: i });
      });
      // Optimistic local update first.
      setOverrides((prev) => {
        const np = { ...prev };
        changed.forEach(({ id, pos }) => {
          if (customTiles.find((c) => c.id === id)) {
            // For custom tiles, position lives on strati_custom_tiles, but we also
            // mirror it into overrides so the in-memory ordering recomputes.
            np[id] = { ...(np[id] ?? { description: '' }), position: pos };
          } else {
            np[id] = { ...(np[id] ?? { description: '' }), position: pos };
          }
        });
        return np;
      });
      // Split between source-tile updates (overrides) and custom-tile updates.
      const customIds = new Set(customTiles.map((c) => c.id));
      const ovRows = changed
        .filter((c) => !customIds.has(c.id))
        .map(({ id, pos }) => ({
          tile_id: id,
          position: pos,
          description: overrides[id]?.description ?? '',
          concept_key: overrides[id]?.conceptKey ?? null,
        }));
      const ctRows = changed
        .filter((c) => customIds.has(c.id))
        .map(({ id, pos }) => ({ id, position: pos }));
      const tasks: Promise<any>[] = [];
      if (ovRows.length) tasks.push(Promise.resolve(supabase.from('strati_overrides').upsert(ovRows, { onConflict: 'tile_id' })));
      ctRows.forEach((row) => tasks.push(
        Promise.resolve((supabase.from('strati_custom_tiles' as any) as any).update({ position: row.position }).eq('id', row.id)),
      ));
      const results = await Promise.all(tasks);
      const err = results.find((r: any) => r?.error)?.error;
      if (err) { toast.error('Permesso negato: solo l\'admin reale può salvare lo spostamento'); return; }
      // Snapshot previous positions for undo.
      const customIdsForUndo = new Set(customTiles.map((c) => c.id));
      pushUndo({
        kind: 'image',
        prevPositions: changed.map(({ id }) => ({
          id,
          pos: orderedImageSources.find((s) => s.id === id)?.position ?? null,
          isCustom: customIdsForUndo.has(id),
        })),
      });
    } else if (sourceTile.kind === 'text' && sourceTile.conceptKey && targetTile.conceptKey) {
      // Insert-before reorder for text tiles too.
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
      const from = sorted.indexOf(sourceTile.conceptKey);
      const to = sorted.indexOf(targetTile.conceptKey);
      if (from < 0 || to < 0) return;
      const reordered = sorted.slice();
      const [moved] = reordered.splice(from, 1);
      reordered.splice(to, 0, moved);
      const rows = reordered.map((key, i) => ({
        key,
        title: conceptsMap[key].title,
        phrase: conceptsMap[key].phrase,
        position: i,
      }));
      const { error } = await supabase.from('strati_concepts').upsert(rows, { onConflict: 'key' });
      if (error) { toast.error('Permesso negato: solo l\'admin reale può salvare lo spostamento'); return; }
      pushUndo({
        kind: 'text',
        prevPositions: sorted.map((k) => ({ key: k, pos: conceptPositions[k] ?? null })),
      });
      const newPos: Record<string, number> = {};
      reordered.forEach((k, i) => (newPos[k] = i));
      setConceptPositions((prev) => ({ ...prev, ...newPos }));
    }
  }, [isAdmin, overrides, conceptsMap, conceptPositions, conceptAnchors, orderedImageSources, customTiles, pushUndo]);

  // Apply a reorder snapshot to DB + local state, returning the inverse snapshot
  // (capturing the state that was just replaced) so it can be pushed onto the
  // opposite stack for redo/undo symmetry.
  const applyReorderSnapshot = useCallback(async (snap: ReorderUndo): Promise<ReorderUndo> => {
    if (snap.kind === 'anchor') {
      const c = conceptsMap[snap.conceptKey];
      if (!c) throw new Error('Concept mancante');
      const inverse: ReorderUndo = {
        kind: 'anchor',
        conceptKey: snap.conceptKey,
        prevAnchorId: conceptAnchors[snap.conceptKey] ?? null,
      };
      const { error } = await supabase.from('strati_concepts').upsert(
        { key: c.key, title: c.title, phrase: c.phrase, anchor_image_id: snap.prevAnchorId } as any,
        { onConflict: 'key' },
      );
      if (error) throw error;
      setConceptAnchors((prev) => ({ ...prev, [c.key]: snap.prevAnchorId }));
      return inverse;
    }
    if (snap.kind === 'image') {
      const customIds = new Set(customTiles.map((c) => c.id));
      const inverse: ReorderUndo = {
        kind: 'image',
        prevPositions: snap.prevPositions.map((p) => ({
          id: p.id,
          pos: orderedImageSources.find((s) => s.id === p.id)?.position ?? null,
          isCustom: p.isCustom,
        })),
      };
      const ovRows = snap.prevPositions
        .filter((p) => !customIds.has(p.id))
        .map((p) => ({
          tile_id: p.id,
          position: p.pos,
          description: overrides[p.id]?.description ?? '',
          concept_key: overrides[p.id]?.conceptKey ?? null,
        }));
      const ctRows = snap.prevPositions.filter((p) => customIds.has(p.id));
      const tasks: Promise<any>[] = [];
      if (ovRows.length) tasks.push(Promise.resolve(supabase.from('strati_overrides').upsert(ovRows, { onConflict: 'tile_id' })));
      ctRows.forEach((row) => tasks.push(
        Promise.resolve((supabase.from('strati_custom_tiles' as any) as any).update({ position: row.pos }).eq('id', row.id)),
      ));
      const results = await Promise.all(tasks);
      const err = results.find((r: any) => r?.error)?.error;
      if (err) throw err;
      setOverrides((prev) => {
        const np = { ...prev };
        snap.prevPositions.forEach(({ id, pos }) => {
          np[id] = { ...(np[id] ?? { description: '' }), position: pos };
        });
        return np;
      });
      return inverse;
    }
    // text
    const inverse: ReorderUndo = {
      kind: 'text',
      prevPositions: snap.prevPositions.map((p) => ({
        key: p.key,
        pos: conceptPositions[p.key] ?? null,
      })),
    };
    const rows = snap.prevPositions.map((p) => ({
      key: p.key,
      title: conceptsMap[p.key]?.title ?? p.key,
      phrase: conceptsMap[p.key]?.phrase ?? '',
      position: p.pos,
    }));
    const { error } = await supabase.from('strati_concepts').upsert(rows, { onConflict: 'key' });
    if (error) throw error;
    const newPos: Record<string, number | null> = {};
    snap.prevPositions.forEach((p) => (newPos[p.key] = p.pos));
    setConceptPositions((prev) => ({ ...prev, ...newPos }));
    return inverse;
  }, [conceptsMap, conceptAnchors, conceptPositions, customTiles, orderedImageSources, overrides]);

  // Undo last reorder operation.
  const handleUndoReorder = useCallback(async () => {
    if (!isAdmin) return;
    const stack = undoStackRef.current;
    if (stack.length === 0) return;
    const last = stack[stack.length - 1];
    setUndoStack(stack.slice(0, -1));
    try {
      const inverse = await applyReorderSnapshot(last);
      setRedoStack([...redoStackRef.current, inverse].slice(-20));
      toast.success('Ultima modifica annullata');
    } catch {
      toast.error('Impossibile annullare: permesso negato o errore di rete');
      setUndoStack([...undoStackRef.current, last]);
    }
  }, [isAdmin, applyReorderSnapshot, setUndoStack, setRedoStack]);

  // Redo last undone reorder operation.
  const handleRedoReorder = useCallback(async () => {
    if (!isAdmin) return;
    const stack = redoStackRef.current;
    if (stack.length === 0) return;
    const last = stack[stack.length - 1];
    setRedoStack(stack.slice(0, -1));
    try {
      const inverse = await applyReorderSnapshot(last);
      setUndoStack([...undoStackRef.current, inverse].slice(-20));
      toast.success('Modifica ripetuta');
    } catch {
      toast.error('Impossibile ripetere: permesso negato o errore di rete');
      setRedoStack([...redoStackRef.current, last]);
    }
  }, [isAdmin, applyReorderSnapshot, setUndoStack, setRedoStack]);

  const handleSave = useCallback(async () => {
    if (!expandedTile) return;
    let resolvedKey: string | null = null;
    const titleInput = draftKeyword.trim();

    try {
      if (titleInput) {
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
          const { error: insErr } = await supabase.from('strati_concepts').insert(newConcept);
          if (insErr) throw insErr;
          setConceptsMap((prev) => ({ ...prev, [key]: newConcept }));
          resolvedKey = key;
        }
      }

      const { error } = await supabase.from('strati_overrides').upsert(
        {
          tile_id: expandedTile.id,
          description: draftDescription,
          concept_key: resolvedKey,
          image_scale: draftScale,
          image_pos_x: draftPosX,
          image_pos_y: draftPosY,
          col_span: expandedTile.kind === 'image' ? draftColSpan : null,
          row_span: expandedTile.kind === 'image' ? draftRowSpan : null,
        } as any,
        { onConflict: 'tile_id' },
      );
      if (error) throw error;
      setOverrides((prev) => ({
        ...prev,
        [expandedTile.id]: {
          ...(prev[expandedTile.id] ?? {}),
          description: draftDescription,
          conceptKey: resolvedKey,
          imageScale: draftScale,
          imagePosX: draftPosX,
          imagePosY: draftPosY,
          colSpan: expandedTile.kind === 'image' ? draftColSpan : null,
          rowSpan: expandedTile.kind === 'image' ? draftRowSpan : null,
        },
      }));
      setExpandedTile((prev) => (prev ? { ...prev, conceptKey: resolvedKey ?? undefined } : prev));
      setSavedFlash(true);
      toast.success('Modifiche salvate');
      setTimeout(() => setSavedFlash(false), 1600);
    } catch (e: any) {
      toast.error(e?.message || 'Salvataggio fallito (permessi admin?)');
    }
  }, [expandedTile, draftDescription, draftKeyword, draftScale, draftPosX, draftPosY, draftColSpan, draftRowSpan, conceptsMap]);

  // For text-tile lightbox: edit keyword (title) + phrase.
  const handleSaveTextTile = useCallback(async () => {
    if (!expandedTile || expandedTile.kind !== 'text' || !expandedTile.conceptKey) return;
    const key = expandedTile.conceptKey;
    const titleInput = draftKeyword.trim();
    const newTitle = titleInput ? titleInput.toUpperCase() : conceptsMap[key]?.title ?? key;
    try {
      const { error } = await supabase.from('strati_concepts').upsert(
        { key, title: newTitle, phrase: draftDescription },
        { onConflict: 'key' },
      );
      if (error) throw error;
      setConceptsMap((prev) => ({ ...prev, [key]: { key, title: newTitle, phrase: draftDescription } }));
      setSavedFlash(true);
      toast.success(`Keyword "${newTitle}" salvata`);
      setTimeout(() => setSavedFlash(false), 1600);
    } catch (e: any) {
      toast.error(e?.message || 'Salvataggio fallito (permessi admin?)');
    }
  }, [expandedTile, draftDescription, draftKeyword, conceptsMap]);

  const persistTileFraming = useCallback(async (tileId: string, scale: number, posX: number, posY: number) => {
    if (!realAdmin) return;
    const { error } = await supabase.from('strati_overrides').upsert(
      {
        tile_id: tileId,
        image_scale: scale,
        image_pos_x: posX,
        image_pos_y: posY,
      } as any,
      { onConflict: 'tile_id' },
    );
    if (error) throw error;
  }, [realAdmin]);

  // Admin: quick inline image scale (+/-) directly on the tile.
  const handleAdjustTileScale = useCallback(async (tileId: string, delta: number) => {
    if (!isAdmin) return;
    const ov = overrides[tileId];
    const current = ov?.imageScale ?? 1;
    const next = clampNumber(roundTo(current + delta), MIN_IMAGE_SCALE, MAX_IMAGE_SCALE);
    if (next === current) return;
    const posX = ov?.imagePosX ?? 50;
    const posY = ov?.imagePosY ?? 50;
    // Optimistic update
    setOverrides((prev) => ({
      ...prev,
      [tileId]: { ...(prev[tileId] ?? { description: '' }), imageScale: next },
    }));
    try {
      await persistTileFraming(tileId, next, posX, posY);
    } catch (e: any) {
      // Revert
      setOverrides((prev) => ({
        ...prev,
        [tileId]: { ...(prev[tileId] ?? { description: '' }), imageScale: current },
      }));
      toast.error(e?.message || 'Permesso negato: solo l\'admin reale può salvare lo zoom');
    }
  }, [isAdmin, overrides, persistTileFraming]);

  // Admin: nudge image position inside tile (pan from main grid).
  const handleNudgeTilePosition = useCallback(async (tileId: string, dx: number, dy: number) => {
    if (!isAdmin) return;
    const ov = overrides[tileId];
    const curX = ov?.imagePosX ?? 50;
    const curY = ov?.imagePosY ?? 50;
    const nextX = clampNumber(Math.round(curX + dx), 0, 100);
    const nextY = clampNumber(Math.round(curY + dy), 0, 100);
    if (nextX === curX && nextY === curY) return;
    const scale = ov?.imageScale ?? 1;
    setOverrides((prev) => ({
      ...prev,
      [tileId]: { ...(prev[tileId] ?? { description: '' }), imagePosX: nextX, imagePosY: nextY },
    }));
    try {
      await persistTileFraming(tileId, scale, nextX, nextY);
    } catch (e: any) {
      setOverrides((prev) => ({
        ...prev,
        [tileId]: { ...(prev[tileId] ?? { description: '' }), imagePosX: curX, imagePosY: curY },
      }));
      toast.error(e?.message || 'Permesso negato: solo l\'admin reale può salvare la posizione');
    }
  }, [isAdmin, overrides, persistTileFraming]);

  const handleTilePanStart = useCallback((event: React.PointerEvent<HTMLDivElement>, tileId: string) => {
    if (!isAdmin) return;
    if ((event.target as HTMLElement).closest('[data-tile-controls="true"]')) return;
    event.stopPropagation();

    const originX = event.clientX;
    const originY = event.clientY;
    const ov = overrides[tileId];
    const startX = ov?.imagePosX ?? 50;
    const startY = ov?.imagePosY ?? 50;
    const scale = ov?.imageScale ?? 1;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    let latestX = startX;
    let latestY = startY;
    let moved = false;
    setPanningTileId(tileId);
    el.setPointerCapture(event.pointerId);

    const updatePosition = (clientX: number, clientY: number) => {
      const dxPercent = ((clientX - originX) / Math.max(rect.width, 1)) * 100;
      const dyPercent = ((clientY - originY) / Math.max(rect.height, 1)) * 100;
      latestX = clampNumber(roundTo(startX - dxPercent, 1), 0, 100);
      latestY = clampNumber(roundTo(startY - dyPercent, 1), 0, 100);
      moved = moved || Math.abs(clientX - originX) > 3 || Math.abs(clientY - originY) > 3;
      setOverrides((prev) => ({
        ...prev,
        [tileId]: { ...(prev[tileId] ?? { description: '' }), imagePosX: latestX, imagePosY: latestY },
      }));
    };

    const move = (ev: PointerEvent) => updatePosition(ev.clientX, ev.clientY);
    const end = async (ev: PointerEvent) => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', end);
      el.removeEventListener('pointercancel', end);
      try { el.releasePointerCapture(ev.pointerId); } catch {}
      setPanningTileId(null);
      if (moved) suppressTileClickRef.current = true;
      if (!moved || !realAdmin) return;
      try {
        await persistTileFraming(tileId, scale, latestX, latestY);
      } catch (e: any) {
        setOverrides((prev) => ({
          ...prev,
          [tileId]: { ...(prev[tileId] ?? { description: '' }), imagePosX: startX, imagePosY: startY },
        }));
        toast.error(e?.message || 'Permesso negato: solo l\'admin reale può salvare la posizione');
      }
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }, [isAdmin, overrides, persistTileFraming, realAdmin]);

  // ── Admin: tile delete / replace cover / add ──
  const isCustomTile = useCallback(
    (id: string) => customTiles.some((c) => c.id === id),
    [customTiles],
  );

  const handleDeleteTile = useCallback(async () => {
    if (!isAdmin || !expandedTile || expandedTile.kind !== 'image') return;
    const id = expandedTile.id;
    try {
      if (isCustomTile(id)) {
        // Remove from custom_tiles entirely.
        const { error } = await (supabase.from('strati_custom_tiles' as any) as any).delete().eq('id', id);
        if (error) throw error;
        setCustomTiles((prev) => prev.filter((t) => t.id !== id));
      } else {
        // Hide the source tile via override.
        const { error } = await supabase.from('strati_overrides').upsert(
          { tile_id: id, hidden: true } as any,
          { onConflict: 'tile_id' },
        );
        if (error) throw error;
        setOverrides((prev) => ({ ...prev, [id]: { ...(prev[id] ?? { description: '' }), hidden: true } }));
      }
      toast.success('Tassello eliminato');
      setExpandedTile(null);
    } catch (e: any) {
      toast.error(e?.message || 'Eliminazione fallita');
    }
  }, [isAdmin, expandedTile, isCustomTile]);

  const handleRestoreTile = useCallback(async () => {
    if (!isAdmin || !expandedTile || expandedTile.kind !== 'image') return;
    const id = expandedTile.id;
    try {
      const { error } = await supabase.from('strati_overrides').upsert(
        { tile_id: id, hidden: false } as any,
        { onConflict: 'tile_id' },
      );
      if (error) throw error;
      setOverrides((prev) => ({ ...prev, [id]: { ...(prev[id] ?? { description: '' }), hidden: false } }));
      toast.success('Tassello ripristinato');
    } catch (e: any) {
      toast.error(e?.message || 'Ripristino fallito');
    }
  }, [isAdmin, expandedTile]);

  const handleReplaceCoverFile = useCallback(async (file: File) => {
    if (!isAdmin || !expandedTile || expandedTile.kind !== 'image') return;
    const id = expandedTile.id;
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const path = `tiles/${id}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('strati').upload(path, file, {
        cacheControl: '3600', upsert: true, contentType: file.type,
      });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from('strati').getPublicUrl(path);
      const url = pub.publicUrl;
      if (isCustomTile(id)) {
        const { error } = await (supabase.from('strati_custom_tiles' as any) as any)
          .update({ cover_url: url }).eq('id', id);
        if (error) throw error;
        setCustomTiles((prev) => prev.map((t) => (t.id === id ? { ...t, cover_url: url } : t)));
      } else {
        const { error } = await supabase.from('strati_overrides').upsert(
          { tile_id: id, cover_url: url } as any,
          { onConflict: 'tile_id' },
        );
        if (error) throw error;
        setOverrides((prev) => ({ ...prev, [id]: { ...(prev[id] ?? { description: '' }), coverUrl: url } }));
      }
      setExpandedTile((prev) => (prev ? { ...prev, src: url } : prev));
      toast.success('Immagine sostituita');
    } catch (e: any) {
      toast.error(e?.message || 'Caricamento fallito');
    }
  }, [isAdmin, expandedTile, isCustomTile]);

  const handleAddTile = useCallback(async (file: File) => {
    if (!isAdmin) return;
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const path = `tiles/new-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('strati').upload(path, file, {
        cacheControl: '3600', upsert: false, contentType: file.type,
      });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from('strati').getPublicUrl(path);
      const url = pub.publicUrl;
      const nextPos = orderedImageSources.length;
      const { data, error } = await (supabase.from('strati_custom_tiles' as any) as any)
        .insert({ cover_url: url, alt: '', position: nextPos }).select().single();
      if (error) throw error;
      setCustomTiles((prev) => [...prev, {
        id: (data as any).id,
        cover_url: (data as any).cover_url,
        alt: (data as any).alt ?? '',
        position: (data as any).position ?? null,
        hidden: !!(data as any).hidden,
      }]);
      toast.success('Tassello aggiunto');
    } catch (e: any) {
      toast.error(e?.message || 'Aggiunta fallita');
    }
  }, [isAdmin, orderedImageSources.length]);

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
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/30 bg-background font-body text-[10px] uppercase tracking-[0.2em] text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                Admin · trascina per riordinare · click per modificare/eliminare/sostituire
              </div>
              <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/40 bg-foreground text-background font-body text-[10px] uppercase tracking-[0.2em] cursor-pointer hover:bg-foreground/90 transition">
                + Aggiungi tassello immagine
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleAddTile(f);
                    e.currentTarget.value = '';
                  }}
                />
              </label>
              <button
                type="button"
                onClick={handleUndoReorder}
                disabled={undoCount === 0}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/40 bg-background text-foreground font-body text-[10px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-background disabled:hover:text-foreground"
                title={undoCount === 0 ? 'Nessuna modifica da annullare' : `Annulla ultima modifica (${undoCount} disponibili)`}
              >
                ↶ Annulla ultimo riordino{undoCount > 0 ? ` (${undoCount})` : ''}
              </button>
              <button
                type="button"
                onClick={handleRedoReorder}
                disabled={redoCount === 0}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/40 bg-background text-foreground font-body text-[10px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-background disabled:hover:text-foreground"
                title={redoCount === 0 ? 'Nessuna modifica da ripetere' : `Ripeti ultima modifica annullata (${redoCount} disponibili)`}
              >
                ↷ Ripeti ultimo riordino{redoCount > 0 ? ` (${redoCount})` : ''}
              </button>
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
              const isHidden = tile.kind === 'image' && hiddenIdSet.has(tile.id);
              return (
              <motion.div
                  key={tile.id}
                  className={`relative overflow-hidden rounded-sm group ${isAdmin && !isText ? 'cursor-grab active:cursor-grabbing touch-none' : isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${
                    isText ? 'bg-background border border-border/40' : 'bg-card'
                  } ${isAdmin && panningTileId === tile.id ? 'ring-1 ring-foreground/40' : ''} ${isAdmin && dragId && dragId !== tile.id ? 'ring-1 ring-foreground/20' : ''} ${isAdmin && dragId === tile.id ? 'opacity-60' : ''} ${isHidden ? 'opacity-30 ring-1 ring-destructive/60' : ''}`}
                  style={{
                    gridColumn: `span ${tile.colSpan}`,
                    gridRow: `span ${tile.rowSpan}`,
                  }}
                  draggable={isAdmin && isText}
                  onPointerDown={(e) => {
                    if (tile.kind === 'image') handleTilePanStart(e, tile.id);
                  }}
                  onDragStart={((e: React.DragEvent<HTMLDivElement>) => {
                    if (!isAdmin) return;
                    setDragId(tile.id);
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', tile.id);
                  }) as any}
                  onDragEnd={(() => setDragId(null)) as any}
                  onDragOver={((e: React.DragEvent<HTMLDivElement>) => {
                    if (!isAdmin || !dragId) return;
                    // Allow same-kind reordering AND cross-kind (image ↔ text) anchoring.
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
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
                  onClick={() => {
                    if (suppressTileClickRef.current) {
                      suppressTileClickRef.current = false;
                      return;
                    }
                    if (!dragId) openTile(tile);
                  }}
                  onMouseEnter={() => !isText && concept && setActiveTile(tile.id)}
                  onMouseLeave={() => !isText && concept && setActiveTile((prev) => (prev === tile.id ? null : prev))}
                  whileHover={isText || isAdmin ? undefined : { scale: 1.015 }}
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

                  {isAdmin && !isText && tile.cover && (
                    <div
                      data-tile-controls="true"
                      className="absolute top-1 right-1 z-20 flex flex-col items-end gap-1"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      draggable={false}
                      onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    >
                      <div className="rounded-sm bg-background/90 backdrop-blur-sm border border-border px-1 py-0.5">
                        <span
                          role="button"
                          tabIndex={0}
                          draggable
                          onPointerDown={(e) => e.stopPropagation()}
                          onDragStart={(e) => {
                            e.stopPropagation();
                            setDragId(tile.id);
                            e.dataTransfer.effectAllowed = 'move';
                            e.dataTransfer.setData('text/plain', tile.id);
                          }}
                          onDragEnd={() => setDragId(null)}
                          className="block px-1.5 font-body text-xs leading-none text-foreground hover:text-muted-foreground cursor-grab active:cursor-grabbing"
                          aria-label="Trascina per riordinare tassello"
                          title="Trascina per riordinare"
                        >
                          ↕
                        </span>
                      </div>
                      <div className="flex items-center gap-1 rounded-sm bg-background/90 backdrop-blur-sm border border-border px-1 py-0.5">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleAdjustTileScale(tile.id, -0.1); }}
                          className="px-1.5 font-body text-xs leading-none text-foreground hover:text-muted-foreground"
                          aria-label="Riduci zoom immagine"
                          title="Zoom out"
                        >
                          −
                        </button>
                        <span className="font-body text-[10px] tabular-nums text-muted-foreground min-w-[28px] text-center">
                          {Math.round((tile.imageScale ?? 1) * 100)}%
                        </span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleAdjustTileScale(tile.id, 0.1); }}
                          className="px-1.5 font-body text-xs leading-none text-foreground hover:text-muted-foreground"
                          aria-label="Aumenta zoom immagine"
                          title="Zoom in"
                        >
                          +
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-0.5 rounded-sm bg-background/90 backdrop-blur-sm border border-border p-0.5">
                        <span />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleNudgeTilePosition(tile.id, 0, -5); }}
                          className="px-1.5 font-body text-xs leading-none text-foreground hover:text-muted-foreground"
                          aria-label="Sposta immagine in alto"
                          title="Sposta su"
                        >↑</button>
                        <span />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleNudgeTilePosition(tile.id, -5, 0); }}
                          className="px-1.5 font-body text-xs leading-none text-foreground hover:text-muted-foreground"
                          aria-label="Sposta immagine a sinistra"
                          title="Sposta sinistra"
                        >←</button>
                        <span className="font-body text-[9px] tabular-nums text-muted-foreground text-center leading-none flex items-center justify-center">
                          {tile.imagePosX ?? 50}/{tile.imagePosY ?? 50}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleNudgeTilePosition(tile.id, 5, 0); }}
                          className="px-1.5 font-body text-xs leading-none text-foreground hover:text-muted-foreground"
                          aria-label="Sposta immagine a destra"
                          title="Sposta destra"
                        >→</button>
                        <span />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleNudgeTilePosition(tile.id, 0, 5); }}
                          className="px-1.5 font-body text-xs leading-none text-foreground hover:text-muted-foreground"
                          aria-label="Sposta immagine in basso"
                          title="Sposta giù"
                        >↓</button>
                        <span />
                      </div>
                    </div>
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
                  {expandedTile.kind === 'text' && (
                    <div className="rounded-sm border border-foreground/20 bg-foreground/5 px-3 py-2">
                      <p className="font-display text-[11px] uppercase tracking-[0.22em] text-foreground">
                        Modifica tassello-keyword
                      </p>
                      <p className="font-body text-[10px] text-muted-foreground mt-1 normal-case tracking-normal">
                        Cambia la parola e/o la frase descrittiva, poi premi <strong>Salva</strong>.
                      </p>
                    </div>
                  )}

                  {/* Keyword field — editable + datalist of existing concepts */}
                  <div>
                    <label className="block font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      {expandedTile.kind === 'text' ? 'Parola (Keyword)' : 'Keyword associata'}
                    </label>
                    <input
                      type="text"
                      list="strati-keywords"
                      value={draftKeyword}
                      onChange={(e) => setDraftKeyword(e.target.value)}
                      placeholder="Scegli o scrivi una keyword (es. POROSITÀ)"
                      className="w-full rounded-sm border border-border bg-background px-3 py-2 font-body text-sm md:text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/40"
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

                  {/* Tile size — admin can make image span more columns/rows */}
                  {expandedTile.kind === 'image' && (
                    <div className="grid gap-2">
                      <label className="block font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Dimensione tassello
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className="flex flex-col gap-1 font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          Colonne ({draftColSpan})
                          <input
                            type="range" min={1} max={cols} step={1}
                            value={draftColSpan}
                            onChange={(e) => setDraftColSpan(parseInt(e.target.value, 10))}
                          />
                        </label>
                        <label className="flex flex-col gap-1 font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          Righe ({draftRowSpan})
                          <input
                            type="range" min={1} max={4} step={1}
                            value={draftRowSpan}
                            onChange={(e) => setDraftRowSpan(parseInt(e.target.value, 10))}
                          />
                        </label>
                      </div>
                      <p className="font-body text-[10px] text-muted-foreground/80 normal-case tracking-normal -mt-1">
                        Aumenta colonne/righe per ingrandire l'immagine nella griglia. Salva per applicare.
                      </p>
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

                  {expandedTile.kind === 'image' && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50">
                      <label className="px-3 py-1.5 rounded-sm border border-border bg-background text-foreground font-body text-[11px] uppercase tracking-[0.18em] hover:bg-muted transition cursor-pointer">
                        Sostituisci immagine
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleReplaceCoverFile(f);
                            e.currentTarget.value = '';
                          }}
                        />
                      </label>
                      {hiddenIdSet.has(expandedTile.id) ? (
                        <button
                          type="button"
                          onClick={handleRestoreTile}
                          className="px-3 py-1.5 rounded-sm border border-border bg-background text-foreground font-body text-[11px] uppercase tracking-[0.18em] hover:bg-muted transition"
                        >
                          Ripristina tassello
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Eliminare questo tassello?')) handleDeleteTile();
                          }}
                          className="px-3 py-1.5 rounded-sm border border-destructive/60 bg-background text-destructive font-body text-[11px] uppercase tracking-[0.18em] hover:bg-destructive hover:text-destructive-foreground transition"
                        >
                          Elimina tassello
                        </button>
                      )}
                    </div>
                  )}

                  <div className="mt-1 flex items-center justify-end gap-3">
                    {savedFlash && (
                      <span className="font-body text-[11px] text-muted-foreground">Salvato</span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setDraftKeyword(originalKeyword);
                        setDraftDescription(originalDescription);
                        toast('Modifiche annullate', { description: 'Keyword e frase ripristinate' });
                      }}
                      disabled={draftKeyword === originalKeyword && draftDescription === originalDescription}
                      className="px-4 py-1.5 rounded-sm border border-border bg-background text-foreground font-body text-[11px] md:text-xs uppercase tracking-[0.18em] hover:bg-muted transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Annulla
                    </button>
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
