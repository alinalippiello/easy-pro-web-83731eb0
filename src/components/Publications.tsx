import { useLanguage } from "@/contexts/LanguageContext";

const Publications = () => {
  const { t } = useLanguage();

  const publications = [
    {
      year: "2021",
      title: "Europan 16: Living the New Ecological Porous Garden City of Wernigerode",
      publication: "Europan Europe",
      type: "Winner - Lotto Nord",
    },
    {
      year: "2011",
      title: "Europan 11: Floating Blocks",
      publication: "Europan Europe",
      type: "Publication",
    },
    {
      year: "2007",
      title: "Innestare, duplicare, piegare, p. 119",
      publication: "New York - Milano: disegno della città per la regione urbana",
      type: "Article",
    },
    {
      year: "2006",
      title: "Città e ferrovia",
      publication: "STAZIONI, un sipario urbano",
      type: "Article",
    },
    {
      year: "2005",
      title: "Moltiplicare il suolo, p. 117-121",
      publication: "Bari, studi per la metropoli",
      type: "Article",
    },
    {
      year: "1995",
      title: "Edificio residenziale a Milano in Via Gian Giacomo Mora",
      publication: "Documenti di Tecnologia dell'architettura. PROGETTI DIDATTICI 3",
      type: "Article",
    },
  ];

  return (
    <section id="pubblicazioni" className="py-20 md:py-28 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center">
            {t('publications.title')}
          </p>

          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 pb-6 border-b border-border last:border-b-0"
              >
                <p className="font-body text-xs text-muted-foreground md:w-16 shrink-0">
                  {pub.year}
                </p>
                <div className="flex-1">
                  <h4 className="font-body text-sm font-normal">
                    {pub.title}
                  </h4>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    {pub.publication} · {pub.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
