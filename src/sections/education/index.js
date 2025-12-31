import React from "react";
import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { educationData } from "../../constants/constants";

const Education = () => (
    <Section id="education">
      <SectionTitle>EDUCATION</SectionTitle>
      <div className="education-container">
        {educationData.map((item, index) => (
          <div className="education-item" key={index}>
            <div className="education-image">
              <img src={item.image} alt={item.school} />
            </div>

            <div className="education-content">
              <h3 className="degree">{item.degree}</h3>
              <p className="school">{item.school} </p>
              <p className="info">{item.period} </p>
              <p className="description">{item.description}</p>
              <ul className="achievements">
                {item.achievements.map((achieve, i) => (
                  <li key={i}>{achieve}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style jsx>{`
        .education-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 900px;
          margin: 40px auto;
        }

        .education-item {
          display: flex;
          align-items: flex-start;
          gap: 28px;
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06);
          border: 1px solid #E2E8F0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .education-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, #000 0%, #4B5563 100%);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .education-item:hover::before {
          transform: scaleY(1);
        }

        .education-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.12);
          border-color: #CBD5E1;
        }

        .education-image {
          flex: 0 0 140px;
          height: 140px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #F5F5F5;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .education-item:hover .education-image {
          border-color: #E2E8F0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .education-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
          transition: transform 0.3s ease;
        }

        .education-item:hover .education-image img {
          transform: scale(1.05);
        }

        .education-content {
          flex: 1;
          text-align: left;
        }

        .degree {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #0F172A;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }

        .school {
          font-size: 1.05rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
          display: block;
        }

        .info {
          font-size: 0.9rem;
          font-style: italic;
          color: #64748B;
          margin-bottom: 16px;
          display: inline-block;
          padding: 4px 12px;
          background: #F7F7F7;
          border-radius: 6px;
        }

        .description {
          font-size: 0.95rem;
          color: #64748B;
          margin-bottom: 16px;
          line-height: 1.6;
        }

        .achievements {
          font-size: 0.9rem;
          color: #475569;
          padding-left: 24px;
          list-style: none;
          margin: 0;
        }

        .achievements li {
          position: relative;
          margin-bottom: 10px;
          line-height: 1.6;
          padding-left: 8px;
        }

        .achievements li::before {
          content: '→';
          position: absolute;
          left: -20px;
          color: #000;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .education-container {
            margin: 20px auto;
            gap: 24px;
          }

          .education-item {
            flex-direction: column;
            align-items: center;
            padding: 24px;
            gap: 20px;
          }

          .education-image {
            width: 120px;
            height: 120px;
            flex: 0 0 120px;
          }

          .education-content {
            text-align: center;
          }

          .degree {
            font-size: 1.15rem;
          }

          .school {
            font-size: 0.95rem;
          }

          .achievements {
            text-align: left;
            padding-left: 20px;
          }
        }
      `}</style>
    </Section>
);

export default Education; 