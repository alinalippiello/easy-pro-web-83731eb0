import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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

interface MosaicTile {
  id: string;
  cover: string;
  colSpan: number;
  rowSpan: number;
}

const tiles: MosaicTile[] = [
  { id: 'piega', cover: origine1, colSpan: 2, rowSpan: 1 },
  { id: 'chiaroscuro', cover: origine2, colSpan: 1, rowSpan: 1 },
  { id: 'quartiere', cover: stratiModel1, colSpan: 1, rowSpan: 1 },
  { id: 'innesto', cover: origine3, colSpan: 1, rowSpan: 1 },
  { id: 'waterfront', cover: stratiRender1, colSpan: 1, rowSpan: 1 },
  { id: 'materia', cover: origine4, colSpan: 1, rowSpan: 1 },
  { id: 'tessuto', cover: stratiAerial1, colSpan: 2, rowSpan: 1 },
  { id: 'continuita', cover: origine5, colSpan: 1, rowSpan: 1 },
  { id: 'porto', cover: stratiAerial2, colSpan: 2, rowSpan: 1 },
  // tile 10 (masterplan) removed
  { id: 'segno', cover: stratiSketch1, colSpan: 1, rowSpan: 1 },
  { id: 'nodo', cover: stratiUrban1, colSpan: 2, rowSpan: 1 },
  // tile 13 (soglia) removed
  { id: 'facciata', cover: stratiRender3, colSpan: 2, rowSpan: 1 },
  { id: 'topografia', cover: stratiTopo1, colSpan: 1, rowSpan: 1 },
  { id: 'topografia2', cover: stratiTopo2, colSpan: 1, rowSpan: 1 },
  { id: 'orizzonte', cover: stratiRender4, colSpan: 2, rowSpan: 1 },
];

const Strati = () => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const openImage = useCallback((src: string) => {
    setExpandedImage(src);
  }, []);

  const closeImage = useCallback(() => {
    setExpandedImage(null);
  }, []);

  return (
    <section id="strati" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header - centered like Profile */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide mb-4 text-center">
              L'architettura come paesaggio
            </h2>
          </div>

          {/* Text block */}
          <div className="space-y-4 font-body text-sm md:text-base text-foreground leading-[1.6] mb-12 md:mb-16">
            <p>
              L'architettura non come oggetto, ma come campo. Un sistema continuo in cui edificio e paesaggio coincidono, e la forma emerge come rivelazione di condizioni latenti.
            </p>
          </div>

          {/* Mosaic Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 auto-rows-[100px] sm:auto-rows-[90px] md:auto-rows-[100px] gap-1 md:gap-1.5">
            {tiles.map((tile) => {
              const mobileSpan = Math.min(tile.colSpan, 2);
              return (
              <motion.div
                key={tile.id}
                className="relative overflow-hidden rounded-sm cursor-pointer group"
                style={{
                  gridColumn: `span ${mobileSpan}`,
                  gridRow: `span ${tile.rowSpan}`,
                }}
                onClick={() => openImage(tile.cover)}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <img
                  src={tile.cover}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                />
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
              aria-label="Chiudi"
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
