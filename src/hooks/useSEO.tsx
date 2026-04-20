import { useEffect } from 'react';
import { Language } from '@/contexts/LanguageContext';

interface SEOConfig {
  language: Language;
}

const seoTranslations: Record<Language, { title: string; description: string }> = {
  it: {
    title: 'Alina Lippiello | Architetta, Ricercatrice, Designer',
    description: "Alina Lippiello è un'architetta con oltre 20 anni di esperienza nella progettazione urbana, l'integrazione tra architettura e paesaggio. Studio diffuso tra Milano, Montreal, Rotterdam e Padova.",
  },
  en: {
    title: 'Alina Lippiello | Architect, Researcher, Designer',
    description: 'Alina Lippiello is an architect with over 20 years of experience in urban design, integrating architecture and landscape. Distributed studio between Milan, Montreal, Rotterdam and Padua.',
  },
  es: {
    title: 'Alina Lippiello | Arquitecta, Investigadora, Diseñadora',
    description: 'Alina Lippiello es una arquitecta con más de 20 años de experiencia en diseño urbano, integrando arquitectura y paisaje. Estudio distribuido entre Milán, Montreal, Róterdam y Padua.',
  },
};

const languageCodes: Record<Language, string> = {
  it: 'it-IT',
  en: 'en-US',
  es: 'es-ES',
};

const jobTitles: Record<Language, string[]> = {
  it: ['Architetta', 'Ricercatrice', 'Designer'],
  en: ['Architect', 'Researcher', 'Designer'],
  es: ['Arquitecta', 'Investigadora', 'Diseñadora'],
};

export const useSEO = ({ language }: SEOConfig) => {
  useEffect(() => {
    const { title, description } = seoTranslations[language];
    
    // Update document title
    document.title = title;
    
    // Update html lang attribute
    document.documentElement.lang = languageCodes[language].split('-')[0];
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update OG meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title.split(' | ')[0] + ' | Architetta');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    // Update OG image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', 'https://alinalippiello.com/og-image.jpg');
    
    // Add og:image dimensions
    let ogImageWidth = document.querySelector('meta[property="og:image:width"]');
    if (!ogImageWidth) {
      ogImageWidth = document.createElement('meta');
      ogImageWidth.setAttribute('property', 'og:image:width');
      document.head.appendChild(ogImageWidth);
    }
    ogImageWidth.setAttribute('content', '1200');
    
    let ogImageHeight = document.querySelector('meta[property="og:image:height"]');
    if (!ogImageHeight) {
      ogImageHeight = document.createElement('meta');
      ogImageHeight.setAttribute('property', 'og:image:height');
      document.head.appendChild(ogImageHeight);
    }
    ogImageHeight.setAttribute('content', '630');
    
    // Add Twitter card image
    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', 'https://alinalippiello.com/og-image.jpg');
    
    // Update/create hreflang links
    const baseUrl = 'https://alinalippiello.com';
    const languages: Language[] = ['it', 'en', 'es'];
    
    // Remove existing hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    // Add new hreflang links
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = languageCodes[lang];
      link.href = lang === 'it' ? baseUrl : `${baseUrl}?lang=${lang}`;
      document.head.appendChild(link);
    });
    
    // Add x-default hreflang
    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = baseUrl;
    document.head.appendChild(xDefault);
    
    // Add/update JSON-LD structured data
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Alina Lippiello',
      url: 'https://alinalippiello.com',
      image: 'https://alinalippiello.com/og-image.jpg',
      jobTitle: jobTitles[language],
      description: description,
      sameAs: [
        'https://www.linkedin.com/in/alina-lippiello',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Studio Alina Lippiello',
      },
      knowsAbout: [
        'Architecture',
        'Urban Design',
        'Landscape Architecture',
        'Sustainable Design',
      ],
      workLocation: [
        { '@type': 'Place', name: 'Milano, Italy' },
        { '@type': 'Place', name: 'Montreal, Canada' },
        { '@type': 'Place', name: 'Rotterdam, Netherlands' },
        { '@type': 'Place', name: 'Padova, Italy' },
      ],
    };
    
    jsonLdScript.textContent = JSON.stringify(jsonLdData);
    
  }, [language]);
};
