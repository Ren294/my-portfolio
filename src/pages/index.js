import React from "react";
import { ThemeProvider } from "styled-components";
import {
  AboutSection,
  ArticlesSection,
  ContactSection,
  HeroSection,
  InterestsSection,
  Page,
  Seo,
} from "gatsby-theme-portfolio-minimal";
import ExperienceSection from "../sections/experience";
import EducationSection from "../sections/education";
import CertificationSection from "../sections/certification";
import ProjectsSection from "../sections/projects";
import Reveal from "../components/Reveal";
import ScrollProgress from "../components/ScrollProgress";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/globalStyles";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Seo title="Ren's Portfolio" />
      <Page useSplashScreenAnimation>
        <ScrollProgress />
        <HeroSection sectionId="hero" />
        {/* <ArticlesSection sectionId="articles" heading="Latest Articles" sources={['Medium']} /> */}
        <Reveal>
          <AboutSection sectionId="about" heading="ABOUT ME" />
        </Reveal>
        {/* <InterestsSection sectionId="details" heading="Details" /> */}
        <Reveal>
          <ExperienceSection sectionId="experience" heading="EXPERIENCE" />
        </Reveal>
        <Reveal>
          <EducationSection sectionId="education" heading="EDUCATION" />
        </Reveal>
        <Reveal>
          <CertificationSection sectionId="certification" heading="CERTIFICATIONS" />
        </Reveal>
        <Reveal>
          <ProjectsSection heading="PROJECTS MADE" />
        </Reveal>
        <Reveal>
          <ContactSection sectionId="github" heading="CONTACT ME" />
        </Reveal>
      </Page>
    </ThemeProvider>
  );
}
