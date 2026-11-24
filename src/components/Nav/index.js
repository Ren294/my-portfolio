import React, { useCallback, useEffect, useRef, useState } from "react";
import * as s from "./style.module.css";

const LINKS = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

// Page order, so the highlight can tell "between sections" from "in a nav section".
const SECTION_IDS = ["about", "experience", "projects", "education", "contact"];

const Nav = () => {
  const [active, setActive] = useState("");
  const [lifted, setLifted] = useState(false);
  const [ready, setReady] = useState(false);
  const list = useRef(null);
  const placed = useRef(false);

  // Which section are we in?
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    let frame = 0;

    const update = () => {
      frame = 0;
      setLifted(window.scrollY > 8);
      const vh = window.innerHeight;
      let current = "";
      sections.forEach((node) => {
        // Contact is the short last section: the page ends before its top can reach the 40% line,
        // so it gets an earlier trigger (and the bottom of the page always counts as Contact).
        const line = node.id === "contact" ? 0.78 : 0.4;
        if (node.getBoundingClientRect().top <= vh * line) current = node.id;
      });
      const atBottom = window.scrollY + vh >= document.documentElement.scrollHeight - 6;
      if (atBottom && window.scrollY > 0) current = "contact";
      setActive(LINKS.some((link) => link.id === current) ? current : "");
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // One indicator pill slides to whichever link is active (position + width are CSS variables).
  const measure = useCallback(() => {
    const node = list.current;
    if (!node) return;
    const link = node.querySelector('a[data-active="true"]');
    if (!link) {
      node.style.setProperty("--ind-o", "0"); // between nav sections: fade out, stay where it was
      return;
    }
    node.style.setProperty("--ind-x", `${link.offsetLeft}px`);
    node.style.setProperty("--ind-w", `${link.offsetWidth}px`);
    if (placed.current) {
      node.style.setProperty("--ind-o", "1");
      return;
    }
    // very first placement: put it in position invisibly, then fade it in without sliding from 0
    placed.current = true;
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => {
        setReady(true);
        node.style.setProperty("--ind-o", "1");
      })
    );
  }, []);

  useEffect(() => {
    measure();
  }, [active, measure]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  return (
    <header className={s.wrap}>
      <nav className={s.pill} data-lifted={lifted} aria-label="Primary">
        <a href="#top" className={s.brand} aria-label="Ren — back to top">
          Ren
        </a>
        <ul className={s.links} ref={list} data-ready={ready}>
          <li className={s.indicatorItem} aria-hidden="true">
            <span className={s.indicator} />
          </li>
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={s.link}
                data-active={active === link.id}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
