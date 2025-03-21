import React from "react";
import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { Box, Boxes, BoxNum, BoxText } from "./CertificationStyles";
import { certificationData } from "../../constants/constants";

const Certification = () => (
<Section id="certification">
  <SectionTitle>CERTIFICATIONS</SectionTitle>
  <Boxes>
    {certificationData.map((item, index) => (
      <Box key={index} className="certificate-container">
        <img src={item.image} className="certificate-image" />

        {/* Nội dung */}
        <div className="certificate-content" >
          <BoxNum>{item.name}</BoxNum>
          <BoxText style={{marginLeft: "15px"}}>
            <strong>Issued by:</strong> {item.issuer}
          </BoxText>
          <BoxText style={{marginLeft: "15px"}}>
            <strong>Date:</strong> {item.date}
          </BoxText>
          <BoxText style={{marginLeft: "15px"}}>
            <strong>Core Competencies:</strong> {item.description}
          </BoxText>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="certificate-button" style={{marginLeft: "15px"}}>
            <span >View Certificate</span>
          </a>
        </div>
      </Box>
    ))}
  </Boxes>

  {/* CSS cập nhật */}
  <style jsx>{`
    
    .certificate-container {
      display: flex;
      align-items: center;
      padding: 20px;
      border-radius: 30px;
      background: transparent;
      box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
      flex-wrap: wrap; /* Đảm bảo khi màn hình nhỏ, nội dung sẽ tự động xuống dưới */
    }
    
    .certificate-image {
      width: 270px;
      height: 220px;
      border-radius: 8px;
      margin: 35px;
      object-fit: cover;
    }

    .certificate-content {
        margin-left: 15px;
        margin-bottom: 20px;
      flex: 1;
      min-width: 300px; /* Đảm bảo nội dung không bị quá nhỏ */
    }

    .certificate-button {
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

    .certificate-button::before {
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

    .certificate-button:hover::before {
      left: 0;
    }

    .certificate-button span {
      position: relative;
      z-index: 1;
      transition: color 0.4s ease-in-out;
    }

    .certificate-button:hover span {
      color: #fff;
    }

    @media (max-width: 768px) {
      .certificate-container {
        flex-direction: column;
        text-align: left;
        padding: 15px;
      }

      .certificate-image {
        width: 200px;
        margin-bottom: 10px;
      }

      .certificate-content {
        min-width: 100%;
      }
    }

    @media (max-width: 480px) {
      .certificate-container {
        padding: 10px;
      }

      .certificate-image {
        width: 180px;
        height : 100px
      }

      .certificate-button {
        font-size: 12px;
        padding: 6px 10px;
      }
    }
  `}</style>
</Section>

);

export default Certification; 