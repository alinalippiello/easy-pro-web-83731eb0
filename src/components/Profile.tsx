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

        </div>
      </div>
    </section>
  );
};

export default Profile;
