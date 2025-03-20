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
                {/* Hình ảnh bên trái */}
            <div className="experience-image">
              <img src={item.image} alt={item.company} />
            </div>
              <h3>{item.title}</h3>
              <p className="company"><strong>{item.company} </strong></p>
              <p className="company"><strong>Date: </strong>{item.period}</p>
              {/* <p className="description">{item.description}</p>
              <p className="technologies"><strong>Technologies:</strong> {item.technologies.join(", ")}</p> */}
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn" style={{marginLeft: "15px"}}>
            <span >Check Portfolio</span>
            </a>
            </div>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style jsx>{`
        .timeline {
          position: relative;
          max-width: 800px;
          margin: 20px auto;
        }
        .timeline-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 30px;
          position: relative;
        }
        .timeline-dot {
          width: 12px;
          height: 12px;
          background-color: black;
          border-radius: 50%;
          position: absolute;
          left: -20px;
          top: 5px;
        }
          .experience-image {
          flex: 0 0 100px;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
        }
          .experience-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .timeline-content {
         flex: 1;
          text-align: left;
          background: white;
          padding: 25px;
          border-radius: 20px;
          width: 100%;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .company {
          font-style: bold;
          color: black;
        }
        .description {
          font-size: 14px;
          color: black;
        }
        .technologies {
          font-size: 14px;
          color: black;
        }
        
        .btn {
      display: inline-block;
      position: relative;
      margin-top: 15px;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: bold;
      color: #000;
      background: #fff;
      border: 2px solid #000;
      border-radius: 6px;
      text-decoration: none;
      overflow: hidden;
      transition: color 0.4s ease-in-out;
    }

    .btn::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: #000;
      transition: left 0.4s ease-in-out;
      z-index: 0;
    }

    .btn:hover::before {
      left: 0;
    }

    .btn span {
      position: relative;
      z-index: 1;
      transition: color 0.4s ease-in-out;
    }

    .btn:hover span {
      color: #fff;
    }
        }
      `}</style>
    </Section>
  
);

export default Experience; 