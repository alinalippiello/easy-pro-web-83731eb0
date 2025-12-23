import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Indirizzo",
      value: "Via Jommelli 33, 20131 Milano, Italia",
      href: "https://maps.google.com/?q=Via+Jommelli+33+20131+Milano+Italia",
    },
    {
      icon: Phone,
      label: "Telefono",
      value: "+39 389 8304597",
      href: "tel:+393898304597",
    },
    {
      icon: Mail,
      label: "Email",
      value: "alina.lippiello@gmail.com",
      href: "mailto:alina.lippiello@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Profilo LinkedIn",
      href: "#",
    },
  ];

  return (
    <section id="contatti" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Section Label */}
          <div className="md:col-span-3">
            <p className="font-body text-sm tracking-[0.2em] uppercase opacity-60">
              04 — Contatti
            </p>
          </div>

          {/* Content */}
          <div className="md:col-span-9">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
              Parliamo del tuo
              <br className="hidden md:block" /> prossimo progetto
            </h2>

            <p className="font-body text-lg opacity-80 max-w-xl mb-16">
              Sono sempre interessata a nuove collaborazioni e progetti stimolanti.
              Non esitare a contattarmi per discutere le tue idee.
            </p>

            {/* Contact Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-4 p-6 bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-smooth"
                >
                  <item.icon className="w-5 h-5 mt-0.5 opacity-60 group-hover:opacity-100 transition-smooth" />
                  <div>
                    <p className="font-body text-xs tracking-wider uppercase opacity-60 mb-1">
                      {item.label}
                    </p>
                    <p className="font-body text-base group-hover:translate-x-1 transition-smooth">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Studio Location */}
            <div className="mt-16 pt-12 border-t border-primary-foreground/20">
              <p className="font-body text-sm opacity-60 mb-4">Studio</p>
              <span className="font-display text-xl font-light">Milano</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
