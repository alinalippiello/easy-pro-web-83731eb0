import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Lightbox from "@/components/Lightbox";
import bariCover from "@/assets/publications/bari-studi-per-la-metropoli.jpg";
import stazioniCover from "@/assets/publications/stazioni-un-sipario-urbano.jpg";
import newYorkMilanoCover from "@/assets/publications/new-york-milano.jpg";
import europan11Cover from "@/assets/publications/europan-11.jpg";

interface Publication {
  year: string;
  title: string;
  publication: string;
  type: string;
  cover?: string;
  link?: string;
}

const Publications = () => {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePub, setActivePub] = useState<Publication | null>(null);

  const publications: Publication[] = [
    {
      year: "2021",
      title: "Europan 16: Living the New Ecological Porous Garden City of Wernigerode",
      publication: "Europan Europe",
      type: "Winner - Lotto Nord",
    },
    {
      year: "2011",
      title: "Europan 11: Floating Blocks",
      publication: "Europan Europe",
      type: "Publication",
      cover: europan11Cover,
      link: "https://www.europan-europe.eu/en/project-and-processes/floating-blocks",
    },
    {
      year: "2007",
      title: "Innestare, duplicare, piegare, p. 119",
      publication: "New York - Milano: disegno della città per la regione urbana",
      type: "Article",
      cover: newYorkMilanoCover,
    },
    {
      year: "2006",
      title: "Città e ferrovia",
      publication: "STAZIONI, un sipario urbano",
      type: "Article",
      cover: stazioniCover,
    },
    {
      year: "2005",
      title: "Moltiplicare il suolo, p. 117-121",
      publication: "Bari, studi per la metropoli",
      type: "Article",
      cover: bariCover,
    },
    {
      year: "1995",
      title: "Edificio residenziale a Milano in Via Gian Giacomo Mora",
      publication: "Documenti di Tecnologia dell'architettura. PROGETTI DIDATTICI 3",
      type: "Article",
    },
  ];

  const openLightbox = (pub: Publication) => {
    if (!pub.cover) return;
    setActivePub(pub);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <section id="pubblicazioni" className="py-20 md:py-28 border-t border-border">
      {activePub?.cover && (
        <Lightbox
          images={[activePub.cover]}
          currentIndex={0}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onPrev={() => {}}
          onNext={() => {}}
          title={activePub.publication}
          description={`"${activePub.title}"`}
          link={activePub.link ? { url: activePub.link, label: t('publications.viewLink') } : undefined}
        />
      )}
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center">
            {t('publications.title')}
          </p>

          {/* Tiles grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {publications.map((pub, index) => (
              <div
                key={index}
                className={`group ${pub.cover ? 'cursor-pointer' : ''}`}
                onClick={() => openLightbox(pub)}
              >
                {/* Cover slot */}
                <div className="aspect-[4/3] overflow-hidden mb-3 rounded-sm">
                  {pub.cover && (
                    <img
                      src={pub.cover}
                      alt={pub.publication}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg select-none pointer-events-none"
                    />
                  )}
                </div>

                {/* Year + title */}
                <p className="font-body text-xs text-muted-foreground mb-1">
                  {pub.year}
                </p>
                <h4 className="font-body text-sm font-normal leading-tight">
                  {pub.title}
                </h4>
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block mt-2 font-body text-xs text-foreground underline underline-offset-4 hover:text-muted-foreground transition-smooth"
                  >
                    {t('publications.viewLink')}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
