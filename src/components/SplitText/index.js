import React from "react";
import { useReveal } from "../Reveal";
import * as s from "./style.module.css";

// Heading whose words rise out of a mask one after another when it scrolls into view.
// The real text lives in aria-label; the per-word spans are decorative.
const SplitText = ({ as: Tag = "h2", text, className = "", delay = 0 }) => {
  const [ref, state] = useReveal();
  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      data-reveal={state}
      aria-label={text}
      className={`${s.split} ${className}`.trim()}
      style={{ "--split-delay": `${delay}ms` }}
    >
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <span className={s.word} aria-hidden="true">
            <span className={s.inner} style={{ "--i": index }}>
              {word}
            </span>
          </span>
          {index < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </Tag>
  );
};

export default SplitText;
