import { useState, useEffect } from "react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-foreground text-background px-4 py-3">
      <div className="container max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="font-body text-[11px] leading-relaxed tracking-wide opacity-80">
          Usiamo cookie tecnici. / We use technical cookies. / Usamos cookies técnicas.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/legal"
            className="font-body text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity underline"
          >
            Privacy
          </a>
          <button
            onClick={accept}
            className="font-body text-[11px] uppercase tracking-widest bg-background text-foreground px-4 py-1.5 hover:opacity-80 transition-opacity"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
