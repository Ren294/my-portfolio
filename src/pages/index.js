import React from "react";
import { ThemeProvider } from "styled-components";
import {
  AboutSection,
  ArticlesSection,
  ContactSection,
  HeroSection,
  InterestsSection,
  Page,
  ProjectsSection,
  Seo,
} from "gatsby-theme-portfolio-minimal";
import ExperienceSection from "../sections/experience";
import EducationSection from "../sections/education";
import CertificationSection from "../sections/certification";
import { theme } from "../styles/theme";
export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Seo title="Ren's Portfolio" />
      <Page useSplashScreenAnimation>
        <HeroSection sectionId="hero" />
        {/* <ArticlesSection sectionId="articles" heading="Latest Articles" sources={['Medium']} /> */}
        <AboutSection sectionId="about" heading="ABOUT ME" />
        {/* <InterestsSection sectionId="details" heading="Details" /> */}
        <ExperienceSection sectionId="experience" heading="EXPERIENCE" />
        <EducationSection sectionId="education" heading="EDUCATION" />
        <CertificationSection sectionId="certification" heading="CERTIFICATIONS" />
        <ProjectsSection sectionId="features" heading="PROJECTS MADE" />
        <ContactSection sectionId="github" heading="CONTACT ME" />
      </Page>
    </ThemeProvider>
  );
}
