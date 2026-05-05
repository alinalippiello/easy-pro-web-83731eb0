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
// CONCEPT REGISTRY — easily editable archive
// Add / rename / remove concepts here. Each concept has a key
// (used to associate images) plus a title and a short phrase.
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
  innestare: {
    title: 'INNESTARE',
    phrase: 'Abitare una condizione esistente senza cancellarne la memoria.',
  },
  piegare: {
    title: 'PIEGARE',
    phrase: 'Trasformare il paesaggio in spazio attraversabile.',
  },
  dissolvere: {
    title: 'DISSOLVERE',
    phrase: 'Superare il limite tra figura, infrastruttura e paesaggio.',
  },
  porosita: {
    title: 'POROSITÀ',
    phrase: 'Aprire il costruito a flussi ecologici, sociali e visivi.',
  },
  stratificare: {
    title: 'STRATIFICARE',
    phrase: 'Far emergere il tempo attraverso materia e territorio.',
  },
  'mat-building': {
    title: 'MAT-BUILDING',
    phrase: 'Costruire continuità attraverso densità, ripetizione e relazione.',
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
// TILES — associate (or not) each image with a concept.
// Leave `concept` undefined to keep an image mute.
// ─────────────────────────────────────────────────────────────
const tiles: MosaicTile[] = [
  { id: 'piega', cover: origine1, alt: 'Schema concettuale della piega — ricerca tipologica', colSpan: 2, rowSpan: 1, concept: 'piegare' },
  { id: 'chiaroscuro', cover: origine2, alt: 'Studio chiaroscurale di volumi architettonici', colSpan: 1, rowSpan: 1 },
  { id: 'quartiere', cover: stratiModel1, alt: 'Modello di studio quartiere residenziale', colSpan: 1, rowSpan: 1, concept: 'mat-building' },
  { id: 'innesto', cover: origine3, alt: 'Disegno planimetrico — innesto urbano', colSpan: 1, rowSpan: 1, concept: 'innestare' },
  { id: 'waterfront', cover: stratiRender1, alt: 'Render waterfront e fronte urbano', colSpan: 1, rowSpan: 1, concept: 'dissolvere' },
  { id: 'materia', cover: origine4, alt: 'Modello fisico — studio della materia', colSpan: 1, rowSpan: 1 },
  { id: 'tessuto', cover: stratiAerial1, alt: 'Vista aerea del tessuto urbano', colSpan: 2, rowSpan: 1, concept: 'mat-building' },
  { id: 'continuita', cover: origine5, alt: 'Modello volumetrico — studio di continuità', colSpan: 1, rowSpan: 1 },
  { id: 'porto', cover: stratiAerial2, alt: 'Vista aerea area portuale — masterplan', colSpan: 2, rowSpan: 1, concept: 'porosita' },
  { id: 'segno', cover: stratiSketch1, alt: 'Schizzo di progetto — segno fondativo', colSpan: 1, rowSpan: 1 },
  { id: 'nodo', cover: stratiUrban1, alt: 'Schema urbano — nodo infrastrutturale', colSpan: 2, rowSpan: 1, concept: 'porosita' },
  { id: 'facciata', cover: stratiRender3, alt: 'Render — studio di facciata residenziale', colSpan: 2, rowSpan: 1, concept: 'innestare' },
  { id: 'topografia', cover: stratiTopo1, alt: 'Pianta topografica del sito di progetto', colSpan: 1, rowSpan: 1, concept: 'stratificare' },
  { id: 'topografia2', cover: stratiTopo2, alt: 'Pianta topografica — variante di progetto', colSpan: 1, rowSpan: 1, concept: 'stratificare' },
  { id: 'orizzonte', cover: stratiRender4, alt: 'Render prospettico — orizzonte urbano', colSpan: 2, rowSpan: 1, concept: 'dissolvere' },
];

const Strati = () => {
  const { t } = useLanguage();
  const [expandedTile, setExpandedTile] = useState<MosaicTile | null>(null);
  const [activeTile, setActiveTile] = useState<string | null>(null);

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

          {/* Mosaic Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 auto-rows-[80px] md:auto-rows-[100px] gap-1 md:gap-1.5">
            {tiles.map((tile) => {
              const concept = tile.concept ? concepts[tile.concept] : undefined;
              const isActive = activeTile === tile.id;
              return (
                <motion.div
                  key={tile.id}
                  className="relative overflow-hidden rounded-sm cursor-pointer group"
                  style={{
                    gridColumn: `span ${tile.colSpan}`,
                    gridRow: `span ${tile.rowSpan}`,
                  }}
                  onClick={() => openTile(tile)}
                  onMouseEnter={() => concept && setActiveTile(tile.id)}
                  onMouseLeave={() => concept && setActiveTile((prev) => (prev === tile.id ? null : prev))}
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <img
                    src={tile.cover}
                    alt={tile.alt}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  />

                  {concept && (
                    <>
                      {/* Dim overlay — stronger for legibility */}
                      <motion.div
                        className="absolute inset-0 bg-black/55 pointer-events-none"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                      {/* Concept text */}
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
                            <span className="font-display font-medium tracking-[0.22em] text-white text-sm md:text-lg lg:text-xl leading-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                              {concept.title}
                            </span>
                            <span className="font-body font-light text-white/90 text-[10px] md:text-xs lg:text-sm leading-snug mt-2 md:mt-3 max-w-[92%] hidden md:block drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
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
