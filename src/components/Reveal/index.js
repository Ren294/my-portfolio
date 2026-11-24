import React, { useEffect, useRef, useState } from "react";
import * as s from "./style.module.css";

// Scroll-in state shared by Reveal and SplitText. Server HTML is fully visible (no-JS safe);
// after hydration, anything already on screen stays put and anything below the fold is armed,
// then plays once as it scrolls into view: ssr -> armed -> shown.
export const useReveal = () => {
  const ref = useRef(null);
  const [state, setState] = useState("ssr");

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setState("shown");
      return undefined;
    }
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setState("shown");
      return undefined;
    }

    setState("armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, state];
};

const Reveal = ({ as: Tag = "div", delay = 0, className = "", children, ...rest }) => {
  const [ref, state] = useReveal();

  return (
    <Tag
      ref={ref}
      data-reveal={state}
      className={`${s.reveal} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
