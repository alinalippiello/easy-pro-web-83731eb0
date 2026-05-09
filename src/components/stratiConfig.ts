// ─────────────────────────────────────────────────────────────
// STRATI — central configuration
// Edit this file to manage images, default keywords and descriptions.
// Runtime overrides (made from the Lightbox) live in Lovable Cloud
// and take precedence over these defaults.
// ─────────────────────────────────────────────────────────────

import origine1 from '@/assets/portfolio/origine-1.jpg';
import origine2 from '@/assets/portfolio/origine-2.jpg';
import origine3 from '@/assets/portfolio/origine-3.jpg';
import origine4 from '@/assets/portfolio/origine-4.png';
import origine5 from '@/assets/portfolio/origine-5.png';
import stratiModel1 from '@/assets/portfolio/strati-model-1.png';
import stratiRender1 from '@/assets/portfolio/strati-render-1.png';
import stratiAerial1 from '@/assets/portfolio/strati-aerial-1.png';
import stratiAerial2 from '@/assets/portfolio/strati-aerial-2.png';
import stratiSketch1 from '@/assets/portfolio/strati-sketch-1.png';
import stratiUrban1 from '@/assets/portfolio/strati-urban-1.png';
import stratiRender3 from '@/assets/portfolio/strati-render-3.png';
import stratiTopo1 from '@/assets/portfolio/strati-topo-1.png';
import stratiTopo2 from '@/assets/portfolio/strati-topo-2.png';
import stratiRender4 from '@/assets/portfolio/strati-render-4.png';

// Concept = a keyword (title) + extended phrase shown in the Lightbox.
export interface Concept {
  key: string;
  title: string;
  phrase: string;
}

// Default concepts (seed). New ones added from the Lightbox are saved
// in Lovable Cloud and merged on top of these.
export const defaultConcepts: Concept[] = [
  { key: 'innestare',    title: 'INNESTARE',    phrase: 'Abitare una condizione esistente senza cancellarne la memoria.' },
  { key: 'piegare',      title: 'PIEGARE',      phrase: 'Trasformare il paesaggio in spazio attraversabile.' },
  { key: 'dissolvere',   title: 'DISSOLVERE',   phrase: 'Superare il limite tra figura, infrastruttura e paesaggio.' },
  { key: 'porosita',     title: 'POROSITÀ',     phrase: 'Aprire il costruito a flussi ecologici, sociali e visivi.' },
  { key: 'stratificare', title: 'STRATIFICARE', phrase: 'Far emergere il tempo attraverso materia e territorio.' },
  { key: 'mat-building', title: 'MAT-BUILDING', phrase: 'Costruire continuità attraverso densità, ripetizione e relazione.' },
];

// Source tile = one image in the mosaic + its default keyword/description.
export interface SourceTile {
  id: string;
  cover: string;
  alt: string;
  conceptKey?: string;
  description?: string;
}

export const sourceTiles: SourceTile[] = [
  { id: 'piega',       cover: origine1,      alt: 'Schema concettuale della piega — ricerca tipologica', conceptKey: 'piegare' },
  { id: 'tessuto',     cover: stratiAerial1, alt: 'Vista aerea del tessuto urbano',                      conceptKey: 'mat-building' },
  { id: 'materia',     cover: origine4,      alt: 'Modello fisico — studio della materia' },
  { id: 'innesto',     cover: origine3,      alt: 'Disegno planimetrico — innesto urbano',               conceptKey: 'innestare' },
  { id: 'topografia',  cover: stratiTopo1,   alt: 'Pianta topografica del sito di progetto',             conceptKey: 'stratificare' },
  { id: 'chiaroscuro', cover: origine2,      alt: 'Studio chiaroscurale di volumi architettonici' },
  { id: 'porto',       cover: stratiAerial2, alt: 'Vista aerea area portuale — masterplan',              conceptKey: 'porosita' },
  { id: 'segno',       cover: stratiSketch1, alt: 'Schizzo di progetto — segno fondativo' },
  { id: 'waterfront',  cover: stratiRender1, alt: 'Render waterfront e fronte urbano',                   conceptKey: 'dissolvere' },
  { id: 'quartiere',   cover: stratiModel1,  alt: 'Modello di studio quartiere residenziale',            conceptKey: 'mat-building' },
  { id: 'continuita',  cover: origine5,      alt: 'Modello volumetrico — studio di continuità' },
  { id: 'facciata',    cover: stratiRender3, alt: 'Render — studio di facciata residenziale',            conceptKey: 'innestare' },
  { id: 'topografia2', cover: stratiTopo2,   alt: 'Pianta topografica — variante di progetto',           conceptKey: 'stratificare' },
  { id: 'nodo',        cover: stratiUrban1,  alt: 'Schema urbano — nodo infrastrutturale',               conceptKey: 'porosita' },
  { id: 'orizzonte',   cover: stratiRender4, alt: 'Render prospettico — orizzonte urbano',               conceptKey: 'dissolvere' },
];

// Reusable description templates available from the Lightbox dropdown.
export interface DescriptionTemplate {
  id: string;
  label: string;
  text: string;
}

export const descriptionTemplates: DescriptionTemplate[] = [
  { id: 'concept',    label: 'Concept',    text: 'Studio concettuale che esplora la relazione tra forma costruita e contesto, indagando il rapporto tra figura, suolo e paesaggio.' },
  { id: 'masterplan', label: 'Masterplan', text: 'Disegno urbano alla scala del territorio: definizione di tessuti, percorsi e relazioni con le preesistenze morfologiche e infrastrutturali.' },
  { id: 'tipologia',  label: 'Tipologia',  text: "Ricerca tipologica sull'unità abitativa e sulle sue aggregazioni, con attenzione a soglie, distribuzioni e affacci." },
  { id: 'materia',    label: 'Materia',    text: 'Indagine sulla materia costruttiva: textures, stratificazioni e comportamento della luce sulle superfici.' },
];

// Maximum number of text-only tiles inserted into the mosaic.
export const MAX_TEXT_TILES = 11;

// Helper to derive a slug-key from a free-text keyword typed in the Lightbox.
export const slugifyKey = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
