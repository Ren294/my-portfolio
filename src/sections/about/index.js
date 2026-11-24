import React from "react";
import Section from "../../components/Section";
import Reveal from "../../components/Reveal";
import Portrait from "./Portrait";
import { aboutData, profile } from "../../constants/constants";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import * as s from "./style.module.css";

const About = () => {
  const { email } = useSiteSettings();
  // First sentence is the editorial lead; the rest of the text is unchanged.
  const [first, ...others] = aboutData.paragraphs;
  const split = first.match(/^(.*?\.)\s+(.*)$/s);
  const lead = split ? split[1] : first;
  const rest = split ? [split[2], ...others] : others;

  return (
    <Section id="about" title="About">
      <div className={s.layout}>
      <div className={s.column}>
        <Reveal>
          <p className={s.eyebrow}>{aboutData.eyebrow}</p>
        </Reveal>
        <Reveal delay={90}>
          <p className={s.lead}>{lead}</p>
        </Reveal>
        {rest.map((text, index) => (
          <Reveal key={text} delay={170 + index * 80}>
            <p className={s.body}>{text}</p>
          </Reveal>
        ))}
        <Reveal delay={330}>
          <dl className={s.details}>
            <div className={s.detail}>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
            <div className={s.detail}>
              <dt>Place</dt>
              <dd>{profile.locationFull}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
      <Portrait />
      </div>
    </Section>
  );
};

export default About;
