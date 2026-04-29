// SEO-friendly slug map and per-project meta descriptions.
// Source of truth used by the router, sitemap, and the dynamic <head> updates
// when an overlay is opened via /progetti/<slug>.

export interface ProjectSeo {
  id: string;            // matches projectsData[].id in Experience.tsx
  slug: string;          // SEO-friendly URL segment
  title: string;         // human title used in <title>
  description: string;   // <meta name="description">
  location?: string;
  // Original source filename of the thumbnail (basename without hash).
  // Used by scripts/prerender.mjs to resolve hashed asset URLs in dist/.
  thumbnailSource: string;
}

export const projectsSeo: ProjectSeo[] = [
  {
    id: 'wernigerode1',
    slug: 'wernigerode-fase-1',
    title: 'Wernigerode — Fase 1 | Concorso Europan 16',
    description:
      "Concorso di architettura Europan 16 a Wernigerode: progettazione tipologica e modelli abitativi per un nuovo quartiere residenziale poroso.",
    location: 'Wernigerode',
  },
  {
    id: 'wernigerode2',
    slug: 'wernigerode-fase-2',
    title: 'Wernigerode — Fase 2 | Sviluppo progettuale',
    description:
      "Sviluppo del concorso Europan 16 a Wernigerode: dettagli architettonici, sistema di facciata e definizione tipologica del complesso residenziale.",
    location: 'Wernigerode',
  },
  {
    id: 'novecento',
    slug: 'novecento-piu-cento-museo',
    title: 'Novecentopiùcento | Concorso museo del Novecento, Milano',
    description:
      "Concorso di architettura per l'ampliamento del Museo del Novecento di Milano: innesto urbano e dialogo tra acciaio contemporaneo e massa storica in pietra.",
    location: 'Milano',
  },
  {
    id: 'illerpark',
    slug: 'wohnen-am-illerpark-neu-ulm',
    title: 'Wohnen am Illerpark | Concorso residenziale, Neu-Ulm',
    description:
      "Concorso di architettura per un complesso residenziale a Neu-Ulm: ricerca tipologica, modelli abitativi e relazione con il parco fluviale dell'Iller.",
    location: 'Neu-Ulm',
  },
  {
    id: 'shinkenchiku',
    slug: 'shinkenchiku-4-houses',
    title: '4 Houses | Concorso Shinkenchiku Residential Design',
    description:
      "Concorso internazionale Shinkenchiku Residential Design: quattro case come ricerca tipologica sui modelli abitativi e sul rapporto tra abitare e suolo comune.",
  },
  {
    id: 'europan11',
    slug: 'europan-11-floating-blocks-venezia',
    title: 'Floating Blocks | Concorso Europan 11, Venezia-Marghera',
    description:
      "Concorso Europan 11 a Venezia-Marghera: progetto urbano per blocchi residenziali galleggianti, ricerca tipologica e nuovi modelli abitativi sostenibili.",
    location: 'Venezia-Marghera',
  },
  {
    id: 'aluartforum',
    slug: 'aluartforum-ilica-residenze',
    title: 'AluArtForum Ilica | Concorso residenze, Zagabria',
    description:
      "Concorso di architettura AluArtForum a Zagabria: complesso residenziale Ilica, ricerca tipologica e progettazione urbana lungo la principale arteria storica.",
    location: 'Zagabria',
  },
  {
    id: 'expo',
    slug: 'expo-milano-2015-cluster',
    title: 'Expo Milano 2015 | Cluster espositivo',
    description:
      "Progetto per Expo Milano 2015: architettura del cluster espositivo, ricerca sul suolo comune e sui modelli di aggregazione tra padiglioni.",
    location: 'Milano',
  },
  {
    id: 'split',
    slug: 'split-mat-building-diocleziano',
    title: 'Split | Concorso urbano sul Palazzo di Diocleziano',
    description:
      "Concorso di architettura a Spalato: mat-building come dispositivo di ricucitura tra il Palazzo di Diocleziano, i bastioni e il fronte mare.",
    location: 'Split',
  },
  {
    id: 'koresnica',
    slug: 'koresnica-paesaggio-rurale',
    title: 'Koresnica | Progetto di paesaggio rurale',
    description:
      "Progetto di architettura del paesaggio a Koresnica: ricerca tipologica sui modelli insediativi minimi e sul rapporto tra costruito e territorio agricolo.",
    location: 'Koresnica',
  },
  {
    id: 'lorenteggio',
    slug: 'lorenteggio-rigenerazione-urbana-milano',
    title: 'Lorenteggio | Rigenerazione urbana, Milano',
    description:
      "Progetto di rigenerazione urbana per il quartiere Lorenteggio a Milano: ricerca tipologica, modelli abitativi e ridefinizione dello spazio pubblico.",
    location: 'Milano',
  },
  {
    id: 'zagrebBgg',
    slug: 'zagreb-bggp-spazio-pubblico',
    title: 'Zagreb BGGP | Concorso spazio pubblico, Zagabria',
    description:
      "Concorso di architettura BGGP a Zagabria: progetto di rigenerazione dello spazio pubblico e ricerca tipologica sul margine urbano.",
    location: 'Zagabria',
  },
];

export const slugToProject = new Map(projectsSeo.map((p) => [p.slug, p]));
export const idToProject = new Map(projectsSeo.map((p) => [p.id, p]));
