import { Link } from "react-router-dom";

const CookieBanner = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background px-4 py-3">
      <div className="container max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="font-body text-[11px] leading-relaxed tracking-wide text-muted-foreground">
          Usiamo cookie tecnici. / We use technical cookies. / Usamos cookies técnicas.
        </p>
        <div className="flex items-center gap-3 shrink-0 font-body text-[10px] uppercase tracking-widest text-muted-foreground">
          <Link
            to="/legal"
            className="underline hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
