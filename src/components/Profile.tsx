import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { t } = useLanguage();

  return (
    <section id="profilo" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide mb-4 text-center">
              Alina Lippiello
            </h2>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground text-center">
              {t('profile.subtitle')}
            </p>
          </div>

          {/* Visione */}
          <div className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              {t('profile.vision.title')}
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed italic">
              {t('profile.vision.quote')}
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-relaxed mt-4">
              {t('profile.vision.text')}
            </p>
          </div>

          {/* Profilo */}
          <div className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              {t('profile.profile.title')}
            </p>
            <div className="space-y-4 font-body text-sm md:text-base text-foreground leading-relaxed">
              <p>{t('profile.profile.p1')}</p>
              <p>{t('profile.profile.p2')}</p>
              <p>{t('profile.profile.p3')}</p>
              <p>{t('profile.profile.p4')}</p>
              <p>{t('profile.profile.p5')}</p>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Profile;
