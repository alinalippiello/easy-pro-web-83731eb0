const Legal = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-3xl py-16 sm:py-24 space-y-20">
        <a
          href="/"
          className="inline-block font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-smooth"
        >
          ← Back
        </a>

        <section className="space-y-6">
          <h1 className="font-display text-2xl sm:text-3xl tracking-[0.2em] uppercase">
            Privacy Policy
          </h1>
          <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">
            English
          </p>
          <div className="border-t border-border pt-6 space-y-4 font-body text-sm leading-relaxed text-foreground/80">
            <p>
              This website is owned and operated by Alina Lippiello (P.IVA 13258160962). We are committed to protecting your privacy and personal data in accordance with the General Data Protection Regulation (GDPR – EU 2016/679).
            </p>
            <h2 className="font-display text-base tracking-widest uppercase pt-4">Data Controller</h2>
            <p>Alina Lippiello — info@alinalippiello.com</p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Data Collected</h2>
            <p>
              This website does not collect personal data directly. Navigation data (IP address, browser type, pages visited) may be collected automatically through server logs and third-party analytics tools. Cookies may be used in accordance with our Cookie Policy.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Purpose of Processing</h2>
            <p>
              Any data collected is used solely for the purpose of ensuring the proper functioning of the website and for anonymous statistical analysis of website traffic.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Data Retention</h2>
            <p>
              Personal data is retained only for the time necessary to fulfill the purposes for which it was collected, and in compliance with applicable legal obligations.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Your Rights</h2>
            <p>
              Under the GDPR, you have the right to access, rectify, erase, restrict processing of, and port your personal data. You may also object to processing. To exercise these rights, contact us at info@alinalippiello.com.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Third-Party Services</h2>
            <p>
              This website may use third-party services such as Iubenda for cookie and privacy management. Please refer to their respective privacy policies for more information.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h1 className="font-display text-2xl sm:text-3xl tracking-[0.2em] uppercase">
            Política de Privacidad
          </h1>
          <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">
            Español
          </p>
          <div className="border-t border-border pt-6 space-y-4 font-body text-sm leading-relaxed text-foreground/80">
            <p>
              Este sitio web es propiedad de Alina Lippiello (P.IVA 13258160962) y está operado por ella. Nos comprometemos a proteger su privacidad y sus datos personales de conformidad con el Reglamento General de Protección de Datos (RGPD – UE 2016/679).
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Responsable del Tratamiento</h2>
            <p>Alina Lippiello — info@alinalippiello.com</p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Datos Recopilados</h2>
            <p>
              Este sitio web no recopila datos personales de forma directa. Los datos de navegación (dirección IP, tipo de navegador, páginas visitadas) pueden ser recopilados automáticamente a través de registros del servidor y herramientas de análisis de terceros. Se pueden utilizar cookies de acuerdo con nuestra Política de Cookies.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Finalidad del Tratamiento</h2>
            <p>
              Los datos recopilados se utilizan únicamente para garantizar el correcto funcionamiento del sitio web y para el análisis estadístico anónimo del tráfico web.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Conservación de Datos</h2>
            <p>
              Los datos personales se conservan únicamente durante el tiempo necesario para cumplir con los fines para los que fueron recopilados, y de conformidad con las obligaciones legales aplicables.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Sus Derechos</h2>
            <p>
              En virtud del RGPD, usted tiene derecho a acceder, rectificar, suprimir, limitar el tratamiento y portar sus datos personales. También puede oponerse al tratamiento. Para ejercer estos derechos, contáctenos en info@alinalippiello.com.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">Servicios de Terceros</h2>
            <p>
              Este sitio web puede utilizar servicios de terceros como Iubenda para la gestión de cookies y privacidad. Consulte sus respectivas políticas de privacidad para más información.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Legal;
