import { useLanguage } from "@/contexts/LanguageContext";

const Publications = () => {
  const { t } = useLanguage();

  const publications = [
    {
      year: "2023",
      title: "Ecologies of the Urban",
      publication: "Architecture Journal",
      type: "Article",
    },
    {
      year: "2019",
      title: "Porous Spaces: New Forms of Collective Living",
      publication: "Domus",
      type: "Article",
    },
    {
      year: "2015",
      title: "Expo Milano: Service Architectures",
      publication: "Casabella",
      type: "Article",
    },
    {
      year: "2011",
      title: "Europan 11: Floating Blocks",
      publication: "Europan Europe",
      type: "Publication",
    },
    {
      year: "2008",
      title: "La rottura del binomio figura-sfondo",
      publication: "Politecnico di Milano",
      type: "Doctoral Thesis",
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
