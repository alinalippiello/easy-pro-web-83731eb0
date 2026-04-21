const Footer = () => {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <p className="font-body text-[11px] text-foreground/50 tracking-wide leading-relaxed">
            © 2026 Alina Lippiello. Questo sito è una vetrina professionale e non raccoglie dati personali degli utenti né utilizza cookie di profilazione.
          </p>
          <p className="font-body text-[11px] text-foreground/50 tracking-wide">
            <a href="mailto:alina.lippiello@gmail.com" className="underline hover:text-foreground/80 transition-smooth">
              alina.lippiello@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
