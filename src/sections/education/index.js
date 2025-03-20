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
          gap: 20px;
          max-width: 900px;
          margin: 20px auto;
        }
        .education-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
        }
        .education-item:hover {
          transform: translateY(-5px);
        }
        .education-image {
          flex: 0 0 200px;
          height: 200px;
          width: 80px
          border-radius: 8px;
          overflow: hidden;
        }
        .education-image img {
          width: 100%;
          object-fit: cover;
        }
        .education-content {
          flex: 1;
          text-align: left;
        }
        .degree {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 0px;
          color: black;
        }
        .school {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .period {
          font-size: 14px;
          font-style: italic;
          color: black;
        }
        .description {
          font-size: 14px;
          color: black;
          margin-bottom: 10px;
        }
        .achievements {
          font-size: 14px;
          color: black;
          padding-left: 20px;
          list-style: disc;
        }
      `}</style>
    </Section>
);

export default Education; 