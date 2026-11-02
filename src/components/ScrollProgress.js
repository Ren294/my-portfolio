import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 1000;
  pointer-events: none;
  background: linear-gradient(90deg, #000 0%, #4B5563 100%);
  transform: scaleX(0);
  transform-origin: left;
`;

const ScrollProgress = () => {
  const ref = useRef(null);

  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <Bar ref={ref} aria-hidden="true" />;
};

export default ScrollProgress;
