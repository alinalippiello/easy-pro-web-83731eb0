import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.profile'), href: "#profilo" },
    { label: t('strati.title'), href: "#strati" },
    { label: t('nav.projects'), href: "#progetti" },
    { label: t('nav.publications'), href: "#pubblicazioni" },
    { label: t('nav.contact'), href: "#contatti" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background py-3 sm:py-4"
          : "bg-background py-4 sm:py-6"
      }`}
    >
      <div className="container">
        {/* Row 1: Logo centrato */}
        <div className="flex justify-center mb-2 sm:mb-3">
          <a
            href="#"
            className="font-display text-xl sm:text-2xl md:text-3xl tracking-[0.3em] sm:tracking-[0.4em] uppercase font-normal transition-smooth hover:opacity-60"
          >
            ALINA LIPPIELLO
          </a>
        </div>

        {/* Row 2: Menu a sinistra, Lingue a destra */}
        <div className="flex items-center justify-between">
          <button
            className="font-body text-xs sm:text-sm tracking-widest uppercase hover:opacity-60 transition-smooth"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? t('nav.close') : t('nav.menu')}
          </button>

          <div className="relative z-10">
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Full screen Menu */}
      {isMobileMenuOpen && (
        <nav className="fixed inset-0 top-0 bg-background z-40 animate-fade-in">
          <div className="container h-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-body text-2xl md:text-3xl tracking-widest uppercase text-foreground hover:opacity-60 transition-smooth"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
