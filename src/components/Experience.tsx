import { useState } from 'react';
import Lightbox from './Lightbox';

// Import portfolio images
import wernigerode1 from "@/assets/portfolio/wernigerode-1.jpg";
import wernigerode2 from "@/assets/portfolio/wernigerode-2.jpg";
import wernigerode3 from "@/assets/portfolio/wernigerode-3.jpg";
import wernigerodeAerial from "@/assets/portfolio/wernigerode-aerial.jpg";
import wernigerodeRender from "@/assets/portfolio/wernigerode-render.jpg";
import novecento1 from "@/assets/portfolio/novecento-1.jpg";
import illerpark1 from "@/assets/portfolio/illerpark-1.jpg";
import shinkenchiku1 from "@/assets/portfolio/shinkenchiku-1.jpg";
import europan11 from "@/assets/portfolio/europan11-1.jpg";
import aluartforum1 from "@/assets/portfolio/aluartforum-1.jpg";
import expo1 from "@/assets/portfolio/expo-1.jpg";

const portfolioProjects = [
  {
    title: "Abitare la Nuova Città Giardino Ecologica Permeabile",
    location: "Wernigerode, Germania",
    year: "2021",
    description: "Un intervento urbano che ridefinisce il concetto di densità abitativa attraverso una rete di corridoi verdi interconnessi. Il progetto propone un sistema di porosità urbana che integra residenze, spazi produttivi e paesaggio naturale, creando una nuova tipologia di quartiere sostenibile che dialoga con la topografia esistente.",
    author: "Alina Lippiello",
    collaborators: "Leonardo Zuccaro Marchi, Piero Medici, Alice Covatta",
    images: [wernigerodeRender, wernigerodeAerial, wernigerode1, wernigerode2, wernigerode3],
    thumbnail: wernigerodeRender,
  },
  {
    title: "Novecentopiù'cento",
    location: "Milano, Italia",
    year: "Concorso",
    images: [novecento1],
    thumbnail: novecento1,
  },
  {
    title: "Wohnen am Illerpark",
    location: "Germania",
    year: "Concorso",
    images: [illerpark1],
    thumbnail: illerpark1,
  },
  {
    title: "4 Houses - Shinkenchiku",
    location: "Internazionale",
    year: "Concorso",
    images: [shinkenchiku1],
    thumbnail: shinkenchiku1,
  },
  {
    title: "Europan 11 - Floating Blocks",
    location: "Leeuwarden, Paesi Bassi",
    year: "Runner up",
    images: [europan11],
    thumbnail: europan11,
  },
  {
    title: "Aluartforum",
    location: "Croazia",
    year: "Concorso",
    images: [aluartforum1],
    thumbnail: aluartforum1,
  },
  {
    title: "Architetture di Servizio Expo",
    location: "Milano, Italia",
    year: "2015",
    images: [expo1],
    thumbnail: expo1,
  },
];

const Experience = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);

  const openLightbox = (project: typeof portfolioProjects[0], startIndex = 0) => {
    setLightboxImages(project.images);
    setLightboxIndex(startIndex);
    setLightboxTitle(project.title);
    setSelectedProject(project);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedProject(null);
  };

  const goToPrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="progetti" className="py-20 md:py-28 border-t border-border">
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
        title={lightboxTitle}
        description={selectedProject?.description}
        author={selectedProject?.author}
        collaborators={selectedProject?.collaborators}
        onIndexChange={setLightboxIndex}
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
                onClick={() => openLightbox(project)}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-muted mb-3">
                  <img
                    src={project.thumbnail}
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
