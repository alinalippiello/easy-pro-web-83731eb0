interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  projects?: string[];
  description?: string;
}

const experiences: ExperienceItem[] = [
  {
    period: "2021 — Oggi",
    role: "Ideazione e Progettazione",
    company: "GWW Wernigerode mbH",
    projects: ["New Ecological Porous Garden City of Wernigerode", "Primo Piano Wernigerode"],
    description: "Progetto residenziale di 3000 m² in fase di sviluppo. Collaborazione con Cope e H+L Hartung & Ludwig Architektur.",
  },
];

const portfolioProjects = [
  {
    title: "New Ecological Porous Garden City",
    location: "Wernigerode, Germania",
    year: "2021 — Oggi",
    description: "Progetto residenziale ecologico di 3000 m²",
  },
  {
    title: "Primo Piano Wernigerode",
    location: "Wernigerode, Germania",
    year: "In corso",
    description: "Sviluppo urbanistico sostenibile",
  },
];

const Experience = () => {
  return (
    <section id="esperienza" className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Section Label */}
          <div className="md:col-span-3">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground sticky top-24">
              02 — Esperienza
            </p>
          </div>

          {/* Content */}
          <div className="md:col-span-9">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-16">
              Oltre 20 anni di progetti <br className="hidden md:block" />
              tra Italia ed Europa
            </h2>

            <div className="space-y-0">
              {experiences.map((exp, index) => (
                <article
                  key={index}
                  className="group py-8 border-t border-border first:border-t-0 hover:bg-background/50 transition-smooth -mx-6 px-6"
                >
                  <div className="grid md:grid-cols-12 gap-4 md:gap-8">
                    {/* Period */}
                    <div className="md:col-span-2">
                      <p className="font-body text-sm text-muted-foreground">
                        {exp.period}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-10">
                      <h3 className="font-display text-xl md:text-2xl font-medium mb-1 group-hover:translate-x-1 transition-smooth">
                        {exp.company}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground mb-4">
                        {exp.role}
                      </p>

                      {exp.projects && (
                        <div className="flex flex-wrap gap-2">
                          {exp.projects.map((project) => (
                            <span
                              key={project}
                              className="font-body text-xs px-3 py-1.5 bg-secondary text-secondary-foreground rounded-sm"
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      )}

                      {exp.description && (
                        <p className="font-body text-sm text-muted-foreground mt-4 max-w-xl">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Portfolio Projects */}
            <div className="mt-16 pt-12 border-t border-border">
              <h3 className="font-display text-2xl font-light mb-8">
                Progetti in Portfolio
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {portfolioProjects.map((project) => (
                  <div
                    key={project.title}
                    className="group p-6 bg-background border border-border hover:border-foreground/20 transition-smooth"
                  >
                    <p className="font-body text-xs text-muted-foreground mb-2">
                      {project.year}
                    </p>
                    <h4 className="font-display text-lg font-medium mb-1 group-hover:translate-x-1 transition-smooth">
                      {project.title}
                    </h4>
                    <p className="font-body text-sm text-primary mb-2">
                      {project.location}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitions */}
            <div className="mt-16 pt-12 border-t border-border">
              <h3 className="font-display text-2xl font-light mb-8">
                Concorsi Internazionali
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Europan 11", result: "Secondo classificato" },
                  { name: "Europan 13", result: "Bergen, Norvegia" },
                  { name: "Europan 16", result: "Wernigerode, Germania" },
                  { name: "Planetario di Matera", result: "Primo classificato" },
                  { name: "Biblioteca di Maranello", result: "2010" },
                ].map((competition) => (
                  <div
                    key={competition.name}
                    className="p-6 bg-background border border-border hover:border-foreground/20 transition-smooth"
                  >
                    <h4 className="font-display text-lg font-medium mb-1">
                      {competition.name}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      {competition.result}
                    </p>
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

export default Experience;
