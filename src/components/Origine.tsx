import { useState } from 'react';
import Lightbox from './Lightbox';

import origine1 from "@/assets/portfolio/origine-1.jpg";
import origine2 from "@/assets/portfolio/origine-2.jpg";
import origine3 from "@/assets/portfolio/origine-3.jpg";
import origine4 from "@/assets/portfolio/origine-4.png";
import origine5 from "@/assets/portfolio/origine-5.png";

const images = [
  { src: origine1, label: "Schizzo prospettico" },
  { src: origine2, label: "Studio chiaroscurale" },
  { src: origine3, label: "Disegno planimetrico" },
  { src: origine4, label: "Modello — vista frontale" },
  { src: origine5, label: "Modello — vista prospettica" },
];

const Origine = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="origine" className="py-20 md:py-28 border-t border-border">
      <Lightbox
        images={images.map(i => i.src)}
        captions={images.map(i => i.label)}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((p) => (p === 0 ? images.length - 1 : p - 1))}
        onNext={() => setLightboxIndex((p) => (p === images.length - 1 ? 0 : p + 1))}
        title="Origine"
        onIndexChange={setLightboxIndex}
      />
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Origine
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed max-w-3xl mx-auto italic">
              Schizzi, modelli e disegni che raccontano un lavoro coerente tra architettura e paesaggio — una ricerca sulla piega, sull'innesto, sulla continuità tra costruito e territorio.
            </p>
          </div>

          {/* Grid di immagini */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {images.map((img, i) => (
              <div
                key={i}
                className="aspect-[4/3] overflow-hidden rounded-sm cursor-pointer group"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105 select-none pointer-events-none"
                />
              </div>
            ))}
          </div>

          {/* Note concettuali */}
          <div className="mt-16 max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                La piega
              </p>
              <p className="font-body text-sm text-foreground leading-relaxed">
                Lo spazio non si genera per addizione ma per inflessione. La piega è il dispositivo che trasforma una superficie in un campo: crea soglie, articola limiti, produce continuità là dove la geometria tradizionale separa.
              </p>
            </div>
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                L'innesto
              </p>
              <p className="font-body text-sm text-foreground leading-relaxed">
                Ogni progetto si radica in un contesto esistente. L'innesto è l'atto di inserirsi senza cancellare, di aggiungere nuova materia al corpo vivo del paesaggio — costruendo relazioni tra ciò che c'è e ciò che può emergere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origine;
