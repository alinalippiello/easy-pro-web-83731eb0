import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import origine1 from "@/assets/portfolio/origine-1.jpg";
import origine2 from "@/assets/portfolio/origine-2.jpg";
import origine3 from "@/assets/portfolio/origine-3.jpg";
import origine4 from "@/assets/portfolio/origine-4.png";
import origine5 from "@/assets/portfolio/origine-5.png";
import stratiModel1 from "@/assets/portfolio/strati-model-1.jpg";
import stratiRender1 from "@/assets/portfolio/strati-render-1.jpg";
import stratiAerial1 from "@/assets/portfolio/strati-aerial-1.jpg";

interface MosaicTile {
  id: string;
  cover: string;
  label: string;
  concept: string;
  images: string[];
  captions: string[];
  colSpan: number;
  rowSpan: number;
}

const tiles: MosaicTile[] = [
  {
    id: 'piega',
    cover: origine1,
    label: 'La piega',
    concept: 'Lo spazio si genera per inflessione. La piega trasforma una superficie in un campo.',
    images: [origine1, origine4],
    captions: ['Schizzo prospettico', 'Modello — vista frontale'],
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: 'chiaroscuro',
    cover: origine2,
    label: 'Chiaroscuro',
    concept: 'La luce come materiale progettuale — ombra e struttura definiscono lo spazio.',
    images: [origine2],
    captions: ['Studio chiaroscurale'],
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 'quartiere',
    cover: stratiModel1,
    label: 'Quartiere',
    concept: 'Il modello urbano come strumento di verifica — scala, densità e verde si misurano con le mani.',
    images: [stratiModel1],
    captions: ['Modello urbano — vista aerea'],
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 'innesto',
    cover: origine3,
    label: "L'innesto",
    concept: 'Inserirsi senza cancellare. Aggiungere nuova materia al corpo vivo del paesaggio.',
    images: [origine3, origine5],
    captions: ['Disegno planimetrico', 'Modello — vista prospettica'],
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 'waterfront',
    cover: stratiRender1,
    label: 'Waterfront',
    concept: 'Architettura e infrastruttura come estensione della città verso l\'acqua.',
    images: [stratiRender1],
    captions: ['Render aereo — waterfront'],
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 'materia',
    cover: origine4,
    label: 'Materia',
    concept: 'Il modello come strumento di pensiero — la forma nasce dalle mani.',
    images: [origine4, origine5, origine1],
    captions: ['Modello — vista frontale', 'Modello — vista prospettica', 'Schizzo prospettico'],
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 'tessuto',
    cover: stratiAerial1,
    label: 'Tessuto',
    concept: 'Leggere la città esistente per innestare il nuovo — continuità e rottura controllata.',
    images: [stratiAerial1],
    captions: ['Vista aerea — intervento urbano'],
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: 'continuita',
    cover: origine5,
    label: 'Continuità',
    concept: 'Costruito e territorio come un unico organismo in trasformazione.',
    images: [origine5, origine3, origine2],
    captions: ['Modello — vista prospettica', 'Disegno planimetrico', 'Studio chiaroscurale'],
    colSpan: 1,
    rowSpan: 1,
  },
];

const Strati = () => {
  const [expandedTile, setExpandedTile] = useState<MosaicTile | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openTile = useCallback((tile: MosaicTile) => {
    setExpandedTile(tile);
    setGalleryIndex(0);
  }, []);

  const closeTile = useCallback(() => {
    setExpandedTile(null);
    setGalleryIndex(0);
  }, []);

  const nextImage = useCallback(() => {
    if (!expandedTile) return;
    setGalleryIndex((p) => (p === expandedTile.images.length - 1 ? 0 : p + 1));
  }, [expandedTile]);

  const prevImage = useCallback(() => {
    if (!expandedTile) return;
    setGalleryIndex((p) => (p === 0 ? expandedTile.images.length - 1 : p - 1));
  }, [expandedTile]);

  return (
    <section id="strati" className="py-20 md:py-28 border-t border-border">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Strati
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed max-w-3xl mx-auto italic">
              Schizzi, modelli e disegni — strati di un pensiero progettuale che si accumula e si rivela.
            </p>
          </div>

          {/* Mosaic Grid — compact tiles, 4 cols */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 auto-rows-[80px] md:auto-rows-[100px] gap-1 md:gap-1.5">
            {tiles.map((tile) => (
              <motion.div
                key={tile.id}
                className="relative overflow-hidden rounded-sm cursor-pointer group"
                style={{
                  gridColumn: `span ${tile.colSpan}`,
                  gridRow: `span ${tile.rowSpan}`,
                }}
                onClick={() => openTile(tile)}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <img
                  src={tile.cover}
                  alt={tile.label}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-end p-3">
                  <span className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {tile.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded tile overlay */}
      <AnimatePresence>
        {expandedTile && (
          <motion.div
            className="fixed inset-0 z-50 bg-background flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
                {expandedTile.label}
              </p>
              <button
                onClick={closeTile}
                className="p-2 text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image area */}
            <div className="flex-1 flex items-center justify-center relative px-4 md:px-16">
              {expandedTile.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-3 text-muted-foreground hover:text-foreground transition-smooth z-10"
                    aria-label="Precedente"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-3 text-muted-foreground hover:text-foreground transition-smooth z-10"
                    aria-label="Successiva"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryIndex}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={expandedTile.images[galleryIndex]}
                    alt={expandedTile.captions[galleryIndex]}
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    className="max-w-4xl w-full max-h-[65vh] object-contain select-none"
                  />
                  <p className="mt-4 font-body text-sm text-muted-foreground">
                    {expandedTile.captions[galleryIndex]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom info + dots */}
            <div className="px-6 py-6 border-t border-border">
              <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
                {expandedTile.images.length > 1 && (
                  <div className="flex gap-2">
                    {expandedTile.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGalleryIndex(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          idx === galleryIndex
                            ? 'bg-foreground w-4'
                            : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                        }`}
                        aria-label={`Immagine ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
                <p className="font-body text-sm text-muted-foreground text-center leading-relaxed max-w-xl">
                  {expandedTile.concept}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Strati;
