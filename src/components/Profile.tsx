const Profile = () => {
  return (
    <section id="profilo" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12">
            Profilo
          </p>

          <div className="space-y-8 font-body text-sm md:text-base text-foreground leading-relaxed">
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
              Oggi, attraverso uno studio diffuso tra Milano, Montreal, Rotterdam e Padova, 
              continua a esplorare il potenziale dell'architettura come strumento di trasformazione 
              urbana, con un focus su spazi porosi, continuità territoriale e nuove forme di 
              abitare collettivo.
            </p>
          </div>

          {/* Key Focus Areas */}
          <div className="mt-16 pt-12 border-t border-border">
            <div className="grid sm:grid-cols-3 gap-12">
              {[
                { title: "Progettazione Urbana", desc: "Infrastrutture e paesaggio" },
                { title: "Spazi Porosi", desc: "Comunità e continuità" },
                { title: "Design Sostenibile", desc: "Innovazione responsabile" },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <h3 className="font-body text-sm font-normal tracking-wide mb-2">{item.title}</h3>
                  <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
