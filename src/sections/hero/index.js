import React from "react";
import Logo from "../../components/Logo";
import Chip from "../../components/Chip";
import { profile } from "../../constants/constants";
import * as s from "./style.module.css";

// Medallion architecture tiers, in flow order
const MEDALLION = [
  { label: "Bronze", tone: "amber" },
  { label: "Silver", tone: "silver" },
  { label: "Gold", tone: "sunglow" },
];

// Role tags: one floating glass pill each
const ROLE_TAGS = [
  { label: profile.roles[0], tone: "blue", position: s.fTagA, drift: s.drift4 },
  { label: profile.roles[1], tone: "sky", position: s.fTagB, drift: s.drift5 },
  { label: profile.roles[2], tone: "sunglow", position: s.fTagC, drift: s.drift6 },
];

const Hero = () => (
  <section className={s.hero} id="top">
    {/* Aurora: watercolor green -> blue wash bleeding in from the top edge */}
    <div className={s.aurora} aria-hidden="true">
      <span className={`${s.blob} ${s.b1}`} />
      <span className={`${s.blob} ${s.b2}`} />
      <span className={`${s.blob} ${s.b3}`} />
      <span className={`${s.blob} ${s.b4}`} />
      <span className={`${s.blob} ${s.b5}`} />
      <span className={s.grain} />
    </div>

    <div className={s.inner}>
      <div className={s.copy}>
        <h1 className={s.headline}>
          <span className={s.line}>
            I’m <em className={s.accent}>Ren</em>.
          </span>{" "}
          <span className={s.line}>Data that can’t wait.</span>
        </h1>
        <p className={s.sub}>
          {profile.fullName}, {profile.roles.join(", ")}
        </p>
        <a href="#contact" className={s.cta}>
          Get in touch
          <svg className={s.ctaArrow} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Ambient glass cards and tags: slow floating drift, decorative motion only */}
      <div className={s.cards}>
        <div className={`${s.floater} ${s.fProfile}`} style={{ "--i": 0 }}>
          <div className={`${s.glass} ${s.pillCard} ${s.drift1}`}>
            <Logo file={profile.avatar} alt="Ren" size={40} />
            <div className={s.profileText}>
              <span className={s.status}>
                <i className={s.statusDot} aria-hidden="true" />
                Currently at
              </span>
              <strong>{profile.currentCompany}</strong>
            </div>
          </div>
        </div>

        <div className={`${s.floater} ${s.fPipeline}`} style={{ "--i": 1 }}>
          <div className={`${s.glass} ${s.card} ${s.drift2}`}>
            <span className={s.cardLabel}>Medallion Architecture</span>
            <div className={s.pipeline} role="img" aria-label="Medallion architecture: Bronze to Silver to Gold">
              {MEDALLION.map((node, index) => (
                <React.Fragment key={node.label}>
                  <Chip label={node.label} tone={node.tone} className={s.node} />
                  {index < MEDALLION.length - 1 && (
                    <span className={s.link} style={{ "--d": `${index * 0.55}s` }} aria-hidden="true">
                      <i className={s.packet} />
                      <i className={s.packet} />
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className={`${s.floater} ${s.fPlace}`} style={{ "--i": 2 }}>
          <div className={`${s.glass} ${s.pillCard} ${s.drift3}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 14.5s4.75-4.1 4.75-7.9A4.75 4.75 0 0 0 3.25 6.6c0 3.8 4.75 7.9 4.75 7.9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <circle cx="8" cy="6.6" r="1.6" fill="currentColor" />
            </svg>
            <span className={s.place}>{profile.location}</span>
          </div>
        </div>

        {ROLE_TAGS.map((tag, index) => (
          <div key={tag.label} className={`${s.floater} ${tag.position}`} style={{ "--i": 3 + index }}>
            <div className={`${s.glass} ${s.pillCard} ${s.tag} ${tag.drift}`}>
              <i className={s.tagDot} style={{ "--tone": `var(--${tag.tone})` }} aria-hidden="true" />
              {tag.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
