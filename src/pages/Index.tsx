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

// Diagnostic: log the type of each imported component to identify
// which one is undefined or not a function (causes "Component is not a function").
const __componentRegistry = {
  Header,
  Hero,
  Profile,
  Strati,
  Experience,
  Publications,
  Contact,
  CookieBanner,
  Footer,
};

Object.entries(__componentRegistry).forEach(([name, Comp]) => {
  const type = typeof Comp;
  const isValid = type === "function" || (type === "object" && Comp !== null);
  if (!isValid) {
    // eslint-disable-next-line no-console
    console.error(
      `[Index] Invalid component import: "${name}" is ${type}`,
      Comp
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(`[Index] OK: "${name}" is ${type}`);
  }
});

const IndexContent = () => {
  const { language } = useLanguage();
  useSEO({ language });

  const safeRender = (name: string, Comp: unknown) => {
    const type = typeof Comp;
    if (type !== "function" && !(type === "object" && Comp !== null)) {
      // eslint-disable-next-line no-console
      console.error(`[Index render] "${name}" is not a valid component:`, Comp);
      return (
        <div style={{ padding: 8, color: "red", fontFamily: "monospace" }}>
          Invalid component: {name} (typeof = {type})
        </div>
      );
    }
    const C = Comp as React.ComponentType;
    return <C />;
  };

  return (
    <main className="min-h-screen">
      {safeRender("Header", Header)}
      {safeRender("Hero", Hero)}
      {safeRender("Profile", Profile)}
      {safeRender("Strati", Strati)}
      {safeRender("Experience", Experience)}
      {safeRender("Publications", Publications)}
      {safeRender("Contact", Contact)}
      {safeRender("Footer", Footer)}
      {safeRender("CookieBanner", CookieBanner)}
    </main>
  );
};

const Index = () => {
  return <IndexContent />;
};

export default Index;
