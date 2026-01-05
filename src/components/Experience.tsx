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
    thumbnail: split1,
  },
  {
    id: 'koresnica',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    images: [koresnica1, koresnica2, koresnica3, koresnica4],
    thumbnail: koresnica1,
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
    <section id="progetti" className="py-20 md:py-32">
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
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <h2 className="font-body text-xl md:text-2xl font-normal text-center mb-4">
            {t('experience.title')}
          </h2>
          <p className="font-body text-sm text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>

          {/* Portfolio Grid - Elemental style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                onClick={() => openLightbox(project)}
              >
                {/* Square Image */}
                <div className="aspect-square overflow-hidden mb-4">
                  <img
                    src={project.thumbnail}
                    alt={t(`project.${project.id}.title`)}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                
                {/* Two-line title like Elemental */}
                <p className="font-body text-xs text-muted-foreground mb-0.5">
                  {project.yearKey ? t(project.yearKey) : project.year}
                </p>
                <h4 className="font-body text-sm font-medium leading-tight">
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
