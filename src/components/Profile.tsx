import profileModels from "@/assets/profile-models.png";

const Profile = () => {
  return (
    <section id="profilo" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Profile Image */}
          <div className="mb-16">
            <img 
              src={profileModels} 
              alt="Modelli architettonici" 
              className="w-full"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide mb-4">
              Alina Lippiello
            </h2>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground">
              Architetto | Concept designer | Direzione artistica
            </p>
          </div>

          {/* Visione */}
          <div className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Visione
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed italic">
              L'architettura non è un oggetto, ma un campo di forze.
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed mt-4">
              È una soglia tra paesaggio e costruito, tra memoria e trasformazione, tra ciò che esiste e ciò che può emergere. Il mio lavoro nasce da questa tensione: progetto spazi che non si impongono, ma si innestano; che non separano, ma connettono; che non si limitano a rispondere a una funzione, ma costruiscono senso.
            </p>
          </div>

          {/* Profilo */}
          <div className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Profilo
            </p>
            <div className="space-y-4 font-body text-sm md:text-base text-foreground leading-relaxed">
              <p>
                Sono un architetto e concept designer con esperienza nella progettazione architettonica, nella ricerca teorica e nella direzione artistica di processi complessi. Ho sviluppato il mio percorso tra concorsi internazionali, progetti residenziali e riflessione critica sull'architettura contemporanea, con un interesse particolare per il rapporto tra spazio, paesaggio e struttura urbana.
              </p>
              <p>
                La mia formazione integra pratica progettuale e ricerca critica. Dopo gli studi in architettura, ho approfondito il pensiero dell'architettura radicale e delle avanguardie del Novecento, sviluppando una riflessione sul concetto di architettura come paesaggio e come campo. La mia visione dello spazio è influenzata da una ricerca sul movimento e sulla percezione: lo spazio non come forma statica, ma come sequenza, ritmo e relazione tra corpo, struttura e territorio. Questo sguardo orienta il mio modo di concepire l'architettura come esperienza e come dispositivo dinamico.
              </p>
              <p>
                Il mio approccio si fonda su una visione radicale e al tempo stesso concreta: l'architettura come infrastruttura culturale e territoriale, capace di generare nuove forme di abitabilità e nuove narrazioni dello spazio.
              </p>
            </div>
          </div>

          {/* Ambiti di intervento */}
          <div className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Ambiti di intervento
            </p>
            <ul className="space-y-2 font-body text-sm md:text-base text-foreground leading-relaxed">
              <li>Concept design per architettura e spazio urbano</li>
              <li>Direzione artistica di progetti architettonici e urbani</li>
              <li>Consulenza strategica per studi, sviluppatori e istituzioni</li>
              <li>Ricerca e narrazione progettuale</li>
            </ul>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed mt-6">
              Lavoro in contesti internazionali, collaborando con team multidisciplinari e studi di architettura, mantenendo una pratica indipendente orientata alla qualità del pensiero progettuale.
            </p>
          </div>

          {/* Posizionamento */}
          <div className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Posizionamento
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed italic mb-4">
              Non progetto semplicemente edifici.
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed italic mb-4">
              Progetto sistemi spaziali, paesaggi abitabili e scenari futuri.
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed">
              Credo in un'architettura capace di superare la logica dell'oggetto isolato per diventare campo, infrastruttura, paesaggio. Un'architettura che non occupa il territorio, ma lo interpreta.
            </p>
          </div>

          {/* Invito */}
          <div className="pt-8 border-t border-border">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Invito
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed">
              Se cerchi una visione capace di tenere insieme rigore concettuale e sensibilità spaziale, ricerca e pragmatismo, posso accompagnarti nella costruzione di un progetto che non sia solo una risposta tecnica, ma una narrazione coerente del luogo e del suo potenziale.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;
