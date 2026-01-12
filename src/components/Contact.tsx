import { forwardRef } from "react";
import { Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = forwardRef<HTMLElement>((_, ref) => {
  const { t } = useLanguage();

  return (
    <section ref={ref} id="contatti" className="py-20 md:py-28 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
            {t('contact.title')}
          </p>

          <p className="font-body text-sm md:text-base text-foreground mb-12 max-w-xl mx-auto">
            {t('contact.description')}
          </p>

          {/* Contact Info */}
          <div className="space-y-4 mb-12">
            <a
              href="mailto:alina.lippiello@gmail.com"
              className="font-body text-sm underline hover:no-underline transition-smooth inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              alina.lippiello@gmail.com
            </a>
            <p className="font-body text-sm text-muted-foreground flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              Via Jommelli 33, 20131 Milano
            </p>
            <p className="font-body text-sm text-muted-foreground">
              +39 389 8304597
            </p>
          </div>

          {/* Studio Locations */}
          <div className="pt-8 border-t border-border">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              {t('contact.studio')}
            </p>
            <p className="font-body text-sm text-foreground">
              Milano · Montreal · Rotterdam · Padova
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
