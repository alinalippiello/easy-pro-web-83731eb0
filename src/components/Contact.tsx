import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contatti" className="py-20 md:py-28 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12">
            {t('contact.title')}
          </p>

          {/* Contact Info */}
          <div className="space-y-4">
            <a
              href="mailto:alina.lippiello@gmail.com"
              className="font-body text-sm underline hover:no-underline transition-smooth"
            >
              alina.lippiello@gmail.com
            </a>
            <p className="font-body text-sm text-muted-foreground">
              Via Jommelli 33, 20131 Milano
            </p>
            <p className="font-body text-sm text-muted-foreground">
              +39 389 8304597
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
