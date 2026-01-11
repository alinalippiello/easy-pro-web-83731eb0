import { useState } from 'react';
import Lightbox from './Lightbox';
import { useLanguage } from '@/contexts/LanguageContext';

// Import portfolio images
import wernigerode1 from "@/assets/portfolio/wernigerode-1.jpg";
import wernigerode2 from "@/assets/portfolio/wernigerode-2.jpg";
import wernigerode3 from "@/assets/portfolio/wernigerode-3.jpg";
import wernigerodeAerial from "@/assets/portfolio/wernigerode-aerial.jpg";
import wernigerodeRender from "@/assets/portfolio/wernigerode-render.jpg";
import novecento4 from "@/assets/portfolio/novecento-4.jpg";
import novecento5 from "@/assets/portfolio/novecento-5.jpg";
import novecento6 from "@/assets/portfolio/novecento-6.jpg";
import novecento7 from "@/assets/portfolio/novecento-7.jpg";
import novecentoNew1 from "@/assets/portfolio/novecento-new-1.jpg";
import novecentoNew2 from "@/assets/portfolio/novecento-new-2.jpg";
import novecento10 from "@/assets/portfolio/novecento-10.jpg";
import novecento11 from "@/assets/portfolio/novecento-11.jpg";
import illerpark1 from "@/assets/portfolio/illerpark-1.jpg";
import shinkenchiku1 from "@/assets/portfolio/shinkenchiku-1.jpg";
import europan11 from "@/assets/portfolio/europan11-1.jpg";
import aluartforum1 from "@/assets/portfolio/aluartforum-1.jpg";
import expo1 from "@/assets/portfolio/expo-1.jpg";
import split1 from "@/assets/portfolio/split-1.jpg";
import split2 from "@/assets/portfolio/split-2.jpg";
import split3 from "@/assets/portfolio/split-3.jpg";
import split4 from "@/assets/portfolio/split-4.jpg";
import split5 from "@/assets/portfolio/split-5.jpg";
import split6 from "@/assets/portfolio/split-6.jpg";
import split7 from "@/assets/portfolio/split-7.jpg";
import split8 from "@/assets/portfolio/split-8.jpg";
import split9 from "@/assets/portfolio/split-9.jpg";
import split10 from "@/assets/portfolio/split-10.jpg";
import split11 from "@/assets/portfolio/split-11.jpg";
import split12 from "@/assets/portfolio/split-12.jpg";
import koresnica1 from "@/assets/portfolio/koresnica-1.jpg";
import koresnica2 from "@/assets/portfolio/koresnica-2.jpg";
import koresnica3 from "@/assets/portfolio/koresnica-3.jpg";
import koresnica4 from "@/assets/portfolio/koresnica-4.jpg";
import lorenteggio1 from "@/assets/portfolio/lorenteggio-1.jpg";
import lorenteggio2 from "@/assets/portfolio/lorenteggio-2.jpg";
import lorenteggio3 from "@/assets/portfolio/lorenteggio-3.jpg";
import lorenteggio4 from "@/assets/portfolio/lorenteggio-4.jpg";
import lorenteggio5 from "@/assets/portfolio/lorenteggio-5.jpg";
import lorenteggio6 from "@/assets/portfolio/lorenteggio-6.jpg";
import lorenteggio7 from "@/assets/portfolio/lorenteggio-7.jpg";
import lorenteggio8 from "@/assets/portfolio/lorenteggio-8.jpg";
import zagrebBgg1 from "@/assets/portfolio/zagreb-bgg-1.jpg";
import zagrebBgg2 from "@/assets/portfolio/zagreb-bgg-2.jpg";
import zagrebBgg3 from "@/assets/portfolio/zagreb-bgg-3.jpg";
import zagrebBgg4 from "@/assets/portfolio/zagreb-bgg-4.jpg";
import zagrebBgg5 from "@/assets/portfolio/zagreb-bgg-5.jpg";
import zagrebBgg6 from "@/assets/portfolio/zagreb-bgg-6.jpg";
import zagrebBgg7 from "@/assets/portfolio/zagreb-bgg-7.jpg";
import zagrebBgg8 from "@/assets/portfolio/zagreb-bgg-8.jpg";
import zagrebBgg9 from "@/assets/portfolio/zagreb-bgg-9.jpg";
import zagrebBgg10 from "@/assets/portfolio/zagreb-bgg-10.jpg";
import zagrebBgg11 from "@/assets/portfolio/zagreb-bgg-11.jpg";
import zagrebBgg12 from "@/assets/portfolio/zagreb-bgg-12.jpg";
import zagrebBgg13 from "@/assets/portfolio/zagreb-bgg-13.jpg";
import zagrebBgg14 from "@/assets/portfolio/zagreb-bgg-14.jpg";
import zagrebBgg15 from "@/assets/portfolio/zagreb-bgg-15.jpg";
import zagrebBgg16 from "@/assets/portfolio/zagreb-bgg-16.jpg";
import zagrebBgg17 from "@/assets/portfolio/zagreb-bgg-17.jpg";
import zagrebBgg18 from "@/assets/portfolio/zagreb-bgg-18.jpg";
import zagrebBgg19 from "@/assets/portfolio/zagreb-bgg-19.jpg";
import zagrebBgg20 from "@/assets/portfolio/zagreb-bgg-20.jpg";
import zagrebBgg21 from "@/assets/portfolio/zagreb-bgg-21.jpg";
import zagrebBgg22 from "@/assets/portfolio/zagreb-bgg-22.jpg";
import zagrebBgg23 from "@/assets/portfolio/zagreb-bgg-23.jpg";
import zagrebBgg24 from "@/assets/portfolio/zagreb-bgg-24.jpg";
import zagrebBgg25 from "@/assets/portfolio/zagreb-bgg-25.jpg";
import zagrebBgg26 from "@/assets/portfolio/zagreb-bgg-26.jpg";
import zagrebBgg27 from "@/assets/portfolio/zagreb-bgg-27.jpg";
import zagrebBgg28 from "@/assets/portfolio/zagreb-bgg-28.jpg";
import zagrebBgg29 from "@/assets/portfolio/zagreb-bgg-29.jpg";
import zagrebBgg30 from "@/assets/portfolio/zagreb-bgg-30.jpg";

interface ProjectData {
  id: string;
  year: string;
  yearKey?: string;
  author?: string;
  collaborators?: string;
  images: string[];
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
    images: [wernigerodeRender, wernigerodeAerial],
    thumbnail: wernigerodeRender,
  },
  {
    id: 'wernigerode2',
    year: "2021",
    author: "Alina Lippiello",
    collaborators: `Co-Authors: Leonardo Zuccaro Marchi, Alice Covatta, Piero Medici
La Porosa | CoPE
With: H+L Hartung & Ludwig Architektur

Collaborators: Ereza Bokshi, Erica Boncaldo, Lorenzo Bucciarelli, Tarek Diebäcker, Andrea Fumero, Aziz Verna GergesHana, Sedat Gölada, Qian Hao, Alessia Pardi, Cagla Turkoglu, Ettore Varoni, Li Xinwei

Renders: Be Maarch

Concorso: Europan 16, Wernigerode, Germania, 2021`,
    images: [wernigerode1, wernigerode2, wernigerode3],
    thumbnail: wernigerode1,
  },
  {
    id: 'novecento',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    collaborators: "Leonardo Zuccaro Marchi, Iacopo Salce",
    images: [novecentoNew1, novecentoNew2, novecento4, novecento5, novecento6, novecento7, novecento10, novecento11],
    thumbnail: novecentoNew1,
  },
  {
    id: 'illerpark',
    yearKey: 'experience.competition',
    year: "Concorso",
    images: [illerpark1],
    thumbnail: illerpark1,
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
    images: [aluartforum1],
    thumbnail: aluartforum1,
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
    images: [split1, split2, split3, split4, split5, split6, split7, split8, split9, split10, split11, split12],
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
    images: [lorenteggio1, lorenteggio2, lorenteggio3, lorenteggio4, lorenteggio5, lorenteggio6, lorenteggio7, lorenteggio8],
    thumbnail: lorenteggio1,
  },
  {
    id: 'zagrebBgg',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    collaborators: "Ivo Covic, Marco Visconti architects",
    images: [zagrebBgg1, zagrebBgg2, zagrebBgg3, zagrebBgg4, zagrebBgg20, zagrebBgg21, zagrebBgg22, zagrebBgg23, zagrebBgg24, zagrebBgg25, zagrebBgg26, zagrebBgg27, zagrebBgg28, zagrebBgg29, zagrebBgg5, zagrebBgg6, zagrebBgg7, zagrebBgg8, zagrebBgg9, zagrebBgg10, zagrebBgg11, zagrebBgg12, zagrebBgg13, zagrebBgg14, zagrebBgg15, zagrebBgg30, zagrebBgg16, zagrebBgg17, zagrebBgg18, zagrebBgg19],
    thumbnail: zagrebBgg1,
  },
];

const Experience = () => {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [lightboxDescription, setLightboxDescription] = useState<string | undefined>();
  const [lightboxAuthor, setLightboxAuthor] = useState<string | undefined>();
  const [lightboxCollaborators, setLightboxCollaborators] = useState<string | undefined>();

  const openLightbox = (project: ProjectData, startIndex = 0) => {
    setLightboxImages(project.images);
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
