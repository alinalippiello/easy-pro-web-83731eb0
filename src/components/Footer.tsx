import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-16 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          {/* Links — sostituire gli href "#" con i link Iubenda quando disponibili */}
          <p className="font-body text-[11px] text-foreground/50 uppercase tracking-[0.15em]">
            <a href="#" className="hover:text-foreground/80 transition-colors">Privacy Policy</a>
            {" "}&ndash;{" "}
            <a href="#" className="hover:text-foreground/80 transition-colors">Cookies Policy</a>
            {" "}&ndash;{" "}
            <a href="#" className="hover:text-foreground/80 transition-colors">Change cookies consent</a>
          </p>
          <p className="font-body text-[11px] text-foreground/40 tracking-wide">
            © {new Date().getFullYear()} Alina Lippiello &ndash; P.IVA 13258160962 &ndash; info@alinalippiello.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
