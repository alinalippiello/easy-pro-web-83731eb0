import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lightbox from '@/components/Lightbox';
import { projectsData } from '@/components/Experience';
import { slugToProject } from '@/data/projectsSeo';
import { useLanguage } from '@/hooks/useLanguage';
import NotFound from './NotFound';

const SITE_URL = 'https://alinalippiello.com';

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const seo = slug ? slugToProject.get(slug) : undefined;
  const project = useMemo(
    () => (seo ? projectsData.find((p) => p.id === seo.id) : undefined),
    [seo],
  );

  const [index, setIndex] = useState(0);

  // Reset gallery index whenever the project changes
  useEffect(() => {
    setIndex(0);
  }, [slug]);

  // Restore previous scroll position to the projects grid on unmount
  useEffect(() => {
    return () => {
      try {
        const saved = sessionStorage.getItem('progettiScrollY');
        if (saved !== null) {
          // Defer to after navigation paint
          requestAnimationFrame(() => {
            window.scrollTo({ top: parseInt(saved, 10), behavior: 'auto' });
            sessionStorage.removeItem('progettiScrollY');
          });
        }
      } catch {
        /* ignore */
      }
    };
  }, []);

  // Dynamic SEO + Open Graph / Twitter Card meta
  useEffect(() => {
    if (!seo || !project) return;
    const projectUrl = `${SITE_URL}/progetti/${seo.slug}`;
    const shortDesc = seo.description.split(/(?<=\.)\s+/).slice(0, 2).join(' ').trim();
    const ogTitle = `${t(`project.${project.id}.title`)} — Alina Lippiello`;
    const coverPath = project.thumbnail.startsWith('http')
      ? project.thumbnail
      : `${SITE_URL}${project.thumbnail.startsWith('/') ? '' : '/'}${project.thumbnail}`;

    const ensureMeta = (selector: string, attr: 'name' | 'property', key: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      return el;
    };
    const ensureLink = (rel: string) => {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      return el;
    };

    const targets: Array<{
      el: HTMLMetaElement | HTMLLinkElement;
      prop: 'content' | 'href';
      value: string;
    }> = [
      { el: ensureMeta('meta[name="description"]', 'name', 'description'), prop: 'content', value: seo.description },
      { el: ensureMeta('meta[property="og:title"]', 'property', 'og:title'), prop: 'content', value: ogTitle },
      { el: ensureMeta('meta[property="og:description"]', 'property', 'og:description'), prop: 'content', value: shortDesc },
      { el: ensureMeta('meta[property="og:url"]', 'property', 'og:url'), prop: 'content', value: projectUrl },
      { el: ensureMeta('meta[property="og:image"]', 'property', 'og:image'), prop: 'content', value: coverPath },
      { el: ensureMeta('meta[property="og:type"]', 'property', 'og:type'), prop: 'content', value: 'article' },
      { el: ensureMeta('meta[name="twitter:card"]', 'name', 'twitter:card'), prop: 'content', value: 'summary_large_image' },
      { el: ensureMeta('meta[name="twitter:title"]', 'name', 'twitter:title'), prop: 'content', value: ogTitle },
      { el: ensureMeta('meta[name="twitter:description"]', 'name', 'twitter:description'), prop: 'content', value: shortDesc },
      { el: ensureMeta('meta[name="twitter:image"]', 'name', 'twitter:image'), prop: 'content', value: coverPath },
      { el: ensureLink('canonical'), prop: 'href', value: projectUrl },
    ];

    const previous = targets.map(({ el, prop }) => ({
      el,
      prop,
      value:
        prop === 'href'
          ? (el as HTMLLinkElement).href
          : (el as HTMLMetaElement).content ?? '',
    }));
    const previousTitle = document.title;

    document.title = `${seo.title} | Alina Lippiello`;
    targets.forEach(({ el, prop, value }) => el.setAttribute(prop, value));

    return () => {
      document.title = previousTitle;
      previous.forEach(({ el, prop, value }) => el.setAttribute(prop, value));
    };
  }, [seo, project, t, language]);

  if (!seo || !project) {
    return <NotFound />;
  }

  const captions = project.captionKeys
    ? project.captionKeys.map((key) => (key ? t(key) : ''))
    : project.captions;

  const goBack = () => {
    // Return to the home page; the unmount effect restores the exact scroll
    // position to the projects grid (or falls back to #progetti if not saved).
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem('progettiScrollY');
    } catch {
      /* ignore */
    }
    navigate(saved !== null ? '/' : '/#progetti');
  };

  const goPrev = () =>
    setIndex((p) => (p === 0 ? project.images.length - 1 : p - 1));
  const goNext = () =>
    setIndex((p) => (p === project.images.length - 1 ? 0 : p + 1));

  return (
    <Lightbox
      images={project.images}
      captions={captions}
      currentIndex={index}
      isOpen={true}
      onClose={goBack}
      onPrev={goPrev}
      onNext={goNext}
      title={t(`project.${project.id}.title`)}
      description={
        t(`project.${project.id}.description`) !== `project.${project.id}.description`
          ? t(`project.${project.id}.description`)
          : undefined
      }
      author={project.author}
      collaborators={
        project.collaboratorsKey ? t(project.collaboratorsKey) : project.collaborators
      }
      onIndexChange={setIndex}
      overlayImage={project.overlayImage}
      overlayImageIndices={project.overlayImageIndices}
      imageDisplayScales={project.imageDisplayScales}
      link={
        project.link
          ? { url: project.link.url, label: t(project.link.labelKey) }
          : undefined
      }
      closeLabel={t('project.back')}
    />
  );
};

export default ProjectPage;
