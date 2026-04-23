import { useLanguage } from "@/contexts/LanguageContext";
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

const Index = () => {
  return <IndexContent />;
};

export default Index;
