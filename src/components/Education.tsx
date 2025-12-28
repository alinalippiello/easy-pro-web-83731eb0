const Education = () => {
  const education = [
    {
      year: "2005",
      title: "Master in Urban and Regional Design",
      institution: "NYIT, New York Institute of Technology",
      note: "Periodo di studio a New York",
    },
    {
      year: "2000",
      title: "Laurea in Architettura",
      institution: "Politecnico di Milano",
      note: "Voto: 97/100 • Tesi sul waterfront di Spalato",
    },
    {
      year: "",
      title: "Erasmus",
      institution: "Faculdade de Arquitectura, Universidade do Porto",
      note: "Stratificazione storica e paesaggio",
    },
    {
      year: "",
      title: "Liceo Classico",
      institution: "",
      note: "Formazione critica e pensiero analitico",
    },
  ];

  const research = {
    period: "2004 — 2008",
    title: "Ricerca in Progettazione Architettonica e Urbana",
    institution: "Politecnico di Milano (XIX ciclo)",
    thesis: "La rottura del binomio figura-sfondo",
  };

  const skills = {
    software: ["AutoCAD 2D/3D", "Rhino", "Revit", "3ds Max", "Adobe Illustrator", "Photoshop"],
    languages: [
      { lang: "Italiano", level: "Madrelingua" },
      { lang: "Spagnolo", level: "C1" },
      { lang: "Inglese", level: "B1" },
    ],
    certifications: ["Certificatore Energetico (CENED)", "Certificato Autodesk Revit"],
  };

  return (
    <section id="formazione" className="py-20 md:py-28 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center">
            Formazione
          </p>

          {/* Research Highlight */}
          <div className="mb-12 text-center">
            <p className="font-body text-xs tracking-wider uppercase text-muted-foreground mb-2">
              {research.period}
            </p>
            <h3 className="font-body text-base font-normal mb-1">
              {research.title}
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-1">
              {research.institution}
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Tesi: "{research.thesis}"
            </p>
          </div>

          {/* Education Timeline */}
          <div className="space-y-8 mb-16">
            {education.map((item, index) => (
              <div
                key={index}
                className="text-center pb-8 border-b border-border last:border-b-0"
              >
                {item.year && (
                  <p className="font-body text-xs text-muted-foreground mb-2">
                    {item.year}
                  </p>
                )}
                <h3 className="font-body text-sm font-normal mb-1">
                  {item.title}
                </h3>
                {item.institution && (
                  <p className="font-body text-sm text-muted-foreground">
                    {item.institution}
                  </p>
                )}
                <p className="font-body text-xs text-muted-foreground mt-1">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-3 gap-12 text-center">
            {/* Software */}
            <div>
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Software
              </h3>
              <ul className="space-y-1">
                {skills.software.map((item) => (
                  <li
                    key={item}
                    className="font-body text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Lingue
              </h3>
              <ul className="space-y-1">
                {skills.languages.map((item) => (
                  <li key={item.lang} className="font-body text-sm">
                    <span className="text-foreground">{item.lang}</span>
                    <span className="text-muted-foreground"> — {item.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Certificazioni
              </h3>
              <ul className="space-y-1">
                {skills.certifications.map((item) => (
                  <li
                    key={item}
                    className="font-body text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
