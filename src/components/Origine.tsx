const Origine = () => {
  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section id="origine" className="py-20 md:py-28 border-t border-border">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Origine
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed max-w-3xl mx-auto italic">
              Schizzi, modelli e disegni che raccontano un lavoro coerente tra architettura e paesaggio — una ricerca sulla piega, sull'innesto, sulla continuità tra costruito e territorio.
            </p>
          </div>

          {/* Grid di immagini segnaposto */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {placeholders.map((i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-sm bg-muted/40 border border-border/50 flex items-center justify-center group hover:bg-muted/60 transition-colors duration-300"
              >
                <div className="text-center px-4">
                  <svg
                    className="w-8 h-8 mx-auto mb-2 text-muted-foreground/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                  <p className="font-body text-[10px] tracking-wider uppercase text-muted-foreground/40">
                    {['Schizzo', 'Modello', 'Disegno', 'Studio', 'Piega', 'Innesto'][i]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Note concettuali */}
          <div className="mt-16 max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                La piega
              </p>
              <p className="font-body text-sm text-foreground leading-relaxed">
                Lo spazio non si genera per addizione ma per inflessione. La piega è il dispositivo che trasforma una superficie in un campo: crea soglie, articola limiti, produce continuità là dove la geometria tradizionale separa.
              </p>
            </div>
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                L'innesto
              </p>
              <p className="font-body text-sm text-foreground leading-relaxed">
                Ogni progetto si radica in un contesto esistente. L'innesto è l'atto di inserirsi senza cancellare, di aggiungere nuova materia al corpo vivo del paesaggio — costruendo relazioni tra ciò che c'è e ciò che può emergere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origine;
