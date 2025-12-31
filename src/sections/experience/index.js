import React from "react";
import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { experienceData } from "../../constants/constants";

const Experience = () => (
<Section id="experience">
      <SectionTitle>EXPERIENCE</SectionTitle>
      <div className="timeline">
        {experienceData.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="content-header">
                <div className="experience-image">
                  <img src={item.image} alt={item.company} />
                </div>
                <div className="header-text">
                  <h3>{item.title}</h3>
                  <p className="company">{item.company}</p>
                  <p className="period">
                    <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {item.period}
                  </p>
                </div>
              </div>

              <p className="description">{item.description}</p>

              <div className="technologies">
                {item.technologies.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>

              {item.title === "TechData.AI" && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn">
                  <span>View Portfolio</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style jsx>{`
        .timeline {
          position: relative;
          max-width: 950px;
          margin: 40px auto;
          padding-left: 30px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #000 0%, #4B5563 50%, #E5E7EB 100%);
          border-radius: 999px;
        }

        .timeline-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 56px;
          position: relative;
          animation: slideIn 0.6s ease-out backwards;
        }

        .timeline-item:nth-child(1) { animation-delay: 0.1s; }
        .timeline-item:nth-child(2) { animation-delay: 0.2s; }
        .timeline-item:nth-child(3) { animation-delay: 0.3s; }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .timeline-dot {
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, #000 0%, #4B5563 100%);
          border-radius: 50%;
          position: absolute;
          left: -38.5px;
          top: 12px;
          border: 4px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 0 0 4px rgba(0, 0, 0, 0.03);
          z-index: 2;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .timeline-item:hover .timeline-dot {
          transform: scale(1.4);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), 0 0 0 6px rgba(0, 0, 0, 0.05);
        }

        .timeline-content {
          flex: 1;
          background: white;
          padding: 32px;
          border-radius: 20px;
          width: 100%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06);
          border: 1px solid #E2E8F0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .timeline-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #000 0%, #4B5563 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .timeline-item:hover .timeline-content::before {
          transform: scaleX(1);
        }

        .timeline-item:hover .timeline-content {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
          border-color: #CBD5E1;
        }

        .content-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #F5F5F5;
        }

        .experience-image {
          flex: 0 0 110px;
          height: 110px;
          border-radius: 16px;
          overflow: hidden;
          border: 2px solid #F5F5F5;
          background: #FAFAFA;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .experience-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .timeline-item:hover .experience-image {
          border-color: #E2E8F0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .timeline-item:hover .experience-image img {
          transform: scale(1.08);
        }

        .header-text {
          flex: 1;
          min-width: 0;
        }

        .header-text h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #0F172A;
          letter-spacing: -0.03em;
          line-height: 1.2;
        }

        .company {
          font-size: 1.05rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .company::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #000;
          border-radius: 50%;
        }

        .period {
          font-size: 0.9rem;
          font-weight: 500;
          color: #64748B;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .calendar-icon {
          width: 16px;
          height: 16px;
          color: #64748B;
          flex-shrink: 0;
        }

        .description {
          font-size: 0.975rem;
          color: #475569;
          line-height: 1.75;
          margin-bottom: 20px;
          text-align: justify;
        }

        .technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .tech-badge {
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
          letter-spacing: 0.01em;
        }

        .tech-badge:hover {
          background: linear-gradient(135deg, #000 0%, #4B5563 100%);
          color: white;
          border-color: #000;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
          margin-top: 4px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 700;
          color: #000;
          background: #fff;
          border: 2px solid #000;
          border-radius: 10px;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.02em;
        }

        .btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #000 0%, #4B5563 100%);
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .btn:hover::before {
          left: 0;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .btn span {
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .btn:hover span {
          color: #fff;
        }

        @media (max-width: 768px) {
          .timeline {
            padding-left: 20px;
            margin: 20px auto;
          }

          .timeline-dot {
            left: -28.5px;
            width: 14px;
            height: 14px;
            top: 10px;
          }

          .timeline-item {
            margin-bottom: 40px;
          }

          .timeline-content {
            padding: 24px;
            border-radius: 16px;
          }

          .content-header {
            flex-direction: column;
            gap: 16px;
            margin-bottom: 16px;
            padding-bottom: 16px;
          }

          .experience-image {
            flex: 0 0 100px;
            height: 100px;
            width: 100px;
          }

          .header-text h3 {
            font-size: 1.25rem;
          }

          .company {
            font-size: 0.95rem;
          }

          .period {
            font-size: 0.85rem;
          }

          .description {
            font-size: 0.9rem;
            text-align: left;
          }

          .tech-badge {
            font-size: 0.75rem;
            padding: 5px 12px;
          }
        }

        @media (max-width: 480px) {
          .timeline-content {
            padding: 20px;
          }

          .experience-image {
            flex: 0 0 80px;
            height: 80px;
            width: 80px;
          }

          .header-text h3 {
            font-size: 1.1rem;
          }

          .description {
            font-size: 0.875rem;
            margin-bottom: 16px;
          }

          .technologies {
            gap: 6px;
            margin-bottom: 16px;
          }
        }
      `}</style>
    </Section>
  
);

export default Experience; 