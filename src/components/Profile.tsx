import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { t } = useLanguage();

  return (
    <section id="profilo" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide mb-4 text-center">
              Alina Lippiello
            </h2>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground text-center">
              {t('profile.subtitle')}
            </p>
          </div>

          {/* Vision */}
          <div className="mb-14 md:mb-20">
            <p className="font-body text-sm md:text-base text-foreground leading-[1.8] italic">
              {t('profile.vision.quote')}
            </p>
            <p className="font-body text-sm md:text-base text-foreground leading-[1.8] mt-5">
              {t('profile.vision.text')}
            </p>
          </div>

          {/* Profile - grouped into thematic blocks */}
          <div className="font-body text-sm md:text-base text-foreground leading-[1.8]">
            {/* Block 1: Introduction */}
            <p>{t('profile.profile.p1')}</p>

            {/* Block 2: Formation & thesis */}
            <div className="mt-8 space-y-4">
              <p>{t('profile.profile.p2')}</p>
              <p>{t('profile.profile.p3')}</p>
            </div>

            {/* Block 3: Research evolution */}
            <div className="mt-8 space-y-4">
              <p>{t('profile.profile.p4')}</p>
              <p>{t('profile.profile.p5')}</p>
            </div>

            {/* Block 4: Practice & vision */}
            <div className="mt-8 space-y-4">
              <p>{t('profile.profile.p6')}</p>
              <p>{t('profile.profile.p7')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
