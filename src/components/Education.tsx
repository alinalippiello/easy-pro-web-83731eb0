const Education = () => {
  const education = [
    {
      year: "2005",
      title: "Master in Urban and Regional Design",
      institution: "NYIT, New York Institute of Technology",
      note: "Periodo di studio a New York",
    },
    {
      year: "2004 — 2008",
      title: "Dottorato in Progettazione Architettonica e Urbana",
      institution: "Politecnico di Milano (XIX ciclo)",
      note: "Tesi: La rottura del binomio figura-sfondo",
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
    <section id="formazione" className="py-24 md:py-32">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Section Label */}
          <div className="md:col-span-3">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground sticky top-24">
              03 — Formazione
            </p>
          </div>

          {/* Content */}
          <div className="md:col-span-9">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-16">
              Un percorso tra teoria,
              <br className="hidden md:block" /> ricerca e pratica
            </h2>

            {/* Education Timeline */}
            <div className="space-y-8 mb-20">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-12 gap-4 md:gap-8 group"
                >
                  <div className="md:col-span-2">
                    <p className="font-body text-sm text-muted-foreground">
                      {item.year}
                    </p>
                  </div>
                  <div className="md:col-span-10 pb-8 border-b border-border last:border-b-0">
                    <h3 className="font-display text-xl font-medium mb-1">
                      {item.title}
                    </h3>
                    {item.institution && (
                      <p className="font-body text-base text-foreground/80 mb-2">
                        {item.institution}
                      </p>
                    )}
                    <p className="font-body text-sm text-muted-foreground">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid sm:grid-cols-3 gap-12">
              {/* Software */}
              <div>
                <h3 className="font-display text-lg font-medium mb-4 pb-4 border-b border-border">
                  Software
                </h3>
                <ul className="space-y-2">
                  {skills.software.map((item) => (
                    <li
                      key={item}
                      className="font-body text-sm text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div>
                <h3 className="font-display text-lg font-medium mb-4 pb-4 border-b border-border">
                  Lingue
                </h3>
                <ul className="space-y-2">
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
                <h3 className="font-display text-lg font-medium mb-4 pb-4 border-b border-border">
                  Certificazioni
                </h3>
                <ul className="space-y-2">
                  {skills.certifications.map((item) => (
                    <li
                      key={item}
                      className="font-body text-sm text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
