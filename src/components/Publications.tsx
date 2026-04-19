import { useLanguage } from "@/contexts/LanguageContext";
import bariCover from "@/assets/publications/bari-studi-per-la-metropoli.jpg";
import stazioniCover from "@/assets/publications/stazioni-un-sipario-urbano.jpg";
import newYorkMilanoCover from "@/assets/publications/new-york-milano.jpg";

const Publications = () => {
  const { t } = useLanguage();

  const publications = [
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

  return (
    <section id="pubblicazioni" className="py-20 md:py-28 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center">
            {t('publications.title')}
          </p>

          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8 pb-6 border-b border-border last:border-b-0"
              >
                <p className="font-body text-xs text-muted-foreground md:w-16 shrink-0 md:pt-1">
                  {pub.year}
                </p>
                {pub.cover && (
                  <img
                    src={pub.cover}
                    alt={pub.publication}
                    loading="lazy"
                    className="w-20 md:w-24 h-auto object-contain shrink-0"
                  />
                )}
                <div className="flex-1 md:pt-1">
                  <p className="font-body text-sm font-normal">
                    "{pub.title}", in <em>{pub.publication}</em>
                  </p>
                  {(pub as any).link && (
                    <p className="mt-1">
                      <a
                        href={(pub as any).link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground transition-smooth"
                      >
                        {t('publications.viewLink')}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
