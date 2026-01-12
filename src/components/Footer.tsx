import { forwardRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const { t } = useLanguage();

  return (
    <footer ref={ref} className="py-12 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Alina Lippiello. {t('footer.rights')}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            {t('footer.privacy')}
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
