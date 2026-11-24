import React, { useCallback, useEffect, useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Section from "../../components/Section";
import Reveal from "../../components/Reveal";
import Chip from "../../components/Chip";
import * as s from "./style.module.css";

// Projects stay in content/sections/projects/projects.json (images are processed by sharp).
const useProjects = () => {
  const data = useStaticQuery(graphql`
    query ProjectsGridQuery {
      allProjectsJson {
        nodes {
          button {
            label
            url
            visible
          }
          projects {
            visible
            category
            title
            description
            tags
            image {
              alt
              linkTo
              src {
                childImageSharp {
                  gatsbyImageData(width: 1200, layout: CONSTRAINED)
                }
              }
            }
            links {
              type
              url
            }
          }
        }
      }
    }
  `);
  const section = data.allProjectsJson.nodes[0];
  return {
    button: section.button,
    projects: section.projects.filter((project) => project.visible),
  };
};

// One tone per architecture tag (accent dots only live inside chips)
const TAG_TONES = { "Lambda Architecture": "blue", "Medallion Architecture": "amber", "Lakehouse Architecture": "sky" };

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const projectUrl = (project) => {
  const github = (project.links || []).find((link) => link.type === "github");
  return (github && github.url) || project.image.linkTo;
};

const GithubLink = ({ project }) => {
  const url = projectUrl(project);
  if (!url) return null;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={s.github} aria-label={`${project.title} on GitHub`}>
      <GithubIcon />
      GitHub
    </a>
  );
};

const Tags = ({ tags }) =>
  tags && tags.length > 0 ? (
    <ul className={s.tags}>
      {tags.map((tag) => (
        <li key={tag}>
          <Chip label={tag} tone={TAG_TONES[tag]} />
        </li>
      ))}
    </ul>
  ) : null;

const Picture = ({ project }) => (
  <GatsbyImage
    image={project.image.src.childImageSharp.gatsbyImageData}
    alt={`${project.title} preview`}
    imgStyle={{ objectFit: "cover" }}
  />
);

// The picture links to the repo too. The visible GitHub button is the keyboard / screen-reader
// way in, so this duplicate is skipped by both (tabIndex -1, aria-hidden).
const PictureLink = ({ project, className, linkRef, ...rest }) => {
  const url = projectUrl(project);
  const Tag = url ? "a" : "div";
  const linkProps = url ? { href: url, target: "_blank", rel: "noopener noreferrer", tabIndex: -1, "aria-hidden": "true" } : {};
  return (
    <Tag ref={linkRef} className={className} {...linkProps} {...rest}>
      <Picture project={project} />
    </Tag>
  );
};

const Projects = () => {
  const { projects, button } = useProjects();
  const [active, setActive] = useState(0);
  const visuals = useRef([]);

  // Scroll-linked step: the active project is the last picture whose top has passed
  // 55% of the viewport height (same idea as the story section on diabrowser.com).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.55;
      let current = 0;
      visuals.current.forEach((node, index) => {
        if (node && node.offsetParent !== null && node.getBoundingClientRect().top <= line) current = index;
      });
      setActive((previous) => (previous === current ? previous : current));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Clicking a step scrolls its picture to ~20% of the viewport
  const goTo = useCallback((index) => {
    const node = visuals.current[index];
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = node.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }, []);

  return (
    <Section id="projects" title="Projects">
      {/* Desktop: sticky step list on the left, pictures scrolling on the right */}
      <div className={s.story}>
        <Reveal as="nav" aria-label="Projects">
          <ol className={s.steps}>
            {projects.map((project, index) => (
              <li key={project.title} className={s.step} data-active={index === active}>
                <span className={s.bar} aria-hidden="true" />
                <button
                  type="button"
                  className={s.stepHead}
                  onClick={() => goTo(index)}
                  aria-current={index === active ? "step" : undefined}
                >
                  <span className={s.num}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={s.stepTitle}>{project.title}</span>
                </button>
                <div className={s.stepBody}>
                  <div className={s.stepInner}>
                    <p className={s.stepText}>{project.description}</p>
                    <GithubLink project={project} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className={s.visuals}>
          {projects.map((project, index) => (
            <Reveal key={project.title} className={s.row}>
              {project.category && <p className={s.category}>{project.category}</p>}
              <PictureLink
                project={project}
                className={s.visual}
                data-active={index === active}
                linkRef={(node) => {
                  visuals.current[index] = node;
                }}
              />
              <Tags tags={project.tags} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Tablet & mobile: stacked cards (picture, then text) */}
      <ul className={s.stack}>
        {projects.map((project, index) => (
          <Reveal as="li" key={project.title} className={s.item} delay={(index % 2) * 80}>
            <article className={s.card}>
              <div className={s.top}>
                {project.category && <p className={s.category}>{project.category}</p>}
                <GithubLink project={project} />
              </div>
              <PictureLink project={project} className={s.media} />
              <div className={s.content}>
                <h3 className={s.title}>{project.title}</h3>
                <p className={s.description}>{project.description}</p>
                <Tags tags={project.tags} />
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      {button && button.visible !== false && (
        <Reveal className={s.more}>
          <a href={button.url} target="_blank" rel="noopener noreferrer" className={s.moreLink}>
            {button.label}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      )}
    </Section>
  );
};

export default Projects;
