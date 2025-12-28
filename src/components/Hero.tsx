const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Page title */}
          <p
            className="font-body text-sm tracking-[0.2em] uppercase text-foreground mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Architetto
          </p>

          {/* Main description */}
          <h1
            className="font-display text-lg md:text-xl lg:text-2xl font-normal leading-relaxed mb-12 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            L'architettura come racconto stratificato, tra spazio, tempo e paesaggio.
            <br />
            Oltre 20 anni di esperienza nella progettazione urbana e nell'integrazione
            <br className="hidden md:block" />
            tra architettura e paesaggio.
          </h1>

          {/* Scroll indicator */}
          <div
            className="mt-16 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <a
              href="#profilo"
              className="inline-block font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-smooth"
            >
              Scopri di più ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
