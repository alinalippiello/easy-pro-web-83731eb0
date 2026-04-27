import { useState, ReactNode, useEffect } from 'react';
import { LanguageContext } from '@/contexts/language';
import type { Language } from '@/contexts/language';

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

    'strati.heading': "L'architettura come paesaggio",
    'strati.text': "L'architettura non come oggetto, ma come campo. Un sistema continuo in cui edificio e paesaggio coincidono, e la forma emerge come rivelazione di condizioni latenti.",
    
    // Profile
    'profile.subtitle': 'Architetto | Concept designer | Direzione artistica',
    'profile.vision.title': 'Visione',
    'profile.vision.quote': "L'architettura non è un oggetto, ma un campo di forze.",
    'profile.vision.text': "È una soglia tra paesaggio e costruito, tra memoria e trasformazione, tra ciò che esiste e ciò che può emergere. Il mio lavoro nasce da questa tensione: progetto spazi che non si impongono, ma si innestano; che non separano, ma connettono; che non si limitano a rispondere a una funzione, ma costruiscono senso.",
    'profile.profile.title': 'Profilo',
    'profile.profile.p1': "Sono un architetto e concept designer che lavora al confine tra progetto, ricerca e direzione artistica. Il mio percorso si è sviluppato attraverso concorsi internazionali, progetti residenziali e una riflessione critica sull'architettura contemporanea, con un interesse costante per il rapporto tra spazio, paesaggio e struttura urbana.",
    'profile.profile.p2': "La mia formazione integra pratica progettuale e ricerca teorica.",
    'profile.profile.p3': "La tesi di laurea, dedicata alla riconfigurazione del waterfront di Spalato, indaga la continuità tra città e mare e il rapporto tra spazio costruito e spazio aperto. In questo lavoro emerge per la prima volta un interesse che attraversa ancora oggi la mia ricerca: la dissoluzione dei confini tra infrastruttura, paesaggio e struttura urbana.",
    'profile.profile.p4': "Successivamente ho approfondito questi temi attraverso il pensiero dell'architettura radicale e delle avanguardie del Novecento, sviluppando una riflessione sul concetto di architettura come campo.",
    'profile.profile.p5': "La mia ricerca si concentra sul concetto di architettura come paesaggio: un sistema continuo in cui figura e sfondo si dissolvono e in cui l'architettura emerge come condizione, più che come oggetto. Questo pensiero si sviluppa a partire da una ricerca in Progettazione Architettonica e Urbana iniziata presso il Politecnico di Milano e costituisce ancora oggi la base teorica della mia pratica.",
    'profile.profile.p6': "Il mio lavoro si sviluppa attraverso concorsi e collaborazioni internazionali — tra cui Europan e Shinkenchiku — che rappresentano un terreno di sperimentazione sul tema dell'abitare collettivo e delle infrastrutture come dispositivi capaci di connettere sistemi urbani frammentati. In questo contesto opero tra concept design, direzione artistica e consulenza strategica, accompagnando progetti complessi nella costruzione di una visione coerente, dalla fase iniziale fino allo sviluppo.",
    'profile.profile.p7': "Per me l'architettura si configura come un organismo stratificato: un campo di relazioni in cui spazio e tempo, città e paesaggio, memoria e trasformazione si intrecciano in un processo continuo. Ogni progetto è un frammento di questa ricerca, una forma che emerge da condizioni esistenti e le trasforma.",
    'profile.positioning.title': 'Posizionamento',
    'profile.positioning.quote1': 'Non progetto semplicemente edifici.',
    'profile.positioning.quote2': 'Progetto sistemi spaziali, paesaggi abitabili e scenari futuri.',
    'profile.positioning.text': "Credo in un'architettura capace di superare la logica dell'oggetto isolato per diventare campo, infrastruttura, paesaggio. Un'architettura che non occupa il territorio, ma lo interpreta.",
    'profile.invitation.title': 'Invito',
    'profile.invitation.text': "Se cerchi una visione capace di tenere insieme rigore concettuale e sensibilità spaziale, ricerca e pragmatismo, posso accompagnarti nella costruzione di un progetto che non sia solo una risposta tecnica, ma una narrazione coerente del luogo e del suo potenziale.",

    // Strati
    'strati.title': 'Strati',
    'strati.subtitle': 'Schizzi, modelli e disegni — strati di un pensiero progettuale che si accumula e si rivela.',
    'strati.piega.label': 'La piega',
    'strati.piega.concept': 'Lo spazio si genera per inflessione. La piega trasforma una superficie in un campo.',
    'strati.chiaroscuro.label': 'Chiaroscuro',
    'strati.chiaroscuro.concept': 'La luce come materiale progettuale — ombra e struttura definiscono lo spazio.',
    'strati.quartiere.label': 'Quartiere',
    'strati.quartiere.concept': 'Il modello urbano come strumento di verifica — scala, densità e verde si misurano con le mani.',
    'strati.innesto.label': "L'innesto",
    'strati.innesto.concept': 'Inserirsi senza cancellare. Aggiungere nuova materia al corpo vivo del paesaggio.',
    'strati.waterfront.label': 'Waterfront',
    'strati.waterfront.concept': "Architettura e infrastruttura come estensione della città verso l'acqua.",
    'strati.materia.label': 'Materia',
    'strati.materia.concept': 'Il modello come strumento di pensiero — la forma nasce dalle mani.',
    'strati.tessuto.label': 'Tessuto',
    'strati.tessuto.concept': 'Leggere la città esistente per innestare il nuovo — continuità e rottura controllata.',
     'strati.continuita.label': 'Continuità',
     'strati.continuita.concept': 'Costruito e territorio come un unico organismo in trasformazione.',
     'strati.porto.label': 'Porto',
     'strati.porto.concept': 'Il waterfront come soglia tra città e mare — infrastruttura e paesaggio si fondono.',
     'strati.masterplan.label': 'Masterplan',
      'strati.masterplan.concept': 'La visione dall\'alto rivela la struttura profonda del progetto urbano — geometrie, flussi e verde.',
      'strati.segno.label': 'Segno',
      'strati.segno.concept': 'Il gesto grafico come pensiero — lo schizzo cattura la tensione strutturale prima della forma.',
      'strati.nodo.label': 'Nodo',
      'strati.nodo.concept': 'Il nodo urbano come punto di convergenza — infrastruttura, mobilità e tessuto si intrecciano.',
      'strati.soglia.label': 'Soglia',
      'strati.soglia.concept': 'Lo spazio tra interno ed esterno — la soglia come momento di transizione e percezione.',
      'strati.facciata.label': 'Facciata',
      'strati.facciata.concept': 'L\'involucro come linguaggio — materia, struttura e contesto dialogano sulla strada.',
      'strati.topografia.label': 'Topografia',
      'strati.topografia.concept': 'Il suolo come materia di progetto — curve di livello, strati e infrastruttura si fondono.',
      'strati.orizzonte.label': 'Orizzonte',
      'strati.orizzonte.concept': 'L\'architettura nel paesaggio aperto — il progetto si distende seguendo la linea dell\'orizzonte.',
      'strati.close': 'Chiudi',
    'strati.prev': 'Precedente',
    'strati.next': 'Successiva',
    
    // Experience
    'experience.title': 'Concorsi e Progetti',
    'experience.inProgress': 'In corso',
    'experience.competition': 'Concorso',
    'experience.mention': 'Menzione',
    'experience.international': 'Internazionale',
    
    // Projects
    'project.wernigerode1.title': 'Living the New Ecological Porous Garden City. Wernigerode. Progetto',
    'project.wernigerode1.location': 'Wernigerode, Germania',
    'project.wernigerode1.description': `Il progetto residenziale di Wernigerode si configura come una soglia urbana, un dispositivo di connessione tra il Bürgerpark e il tessuto residenziale circostante, costruendo un rapporto diretto e continuo tra paesaggio e città. L'edificio è concepito come parte di un paesaggio costruito: assume e prosegue la tipologia esistente, interpretandola come campo continuo e trasformandola in un nuovo punto di intensità urbana.

Il progetto attiva una strategia di sviluppo ecologico per la città, generando nuovi corridoi verdi e promuovendo una porosità pedonale e ciclabile diffusa. In questa rete di attraversamenti, lo spazio pubblico si articola come sistema capillare di relazioni, in cui mobilità lenta, natura e vita urbana si intrecciano.

Gli edifici sono modellati attraverso una logica di riconnessione morfologica: i volumi lineari più alti a ovest si riallineano con le case isolate più basse a nord, integrandosi in modo armonico per completare la struttura organica del quartiere esistente. L'insieme costruisce una continuità tra densità e dispersione, tra struttura urbana e paesaggio domestico.

Varchi e incisioni attraversano il costruito, garantendo la permeabilità dello spazio pubblico e il suo legame con i percorsi pedonali e ciclabili del parco. In particolare, a nord, un grande varco coperto si configura come piazza abitabile e punto di ingresso alla città, un dispositivo di soglia tra infrastruttura urbana e vita collettiva.

L'architettura integra materiali sostenibili e tecnologie per la gestione delle acque e la produzione di energia rinnovabile, configurandosi come infrastruttura ecologica attiva. In questo quadro, il progetto promuove forme di abitare inclusive, intergenerazionali e resilienti, dove lo spazio costruito diventa parte di un ecosistema urbano in trasformazione.`,

    'project.wernigerode2.title': 'EUROPAN 16 — Living the New Ecological Porous Garden City. Wernigerode. Concorso',
    'project.wernigerode2.location': 'Wernigerode, Germania',
    'project.wernigerode2.description': `Living the New Ecological Porous Garden City
Concorso, Germania, 2021

Il progetto si articola su due aree complementari in dialogo con la topografia esistente.

Area Nord — 32 alloggi: L'edificio funge da porta urbana, connettendo il parco al quartiere. Il costruito è assunto come parte del paesaggio: le volumetrie proseguono e reinterpretano le tipologie esistenti, ricucendo i blocchi lineari occidentali con le case isolate settentrionali e integrandosi nel tessuto organico. Portali e tagli garantiscono permeabilità pubblica verso i percorsi ciclopedonali. Materiali sostenibili (legno e calcestruzzo), sistemi di gestione idrica circolare e produzione energetica caratterizzano l'intervento. La mixité tipologica favorisce composizioni sociali intergenerazionali, con spazi lavoro-abitazione e attività commerciali al piano terra.

Area Sud — 25 alloggi: L'intervento ibrida la tipologia a schiera con coperture a falde e volumi lineari, seguendo e amplificando le logiche del sito. Anche qui il progetto si configura come paesaggio costruito, in cui architettura e suolo si articolano in continuità. La porosità connette il parco circolare interno al museo tecnico a ovest. Una serra fotovoltaica nel cortile permette produzione alimentare annuale, configurandosi come padiglione agricolo. Orti condivisi, terrazze comuni e giardini privati completano il sistema degli spazi aperti.`,

    'project.novecento.title': "Novecentopiù'cento",
    'project.novecento.location': 'Concorso per l\'ampliamento del Museo del Novecento\nMilano, 2021',
    'project.novecento.description': `Il progetto Novecentopiùcento agisce come un innesto urbano che trasforma il percorso museale in continuità con lo spazio pubblico. La passerella tra i due Arengari non è un semplice collegamento, ma un'estensione del suolo di via Marconi che si duplica per diventare terrazza espositiva su Piazza Duomo.

Il cuore dell'intervento segue il concetto della 'scatola nella scatola': una struttura autonoma in filigrana metallica inserita nei volumi storici. Il gioco di doppie e triple altezze crea una macchina museografica flessibile, capace di accogliere dalle grandi installazioni alle performance contemporanee.

In un dialogo costante tra l'evanescenza dell'acciaio e la massa della pietra, l'occhio del visitatore si muove tra l'opera d'arte e il paesaggio della città storica.`,

    'project.illerpark.title': 'Wohnen am Illerpark',
    'project.illerpark.location': 'Germania',
    'project.illerpark.description': `DER GEMEINSCHAFTSRAUM

Lo Spazio Comunitario | Neu-Ulm

Der Gemeinschaftsraum nasce da una domanda fondamentale: è possibile progettare un quartiere residenziale che non si limiti a offrire alloggi, ma che diventi un generatore autentico di relazioni umane? Il progetto per Neu-Ulm risponde affermativamente, proponendo un modello abitativo dove sfera privata e collettiva non sono mondi separati, ma ecosistemi in dialogo costante.

Il Suolo Comune

Il principio guida del progetto è il Gemeinsame Boden — il Suolo Comune. I percorsi di distribuzione degli edifici vengono ampliati e trasformati in logge abitate: non semplici corridoi di passaggio, ma spazi soglia dove la vita quotidiana della comunità può dispiegarsi naturalmente. Un sistema continuo e graduato che accompagna i residenti dalla massima intimità dell'alloggio privato alla totale apertura della corte pubblica, abbattendo il confine netto tra dentro e fuori, tra individuale e collettivo.

I Tre Elementi Identitari

Il Balcone Pubblico caratterizza l'edificio nord come una piazza lineare sopraelevata: una loggia urbana dove la soglia tra alloggio privato e spazio collettivo si dissolve ogni giorno negli incontri casuali tra i residenti, costruendo mattone dopo mattone il tessuto relazionale della comunità.

Il Palcoscenico occupa il cuore della corte interna come spazio flessibile dedicato alla vita culturale del quartiere. Concerti, spettacoli, mercatini, feste di comunità: un luogo democratico e inclusivo dove chiunque può essere allo stesso tempo protagonista e spettatore, dove il confine tra arte e vita quotidiana si fa naturalmente poroso.

Il Calli reinterpreta in chiave contemporanea l'atmosfera dei vicoli storici europei — la calle veneziana, il Gasse tedesco. Nato dalla valorizzazione del pendio della rampa del garage sotterraneo, diventa un percorso pedonale vissuto che connette la quota stradale alla corte interna attraverso uno spazio denso di potenziale sociale.

Una Nuova Qualità dell'Abitare

Der Gemeinschaftsraum non offre semplicemente alloggi di qualità: propone una nuova qualità della vita urbana, più lenta, più relazionale, più consapevole del valore dello stare insieme. Un progetto dove l'architettura non è sfondo neutro della quotidianità, ma strumento attivo nella costruzione di una comunità coesa e vitale.`,
    
    'project.shinkenchiku.title': '4 Houses - Shinkenchiku',
    'project.shinkenchiku.location': 'Internazionale',
    'project.shinkenchiku.description': 'Il progetto ha ricevuto una menzione d\'onore al concorso Shinkenchiku Residential Design Competition.\n\nIl progetto risponde alla sfida di Rafael Moneo (in omaggio a John Hejduk), trasformando il Nine Square Grid nel Four Square House design problem: 4 case da 162 m² all\'interno di una maglia di 36x36 m.\n\nI Tre Pilastri Teorici\n\nL\'Oggetto-Totem (Hejduk): La casa non è solo funzione, ma entità geometrica pura. Gli elementi tecnologici (eolico e solare) diventano monumenti verticali che danno ritmo e identità al paesaggio.\n\nLa Griglia Aperta (Branzi): Superando il limite del lotto, il progetto adotta la logica della "No-Stop City". La maglia di 36 m è un frammento di un\'infrastruttura territoriale infinita dove architettura e natura si fondono in un supporto fluido.\n\nLa Crescita Modulare (Le Corbusier): Basato sulla "croissance illimitée", il sistema a quattro quadrati è un modulo aggregabile all\'infinito. La struttura spaziale evolve mantenendo l\'equilibrio costante tra tecnica (macchina) e natura (giardino).\n\nIl Metodo: L\'Abaco delle Strips\n\nAttraverso un\'analisi sistematica delle variazioni (pieno/vuoto, orientamento, densità), ogni modulo di 9 m² diventa una cellula potenziale. Il risultato è una Garden City contemporanea: un paesaggio tecnologico, rigoroso e autosufficiente, capace di espandersi senza perdere la propria coerenza geometrica.',
    'project.shinkenchiku.caption1': 'Vista assonometrica del masterplan',
    'project.shinkenchiku.caption2': 'Vista prospettica della città',
    'project.shinkenchiku.caption3': 'Masterplan generale',
    'project.shinkenchiku.caption4': 'Vista aerea della densità urbana',
    'project.shinkenchiku.caption5': 'Tipologie abitative - 4 case',
    'project.shinkenchiku.caption6': 'Diagrammi morfologici',
    'project.shinkenchiku.caption7': 'Planimetria tipo con infrastrutture',
    'project.shinkenchiku.caption8': 'Planimetria urbana',
    'project.shinkenchiku.caption9': 'Piante tipologiche - I e II piano',
    'project.shinkenchiku.caption10': 'Render - vista tra gli edifici',
    'project.shinkenchiku.caption11': 'Modello 3D con pannelli solari e turbine',
    'project.shinkenchiku.caption12': 'Riferimenti progettuali - Hejduk, Branzi, Le Corbusier',
    'project.shinkenchiku.caption13': 'Riferimenti urbanistici - Gruen, Howard, Crystaller',
    'project.shinkenchiku.caption14': 'Render del quartiere',
    
    'project.europan11.title': 'Europan 11 - Floating Blocks',
    'project.europan11.location': 'Leeuwarden, Paesi Bassi',
    'project.europan11.caption1': 'Sintesi urbana',
    'project.europan11.caption2': 'Planimetria generale',
    'project.europan11.caption3': 'Vista aerea',
    'project.europan11.caption4': 'Schema concettuale e fasi',
    'project.europan11.caption6': 'Vista panoramica',
    'project.europan11.caption8': 'Masterplan',
    'project.europan11.caption9': 'Venice system — pianta e assonometria',
    'project.europan11.caption10': 'Assonometria floating blocks',
    'project.europan11.caption11': 'Modelli — fasi costruttive',
    'project.europan11.caption12': 'Appartamenti — piante, sezioni e facciate',
    'project.europan11.caption13': 'Render — waterfront',
    'project.europan11.caption14': 'Strip building — piante e facciate',
    'project.europan11.caption15': 'Case — piante e facciate',
    'project.europan11.description': 'Il progetto propone un nuovo quartiere residenziale immerso nel paesaggio d\'acqua, ben connesso con la struttura urbana esistente e con la campagna circostante. Morfologicamente, il masterplan è formato da strisce insulari che seguono la direzione urbana della città verso nord, garantendo al tempo stesso una continuità verso est attraverso la loro ripetizione. A sud, il paesaggio si integra tra le strisce, diventando dita che penetrano acqua e verde — richiamando il dipinto Giorno e Notte di Escher, nativo di Leeuwarden, dove elementi della natura si trasformano l\'uno nell\'altro tra due fiumi.\n\nIl masterplan si organizza attorno a tre settori distinti: il Venezia Arsenale a ovest, la Tokyo Bay al centro e la San Francisco Bay a est. L\'acqua occupa quasi il 35% della superficie totale, offrendo variazione paesaggistica, privacy tra le abitazioni e un\'infrastruttura di movimento — in inverno, le superfici d\'acqua ghiacciata diventano spazio pubblico condiviso per pattinaggio e incontro.\n\nLa proposta ospita 400 alloggi di diversi tipi — abitazioni galleggianti, anfibie, su palafitte e su argine — ciascuno definito dalla sua relazione specifica con il livello dell\'acqua. Il mix tipologico distribuisce unità economiche (115 mq), medie (140 mq) e grandi (180 mq) tra i tre settori, tutte con vista e contatto diretto con l\'acqua.\n\nGli spazi aperti sono strutturati su tre scale: corti private, piccole isole palustri come estensione dello spazio privato, e parchi energetici che forniscono risorse sostenibili — energia eolica, recupero delle acque piovane, giardini filtro per la depurazione ecologica dell\'acqua — creando un ecosistema di quartiere autosufficiente.',
    
    'project.aluartforum.title': 'Aluartforum',
    'project.aluartforum.location': 'Zagabria, Croazia',
    'project.aluartforum.description': `Progetto sviluppato per il concorso di progettazione architettonica e urbanistica della nuova Galleria dell'Accademia di Belle Arti, ALUARTFORUM nasce dall'interpretazione di un vuoto urbano di particolare valore, situato tra il fronte storico di Ilica e il parco esistente.

L'intervento si confronta con una condizione delicata: da un lato la possibilità di ricomporre la continuità del prospetto urbano, dall'altro la necessità di preservare l'apertura del verde verso la città. Il progetto sceglie di mantenere questa soglia come spazio di relazione, lasciando che il parco continui a dialogare con la strada e con il tessuto costruito.

L'edificio si configura come un padiglione espositivo verticale, composto da una sequenza di volumi sovrapposti che ospitano spazi per esposizioni temporanee e permanenti, workshop, uffici e una terrazza pubblica. Lo slittamento dei piani genera una composizione dinamica capace di instaurare un rapporto misurato con il contesto storico e, allo stesso tempo, di aprirsi verso il paesaggio del parco.

Elemento centrale della proposta è il sistema di verde verticale, concepito come prosecuzione del paesaggio esistente. Le pareti verdi filtrano la luce, migliorano il microclima e trasformano i fronti laterali in una superficie viva, rafforzando la continuità tra interno ed esterno.

La luce naturale diventa parte integrante del progetto: l'orientamento degli spazi e il disegno volumetrico consentono di modulare intensità e qualità luminosa, creando ambienti espositivi differenti e adattabili.

Più che un semplice edificio, ALUARTFORUM si propone come dispositivo urbano di connessione, capace di mettere in relazione arte, spazio pubblico e paesaggio in una nuova forma di continuità.`,
    
    'project.expo.title': 'EXPO MILANO 2015 — Architetture di Servizio',
    'project.expo.location': 'Milano, Italia',
    'project.expo.description': `Il progetto definisce un sistema architettonico e micro-paesaggistico omogeneo applicato alle diverse scale dell'intervento: le grandi Stecche di servizio, le Unità di Servizio e i Chioschi. Il sistema costruttivo è basato sull'assemblaggio a secco, con priorità alla rapidità di montaggio e smontaggio e al massimo riutilizzo dei materiali.

Le Stecche si articolano attorno a quattro temi principali. I giardini di testata sul fronte del Decumano creano aree di sosta con graminacee ad alto fusto, punti d'acqua e spazi per i bambini, autosufficienti grazie al recupero dell'acqua piovana dalle coperture. Le funzioni permeanti — bar, ristoranti, negozi — garantiscono la massima apertura dei fronti e permettono l'attraversamento dell'edificio in senso orizzontale e verticale, con spazi di prossimità protetti da sole e pioggia. Al primo piano, ampie terrazze-piazze con vista sul paesaggio ospitano attività di ristorazione ed eventi temporanei, accessibili da un ballatoio continuo. La doppia pelle differenzia i fronti: compatta sul lato dei percorsi pedonali, aperta e leggera sul lato dei giardini e degli specchi d'acqua, con un coefficiente di ombreggiamento passivo dell'80%.

Il progetto strutturale adotta un'intelaiatura mista acciaio-legno prefabbricata, con luce massima di 14,60 metri in senso trasversale. La costruzione completamente a secco oltre quota piano terreno garantisce rapidità di montaggio e facilità di smantellamento. Il progetto ottiene una valutazione LEED Gold con 67 punti, con una stima di riutilizzo del 51% dei materiali e riciclo dell'11%, per una riduzione potenziale dei costi fino al 62% dell'importo previsto.`,
    
    'project.split.title': 'Split: completamento del waterfront nel porto vecchio. Nuovo nodo intermodale per la città e il territorio',
    'project.split.location': 'Spalato, Croazia',
    'project.split.coauthor': 'Con Ivo Covic',
    'project.split.description': `Completamento del waterfront nel porto vecchio. Nuovo nodo intermodale per la città e il territorio.

Il progetto per il porto di Spalato è un intervento infrastrutturale volto a gestire l'aumento del traffico turistico e pendolare. Si prevede di trasformare la stazione ferroviaria in una stazione passante e introdurre una metropolitana leggera. Sono pianificati ampliamenti delle banchine e nuovi attracchi per navi da crociera, oltre a una strada a quattro corsie per l'accesso ai traghetti e parcheggi interrati.

Situato nel cuore della città, il porto è un nodo strategico per la Dalmazia, ma attualmente si presenta come un vuoto urbano privo di un fronte mare definito. L'intervento si ispira alla geografia e alla storia della città, adottando un approccio di "agopuntura urbanistica" per connettere il porto al tessuto urbano esistente. I nuovi volumi dialogano con il contesto storico: un edificio di testa si relaziona con il Palazzo di Diocleziano e gli edifici pubblici, mentre edificazioni perpendicolari al mare ripristinano la connessione visiva del borgo marinaro con la costa. Verso sud-est, una struttura organica, ispirata alla Casa Malaparte, si sviluppa con terrazzamenti fino alla collina, creando un nuovo punto di osservazione sul mare.

Il progetto completa una storia già scritta, ricucendo il rapporto tra Spalato e il suo porto attraverso una strategia che integra infrastrutture, architettura e paesaggio.`,
    'project.split.caption5': 'Masterplan',
    'project.split.caption6': 'Planivolumetrico',
    'project.split.caption7': 'Relazione con contesto',
    'project.split.caption8': 'Morfologia. Il muro e il palazzo di Diocleziano',
    'project.split.caption9': 'Morfologia. Bastioni',
    'project.split.caption10': 'Schemi',
    'project.split.caption11': 'Schemi. Mat building',
    'project.split.caption12': 'Da stazione termine a stazione passante',
    'project.split.caption13': 'Tipo morfologia',
    'project.split.caption14': 'Pianta quota +2.00',
    'project.split.caption15': 'Sezione AA e prospetto longitudinale',
    'project.split.caption16': 'Sezione BB',
    'project.split.caption17': 'Trasversale CC',
    'project.split.caption18': 'Trasversale DD',
    'project.split.caption19': 'Trasversale EE',
    'project.split.caption20': 'Pianta quota +7.00',
    'project.split.caption21': 'Pianta quota +10.00',
    'project.split.caption22': 'Piante quote +14.00 +18.00 +22.00 +26.00',

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
    
    // Credits
    'credits.wernigerode1': `Cliente: Gebäude- und Wohnungsbaugesellschaft Wernigerode mbH\n\nTeam di progetto:\nLeonardo Zuccaro Marchi, Alice Covatta, **Alina Lippiello**, Piero Medici\n\nRuolo\nDirezione del progetto e coordinamento dello sviluppo tecnico.\n\nContributi\nDefinizione del sistema architettonico di facciata e dei principi costruttivi\nSupervisione tecnica e interfaccia diretta con l'architetto locale\nSviluppo e ottimizzazione delle soluzioni abitative e distributive\n\nArchitetto locale: H+L Hartung & Ludwig Architektur\nVisualizzazione: Be Maarch`,
    'credits.wernigerode2': `Team di progetto:\nLeonardo Zuccaro Marchi, Alice Covatta, **Alina Lippiello**, Piero Medici\n\nRuolo\nSviluppo del concept urbano per il comparto Nord e definizione della strategia di innesto nel tessuto esistente.\n\nContributi\nIdeazione dei modelli residenziali sperimentali per entrambi i lotti\nDefinizione dei principi distributivi e dei flussi spaziali\nArticolazione del rapporto tra sistema edilizio e topografia\n\nVisualizzazione: Be Maarch\n\nCollaboratori: E. Bokshi, E. Boncaldo, L. Bucciarelli, T. Diebäcker, A. Fumero, A. Verna GergesHana, S. Gölada, Q. Hao, A. Pardi, C. Turkoglu, E. Varoni, L. Xinwei`,
    'credits.novecento': `Team di progetto:\n\n**Alina Lippiello** (Capogruppo, Ideazione e Coordinamento generale)\n\nLeonardo Zuccaro Marchi (Progettazione architettonica della passerella)\n\nAlessandra Lelli (Immagine coordinata e atmosfere interne)\n\nIacopo Salce (Integrazione sistemi strutturali)\n\nVisualizzazione: Be Maarch`,
    'credits.illerpark': `Team di progetto:\n**Alina Lippiello**, Leonardo Zuccaro Marchi, Alice Covatta, Piero Medici\n\nRuolo:\n\nSviluppo della proposta progettuale.\n\nContributi:\n\nRicerca e definizione dei modelli abitativi per il complesso residenziale.\n\nProgettazione della tipologia a ballatoio come elemento di connessione spaziale e sociale.\n\nDefinizione degli schemi distributivi interni e della loro flessibilità.`,
    'credits.shinkenchiku': `Team di progetto:\n**Alina Lippiello**, Ivica Covic, Leonardo Zuccaro Marchi, Alessandra Lelli\n\nRuolo:\n\nIdeazione della visione architettonica e del linguaggio formale della proposta.\n\nContributi:\n\nSviluppo del sistema insediativo e dei modelli abitativi.\n\nRicerca sulla trasparenza, la rarefazione dei volumi e il rapporto tra spazio domestico e paesaggio.\n\nDefinizione dei sistemi di involucro e della coerenza visiva del progetto.`,
    'credits.europan11': `Team di progetto:\n**Alina Lippiello** (Capogruppo), Leonardo Zuccaro Marchi, Annalisa Romani, Fausto Cuzzocrea\n\nRuolo:\n\nSviluppo dei sistemi residenziali e dei modelli abitativi.\n\nContributi:\n\nTraduzione delle strategie urbane alla scala dell'edificio.\n\nIvo Covic: Concept del Masterplan.\n\nAnnalisa Romani: Landscape Design.\n\nLeonardo Zuccaro Marchi: Sviluppo della proposta architettonica, comunicazione visiva e impaginazione.\n\nFausto Cuzzocrea: Sviluppo grafico del masterplan.`,
    'credits.aluartforum': `Team di progetto:\n**Alina Lippiello**, Ivo Covic, Leonardo Zuccaro Marchi\n\nRuolo:\n\nIdeazione della strategia progettuale e del linguaggio architettonico (in collaborazione con I. Covic).\n\nContributi:\n\nElaborazione e definizione delle planimetrie e delle sezioni di progetto.\n\nTraduzione dell'idea concettuale in soluzioni spaziali e funzionali.\n\nIvo Covic: Concept architettonico.\n\nLeonardo Zuccaro Marchi: Comunicazione visiva e design grafico.`,
    'credits.expo': `Team di progetto:\nLuca Poncellini, Luciano Giorgi, Edoardo Riva, Geert Jan Beun, **Alina Lippiello**, Ivica Covic, Luca Canova. Ingegneria e Consulenza: Icis Srl, Tecnicaer Srl, Studio Vigetti Merlo.\n\nRuolo:\n\nSviluppo dei dettagli costruttivi e dei sistemi tecnologici.\n\nContributi:\n\nSupporto alla definizione delle soluzioni architettoniche esecutive.\n\nLuca Poncellini: Sviluppo del progetto architettonico.\n\nLuciano Giorgi: Direzione artistica, interior design e definizione dell'involucro architettonico.`,
    'credits.split': `Team di progetto:\n**Alina Lippiello**, Ivo Covic\n\nRuolo:\n\nDefinizione architettonica e formale del nodo intermodale e della nuova stazione.\n\nContributi:\n\nSviluppo degli edifici direzionali e residenziali sulla piastra infrastrutturale.\n\nProgettazione dell'edificio pubblico di testa, concepito come volume iconico a matrice cubica.\n\nStudio delle connessioni tra la quota del ferro, la piastra urbana e il fronte mare.\n\nIvo Covic: Sviluppo del sistema di hotel diffuso e riqualificazione dell'area collinare.`,
    'credits.koresnica': `Team di progetto:\n**Alina Lippiello**, Ivica Covic, in collaborazione con Studio Locale (Croazia).\n\nRuolo:\n\nRicerca e sviluppo dei modelli residenziali e degli schemi distributivi degli alloggi.\n\nContributi:\n\nDefinizione del rapporto tra cellule abitative, spazi comuni e sistema dei percorsi.\n\nStudio della morfologia edilizia in relazione alle pendenze del sito e al contesto mediterraneo.\n\nIvica Covic: Masterplan e strategia urbana.\n\nStudio Locale: Supporto alla progettazione e adeguamento normativo.`,
    'credits.lorenteggio': `Team di progetto:\n**Alina Lippiello**, Leonardo Zuccaro Marchi\n\nRuolo:\n\nSviluppo integrale del progetto architettonico della biblioteca.\n\nContributi:\n\nDefinizione della strategia urbana e del rapporto tra l'edificio e la piazza.\n\nOrganizzazione dei flussi, degli spazi espositivi e dei sistemi distributivi interni.\n\nTraduzione tecnica e morfologica del concept narrativo nella struttura architettonica.\n\nLeonardo Zuccaro Marchi: Concept narrativo, Landscape Design e comunicazione visiva.`,
    'credits.zagrebBgg': `Team di progetto:\n**Alina Lippiello**, Ivo Covic, Marco Visconti Architects\n\nRuolo:\n\nSviluppo integrale dell'organizzazione interna e dei flussi della biblioteca.\n\nContributi:\n\nDefinizione e sviluppo della strategia volumetrica basata sul modello del "mat-building" (in collaborazione con I. Covic).\n\nStudio del sistema di "stecche" funzionali per l'integrazione delle diverse aree accademiche.\n\nTraduzione della maglia strutturale in spazi per la ricerca, la consultazione e l'apprendimento.\n\nIvo Covic: Concept volumetrico e strategia d'area.\n\nMarco Visconti Architects: Consulenza tecnica e produzione dei materiali di visualizzazione architettonica (rendering).`,

    // Publications
    'publications.title': 'Pubblicazioni',
    'publications.viewLink': 'Vedi pubblicazione',
    'publications.downloadPdf': 'Scarica il PDF',
    
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

    'strati.heading': 'Architecture as landscape',
    'strati.text': 'Architecture not as an object, but as a field. A continuous system in which building and landscape coincide, and form emerges as the revelation of latent conditions.',
    
    // Profile
    'profile.subtitle': 'Architect | Concept designer | Art direction',
    'profile.vision.title': 'Vision',
    'profile.vision.quote': 'Architecture is not an object, but a field of forces.',
    'profile.vision.text': "It is a threshold between landscape and built environment, between memory and transformation, between what exists and what can emerge. My work arises from this tension: I design spaces that do not impose themselves, but graft; that do not separate, but connect; that do not merely respond to a function, but construct meaning.",
    'profile.profile.title': 'Profile',
    'profile.profile.p1': "I am an architect and concept designer working at the intersection of design, research and art direction. My path has developed through international competitions, residential projects and a critical reflection on contemporary architecture, with a constant interest in the relationship between space, landscape and urban structure.",
    'profile.profile.p2': "My training integrates design practice and theoretical research.",
    'profile.profile.p3': "My degree thesis, dedicated to the reconfiguration of the waterfront of Split, investigates the continuity between city and sea and the relationship between built and open space. In this work, an interest emerges for the first time that still runs through my research today: the dissolution of boundaries between infrastructure, landscape and urban structure.",
    'profile.profile.p4': "I subsequently deepened these themes through the thinking of radical architecture and twentieth-century avant-gardes, developing a reflection on the concept of architecture as field.",
    'profile.profile.p5': "My research focuses on the concept of architecture as landscape: a continuous system in which figure and ground dissolve and architecture emerges as a condition, rather than as an object. This thinking develops from a research in Architectural and Urban Design begun at the Politecnico di Milano and still constitutes the theoretical foundation of my practice today.",
    'profile.profile.p6': "My work develops through international competitions and collaborations — including Europan and Shinkenchiku — which represent a ground of experimentation on the theme of collective dwelling and infrastructures as devices capable of connecting fragmented urban systems. In this context I operate between concept design, art direction and strategic consulting, accompanying complex projects in building a coherent vision, from the initial phase through to development.",
    'profile.profile.p7': "For me, architecture takes shape as a stratified organism: a field of relationships in which space and time, city and landscape, memory and transformation intertwine in a continuous process. Each project is a fragment of this research, a form that emerges from existing conditions and transforms them.",
    'profile.positioning.title': 'Positioning',
    'profile.positioning.quote1': 'I do not simply design buildings.',
    'profile.positioning.quote2': 'I design spatial systems, habitable landscapes and future scenarios.',
    'profile.positioning.text': "I believe in an architecture capable of overcoming the logic of the isolated object to become field, infrastructure, landscape. An architecture that does not occupy the territory, but interprets it.",
    'profile.invitation.title': 'Invitation',
    'profile.invitation.text': "If you are looking for a vision capable of holding together conceptual rigor and spatial sensitivity, research and pragmatism, I can accompany you in building a project that is not just a technical answer, but a coherent narrative of the place and its potential.",

    // Strati
    'strati.title': 'Layers',
    'strati.subtitle': 'Sketches, models and drawings — layers of a design thinking that accumulates and reveals itself.',
    'strati.piega.label': 'The fold',
    'strati.piega.concept': 'Space is generated by inflection. The fold transforms a surface into a field.',
    'strati.chiaroscuro.label': 'Chiaroscuro',
    'strati.chiaroscuro.concept': 'Light as design material — shadow and structure define space.',
    'strati.quartiere.label': 'Neighborhood',
    'strati.quartiere.concept': 'The urban model as a verification tool — scale, density and green are measured by hand.',
    'strati.innesto.label': 'The graft',
    'strati.innesto.concept': 'Inserting without erasing. Adding new matter to the living body of the landscape.',
    'strati.waterfront.label': 'Waterfront',
    'strati.waterfront.concept': 'Architecture and infrastructure as an extension of the city towards the water.',
    'strati.materia.label': 'Matter',
    'strati.materia.concept': 'The model as a thinking tool — form is born from the hands.',
    'strati.tessuto.label': 'Fabric',
    'strati.tessuto.concept': 'Reading the existing city to graft the new — continuity and controlled rupture.',
     'strati.continuita.label': 'Continuity',
     'strati.continuita.concept': 'Built environment and territory as a single organism in transformation.',
     'strati.porto.label': 'Harbour',
     'strati.porto.concept': 'The waterfront as threshold between city and sea — infrastructure and landscape merge.',
     'strati.masterplan.label': 'Masterplan',
      'strati.masterplan.concept': 'The aerial view reveals the deep structure of the urban project — geometries, flows and green.',
      'strati.segno.label': 'Sign',
      'strati.segno.concept': 'The graphic gesture as thought — the sketch captures structural tension before form.',
      'strati.nodo.label': 'Node',
      'strati.nodo.concept': 'The urban node as convergence point — infrastructure, mobility and fabric intertwine.',
      'strati.soglia.label': 'Threshold',
      'strati.soglia.concept': 'The space between inside and outside — the threshold as a moment of transition and perception.',
      'strati.facciata.label': 'Facade',
      'strati.facciata.concept': 'The envelope as language — matter, structure and context dialogue on the street.',
      'strati.topografia.label': 'Topography',
      'strati.topografia.concept': 'The ground as design material — contour lines, layers and infrastructure merge.',
      'strati.orizzonte.label': 'Horizon',
      'strati.orizzonte.concept': 'Architecture in the open landscape — the project stretches along the horizon line.',
      'strati.close': 'Close',
    'strati.prev': 'Previous',
    'strati.next': 'Next',
    
    // Experience
    'experience.title': 'Competitions and Projects',
    'experience.inProgress': 'In progress',
    'experience.competition': 'Competition',
    'experience.mention': 'Honorable Mention',
    'experience.international': 'International',
    
    // Projects
    'project.wernigerode1.title': 'Living the New Ecological Porous Garden City. Wernigerode. Project',
    'project.wernigerode1.location': 'Wernigerode, Germany',
    'project.wernigerode1.description': `The Wernigerode residential project takes shape as an urban threshold, a connective device between the Bürgerpark and the surrounding residential fabric, building a direct and continuous relationship between landscape and city. The building is conceived as part of a constructed landscape: it takes on and continues the existing typology, interpreting it as a continuous field and transforming it into a new point of urban intensity.

The project activates an ecological development strategy for the city, generating new green corridors and promoting widespread pedestrian and cycling porosity. Within this network of crossings, public space is articulated as a capillary system of relationships, where slow mobility, nature and urban life intertwine.

The buildings are shaped through a logic of morphological reconnection: the taller linear volumes to the west realign with the lower detached houses to the north, integrating harmoniously to complete the organic structure of the existing neighbourhood. The ensemble builds a continuity between density and dispersion, between urban structure and domestic landscape.

Gaps and incisions cut through the built fabric, ensuring the permeability of public space and its connection to the park's pedestrian and cycling paths. In particular, to the north, a large covered opening takes the form of a habitable plaza and city entrance point, a threshold device between urban infrastructure and collective life.

The architecture integrates sustainable materials and technologies for water management and renewable energy production, functioning as an active ecological infrastructure. Within this framework, the project promotes inclusive, intergenerational and resilient forms of living, where the built environment becomes part of a transforming urban ecosystem.`,

    'project.wernigerode2.title': 'EUROPAN 16 — Living the New Ecological Porous Garden City. Wernigerode. Competition',
    'project.wernigerode2.location': 'Wernigerode, Germany',
    'project.wernigerode2.description': `Living the New Ecological Porous Garden City
Competition, Germany, 2021

The project is articulated in two complementary areas in dialogue with the existing topography.

North Area — 32 apartments: The building serves as an urban gateway, connecting the park to the neighborhood. The built form is assumed as part of the landscape: the volumes continue and reinterpret existing typologies, stitching together the western linear blocks with the northern isolated houses and integrating into the organic fabric. Portals and cuts ensure public permeability towards cycle-pedestrian paths. Sustainable materials (wood and concrete), circular water management systems and energy production characterize the intervention. The typological mix favors intergenerational social compositions, with live-work spaces and commercial activities on the ground floor.

South Area — 25 apartments: The intervention hybridizes the row-house typology with pitched roofs and linear volumes, following and amplifying the logics of the site. Here too the project takes shape as a built landscape, in which architecture and ground are articulated in continuity. The porosity connects the internal circular park to the technical museum to the west. A photovoltaic greenhouse in the courtyard allows annual food production, configured as an agricultural pavilion. Shared gardens, common terraces and private gardens complete the open space system.`,

    'project.novecento.title': "Novecentopiù'cento",
    'project.novecento.location': 'Competition for the extension of the Museo del Novecento\nMilan, 2021',
    'project.novecento.description': `The Novecentopiùcento project acts as an urban graft that transforms the museum path in continuity with the public space. The walkway between the two Arengari is not a mere connection, but an extension of the ground of via Marconi that doubles to become an exhibition terrace over Piazza Duomo.

The heart of the intervention follows the 'box within a box' concept: an autonomous structure in metallic filigree inserted within the historic volumes. The play of double and triple heights creates a flexible museographic machine, capable of hosting everything from large installations to contemporary performances.

In a constant dialogue between the evanescence of steel and the mass of stone, the visitor's eye moves between the artwork and the landscape of the historic city.`,

    'project.illerpark.title': 'Wohnen am Illerpark',
    'project.illerpark.location': 'Germany',
    'project.illerpark.description': `DER GEMEINSCHAFTSRAUM

The Community Space | Neu-Ulm

Der Gemeinschaftsraum arises from a fundamental question: is it possible to design a residential neighborhood that goes beyond simply offering housing, becoming an authentic generator of human relationships? The project for Neu-Ulm answers affirmatively, proposing a living model where the private and collective spheres are not separate worlds, but ecosystems in constant dialogue.

The Common Ground

The guiding principle of the project is the Gemeinsame Boden — the Common Ground. The distribution paths of the buildings are expanded and transformed into inhabited loggias: not simple corridors of passage, but threshold spaces where the daily life of the community can unfold naturally. A continuous and graduated system that accompanies residents from the maximum intimacy of the private dwelling to the total openness of the public courtyard, breaking down the sharp boundary between inside and outside, between individual and collective.

The Three Identity Elements

The Public Balcony characterizes the north building as an elevated linear square: an urban loggia where the threshold between private dwelling and collective space dissolves every day in casual encounters between residents, building brick by brick the relational fabric of the community.

The Stage occupies the heart of the inner courtyard as a flexible space dedicated to the cultural life of the neighborhood. Concerts, shows, markets, community celebrations: a democratic and inclusive place where anyone can be both protagonist and spectator, where the boundary between art and daily life becomes naturally porous.

The Calli reinterprets in a contemporary key the atmosphere of historic European alleys — the Venetian calle, the German Gasse. Born from the enhancement of the underground garage ramp slope, it becomes a lived pedestrian path that connects the street level to the inner courtyard through a space dense with social potential.

A New Quality of Living

Der Gemeinschaftsraum does not simply offer quality housing: it proposes a new quality of urban life, slower, more relational, more aware of the value of being together. A project where architecture is not a neutral backdrop for daily life, but an active tool in building a cohesive and vital community.`,
    
    'project.shinkenchiku.title': '4 Houses - Shinkenchiku',
    'project.shinkenchiku.location': 'International',
    'project.shinkenchiku.description': 'The project received an honorable mention at the Shinkenchiku Residential Design Competition.\n\nThe project responds to Rafael Moneo\'s challenge (in homage to John Hejduk), transforming the Nine Square Grid into the Four Square House design problem: 4 houses of 162 m² within a 36×36 m grid.\n\nThe Three Theoretical Pillars\n\nThe Totem-Object (Hejduk): The house is not just function, but pure geometric entity. Technological elements (wind and solar) become vertical monuments that give rhythm and identity to the landscape.\n\nThe Open Grid (Branzi): Going beyond the plot boundary, the project adopts the logic of the "No-Stop City." The 36 m grid is a fragment of an infinite territorial infrastructure where architecture and nature merge into a fluid support.\n\nModular Growth (Le Corbusier): Based on "croissance illimitée," the four-square system is a module that can be aggregated infinitely. The spatial structure evolves while maintaining a constant balance between technique (machine) and nature (garden).\n\nThe Method: The Strip Abacus\n\nThrough a systematic analysis of variations (solid/void, orientation, density), each 9 m² module becomes a potential cell. The result is a contemporary Garden City: a technological, rigorous, and self-sufficient landscape, capable of expanding without losing its geometric coherence.',
    'project.shinkenchiku.caption1': 'Axonometric view of the masterplan',
    'project.shinkenchiku.caption2': 'Perspective view of the city',
    'project.shinkenchiku.caption3': 'General masterplan',
    'project.shinkenchiku.caption4': 'Aerial view of urban density',
    'project.shinkenchiku.caption5': 'Housing typologies - 4 houses',
    'project.shinkenchiku.caption6': 'Morphological diagrams',
    'project.shinkenchiku.caption7': 'Typical plan with infrastructure',
    'project.shinkenchiku.caption8': 'Urban plan',
    'project.shinkenchiku.caption9': 'Typological plans - 1st and 2nd floor',
    'project.shinkenchiku.caption10': 'Render - view between buildings',
    'project.shinkenchiku.caption11': '3D model with solar panels and turbines',
    'project.shinkenchiku.caption12': 'Design references - Hejduk, Branzi, Le Corbusier',
    'project.shinkenchiku.caption13': 'Urban references - Gruen, Howard, Crystaller',
    'project.shinkenchiku.caption14': 'Neighborhood render',
    
    'project.europan11.title': 'Europan 11 - Floating Blocks',
    'project.europan11.location': 'Leeuwarden, Netherlands',
    'project.europan11.caption1': 'Urban synthesis',
    'project.europan11.caption2': 'General plan',
    'project.europan11.caption3': 'Aerial view',
    'project.europan11.caption4': 'Concept diagram and phases',
    'project.europan11.caption6': 'Panoramic view',
    'project.europan11.caption8': 'Masterplan',
    'project.europan11.caption9': 'Venice system — plan and axonometric',
    'project.europan11.caption10': 'Floating blocks axonometric',
    'project.europan11.caption11': 'Models — construction phases',
    'project.europan11.caption12': 'Apartments — plans, sections and facades',
    'project.europan11.caption13': 'Render — waterfront',
    'project.europan11.caption14': 'Strip building — plans and facades',
    'project.europan11.caption15': 'Houses — plans and facades',
    'project.europan11.description': 'The project proposes a new residential neighbourhood immersed in a waterscape, well connected to the existing urban fabric and the surrounding countryside. Morphologically, the masterplan is composed of insular strips that follow the city\'s urban direction northward, while ensuring east–west continuity through their repetition. To the south, the landscape weaves between the strips, becoming fingers of water and greenery — recalling Escher\'s Day and Night, the artist being a native of Leeuwarden, where elements of nature morph into one another between two rivers.\n\nThe masterplan is organised around three distinct sectors: Venezia Arsenale to the west, Tokyo Bay at the centre, and San Francisco Bay to the east. Water covers nearly 35% of the total area, providing landscape variation, privacy between dwellings and an infrastructure of movement — in winter, frozen water surfaces become shared public space for skating and gathering.\n\nThe proposal accommodates 400 dwellings of various types — floating, amphibious, stilt and embankment houses — each defined by its specific relationship with the water level. The typological mix distributes affordable (115 sqm), medium (140 sqm) and large (180 sqm) units across the three sectors, all with direct views and contact with water.\n\nOpen spaces are structured on three scales: private courtyards, small marsh islands as extensions of private space, and energy parks providing sustainable resources — wind power, rainwater harvesting, filter gardens for ecological water purification — creating a self-sufficient neighbourhood ecosystem.',
    
    'project.aluartforum.title': 'Aluartforum',
    'project.aluartforum.location': 'Zagreb, Croatia',
    'project.aluartforum.description': `Developed for the architectural and urban design competition for the new Gallery of the Academy of Fine Arts, ALUARTFORUM stems from the interpretation of an urban void of particular value, located between the historic front of Ilica and the existing park.

The intervention addresses a delicate condition: on one hand, the possibility of recomposing the continuity of the urban façade; on the other, the need to preserve the openness of the green towards the city. The project chooses to maintain this threshold as a space of relation, allowing the park to continue its dialogue with the street and the built fabric.

The building takes shape as a vertical exhibition pavilion, composed of a sequence of stacked volumes housing spaces for temporary and permanent exhibitions, workshops, offices and a public terrace. The shifting of floors generates a dynamic composition capable of establishing a measured relationship with the historic context while simultaneously opening towards the park landscape.

A central element of the proposal is the vertical green system, conceived as a continuation of the existing landscape. The green walls filter light, improve the microclimate and transform the lateral fronts into a living surface, reinforcing the continuity between interior and exterior.

Natural light becomes an integral part of the project: the orientation of spaces and the volumetric design allow the modulation of luminous intensity and quality, creating different and adaptable exhibition environments.

More than a simple building, ALUARTFORUM proposes itself as an urban device of connection, capable of relating art, public space and landscape in a new form of continuity.`,
    
    'project.expo.title': 'EXPO MILANO 2015 — Service Architectures',
    'project.expo.location': 'Milan, Italy',
    'project.expo.description': `The project defines a homogeneous architectural and micro-landscape system applied to the different scales of the intervention: the large Service Bars, the Service Units, and the Kiosks. The construction system is based on dry assembly, prioritizing speed of assembly and disassembly and maximum reuse of materials.

The Bars are organized around four main themes. The head gardens on the Decumanus front create rest areas with tall grasses, water features, and children's spaces, self-sufficient thanks to rainwater harvesting from the roofs. The permeating functions — bars, restaurants, shops — ensure maximum openness of the fronts and allow horizontal and vertical crossing of the building, with proximity spaces sheltered from sun and rain. On the first floor, large terrace-plazas with landscape views host dining activities and temporary events, accessible from a continuous walkway. The double skin differentiates the fronts: compact on the pedestrian path side, open and light on the garden and water mirror side, with an 80% passive shading coefficient.

The structural project adopts a prefabricated mixed steel-wood frame, with a maximum span of 14.60 meters transversally. The completely dry construction above ground floor level ensures speed of assembly and ease of dismantling. The project achieves a LEED Gold rating with 67 points, with an estimated 51% material reuse and 11% recycling, for a potential cost reduction of up to 62% of the planned amount.`,
    
    'project.split.title': 'Split: completion of the waterfront in the old port. New intermodal hub for the city and territory',
    'project.split.location': 'Split, Croatia',
    'project.split.coauthor': 'With Ivo Covic',
    'project.split.description': `Completion of the waterfront in the old port. New intermodal hub for the city and territory.

The Split port project is an infrastructural intervention aimed at managing the increase in tourist and commuter traffic. It plans to transform the railway station into a through station and introduce a light metro. Expansions of the quays and new berths for cruise ships are planned, as well as a four-lane road for ferry access and underground parking.

Located in the heart of the city, the port is a strategic hub for Dalmatia, but currently appears as an urban void lacking a defined waterfront. The intervention draws inspiration from the geography and history of the city, adopting an "urban acupuncture" approach to connect the port to the existing urban fabric. The new volumes dialogue with the historical context: a head building relates to Diocletian's Palace and public buildings, while buildings perpendicular to the sea restore the visual connection between the fishing village and the coast. To the southeast, an organic structure, inspired by Casa Malaparte, develops with terraces up to the hill, creating a new vantage point over the sea.

The project completes an already written story, mending the relationship between Split and its port through a strategy that integrates infrastructure, architecture and landscape.`,
    'project.split.caption5': 'Masterplan',
    'project.split.caption6': 'Planivolumetric',
    'project.split.caption7': 'Relationship with context',
    'project.split.caption8': 'Morphology. The wall and Diocletian\'s Palace',
    'project.split.caption9': 'Morphology. Bastions',
    'project.split.caption10': 'Diagrams',
    'project.split.caption11': 'Diagrams. Mat building',
    'project.split.caption12': 'From terminus to through station',
    'project.split.caption13': 'Type morphology',
    'project.split.caption14': 'Plan level +2.00',
    'project.split.caption15': 'Section AA and longitudinal elevation',
    'project.split.caption16': 'Section BB',
    'project.split.caption17': 'Cross section CC',
    'project.split.caption18': 'Cross section DD',
    'project.split.caption19': 'Cross section EE',
    'project.split.caption20': 'Plan level +7.00',
    'project.split.caption21': 'Plan level +10.00',
    'project.split.caption22': 'Plans levels +14.00 +18.00 +22.00 +26.00',

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
    
    // Credits
    'credits.wernigerode1': `Client: Gebäude- und Wohnungsbaugesellschaft Wernigerode mbH\n\nDesign team:\nLeonardo Zuccaro Marchi, Alice Covatta, **Alina Lippiello**, Piero Medici\n\nRole\nProject direction and coordination of technical development.\n\nContributions\nDefinition of the architectural façade system and construction principles\nTechnical supervision and direct interface with the local architect\nDevelopment and optimization of housing and distribution solutions\n\nLocal architect: H+L Hartung & Ludwig Architektur\nVisualization: Be Maarch`,
    'credits.wernigerode2': `Design team:\nLeonardo Zuccaro Marchi, Alice Covatta, **Alina Lippiello**, Piero Medici\n\nRole\nDevelopment of the urban concept for the North sector and definition of the grafting strategy into the existing fabric.\n\nContributions\nConception of experimental residential models for both lots\nDefinition of distributive principles and spatial flows\nArticulation of the relationship between building system and topography\n\nVisualization: Be Maarch\n\nCollaborators: E. Bokshi, E. Boncaldo, L. Bucciarelli, T. Diebäcker, A. Fumero, A. Verna GergesHana, S. Gölada, Q. Hao, A. Pardi, C. Turkoglu, E. Varoni, L. Xinwei`,
    'credits.novecento': `Design team:\n\n**Alina Lippiello** (Project Leader, Concept and General Coordination)\n\nLeonardo Zuccaro Marchi (Architectural design of the walkway)\n\nAlessandra Lelli (Coordinated image and interior atmospheres)\n\nIacopo Salce (Integration of structural systems)\n\nVisualization: Be Maarch`,
    'credits.illerpark': `Design team:\n**Alina Lippiello**, Leonardo Zuccaro Marchi, Alice Covatta, Piero Medici\n\nRole:\n\nDevelopment of the design proposal.\n\nContributions:\n\nResearch and definition of housing models for the residential complex.\n\nDesign of the gallery-access typology as an element of spatial and social connection.\n\nDefinition of internal distribution schemes and their flexibility.`,
    'credits.shinkenchiku': `Design team:\n**Alina Lippiello**, Ivica Covic, Leonardo Zuccaro Marchi, Alessandra Lelli\n\nRole:\n\nConception of the architectural vision and formal language of the proposal.\n\nContributions:\n\nDevelopment of the settlement system and housing models.\n\nResearch on transparency, rarefaction of volumes and the relationship between domestic space and landscape.\n\nDefinition of envelope systems and visual coherence of the project.`,
    'credits.europan11': `Design team:\n**Alina Lippiello** (Team leader), Leonardo Zuccaro Marchi, Annalisa Romani, Fausto Cuzzocrea\n\nRole:\n\nDevelopment of residential systems and housing models.\n\nContributions:\n\nTranslation of urban strategies to building scale.\n\nIvo Covic: Masterplan concept.\n\nAnnalisa Romani: Landscape Design.\n\nLeonardo Zuccaro Marchi: Development of architectural proposal, visual communication and layout.\n\nFausto Cuzzocrea: Graphic development of the masterplan.`,
    'credits.aluartforum': `Design team:\n**Alina Lippiello**, Ivo Covic, Leonardo Zuccaro Marchi\n\nRole:\n\nConception of the design strategy and architectural language (in collaboration with I. Covic).\n\nContributions:\n\nDevelopment and definition of floor plans and project sections.\n\nTranslation of the conceptual idea into spatial and functional solutions.\n\nIvo Covic: Architectural concept.\n\nLeonardo Zuccaro Marchi: Visual communication and graphic design.`,
    'credits.expo': `Design team:\nLuca Poncellini, Luciano Giorgi, Edoardo Riva, Geert Jan Beun, **Alina Lippiello**, Ivica Covic, Luca Canova. Engineering and Consulting: Icis Srl, Tecnicaer Srl, Studio Vigetti Merlo.\n\nRole:\n\nDevelopment of construction details and technological systems.\n\nContributions:\n\nSupport in defining executive architectural solutions.\n\nLuca Poncellini: Development of the architectural project.\n\nLuciano Giorgi: Art direction, interior design and definition of the architectural envelope.`,
    'credits.split': `Design team:\n**Alina Lippiello**, Ivo Covic\n\nRole:\n\nArchitectural and formal definition of the intermodal hub and new station.\n\nContributions:\n\nDevelopment of office and residential buildings on the infrastructure platform.\n\nDesign of the head public building, conceived as an iconic cubic-matrix volume.\n\nStudy of connections between rail level, urban platform and waterfront.\n\nIvo Covic: Development of the diffuse hotel system and hillside redevelopment.`,
    'credits.koresnica': `Design team:\n**Alina Lippiello**, Ivica Covic, in collaboration with Studio Locale (Croatia).\n\nRole:\n\nResearch and development of residential models and apartment distribution schemes.\n\nContributions:\n\nDefinition of the relationship between housing units, common spaces and circulation system.\n\nStudy of building morphology in relation to site slopes and Mediterranean context.\n\nIvica Covic: Masterplan and urban strategy.\n\nStudio Locale: Design support and regulatory compliance.`,
    'credits.lorenteggio': `Design team:\n**Alina Lippiello**, Leonardo Zuccaro Marchi\n\nRole:\n\nFull development of the library's architectural project.\n\nContributions:\n\nDefinition of the urban strategy and the relationship between building and square.\n\nOrganization of flows, exhibition spaces and internal distribution systems.\n\nTechnical and morphological translation of the narrative concept into architectural structure.\n\nLeonardo Zuccaro Marchi: Narrative concept, Landscape Design and visual communication.`,
    'credits.zagrebBgg': `Design team:\n**Alina Lippiello**, Ivo Covic, Marco Visconti Architects\n\nRole:\n\nFull development of the library's internal organization and flows.\n\nContributions:\n\nDefinition and development of the volumetric strategy based on the "mat-building" model (in collaboration with I. Covic).\n\nStudy of the functional "bar" system for integrating different academic areas.\n\nTranslation of the structural grid into spaces for research, consultation and learning.\n\nIvo Covic: Volumetric concept and area strategy.\n\nMarco Visconti Architects: Technical consulting and production of architectural visualization materials (rendering).`,

    // Publications
    'publications.title': 'Publications',
    'publications.viewLink': 'View publication',
    'publications.downloadPdf': 'Download PDF',
    
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

    'strati.heading': 'La arquitectura como paisaje',
    'strati.text': 'La arquitectura no como objeto, sino como campo. Un sistema continuo en el que edificio y paisaje coinciden, y la forma emerge como revelación de condiciones latentes.',
    
    // Profile
    'profile.subtitle': 'Arquitecta | Concept designer | Dirección artística',
    'profile.vision.title': 'Visión',
    'profile.vision.quote': 'La arquitectura no es un objeto, sino un campo de fuerzas.',
    'profile.vision.text': "Es un umbral entre paisaje y construido, entre memoria y transformación, entre lo que existe y lo que puede emerger. Mi trabajo nace de esta tensión: proyecto espacios que no se imponen, sino que se injertan; que no separan, sino que conectan; que no se limitan a responder a una función, sino que construyen sentido.",
    'profile.profile.title': 'Perfil',
    'profile.profile.p1': "Soy arquitecta y concept designer que trabaja en la frontera entre proyecto, investigación y dirección artística. Mi trayectoria se ha desarrollado a través de concursos internacionales, proyectos residenciales y una reflexión crítica sobre la arquitectura contemporánea, con un interés constante por la relación entre espacio, paisaje y estructura urbana.",
    'profile.profile.p2': "Mi formación integra práctica proyectual e investigación teórica.",
    'profile.profile.p3': "La tesis de grado, dedicada a la reconfiguración del frente marítimo de Split, indaga la continuidad entre ciudad y mar y la relación entre espacio construido y espacio abierto. En este trabajo emerge por primera vez un interés que atraviesa todavía hoy mi investigación: la disolución de los confines entre infraestructura, paisaje y estructura urbana.",
    'profile.profile.p4': "Posteriormente profundicé estos temas a través del pensamiento de la arquitectura radical y las vanguardias del siglo XX, desarrollando una reflexión sobre el concepto de arquitectura como campo.",
    'profile.profile.p5': "Mi investigación se centra en el concepto de arquitectura como paisaje: un sistema continuo en el que figura y fondo se disuelven y la arquitectura emerge como condición, más que como objeto. Este pensamiento se desarrolla a partir de una investigación en Proyectación Arquitectónica y Urbana iniciada en el Politecnico di Milano y constituye todavía hoy la base teórica de mi práctica.",
    'profile.profile.p6': "Mi trabajo se desarrolla a través de concursos y colaboraciones internacionales — entre ellos Europan y Shinkenchiku — que representan un terreno de experimentación sobre el tema del habitar colectivo y de las infraestructuras como dispositivos capaces de conectar sistemas urbanos fragmentados. En este contexto opero entre concept design, dirección artística y consultoría estratégica, acompañando proyectos complejos en la construcción de una visión coherente, desde la fase inicial hasta el desarrollo.",
    'profile.profile.p7': "Para mí la arquitectura se configura como un organismo estratificado: un campo de relaciones en el que espacio y tiempo, ciudad y paisaje, memoria y transformación se entrelazan en un proceso continuo. Cada proyecto es un fragmento de esta investigación, una forma que emerge de condiciones existentes y las transforma.",
    'profile.positioning.title': 'Posicionamiento',
    'profile.positioning.quote1': 'No proyecto simplemente edificios.',
    'profile.positioning.quote2': 'Proyecto sistemas espaciales, paisajes habitables y escenarios futuros.',
    'profile.positioning.text': "Creo en una arquitectura capaz de superar la lógica del objeto aislado para convertirse en campo, infraestructura, paisaje. Una arquitectura que no ocupa el territorio, sino que lo interpreta.",
    'profile.invitation.title': 'Invitación',
    'profile.invitation.text': "Si buscas una visión capaz de mantener juntos rigor conceptual y sensibilidad espacial, investigación y pragmatismo, puedo acompañarte en la construcción de un proyecto que no sea solo una respuesta técnica, sino una narrativa coherente del lugar y su potencial.",

    // Strati
    'strati.title': 'Capas',
    'strati.subtitle': 'Bocetos, modelos y dibujos — capas de un pensamiento proyectual que se acumula y se revela.',
    'strati.piega.label': 'El pliegue',
    'strati.piega.concept': 'El espacio se genera por inflexión. El pliegue transforma una superficie en un campo.',
    'strati.chiaroscuro.label': 'Claroscuro',
    'strati.chiaroscuro.concept': 'La luz como material proyectual — sombra y estructura definen el espacio.',
    'strati.quartiere.label': 'Barrio',
    'strati.quartiere.concept': 'El modelo urbano como herramienta de verificación — escala, densidad y verde se miden con las manos.',
    'strati.innesto.label': 'El injerto',
    'strati.innesto.concept': 'Insertarse sin borrar. Añadir nueva materia al cuerpo vivo del paisaje.',
    'strati.waterfront.label': 'Waterfront',
    'strati.waterfront.concept': 'Arquitectura e infraestructura como extensión de la ciudad hacia el agua.',
    'strati.materia.label': 'Materia',
    'strati.materia.concept': 'El modelo como herramienta de pensamiento — la forma nace de las manos.',
    'strati.tessuto.label': 'Tejido',
    'strati.tessuto.concept': 'Leer la ciudad existente para injertar lo nuevo — continuidad y ruptura controlada.',
     'strati.continuita.label': 'Continuidad',
     'strati.continuita.concept': 'Construido y territorio como un único organismo en transformación.',
     'strati.porto.label': 'Puerto',
     'strati.porto.concept': 'El waterfront como umbral entre ciudad y mar — infraestructura y paisaje se funden.',
     'strati.masterplan.label': 'Masterplan',
      'strati.masterplan.concept': 'La vista aérea revela la estructura profunda del proyecto urbano — geometrías, flujos y verde.',
      'strati.segno.label': 'Signo',
      'strati.segno.concept': 'El gesto gráfico como pensamiento — el boceto captura la tensión estructural antes de la forma.',
      'strati.nodo.label': 'Nodo',
      'strati.nodo.concept': 'El nodo urbano como punto de convergencia — infraestructura, movilidad y tejido se entrelazan.',
      'strati.soglia.label': 'Umbral',
      'strati.soglia.concept': 'El espacio entre interior y exterior — el umbral como momento de transición y percepción.',
      'strati.facciata.label': 'Fachada',
      'strati.facciata.concept': 'La envolvente como lenguaje — materia, estructura y contexto dialogan en la calle.',
      'strati.topografia.label': 'Topografía',
      'strati.topografia.concept': 'El suelo como materia de proyecto — curvas de nivel, estratos e infraestructura se funden.',
      'strati.orizzonte.label': 'Horizonte',
      'strati.orizzonte.concept': 'La arquitectura en el paisaje abierto — el proyecto se extiende siguiendo la línea del horizonte.',
      'strati.close': 'Cerrar',
    'strati.prev': 'Anterior',
    'strati.next': 'Siguiente',
    
    // Experience
    'experience.title': 'Concursos y Proyectos',
    'experience.inProgress': 'En curso',
    'experience.competition': 'Concurso',
    'experience.mention': 'Mención de honor',
    'experience.international': 'Internacional',
    
    // Projects
    'project.wernigerode1.title': 'Living the New Ecological Porous Garden City. Wernigerode. Proyecto',
    'project.wernigerode1.location': 'Wernigerode, Alemania',
    'project.wernigerode1.description': `El proyecto residencial de Wernigerode se configura como un umbral urbano, un dispositivo de conexión entre el Bürgerpark y el tejido residencial circundante, construyendo una relación directa y continua entre paisaje y ciudad. El edificio se concibe como parte de un paisaje construido: asume y prolonga la tipología existente, interpretándola como campo continuo y transformándola en un nuevo punto de intensidad urbana.

El proyecto activa una estrategia de desarrollo ecológico para la ciudad, generando nuevos corredores verdes y promoviendo una porosidad peatonal y ciclista difusa. En esta red de cruces, el espacio público se articula como un sistema capilar de relaciones, donde movilidad lenta, naturaleza y vida urbana se entrelazan.

Los edificios se modelan a través de una lógica de reconexión morfológica: los volúmenes lineales más altos al oeste se realinean con las casas aisladas más bajas al norte, integrándose de manera armónica para completar la estructura orgánica del barrio existente. El conjunto construye una continuidad entre densidad y dispersión, entre estructura urbana y paisaje doméstico.

Aberturas e incisiones atraviesan lo construido, garantizando la permeabilidad del espacio público y su vínculo con los recorridos peatonales y ciclistas del parque. En particular, al norte, una gran abertura cubierta se configura como plaza habitable y punto de entrada a la ciudad, un dispositivo de umbral entre infraestructura urbana y vida colectiva.

La arquitectura integra materiales sostenibles y tecnologías para la gestión del agua y la producción de energía renovable, configurándose como infraestructura ecológica activa. En este marco, el proyecto promueve formas de habitar inclusivas, intergeneracionales y resilientes, donde el espacio construido se convierte en parte de un ecosistema urbano en transformación.`,

    'project.wernigerode2.title': 'EUROPAN 16 — Living the New Ecological Porous Garden City. Wernigerode. Concurso',
    'project.wernigerode2.location': 'Wernigerode, Alemania',
    'project.wernigerode2.description': `Living the New Ecological Porous Garden City
Concurso, Alemania, 2021

El proyecto se articula en dos áreas complementarias en diálogo con la topografía existente.

Área Norte — 32 viviendas: El edificio funciona como puerta urbana, conectando el parque con el barrio. Lo construido se asume como parte del paisaje: los volúmenes prolongan y reinterpretan las tipologías existentes, recosiendo los bloques lineales occidentales con las casas aisladas del norte e integrándose en el tejido orgánico. Portales y cortes garantizan permeabilidad pública hacia los senderos ciclopeatonales. Materiales sostenibles (madera y hormigón), sistemas de gestión circular del agua y producción energética caracterizan la intervención. La mixité tipológica favorece composiciones sociales intergeneracionales, con espacios de trabajo-vivienda y actividades comerciales en planta baja.

Área Sur — 25 viviendas: La intervención hibrida la tipología de casas en hilera con cubiertas a dos aguas y volúmenes lineales, siguiendo y amplificando las lógicas del sitio. También aquí el proyecto se configura como paisaje construido, en el que arquitectura y suelo se articulan en continuidad. La porosidad conecta el parque circular interno con el museo técnico al oeste. Un invernadero fotovoltaico en el patio permite la producción alimentaria anual, configurándose como pabellón agrícola. Huertos compartidos, terrazas comunes y jardines privados completan el sistema de espacios abiertos.`,

    'project.novecento.title': "Novecentopiù'cento",
    'project.novecento.location': 'Concurso para la ampliación del Museo del Novecento\nMilán, 2021',
    'project.novecento.description': `El proyecto Novecentopiùcento actúa como un injerto urbano que transforma el recorrido museístico en continuidad con el espacio público. La pasarela entre los dos Arengari no es una simple conexión, sino una extensión del suelo de via Marconi que se duplica para convertirse en terraza expositiva sobre Piazza Duomo.

El corazón de la intervención sigue el concepto de la 'caja dentro de la caja': una estructura autónoma de filigrana metálica insertada en los volúmenes históricos. El juego de dobles y triples alturas crea una máquina museográfica flexible, capaz de acoger desde grandes instalaciones hasta performances contemporáneas.

En un diálogo constante entre la evanescencia del acero y la masa de la piedra, el ojo del visitante se mueve entre la obra de arte y el paisaje de la ciudad histórica.`,

    'project.illerpark.title': 'Wohnen am Illerpark',
    'project.illerpark.location': 'Alemania',
    'project.illerpark.description': `DER GEMEINSCHAFTSRAUM

El Espacio Comunitario | Neu-Ulm

Der Gemeinschaftsraum nace de una pregunta fundamental: ¿es posible diseñar un barrio residencial que no se limite a ofrecer viviendas, sino que se convierta en un auténtico generador de relaciones humanas? El proyecto para Neu-Ulm responde afirmativamente, proponiendo un modelo habitacional donde la esfera privada y la colectiva no son mundos separados, sino ecosistemas en diálogo constante.

El Suelo Común

El principio rector del proyecto es el Gemeinsame Boden — el Suelo Común. Los recorridos de distribución de los edificios se amplían y transforman en logias habitadas: no simples pasillos de paso, sino espacios umbral donde la vida cotidiana de la comunidad puede desplegarse naturalmente. Un sistema continuo y gradual que acompaña a los residentes desde la máxima intimidad de la vivienda privada hasta la total apertura del patio público, derribando el límite neto entre dentro y fuera, entre individual y colectivo.

Los Tres Elementos Identitarios

El Balcón Público caracteriza el edificio norte como una plaza lineal elevada: una logia urbana donde el umbral entre vivienda privada y espacio colectivo se disuelve cada día en los encuentros casuales entre residentes, construyendo ladrillo a ladrillo el tejido relacional de la comunidad.

El Escenario ocupa el corazón del patio interior como espacio flexible dedicado a la vida cultural del barrio. Conciertos, espectáculos, mercadillos, fiestas comunitarias: un lugar democrático e inclusivo donde cualquiera puede ser al mismo tiempo protagonista y espectador, donde el límite entre arte y vida cotidiana se hace naturalmente poroso.

El Calli reinterpreta en clave contemporánea la atmósfera de los callejones históricos europeos — la calle veneciana, el Gasse alemán. Nacido de la valorización de la pendiente de la rampa del garaje subterráneo, se convierte en un recorrido peatonal vivido que conecta la cota de la calle con el patio interior a través de un espacio denso de potencial social.

Una Nueva Calidad del Habitar

Der Gemeinschaftsraum no ofrece simplemente viviendas de calidad: propone una nueva calidad de vida urbana, más lenta, más relacional, más consciente del valor de estar juntos. Un proyecto donde la arquitectura no es un telón de fondo neutro de la cotidianidad, sino un instrumento activo en la construcción de una comunidad cohesionada y vital.`,
    
    'project.shinkenchiku.title': '4 Houses - Shinkenchiku',
    'project.shinkenchiku.location': 'Internacional',
    'project.shinkenchiku.description': 'El proyecto recibió una mención de honor en el concurso Shinkenchiku Residential Design Competition.\n\nEl proyecto responde al desafío de Rafael Moneo (en homenaje a John Hejduk), transformando el Nine Square Grid en el Four Square House design problem: 4 casas de 162 m² dentro de una malla de 36×36 m.\n\nLos Tres Pilares Teóricos\n\nEl Objeto-Tótem (Hejduk): La casa no es solo función, sino entidad geométrica pura. Los elementos tecnológicos (eólico y solar) se convierten en monumentos verticales que dan ritmo e identidad al paisaje.\n\nLa Cuadrícula Abierta (Branzi): Superando el límite del lote, el proyecto adopta la lógica de la "No-Stop City". La malla de 36 m es un fragmento de una infraestructura territorial infinita donde arquitectura y naturaleza se funden en un soporte fluido.\n\nEl Crecimiento Modular (Le Corbusier): Basado en la "croissance illimitée", el sistema de cuatro cuadrados es un módulo agregable al infinito. La estructura espacial evoluciona manteniendo el equilibrio constante entre técnica (máquina) y naturaleza (jardín).\n\nEl Método: El Ábaco de las Strips\n\nA través de un análisis sistemático de las variaciones (lleno/vacío, orientación, densidad), cada módulo de 9 m² se convierte en una célula potencial. El resultado es una Garden City contemporánea: un paisaje tecnológico, riguroso y autosuficiente, capaz de expandirse sin perder su coherencia geométrica.',
    'project.shinkenchiku.caption1': 'Vista axonométrica del masterplan',
    'project.shinkenchiku.caption2': 'Vista en perspectiva de la ciudad',
    'project.shinkenchiku.caption3': 'Masterplan general',
    'project.shinkenchiku.caption4': 'Vista aérea de la densidad urbana',
    'project.shinkenchiku.caption5': 'Tipologías de vivienda - 4 casas',
    'project.shinkenchiku.caption6': 'Diagramas morfológicos',
    'project.shinkenchiku.caption7': 'Planta tipo con infraestructuras',
    'project.shinkenchiku.caption8': 'Planta urbana',
    'project.shinkenchiku.caption9': 'Plantas tipológicas - 1ª y 2ª planta',
    'project.shinkenchiku.caption10': 'Render - vista entre edificios',
    'project.shinkenchiku.caption11': 'Modelo 3D con paneles solares y turbinas',
    'project.shinkenchiku.caption12': 'Referencias proyectuales - Hejduk, Branzi, Le Corbusier',
    'project.shinkenchiku.caption13': 'Referencias urbanísticas - Gruen, Howard, Crystaller',
    'project.shinkenchiku.caption14': 'Render del barrio',
    
    'project.europan11.title': 'Europan 11 - Floating Blocks',
    'project.europan11.location': 'Leeuwarden, Países Bajos',
    'project.europan11.caption1': 'Síntesis urbana',
    'project.europan11.caption2': 'Planta general',
    'project.europan11.caption3': 'Vista aérea',
    'project.europan11.caption4': 'Esquema conceptual y fases',
    'project.europan11.caption6': 'Vista panorámica',
    'project.europan11.caption8': 'Masterplan',
    'project.europan11.caption9': 'Venice system — planta y axonometría',
    'project.europan11.caption10': 'Axonometría floating blocks',
    'project.europan11.caption11': 'Modelos — fases constructivas',
    'project.europan11.caption12': 'Apartamentos — plantas, secciones y fachadas',
    'project.europan11.caption13': 'Render — waterfront',
    'project.europan11.caption14': 'Strip building — plantas y fachadas',
    'project.europan11.caption15': 'Casas — plantas y fachadas',
    'project.europan11.description': 'El proyecto propone un nuevo barrio residencial inmerso en un paisaje acuático, bien conectado con el tejido urbano existente y el campo circundante. Morfológicamente, el masterplan se compone de franjas insulares que siguen la dirección urbana de la ciudad hacia el norte, garantizando al mismo tiempo una continuidad este-oeste a través de su repetición. Al sur, el paisaje se integra entre las franjas, convirtiéndose en dedos de agua y vegetación — evocando el grabado Día y Noche de Escher, oriundo de Leeuwarden, donde elementos de la naturaleza se transforman unos en otros entre dos ríos.\n\nEl masterplan se organiza en torno a tres sectores distintos: Venezia Arsenale al oeste, Tokyo Bay en el centro y San Francisco Bay al este. El agua ocupa casi el 35% de la superficie total, ofreciendo variación paisajística, privacidad entre las viviendas e infraestructura de movimiento — en invierno, las superficies de agua helada se convierten en espacio público compartido para patinaje y encuentro.\n\nLa propuesta alberga 400 viviendas de diversos tipos — flotantes, anfibias, sobre pilotes y sobre dique — cada una definida por su relación específica con el nivel del agua. La mezcla tipológica distribuye unidades económicas (115 m²), medianas (140 m²) y grandes (180 m²) entre los tres sectores, todas con vista y contacto directo con el agua.\n\nLos espacios abiertos se estructuran en tres escalas: patios privados, pequeñas islas pantanosas como extensión del espacio privado, y parques energéticos que proporcionan recursos sostenibles — energía eólica, recuperación de aguas pluviales, jardines filtro para la depuración ecológica del agua — creando un ecosistema de barrio autosuficiente.',
    
    'project.aluartforum.title': 'Aluartforum',
    'project.aluartforum.location': 'Zagreb, Croacia',
    'project.aluartforum.description': `Desarrollado para el concurso de diseño arquitectónico y urbanístico de la nueva Galería de la Academia de Bellas Artes, ALUARTFORUM nace de la interpretación de un vacío urbano de particular valor, situado entre el frente histórico de Ilica y el parque existente.

La intervención se enfrenta a una condición delicada: por un lado, la posibilidad de recomponer la continuidad de la fachada urbana; por otro, la necesidad de preservar la apertura del verde hacia la ciudad. El proyecto elige mantener este umbral como espacio de relación, dejando que el parque continúe dialogando con la calle y el tejido construido.

El edificio se configura como un pabellón expositivo vertical, compuesto por una secuencia de volúmenes superpuestos que albergan espacios para exposiciones temporales y permanentes, talleres, oficinas y una terraza pública. El deslizamiento de los planos genera una composición dinámica capaz de establecer una relación medida con el contexto histórico y, al mismo tiempo, abrirse hacia el paisaje del parque.

Elemento central de la propuesta es el sistema de verde vertical, concebido como prolongación del paisaje existente. Las paredes verdes filtran la luz, mejoran el microclima y transforman los frentes laterales en una superficie viva, reforzando la continuidad entre interior y exterior.

La luz natural se convierte en parte integral del proyecto: la orientación de los espacios y el diseño volumétrico permiten modular la intensidad y calidad luminosa, creando ambientes expositivos diferentes y adaptables.

Más que un simple edificio, ALUARTFORUM se propone como dispositivo urbano de conexión, capaz de relacionar arte, espacio público y paisaje en una nueva forma de continuidad.`,
    
    'project.expo.title': 'EXPO MILANO 2015 — Arquitecturas de Servicio',
    'project.expo.location': 'Milán, Italia',
    'project.expo.description': `El proyecto define un sistema arquitectónico y micro-paisajístico homogéneo aplicado a las diferentes escalas de la intervención: las grandes Barras de servicio, las Unidades de Servicio y los Quioscos. El sistema constructivo se basa en el ensamblaje en seco, con prioridad a la rapidez de montaje y desmontaje y al máximo reutilización de los materiales.

Las Barras se articulan en torno a cuatro temas principales. Los jardines de cabecera en el frente del Decumano crean áreas de descanso con gramíneas de alto fuste, puntos de agua y espacios para niños, autosuficientes gracias a la recuperación del agua de lluvia de las cubiertas. Las funciones permeantes — bares, restaurantes, tiendas — garantizan la máxima apertura de los frentes y permiten el cruce del edificio en sentido horizontal y vertical, con espacios de proximidad protegidos del sol y la lluvia. En el primer piso, amplias terrazas-plazas con vista al paisaje acogen actividades de restauración y eventos temporales, accesibles desde un balcón continuo. La doble piel diferencia los frentes: compacta en el lado de los recorridos peatonales, abierta y ligera en el lado de los jardines y espejos de agua, con un coeficiente de sombreamiento pasivo del 80%.

El proyecto estructural adopta un entramado mixto acero-madera prefabricado, con una luz máxima de 14,60 metros en sentido transversal. La construcción completamente en seco por encima de la planta baja garantiza rapidez de montaje y facilidad de desmontaje. El proyecto obtiene una calificación LEED Gold con 67 puntos, con una estimación de reutilización del 51% de los materiales y reciclaje del 11%, para una reducción potencial de costes de hasta el 62% del importe previsto.`,
    
    'project.split.title': 'Split: completamiento del waterfront en el puerto viejo. Nuevo nodo intermodal para la ciudad y el territorio',
    'project.split.location': 'Split, Croacia',
    'project.split.coauthor': 'Con Ivo Covic',
    'project.split.description': `Completamiento del waterfront en el puerto viejo. Nuevo nodo intermodal para la ciudad y el territorio.

El proyecto para el puerto de Split es una intervención infraestructural destinada a gestionar el aumento del tráfico turístico y pendular. Se prevé transformar la estación ferroviaria en una estación pasante e introducir un metro ligero. Se planifican ampliaciones de los muelles y nuevos atraques para cruceros, además de una carretera de cuatro carriles para el acceso a los ferries y aparcamientos subterráneos.

Situado en el corazón de la ciudad, el puerto es un nodo estratégico para Dalmacia, pero actualmente se presenta como un vacío urbano sin un frente marítimo definido. La intervención se inspira en la geografía y la historia de la ciudad, adoptando un enfoque de "acupuntura urbana" para conectar el puerto con el tejido urbano existente. Los nuevos volúmenes dialogan con el contexto histórico: un edificio de cabecera se relaciona con el Palacio de Diocleciano y los edificios públicos, mientras que edificaciones perpendiculares al mar restablecen la conexión visual del pueblo marinero con la costa. Hacia el sureste, una estructura orgánica, inspirada en la Casa Malaparte, se desarrolla con terrazas hasta la colina, creando un nuevo punto de observación sobre el mar.

El proyecto completa una historia ya escrita, remendando la relación entre Split y su puerto a través de una estrategia que integra infraestructuras, arquitectura y paisaje.`,
    'project.split.caption5': 'Masterplan',
    'project.split.caption6': 'Planivolumetría',
    'project.split.caption7': 'Relación con el contexto',
    'project.split.caption8': 'Morfología. El muro y el palacio de Diocleciano',
    'project.split.caption9': 'Morfología. Bastiones',
    'project.split.caption10': 'Esquemas',
    'project.split.caption11': 'Esquemas. Mat building',
    'project.split.caption12': 'De estación terminal a estación pasante',
    'project.split.caption13': 'Tipo morfología',
    'project.split.caption14': 'Planta cota +2.00',
    'project.split.caption15': 'Sección AA y alzado longitudinal',
    'project.split.caption16': 'Sección BB',
    'project.split.caption17': 'Transversal CC',
    'project.split.caption18': 'Transversal DD',
    'project.split.caption19': 'Transversal EE',
    'project.split.caption20': 'Planta cota +7.00',
    'project.split.caption21': 'Planta cota +10.00',
    'project.split.caption22': 'Plantas cotas +14.00 +18.00 +22.00 +26.00',

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
    
    // Credits
    'credits.wernigerode1': `Cliente: Gebäude- und Wohnungsbaugesellschaft Wernigerode mbH\n\nEquipo de proyecto:\nLeonardo Zuccaro Marchi, Alice Covatta, **Alina Lippiello**, Piero Medici\n\nRol\nDirección del proyecto y coordinación del desarrollo técnico.\n\nContribuciones\nDefinición del sistema arquitectónico de fachada y de los principios constructivos\nSupervisión técnica e interfaz directa con el arquitecto local\nDesarrollo y optimización de las soluciones habitacionales y distributivas\n\nArquitecto local: H+L Hartung & Ludwig Architektur\nVisualización: Be Maarch`,
    'credits.wernigerode2': `Equipo de proyecto:\nLeonardo Zuccaro Marchi, Alice Covatta, **Alina Lippiello**, Piero Medici\n\nRol\nDesarrollo del concepto urbano para el sector Norte y definición de la estrategia de inserción en el tejido existente.\n\nContribuciones\nIdeación de los modelos residenciales experimentales para ambos lotes\nDefinición de los principios distributivos y de los flujos espaciales\nArticulación de la relación entre sistema edilicio y topografía\n\nVisualización: Be Maarch\n\nColaboradores: E. Bokshi, E. Boncaldo, L. Bucciarelli, T. Diebäcker, A. Fumero, A. Verna GergesHana, S. Gölada, Q. Hao, A. Pardi, C. Turkoglu, E. Varoni, L. Xinwei`,
    'credits.novecento': `Equipo de proyecto:\n\n**Alina Lippiello** (Director de proyecto, Ideación y Coordinación general)\n\nLeonardo Zuccaro Marchi (Diseño arquitectónico de la pasarela)\n\nAlessandra Lelli (Imagen coordinada y atmósferas interiores)\n\nIacopo Salce (Integración de sistemas estructurales)\n\nVisualización: Be Maarch`,
    'credits.illerpark': `Equipo de proyecto:\n**Alina Lippiello**, Leonardo Zuccaro Marchi, Alice Covatta, Piero Medici\n\nRol:\n\nDesarrollo de la propuesta proyectual.\n\nContribuciones:\n\nInvestigación y definición de los modelos habitacionales para el complejo residencial.\n\nDiseño de la tipología de balcón corrido como elemento de conexión espacial y social.\n\nDefinición de los esquemas distributivos internos y su flexibilidad.`,
    'credits.shinkenchiku': `Equipo de proyecto:\n**Alina Lippiello**, Ivica Covic, Leonardo Zuccaro Marchi, Alessandra Lelli\n\nRol:\n\nIdeación de la visión arquitectónica y del lenguaje formal de la propuesta.\n\nContribuciones:\n\nDesarrollo del sistema de asentamiento y los modelos habitacionales.\n\nInvestigación sobre la transparencia, la rarefacción de los volúmenes y la relación entre espacio doméstico y paisaje.\n\nDefinición de los sistemas de envolvente y la coherencia visual del proyecto.`,
    'credits.europan11': `Equipo de proyecto:\n**Alina Lippiello** (Jefa de equipo), Leonardo Zuccaro Marchi, Annalisa Romani, Fausto Cuzzocrea\n\nRol:\n\nDesarrollo de los sistemas residenciales y los modelos habitacionales.\n\nContribuciones:\n\nTraducción de las estrategias urbanas a la escala del edificio.\n\nIvo Covic: Concepto del Masterplan.\n\nAnnalisa Romani: Landscape Design.\n\nLeonardo Zuccaro Marchi: Desarrollo de la propuesta arquitectónica, comunicación visual y maquetación.\n\nFausto Cuzzocrea: Desarrollo gráfico del masterplan.`,
    'credits.aluartforum': `Equipo de proyecto:\n**Alina Lippiello**, Ivo Covic, Leonardo Zuccaro Marchi\n\nRol:\n\nIdeación de la estrategia proyectual y del lenguaje arquitectónico (en colaboración con I. Covic).\n\nContribuciones:\n\nElaboración y definición de las planimetrías y secciones del proyecto.\n\nTraducción de la idea conceptual en soluciones espaciales y funcionales.\n\nIvo Covic: Concepto arquitectónico.\n\nLeonardo Zuccaro Marchi: Comunicación visual y diseño gráfico.`,
    'credits.expo': `Equipo de proyecto:\nLuca Poncellini, Luciano Giorgi, Edoardo Riva, Geert Jan Beun, **Alina Lippiello**, Ivica Covic, Luca Canova. Ingeniería y Consultoría: Icis Srl, Tecnicaer Srl, Studio Vigetti Merlo.\n\nRol:\n\nDesarrollo de los detalles constructivos y los sistemas tecnológicos.\n\nContribuciones:\n\nApoyo en la definición de las soluciones arquitectónicas ejecutivas.\n\nLuca Poncellini: Desarrollo del proyecto arquitectónico.\n\nLuciano Giorgi: Dirección artística, diseño de interiores y definición de la envolvente arquitectónica.`,
    'credits.split': `Equipo de proyecto:\n**Alina Lippiello**, Ivo Covic\n\nRol:\n\nDefinición arquitectónica y formal del nodo intermodal y la nueva estación.\n\nContribuciones:\n\nDesarrollo de los edificios de oficinas y residenciales sobre la plataforma de infraestructura.\n\nDiseño del edificio público frontal, concebido como volumen icónico de matriz cúbica.\n\nEstudio de las conexiones entre la cota del ferrocarril, la plataforma urbana y el frente marítimo.\n\nIvo Covic: Desarrollo del sistema de hotel difuso y rehabilitación de la zona colinar.`,
    'credits.koresnica': `Equipo de proyecto:\n**Alina Lippiello**, Ivica Covic, en colaboración con Studio Locale (Croacia).\n\nRol:\n\nInvestigación y desarrollo de los modelos residenciales y esquemas distributivos de las viviendas.\n\nContribuciones:\n\nDefinición de la relación entre células habitacionales, espacios comunes y sistema de recorridos.\n\nEstudio de la morfología edilicia en relación con las pendientes del sitio y el contexto mediterráneo.\n\nIvica Covic: Masterplan y estrategia urbana.\n\nStudio Locale: Apoyo al diseño y adecuación normativa.`,
    'credits.lorenteggio': `Equipo de proyecto:\n**Alina Lippiello**, Leonardo Zuccaro Marchi\n\nRol:\n\nDesarrollo integral del proyecto arquitectónico de la biblioteca.\n\nContribuciones:\n\nDefinición de la estrategia urbana y la relación entre el edificio y la plaza.\n\nOrganización de los flujos, espacios expositivos y sistemas distributivos internos.\n\nTraducción técnica y morfológica del concepto narrativo en la estructura arquitectónica.\n\nLeonardo Zuccaro Marchi: Concepto narrativo, Landscape Design y comunicación visual.`,
    'credits.zagrebBgg': `Equipo de proyecto:\n**Alina Lippiello**, Ivo Covic, Marco Visconti Architects\n\nRol:\n\nDesarrollo integral de la organización interna y los flujos de la biblioteca.\n\nContribuciones:\n\nDefinición y desarrollo de la estrategia volumétrica basada en el modelo del "mat-building" (en colaboración con I. Covic).\n\nEstudio del sistema de "barras" funcionales para la integración de las diferentes áreas académicas.\n\nTraducción de la malla estructural en espacios para la investigación, consulta y aprendizaje.\n\nIvo Covic: Concepto volumétrico y estrategia de área.\n\nMarco Visconti Architects: Consultoría técnica y producción de materiales de visualización arquitectónica (rendering).`,

    // Publications
    'publications.title': 'Publicaciones',
    'publications.viewLink': 'Ver publicación',
    'publications.downloadPdf': 'Descargar PDF',
    
    // Contact
    'contact.title': 'Contacto',
    'contact.description': 'Siempre estoy interesada en nuevas colaboraciones y proyectos estimulantes. No dudes en contactarme para discutir tus ideas.',
    'contact.studio': 'Estudio',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Autorizo el tratamiento de mis datos personales según la legislación vigente.',
  },
};

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
