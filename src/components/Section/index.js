import React from "react";
import SplitText from "../SplitText";
import * as s from "./style.module.css";

// Standard section shell: anchor + container + serif h2.
const Section = ({ id, title, children, className = "" }) => (
  <section id={id} className={`${s.section} ${className}`.trim()}>
    <div className={s.container}>
      {title && <SplitText as="h2" text={title} className={s.title} />}
      {children}
    </div>
  </section>
);

export default Section;
