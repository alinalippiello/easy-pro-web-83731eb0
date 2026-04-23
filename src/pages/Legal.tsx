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
            <p className="text-muted-foreground text-xs">Last Updated: April 2026</p>
            <p>
              This website serves as a personal professional portfolio. We respect your privacy and are committed to protecting it.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">1. Data Controller</h2>
            <p>
              <strong>Alina Lippiello</strong> — <a href="mailto:alina.lippiello@gmail.com" className="underline hover:text-foreground">alina.lippiello@gmail.com</a>
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">2. Data Collection</h2>
            <p>
              This website does not collect any personal identification data (such as names, phone numbers, or email addresses) through contact forms or newsletters, as these features are not present on the site.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">3. Technical Logs and Cookies</h2>
            <p>
              <strong>Technical Data:</strong> Like most websites, our hosting provider (Vercel) may automatically collect limited technical information (such as IP addresses and browser types) for security and maintenance purposes.
            </p>
            <p>
              <strong>Cookies:</strong> This site does not use marketing or profiling cookies. Any cookies used are strictly technical and necessary for the website to function correctly.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">4. External Links</h2>
            <p>
              Our site may contain links to social media profiles (e.g., LinkedIn, Instagram). Once you click these links, you are subject to the privacy policies of those specific platforms.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">5. Your Rights</h2>
            <p>
              Under the GDPR, you have the right to access, rectify, or request the deletion of any technical data recorded. For any inquiries, please contact me via email.
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
            <p className="text-muted-foreground text-xs">Última actualización: Abril de 2026</p>
            <p>
              Este sitio web es un portfolio profesional personal. Respetamos su privacidad y nos comprometemos a protegerla.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">1. Responsable del Tratamiento</h2>
            <p>
              <strong>Alina Lippiello</strong> — <a href="mailto:alina.lippiello@gmail.com" className="underline hover:text-foreground">alina.lippiello@gmail.com</a>
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">2. Recogida de Datos</h2>
            <p>
              Este sitio web no recopila ningún dato de identificación personal (como nombres, números de teléfono o direcciones de correo electrónico) a través de formularios de contacto o boletines, ya que estas funciones no están presentes en el sitio.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">3. Registros Técnicos y Cookies</h2>
            <p>
              <strong>Datos Técnicos:</strong> Como la mayoría de los sitios web, nuestro proveedor de alojamiento (Vercel) puede recopilar automáticamente información técnica limitada (como direcciones IP y tipos de navegador) por motivos de seguridad y mantenimiento.
            </p>
            <p>
              <strong>Cookies:</strong> Este sitio no utiliza cookies de marketing o de perfilado. Las cookies utilizadas son estrictamente técnicas y necesarias para el correcto funcionamiento de la web.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">4. Enlaces Externos</h2>
            <p>
              Nuestro sitio puede contener enlaces a perfiles de redes sociales. Una vez que hace clic en estos enlaces, queda sujeto a las políticas de privacidad de esas plataformas específicas.
            </p>

            <h2 className="font-display text-base tracking-widest uppercase pt-4">5. Sus Derechos</h2>
            <p>
              De acuerdo con el RGPD, tiene derecho a acceder, rectificar o solicitar la eliminación de cualquier dato técnico registrado. Para cualquier consulta, póngase en contacto conmigo por correo electrónico.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Legal;
