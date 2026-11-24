import React from "react";
import Nav from "../components/Nav";
import Hero from "../sections/hero";
import About from "../sections/about";
import Experience from "../sections/experience";
import Projects from "../sections/projects";
import Education from "../sections/education";
import Contact from "../sections/contact";
import Footer from "../sections/footer";
import Dock from "../components/Dock";
import { useSiteSettings } from "../hooks/useSiteSettings";
import * as s from "./index.module.css";

const TITLE = "Ren's Portfolio";

export default function IndexPage() {
  return (
    <>
      <Nav />
      <main className={s.main}>
        <Hero />
        <div className={s.sections}>
          <About />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </div>
        {/* sticky arc at the end of the flow: pinned to the screen bottom while scrolling, rests here at the end */}
        <Dock />
      </main>
      <Footer />
    </>
  );
}

// Native Gatsby Head API (replaces the theme's <Seo/>, so this page no longer pulls in the theme bundle)
export const Head = () => {
  const { language, author, description } = useSiteSettings();
  return (
    <>
      <html lang={language || "en"} />
      <title>{TITLE}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#F8F8F8" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:site_name" content={TITLE} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={description} />
    </>
  );
};
