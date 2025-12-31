import React, { useState } from "react";
import { Section, SectionTitle } from "../../styles/GlobalComponents";
import { Box, BoxNum, BoxText } from "./CertificationStyles";
import { certificationData } from "../../constants/constants";

const Certification = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getPrevIndex = () => {
    return currentIndex === 0 ? certificationData.length - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === certificationData.length - 1 ? 0 : currentIndex + 1;
  };

  const nextSlide = () => {
    setCurrentIndex(getNextIndex());
  };

  const prevSlide = () => {
    setCurrentIndex(getPrevIndex());
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevIndex = getPrevIndex();
  const nextIndex = getNextIndex();

  return (
    <Section id="certification">
      <SectionTitle>CERTIFICATIONS</SectionTitle>

      <div className="carousel-container">
        <div className="carousel-track">
          {/* Previous Certificate (Left) */}
          <div className="certificate-card side-card left" onClick={prevSlide}>
            <img src={certificationData[prevIndex].image} alt={certificationData[prevIndex].name} />
            <div className="certificate-overlay">
              <span>Click to view</span>
            </div>
          </div>

          {/* Current Certificate (Center) */}
          <Box className="certificate-card active-card">
            <img src={certificationData[currentIndex].image} className="certificate-image" alt={certificationData[currentIndex].name} />
            <div className="certificate-content">
              <BoxNum>{certificationData[currentIndex].name}</BoxNum>
              <BoxText>
                <strong>Issued by:</strong> {certificationData[currentIndex].issuer}
              </BoxText>
              <BoxText>
                <strong>Date:</strong> {certificationData[currentIndex].date}
              </BoxText>
              <BoxText>
                <strong>Core Competencies:</strong> {certificationData[currentIndex].description}
              </BoxText>
              <a
                href={certificationData[currentIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-button"
              >
                <span>View Certificate</span>
              </a>
            </div>
          </Box>

          {/* Next Certificate (Right) */}
          <div className="certificate-card side-card right" onClick={nextSlide}>
            <img src={certificationData[nextIndex].image} alt={certificationData[nextIndex].name} />
            <div className="certificate-overlay">
              <span>Click to view</span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-arrow left-arrow" onClick={prevSlide} aria-label="Previous certificate">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button className="carousel-arrow right-arrow" onClick={nextSlide} aria-label="Next certificate">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dots Indicators */}
        <div className="carousel-dots">
          {certificationData.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to certificate ${index + 1}`}
            />
          ))}
        </div>

        {/* Certificate Counter */}
        <div className="carousel-counter">
          {currentIndex + 1} / {certificationData.length}
        </div>
      </div>

      <style jsx>{`
        .carousel-container {
          max-width: 1200px;
          margin: 60px auto;
          position: relative;
          padding: 0 80px;
        }

        .carousel-track {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          position: relative;
          min-height: 450px;
          perspective: 1000px;
        }

        .certificate-card {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 16px;
          overflow: hidden;
          will-change: transform, opacity;
        }

        /* Side Cards (Previews) */
        .side-card {
          width: 250px;
          height: 320px;
          position: relative;
          cursor: pointer;
          opacity: 0.5;
          transform: scale(0.85) translateZ(0);
          filter: grayscale(50%) blur(2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: slideInSide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .side-card.left {
          animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .side-card.right {
          animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: scale(0.5) translateX(-100px) translateZ(0);
          }
          to {
            opacity: 0.5;
            transform: scale(0.85) translateX(0) translateZ(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: scale(0.5) translateX(100px) translateZ(0);
          }
          to {
            opacity: 0.5;
            transform: scale(0.85) translateX(0) translateZ(0);
          }
        }

        .side-card:hover {
          opacity: 0.7;
          transform: scale(0.9) translateZ(20px);
          filter: grayscale(30%) blur(1px);
        }

        .side-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
        }

        .certificate-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .side-card:hover .certificate-overlay {
          opacity: 1;
        }

        .certificate-overlay span {
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 8px;
        }

        /* Active Card (Center) */
        .active-card {
          width: 100%;
          max-width: 650px;
          display: flex;
          align-items: flex-start;
          padding: 36px;
          background: white;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.08);
          border: 1px solid #E2E8F0;
          gap: 32px;
          z-index: 2;
          animation: scaleInBounce 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes scaleInBounce {
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

        .certificate-image {
          width: 220px;
          height: 220px;
          border-radius: 12px;
          object-fit: cover;
          border: 2px solid #F5F5F5;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: fadeInUp 0.8s ease-out 0.2s backwards;
        }

        .certificate-image:hover {
          transform: scale(1.05) rotate(2deg);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .certificate-content {
          flex: 1;
          min-width: 0;
        }

        .certificate-content h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
          line-height: 1.3;
          animation: fadeInUp 0.8s ease-out 0.3s backwards;
        }

        .certificate-content p {
          font-size: 0.95rem;
          color: #64748B;
          margin-bottom: 12px;
          line-height: 1.6;
          animation: fadeInUp 0.8s ease-out 0.4s backwards;
        }

        .certificate-content p:nth-of-type(2) {
          animation-delay: 0.5s;
        }

        .certificate-content p:nth-of-type(3) {
          animation-delay: 0.6s;
        }

        .certificate-content strong {
          color: #475569;
          font-weight: 600;
        }

        .certificate-button {
          display: inline-block;
          position: relative;
          margin-top: 20px;
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
          animation: fadeInUp 0.8s ease-out 0.7s backwards;
        }

        .certificate-button::before {
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

        .certificate-button:hover::before {
          left: 0;
        }

        .certificate-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .certificate-button span {
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .certificate-button:hover span {
          color: #fff;
        }

        /* Navigation Arrows */
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: 2px solid #E2E8F0;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .left-arrow {
          left: 0;
        }

        .right-arrow {
          right: 0;
        }

        .carousel-arrow:hover {
          background: #000;
          border-color: #000;
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-arrow:hover svg {
          stroke: white;
        }

        .carousel-arrow svg {
          transition: stroke 0.3s ease;
        }

        /* Dots Indicators */
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 48px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #E2E8F0;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot.active {
          background: #000;
          border-color: #000;
          width: 36px;
          border-radius: 6px;
        }

        .dot:hover:not(.active) {
          border-color: #CBD5E1;
          background: #F5F5F5;
        }

        /* Certificate Counter */
        .carousel-counter {
          text-align: center;
          margin-top: 16px;
          font-size: 0.95rem;
          color: #64748B;
          font-weight: 600;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .carousel-container {
            padding: 0 60px;
          }

          .side-card {
            width: 180px;
            height: 240px;
          }

          .active-card {
            max-width: 500px;
            padding: 28px;
            gap: 24px;
          }

          .certificate-image {
            width: 160px;
            height: 160px;
          }
        }

        @media (max-width: 768px) {
          .carousel-container {
            padding: 0 20px;
          }

          .carousel-track {
            gap: 16px;
            min-height: 580px;
          }

          .side-card {
            width: 100px;
            height: 140px;
          }

          .active-card {
            flex-direction: column;
            align-items: center;
            padding: 24px;
            gap: 20px;
          }

          .certificate-image {
            width: 180px;
            height: 180px;
          }

          .certificate-content {
            text-align: center;
          }

          .certificate-content h3 {
            font-size: 1.15rem;
          }

          .carousel-arrow {
            width: 44px;
            height: 44px;
          }

          .carousel-arrow svg {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 480px) {
          .carousel-track {
            gap: 12px;
          }

          .side-card {
            width: 70px;
            height: 100px;
          }

          .active-card {
            padding: 20px;
          }

          .certificate-image {
            width: 140px;
            height: 140px;
          }

          .certificate-button {
            font-size: 13px;
            padding: 10px 18px;
          }

          .carousel-arrow {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </Section>
  );
};

export default Certification;
