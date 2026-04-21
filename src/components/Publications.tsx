import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Lightbox from "@/components/Lightbox";
import bariCover from "@/assets/publications/bari-studi-per-la-metropoli.jpg";
import stazioniCover from "@/assets/publications/stazioni-un-sipario-urbano.jpg";
import newYorkMilanoCover from "@/assets/publications/new-york-milano.jpg";
import europan11Cover from "@/assets/publications/europan-11.jpg";
import wernigerodeCover from "@/assets/publications/wernigerode-goes-modern.jpg";

interface Publication {
  year: string;
  title: string;
  fullTitle?: string;
  publication: string;
  type: string;
  cover?: string;
  link?: string;
  pdfLink?: string;
  summary?: string;
}

const Publications = () => {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePub, setActivePub] = useState<Publication | null>(null);

  const publications: Publication[] = [
    {
      year: "2023",
      title: "Wernigerode goes modern",
      publication: "Stadt und Quartier, DW 07/2023",
      type: "Article",
      cover: wernigerodeCover,
      pdfLink: "/publications/wernigerode-goes-modern.pdf",
      summary: "Il progetto Living the new ecological Porous Garden City, sviluppato nell'ambito di Europan 16, è presentato come caso studio di trasformazione urbana orientata al futuro.\n\nL'intervento interpreta il tema dell'abitare contemporaneo attraverso il concetto di città porosa, introducendo una struttura aperta, attraversabile, capace di integrare spazio costruito e paesaggio.\n\nL'articolo documenta il processo che ha condotto dalla fase concorsuale allo sviluppo progettuale, evidenziando il ruolo della collaborazione europea e il confronto con il contesto normativo e costruttivo tedesco.",
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
      title: "Città e ferrovia, pag. 55-71",
      fullTitle: "Città e ferrovia — Sintesi del saggio di Alina Lippiello in \"Stazioni – un sipario urbano\", Alinea Editrice. pag. 55-71",
      publication: "STAZIONI, un sipario urbano",
      type: "Article",
      cover: stazioniCover,
      summary: "Fin dalle origini la ferrovia introduce trasformazioni profonde nella struttura del territorio. Le rotaie disegnano una geometria euclidea che si confronta con la morfologia del paesaggio. I luoghi si avvicinano, il viaggio diventa intervallo tra partenza e arrivo, il paesaggio diviene panorama.\n\nLa tipologia della grande stazione ottocentesca denuncia il conflitto tra sostenitori e denigratori della nuova macchina urbana. Da un lato il fabbricato passeggeri, progettato dall'architetto con carattere rappresentativo verso la città; dall'altro la galleria dei treni, progettata dall'ingegnere con le grandi coperture in ferro e vetro. La storia del tipo edilizio si articola in tre periodi: la trazione a carbone nel XIX secolo, la trazione elettrica dal 1900, e il periodo legato alle nuove esigenze d'uso delle stazioni nella città contemporanea. In Italia le stazioni che meglio riescono a mediare tra le due dimensioni sono Santa Maria Novella a Firenze e Roma Termini: la trasparenza e i varchi mettono in contatto i percorsi del cittadino e del viaggiatore. Il rapporto tra città e ferrovia attraversa tre fasi: una prima di polarizzazione, in cui la stazione diventa la direttrice di espansione principale; una seconda di barriera, in cui le infrastrutture ferroviarie costituiscono un confine fisico insuperabile; una terza di cesura, in cui lungo l'asta della ferrovia si consolida un tessuto eterogeneo di aree degradate. Alcune esperienze europee e americane dimostrano però come la riorganizzazione della rete ferroviaria possa rappresentare un'occasione per riqualificare i tessuti più degradati e integrare morfologicamente la rete nel tessuto urbano.\n\nLa stazione contemporanea non è più solo un punto di partenza e arrivo ma un nodo intermodale che accoglie flussi diversi: ferrovia, metropolitana, trasporto pubblico, mobilità privata. Non è più un edificio con una facciata urbana e un retro sulla ferrovia, ma un organismo complesso accessibile da più lati, elemento di ricucitura urbana. La stazione di Atocha di Rafael Moneo a Madrid ne è l'esempio più significativo: la grande sala dei treni viene trasformata in un polo urbano con funzioni che vanno ben oltre il viaggio.\n\nLa città è oggi comprensibile solo come sistema di reti e nodi, e la stazione è il punto in cui si incrociano flussi di persone, mezzi e informazioni a scala locale, nazionale e internazionale. Con l'introduzione dell'alta velocità il tempo sostituisce la distanza come misura del viaggio. Le nuove stazioni perdono la loro monumentalità, tendono a mimetizzarsi nel paesaggio urbano e adottano sempre più l'estetica dell'aeroporto: spazi strutturati dalla dinamica dei flussi, luoghi di passaggio ma anche di relazione e consumo per le grandi masse.",
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
          description={activePub.summary ? `"${activePub.fullTitle ?? activePub.title}"\n\n${activePub.summary}` : `"${activePub.fullTitle ?? activePub.title}"`}
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
                {pub.pdfLink && (
                  <a
                    href={pub.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block mt-2 font-body text-xs text-foreground underline underline-offset-4 hover:text-muted-foreground transition-smooth"
                  >
                    {t('publications.downloadPdf')}
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
