import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

import origine1 from "@/assets/portfolio/origine-1.jpg";
import origine2 from "@/assets/portfolio/origine-2.jpg";
import origine3 from "@/assets/portfolio/origine-3.jpg";
import origine4 from "@/assets/portfolio/origine-4.png";
import origine5 from "@/assets/portfolio/origine-5.png";
import stratiModel1 from "@/assets/portfolio/strati-model-1.png";
import stratiRender1 from "@/assets/portfolio/strati-render-1.png";
import stratiAerial1 from "@/assets/portfolio/strati-aerial-1.png";
import stratiAerial2 from "@/assets/portfolio/strati-aerial-2.png";
import stratiSketch1 from "@/assets/portfolio/strati-sketch-1.png";
import stratiUrban1 from "@/assets/portfolio/strati-urban-1.png";
import stratiRender3 from "@/assets/portfolio/strati-render-3.png";
import stratiTopo1 from "@/assets/portfolio/strati-topo-1.png";
import stratiTopo2 from "@/assets/portfolio/strati-topo-2.png";
import stratiRender4 from "@/assets/portfolio/strati-render-4.png";

// ─────────────────────────────────────────────────────────────
// CONCEPT REGISTRY — easily editable archive
// ─────────────────────────────────────────────────────────────
type ConceptKey =
  | 'innestare'
  | 'piegare'
  | 'dissolvere'
  | 'porosita'
  | 'stratificare'
  | 'mat-building';

interface Concept {
  title: string;
  phrase: string;
}

const concepts: Record<ConceptKey, Concept> = {
  innestare:     { title: 'INNESTARE',     phrase: 'Abitare una condizione esistente senza cancellarne la memoria.' },
  piegare:       { title: 'PIEGARE',       phrase: 'Trasformare il paesaggio in spazio attraversabile.' },
  dissolvere:    { title: 'DISSOLVERE',    phrase: 'Superare il limite tra figura, infrastruttura e paesaggio.' },
  porosita:      { title: 'POROSITÀ',      phrase: 'Aprire il costruito a flussi ecologici, sociali e visivi.' },
  stratificare:  { title: 'STRATIFICARE',  phrase: 'Far emergere il tempo attraverso materia e territorio.' },
  'mat-building':{ title: 'MAT-BUILDING',  phrase: 'Costruire continuità attraverso densità, ripetizione e relazione.' },
};

// ─────────────────────────────────────────────────────────────
// SOURCE TILES — declare only image + concept; spans are computed.
// ─────────────────────────────────────────────────────────────
interface SourceTile {
  id: string;
  cover: string;
  alt: string;
  concept?: ConceptKey;
  /** Optional descriptive text shown in the lightbox for this image. */
  description?: string;
}

// Order is intentional: alternate orientations and keep tiles that share
// a concept far apart, so the mosaic feels varied and never repetitive.
const sourceTiles: SourceTile[] = [
  { id: 'piega',       cover: origine1,      alt: 'Schema concettuale della piega — ricerca tipologica', concept: 'piegare' },
  { id: 'tessuto',     cover: stratiAerial1, alt: 'Vista aerea del tessuto urbano',                      concept: 'mat-building' },
  { id: 'materia',     cover: origine4,      alt: 'Modello fisico — studio della materia' },
  { id: 'innesto',     cover: origine3,      alt: 'Disegno planimetrico — innesto urbano',               concept: 'innestare' },
  { id: 'topografia',  cover: stratiTopo1,   alt: 'Pianta topografica del sito di progetto',             concept: 'stratificare' },
  { id: 'chiaroscuro', cover: origine2,      alt: 'Studio chiaroscurale di volumi architettonici' },
  { id: 'porto',       cover: stratiAerial2, alt: 'Vista aerea area portuale — masterplan',              concept: 'porosita' },
  { id: 'segno',       cover: stratiSketch1, alt: 'Schizzo di progetto — segno fondativo' },
  { id: 'waterfront',  cover: stratiRender1, alt: 'Render waterfront e fronte urbano',                   concept: 'dissolvere' },
  { id: 'quartiere',   cover: stratiModel1,  alt: 'Modello di studio quartiere residenziale',            concept: 'mat-building' },
  { id: 'continuita',  cover: origine5,      alt: 'Modello volumetrico — studio di continuità' },
  { id: 'facciata',    cover: stratiRender3, alt: 'Render — studio di facciata residenziale',            concept: 'innestare' },
  { id: 'topografia2', cover: stratiTopo2,   alt: 'Pianta topografica — variante di progetto',           concept: 'stratificare' },
  { id: 'nodo',        cover: stratiUrban1,  alt: 'Schema urbano — nodo infrastrutturale',               concept: 'porosita' },
  { id: 'orizzonte',   cover: stratiRender4, alt: 'Render prospettico — orizzonte urbano',               concept: 'dissolvere' },
];

// Maximum number of text tiles in the mosaic (concepts shown as words).
// Includes both explicit and filler tiles. Keeps the grid image-dominant.
const MAX_TEXT_TILES = 5;

type Orientation = 'portrait' | 'landscape' | 'square';

interface LayoutTile {
  id: string;
  kind: 'image' | 'text';
  cover?: string;
  alt?: string;
  description?: string;
  colSpan: number;
  rowSpan: number;
  concept?: ConceptKey;
}

// Span rules per orientation per breakpoint (cols)
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

// Greedy 2D packing onto a `cols`-wide grid, plus:
// - cap text tiles to MAX_TEXT_TILES, spread evenly
// - absorb remaining empty cells into adjacent image tiles
function packAndFill(
  imageTiles: LayoutTile[],
  cols: number,
): { tiles: LayoutTile[]; rows: number } {
  // owner[r][c] = index into `placed` (or -1 if empty)
  const owner: number[][] = [];
  const placed: { tile: LayoutTile; r: number; c: number }[] = [];

  const ensureRow = (r: number) => {
    while (owner.length <= r) owner.push(new Array(cols).fill(-1));
  };
  const fits = (r: number, c: number, cs: number, rs: number) => {
    if (c + cs > cols) return false;
    for (let i = 0; i < rs; i++) {
      ensureRow(r + i);
      for (let j = 0; j < cs; j++) {
        if (owner[r + i][c + j] !== -1) return false;
      }
    }
    return true;
  };
  const stamp = (r: number, c: number, cs: number, rs: number, idx: number) => {
    for (let i = 0; i < rs; i++) {
      ensureRow(r + i);
      for (let j = 0; j < cs; j++) owner[r + i][c + j] = idx;
    }
  };
  const findSlot = (cs: number, rs: number): [number, number] => {
    for (let r = 0; ; r++) {
      ensureRow(r);
      for (let c = 0; c <= cols - cs; c++) {
        if (fits(r, c, cs, rs)) return [r, c];
      }
    }
  };

  for (const t of imageTiles) {
    const [r, c] = findSlot(t.colSpan, t.rowSpan);
    const idx = placed.length;
    placed.push({ tile: t, r, c });
    stamp(r, c, t.colSpan, t.rowSpan, idx);
  }

  // Trim trailing fully-empty rows
  while (owner.length && owner[owner.length - 1].every((v) => v === -1)) {
    owner.pop();
  }
  if (owner.length === 0) return { tiles: imageTiles, rows: 0 };

  // Collect empty cells
  const empties: { r: number; c: number }[] = [];
  for (let r = 0; r < owner.length; r++) {
    for (let c = 0; c < cols; c++) {
      if (owner[r][c] === -1) empties.push({ r, c });
    }
  }

  // Pick up to MAX_TEXT_TILES empty cells, spread evenly across the list
  const textCount = Math.min(MAX_TEXT_TILES, empties.length);
  const chosen = new Set<number>();
  if (textCount > 0) {
    for (let i = 0; i < textCount; i++) {
      const idx = Math.floor((i + 0.5) * (empties.length / textCount));
      chosen.add(idx);
    }
  }

  const conceptKeys = Object.keys(concepts) as ConceptKey[];
  const fillers: LayoutTile[] = [];
  let conceptIdx = 0;
  empties.forEach((cell, i) => {
    if (!chosen.has(i)) return;
    const concept = conceptKeys[conceptIdx % conceptKeys.length];
    conceptIdx++;
    const idx = placed.length + fillers.length;
    fillers.push({
      id: `text-filler-${cell.r}-${cell.c}`,
      kind: 'text',
      colSpan: 1,
      rowSpan: 1,
      concept,
    });
    owner[cell.r][cell.c] = idx;
  });

  // Absorb remaining empties into a neighboring image tile by extending its span,
  // but only when the extension stays inside the grid AND covers only empty cells.
  const tryExtend = (cell: { r: number; c: number }): boolean => {
    // try extending a neighbor right→left, left→right, down, up
    const candidates: { ownerIdx: number; newCs?: number; newRs?: number }[] = [];

    // left neighbor (extend its colSpan to the right by 1, but only if cell is exactly to the right of its right edge)
    if (cell.c > 0 && owner[cell.r][cell.c - 1] !== -1) {
      const oi = owner[cell.r][cell.c - 1];
      const p = placed[oi];
      if (p && p.tile.kind === 'image' && p.r <= cell.r && cell.r < p.r + p.tile.rowSpan && p.c + p.tile.colSpan === cell.c) {
        // ensure all rows in p's rowspan at column cell.c are empty
        let ok = true;
        for (let i = 0; i < p.tile.rowSpan; i++) if (owner[p.r + i]?.[cell.c] !== -1) { ok = false; break; }
        if (ok) candidates.push({ ownerIdx: oi, newCs: p.tile.colSpan + 1 });
      }
    }
    // top neighbor
    if (cell.r > 0 && owner[cell.r - 1][cell.c] !== -1) {
      const oi = owner[cell.r - 1][cell.c];
      const p = placed[oi];
      if (p && p.tile.kind === 'image' && p.c <= cell.c && cell.c < p.c + p.tile.colSpan && p.r + p.tile.rowSpan === cell.r) {
        let ok = true;
        for (let j = 0; j < p.tile.colSpan; j++) if (owner[cell.r]?.[p.c + j] !== -1) { ok = false; break; }
        if (ok) candidates.push({ ownerIdx: oi, newRs: p.tile.rowSpan + 1 });
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

  // Iterate (multiple passes) to absorb leftover empties
  for (let pass = 0; pass < 4; pass++) {
    let changed = false;
    for (let r = 0; r < owner.length; r++) {
      for (let c = 0; c < cols; c++) {
        if (owner[r][c] === -1) {
          if (tryExtend({ r, c })) changed = true;
        }
      }
    }
    if (!changed) break;
  }

  return { tiles: [...placed.map((p) => p.tile), ...fillers], rows: owner.length };
}

// Tailwind breakpoints used: <768 = 3 cols, <1024 = 5 cols, ≥1024 = 6 cols
function colsForWidth(w: number): number {
  if (w >= 1024) return 6;
  if (w >= 768) return 5;
  return 3;
}

const Strati = () => {
  const { t } = useLanguage();
  const [expandedTile, setExpandedTile] = useState<{ src: string; alt: string; concept?: ConceptKey; description?: string } | null>(null);
  const [activeTile, setActiveTile] = useState<string | null>(null);

  // ── Measure natural orientation of every image once ──
  const [orientations, setOrientations] = useState<Record<string, Orientation>>({});
  useEffect(() => {
    let cancelled = false;
    sourceTiles.forEach((t) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setOrientations((prev) =>
          prev[t.id] ? prev : { ...prev, [t.id]: classify(img.naturalWidth, img.naturalHeight) },
        );
      };
      img.src = t.cover;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Track current breakpoint (cols) ──
  const [cols, setCols] = useState<number>(() =>
    typeof window === 'undefined' ? 6 : colsForWidth(window.innerWidth),
  );
  useEffect(() => {
    const onResize = () => setCols(colsForWidth(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── Compute layout: assign spans, pack images, then add text tiles in empties ──
  const layout = useMemo(() => {
    const tiles: LayoutTile[] = sourceTiles.map((t) => {
      const o = orientations[t.id] ?? 'square';
      const { c, r } = spansFor(o, cols);
      return {
        id: t.id,
        kind: 'image' as const,
        cover: t.cover,
        alt: t.alt,
        description: t.description,
        concept: t.concept,
        colSpan: c,
        rowSpan: r,
      };
    });
    return packAndFill(tiles, cols);
  }, [orientations, cols]);

  const openImage = useCallback(
    (tile: LayoutTile) =>
      setExpandedTile({
        src: tile.cover!,
        alt: tile.alt ?? '',
        concept: tile.concept,
        description: tile.description,
      }),
    [],
  );
  const closeImage = useCallback(() => setExpandedTile(null), []);

  const gridColsClass =
    cols === 6 ? 'grid-cols-6' : cols === 5 ? 'grid-cols-5' : 'grid-cols-3';

  return (
    <section id="strati" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide mb-4 text-center">
              {t('strati.heading')}
            </h2>
          </div>

          {/* Text block */}
          <div className="space-y-4 font-body text-sm md:text-base text-foreground leading-[1.6] mb-12 md:mb-16">
            <p>{t('strati.text')}</p>
          </div>

          {/* Mosaic Grid — auto-computed spans + filler text tiles → perfect rectangle */}
          <div
            className={`grid ${gridColsClass} auto-rows-[90px] md:auto-rows-[110px] lg:auto-rows-[120px] gap-1 md:gap-2 lg:gap-2.5`}
            style={{ gridAutoFlow: 'dense' }}
          >
            {layout.tiles.map((tile) => {
              const concept = tile.concept ? concepts[tile.concept] : undefined;
              const isActive = activeTile === tile.id;
              const isText = tile.kind === 'text';
              return (
                <motion.div
                  key={tile.id}
                  className={`relative overflow-hidden rounded-sm group ${
                    isText ? 'bg-background cursor-default' : 'cursor-pointer'
                  }`}
                  style={{
                    gridColumn: `span ${tile.colSpan}`,
                    gridRow: `span ${tile.rowSpan}`,
                  }}
                  onClick={() => {
                    if (isText) return;
                    if (tile.cover) openImage(tile);
                  }}
                  onMouseEnter={() => !isText && concept && setActiveTile(tile.id)}
                  onMouseLeave={() => !isText && concept && setActiveTile((prev) => (prev === tile.id ? null : prev))}
                  whileHover={isText ? undefined : { scale: 1.015 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {!isText && tile.cover && (
                    <img
                      src={tile.cover}
                      alt={tile.alt ?? ''}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {isText && concept && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 md:px-5">
                      <span className="font-display font-light tracking-[0.18em] text-foreground text-[11px] md:text-sm lg:text-base leading-tight">
                        {concept.title}
                      </span>
                      <span className="font-body font-light text-foreground/70 text-[9px] md:text-[11px] lg:text-xs leading-snug mt-2 md:mt-3 max-w-[92%] hidden md:block">
                        {concept.phrase}
                      </span>
                    </div>
                  )}

                  {!isText && concept && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-background/35 pointer-events-none"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            key="concept"
                            className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 md:px-6 pointer-events-none"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
                          >
                            <span className="font-display font-light tracking-[0.18em] text-foreground text-[11px] md:text-sm lg:text-base leading-tight">
                              {concept.title}
                            </span>
                            <span className="font-body font-light text-foreground/80 text-[9px] md:text-[11px] lg:text-xs leading-snug mt-2 md:mt-3 max-w-[90%] hidden md:block">
                              {concept.phrase}
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
            className="fixed inset-0 z-50 bg-background/95 flex flex-col items-center justify-center p-6"
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
            <motion.img
              src={expandedTile.src}
              alt={expandedTile.alt}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              className="max-w-[90vw] max-h-[78vh] object-contain select-none"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            />
            <motion.div
              className="mt-6 max-w-xl text-center px-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {expandedTile.concept && (
                <div className="font-display tracking-[0.18em] text-foreground text-sm md:text-base mb-2">
                  {concepts[expandedTile.concept].title}
                </div>
              )}
              {expandedTile.concept && (
                <div className="font-body font-light text-foreground/80 text-xs md:text-sm leading-relaxed mb-2">
                  {concepts[expandedTile.concept].phrase}
                </div>
              )}
              {expandedTile.description && (
                <div className="font-body font-light text-foreground/80 text-xs md:text-sm leading-relaxed whitespace-pre-line mb-2">
                  {expandedTile.description}
                </div>
              )}
              {expandedTile.alt && (
                <div className="font-body font-light text-muted-foreground text-[11px] md:text-xs leading-snug">
                  {expandedTile.alt}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Strati;
