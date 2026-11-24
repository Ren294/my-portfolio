import React, { useEffect, useRef } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useReveal } from "../../components/Reveal";
import { usePortrait } from "../../hooks/usePortrait";
import * as s from "./portrait.module.css";

// A quiet round portrait: it fades up, the photo settles from a slight zoom, a faint aurora glow
// (the hero's green-to-blue, turned right down) comes up behind it, and the picture drifts a few
// pixels against the scroll.
const Portrait = () => {
  const image = usePortrait();
  const [revealRef, state] = useReveal();
  const frame = useRef(null);

  useEffect(() => {
    const node = frame.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -120 || rect.top > vh + 120) return; // off screen: nothing to do
      const offset = (rect.top + rect.height / 2 - vh / 2) / vh; // about -1 .. 1
      node.style.setProperty("--shift", (offset * -22).toFixed(2));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  if (!image) return null;

  return (
    <figure className={s.portrait} ref={revealRef} data-reveal={state}>
      <div className={s.glow} aria-hidden="true" />
      <div className={s.frame} ref={frame}>
        <div className={s.photo}>
          <div className={s.settle}>
            <GatsbyImage
              image={image}
              alt="Portrait of Ren"
              style={{ width: "100%", height: "100%" }}
              imgStyle={{ objectFit: "cover", objectPosition: "50% 38%" }}
            />
          </div>
        </div>
      </div>
    </figure>
  );
};

export default Portrait;
