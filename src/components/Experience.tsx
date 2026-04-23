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
import illerparkRenderCourt from "@/assets/portfolio/illerpark-render-court.jpg";
import illerparkRenderStreet from "@/assets/portfolio/illerpark-render-street.jpg";
import illerparkAxonometric from "@/assets/portfolio/illerpark-axonometric.jpg";
import illerparkSections from "@/assets/portfolio/illerpark-sections.jpg";
import illerparkDetail from "@/assets/portfolio/illerpark-detail.jpg";
import illerparkModel1 from "@/assets/portfolio/illerpark-model-1.jpg";
import illerparkModel2 from "@/assets/portfolio/illerpark-model-2.png";
import illerparkModel3 from "@/assets/portfolio/illerpark-model-3.jpg";
import illerparkModel4 from "@/assets/portfolio/illerpark-model-4.jpg";
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
import ilicaProspetto from "@/assets/portfolio/ilica-prospetto.jpg";
import ilicaCopertura500 from "@/assets/portfolio/ilica-copertura-500.jpg";
import ilicaProspettoStrada from "@/assets/portfolio/ilica-prospetto-strada.jpg";
import ilicaProspettoParco from "@/assets/portfolio/ilica-prospetto-parco.jpg";
import ilicaCoperture from "@/assets/portfolio/ilica-coperture.jpg";
import ilicaP1 from "@/assets/portfolio/ilica-p-1.jpg";
import ilicaPianoTerra from "@/assets/portfolio/ilica-piano-terra.jpg";
import ilicaP12 from "@/assets/portfolio/ilica-p1-2.jpg";
import ilicaPianoTerra2 from "@/assets/portfolio/ilica-piano-terra-2.jpg";
import ilicaPiano2 from "@/assets/portfolio/ilica-piano-2.jpg";
import ilicaPiano3 from "@/assets/portfolio/ilica-piano-3.jpg";
import ilicaPiano22 from "@/assets/portfolio/ilica-piano-2-2.jpg";
import ilicaSchemaPiani from "@/assets/portfolio/ilica-schema-piani.jpg";
import ilicaSezioneAa from "@/assets/portfolio/ilica-sezione-aa.jpg";
import ilicaSezioneBb from "@/assets/portfolio/ilica-sezione-bb.jpg";
import ilicaSezioneCc from "@/assets/portfolio/ilica-sezione-cc.jpg";
import ilicaChiaveSezioni from "@/assets/portfolio/ilica-chiave-sezioni.jpg";
import ilicaProspetto1 from "@/assets/portfolio/ilica-prospetto-1.jpg";
import ilicaProspetto2 from "@/assets/portfolio/ilica-prospetto-2.jpg";
import ilicaSezione500 from "@/assets/portfolio/ilica-sezione-500.jpg";
import ilicaSezione500_2 from "@/assets/portfolio/ilica-sezione-500-2.jpg";
import ilicaPiano4 from "@/assets/portfolio/ilica-piano-4.jpg";
import ilicaPiano5 from "@/assets/portfolio/ilica-piano-5.jpg";
import ilicaCopertura100 from "@/assets/portfolio/ilica-copertura-100.jpg";
import ilicaCopertura100_2 from "@/assets/portfolio/ilica-copertura-100-2.jpg";
import ilicaRenderPt from "@/assets/portfolio/ilica-render-pt.jpg";
import ilicaRenderInterno from "@/assets/portfolio/ilica-render-interno.jpg";

import expo1 from "@/assets/portfolio/expo-1.jpg";
import expo2 from "@/assets/portfolio/expo-2.jpg";
import expo3 from "@/assets/portfolio/expo-3.jpg";
import expoEst from "@/assets/portfolio/expo-est.jpg";
import expoOvest from "@/assets/portfolio/expo-ovest.jpg";
import expoBallatoio from "@/assets/portfolio/expo-ballatoio.jpg";
import expoTerrazzaVista from "@/assets/portfolio/expo-terrazza-vista.jpg";
import expoPassaggio from "@/assets/portfolio/expo-passaggio.jpg";
import expo4 from "@/assets/portfolio/expo-4.jpg";
import expo5 from "@/assets/portfolio/expo-5.jpg";
import expo6 from "@/assets/portfolio/expo-6.jpg";
import expo7 from "@/assets/portfolio/expo-7.jpg";
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
import splitMasterplan from "@/assets/portfolio/split-masterplan.jpg";
import splitPlanivolumetrico from "@/assets/portfolio/split-planivolumetrico.jpg";
import splitRelazioneContesto from "@/assets/portfolio/split-relazione-contesto.jpg";
import splitMorfologiaDiocleziano from "@/assets/portfolio/split-morfologia-muro-diocleziano.jpg";
import splitMorfologiaBastioni from "@/assets/portfolio/split-morfologia-bastioni.jpg";
import splitSchemi from "@/assets/portfolio/split-schemi.jpg";
import splitSchemiMatBuilding from "@/assets/portfolio/split-schemi-mat-building.jpg";
import splitStazionePassante from "@/assets/portfolio/split-stazione-passante.jpg";
import splitTipoMorfologia from "@/assets/portfolio/split-tipo-morfologia.jpg";
import splitSezioneAaProspetto from "@/assets/portfolio/split-sezione-aa-prospetto.jpg";
import splitSezioneBb from "@/assets/portfolio/split-sezione-bb.jpg";
import splitTrasversaleCc from "@/assets/portfolio/split-trasversale-cc.jpg";
import splitTrasversaleDd from "@/assets/portfolio/split-trasversale-dd.jpg";
import splitTrasversaleEe from "@/assets/portfolio/split-trasversale-ee.jpg";
import splitChiaveSezioni from "@/assets/portfolio/split-chiave-sezioni.jpg";
import splitPiantaQuota2 from "@/assets/portfolio/split-pianta-quota-2.jpg";
import splitPiantaQuota7 from "@/assets/portfolio/split-pianta-quota-7.jpg";
import splitPiantaQuota10 from "@/assets/portfolio/split-pianta-quota-10.jpg";
import splitPianteQuote14_26 from "@/assets/portfolio/split-piante-quote-14-26.jpg";
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
  collaboratorsKey?: string;
  images: string[];
  captions?: string[];
  captionKeys?: string[];
  thumbnail: string;
  overlayImage?: string;
  overlayImageIndices?: number[];
  imageDisplayScales?: number[];
  link?: { url: string; labelKey: string };
}

const projectsData: ProjectData[] = [
  {
    id: 'wernigerode1',
    yearKey: 'experience.inProgress',
    year: 'In corso',
    collaboratorsKey: 'credits.wernigerode1',
    collaboratorsKey: 'credits.wernigerode1',
    collaborators: `Cliente: Gebäude- und Wohnungsbaugesellschaft Wernigerode mbH

Team di progetto:
Leonardo Zuccaro Marchi, Alice Covatta, **Alina Lippiello**, Piero Medici

Ruolo:

Coordinamento generale e sviluppo tecnico del progetto.

Contributi:

Progettazione del sistema di facciata e definizione dei dettagli architettonici.

Supervisione tecnica e interfaccia diretta con l'architetto locale per la conformità costruttiva.

Affinamento tecnico delle soluzioni abitative e dei sistemi distributivi.

Architetto locale: H+L Hartung & Ludwig Architektur
Visualizzazione: Be Maarch`,
    images: [wernigerodeAerial2, wernigerodeRender, wernigerodeCourtView, wernigerodeInteriorView, wernigerodeLageplan, wernigerodeEgPlan, wernigerodePlan1og, wernigerodePlan2og, wernigerodePlan3og, wernigerodePlan4og, wernigerodeElevNorthC, wernigerodeElevSouthC, wernigerodeFacadeDetail, wernigerodeRoofFacadeDetail, wernigerodeAPiante, wernigerodeAProspetti, wernigerodeBPiante, wernigerodeBProspetti, wernigerodeC1Piante, wernigerodeC1Prospetti, wernigerodeC2Piante, wernigerodeC2Prospetti, wernigerodeDPiante, wernigerodeDProspetti, wernigerodeEPiante, wernigerodeEProspetti],
    captions: ["Vista aerea", "Vista nord", "Vista corte interna", "Interno", "Planimetria generale", "Planimetria generale piano terra", "Pianta generale 1° piano", "Pianta generale 2° piano", "Pianta generale 3° piano", "Planimetria generale copertura", "Prospetto nord edificio C", "Prospetto sud edificio C", "Dettaglio di facciata", "Dettaglio tetto-facciata", "Haus A - Piante", "Haus A - Prospetti", "Haus B - Piante", "Haus B - Prospetti", "Haus C1 - Piante", "Haus C1 - Prospetti", "Haus C2 - Piante", "Haus C2 - Prospetti", "Haus D - Piante", "Haus D - Prospetti", "Haus E - Piante", "Haus E - Prospetti"],
    imageDisplayScales: [1, 1, 1, 1, 0.97, 1, 1.16, 1.16, 1.16, 1.16],
    thumbnail: wernigerodeAerial2,
  },
  {
    id: 'wernigerode2',
    year: "Concorso",
    collaboratorsKey: 'credits.wernigerode2',
    collaborators: `Team di progetto:
Leonardo Zuccaro Marchi, Alice Covatta, **Alina Lippiello**, Piero Medici

Ruolo:

Sviluppo del concept per il comparto Nord e definizione della strategia d'innesto urbano.

Contributi:

Ricerca e sviluppo dei modelli residenziali sperimentali per entrambi i lotti.

Revisione dei processi distributivi e dei flussi per entrambi i lotti.

Visualizzazione: Be Maarch

Collaboratori: E. Bokshi, E. Boncaldo, L. Bucciarelli, T. Diebäcker, A. Fumero, A. Verna GergesHana, S. Gölada, Q. Hao, A. Pardi, C. Turkoglu, E. Varoni, L. Xinwei`,
    images: [wernigerodeModels, gardenCityMasterplan, gardenCityContext, gardenCityPorosity, gardenCity4, gardenCity5, wernigerodePorosityNorth, gardenCity6, gardenCity7, gardenCity8, wernigerodeDraftNorth1, wernigerodeDraftNorth2, wernigerodeDraftNorth3, wernigerodeElevation4, wernigerodePlanNord, wernigerodeLevel0, wernigerodeLevel1, wernigerodeLevel2, wernigerodeLevel3, wernigerodeLevel4, wernigerodeRoof, wernigerodeSection, wernigerodeSectionsAbc, wernigerodeSectionsDefg, wernigerodeTypologies, wernigerodeRender2, wernigerodeSouthDiagram, wernigerodeMasterplan1, wernigerodePorositySouth, wernigerodeMasterplan2, wernigerodeMorphology, wernigerodeAxonometric, wernigerodeGroundfloor, wernigerodeTypology3, wernigerodeLandscape, wernigerodeEnergy, wernigerodeCourtyard, wernigerodeElevation1, wernigerodeElevation2, wernigerodeElevation3],
    thumbnail: wernigerodeModels,
  },
  {
    id: 'novecento',
    yearKey: 'experience.competition',
    year: "Concorso",
    collaboratorsKey: 'credits.novecento',
    collaborators: `Team di progetto:
**Alina Lippiello**, Leonardo Zuccaro Marchi, Alessandra Lelli, Iacopo Salce

Ruolo:

Ideazione del linguaggio architettonico generale.

Contributi:

Sviluppo del concept "scatola nella scatola" (box-in-a-box).

Progettazione degli spazi espositivi e della sequenza museografica interna.

Coordinamento generale della proposta progettuale.

Leonardo Zuccaro Marchi: Design architettonico della passerella di connessione tra gli Arengari.

Iacopo Salce: Consulenza e integrazione dei sistemi strutturali.

Alessandra Lelli: Elaborazione dell'immagine coordinata e delle atmosfere interne.

Visualizzazione: Be Maarch`,
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
    collaboratorsKey: 'credits.illerpark',
    collaborators: `Team di progetto:
**Alina Lippiello**, Leonardo Zuccaro Marchi, Alice Covatta, Piero Medici

Ruolo:

Sviluppo della proposta progettuale.

Contributi:

Ricerca e definizione dei modelli abitativi per il complesso residenziale.

Progettazione della tipologia a ballatoio come elemento di connessione spaziale e sociale.

Definizione degli schemi distributivi interni e della loro flessibilità.`,
    images: [illerparkModel4, illerparkModel2, illerparkModel1, illerpark1, illerpark2, illerpark3, illerpark5, illerpark4, illerpark6, illerparkAxonometric, illerparkSections, illerparkRenderCourt, illerparkRenderStreet, illerparkDetail, illerparkCover],
    captions: ["Modello", "Modello", "Modello", "", "", "", "", "", "", "Assonometria", "Sezioni", "Vista corte interna", "Vista strada", "Dettaglio costruttivo", ""],
    thumbnail: illerparkModel4,
  },
  {
    id: 'shinkenchiku',
    yearKey: 'experience.mention',
    year: "Menzione",
    collaboratorsKey: 'credits.shinkenchiku',
    collaborators: `Team di progetto:
**Alina Lippiello**, Ivica Covic, Leonardo Zuccaro Marchi, Alessandra Lelli

Ruolo:

Ideazione della visione architettonica e del linguaggio formale della proposta.

Contributi:

Sviluppo del sistema insediativo e dei modelli abitativi.

Ricerca sulla trasparenza, la rarefazione dei volumi e il rapporto tra spazio domestico e paesaggio.

Definizione dei sistemi di involucro e della coerenza visiva del progetto.`,
    images: [shinkenchiku2, shinkenchiku3, shinkenchiku4, shinkenchiku5, shinkenchiku6, shinkenchiku7, shinkenchiku8, shinkenchiku9, shinkenchiku10, shinkenchiku11, shinkenchiku14],
    captionKeys: ['project.shinkenchiku.caption2', 'project.shinkenchiku.caption3', 'project.shinkenchiku.caption4', 'project.shinkenchiku.caption5', 'project.shinkenchiku.caption6', 'project.shinkenchiku.caption7', 'project.shinkenchiku.caption8', 'project.shinkenchiku.caption9', 'project.shinkenchiku.caption10', 'project.shinkenchiku.caption11', 'project.shinkenchiku.caption14'],
    thumbnail: shinkenchiku2,
  },
  {
    id: 'europan11',
    year: "Runner up",
    collaboratorsKey: 'credits.europan11',
    collaborators: `Team di progetto:
**Alina Lippiello** (Capogruppo), Leonardo Zuccaro Marchi, Annalisa Romani, Fausto Cuzzocrea

Ruolo:

Sviluppo dei sistemi residenziali e dei modelli abitativi.

Contributi:

Traduzione delle strategie urbane alla scala dell'edificio.

Ivo Covic: Concept del Masterplan.

Annalisa Romani: Landscape Design.

Leonardo Zuccaro Marchi: Sviluppo della proposta architettonica, comunicazione visiva e impaginazione.

Fausto Cuzzocrea: Sviluppo grafico del masterplan.`,
    images: [europan11Synthesis, europan11Plan, europan11Aerial, europan11Concept, europan11Skyline, europan11Panoramic, europan11Typologies, europan11Masterplan, europan11Venice, europan11Axo, europan11Models, europan11Apartments, europan11Render, europan11Strip, europan11Houses],
    captionKeys: ['project.europan11.caption1', 'project.europan11.caption2', 'project.europan11.caption3', 'project.europan11.caption4', '', 'project.europan11.caption6', '', 'project.europan11.caption8', 'project.europan11.caption9', 'project.europan11.caption10', 'project.europan11.caption11', 'project.europan11.caption12', 'project.europan11.caption13', 'project.europan11.caption14', 'project.europan11.caption15'],
    thumbnail: europan11Masterplan,
    link: { url: 'https://www.europan-europe.eu/en/project-and-processes/floating-blocks', labelKey: 'publications.viewLink' },
  },
  {
    id: 'aluartforum',
    yearKey: 'experience.competition',
    year: "Concorso",
    collaboratorsKey: 'credits.aluartforum',
    collaborators: `Team di progetto:
**Alina Lippiello**, Ivo Covic, Leonardo Zuccaro Marchi

Ruolo:

Ideazione della strategia progettuale e del linguaggio architettonico (in collaborazione con I. Covic).

Contributi:

Elaborazione e definizione delle planimetrie e delle sezioni di progetto.

Traduzione dell'idea concettuale in soluzioni spaziali e funzionali.

Ivo Covic: Concept architettonico.

Leonardo Zuccaro Marchi: Comunicazione visiva e design grafico.`,
    images: [ilicaProspetto, ilicaCopertura500, ilicaRenderPt, ilicaRenderInterno, ilicaProspetto1, ilicaSezione500, ilicaSezione500_2, ilicaCoperture, ilicaSchemaPiani, ilicaPianoTerra, ilicaP12, ilicaP1, ilicaPianoTerra2, ilicaPiano2, ilicaPiano3, ilicaPiano22, ilicaPiano4, ilicaPiano5, ilicaCopertura100, ilicaCopertura100_2, ilicaSezioneAa, ilicaSezioneBb, ilicaSezioneCc],
    captions: ['Prospetto 1:200', 'Planimetria coperture 1:500', 'Render piano terra', 'Render interno', 'Prospetto 1:500', 'Sezione 1:500', 'Sezione 1:500', 'Planimetria 1:500', 'Schema piani', 'Piano terra', 'Piano -2', 'Piano -1', 'Piano terra', 'Piano 1', 'Piano 2', 'Piano 3', 'Piano 4', 'Piano 5', 'Copertura', 'Copertura', 'Sezione AA', 'Sezione BB', 'Sezione CC'],
    imageDisplayScales: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.85, 1, 1],
    overlayImage: ilicaChiaveSezioni,
    overlayImageIndices: [20, 21, 22],
    thumbnail: ilicaProspetto,
  },
  {
    id: 'expo',
    yearKey: 'experience.competition',
    year: "Concorso",
    collaboratorsKey: 'credits.expo',
    collaborators: `Team di progetto:
Luca Poncellini, Luciano Giorgi, Edoardo Riva, Geert Jan Beun, **Alina Lippiello**, Ivica Covic, Luca Canova. Ingegneria e Consulenza: Icis Srl, Tecnicaer Srl, Studio Vigetti Merlo.

Ruolo:

Sviluppo dei dettagli costruttivi e dei sistemi tecnologici.

Contributi:

Supporto alla definizione delle soluzioni architettoniche esecutive.

Luca Poncellini: Sviluppo del progetto architettonico.

Luciano Giorgi: Direzione artistica, interior design e definizione dell'involucro architettonico.`,
    images: [expo1, expo2, expo3, expoEst, expoOvest, expoBallatoio, expoTerrazzaVista, expoPassaggio, expo4, expo5, expo6, expo7],
    captions: ['Vista ovest', 'Vista ovest', 'Vista sud', 'Vista est', 'Vista ovest', 'Ballatoio', 'Terrazza', 'Passaggio', 'Terrazza', 'Ristorante'],
    thumbnail: expo1,
  },
  {
    id: 'split',
    yearKey: 'experience.competition',
    year: "Concorso",
    collaboratorsKey: 'credits.split',
    collaborators: `Team di progetto:
**Alina Lippiello**, Ivo Covic

Ruolo:

Definizione architettonica e formale del nodo intermodale e della nuova stazione.

Contributi:

Sviluppo degli edifici direzionali e residenziali sulla piastra infrastrutturale.

Progettazione dell'edificio pubblico di testa, concepito come volume iconico a matrice cubica.

Studio delle connessioni tra la quota del ferro, la piastra urbana e il fronte mare.

Ivo Covic: Sviluppo del sistema di hotel diffuso e riqualificazione dell'area collinare.`,
    images: [split1, split2, split3, split4, splitMasterplan, splitPlanivolumetrico, splitRelazioneContesto, splitMorfologiaDiocleziano, splitMorfologiaBastioni, splitSchemi, splitSchemiMatBuilding, splitStazionePassante, splitTipoMorfologia, splitPiantaQuota2, splitPiantaQuota7, splitPiantaQuota10, splitPianteQuote14_26, splitSezioneAaProspetto, splitSezioneBb, splitTrasversaleCc, splitTrasversaleDd, splitTrasversaleEe],
    captionKeys: ['', '', '', '', 'project.split.caption5', 'project.split.caption6', 'project.split.caption7', 'project.split.caption8', 'project.split.caption9', 'project.split.caption10', 'project.split.caption11', 'project.split.caption12', 'project.split.caption13', 'project.split.caption14', 'project.split.caption20', 'project.split.caption21', 'project.split.caption22', 'project.split.caption15', 'project.split.caption16', 'project.split.caption17', 'project.split.caption18', 'project.split.caption19'],
    thumbnail: split4,
  },
  {
    id: 'koresnica',
    yearKey: 'experience.competition',
    year: "Concorso",
    collaboratorsKey: 'credits.koresnica',
    collaborators: `Team di progetto:
**Alina Lippiello**, Ivica Covic, in collaborazione con Studio Locale (Croazia).

Ruolo:

Ricerca e sviluppo dei modelli residenziali e degli schemi distributivi degli alloggi.

Contributi:

Definizione del rapporto tra cellule abitative, spazi comuni e sistema dei percorsi.

Studio della morfologia edilizia in relazione alle pendenze del sito e al contesto mediterraneo.

Ivica Covic: Masterplan e strategia urbana.

Studio Locale: Supporto alla progettazione e adeguamento normativo.`,
    images: [koresnica1, koresnica2, koresnica3, koresnica4],
    thumbnail: koresnica1,
  },
  {
    id: 'lorenteggio',
    yearKey: 'experience.competition',
    year: "Concorso",
    collaboratorsKey: 'credits.lorenteggio',
    collaborators: `Team di progetto:
**Alina Lippiello**, Leonardo Zuccaro Marchi

Ruolo:

Sviluppo integrale del progetto architettonico della biblioteca.

Contributi:

Definizione della strategia urbana e del rapporto tra l'edificio e la piazza.

Organizzazione dei flussi, degli spazi espositivi e dei sistemi distributivi interni.

Traduzione tecnica e morfologica del concept narrativo nella struttura architettonica.

Leonardo Zuccaro Marchi: Concept narrativo, Landscape Design e comunicazione visiva.`,
    images: [lorenteggio1, lorenteggio2, lorenteggio3, lorenteggio4, lorenteggio5, lorenteggio6, lorenteggio7, lorenteggio8],
    thumbnail: lorenteggio1,
  },
  {
    id: 'zagrebBgg',
    yearKey: 'experience.competition',
    year: "Concorso",
    collaboratorsKey: 'credits.zagrebBgg',
    collaborators: `Team di progetto:
**Alina Lippiello**, Ivo Covic, Marco Visconti Architects

Ruolo:

Sviluppo integrale dell'organizzazione interna e dei flussi della biblioteca.

Contributi:

Definizione e sviluppo della strategia volumetrica basata sul modello del "mat-building" (in collaborazione con I. Covic).

Studio del sistema di "stecche" funzionali per l'integrazione delle diverse aree accademiche.

Traduzione della maglia strutturale in spazi per la ricerca, la consultazione e l'apprendimento.

Ivo Covic: Concept volumetrico e strategia d'area.

Marco Visconti Architects: Consulenza tecnica e produzione dei materiali di visualizzazione architettonica (rendering).`,
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
  const [lightboxLink, setLightboxLink] = useState<{ url: string; label: string } | undefined>();

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
    setLightboxCollaborators(project.collaboratorsKey ? t(project.collaboratorsKey) : project.collaborators);
    setLightboxOverlayImage(project.overlayImage);
    setLightboxOverlayIndices(project.overlayImageIndices);
    setLightboxImageDisplayScales(project.imageDisplayScales);
    setLightboxLink(project.link ? { url: project.link.url, label: t(project.link.labelKey) } : undefined);
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
        link={lightboxLink}
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
