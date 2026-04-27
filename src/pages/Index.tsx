import { useContext } from "react";
import { LanguageContext } from "@/contexts/language";
import { useLanguage } from "@/hooks/useLanguage";
import { useSEO } from "@/hooks/useSEO";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Strati from "@/components/Strati";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Contact from "@/components/Contact";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";

const IndexContent = () => {
  const { language } = useLanguage();
  useSEO({ language });

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Profile />
      <Strati />
      <Experience />
      <Publications />
      <Contact />
      <Footer />
      <CookieBanner />
    </main>
  );
};

const ProviderMissingNotice = () => (
  <div
    role="alert"
    className="fixed bottom-4 right-4 z-[9999] max-w-sm rounded-md border border-border bg-background/95 px-4 py-3 text-sm text-muted-foreground shadow-md"
  >
    Translation context unavailable. Please refresh the page.
  </div>
);

const Index = () => {
  // Runtime check: confirm LanguageProvider is mounted above this tree.
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error(
        "[Index] LanguageContext is missing. Ensure <LanguageProvider> wraps the app in App.tsx."
      );
    }
    return <ProviderMissingNotice />;
  }
  return <IndexContent />;
};

export default Index;
