const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Alina Lippiello. Tutti i diritti riservati.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Autorizzo il trattamento dei miei dati personali secondo la legge vigente.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
