const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-title */}
          <p
            className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Architetto · Ricercatrice · Designer
          </p>

          {/* Main title */}
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Alina Lippiello
          </h1>

          {/* Decorative line */}
          <div
            className="w-24 h-px bg-foreground/30 mx-auto mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          />

          {/* Tagline */}
          <p
            className="font-display text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light italic max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            L'architettura come racconto stratificato,
            <br className="hidden md:block" />
            tra spazio, tempo e paesaggio.
          </p>

          {/* Scroll indicator */}
          <div
            className="mt-16 md:mt-24 opacity-0 animate-fade-in"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="#profilo"
              className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth group"
            >
              <span className="font-body text-xs tracking-widest uppercase">
                Scopri di più
              </span>
              <div className="w-px h-12 bg-border group-hover:bg-foreground/50 transition-smooth" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
