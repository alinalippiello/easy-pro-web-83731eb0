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
// CONCEPT REGISTRY — editorial archive of keywords & manifestos
// ─────────────────────────────────────────────────────────────
type ConceptKey =
  | 'innestare'
  | 'piegare'
  | 'mat-building'
  | 'stratigrafia'
  | 'duplicare'
  | 'matrice';

interface Concept {
  title: string;
  phrase: string;
}

const concepts: Record<ConceptKey, Concept> = {
  innestare: {
    title: 'INNESTARE',
    phrase:
      'L’architettura è un dispositivo di sutura: non occupa lo spazio, ricuce le fratture del tessuto urbano.',
  },
  stratigrafia: {
    title: 'STRATIGRAFIA',
    phrase:
      'La verità del progetto abita lo spessore. Scavare la sezione significa progettare nuove geografie pubbliche.',
  },
  'mat-building': {
    title: 'MAT-BUILDING',
    phrase:
      'L’edificio smette di essere oggetto e diventa suolo: una griglia porosa che assorbe la densità del mondo.',
  },
  piegare: {
    title: 'PIEGARE',
    phrase:
      'Annullare la soglia tra interno ed esterno. La piega trasforma il limite costruito in orizzonte calpestabile.',
  },
  duplicare: {
    title: 'DUPLICARE',
    phrase:
      'Modularità come sistema aperto. La ripetizione del tipo è la chiave per la variazione infinita del paesaggio.',
  },
  matrice: {
    title: 'MATRICE',
    phrase:
      'Il vuoto è la struttura portante della città. La griglia non ordina, ma abilita l’imprevisto sociale.',
  },
};

interface MosaicTile {
  id: string;
  cover: string;
  alt: string;
  colSpan: number;
  rowSpan: number;
  /** Optional concept key. Tiles without it remain mute. */
  concept?: ConceptKey;
}

// ─────────────────────────────────────────────────────────────
// TILES — image positions 1..15. Concepts attached per spec.
// ─────────────────────────────────────────────────────────────
const tiles: MosaicTile[] = [
  /*  1 */ { id: 'piega',       cover: origine1,      alt: 'Schema concettuale della piega — ricerca tipologica', colSpan: 2, rowSpan: 1 },
  /*  2 */ { id: 'chiaroscuro', cover: origine2,      alt: 'Studio chiaroscurale di volumi architettonici',       colSpan: 1, rowSpan: 1 },
  /*  3 */ { id: 'quartiere',   cover: stratiModel1,  alt: 'Modello di studio quartiere residenziale',            colSpan: 1, rowSpan: 1, concept: 'mat-building' },
  /*  4 */ { id: 'innesto',     cover: origine3,      alt: 'Disegno planimetrico — innesto urbano',               colSpan: 1, rowSpan: 1 },
  /*  5 */ { id: 'waterfront',  cover: stratiRender1, alt: 'Render waterfront e fronte urbano',                   colSpan: 1, rowSpan: 1, concept: 'duplicare' },
  /*  6 */ { id: 'materia',     cover: origine4,      alt: 'Modello fisico — studio della materia',               colSpan: 1, rowSpan: 1, concept: 'piegare' },
  /*  7 */ { id: 'tessuto',     cover: stratiAerial1, alt: 'Vista aerea del tessuto urbano',                      colSpan: 2, rowSpan: 1 },
  /*  8 */ { id: 'continuita',  cover: origine5,      alt: 'Modello volumetrico — studio di continuità',          colSpan: 1, rowSpan: 1 },
  /*  9 */ { id: 'porto',       cover: stratiAerial2, alt: 'Vista aerea area portuale — masterplan',              colSpan: 2, rowSpan: 1 },
  /* 10 */ { id: 'segno',       cover: stratiSketch1, alt: 'Schizzo di progetto — segno fondativo',               colSpan: 1, rowSpan: 1 },
  /* 11 */ { id: 'nodo',        cover: stratiUrban1,  alt: 'Schema urbano — nodo infrastrutturale',               colSpan: 2, rowSpan: 1, concept: 'innestare' },
  /* 12 */ { id: 'facciata',    cover: stratiRender3, alt: 'Render — studio di facciata residenziale',            colSpan: 2, rowSpan: 1, concept: 'matrice' },
  /* 13 */ { id: 'topografia',  cover: stratiTopo1,   alt: 'Pianta topografica del sito di progetto',             colSpan: 1, rowSpan: 1 },
  /* 14 */ { id: 'topografia2', cover: stratiTopo2,   alt: 'Pianta topografica — variante di progetto',           colSpan: 1, rowSpan: 1 },
  /* 15 */ { id: 'orizzonte',   cover: stratiRender4, alt: 'Render prospettico — orizzonte urbano',               colSpan: 2, rowSpan: 1, concept: 'stratigrafia' },
];

// ─────────────────────────────────────────────────────────────
// LAYOUT MATH — fill the grid into a perfect rectangle by
// adding 1×1 text tiles. Sum of image spans = 21.
// Mobile (3 cols): 21 / 3 = 7 rows → 0 fillers
// Tablet (5 cols): need 25 → 4 fillers
// Desktop (6 cols): need 24 → 3 fillers
// We render the max (4) and hide the surplus per breakpoint.
// ─────────────────────────────────────────────────────────────
const TEXT_FILLERS_MAX = 4;

const Strati = () => {
  const { t } = useLanguage();
  const [expandedTile, setExpandedTile] = useState<MosaicTile | null>(null);
  const [activeTile, setActiveTile] = useState<string | null>(null);
  const [rotationIndex, setRotationIndex] = useState(0);

  const conceptList = useMemo(() => Object.values(concepts), []);

  // Slow rotation of keywords/phrases inside text tiles
  useEffect(() => {
    const id = setInterval(() => setRotationIndex((i) => i + 1), 4500);
    return () => clearInterval(id);
  }, []);

  const openTile = useCallback((tile: MosaicTile) => {
    setExpandedTile(tile);
  }, []);

  const closeImage = useCallback(() => {
    setExpandedTile(null);
  }, []);

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

          {/* Adaptive mosaic — dense flow fills empty cells with text tiles */}
          <div
            className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 auto-rows-[80px] md:auto-rows-[110px] gap-2 md:gap-3"
            style={{ gridAutoFlow: 'dense' }}
          >
            {tiles.map((tile) => {
              const concept = tile.concept ? concepts[tile.concept] : undefined;
              const isActive = activeTile === tile.id;
              return (
                <motion.div
                  key={tile.id}
                  className="relative overflow-hidden rounded-sm cursor-pointer group bg-neutral-900"
                  style={{
                    gridColumn: `span ${tile.colSpan}`,
                    gridRow: `span ${tile.rowSpan}`,
                  }}
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
                    className="w-full h-full object-contain select-none pointer-events-none"
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
                              style={{ fontSize: 'clamp(0.7rem, 1.6vw, 1.05rem)', maxWidth: '85%' }}
                            >
                              {concept.title}
                            </span>
                            <span
                              className="font-body font-light text-white/85 leading-snug mt-2 hidden md:block drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]"
                              style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)', maxWidth: '85%' }}
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

            {/* Text fillers — close the rectangle. Hide surplus per breakpoint. */}
            {Array.from({ length: TEXT_FILLERS_MAX }).map((_, i) => {
              const concept = conceptList[(rotationIndex + i) % conceptList.length];
              // Mobile (3 cols) is already perfect → hide all fillers below md.
              // Desktop (6 cols) needs only 3 → hide the 4th at lg+.
              const visibility =
                i === 3
                  ? 'hidden md:flex lg:hidden'
                  : 'hidden md:flex';
              return (
                <div
                  key={`filler-${i}`}
                  className={`${visibility} relative overflow-hidden rounded-sm bg-neutral-900 items-center justify-center text-center`}
                  style={{ gridColumn: 'span 1', gridRow: 'span 1', padding: 'clamp(0.5rem, 6%, 1.25rem)' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${concept.title}-${rotationIndex}-${i}`}
                      className="flex items-center justify-center w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                    >
                      <span
                        className="font-display font-light tracking-[0.22em] text-white/90 leading-tight"
                        style={{ fontSize: 'clamp(0.6rem, 1vw, 0.85rem)' }}
                      >
                        {concept.title}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox overlay — editorial archive */}
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
