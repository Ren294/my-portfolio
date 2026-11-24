import React, { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "../../components/Reveal";
import Logo from "../../components/Logo";
import { certificationData } from "../../constants/constants";
import * as s from "./certifications.module.css";

const Arrow = ({ direction }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d={direction === "left" ? "M13 8H3M7 4 3 8l4 4" : "M3 8h10M9 4l4 4-4 4"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Horizontal scroll-snap carousel (pattern from the "Featured apps" row on diabrowser.com),
// kept inside the page's content width: the round arrow buttons move exactly one card at a time.
const Certifications = () => {
  const scroller = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setEdge({ start: node.scrollLeft <= 1, end: node.scrollLeft >= max - 1 });
  }, []);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return undefined;
    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      node.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (direction) => {
    const node = scroller.current;
    if (!node) return;
    const card = node.querySelector("a");
    const gap = parseFloat(window.getComputedStyle(node).columnGap) || 0;
    const amount = (card ? card.getBoundingClientRect().width : node.clientWidth * 0.8) + gap;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: direction * amount, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className={s.wrap}>
      <Reveal className={s.header}>
        <h3 className={s.group}>Certifications</h3>
        <div className={s.controls}>
          <button
            type="button"
            className={s.arrow}
            aria-label="Previous certifications"
            aria-controls="certifications"
            disabled={edge.start}
            onClick={() => step(-1)}
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            className={s.arrow}
            aria-label="Next certifications"
            aria-controls="certifications"
            disabled={edge.end}
            onClick={() => step(1)}
          >
            <Arrow direction="right" />
          </button>
        </div>
      </Reveal>

      <div id="certifications" className={s.scroller} ref={scroller}>
        {certificationData.map((item, index) => (
          <Reveal key={item.name} className={s.cell} delay={index * 130}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={s.card}
            // keyboard users: bring a partly hidden card fully into view when it takes focus
            onFocus={(event) => event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" })}
          >
            <div className={s.visual} aria-hidden="true">
              <span className={s.badge}>
                <Logo file={item.logo} alt="" size={88} />
              </span>
            </div>

            <div className={s.body}>
              <p className={s.issuer}>{item.issuer}</p>
              <h4 className={s.name}>{item.name}</h4>
              <p className={s.desc}>{item.description}</p>
              <div className={s.foot}>
                <span className={s.date}>{item.date}</span>
                <span className={s.cta}>
                  View certificate
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
