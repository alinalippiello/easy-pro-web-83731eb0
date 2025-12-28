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
interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  projects?: string[];
  description?: string;
}

const experiences: ExperienceItem[] = [
  {
    period: "2021 — Oggi",
    role: "Ideazione e Progettazione",
    company: "GWW Wernigerode mbH",
    projects: ["New Ecological Porous Garden City of Wernigerode"],
    description: "Progetto residenziale di 3000 m² in fase di sviluppo. Collaborazione con Cope e H+L Hartung & Ludwig Architektur.",
  },
];

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
    <section id="esperienza" className="py-24 md:py-32 bg-card">
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
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Section Label */}
          <div className="md:col-span-3">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground sticky top-24">
              02 — Esperienza
            </p>
          </div>

          {/* Content */}
          <div className="md:col-span-9">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-16">
              Oltre 20 anni di progetti <br className="hidden md:block" />
              tra Italia ed Europa
            </h2>

            <div className="space-y-0">
              {experiences.map((exp, index) => (
                <article
                  key={index}
                  className="group py-8 border-t border-border first:border-t-0 hover:bg-background/50 transition-smooth -mx-6 px-6"
                >
                  <div className="grid md:grid-cols-12 gap-4 md:gap-8">
                    {/* Period */}
                    <div className="md:col-span-2">
                      <p className="font-body text-sm text-muted-foreground">
                        {exp.period}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-10">
                      <h3 className="font-display text-xl md:text-2xl font-medium mb-1 group-hover:translate-x-1 transition-smooth">
                        {exp.company}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground mb-4">
                        {exp.role}
                      </p>

                      {exp.projects && (
                        <div className="flex flex-wrap gap-2">
                          {exp.projects.map((project) => (
                            <span
                              key={project}
                              className="font-body text-xs px-3 py-1.5 bg-secondary text-secondary-foreground rounded-sm"
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      )}

                      {exp.description && (
                        <p className="font-body text-sm text-muted-foreground mt-4 max-w-xl">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Portfolio Projects with Images */}
            <div className="mt-16 pt-12 border-t border-border">
              <h3 className="font-display text-2xl font-light mb-8">
                Progetti in Portfolio
              </h3>
              <div className="space-y-16">
                {portfolioProjects.map((project) => (
                  <div
                    key={project.title}
                    className="group"
                  >
                    <div className="mb-6">
                      <p className="font-body text-xs text-muted-foreground mb-2">
                        {project.year}
                      </p>
                      <h4 className="font-display text-xl md:text-2xl font-medium mb-1">
                        {project.title}
                      </h4>
                      <p className="font-body text-sm text-primary mb-3">
                        {project.location}
                      </p>
                      <p className="font-body text-sm text-muted-foreground max-w-2xl">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Image Gallery with Elegant Hover */}
                    <div className={`grid gap-4 ${project.images.length === 1 ? 'grid-cols-1 max-w-2xl' : project.images.length === 2 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                      {project.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          onClick={() => openLightbox(project.images, imgIndex, project.title)}
                          className="group/img relative aspect-[16/10] overflow-hidden bg-muted cursor-pointer"
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Immagine ${imgIndex + 1}`}
                            className="w-full h-full object-cover transition-all duration-500 group-hover/img:scale-110"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-all duration-300" />
                          {/* Content */}
                          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover/img:opacity-100 transition-all duration-300 translate-y-2 group-hover/img:translate-y-0">
                            <p className="font-body text-xs text-background/70 mb-1">
                              {project.location}
                            </p>
                            <h5 className="font-display text-sm md:text-base font-medium text-background leading-tight">
                              {project.title}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitions */}
            <div className="mt-16 pt-12 border-t border-border">
              <h3 className="font-display text-2xl font-light mb-8">
                Concorsi Internazionali
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Europan 11", result: "Secondo classificato" },
                  { name: "Europan 13", result: "Bergen, Norvegia" },
                  { name: "Europan 16", result: "Wernigerode, Germania" },
                  { name: "Planetario di Matera", result: "Primo classificato" },
                  { name: "Biblioteca di Maranello", result: "2010" },
                ].map((competition) => (
                  <div
                    key={competition.name}
                    className="p-6 bg-background border border-border hover:border-foreground/20 transition-smooth"
                  >
                    <h4 className="font-display text-lg font-medium mb-1">
                      {competition.name}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      {competition.result}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
