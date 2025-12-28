import { useState } from 'react';
import Lightbox from './Lightbox';

// Import portfolio images
import gardenCity1 from "@/assets/portfolio/garden-city-1.jpg";
import gardenCity2 from "@/assets/portfolio/garden-city-2.jpg";
import gardenCity3 from "@/assets/portfolio/garden-city-3.jpg";
import novecento1 from "@/assets/portfolio/novecento-1.jpg";
import novecento2 from "@/assets/portfolio/novecento-2.jpg";
import novecento3 from "@/assets/portfolio/novecento-3.jpg";
import illerpark1 from "@/assets/portfolio/illerpark-1.jpg";
import illerpark2 from "@/assets/portfolio/illerpark-2.jpg";
import illerpark3 from "@/assets/portfolio/illerpark-3.jpg";
import shinkenchiku1 from "@/assets/portfolio/shinkenchiku-1.jpg";
import europan11 from "@/assets/portfolio/europan11-1.jpg";
import aluartforum1 from "@/assets/portfolio/aluartforum-1.jpg";
import expo1 from "@/assets/portfolio/expo-1.jpg";

const portfolioProjects = [
  {
    title: "The New Ecological Porous Garden City",
    location: "Wernigerode, Germania",
    year: "2021 — Oggi",
    description: "Il progetto trae ispirazione dalle tipologie architettoniche locali, reinterpretandole per diventare un landmark all'ingresso della città.",
    images: [gardenCity1, gardenCity2, gardenCity3],
  },
  {
    title: "Novecentopiù'cento",
    location: "Milano, Italia",
    year: "Concorso",
    description: "Ampliamento del Museo del Novecento. Il progetto intreccia la città con il percorso museale creando una continuità col percorso pubblico del Museo del Novecento.",
    images: [novecento1, novecento2, novecento3],
  },
  {
    title: "Wohnen am Illerpark",
    location: "Germania",
    year: "Concorso",
    description: "Il progetto integra in maniera innovativa le residenze sociali e gli spazi comuni, per rafforzare la coesione sociale e favorire un senso di comunità inclusivo e dinamico.",
    images: [illerpark1, illerpark2, illerpark3],
  },
  {
    title: "4 Houses - Shinkenchiku Competition",
    location: "Internazionale",
    year: "Concorso",
    description: "Reinterpretazione del Nine Square Grid design problem introdotto da John Hejduk, seguendo l'assegnazione proposta da Rafael Moneo.",
    images: [shinkenchiku1],
  },
  {
    title: "Europan 11 - Floating Blocks",
    location: "Leeuwarden, Paesi Bassi",
    year: "Runner up",
    description: "Il progetto è concepito come un intreccio tra pieno e vuoto, in cui l'acqua non è un semplice sfondo ma parte integrante dell'architettura.",
    images: [europan11],
  },
  {
    title: "Aluartforum - Galleria d'Arte",
    location: "Croazia",
    year: "Concorso",
    description: "La tipologia proposta è un padiglione espositivo verticale, composto da scatole sovrapposte che stabiliscono una relazione armoniosa con il contesto esistente.",
    images: [aluartforum1],
  },
  {
    title: "Architetture di Servizio Expo",
    location: "Milano, Italia",
    year: "2015",
    description: "Il progetto si concentra sulla sostenibilità, la rapidità di costruzione e la funzionalità degli spazi, con un sistema costruttivo basato sull'assemblaggio a secco e sul riutilizzo dei materiali.",
    images: [expo1],
  },
];

const Experience = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');

  const openLightbox = (images: string[], index: number, title: string) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="esperienza" className="py-20 md:py-28">
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
        title={lightboxTitle}
      />
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center">
            Progetti
          </p>

          <p className="font-body text-sm md:text-base text-center text-foreground mb-16 max-w-2xl mx-auto">
            Contenuto relativo ai progetti di architettura e design
          </p>

          {/* Portfolio Grid - Elemental Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {portfolioProjects.map((project) => (
              <div
                key={project.title}
                className="group cursor-pointer"
                onClick={() => openLightbox(project.images, 0, project.title)}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-muted mb-3">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                
                {/* Title */}
                <p className="font-body text-xs text-muted-foreground mb-1">
                  {project.year}
                </p>
                <h4 className="font-body text-sm font-normal leading-tight">
                  {project.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-16 text-center">
            <p className="font-body text-sm text-foreground">
              Tags:{" "}
              {["progettazione", "urbana", "sostenibile", "concorsi", "residenziale"].map((tag, i) => (
                <span key={tag}>
                  <a href="#" className="underline hover:no-underline transition-smooth">
                    {tag}
                  </a>
                  {i < 4 && ", "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
