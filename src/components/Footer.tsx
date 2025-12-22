const Footer = () => {
  return (
    <footer className="py-8 bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm opacity-60">
            © {new Date().getFullYear()} Alina Lippiello. Tutti i diritti riservati.
          </p>
          <p className="font-body text-xs opacity-40">
            Autorizzo il trattamento dei miei dati personali secondo la legge vigente.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
