import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <p className="font-body text-[10px] sm:text-[11px] text-foreground/40 uppercase tracking-[0.12em]">
            <Link to="/legal#it" className="hover:text-foreground/70 transition-colors">
              Privacy (IT)
            </Link>
            {" "}&ndash;{" "}
            <Link to="/legal#en" className="hover:text-foreground/70 transition-colors">
              Privacy (EN)
            </Link>
            {" "}&ndash;{" "}
            <Link to="/legal#es" className="hover:text-foreground/70 transition-colors">
              Privacy (ES)
            </Link>
          </p>
          <p className="font-body text-[10px] sm:text-[11px] text-foreground/35 tracking-wide">
            © {new Date().getFullYear()} Alina Lippiello &ndash; P.IVA 13258160962 &ndash; alina.lippiello@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
