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
}

const sourceTiles: SourceTile[] = [
  { id: 'piega',       cover: origine1,      alt: 'Schema concettuale della piega — ricerca tipologica', concept: 'piegare' },
  { id: 'chiaroscuro', cover: origine2,      alt: 'Studio chiaroscurale di volumi architettonici' },
  { id: 'quartiere',   cover: stratiModel1,  alt: 'Modello di studio quartiere residenziale',            concept: 'mat-building' },
  { id: 'materia',     cover: origine4,      alt: 'Modello fisico — studio della materia' },
  { id: 'innesto',     cover: origine3,      alt: 'Disegno planimetrico — innesto urbano',               concept: 'innestare' },
  { id: 'waterfront',  cover: stratiRender1, alt: 'Render waterfront e fronte urbano',                   concept: 'dissolvere' },
  { id: 'tessuto',     cover: stratiAerial1, alt: 'Vista aerea del tessuto urbano',                      concept: 'mat-building' },
  { id: 'continuita',  cover: origine5,      alt: 'Modello volumetrico — studio di continuità' },
  { id: 'segno',       cover: stratiSketch1, alt: 'Schizzo di progetto — segno fondativo' },
  { id: 'porto',       cover: stratiAerial2, alt: 'Vista aerea area portuale — masterplan',              concept: 'porosita' },
  { id: 'nodo',        cover: stratiUrban1,  alt: 'Schema urbano — nodo infrastrutturale',               concept: 'porosita' },
  { id: 'topografia',  cover: stratiTopo1,   alt: 'Pianta topografica del sito di progetto',             concept: 'stratificare' },
  { id: 'topografia2', cover: stratiTopo2,   alt: 'Pianta topografica — variante di progetto',           concept: 'stratificare' },
  { id: 'facciata',    cover: stratiRender3, alt: 'Render — studio di facciata residenziale',            concept: 'innestare' },
  { id: 'orizzonte',   cover: stratiRender4, alt: 'Render prospettico — orizzonte urbano',               concept: 'dissolvere' },
];

type Orientation = 'portrait' | 'landscape' | 'square';

interface LayoutTile {
  id: string;
  kind: 'image' | 'text';
  cover?: string;
  alt?: string;
  colSpan: number;
  rowSpan: number;
  concept?: ConceptKey;
}

// Span rules per orientation per breakpoint (cols)
// Keep spans <= cols and conservative on small screens.
function spansFor(orientation: Orientation, cols: number): { c: number; r: number } {
  if (cols <= 3) {
    // mobile: keep things compact
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

// Greedy 2D packing onto a `cols`-wide grid with dense flow,
// returns total rows used.
function packAndFill(
  tiles: LayoutTile[],
  cols: number,
): { tiles: LayoutTile[]; rows: number } {
  // We simulate the grid to know which cells stay empty,
  // then add 1×1 text fillers (cycling through concepts) so the
  // final composition is always a perfect rectangle.
  const grid: boolean[][] = []; // grid[row][col] = occupied
  const ensureRow = (r: number) => {
    while (grid.length <= r) grid.push(new Array(cols).fill(false));
  };
  const fits = (r: number, c: number, cs: number, rs: number) => {
    if (c + cs > cols) return false;
    for (let i = 0; i < rs; i++) {
      ensureRow(r + i);
      for (let j = 0; j < cs; j++) {
        if (grid[r + i][c + j]) return false;
      }
    }
    return true;
  };
  const place = (r: number, c: number, cs: number, rs: number) => {
    for (let i = 0; i < rs; i++) {
      ensureRow(r + i);
      for (let j = 0; j < cs; j++) grid[r + i][c + j] = true;
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

  for (const t of tiles) {
    const [r, c] = findSlot(t.colSpan, t.rowSpan);
    place(r, c, t.colSpan, t.rowSpan);
  }

  // Fill any empty cells with 1×1 text tiles to complete the rectangle.
  const conceptKeys = Object.keys(concepts) as ConceptKey[];
  let fillerIdx = 0;
  const fillers: LayoutTile[] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < cols; c++) {
      if (!grid[r][c]) {
        const concept = conceptKeys[fillerIdx % conceptKeys.length];
        fillerIdx++;
        fillers.push({
          id: `filler-${r}-${c}`,
          kind: 'text',
          colSpan: 1,
          rowSpan: 1,
          concept,
        });
        grid[r][c] = true;
      }
    }
  }

  return { tiles: [...tiles, ...fillers], rows: grid.length };
}

// Tailwind breakpoints used: <768 = 3 cols, <1024 = 5 cols, ≥1024 = 6 cols
function colsForWidth(w: number): number {
  if (w >= 1024) return 6;
  if (w >= 768) return 5;
  return 3;
}

const Strati = () => {
  const { t } = useLanguage();
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
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

  // ── Compute layout: assign spans, pack, fill to a rectangle ──
  const layout = useMemo(() => {
    const imageTiles: LayoutTile[] = sourceTiles.map((t) => {
      const o = orientations[t.id] ?? 'square';
      const { c, r } = spansFor(o, cols);
      return {
        id: t.id,
        kind: 'image',
        cover: t.cover,
        alt: t.alt,
        concept: t.concept,
        colSpan: c,
        rowSpan: r,
      };
    });
    return packAndFill(imageTiles, cols);
  }, [orientations, cols]);

  const openImage = useCallback((src: string) => setExpandedImage(src), []);
  const closeImage = useCallback(() => setExpandedImage(null), []);

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
            className={`grid ${gridColsClass} auto-rows-[80px] md:auto-rows-[100px] gap-1 md:gap-1.5`}
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
                    if (concept) {
                      setActiveTile(isActive ? null : tile.id);
                    } else if (tile.cover) {
                      openImage(tile.cover);
                    }
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
                      className="w-full h-full object-contain bg-background select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
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
        {expandedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center"
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
              src={expandedImage}
              alt=""
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              className="max-w-[90vw] max-h-[85vh] object-contain select-none"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Strati;
