import React from "react";
import Section from "../../components/Section";
import Reveal from "../../components/Reveal";
import SplitText from "../../components/SplitText";
import { contactData } from "../../constants/constants";
import * as s from "./style.module.css";

// The email button and the LinkedIn / GitHub buttons live in the arc dock at the bottom
// of the page (src/components/Dock), so there is exactly one place to get in touch.
const Contact = () => (
  <Section id="contact">
    <div className={s.wrap}>
      <SplitText as="h2" text="Let’s make your data work." className={s.title} />
      <Reveal delay={200}>
        <p className={s.description}>{contactData.description}</p>
      </Reveal>
    </div>
  </Section>
);

export default Contact;
