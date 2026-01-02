import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'it' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  it: {
    // Header & Navigation
    'nav.profile': 'Profilo',
    'nav.projects': 'Progetti',
    'nav.publications': 'Pubblicazioni',
    'nav.contact': 'Contatti',
    'nav.menu': 'Menu',
    'nav.close': 'Chiudi',
    
    // Hero
    'hero.title': 'Architetto',
    'hero.description': "L'architettura come racconto stratificato, tra spazio, tempo e paesaggio.",
    'hero.cta': 'Scopri di più ↓',
    
    // Profile
    'profile.title': 'Profilo',
    'profile.p1': "L'architettura, per Alina Lippiello, è un racconto stratificato. Ogni progetto è un frammento di una storia più ampia, fatta di connessioni tra spazio e tempo, tra memoria e innovazione, tra città e paesaggio.",
    'profile.p2': "Il suo percorso si distingue per un approccio che coniuga ricerca teorica e pratica progettuale, sperimentazione e concretezza, sempre con uno sguardo attento alla trasformazione urbana e alla continuità tra architettura e territorio.",
    'profile.p3': "Oggi, attraverso uno studio diffuso tra Milano, Montreal, Rotterdam e Padova, continua a esplorare il potenziale dell'architettura come strumento di trasformazione urbana, con un focus su spazi porosi, continuità territoriale e nuove forme di abitare collettivo.",
    'profile.education': 'Formazione',
    'profile.edu1': 'Dottorato in Progettazione Architettonica e Urbana, Politecnico di Milano',
    'profile.edu2': 'Master in Urban and Regional Design, NYIT New York',
    'profile.edu3': 'Laurea in Architettura, Politecnico di Milano (97/100)',
    'profile.edu4': 'Faculdade de Arquitectura, Universidade do Porto',
    
    // Experience
    'experience.title': 'Concorsi e Progetti',
    'experience.inProgress': 'In corso',
    'experience.competition': 'Concorso',
    'experience.international': 'Internazionale',
    
    // Projects
    'project.wernigerode1.title': 'Città Giardino Permeabile - Progetto',
    'project.wernigerode1.location': 'Wernigerode, Germania',
    'project.wernigerode1.description': `La proposta sviluppa una visione urbana basata su tre livelli di porosità interconnessa.

A scala urbana, una rete di corridoi ecologici riconnette i frammenti naturali della città, infiltrandosi nella frammentazione contemporanea. L'area di progetto diventa baricentrica in questa nuova sinergia verde-blu tra il Bürgerpark e il fiume Holtemme, estendendo la connettività pedonale e ciclabile verso il centro storico.

A scala di quartiere, il progetto definisce spazi comuni e una struttura permeabile. La sommità della collina ospita un parco circolare con bosco urbano, aree gioco e un belvedere verso il castello. Nuovi orti si collegano a quelli esistenti, mentre percorsi pedonali superano le barriere ferroviarie. La mobilità viene ripensata con strade a traffico lento e connessioni pedonali verso il fiume.

Questa visione reinterpreta la città giardino: anziché un sistema radiale, propone cluster di spazi comuni interconnessi che trasformano la monofunzionalità urbana in un ecosistema poroso di accessibilità sociale e inclusione.`,

    'project.wernigerode2.title': 'Città Giardino Permeabile - Concorso',
    'project.wernigerode2.location': 'Wernigerode, Germania',
    'project.wernigerode2.description': `Il progetto architettonico del concorso si articola su due aree complementari che dialogano con la topografia esistente.

Area Nord (32 alloggi) - In fase di realizzazione: L'edificio funge da porta urbana, connettendo il parco al quartiere. Le volumetrie ricuciono i blocchi lineari occidentali con le case isolate settentrionali, inserendosi armonicamente nel tessuto organico. Portali e tagli garantiscono permeabilità pubblica verso i percorsi ciclopedonali. Materiali sostenibili (legno e calcestruzzo), sistemi di gestione idrica circolare e produzione energetica caratterizzano l'intervento. La mixité tipologica favorisce composizioni sociali intergenerazionali, con spazi lavoro-abitazione e attività commerciali al piano terra.

Area Sud (25 alloggi): Ibrida la tipologia a schiera con coperture a falde e lineari, seguendo organicamente il sito. La porosità connette il parco circolare interno al museo tecnico ad ovest. Una serra fotovoltaica nel cortile permette produzione alimentare annuale, configurandosi come "padiglione agricolo". Orti condivisi, terrazze comuni e giardini privati completano il sistema di spazi aperti.`,

    'project.novecento.title': "Novecentopiù'cento",
    'project.novecento.location': 'Milano, Italia',
    'project.novecento.description': `Il progetto intreccia la città con il percorso museale, creando una continuità con lo spazio pubblico del Museo del Novecento. La passerella connette il percorso museale pubblico tra i due Arengari senza interferire con le sequenze espositive, garantendo flessibilità e preservando l'organizzazione museale. Il percorso sospeso estende lo spazio collettivo urbano: il suolo di via Marconi si duplica per diventare collegamento, terrazza e spazio espositivo su piazza Duomo.

L'elemento di connessione stabilisce una continuità con i porticati della città storica, preserva il collegamento visivo tra la Galleria e la Torre Martini, definisce piazza Diaz e l'ingresso alle strutture museali. I due Arengari stabiliscono un dialogo attraverso la luce e installazioni ambientali.

Il tema della scatola nella scatola: i solai si susseguono sfalsati in un gioco di pieni e vuoti, creando doppie e triple altezze con una spazialità in grado di accogliere opere d'arte differenti. L'intervento è una grande macchina che permette differenti spazialità con elevata flessibilità museografica. Ambienti di dimensioni e altezze diverse consentono performance, esposizione di quadri, video, sculture e grandi installazioni.

L'intervento si sviluppa su una struttura autonoma. I muri esistenti fungono da filtro tra percorso ed esterno, mentre lo spazio interno è delimitato da una struttura reticolare rivestita da una filigrana metallica. In un gioco di trasparenze l'occhio del visitatore si sposta dal paesaggio urbano alle opere esposte. Pilastri, struttura reticolare, rete, muro – acciaio e pietra, elemento evanescente e massiccio – definiscono la sequenza degli elementi architettonici. Nell'opzione di collegamento sotterraneo, i due Arengari comunicano attraverso una corte espositiva ipogea connessa direttamente alla metropolitana.`,

    'project.illerpark.title': 'Wohnen am Illerpark',
    'project.illerpark.location': 'Germania',
    
    'project.shinkenchiku.title': '4 Houses - Shinkenchiku',
    'project.shinkenchiku.location': 'Internazionale',
    
    'project.europan11.title': 'Europan 11 - Floating Blocks',
    'project.europan11.location': 'Leeuwarden, Paesi Bassi',
    
    'project.aluartforum.title': 'Aluartforum',
    'project.aluartforum.location': 'Croazia',
    
    'project.expo.title': 'Architetture di Servizio Expo',
    'project.expo.location': 'Milano, Italia',
    
    // Publications
    'publications.title': 'Pubblicazioni',
    
    // Contact
    'contact.title': 'Contatti',
    'contact.description': 'Sono sempre interessata a nuove collaborazioni e progetti stimolanti. Non esitare a contattarmi per discutere le tue idee.',
    'contact.studio': 'Studio',
    
    // Footer
    'footer.rights': 'Tutti i diritti riservati.',
    'footer.privacy': 'Autorizzo il trattamento dei miei dati personali secondo la legge vigente.',
  },
  en: {
    // Header & Navigation
    'nav.profile': 'Profile',
    'nav.projects': 'Projects',
    'nav.publications': 'Publications',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    
    // Hero
    'hero.title': 'Architect',
    'hero.description': 'Architecture as a layered narrative, between space, time and landscape.',
    'hero.cta': 'Discover more ↓',
    
    // Profile
    'profile.title': 'Profile',
    'profile.p1': "For Alina Lippiello, architecture is a layered narrative. Each project is a fragment of a broader story, made of connections between space and time, between memory and innovation, between city and landscape.",
    'profile.p2': "Her path is distinguished by an approach that combines theoretical research and design practice, experimentation and concreteness, always with a careful eye on urban transformation and the continuity between architecture and territory.",
    'profile.p3': "Today, through a distributed studio between Milan, Montreal, Rotterdam and Padua, she continues to explore the potential of architecture as a tool for urban transformation, with a focus on porous spaces, territorial continuity and new forms of collective living.",
    'profile.education': 'Education',
    'profile.edu1': 'PhD in Architectural and Urban Design, Politecnico di Milano',
    'profile.edu2': 'Master in Urban and Regional Design, NYIT New York',
    'profile.edu3': 'Degree in Architecture, Politecnico di Milano (97/100)',
    'profile.edu4': 'Faculdade de Arquitectura, Universidade do Porto',
    
    // Experience
    'experience.title': 'Competitions and Projects',
    'experience.inProgress': 'In progress',
    'experience.competition': 'Competition',
    'experience.international': 'International',
    
    // Projects
    'project.wernigerode1.title': 'Permeable Garden City - Project',
    'project.wernigerode1.location': 'Wernigerode, Germany',
    'project.wernigerode1.description': `The proposal develops an urban vision based on three levels of interconnected porosity.

At the urban scale, a network of ecological corridors reconnects the natural fragments of the city, infiltrating contemporary fragmentation. The project area becomes central in this new green-blue synergy between the Bürgerpark and the Holtemme river, extending pedestrian and cycling connectivity towards the historic center.

At the neighborhood scale, the project defines common spaces and a permeable structure. The hilltop hosts a circular park with urban forest, play areas and a viewpoint towards the castle. New gardens connect to existing ones, while pedestrian paths overcome railway barriers. Mobility is rethought with slow-traffic streets and pedestrian connections to the river.

This vision reinterprets the garden city: instead of a radial system, it proposes clusters of interconnected common spaces that transform urban monofunctionality into a porous ecosystem of social accessibility and inclusion.`,

    'project.wernigerode2.title': 'Permeable Garden City - Competition',
    'project.wernigerode2.location': 'Wernigerode, Germany',
    'project.wernigerode2.description': `The architectural competition project is articulated in two complementary areas that dialogue with the existing topography.

North Area (32 apartments) - Under construction: The building serves as an urban gateway, connecting the park to the neighborhood. The volumes reconnect the western linear blocks with the northern isolated houses, harmoniously fitting into the organic fabric. Portals and cuts ensure public permeability towards cycle-pedestrian paths. Sustainable materials (wood and concrete), circular water management systems and energy production characterize the intervention. The typological mix favors intergenerational social compositions, with live-work spaces and commercial activities on the ground floor.

South Area (25 apartments): It hybridizes the row house typology with pitched and linear roofs, organically following the site. The porosity connects the internal circular park to the technical museum to the west. A photovoltaic greenhouse in the courtyard allows annual food production, configured as an "agricultural pavilion". Shared gardens, common terraces and private gardens complete the open space system.`,

    'project.novecento.title': "Novecentopiù'cento",
    'project.novecento.location': 'Milan, Italy',
    'project.novecento.description': `The project interweaves the city with the museum path, creating continuity with the public space of the Museo del Novecento. The walkway connects the public museum path between the two Arengari without interfering with the exhibition sequences, ensuring flexibility and preserving the museum organization. The suspended path extends the collective urban space: the ground of via Marconi is duplicated to become a connection, terrace and exhibition space on Piazza Duomo.

The connecting element establishes continuity with the porticoes of the historic city, preserves the visual connection between the Galleria and the Martini Tower, defines Piazza Diaz and the entrance to the museum structures. The two Arengari establish a dialogue through light and environmental installations.

The theme of the box within the box: the floors follow each other staggered in a play of solids and voids, creating double and triple heights with a spatiality capable of accommodating different works of art. The intervention is a large machine that allows different spatialities with high museographic flexibility. Rooms of different sizes and heights allow performances, exhibitions of paintings, videos, sculptures and large installations.

The intervention is developed on an autonomous structure. The existing walls act as a filter between the path and the exterior, while the internal space is delimited by a lattice structure covered with a metallic filigree. In a play of transparencies, the visitor's eye moves from the urban landscape to the exhibited works. Pillars, lattice structure, mesh, wall – steel and stone, evanescent and massive element – define the sequence of architectural elements. In the underground connection option, the two Arengari communicate through an underground exhibition courtyard directly connected to the subway.`,

    'project.illerpark.title': 'Wohnen am Illerpark',
    'project.illerpark.location': 'Germany',
    
    'project.shinkenchiku.title': '4 Houses - Shinkenchiku',
    'project.shinkenchiku.location': 'International',
    
    'project.europan11.title': 'Europan 11 - Floating Blocks',
    'project.europan11.location': 'Leeuwarden, Netherlands',
    
    'project.aluartforum.title': 'Aluartforum',
    'project.aluartforum.location': 'Croatia',
    
    'project.expo.title': 'Expo Service Architectures',
    'project.expo.location': 'Milan, Italy',
    
    // Publications
    'publications.title': 'Publications',
    
    // Contact
    'contact.title': 'Contact',
    'contact.description': "I'm always interested in new collaborations and exciting projects. Don't hesitate to contact me to discuss your ideas.",
    'contact.studio': 'Studio',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'I authorize the processing of my personal data according to current legislation.',
  },
  es: {
    // Header & Navigation
    'nav.profile': 'Perfil',
    'nav.projects': 'Proyectos',
    'nav.publications': 'Publicaciones',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    
    // Hero
    'hero.title': 'Arquitecta',
    'hero.description': 'La arquitectura como narrativa estratificada, entre espacio, tiempo y paisaje.',
    'hero.cta': 'Descubre más ↓',
    
    // Profile
    'profile.title': 'Perfil',
    'profile.p1': "Para Alina Lippiello, la arquitectura es una narrativa estratificada. Cada proyecto es un fragmento de una historia más amplia, hecha de conexiones entre espacio y tiempo, entre memoria e innovación, entre ciudad y paisaje.",
    'profile.p2': "Su trayectoria se distingue por un enfoque que combina investigación teórica y práctica proyectual, experimentación y concreción, siempre con una mirada atenta a la transformación urbana y la continuidad entre arquitectura y territorio.",
    'profile.p3': "Hoy, a través de un estudio distribuido entre Milán, Montreal, Róterdam y Padua, continúa explorando el potencial de la arquitectura como herramienta de transformación urbana, con un enfoque en espacios porosos, continuidad territorial y nuevas formas de habitar colectivo.",
    'profile.education': 'Formación',
    'profile.edu1': 'Doctorado en Diseño Arquitectónico y Urbano, Politécnico de Milán',
    'profile.edu2': 'Máster en Diseño Urbano y Regional, NYIT Nueva York',
    'profile.edu3': 'Licenciatura en Arquitectura, Politécnico de Milán (97/100)',
    'profile.edu4': 'Faculdade de Arquitectura, Universidade do Porto',
    
    // Experience
    'experience.title': 'Concursos y Proyectos',
    'experience.inProgress': 'En curso',
    'experience.competition': 'Concurso',
    'experience.international': 'Internacional',
    
    // Projects
    'project.wernigerode1.title': 'Ciudad Jardín Permeable - Proyecto',
    'project.wernigerode1.location': 'Wernigerode, Alemania',
    'project.wernigerode1.description': `La propuesta desarrolla una visión urbana basada en tres niveles de porosidad interconectada.

A escala urbana, una red de corredores ecológicos reconecta los fragmentos naturales de la ciudad, infiltrándose en la fragmentación contemporánea. El área del proyecto se vuelve céntrica en esta nueva sinergia verde-azul entre el Bürgerpark y el río Holtemme, extendiendo la conectividad peatonal y ciclista hacia el centro histórico.

A escala de barrio, el proyecto define espacios comunes y una estructura permeable. La cima de la colina alberga un parque circular con bosque urbano, áreas de juego y un mirador hacia el castillo. Nuevos huertos se conectan con los existentes, mientras que los senderos peatonales superan las barreras ferroviarias. La movilidad se repiensa con calles de tráfico lento y conexiones peatonales hacia el río.

Esta visión reinterpreta la ciudad jardín: en lugar de un sistema radial, propone clusters de espacios comunes interconectados que transforman la monofuncionalidad urbana en un ecosistema poroso de accesibilidad social e inclusión.`,

    'project.wernigerode2.title': 'Ciudad Jardín Permeable - Concurso',
    'project.wernigerode2.location': 'Wernigerode, Alemania',
    'project.wernigerode2.description': `El proyecto arquitectónico del concurso se articula en dos áreas complementarias que dialogan con la topografía existente.

Área Norte (32 viviendas) - En construcción: El edificio funciona como puerta urbana, conectando el parque con el barrio. Los volúmenes reconectan los bloques lineales occidentales con las casas aisladas del norte, integrándose armónicamente en el tejido orgánico. Portales y cortes garantizan permeabilidad pública hacia los senderos ciclopeatonales. Materiales sostenibles (madera y hormigón), sistemas de gestión circular del agua y producción energética caracterizan la intervención. La mixité tipológica favorece composiciones sociales intergeneracionales, con espacios de trabajo-vivienda y actividades comerciales en planta baja.

Área Sur (25 viviendas): Hibrida la tipología de casas en hilera con cubiertas a dos aguas y lineales, siguiendo orgánicamente el sitio. La porosidad conecta el parque circular interno con el museo técnico al oeste. Un invernadero fotovoltaico en el patio permite la producción alimentaria anual, configurándose como "pabellón agrícola". Huertos compartidos, terrazas comunes y jardines privados completan el sistema de espacios abiertos.`,

    'project.novecento.title': "Novecentopiù'cento",
    'project.novecento.location': 'Milán, Italia',
    'project.novecento.description': `El proyecto entrelaza la ciudad con el recorrido museístico, creando una continuidad con el espacio público del Museo del Novecento. La pasarela conecta el recorrido museístico público entre los dos Arengari sin interferir con las secuencias expositivas, garantizando flexibilidad y preservando la organización museística. El recorrido suspendido extiende el espacio colectivo urbano: el suelo de via Marconi se duplica para convertirse en conexión, terraza y espacio expositivo sobre Piazza Duomo.

El elemento de conexión establece una continuidad con los pórticos de la ciudad histórica, preserva la conexión visual entre la Galleria y la Torre Martini, define Piazza Diaz y la entrada a las estructuras museísticas. Los dos Arengari establecen un diálogo a través de la luz e instalaciones ambientales.

El tema de la caja dentro de la caja: los forjados se suceden escalonados en un juego de llenos y vacíos, creando dobles y triples alturas con una espacialidad capaz de acoger diferentes obras de arte. La intervención es una gran máquina que permite diferentes espacialidades con alta flexibilidad museográfica. Ambientes de diferentes dimensiones y alturas permiten performances, exposición de cuadros, videos, esculturas y grandes instalaciones.

La intervención se desarrolla sobre una estructura autónoma. Los muros existentes funcionan como filtro entre el recorrido y el exterior, mientras que el espacio interno está delimitado por una estructura reticular revestida de filigrana metálica. En un juego de transparencias, el ojo del visitante se desplaza del paisaje urbano a las obras expuestas. Pilares, estructura reticular, red, muro – acero y piedra, elemento evanescente y macizo – definen la secuencia de los elementos arquitectónicos. En la opción de conexión subterránea, los dos Arengari se comunican a través de un patio expositivo hipogeo conectado directamente al metro.`,

    'project.illerpark.title': 'Wohnen am Illerpark',
    'project.illerpark.location': 'Alemania',
    
    'project.shinkenchiku.title': '4 Houses - Shinkenchiku',
    'project.shinkenchiku.location': 'Internacional',
    
    'project.europan11.title': 'Europan 11 - Floating Blocks',
    'project.europan11.location': 'Leeuwarden, Países Bajos',
    
    'project.aluartforum.title': 'Aluartforum',
    'project.aluartforum.location': 'Croacia',
    
    'project.expo.title': 'Arquitecturas de Servicio Expo',
    'project.expo.location': 'Milán, Italia',
    
    // Publications
    'publications.title': 'Publicaciones',
    
    // Contact
    'contact.title': 'Contacto',
    'contact.description': 'Siempre estoy interesada en nuevas colaboraciones y proyectos estimulantes. No dudes en contactarme para discutir tus ideas.',
    'contact.studio': 'Estudio',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Autorizo el tratamiento de mis datos personales según la legislación vigente.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
