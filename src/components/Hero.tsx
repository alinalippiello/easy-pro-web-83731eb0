import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-[70vh] flex items-center justify-center pt-24 pb-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Page title */}
          <p
            className="font-body text-sm tracking-[0.2em] uppercase text-foreground mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {t('hero.title')}
          </p>

          {/* Main description */}
          <h1
            className="font-display text-base md:text-lg font-normal leading-relaxed mb-12 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {t('hero.description')}
          </h1>

          {/* Scroll indicator */}
          <div
            className="mt-12 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <a
              href="#profilo"
              className="inline-block font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-smooth"
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
