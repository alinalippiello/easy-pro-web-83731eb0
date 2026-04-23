import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent-accepted";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background px-4 py-3">
      <div className="container flex max-w-4xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="font-body text-[11px] leading-relaxed tracking-wide text-muted-foreground">
          Utilizziamo cookie tecnici. / We use technical cookies. / Usamos cookies técnicas.
        </p>
        <button
          onClick={accept}
          className="shrink-0 border border-border px-4 py-1.5 font-body text-[10px] uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
