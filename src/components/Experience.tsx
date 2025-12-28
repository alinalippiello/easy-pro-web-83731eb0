import { useState } from 'react';
import Lightbox from './Lightbox';

// Import portfolio images
import gardenCity1 from "@/assets/portfolio/garden-city-1.jpg";
import novecento1 from "@/assets/portfolio/novecento-1.jpg";
import illerpark1 from "@/assets/portfolio/illerpark-1.jpg";
import shinkenchiku1 from "@/assets/portfolio/shinkenchiku-1.jpg";
import europan11 from "@/assets/portfolio/europan11-1.jpg";
import aluartforum1 from "@/assets/portfolio/aluartforum-1.jpg";
import expo1 from "@/assets/portfolio/expo-1.jpg";

const portfolioProjects = [
  {
    title: "The New Ecological Porous Garden City",
    location: "Wernigerode, Germania",
    year: "2021",
    image: gardenCity1,
  },
  {
    title: "Novecentopiù'cento",
    location: "Milano, Italia",
    year: "Concorso",
    image: novecento1,
  },
  {
    title: "Wohnen am Illerpark",
    location: "Germania",
    year: "Concorso",
    image: illerpark1,
  },
  {
    title: "4 Houses - Shinkenchiku",
    location: "Internazionale",
    year: "Concorso",
    image: shinkenchiku1,
  },
  {
    title: "Europan 11 - Floating Blocks",
    location: "Leeuwarden, Paesi Bassi",
    year: "Runner up",
    image: europan11,
  },
  {
    title: "Aluartforum",
    location: "Croazia",
    year: "Concorso",
    image: aluartforum1,
  },
  {
    title: "Architetture di Servizio Expo",
    location: "Milano, Italia",
    year: "2015",
    image: expo1,
  },
];

const Experience = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');

  const openLightbox = (image: string, title: string) => {
    setLightboxImages([image]);
    setLightboxIndex(0);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <section id="progetti" className="py-20 md:py-28 border-t border-border">
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={() => {}}
        onNext={() => {}}
        title={lightboxTitle}
      />
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center">
            Concorsi e Progetti
          </p>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {portfolioProjects.map((project) => (
              <div
                key={project.title}
                className="group cursor-pointer"
                onClick={() => openLightbox(project.image, project.title)}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-muted mb-3">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-80"
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
        </div>
      </div>
    </section>
  );
};

export default Experience;
