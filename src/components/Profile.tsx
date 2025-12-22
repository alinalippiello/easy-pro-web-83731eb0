const Profile = () => {
  return (
    <section id="profilo" className="py-24 md:py-32">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Section Label */}
          <div className="md:col-span-3">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground sticky top-24">
              01 — Profilo
            </p>
          </div>

          {/* Content */}
          <div className="md:col-span-9 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
              Una visione che coniuga ricerca teorica e pratica progettuale
            </h2>

            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                L'architettura, per Alina Lippiello, è un racconto stratificato. Ogni progetto 
                è un frammento di una storia più ampia, fatta di connessioni tra spazio e tempo, 
                tra memoria e innovazione, tra città e paesaggio.
              </p>

              <p>
                Il suo percorso si distingue per un approccio che coniuga ricerca teorica e 
                pratica progettuale, sperimentazione e concretezza, sempre con uno sguardo 
                attento alla trasformazione urbana e alla continuità tra architettura e territorio.
              </p>

              <p>
                Architetto con oltre 20 anni di esperienza nella progettazione e gestione di 
                progetti residenziali e commerciali. Specializzata in progettazione architettonica 
                e urbana, con un forte focus sull'uso di tecnologie sostenibili, design innovativo 
                e attenzione al dettaglio.
              </p>

              <p>
                Oggi, attraverso uno studio diffuso tra <em className="text-foreground not-italic font-medium">Milano, Montreal, Rotterdam e Padova</em>, 
                continua a esplorare il potenziale dell'architettura come strumento di trasformazione 
                urbana, con un focus su spazi porosi, continuità territoriale e nuove forme di 
                abitare collettivo.
              </p>
            </div>

            {/* Key Focus Areas */}
            <div className="mt-12 pt-12 border-t border-border">
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  { title: "Progettazione Urbana", desc: "Infrastrutture e paesaggio" },
                  { title: "Spazi Porosi", desc: "Comunità e continuità" },
                  { title: "Design Sostenibile", desc: "Innovazione responsabile" },
                ].map((item) => (
                  <div key={item.title}>
                    <h3 className="font-display text-lg font-medium mb-2">{item.title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
