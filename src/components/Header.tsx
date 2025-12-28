import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Profilo", href: "#profilo" },
    { label: "Progetti", href: "#progetti" },
    { label: "Pubblicazioni", href: "#pubblicazioni" },
    { label: "Contatti", href: "#contatti" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background py-4"
          : "bg-background py-6"
      }`}
    >
      <div className="container">
        {/* Top row: Menu - Logo - Search */}
        <div className="flex items-center justify-between">
          {/* Menu button */}
          <button
            className="font-body text-sm tracking-widest uppercase hover:opacity-60 transition-smooth"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? "Chiudi" : "Menu"}
          </button>

          {/* Centered Logo */}
          <a
            href="#"
            className="absolute left-1/2 -translate-x-1/2 font-display text-lg md:text-xl tracking-[0.3em] uppercase font-normal transition-smooth hover:opacity-60"
          >
            ALINA LIPPIELLO
          </a>

          {/* Right placeholder for balance */}
          <div className="w-12" />
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
