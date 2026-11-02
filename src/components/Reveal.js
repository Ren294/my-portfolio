import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const hiddenTransforms = {
  up: "translate3d(0, 48px, 0)",
  left: "translate3d(-32px, 0, 0)",
  scale: "scale(0.96)",
};

const Wrapper = styled.div`
  opacity: 0;
  transform: ${({ $variant }) => hiddenTransforms[$variant]};
  filter: ${({ $variant }) => ($variant === "up" ? "blur(6px)" : "none")};
  transition:
    opacity 0.9s ${EASE},
    transform 0.9s ${EASE},
    filter 0.9s ${EASE};
  transition-delay: ${({ $delay }) => $delay}ms;

  /* Hold descendants' entrance animations until the block is revealed */
  &:not(.is-revealed) * {
    animation-play-state: paused !important;
  }

  & section > h2::after,
  & section > div > h2::after {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.8s ${EASE} ${({ $delay }) => $delay + 350}ms;
  }

  &.is-revealed {
    opacity: 1;
    transform: none;
    filter: none;
  }

  &.is-revealed section > h2::after,
  &.is-revealed section > div > h2::after {
    transform: scaleX(1);
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;

    &:not(.is-revealed) * {
      animation-play-state: running !important;
    }

    & section > h2::after,
    & section > div > h2::after {
      transform: none;
      transition: none;
    }
  }

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

const Reveal = ({ as, className = "", variant = "up", delay = 0, rootMargin = "0px 0px -12% 0px", children }) => {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <Wrapper
      ref={ref}
      as={as}
      $variant={variant}
      $delay={delay}
      $fullWidth={!as}
      className={`reveal ${revealed ? "is-revealed" : ""} ${className}`.trim()}
    >
      {children}
    </Wrapper>
  );
};

export default Reveal;
