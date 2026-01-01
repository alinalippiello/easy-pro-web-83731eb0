import { useState } from 'react';
import Lightbox from './Lightbox';

// Import portfolio images
import wernigerode1 from "@/assets/portfolio/wernigerode-1.jpg";
import wernigerode2 from "@/assets/portfolio/wernigerode-2.jpg";
import wernigerode3 from "@/assets/portfolio/wernigerode-3.jpg";
import wernigerodeAerial from "@/assets/portfolio/wernigerode-aerial.jpg";
import wernigerodeRender from "@/assets/portfolio/wernigerode-render.jpg";
import novecento1 from "@/assets/portfolio/novecento-1.jpg";
import novecento2 from "@/assets/portfolio/novecento-2.jpg";
import novecento3 from "@/assets/portfolio/novecento-3.jpg";
import novecento4 from "@/assets/portfolio/novecento-4.jpg";
import novecento5 from "@/assets/portfolio/novecento-5.jpg";
import novecento6 from "@/assets/portfolio/novecento-6.jpg";
import novecento7 from "@/assets/portfolio/novecento-7.jpg";
import novecentoNew1 from "@/assets/portfolio/novecento-new-1.jpg";
import novecentoNew2 from "@/assets/portfolio/novecento-new-2.jpg";
import illerpark1 from "@/assets/portfolio/illerpark-1.jpg";
import shinkenchiku1 from "@/assets/portfolio/shinkenchiku-1.jpg";
import europan11 from "@/assets/portfolio/europan11-1.jpg";
import aluartforum1 from "@/assets/portfolio/aluartforum-1.jpg";
import expo1 from "@/assets/portfolio/expo-1.jpg";

const portfolioProjects = [
  {
    title: "Città Giardino Permeabile - Progetto",
    location: "Wernigerode, Germania",
    year: "In corso",
    description: `La proposta sviluppa una visione urbana basata su tre livelli di porosità interconnessa.

A scala urbana, una rete di corridoi ecologici riconnette i frammenti naturali della città, infiltrandosi nella frammentazione contemporanea. L'area di progetto diventa baricentrica in questa nuova sinergia verde-blu tra il Bürgerpark e il fiume Holtemme, estendendo la connettività pedonale e ciclabile verso il centro storico.

A scala di quartiere, il progetto definisce spazi comuni e una struttura permeabile. La sommità della collina ospita un parco circolare con bosco urbano, aree gioco e un belvedere verso il castello. Nuovi orti si collegano a quelli esistenti, mentre percorsi pedonali superano le barriere ferroviarie. La mobilità viene ripensata con strade a traffico lento e connessioni pedonali verso il fiume.

Questa visione reinterpreta la città giardino: anziché un sistema radiale, propone cluster di spazi comuni interconnessi che trasformano la monofunzionalità urbana in un ecosistema poroso di accessibilità sociale e inclusione.`,
    author: "Alina Lippiello",
    collaborators: "Cope (Alice Covatta, Leonardo Zuccaro Marchi, Piero Medici)",
    images: [wernigerodeRender, wernigerodeAerial],
    thumbnail: wernigerodeRender,
  },
  {
    title: "Città Giardino Permeabile - Concorso",
    location: "Wernigerode, Germania",
    year: "2021",
    description: `Il progetto architettonico del concorso si articola su due aree complementari che dialogano con la topografia esistente.

Area Nord (32 alloggi) - In fase di realizzazione: L'edificio funge da porta urbana, connettendo il parco al quartiere. Le volumetrie ricuciono i blocchi lineari occidentali con le case isolate settentrionali, inserendosi armonicamente nel tessuto organico. Portali e tagli garantiscono permeabilità pubblica verso i percorsi ciclopedonali. Materiali sostenibili (legno e calcestruzzo), sistemi di gestione idrica circolare e produzione energetica caratterizzano l'intervento. La mixité tipologica favorisce composizioni sociali intergenerazionali, con spazi lavoro-abitazione e attività commerciali al piano terra.

Area Sud (25 alloggi): Ibrida la tipologia a schiera con coperture a falde e lineari, seguendo organicamente il sito. La porosità connette il parco circolare interno al museo tecnico ad ovest. Una serra fotovoltaica nel cortile permette produzione alimentare annuale, configurandosi come "padiglione agricolo". Orti condivisi, terrazze comuni e giardini privati completano il sistema di spazi aperti.`,
    author: "Alina Lippiello",
    collaborators: "Cope (Alice Covatta, Leonardo Zuccaro Marchi, Piero Medici)",
    images: [wernigerode1, wernigerode2, wernigerode3],
    thumbnail: wernigerode1,
  },
  {
    title: "Novecentopiù'cento",
    location: "Milano, Italia",
    year: "Concorso",
    description: `Il progetto intreccia la città con il percorso museale, creando una continuità con lo spazio pubblico del Museo del Novecento. La passerella connette il percorso museale pubblico tra i due Arengari senza interferire con le sequenze espositive, garantendo flessibilità e preservando l'organizzazione museale. Il percorso sospeso estende lo spazio collettivo urbano: il suolo di via Marconi si duplica per diventare collegamento, terrazza e spazio espositivo su piazza Duomo.

L'elemento di connessione stabilisce una continuità con i porticati della città storica, preserva il collegamento visivo tra la Galleria e la Torre Martini, definisce piazza Diaz e l'ingresso alle strutture museali. I due Arengari stabiliscono un dialogo attraverso la luce e installazioni ambientali.

Il tema della scatola nella scatola: i solai si susseguono sfalsati in un gioco di pieni e vuoti, creando doppie e triple altezze con una spazialità in grado di accogliere opere d'arte differenti. L'intervento è una grande macchina che permette differenti spazialità con elevata flessibilità museografica. Ambienti di dimensioni e altezze diverse consentono performance, esposizione di quadri, video, sculture e grandi installazioni.

L'intervento si sviluppa su una struttura autonoma. I muri esistenti fungono da filtro tra percorso ed esterno, mentre lo spazio interno è delimitato da una struttura reticolare rivestita da una filigrana metallica. In un gioco di trasparenze l'occhio del visitatore si sposta dal paesaggio urbano alle opere esposte. Pilastri, struttura reticolare, rete, muro – acciaio e pietra, elemento evanescente e massiccio – definiscono la sequenza degli elementi architettonici. Nell'opzione di collegamento sotterraneo, i due Arengari comunicano attraverso una corte espositiva ipogea connessa direttamente alla metropolitana.`,
    author: "Alina Lippiello",
    collaborators: "Leonardo Zuccaro Marchi, Iacopo Salce",
    images: [novecentoNew1, novecentoNew2, novecento4, novecento5, novecento6, novecento7],
    thumbnail: novecentoNew1,
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
