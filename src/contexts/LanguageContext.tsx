import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

    'project.wernigerode2.title': 'Living the New Ecological Porous Garden City of Wernigerode',
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
    
    'project.split.title': 'Split: completamento del waterfront nel porto vecchio. Nuovo nodo intermodale per la città e il territorio',
    'project.split.location': 'Spalato, Croazia',
    'project.split.coauthor': 'Con Ivo Covic',
    'project.split.description': `Completamento del waterfront nel porto vecchio. Nuovo nodo intermodale per la città e il territorio.

Il progetto per il porto di Spalato è un intervento infrastrutturale volto a gestire l'aumento del traffico turistico e pendolare. Si prevede di trasformare la stazione ferroviaria in una stazione passante e introdurre una metropolitana leggera. Sono pianificati ampliamenti delle banchine e nuovi attracchi per navi da crociera, oltre a una strada a quattro corsie per l'accesso ai traghetti e parcheggi interrati.

Situato nel cuore della città, il porto è un nodo strategico per la Dalmazia, ma attualmente si presenta come un vuoto urbano privo di un fronte mare definito. L'intervento si ispira alla geografia e alla storia della città, adottando un approccio di "agopuntura urbanistica" per connettere il porto al tessuto urbano esistente. I nuovi volumi dialogano con il contesto storico: un edificio di testa si relaziona con il Palazzo di Diocleziano e gli edifici pubblici, mentre edificazioni perpendicolari al mare ripristinano la connessione visiva del borgo marinaro con la costa. Verso sud-est, una struttura organica, ispirata alla Casa Malaparte, si sviluppa con terrazzamenti fino alla collina, creando un nuovo punto di osservazione sul mare.

Il progetto completa una storia già scritta, ricucendo il rapporto tra Spalato e il suo porto attraverso una strategia che integra infrastrutture, architettura e paesaggio.`,

    'project.koresnica.title': 'Koresnica_Split',
    'project.koresnica.location': 'Split, Croazia',
    'project.koresnica.description': `L'obiettivo della pianificazione è quello di integrare il nuovo insediamento con il contesto naturale, rispettando l'ecosistema. Si prevede di conservare la zona centrale del corso d'acqua, creando un parco lineare collegato alle aree pubbliche e sportive. Il sistema di mobilità sarà progettato per sostenere la sostenibilità, collegando l'asilo, il centro commerciale, la sala polifunzionale, la chiesa e la biblioteca. Le zone residenziali situate sui pendii offriranno viste panoramiche, con nove lotti progettati per formare quartieri distinti. L'accesso veicolare sarà limitato per ridurre il traffico e preservare un ambiente vivibile, contribuendo così a una migliore qualità della vita per tutti gli abitanti.`,

    'project.lorenteggio.title': 'Biblioteca Lorenteggio',
    'project.lorenteggio.location': 'Milano, Italia',
    'project.lorenteggio.description': `"Il mio disegno non era il disegno di un cappello. Era il disegno di un boa che digeriva un elefante." (Antoine de Saint-Exupéry, Il piccolo principe)

L'illustrazione si presenta in tutta la sua semplicità, composta da pochi tratti essenziali, lineari, con preferenza per le linee dritte e leggere. La forza sta proprio in questa apparenza di non-finito, che dona ai disegni la capacità di posarsi nell'immaginazione di chi legge con un'infinita leggerezza.

La nuova biblioteca di Lorenteggio è l'elefante dentro il boa, che si dispiega da nord a sud del giardino per captare i flussi dei passanti e condurli all'ingresso dell'edificio. Il "boa" è lo spazio pubblico che si dilata e si comprime a seconda delle forze che l'"elefante", la biblioteca, genera con il contesto.`,

    'project.zagrebBgg.title': 'Facoltà di Biologia, Geografia e Geologia (BGG) - Zagabria',
    'project.zagrebBgg.location': 'Zagabria, Croazia',
    'project.zagrebBgg.description': `Il nuovo edificio per le Facoltà di Biologia, Geografia e Geologia (BGG) a Zagabria è un progetto architettonico innovativo che si posiziona sulle pendici settentrionali della città, cercando di fondersi armoniosamente con il paesaggio naturale circostante. Ispirandosi alle "dita verdi" che scendono dal Monte Medvednica, il progetto non si impone sul terreno ma vi si adagia, creando una serie di strutture lineari che si estendono da nord a sud.

Questo approccio, che unisce le tipologie architettoniche lineare e a "tappeto" (mat building), permette all'edificio di "scivolare" lungo il pendio, incorporando il verde e creando una profonda connessione tra l'architettura e l'ambiente.

Sebbene sia un'unica struttura, il complesso è stato concepito per ospitare tre facoltà che possono anche operare come unità indipendenti, con una chiara divisione funzionale che colloca gli uffici nella parte orientale e le aree di ricerca al centro.

Il cuore del progetto è un sistema diagonale di spazi pubblici e rampe che non solo collega i diversi livelli dell'edificio ma crea anche un nuovo polo di aggregazione sociale per la comunità studentesca.`,
    
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

    'project.wernigerode2.title': 'Living the New Ecological Porous Garden City of Wernigerode',
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
    
    'project.split.title': 'Split: completion of the waterfront in the old port. New intermodal hub for the city and territory',
    'project.split.location': 'Split, Croatia',
    'project.split.coauthor': 'With Ivo Covic',
    'project.split.description': `Completion of the waterfront in the old port. New intermodal hub for the city and territory.

The Split port project is an infrastructural intervention aimed at managing the increase in tourist and commuter traffic. It plans to transform the railway station into a through station and introduce a light metro. Expansions of the quays and new berths for cruise ships are planned, as well as a four-lane road for ferry access and underground parking.

Located in the heart of the city, the port is a strategic hub for Dalmatia, but currently appears as an urban void lacking a defined waterfront. The intervention draws inspiration from the geography and history of the city, adopting an "urban acupuncture" approach to connect the port to the existing urban fabric. The new volumes dialogue with the historical context: a head building relates to Diocletian's Palace and public buildings, while buildings perpendicular to the sea restore the visual connection between the fishing village and the coast. To the southeast, an organic structure, inspired by Casa Malaparte, develops with terraces up to the hill, creating a new vantage point over the sea.

The project completes an already written story, mending the relationship between Split and its port through a strategy that integrates infrastructure, architecture and landscape.`,

    'project.koresnica.title': 'Koresnica_Split',
    'project.koresnica.location': 'Split, Croatia',
    'project.koresnica.description': `The planning objective is to integrate the new settlement with the natural context, respecting the ecosystem. It is planned to preserve the central area of the watercourse, creating a linear park connected to public and sports areas. The mobility system will be designed to support sustainability, connecting the kindergarten, shopping center, multipurpose hall, church and library. The residential areas located on the slopes will offer panoramic views, with nine lots designed to form distinct neighborhoods. Vehicular access will be limited to reduce traffic and preserve a livable environment, thus contributing to a better quality of life for all inhabitants.`,

    'project.lorenteggio.title': 'Lorenteggio Library',
    'project.lorenteggio.location': 'Milan, Italy',
    'project.lorenteggio.description': `"My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant." (Antoine de Saint-Exupéry, The Little Prince)

The illustration presents itself in all its simplicity, composed of a few essential, linear strokes, with a preference for straight and light lines. The strength lies precisely in this appearance of non-finito, which gives the drawings the ability to settle in the reader's imagination with infinite lightness.

The new Lorenteggio library is the elephant inside the boa, which unfolds from north to south of the garden to capture the flows of passersby and lead them to the building's entrance. The "boa" is the public space that expands and compresses according to the forces that the "elephant", the library, generates with its context.`,

    'project.zagrebBgg.title': 'Faculty of Biology, Geography and Geology (BGG) - Zagreb',
    'project.zagrebBgg.location': 'Zagreb, Croatia',
    'project.zagrebBgg.description': `The new building for the Faculties of Biology, Geography and Geology (BGG) in Zagreb is an innovative architectural project positioned on the northern slopes of the city, seeking to blend harmoniously with the surrounding natural landscape. Inspired by the "green fingers" descending from Mount Medvednica, the project does not impose itself on the terrain but settles into it, creating a series of linear structures extending from north to south.

This approach, which combines linear and "mat building" architectural typologies, allows the building to "slide" along the slope, incorporating greenery and creating a deep connection between architecture and environment.

Although it is a single structure, the complex was designed to house three faculties that can also operate as independent units, with a clear functional division placing offices in the eastern part and research areas in the center.

The heart of the project is a diagonal system of public spaces and ramps that not only connects the different levels of the building but also creates a new hub of social gathering for the student community.`,
    
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
    
    'project.split.title': 'Split: completamiento del waterfront en el puerto viejo. Nuevo nodo intermodal para la ciudad y el territorio',
    'project.split.location': 'Split, Croacia',
    'project.split.coauthor': 'Con Ivo Covic',
    'project.split.description': `Completamiento del waterfront en el puerto viejo. Nuevo nodo intermodal para la ciudad y el territorio.

El proyecto para el puerto de Split es una intervención infraestructural destinada a gestionar el aumento del tráfico turístico y pendular. Se prevé transformar la estación ferroviaria en una estación pasante e introducir un metro ligero. Se planifican ampliaciones de los muelles y nuevos atraques para cruceros, además de una carretera de cuatro carriles para el acceso a los ferries y aparcamientos subterráneos.

Situado en el corazón de la ciudad, el puerto es un nodo estratégico para Dalmacia, pero actualmente se presenta como un vacío urbano sin un frente marítimo definido. La intervención se inspira en la geografía y la historia de la ciudad, adoptando un enfoque de "acupuntura urbana" para conectar el puerto con el tejido urbano existente. Los nuevos volúmenes dialogan con el contexto histórico: un edificio de cabecera se relaciona con el Palacio de Diocleciano y los edificios públicos, mientras que edificaciones perpendiculares al mar restablecen la conexión visual del pueblo marinero con la costa. Hacia el sureste, una estructura orgánica, inspirada en la Casa Malaparte, se desarrolla con terrazas hasta la colina, creando un nuevo punto de observación sobre el mar.

El proyecto completa una historia ya escrita, remendando la relación entre Split y su puerto a través de una estrategia que integra infraestructuras, arquitectura y paisaje.`,

    'project.koresnica.title': 'Koresnica_Split',
    'project.koresnica.location': 'Split, Croacia',
    'project.koresnica.description': `El objetivo de la planificación es integrar el nuevo asentamiento con el contexto natural, respetando el ecosistema. Se prevé conservar la zona central del curso de agua, creando un parque lineal conectado a las áreas públicas y deportivas. El sistema de movilidad se diseñará para apoyar la sostenibilidad, conectando la guardería, el centro comercial, la sala polivalente, la iglesia y la biblioteca. Las zonas residenciales situadas en las laderas ofrecerán vistas panorámicas, con nueve lotes diseñados para formar barrios distintos. El acceso vehicular será limitado para reducir el tráfico y preservar un ambiente habitable, contribuyendo así a una mejor calidad de vida para todos los habitantes.`,

    'project.lorenteggio.title': 'Biblioteca Lorenteggio',
    'project.lorenteggio.location': 'Milán, Italia',
    'project.lorenteggio.description': `"Mi dibujo no era el dibujo de un sombrero. Era el dibujo de una boa digiriendo un elefante." (Antoine de Saint-Exupéry, El Principito)

La ilustración se presenta en toda su simplicidad, compuesta por pocos trazos esenciales, lineales, con preferencia por las líneas rectas y ligeras. La fuerza reside precisamente en esta apariencia de no-finito, que otorga a los dibujos la capacidad de posarse en la imaginación del lector con una ligereza infinita.

La nueva biblioteca de Lorenteggio es el elefante dentro de la boa, que se despliega de norte a sur del jardín para captar los flujos de los transeúntes y conducirlos a la entrada del edificio. La "boa" es el espacio público que se dilata y se comprime según las fuerzas que el "elefante", la biblioteca, genera con el contexto.`,

    'project.zagrebBgg.title': 'Facultad de Biología, Geografía y Geología (BGG) - Zagreb',
    'project.zagrebBgg.location': 'Zagreb, Croacia',
    'project.zagrebBgg.description': `El nuevo edificio para las Facultades de Biología, Geografía y Geología (BGG) en Zagreb es un proyecto arquitectónico innovador situado en las laderas septentrionales de la ciudad, buscando fusionarse armoniosamente con el paisaje natural circundante. Inspirándose en los "dedos verdes" que descienden del Monte Medvednica, el proyecto no se impone sobre el terreno sino que se asienta en él, creando una serie de estructuras lineales que se extienden de norte a sur.

Este enfoque, que combina las tipologías arquitectónicas lineal y "mat building" (edificio tapiz), permite que el edificio "deslice" a lo largo de la pendiente, incorporando el verde y creando una profunda conexión entre la arquitectura y el ambiente.

Aunque es una única estructura, el complejo fue concebido para albergar tres facultades que también pueden operar como unidades independientes, con una clara división funcional que ubica las oficinas en la parte oriental y las áreas de investigación en el centro.

El corazón del proyecto es un sistema diagonal de espacios públicos y rampas que no solo conecta los diferentes niveles del edificio sino que también crea un nuevo polo de agregación social para la comunidad estudiantil.`,
    
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
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['it', 'en', 'es'].includes(saved)) {
      return saved;
    }
    // Check URL param
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang') as Language;
    if (langParam && ['it', 'en', 'es'].includes(langParam)) {
      return langParam;
    }
    return 'it';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

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
