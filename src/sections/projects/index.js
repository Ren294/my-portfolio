import React, { useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import { Section, SectionTitle } from "../../styles/GlobalComponents";

const SWIPE_THRESHOLD = 50;

const useProjectsData = () => {
  const data = useStaticQuery(graphql`
    query ProjectsCarouselQuery {
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

const ArrowIcon = ({ direction }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const Projects = ({ heading = "PROJECTS MADE" }) => {
  const { projects, button } = useProjectsData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  const count = projects.length;
  const prevIndex = (currentIndex - 1 + count) % count;
  const nextIndex = (currentIndex + 1) % count;

  const prevSlide = () => setCurrentIndex(prevIndex);
  const nextSlide = () => setCurrentIndex(nextIndex);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (deltaX > SWIPE_THRESHOLD) prevSlide();
    else if (deltaX < -SWIPE_THRESHOLD) nextSlide();
  };

  if (count === 0) return null;

  const current = projects[currentIndex];
  const githubLink = (current.links || []).find((link) => link.type === "github");
  const projectUrl = (githubLink && githubLink.url) || current.image.linkTo;

  const renderSideCard = (index, side) => (
    <div
      key={`${side}-${index}`}
      className={`project-card project-side-card ${side}`}
      onClick={side === "left" ? prevSlide : nextSlide}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") (side === "left" ? prevSlide : nextSlide)();
      }}
      aria-label={`View ${projects[index].title}`}
    >
      <img src={getSrc(projects[index].image.src)} alt={projects[index].title} />
      <div className="project-side-overlay">
        <span>Click to view</span>
      </div>
    </div>
  );

  return (
    <Section id="features">
      <SectionTitle>{heading}</SectionTitle>

      <div className="project-carousel">
        <div className="project-stage">
          <div className="project-track" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {count > 1 && renderSideCard(prevIndex, "left")}

            <div key={`active-${currentIndex}`} className="project-card project-active-card">
              <a
                href={current.image.linkTo || projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-wrapper"
              >
                <img src={getSrc(current.image.src)} alt={current.image.alt || current.title} />
              </a>

              <div className="project-content">
                {current.category && <span className="project-category">{current.category}</span>}
                <h3 className="project-title">{current.title}</h3>
                <p className="project-description">{current.description}</p>

                {current.tags && current.tags.length > 0 && (
                  <div className="project-tags">
                    {current.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                )}

                {projectUrl && (
                  <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="project-button">
                    <span>
                      <GithubIcon />
                      View on GitHub
                    </span>
                  </a>
                )}
              </div>
            </div>

            {count > 1 && renderSideCard(nextIndex, "right")}
          </div>

          {count > 1 && (
            <>
              <button className="project-arrow project-arrow-side left" onClick={prevSlide} aria-label="Previous project">
                <ArrowIcon direction="left" />
              </button>
              <button className="project-arrow project-arrow-side right" onClick={nextSlide} aria-label="Next project">
                <ArrowIcon direction="right" />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="project-nav">
            <button className="project-arrow project-arrow-inline" onClick={prevSlide} aria-label="Previous project">
              <ArrowIcon direction="left" />
            </button>
            <div className="project-dots">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  className={`project-dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            <button className="project-arrow project-arrow-inline" onClick={nextSlide} aria-label="Next project">
              <ArrowIcon direction="right" />
            </button>
          </div>
        )}

        <div className="project-counter">
          {currentIndex + 1} / {count}
        </div>

        {button && button.visible !== false && (
          <div className="project-more">
            <a href={button.url} target="_blank" rel="noopener noreferrer" className="project-more-button">
              <span>{button.label}</span>
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        .project-carousel {
          max-width: 1200px;
          margin: 60px auto 0;
          position: relative;
        }

        .project-stage {
          position: relative;
          padding: 0 72px;
        }

        .project-track {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          position: relative;
          min-height: 640px;
          perspective: 1000px;
        }

        .project-card {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 16px;
          overflow: hidden;
          will-change: transform, opacity;
        }

        /* Side Cards (Previews) */
        .project-side-card {
          flex: 0 0 200px;
          height: 300px;
          position: relative;
          cursor: pointer;
          opacity: 0.5;
          transform: scale(0.85) translateZ(0);
          filter: grayscale(50%) blur(2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          background: #F8FAFC;
        }

        .project-side-card.left {
          animation: projectSlideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .project-side-card.right {
          animation: projectSlideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes projectSlideInLeft {
          from {
            opacity: 0;
            transform: scale(0.5) translateX(-100px) translateZ(0);
          }
          to {
            opacity: 0.5;
            transform: scale(0.85) translateX(0) translateZ(0);
          }
        }

        @keyframes projectSlideInRight {
          from {
            opacity: 0;
            transform: scale(0.5) translateX(100px) translateZ(0);
          }
          to {
            opacity: 0.5;
            transform: scale(0.85) translateX(0) translateZ(0);
          }
        }

        .project-side-card:hover,
        .project-side-card:focus-visible {
          opacity: 0.7;
          transform: scale(0.9) translateZ(20px);
          filter: grayscale(30%) blur(1px);
          outline: none;
        }

        .project-side-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
        }

        .project-side-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-side-card:hover .project-side-overlay {
          opacity: 1;
        }

        .project-side-overlay span {
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 8px;
        }

        /* Active Card (Center) */
        .project-active-card {
          flex: 0 1 680px;
          min-width: 0;
          display: flex;
          flex-direction: column;
          padding: 20px;
          background: white;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.08);
          border: 1px solid #E2E8F0;
          z-index: 2;
          animation: projectScaleIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes projectScaleIn {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateY(20deg);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        .project-image-wrapper {
          display: block;
          border-radius: 12px;
          overflow: hidden;
          background: #F8FAFC;
          border: 2px solid #F5F5F5;
          aspect-ratio: 16 / 9;
          animation: projectFadeInUp 0.8s ease-out 0.2s backwards;
        }

        .project-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .project-image-wrapper:hover img {
          transform: scale(1.04);
        }

        @keyframes projectFadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .project-content {
          padding: 24px 12px 8px;
        }

        .project-category {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748B;
          padding: 6px 14px;
          background: linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%);
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          animation: projectFadeInUp 0.8s ease-out 0.3s backwards;
        }

        .project-title {
          margin: 16px 0 12px;
          font-size: 1.4rem;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.02em;
          line-height: 1.3;
          animation: projectFadeInUp 0.8s ease-out 0.35s backwards;
        }

        .project-description {
          font-size: 0.95rem;
          color: #64748B;
          line-height: 1.7;
          margin-bottom: 18px;
          animation: projectFadeInUp 0.8s ease-out 0.4s backwards;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
          animation: projectFadeInUp 0.8s ease-out 0.5s backwards;
        }

        .project-tag {
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #0F172A;
          background: linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%);
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-tag:hover {
          background: linear-gradient(135deg, #000 0%, #4B5563 100%);
          color: white;
          border-color: #000;
          transform: translateY(-2px);
        }

        .project-button {
          display: inline-block;
          position: relative;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          background: #fff;
          border: 2px solid #000;
          border-radius: 8px;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: projectFadeInUp 0.8s ease-out 0.6s backwards;
        }

        .project-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #000;
          transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .project-button:hover::before {
          left: 0;
        }

        .project-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .project-button span {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s ease;
        }

        .project-button:hover span {
          color: #fff;
        }

        /* Navigation Arrows */
        .project-arrow {
          background: white;
          border: 2px solid #E2E8F0;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #0F172A;
          transition: all 0.3s ease;
          z-index: 10;
          flex-shrink: 0;
        }

        .project-arrow-side {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

        .project-arrow-side.left {
          left: 0;
        }

        .project-arrow-side.right {
          right: 0;
        }

        .project-arrow:hover {
          background: #000;
          border-color: #000;
          color: white;
        }

        .project-arrow-side:hover {
          transform: translateY(-50%) scale(1.1);
        }

        .project-arrow-inline {
          display: none;
        }

        /* Dots Indicators */
        .project-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 48px;
        }

        .project-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .project-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #E2E8F0;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .project-dot.active {
          background: #000;
          border-color: #000;
          width: 36px;
          border-radius: 6px;
        }

        .project-dot:hover:not(.active) {
          border-color: #CBD5E1;
          background: #F5F5F5;
        }

        .project-counter {
          text-align: center;
          margin-top: 16px;
          font-size: 0.95rem;
          color: #64748B;
          font-weight: 600;
        }

        .project-more {
          margin-top: 40px;
          text-align: center;
        }

        .project-more-button {
          display: inline-block;
          position: relative;
          padding: 14px 32px;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          background: #000;
          border: 2px solid #000;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-more-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #fff;
          transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .project-more-button:hover::before {
          left: 0;
        }

        .project-more-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .project-more-button span {
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .project-more-button:hover span {
          color: #000;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .project-stage {
            padding: 0 68px;
          }

          .project-track {
            min-height: 0;
          }

          .project-side-card {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .project-carousel {
            margin-top: 40px;
          }

          .project-stage {
            padding: 0;
          }

          .project-arrow-side {
            display: none;
          }

          .project-active-card {
            flex-basis: 100%;
            padding: 16px;
          }

          .project-content {
            padding: 20px 4px 4px;
          }

          .project-title {
            font-size: 1.2rem;
          }

          .project-description {
            font-size: 0.9rem;
          }

          .project-nav {
            margin-top: 28px;
          }

          .project-arrow-inline {
            display: flex;
            width: 44px;
            height: 44px;
          }

          .project-arrow svg {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 480px) {
          .project-active-card {
            padding: 12px;
          }

          .project-content {
            padding: 16px 4px 4px;
          }

          .project-title {
            font-size: 1.1rem;
          }

          .project-description {
            font-size: 0.875rem;
            line-height: 1.6;
          }

          .project-tag {
            padding: 5px 10px;
            font-size: 0.75rem;
          }

          .project-button {
            font-size: 13px;
            padding: 10px 18px;
          }

          .project-nav {
            gap: 14px;
          }

          .project-dots {
            gap: 8px;
          }

          .project-arrow-inline {
            width: 40px;
            height: 40px;
          }

          .project-more-button {
            padding: 12px 24px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </Section>
  );
};

export default Projects;
