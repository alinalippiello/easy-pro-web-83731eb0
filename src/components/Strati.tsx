import { useState, useCallback } from 'react';
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
// CONCEPT REGISTRY — hover overlay on images
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
  innestare: { title: 'INNESTARE', phrase: 'Abitare una condizione esistente senza cancellarne la memoria.' },
  piegare: { title: 'PIEGARE', phrase: 'Trasformare il paesaggio in spazio attraversabile.' },
  dissolvere: { title: 'DISSOLVERE', phrase: 'Superare il limite tra figura, infrastruttura e paesaggio.' },
  porosita: { title: 'POROSITÀ', phrase: 'Aprire il costruito a flussi ecologici, sociali e visivi.' },
  stratificare: { title: 'STRATIFICARE', phrase: 'Far emergere il tempo attraverso materia e territorio.' },
  'mat-building': { title: 'MAT-BUILDING', phrase: 'Costruire continuità attraverso densità, ripetizione e relazione.' },
};

// ─────────────────────────────────────────────────────────────
// PUZZLE TILES — mix of images (varied span) and text quotes,
// arranged asymmetrically. Designed for a 6-col desktop grid
// (3-col mobile) so the outer perimeter stays rectangular.
// ─────────────────────────────────────────────────────────────
type ImageTile = {
  kind: 'image';
  id: string;
  cover: string;
  alt: string;
  colSpan: number;
  rowSpan: number;
  /** desktop-only override (md+) when the image needs more room */
  mdColSpan?: number;
  mdRowSpan?: number;
  concept?: ConceptKey;
};

type TextTile = {
  kind: 'text';
  id: string;
  quote: string;
  colSpan: number;
  rowSpan: number;
  mdColSpan?: number;
  mdRowSpan?: number;
  /** light = white bg / dark text · dark = ink bg / light text */
  tone?: 'light' | 'outline';
};

type Tile = ImageTile | TextTile;

// Layout designed to total a clean rectangle on a 6-col desktop grid.
const tiles: Tile[] = [
  // Row 1 — wide horizontal plan + vertical section + sketch
  { kind: 'image', id: 'piega', cover: origine1, alt: 'Schema concettuale della piega — ricerca tipologica',
    colSpan: 2, rowSpan: 1, mdColSpan: 3, mdRowSpan: 2, concept: 'piegare' },
  { kind: 'text', id: 'q1', quote: 'L’architettura è un dispositivo di sutura.',
    colSpan: 1, rowSpan: 1, mdColSpan: 2, mdRowSpan: 1, tone: 'light' },
  { kind: 'image', id: 'sezione', cover: origine2, alt: 'Studio chiaroscurale — sezione verticale',
    colSpan: 1, rowSpan: 2, mdColSpan: 1, mdRowSpan: 2 },

  // Row 2 (continues span items above)
  { kind: 'image', id: 'innesto', cover: origine3, alt: 'Disegno planimetrico — innesto urbano',
    colSpan: 1, rowSpan: 1, mdColSpan: 1, mdRowSpan: 1, concept: 'innestare' },
  { kind: 'text', id: 'q2', quote: 'Abitare lo spessore: scavare la sezione.',
    colSpan: 1, rowSpan: 1, mdColSpan: 1, mdRowSpan: 1, tone: 'outline' },

  // Row 3 — long aerial plan spans wide
  { kind: 'image', id: 'tessuto', cover: stratiAerial1, alt: 'Vista aerea del tessuto urbano',
    colSpan: 2, rowSpan: 1, mdColSpan: 4, mdRowSpan: 1, concept: 'mat-building' },
  { kind: 'image', id: 'quartiere', cover: stratiModel1, alt: 'Modello di studio quartiere residenziale',
    colSpan: 1, rowSpan: 1, mdColSpan: 2, mdRowSpan: 1, concept: 'mat-building' },

  // Row 4 — concept pause + render + materia
  { kind: 'text', id: 'q3', quote: 'L’edificio come geografia porosa.',
    colSpan: 1, rowSpan: 1, mdColSpan: 2, mdRowSpan: 1, tone: 'light' },
  { kind: 'image', id: 'waterfront', cover: stratiRender1, alt: 'Render waterfront e fronte urbano',
    colSpan: 2, rowSpan: 1, mdColSpan: 2, mdRowSpan: 2, concept: 'dissolvere' },
  { kind: 'image', id: 'materia', cover: origine4, alt: 'Modello fisico — studio della materia',
    colSpan: 1, rowSpan: 1, mdColSpan: 2, mdRowSpan: 1 },

  // Row 5
  { kind: 'image', id: 'continuita', cover: origine5, alt: 'Modello volumetrico — studio di continuità',
    colSpan: 1, rowSpan: 1, mdColSpan: 1, mdRowSpan: 1 },
  { kind: 'text', id: 'q4', quote: 'La piega trasforma il limite in orizzonte.',
    colSpan: 2, rowSpan: 1, mdColSpan: 1, mdRowSpan: 1, tone: 'outline' },

  // Row 6 — long port masterplan
  { kind: 'image', id: 'porto', cover: stratiAerial2, alt: 'Vista aerea area portuale — masterplan',
    colSpan: 2, rowSpan: 1, mdColSpan: 4, mdRowSpan: 2, concept: 'porosita' },
  { kind: 'image', id: 'segno', cover: stratiSketch1, alt: 'Schizzo di progetto — segno fondativo',
    colSpan: 1, rowSpan: 1, mdColSpan: 2, mdRowSpan: 1 },

  // Row 7
  { kind: 'text', id: 'q5', quote: 'Modularità come strategia di adattamento.',
    colSpan: 1, rowSpan: 1, mdColSpan: 2, mdRowSpan: 1, tone: 'light' },

  // Row 8 — nodo + facciata + topografia
  { kind: 'image', id: 'nodo', cover: stratiUrban1, alt: 'Schema urbano — nodo infrastrutturale',
    colSpan: 2, rowSpan: 1, mdColSpan: 3, mdRowSpan: 1, concept: 'porosita' },
  { kind: 'image', id: 'facciata', cover: stratiRender3, alt: 'Render — studio di facciata residenziale',
    colSpan: 1, rowSpan: 1, mdColSpan: 3, mdRowSpan: 1, concept: 'innestare' },

  // Row 9 — topografie + quote
  { kind: 'image', id: 'topografia', cover: stratiTopo1, alt: 'Pianta topografica del sito di progetto',
    colSpan: 1, rowSpan: 1, mdColSpan: 2, mdRowSpan: 1, concept: 'stratificare' },
  { kind: 'text', id: 'q6', quote: 'La griglia abilita l’imprevisto sociale.',
    colSpan: 1, rowSpan: 1, mdColSpan: 2, mdRowSpan: 1, tone: 'outline' },
  { kind: 'image', id: 'topografia2', cover: stratiTopo2, alt: 'Pianta topografica — variante di progetto',
    colSpan: 1, rowSpan: 1, mdColSpan: 2, mdRowSpan: 1, concept: 'stratificare' },

  // Row 10 — closing horizon (full width)
  { kind: 'image', id: 'orizzonte', cover: stratiRender4, alt: 'Render prospettico — orizzonte urbano',
    colSpan: 3, rowSpan: 1, mdColSpan: 6, mdRowSpan: 2, concept: 'dissolvere' },
];

// Tailwind needs literal classes — map spans to safe utility strings.
const colClass = (n: number) => {
  switch (n) {
    case 1: return 'col-span-1';
    case 2: return 'col-span-2';
    case 3: return 'col-span-3';
    case 4: return 'col-span-4';
    case 5: return 'col-span-5';
    case 6: return 'col-span-6';
    default: return 'col-span-1';
  }
};
const rowClass = (n: number) => {
  switch (n) {
    case 1: return 'row-span-1';
    case 2: return 'row-span-2';
    case 3: return 'row-span-3';
    default: return 'row-span-1';
  }
};
const mdColClass = (n: number) => {
  switch (n) {
    case 1: return 'md:col-span-1';
    case 2: return 'md:col-span-2';
    case 3: return 'md:col-span-3';
    case 4: return 'md:col-span-4';
    case 5: return 'md:col-span-5';
    case 6: return 'md:col-span-6';
    default: return 'md:col-span-1';
  }
};
const mdRowClass = (n: number) => {
  switch (n) {
    case 1: return 'md:row-span-1';
    case 2: return 'md:row-span-2';
    case 3: return 'md:row-span-3';
    default: return 'md:row-span-1';
  }
};

const Strati = () => {
  const { t } = useLanguage();
  const [expandedTile, setExpandedTile] = useState<ImageTile | null>(null);
  const [activeTile, setActiveTile] = useState<string | null>(null);

  const openTile = useCallback((tile: ImageTile) => setExpandedTile(tile), []);
  const closeImage = useCallback(() => setExpandedTile(null), []);

  return (
    <section id="strati" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide mb-4">
              {t('strati.heading')}
            </h2>
          </div>

          {/* Intro text */}
          <div className="max-w-2xl mx-auto space-y-4 font-body text-sm md:text-base text-foreground leading-[1.6] mb-12 md:mb-16">
            <p>{t('strati.text')}</p>
          </div>

          {/* Bento Puzzle */}
          <div className="grid grid-cols-3 md:grid-cols-6 auto-rows-[90px] md:auto-rows-[120px] gap-1.5 md:gap-2">
            {tiles.map((tile) => {
              const spanClasses = [
                colClass(tile.colSpan),
                rowClass(tile.rowSpan),
                mdColClass(tile.mdColSpan ?? tile.colSpan),
                mdRowClass(tile.mdRowSpan ?? tile.rowSpan),
              ].join(' ');

              if (tile.kind === 'text') {
                const isLight = tile.tone !== 'outline';
                return (
                  <div
                    key={tile.id}
                    className={`${spanClasses} flex items-center justify-center text-center px-4 md:px-6 py-4 rounded-sm ${
                      isLight
                        ? 'bg-background text-foreground'
                        : 'bg-background text-foreground border border-foreground/15'
                    }`}
                  >
                    <p
                      className="font-display font-light italic leading-snug text-foreground/80"
                      style={{ fontSize: 'clamp(0.7rem, 1vw, 0.95rem)', maxWidth: '28ch' }}
                    >
                      «{tile.quote}»
                    </p>
                  </div>
                );
              }

              const concept = tile.concept ? concepts[tile.concept] : undefined;
              const isActive = activeTile === tile.id;
              return (
                <motion.div
                  key={tile.id}
                  className={`${spanClasses} relative overflow-hidden rounded-sm cursor-pointer group bg-muted`}
                  onClick={() => openTile(tile)}
                  onMouseEnter={() => concept && setActiveTile(tile.id)}
                  onMouseLeave={() => concept && setActiveTile((prev) => (prev === tile.id ? null : prev))}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <img
                    src={tile.cover}
                    alt={tile.alt}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  {concept && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-black/55 pointer-events-none"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            key="concept"
                            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
                            style={{ padding: 'clamp(0.75rem, 4%, 2rem)' }}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
                          >
                            <span
                              className="font-display font-light tracking-[0.2em] text-white leading-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
                              style={{ fontSize: 'clamp(0.7rem, 1.6vw, 1.05rem)', maxWidth: '80%' }}
                            >
                              {concept.title}
                            </span>
                            <span
                              className="font-body font-light text-white/85 leading-snug mt-2 hidden md:block drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]"
                              style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)', maxWidth: '80%' }}
                            >
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

      {/* Lightbox */}
      <AnimatePresence>
        {expandedTile && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onClick={closeImage}
          >
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              aria-label={t('strati.close')}
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              src={expandedTile.cover}
              alt={expandedTile.alt}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              className="max-w-[92vw] max-h-[78vh] object-contain select-none"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            {expandedTile.concept && (
              <motion.div
                className="mt-6 md:mt-8 text-center px-6 max-w-2xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="font-display font-medium tracking-[0.28em] text-white text-base md:text-xl lg:text-2xl">
                  {concepts[expandedTile.concept].title}
                </div>
                <div className="font-body font-light text-white/80 text-xs md:text-sm lg:text-base leading-relaxed mt-3 md:mt-4">
                  {concepts[expandedTile.concept].phrase}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Strati;
