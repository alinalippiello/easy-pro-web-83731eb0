import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://cdn.iubenda.com/iubenda.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  return (
    <footer className="py-16 border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <p className="font-body text-[10px] sm:text-[11px] text-foreground/40 uppercase tracking-[0.12em]">
            <a
              href="https://www.iubenda.com/privacy-policy/80078108"
              className="iubenda-white iubenda-noiframe iubenda-embed hover:text-foreground/70 transition-colors"
              title="Privacy Policy"
            >
              Privacy (IT)
            </a>
            {" "}&ndash;{" "}
            <a href="/legal" className="hover:text-foreground/70 transition-colors">Privacy (EN)</a>
            {" "}&ndash;{" "}
            <a href="/legal" className="hover:text-foreground/70 transition-colors">Privacy (ES)</a>
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
