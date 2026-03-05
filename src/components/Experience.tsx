import { useState } from 'react';
import Lightbox from './Lightbox';
import { useLanguage } from '@/contexts/LanguageContext';

// Import portfolio images
import gardenCityMasterplan from "@/assets/portfolio/garden-city-masterplan.jpg";
import gardenCityPorosity from "@/assets/portfolio/garden-city-porosity.jpg";
import wernigerodeAerial2 from "@/assets/portfolio/wernigerode-aerial-2.jpg";
import wernigerodeRender from "@/assets/portfolio/wernigerode-render.jpg";
import wernigerodePlanNord from "@/assets/portfolio/wernigerode-plan-nord.jpg";
import wernigerodeRender2 from "@/assets/portfolio/wernigerode-render-2.jpg";
import wernigerodeSection from "@/assets/portfolio/wernigerode-section.jpg";
import wernigerodeElevation1 from "@/assets/portfolio/wernigerode-elevation-1.jpg";
import wernigerodeSectionsAbc from "@/assets/portfolio/wernigerode-sections-abc.jpg";
import wernigerodeTypologies from "@/assets/portfolio/wernigerode-typologies.jpg";
import wernigerodePorosityNorth from "@/assets/portfolio/wernigerode-porosity-north.jpg";
import wernigerodeMasterplan1 from "@/assets/portfolio/wernigerode-masterplan-1.jpg";
import wernigerodeAxonometric from "@/assets/portfolio/wernigerode-axonometric.jpg";
import wernigerodeCourtyard from "@/assets/portfolio/wernigerode-courtyard.jpg";
import wernigerodeEgPlan from "@/assets/portfolio/wernigerode-eg-plan.jpg";
import wernigerodeLageplan from "@/assets/portfolio/wernigerode-lageplan.jpg";
import wernigerodeAPiante from "@/assets/portfolio/wernigerode-a-piante.jpg";
import wernigerodeAProspetti from "@/assets/portfolio/wernigerode-a-prospetti.jpg";
import wernigerodeBPiante from "@/assets/portfolio/wernigerode-b-piante.jpg";
import wernigerodeBProspetti from "@/assets/portfolio/wernigerode-b-prospetti.jpg";
import novecento4 from "@/assets/portfolio/novecento-4.jpg";
import novecento5 from "@/assets/portfolio/novecento-5.jpg";
import novecento6 from "@/assets/portfolio/novecento-6.jpg";
import novecentoNew1 from "@/assets/portfolio/novecento-new-1.jpg";
import novecentoNew2 from "@/assets/portfolio/novecento-new-2.jpg";
import illerpark1 from "@/assets/portfolio/illerpark-1.jpg";
import illerpark2 from "@/assets/portfolio/illerpark-2.jpg";
import illerpark3 from "@/assets/portfolio/illerpark-3.jpg";
import illerpark5 from "@/assets/portfolio/illerpark-5.jpg";
import illerparkCover from "@/assets/portfolio/illerpark-cover.jpg";
import shinkenchiku1 from "@/assets/portfolio/shinkenchiku-1.jpg";
import europan11 from "@/assets/portfolio/europan11-1.jpg";
import wernigerodeModels from "@/assets/profile-models.png";
import ilicaMasterplan from "@/assets/portfolio/ilica-masterplan.jpg";
import ilicaCoperture from "@/assets/portfolio/ilica-coperture.jpg";
import ilicaPianoTerra from "@/assets/portfolio/ilica-piano-terra.jpg";
import ilicaPiano2 from "@/assets/portfolio/ilica-piano-2.jpg";
import ilicaPiano3 from "@/assets/portfolio/ilica-piano-3.jpg";
import expo1 from "@/assets/portfolio/expo-1.jpg";
import split1 from "@/assets/portfolio/split-1.jpg";
import split2 from "@/assets/portfolio/split-2.jpg";
import split3 from "@/assets/portfolio/split-3.jpg";
import split4 from "@/assets/portfolio/split-4.jpg";
import split5 from "@/assets/portfolio/split-5.jpg";
import split6 from "@/assets/portfolio/split-6.jpg";
import koresnica1 from "@/assets/portfolio/koresnica-1.jpg";
import koresnica2 from "@/assets/portfolio/koresnica-2.jpg";
import koresnica3 from "@/assets/portfolio/koresnica-3.jpg";
import koresnica4 from "@/assets/portfolio/koresnica-4.jpg";
import lorenteggio1 from "@/assets/portfolio/lorenteggio-1.jpg";
import lorenteggio2 from "@/assets/portfolio/lorenteggio-2.jpg";
import lorenteggio3 from "@/assets/portfolio/lorenteggio-3.jpg";
import lorenteggio4 from "@/assets/portfolio/lorenteggio-4.jpg";
import lorenteggio5 from "@/assets/portfolio/lorenteggio-5.jpg";
import zagrebBgg1 from "@/assets/portfolio/zagreb-bgg-1.jpg";
import zagrebBgg2 from "@/assets/portfolio/zagreb-bgg-2.jpg";
import zagrebBgg3 from "@/assets/portfolio/zagreb-bgg-3.jpg";
import zagrebBgg4 from "@/assets/portfolio/zagreb-bgg-4.jpg";
import zagrebBgg5 from "@/assets/portfolio/zagreb-bgg-5.jpg";
import zagrebBgg6 from "@/assets/portfolio/zagreb-bgg-6.jpg";
import zagrebBgg13 from "@/assets/portfolio/zagreb-bgg-13.jpg";
import zagrebBgg14 from "@/assets/portfolio/zagreb-bgg-14.jpg";
import zagrebBgg20 from "@/assets/portfolio/zagreb-bgg-20.jpg";
import zagrebBgg21 from "@/assets/portfolio/zagreb-bgg-21.jpg";

interface ProjectData {
  id: string;
  year: string;
  yearKey?: string;
  author?: string;
  collaborators?: string;
  images: string[];
  captions?: string[];
  thumbnail: string;
}

const projectsData: ProjectData[] = [
  {
    id: 'wernigerode1',
    yearKey: 'experience.inProgress',
    year: 'In corso',
    author: "Alina Lippiello",
    collaborators: `Co-Authors: Leonardo Zuccaro Marchi, Alice Covatta, Piero Medici
La Porosa | CoPE
With: H+L Hartung & Ludwig Architektur

Collaborators: Ereza Bokshi, Erica Boncaldo, Lorenzo Bucciarelli, Tarek Diebäcker, Andrea Fumero, Aziz Verna GergesHana, Sedat Gölada, Qian Hao, Alessia Pardi, Cagla Turkoglu, Ettore Varoni, Li Xinwei

Renders: Be Maarch

Concorso: Europan 16, Wernigerode, Germania, 2021`,
    images: [wernigerodeAerial2, wernigerodeRender, wernigerodeEgPlan, wernigerodeLageplan, wernigerodeAPiante, wernigerodeAProspetti, wernigerodeBPiante, wernigerodeBProspetti],
    captions: ["Vista aerea", "Render", "Planimetria generale", "Lageplan", "Haus A - Piante", "Haus A - Prospetti", "Haus B - Piante", "Haus B - Prospetti"],
    thumbnail: wernigerodeAerial2,
  },
  {
    id: 'wernigerode2',
    year: "Concorso",
    author: "Alina Lippiello",
    collaborators: `Co-Authors: Leonardo Zuccaro Marchi, Alice Covatta, Piero Medici
With: H+L Hartung & Ludwig Architektur

Collaborators: Ereza Bokshi, Erica Boncaldo, Lorenzo Bucciarelli, Tarek Diebäcker, Andrea Fumero, Aziz Verna GergesHana, Sedat Gölada, Qian Hao, Alessia Pardi, Cagla Turkoglu, Ettore Varoni, Li Xinwei

Renders: Be Maarch

Concorso: Europan 16, Wernigerode, Germania, 2021`,
    images: [wernigerodeModels, gardenCityMasterplan, gardenCityPorosity, wernigerodePorosityNorth, wernigerodePlanNord, wernigerodeSection, wernigerodeTypologies, wernigerodeRender2, wernigerodeMasterplan1, wernigerodeAxonometric, wernigerodeCourtyard, wernigerodeElevation1],
    thumbnail: wernigerodeModels,
  },
  {
    id: 'novecento',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    collaborators: "Leonardo Zuccaro Marchi, Iacopo Salce",
    images: [novecentoNew1, novecentoNew2, novecento4, novecento5, novecento6],
    thumbnail: novecento5,
  },
  {
    id: 'illerpark',
    yearKey: 'experience.competition',
    year: "Concorso",
    images: [illerparkCover, illerpark1, illerpark2, illerpark3, illerpark5],
    thumbnail: illerparkCover,
  },
  {
    id: 'shinkenchiku',
    yearKey: 'experience.competition',
    year: "Concorso",
    images: [shinkenchiku1],
    thumbnail: shinkenchiku1,
  },
  {
    id: 'europan11',
    year: "Runner up",
    images: [europan11],
    thumbnail: europan11,
  },
  {
    id: 'aluartforum',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    images: [ilicaMasterplan, ilicaCoperture, ilicaPianoTerra, ilicaPiano2, ilicaPiano3],
    captions: ['Masterplan 1:500', 'Coperture 1:500', 'Piano terra', 'Piano 1', 'Piano 2'],
    thumbnail: ilicaCoperture,
  },
  {
    id: 'expo',
    year: "2015",
    images: [expo1],
    thumbnail: expo1,
  },
  {
    id: 'split',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    collaborators: "Ivo Covic",
    images: [split1, split2, split3, split4, split5, split6],
    thumbnail: split4,
  },
  {
    id: 'koresnica',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    images: [koresnica1, koresnica2, koresnica3, koresnica4],
    thumbnail: koresnica1,
  },
  {
    id: 'lorenteggio',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    collaborators: "Leonardo Zuccaro Marchi",
    images: [lorenteggio1, lorenteggio2, lorenteggio3, lorenteggio4, lorenteggio5],
    thumbnail: lorenteggio1,
  },
  {
    id: 'zagrebBgg',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    collaborators: "Ivo Covic, Marco Visconti architects",
    images: [zagrebBgg1, zagrebBgg2, zagrebBgg3, zagrebBgg4, zagrebBgg20, zagrebBgg21, zagrebBgg5, zagrebBgg6, zagrebBgg13, zagrebBgg14],
    thumbnail: zagrebBgg1,
  },
];

const Experience = () => {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxCaptions, setLightboxCaptions] = useState<string[] | undefined>();
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [lightboxDescription, setLightboxDescription] = useState<string | undefined>();
  const [lightboxAuthor, setLightboxAuthor] = useState<string | undefined>();
  const [lightboxCollaborators, setLightboxCollaborators] = useState<string | undefined>();

  const openLightbox = (project: ProjectData, startIndex = 0) => {
    setLightboxImages(project.images);
    setLightboxCaptions(project.captions);
    setLightboxIndex(startIndex);
    setLightboxTitle(t(`project.${project.id}.title`));
    setLightboxDescription(t(`project.${project.id}.description`) !== `project.${project.id}.description` ? t(`project.${project.id}.description`) : undefined);
    setLightboxAuthor(project.author);
    setLightboxCollaborators(project.collaborators);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
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
        captions={lightboxCaptions}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
        title={lightboxTitle}
        description={lightboxDescription}
        author={lightboxAuthor}
        collaborators={lightboxCollaborators}
        onIndexChange={setLightboxIndex}
      />
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center">
            {t('experience.title')}
          </p>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                onClick={() => openLightbox(project)}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden mb-3 rounded-sm">
                  <img
                    src={project.thumbnail}
                    alt={t(`project.${project.id}.title`)}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg select-none pointer-events-none"
                  />
                </div>
                
                {/* Title */}
                <p className="font-body text-xs text-muted-foreground mb-1">
                  {project.yearKey ? t(project.yearKey) : project.year}
                </p>
                <h4 className="font-body text-sm font-normal leading-tight">
                  {t(`project.${project.id}.title`)}
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
