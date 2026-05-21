import { Link } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";

const IUBENDA_URL = "https://www.iubenda.com/privacy-policy/80078108";

const Footer = () => {
  const { isAdmin } = useAdmin();
  return (
    <footer className="border-t border-border py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <p className="font-display text-sm tracking-[0.25em] uppercase text-foreground/80">
            Alina Lippiello — Architectural Portfolio
          </p>
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
          <p className="font-body text-[10px] uppercase tracking-[0.12em] text-foreground/40">
            © {new Date().getFullYear()} Alina Lippiello
            <button
              type="button"
              aria-label="admin"
              onClick={() => window.dispatchEvent(new Event('open-admin-gate'))}
              className="ml-2 inline-block w-2 h-2 rounded-full bg-foreground/30 hover:bg-foreground/70 transition-colors align-middle"
            />
          </p>
          {isAdmin && (
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-admin-gate'))}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/30 bg-background font-body text-[10px] uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground hover:border-foreground/60 transition"
              aria-label="Sessione admin attiva"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
              Admin attivo
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
