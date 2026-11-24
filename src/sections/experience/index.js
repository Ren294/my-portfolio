import React, { useEffect, useRef, useState } from "react";
import Section from "../../components/Section";
import Reveal from "../../components/Reveal";
import Logo from "../../components/Logo";
import { ChipList } from "../../components/Chip";
import { experienceData } from "../../constants/constants";
import * as s from "./style.module.css";

const Period = ({ value, className }) => {
  const current = /present/i.test(value);
  return (
    <span className={className}>
      {current && <i className={s.live} aria-hidden="true" />}
      {value}
    </span>
  );
};

const Row = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  // Heuristic for the server render; replaced by a real measurement after mount.
  const [clamped, setClamped] = useState(item.description.length > 240);
  const [fullHeight, setFullHeight] = useState(0);
  const textRef = useRef(null);
  const regionId = `exp-desc-${index}`;

  useEffect(() => {
    const measure = () => {
      const node = textRef.current;
      if (!node) return;
      const lineHeight = parseFloat(window.getComputedStyle(node).lineHeight) || 26;
      setFullHeight(node.scrollHeight);
      setClamped(node.scrollHeight > lineHeight * 3 + 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const toggle = (event) => {
    if (!clamped || event.target.closest("a")) return;
    setOpen((value) => !value);
  };

  return (
    <Reveal as="li" className={s.row} delay={index * 60} data-expandable={clamped} onClick={toggle}>
      <div className={s.head}>
        <Logo file={item.logo} alt="" size={44} />
        <div className={s.titles}>
          <h3 className={s.role}>{item.role}</h3>
          <p className={s.company}>{item.company}</p>
          <Period value={item.period} className={`${s.period} ${s.periodInline}`} />
        </div>
        <div className={s.meta}>
          <Period value={item.period} className={s.period} />
          {clamped && (
            <button
              type="button"
              className={s.toggle}
              aria-expanded={open}
              aria-controls={regionId}
              aria-label={`${open ? "Collapse" : "Expand"} details: ${item.role}, ${item.company}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 5.25 7 9l4-3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className={s.body}>
        <div
          id={regionId}
          className={s.desc}
          data-clamped={clamped}
          data-open={open}
          style={open && fullHeight ? { maxHeight: fullHeight } : undefined}
        >
          <p ref={textRef} className={s.text}>
            {item.description}
          </p>
        </div>

        <ChipList items={item.technologies} className={s.chips} />

        {item.link && (
          <a href={item.link.url} target="_blank" rel="noopener noreferrer" className={s.link}>
            {item.link.label}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </Reveal>
  );
};

const Experience = () => (
  <Section id="experience" title="Experience">
    <ol className={s.list}>
      {experienceData.map((item, index) => (
        <Row key={`${item.company}-${item.period}`} item={item} index={index} />
      ))}
    </ol>
  </Section>
);

export default Experience;
