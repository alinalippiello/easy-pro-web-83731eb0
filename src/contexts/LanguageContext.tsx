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
