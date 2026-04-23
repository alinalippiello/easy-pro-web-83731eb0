import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { t } = useLanguage();

  return (
    <section id="profilo" className="py-20 md:py-28">
      <div className="container">
        {/* Elemental-style layout: centered title + justified text block */}
        <div className="max-w-2xl mx-auto">
          {/* Header - centered like Elemental "Acerca" */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide mb-4 text-center">
              Alina Lippiello
            </h2>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground text-center">
              {t('profile.subtitle')}
            </p>
          </div>

          {/* Vision - justified block */}
          <div className="mb-10 md:mb-14">
            <p className="font-body text-sm md:text-base text-foreground leading-[1.6] italic">
              {t('profile.vision.quote')}
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-[1.6] mt-4">
              {t('profile.vision.text')}
            </p>
          </div>

          {/* Profile - continuous justified text like Elemental */}
          <div className="space-y-4 font-body text-sm md:text-base text-foreground leading-[1.6]">
            <p>{t('profile.profile.p1')}</p>
            <p>{t('profile.profile.p2')}</p>
            <p>{t('profile.profile.p3')}</p>
            <p>{t('profile.profile.p4')}</p>
            <p>{t('profile.profile.p5')}</p>
            <p>{t('profile.profile.p6')}</p>
            <p>{t('profile.profile.p7')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
