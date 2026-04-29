import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  useSEO({ language });

  // When arriving with a hash (e.g. /#progetti) — typically the fallback path
  // from a project deep link — scroll the corresponding section into view.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    });
  }, [location.hash, location.key]);

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
