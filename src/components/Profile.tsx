import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { t } = useLanguage();

  return (
    <section id="profilo" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide mb-4">
              Alina Lippiello
            </h2>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground">
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
            </div>
          </div>

          {/* Bio */}
          <div className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              {t('profile.bio.title')}
            </p>
            <h3 className="font-display text-lg md:text-xl font-light tracking-wide mb-6">
              {t('profile.bio.heading')}
            </h3>
            <div className="space-y-4 font-body text-sm md:text-base text-foreground leading-relaxed">
              <p>{t('profile.bio.p1')}</p>
              <p>{t('profile.bio.p2')}</p>
              <p>{t('profile.bio.p3')}</p>
              <p className="italic">{t('profile.bio.p4')}</p>
              <p>{t('profile.bio.p5')}</p>
              <p>{t('profile.bio.p6')}</p>
              <p>{t('profile.bio.p7')}</p>
              <p>{t('profile.bio.p8')}</p>
              <p>{t('profile.bio.p9')}</p>
              <p>{t('profile.bio.p10')}</p>
              <p>{t('profile.bio.p11')}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;
