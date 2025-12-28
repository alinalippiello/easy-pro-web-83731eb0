const Profile = () => {
  return (
    <section id="profilo" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12">
            Profilo
          </p>

          <div className="space-y-6 font-body text-sm md:text-base text-foreground leading-relaxed">
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
              Oggi, attraverso uno studio diffuso tra Milano, Montreal, Rotterdam e Padova, 
              continua a esplorare il potenziale dell'architettura come strumento di trasformazione 
              urbana, con un focus su spazi porosi, continuità territoriale e nuove forme di 
              abitare collettivo.
            </p>
          </div>

          {/* Education integrated */}
          <div className="mt-16 pt-12 border-t border-border">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
              Formazione
            </p>
            
            <div className="space-y-4 font-body text-sm text-foreground">
              <p>
                <span className="text-muted-foreground">2004—2008</span> — Dottorato in Progettazione Architettonica e Urbana, Politecnico di Milano
              </p>
              <p>
                <span className="text-muted-foreground">2005</span> — Master in Urban and Regional Design, NYIT New York
              </p>
              <p>
                <span className="text-muted-foreground">2000</span> — Laurea in Architettura, Politecnico di Milano (97/100)
              </p>
              <p>
                <span className="text-muted-foreground">Erasmus</span> — Faculdade de Arquitectura, Universidade do Porto
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
