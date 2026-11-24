import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    let frame = 0;

    const update = () => {
      frame = 0;
      setLifted(window.scrollY > 8);
      let current = "";
      sections.forEach((node) => {
        if (node.getBoundingClientRect().top <= window.innerHeight * 0.4) current = node.id;
      });
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

  return (
    <header className={s.wrap}>
      <nav className={s.pill} data-lifted={lifted} aria-label="Primary">
        <a href="#top" className={s.brand} aria-label="Ren — back to top">
          Ren
        </a>
        <ul className={s.links}>
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
