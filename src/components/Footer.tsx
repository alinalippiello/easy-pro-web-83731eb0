import { Link } from "react-router-dom";

const IUBENDA_URL = "https://www.iubenda.com/privacy-policy/";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-body text-[10px] uppercase tracking-[0.12em] text-foreground/40 sm:text-[11px]">
            <a
              href={IUBENDA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground/70"
            >
              Privacy (IT)
            </a>
            {" "}&ndash;{" "}
            <Link to="/legal#en" className="transition-colors hover:text-foreground/70">
              Privacy (EN)
            </Link>
            {" "}&ndash;{" "}
            <Link to="/legal#es" className="transition-colors hover:text-foreground/70">
              Privacy (ES)
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
