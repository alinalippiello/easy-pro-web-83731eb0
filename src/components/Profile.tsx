import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { t } = useLanguage();

  return (
    <section id="profilo" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section title */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12">
            {t('profile.title')}
          </p>

          <div className="space-y-6 font-body text-sm md:text-base text-foreground leading-relaxed">
            <p>{t('profile.p1')}</p>
            <p>{t('profile.p2')}</p>
            <p>{t('profile.p3')}</p>
          </div>

          {/* Education integrated */}
          <div className="mt-16 pt-12 border-t border-border">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
              {t('profile.education')}
            </p>
            
            <div className="space-y-4 font-body text-sm text-foreground">
              <p>
                <span className="text-muted-foreground">2004—2008</span> — {t('profile.edu1')}
              </p>
              <p>
                <span className="text-muted-foreground">2005</span> — {t('profile.edu2')}
              </p>
              <p>
                <span className="text-muted-foreground">2000</span> — {t('profile.edu3')}
              </p>
              <p>
                <span className="text-muted-foreground">Erasmus</span> — {t('profile.edu4')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
