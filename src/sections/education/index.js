import React from "react";
import Section from "../../components/Section";
import Reveal from "../../components/Reveal";
import Logo from "../../components/Logo";
import { educationData } from "../../constants/constants";
import Certifications from "./Certifications";
import * as s from "./style.module.css";

const Education = () => (
  <Section id="education" title="Education & Certifications">
    <Reveal>
      <h3 className={s.group}>Education</h3>
      <ul className={s.list}>
        {educationData.map((item) => (
          <li key={item.degree} className={`${s.row} ${s.eduRow}`}>
            {/* same header layout as Experience: logo | degree + school | period on the right */}
            <div className={s.head}>
              <Logo file={item.logo} alt="" size="var(--logo)" />
              <div className={s.main}>
                <h4 className={s.name}>{item.degree}</h4>
                <p className={s.sub}>{item.school}</p>
                <span className={`${s.period} ${s.periodInline}`}>{item.period}</span>
              </div>
              <span className={s.period}>{item.period}</span>
            </div>
            <ul className={`${s.notes} ${s.eduNotes}`}>
              {item.achievements.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Reveal>

    <Certifications />
  </Section>
);

export default Education;
