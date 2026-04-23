import * as React from "react";
import { Link } from "react-router-dom";

const CookieBanner = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background px-4 py-3">
      <div className="container flex max-w-4xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="font-body text-[11px] leading-relaxed tracking-wide text-muted-foreground">
          Usiamo cookie tecnici. / We use technical cookies. / Usamos cookies técnicas.
        </p>
        <div className="shrink-0 font-body text-[10px] uppercase tracking-widest text-muted-foreground">
          <Link to="/legal" className="underline transition-colors hover:text-foreground">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
});

CookieBanner.displayName = "CookieBanner";

export default CookieBanner;
