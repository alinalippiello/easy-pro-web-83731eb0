import { useState } from 'react';
import Lightbox from './Lightbox';
import { useLanguage } from '@/contexts/LanguageContext';

// Import portfolio images
import gardenCityMasterplan from "@/assets/portfolio/garden-city-masterplan.jpg";
import gardenCityPorosity from "@/assets/portfolio/garden-city-porosity.jpg";
import gardenCityContext from "@/assets/portfolio/garden-city-context.jpg";
import gardenCity4 from "@/assets/portfolio/garden-city-4.jpg";
import gardenCity5 from "@/assets/portfolio/garden-city-5.jpg";
import gardenCity6 from "@/assets/portfolio/garden-city-6.jpg";
import gardenCity7 from "@/assets/portfolio/garden-city-7.jpg";
import gardenCity8 from "@/assets/portfolio/garden-city-8.jpg";
import wernigerodeAerial from "@/assets/portfolio/wernigerode-aerial.jpg";
import wernigerodeAerial2 from "@/assets/portfolio/wernigerode-aerial-2.jpg";
import wernigerodeRender from "@/assets/portfolio/wernigerode-render.jpg";
import wernigerodePlanNord from "@/assets/portfolio/wernigerode-plan-nord.jpg";
import wernigerodeRender2 from "@/assets/portfolio/wernigerode-render-2.jpg";
import wernigerodeSection from "@/assets/portfolio/wernigerode-section.jpg";
import wernigerodeLevel0 from "@/assets/portfolio/wernigerode-level0.jpg";
import wernigerodeLevel1 from "@/assets/portfolio/wernigerode-level1.jpg";
import wernigerodeLevel2 from "@/assets/portfolio/wernigerode-level2.jpg";
import wernigerodeLevel3 from "@/assets/portfolio/wernigerode-level3.jpg";
import wernigerodeLevel4 from "@/assets/portfolio/wernigerode-level4.jpg";
import wernigerodeRoof from "@/assets/portfolio/wernigerode-roof.jpg";
import wernigerodeElevation1 from "@/assets/portfolio/wernigerode-elevation-1.jpg";
import wernigerodeElevation2 from "@/assets/portfolio/wernigerode-elevation-2.jpg";
import wernigerodeElevation3 from "@/assets/portfolio/wernigerode-elevation-3.jpg";
import wernigerodeElevation4 from "@/assets/portfolio/wernigerode-elevation-4.jpg";
import wernigerodeSectionsAbc from "@/assets/portfolio/wernigerode-sections-abc.jpg";
import wernigerodeSectionsDefg from "@/assets/portfolio/wernigerode-sections-defg.jpg";
import wernigerodeTypologies from "@/assets/portfolio/wernigerode-typologies.jpg";
import wernigerodePorosityNorth from "@/assets/portfolio/wernigerode-porosity-north.jpg";
import wernigerodeSouthDiagram from "@/assets/portfolio/wernigerode-south-diagram.jpg";
import wernigerodePorositySouth from "@/assets/portfolio/wernigerode-porosity-south.jpg";
import wernigerodeMasterplan1 from "@/assets/portfolio/wernigerode-masterplan-1.jpg";
import wernigerodeMasterplan2 from "@/assets/portfolio/wernigerode-masterplan-2.jpg";
import wernigerodeMorphology from "@/assets/portfolio/wernigerode-morphology.jpg";
import wernigerodeAxonometric from "@/assets/portfolio/wernigerode-axonometric.jpg";
import wernigerodeGroundfloor from "@/assets/portfolio/wernigerode-groundfloor.jpg";
import wernigerodeLandscape from "@/assets/portfolio/wernigerode-landscape.jpg";
import wernigerodeEnergy from "@/assets/portfolio/wernigerode-energy.jpg";
import wernigerodeTypology3 from "@/assets/portfolio/wernigerode-typology-3.jpg";
import wernigerodeCourtyard from "@/assets/portfolio/wernigerode-courtyard.jpg";
import wernigerodeEgPlan from "@/assets/portfolio/wernigerode-eg-plan.jpg";
import wernigerodeLageplan from "@/assets/portfolio/wernigerode-lageplan.jpg";
import wernigerodeCourtView from "@/assets/portfolio/wernigerode-courtyard-view.gif";
import wernigerodeInteriorView from "@/assets/portfolio/wernigerode-interior-view.jpg";
import wernigerodeElevNorthC from "@/assets/portfolio/wernigerode-elevation-north-c.jpg";
import wernigerodeElevSouthC from "@/assets/portfolio/wernigerode-elevation-south-c.jpg";
import wernigerodeFacadeDetail from "@/assets/portfolio/wernigerode-facade-detail.jpg";
import wernigerodeRoofFacadeDetail from "@/assets/portfolio/wernigerode-roof-facade-detail.png";
import wernigerodeAPiante from "@/assets/portfolio/wernigerode-a-piante.jpg";
import wernigerodeAProspetti from "@/assets/portfolio/wernigerode-a-prospetti.jpg";
import wernigerodeBPiante from "@/assets/portfolio/wernigerode-b-piante.jpg";
import wernigerodeBProspetti from "@/assets/portfolio/wernigerode-b-prospetti.jpg";
import wernigerodeC1Piante from "@/assets/portfolio/wernigerode-c1-piante.jpg";
import wernigerodeC1Prospetti from "@/assets/portfolio/wernigerode-c1-prospetti.jpg";
import wernigerodeC2Piante from "@/assets/portfolio/wernigerode-c2-piante.jpg";
import wernigerodeC2Prospetti from "@/assets/portfolio/wernigerode-c2-prospetti.jpg";
import wernigerodeDPiante from "@/assets/portfolio/wernigerode-d-piante.jpg";
import wernigerodeDProspetti from "@/assets/portfolio/wernigerode-d-prospetti.jpg";
import wernigerodeEPiante from "@/assets/portfolio/wernigerode-e-piante.jpg";
import wernigerodeEProspetti from "@/assets/portfolio/wernigerode-e-prospetti.jpg";
import wernigerodeDraftNorth1 from "@/assets/portfolio/wernigerode-draft-north1.jpg";
import wernigerodeDraftNorth2 from "@/assets/portfolio/wernigerode-draft-north2.jpg";
import wernigerodeDraftNorth3 from "@/assets/portfolio/wernigerode-draft-north3.jpg";
import wernigerodePlan1og from "@/assets/portfolio/wernigerode-plan-1og.jpg";
import wernigerodePlan2og from "@/assets/portfolio/wernigerode-plan-2og.jpg";
import wernigerodePlan3og from "@/assets/portfolio/wernigerode-plan-3og.jpg";
import wernigerodePlan4og from "@/assets/portfolio/wernigerode-plan-4og.jpg";
import novecento4 from "@/assets/portfolio/novecento-4.jpg";
import novecento5 from "@/assets/portfolio/novecento-5.jpg";

import novecento7 from "@/assets/portfolio/novecento-7.jpg";
import novecentoNew1 from "@/assets/portfolio/novecento-new-1.jpg";
import novecentoNew2 from "@/assets/portfolio/novecento-new-2.jpg";
import novecento10 from "@/assets/portfolio/novecento-10.jpg";
import novecento11 from "@/assets/portfolio/novecento-11.jpg";
import novecentoQuota009 from "@/assets/portfolio/novecento-quota-009.jpg";
import novecentoQuota297 from "@/assets/portfolio/novecento-quota-297.jpg";
import novecentoQuota604 from "@/assets/portfolio/novecento-quota-604.jpg";
import novecentoQuota1097 from "@/assets/portfolio/novecento-quota-1097.jpg";
import novecentoQuota1533 from "@/assets/portfolio/novecento-quota-1533.jpg";
import novecentoQuota1965 from "@/assets/portfolio/novecento-quota-1965.jpg";
import novecentoQuota2370 from "@/assets/portfolio/novecento-quota-2370.jpg";
import novecentoQuotaNeg540 from "@/assets/portfolio/novecento-quota-neg540.jpg";
import novecentoScatola from "@/assets/portfolio/novecento-scatola.jpg";
import novecentoSezioneProspettica from "@/assets/portfolio/novecento-sezione-prospettica.jpg";
import novecentoPercorsoEspositivo from "@/assets/portfolio/novecento-percorso-espositivo.jpg";
import novecentoAssonometria from "@/assets/portfolio/novecento-assonometria.jpg";
import novecentoSezioneAa from "@/assets/portfolio/novecento-sezione-aa.jpg";
import novecentoSezioneBb from "@/assets/portfolio/novecento-sezione-bb.jpg";
import novecentoSezioneCc from "@/assets/portfolio/novecento-sezione-cc.jpg";
import novecentoChiaviSezioni from "@/assets/portfolio/novecento-chiavi-sezioni.jpg";
import novecentoRender1 from "@/assets/portfolio/novecento-render-1.png";
import novecentoRender2 from "@/assets/portfolio/novecento-render-2.png";
import novecentoSchemaStrutturale from "@/assets/portfolio/novecento-schema-strutturale.jpg";
import illerpark1 from "@/assets/portfolio/illerpark-1.jpg";
import illerpark2 from "@/assets/portfolio/illerpark-2.jpg";
import illerpark3 from "@/assets/portfolio/illerpark-3.jpg";
import illerpark4 from "@/assets/portfolio/illerpark-4.jpg";
import illerpark5 from "@/assets/portfolio/illerpark-5.jpg";
import illerpark6 from "@/assets/portfolio/illerpark-6.jpg";
import illerparkCover from "@/assets/portfolio/illerpark-cover.jpg";
import shinkenchiku1 from "@/assets/portfolio/shinkenchiku-1.jpg";
import shinkenchiku2 from "@/assets/portfolio/shinkenchiku-2.png";
import shinkenchiku3 from "@/assets/portfolio/shinkenchiku-3.jpg";
import shinkenchiku4 from "@/assets/portfolio/shinkenchiku-4.png";
import shinkenchiku5 from "@/assets/portfolio/shinkenchiku-5.jpg";
import shinkenchiku6 from "@/assets/portfolio/shinkenchiku-6.jpg";
import shinkenchiku7 from "@/assets/portfolio/shinkenchiku-7.jpg";
import shinkenchiku8 from "@/assets/portfolio/shinkenchiku-8.jpg";
import shinkenchiku9 from "@/assets/portfolio/shinkenchiku-9.jpg";
import shinkenchiku10 from "@/assets/portfolio/shinkenchiku-10.jpg";
import shinkenchiku11 from "@/assets/portfolio/shinkenchiku-11.jpg";
import shinkenchiku12 from "@/assets/portfolio/shinkenchiku-12.jpg";
import shinkenchiku13 from "@/assets/portfolio/shinkenchiku-13.jpg";
import shinkenchiku14 from "@/assets/portfolio/shinkenchiku-14.png";
import europan11Synthesis from "@/assets/portfolio/europan11-synthesis.jpg";
import europan11Plan from "@/assets/portfolio/europan11-plan.jpg";
import europan11Aerial from "@/assets/portfolio/europan11-aerial.jpg";
import europan11Concept from "@/assets/portfolio/europan11-concept.jpg";
import europan11Panoramic from "@/assets/portfolio/europan11-panoramic.jpg";
import europan11Masterplan from "@/assets/portfolio/europan11-masterplan.jpg";
import europan11Typologies from "@/assets/portfolio/europan11-typologies.jpg";
import europan11Models from "@/assets/portfolio/europan11-models.jpg";
import europan11Axo from "@/assets/portfolio/europan11-axo.jpg";
import europan11Render from "@/assets/portfolio/europan11-render.jpg";
import europan11Strip from "@/assets/portfolio/europan11-strip.jpg";
import europan11Venice from "@/assets/portfolio/europan11-venice.jpg";
import europan11Skyline from "@/assets/portfolio/europan11-skyline.jpg";
import europan11Houses from "@/assets/portfolio/europan11-houses.jpg";
import europan11Apartments from "@/assets/portfolio/europan11-apartments.jpg";
import europan16Cover from "@/assets/portfolio/europan16-cover.jpg";
import wernigerodeModels from "@/assets/profile-models.png";
import ilicaMasterplan from "@/assets/portfolio/ilica-masterplan.jpg";
import ilicaCoperture from "@/assets/portfolio/ilica-coperture.jpg";
import ilicaP2 from "@/assets/portfolio/ilica-p-2.jpg";
import ilicaP1 from "@/assets/portfolio/ilica-p-1.jpg";
import ilicaPianoTerra from "@/assets/portfolio/ilica-piano-terra.jpg";
import ilicaP12 from "@/assets/portfolio/ilica-p1-2.jpg";
import ilicaPiano2 from "@/assets/portfolio/ilica-piano-2.jpg";
import ilicaPiano3 from "@/assets/portfolio/ilica-piano-3.jpg";
import ilicaPiano22 from "@/assets/portfolio/ilica-piano-2-2.jpg";
import ilicaPianoTerra2 from "@/assets/portfolio/ilica-piano-terra-2.jpg";

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
import zagrebBgg29 from "@/assets/portfolio/zagreb-bgg-29.jpg";
import zagrebBgg30 from "@/assets/portfolio/zagreb-bgg-30.jpg";
import zagrebBgg31 from "@/assets/portfolio/zagreb-bgg-31.jpg";

interface ProjectData {
  id: string;
  year: string;
  yearKey?: string;
  author?: string;
  collaborators?: string;
  images: string[];
  captions?: string[];
  captionKeys?: string[];
  thumbnail: string;
  overlayImage?: string;
  overlayImageIndices?: number[];
  imageDisplayScales?: number[];
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
    images: [wernigerodeAerial2, wernigerodeRender, wernigerodeEgPlan, wernigerodeCourtView, wernigerodeInteriorView, wernigerodePlan1og, wernigerodePlan2og, wernigerodePlan3og, wernigerodePlan4og, wernigerodeLageplan, wernigerodeElevNorthC, wernigerodeElevSouthC, wernigerodeFacadeDetail, wernigerodeRoofFacadeDetail, wernigerodeAPiante, wernigerodeAProspetti, wernigerodeBPiante, wernigerodeBProspetti, wernigerodeC1Piante, wernigerodeC1Prospetti, wernigerodeC2Piante, wernigerodeC2Prospetti, wernigerodeDPiante, wernigerodeDProspetti, wernigerodeEPiante, wernigerodeEProspetti],
    captions: ["Vista aerea", "Vista nord", "Planimetria generale piano terra", "Vista corte interna", "Interno", "Pianta generale 1° piano", "Pianta generale 2° piano", "Pianta generale 3° piano", "Pianta generale 4° piano", "Planimetria generale", "Prospetto nord edificio C", "Prospetto sud edificio C", "Dettaglio di facciata", "Dettaglio tetto-facciata", "Haus A - Piante", "Haus A - Prospetti", "Haus B - Piante", "Haus B - Prospetti", "Haus C1 - Piante", "Haus C1 - Prospetti", "Haus C2 - Piante", "Haus C2 - Prospetti", "Haus D - Piante", "Haus D - Prospetti", "Haus E - Piante", "Haus E - Prospetti"],
    imageDisplayScales: [1, 1, 1, 1, 1, 1.16, 1.16, 1.16, 1.16, 0.97],
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
    images: [wernigerodeModels, gardenCityMasterplan, gardenCityContext, gardenCityPorosity, gardenCity4, gardenCity5, wernigerodePorosityNorth, gardenCity6, gardenCity7, gardenCity8, wernigerodeDraftNorth1, wernigerodeDraftNorth2, wernigerodeDraftNorth3, wernigerodeElevation4, wernigerodePlanNord, wernigerodeLevel0, wernigerodeLevel1, wernigerodeLevel2, wernigerodeLevel3, wernigerodeLevel4, wernigerodeRoof, wernigerodeSection, wernigerodeSectionsAbc, wernigerodeSectionsDefg, wernigerodeTypologies, wernigerodeRender2, wernigerodeSouthDiagram, wernigerodeMasterplan1, wernigerodePorositySouth, wernigerodeMasterplan2, wernigerodeMorphology, wernigerodeAxonometric, wernigerodeGroundfloor, wernigerodeTypology3, wernigerodeLandscape, wernigerodeEnergy, wernigerodeCourtyard, wernigerodeElevation1, wernigerodeElevation2, wernigerodeElevation3],
    thumbnail: wernigerodeModels,
  },
  {
    id: 'novecento',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    collaborators: "Leonardo Zuccaro Marchi, Alessandra Lelli, Iacopo Salce",
    images: [novecentoNew1, novecentoNew2, novecento4, novecento5, novecentoScatola, novecentoSezioneProspettica, novecentoPercorsoEspositivo, novecentoAssonometria, novecentoSezioneAa, novecentoSezioneBb, novecentoSezioneCc, novecentoQuotaNeg540, novecentoQuota009, novecentoQuota297, novecentoQuota604, novecentoQuota1097, novecentoQuota1533, novecentoQuota1965, novecentoQuota2370, novecentoRender1, novecentoRender2, novecentoSchemaStrutturale],
    captions: ['', '', '', '', 'Scatola nella scatola', 'Sezione prospettica', 'Percorso espositivo', 'Assonometria', 'Sezione AA', 'Sezione BB', 'Sezione CC', 'Quota -5.40', 'Quota +0.09', 'Quota +2.97', 'Quota +6.04', 'Quota +10.97', 'Quota +15.33', 'Quota +19.65', 'Quota +23.70', 'Render interno', 'Render interno', 'Schema strutturale'],
    overlayImage: novecentoChiaviSezioni,
    overlayImageIndices: [8, 9, 10],
    thumbnail: novecento5,
  },
  {
    id: 'illerpark',
    yearKey: 'experience.competition',
    year: "Concorso",
    images: [illerpark1, illerpark2, illerpark3, illerpark5, illerpark4, illerpark6, illerparkCover],
    thumbnail: illerparkCover,
  },
  {
    id: 'shinkenchiku',
    yearKey: 'experience.mention',
    year: "Menzione",
    author: "Alina Lippiello",
    collaborators: "Ivica Covic, Leonardo Zuccaro Marchi, Alessandra Lelli",
    images: [shinkenchiku2, shinkenchiku3, shinkenchiku4, shinkenchiku5, shinkenchiku6, shinkenchiku7, shinkenchiku8, shinkenchiku9, shinkenchiku10, shinkenchiku11, shinkenchiku14],
    captionKeys: ['project.shinkenchiku.caption2', 'project.shinkenchiku.caption3', 'project.shinkenchiku.caption4', 'project.shinkenchiku.caption5', 'project.shinkenchiku.caption6', 'project.shinkenchiku.caption7', 'project.shinkenchiku.caption8', 'project.shinkenchiku.caption9', 'project.shinkenchiku.caption10', 'project.shinkenchiku.caption11', 'project.shinkenchiku.caption14'],
    thumbnail: shinkenchiku2,
  },
  {
    id: 'europan11',
    year: "Runner up",
    author: "Alina Lippiello",
    collaborators: "Leonardo Zuccaro Marchi",
    images: [europan11Synthesis, europan11Plan, europan11Aerial, europan11Concept, europan11Skyline, europan11Panoramic, europan11Typologies, europan11Masterplan, europan11Venice, europan11Axo, europan11Models, europan11Apartments, europan11Render, europan11Strip, europan11Houses],
    captionKeys: ['project.europan11.caption1', 'project.europan11.caption2', 'project.europan11.caption3', 'project.europan11.caption4', '', 'project.europan11.caption6', '', 'project.europan11.caption8', 'project.europan11.caption9', 'project.europan11.caption10', 'project.europan11.caption11', 'project.europan11.caption12', 'project.europan11.caption13', 'project.europan11.caption14', 'project.europan11.caption15'],
    thumbnail: europan11Masterplan,
  },
  {
    id: 'aluartforum',
    yearKey: 'experience.competition',
    year: "Concorso",
    author: "Alina Lippiello",
    images: [ilicaMasterplan, ilicaCoperture, ilicaP2, ilicaPianoTerra, ilicaP1, ilicaP12, ilicaPianoTerra2, ilicaPiano2, ilicaPiano3, ilicaPiano22],
    captions: ['Masterplan 1:500', 'Masterplan 1:500 con piani terra', 'Coperture 1:500', 'Piano terra', 'Piano -1', 'Piano -2', 'Piano terra', 'Piano 1', 'Piano 2', 'Piano 3'],
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
    images: [zagrebBgg1, zagrebBgg2, zagrebBgg3, zagrebBgg4, zagrebBgg29, zagrebBgg5, zagrebBgg6, zagrebBgg7, zagrebBgg8, zagrebBgg9, zagrebBgg10, zagrebBgg11, zagrebBgg12, zagrebBgg13, zagrebBgg14, zagrebBgg15, zagrebBgg30, zagrebBgg16, zagrebBgg17, zagrebBgg31, zagrebBgg18, zagrebBgg19],
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
  const [lightboxOverlayImage, setLightboxOverlayImage] = useState<string | undefined>();
  const [lightboxOverlayIndices, setLightboxOverlayIndices] = useState<number[] | undefined>();
  const [lightboxImageDisplayScales, setLightboxImageDisplayScales] = useState<number[] | undefined>();

  const openLightbox = (project: ProjectData, startIndex = 0) => {
    setLightboxImages(project.images);
    const resolvedCaptions = project.captionKeys
      ? project.captionKeys.map(key => key ? t(key) : '')
      : project.captions;
    setLightboxCaptions(resolvedCaptions);
    setLightboxIndex(startIndex);
    setLightboxTitle(t(`project.${project.id}.title`));
    setLightboxDescription(t(`project.${project.id}.description`) !== `project.${project.id}.description` ? t(`project.${project.id}.description`) : undefined);
    setLightboxAuthor(project.author);
    setLightboxCollaborators(project.collaborators);
    setLightboxOverlayImage(project.overlayImage);
    setLightboxOverlayIndices(project.overlayImageIndices);
    setLightboxImageDisplayScales(project.imageDisplayScales);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImageDisplayScales(undefined);
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
        overlayImage={lightboxOverlayImage}
        overlayImageIndices={lightboxOverlayIndices}
        imageDisplayScales={lightboxImageDisplayScales}
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
