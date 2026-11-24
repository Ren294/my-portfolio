import React, { useEffect, useRef } from "react";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import * as s from "./style.module.css";

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

// Arc dock (the idea from diabrowser.com): a sticky element at the very end of the page flow.
// While you scroll it stays pinned to the bottom of the screen with page content passing
// under its curved top edge; at the end of the page it simply rests in its own place.
// It is always on screen. At the very top it is a little bigger, carries a gradient shadow and
// stacks its buttons in two centred rows (email, then LinkedIn + GitHub beneath it); the scroll
// position drives that morph and the stylesheet turns it into transforms, so the layout box
// never changes. No React state, so no re-renders.
const Dock = () => {
  const { email, linkedin, github } = useSiteSettings();
  const dock = useRef(null);
  const actions = useRef(null);

  useEffect(() => {
    const node = dock.current;
    const row = actions.current;
    if (!node || !row) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    // Horizontal offsets that turn the single centred row into two centred rows.
    // Row layout: [email][social..] centred; stacked layout: email centred, socials centred below.
    const measure = () => {
      const mail = row.firstElementChild;
      const socials = [...row.children].slice(1);
      if (!mail) return;
      const gap = parseFloat(window.getComputedStyle(row).columnGap) || 0;
      const mailW = mail.offsetWidth;
      const socialsW = socials.reduce((sum, el) => sum + el.offsetWidth, 0) + Math.max(0, socials.length - 1) * gap;
      const total = mailW + (socials.length ? gap + socialsW : 0);
      node.style.setProperty("--dx-email", `${(total - mailW) / 2}px`);
      node.style.setProperty("--dx-social", `${total / 2 - socialsW / 2 - mailW - gap}px`);
    };

    const update = () => {
      frame = 0;
      const range = Math.min(360, window.innerHeight * 0.4);
      const t = Math.min(1, Math.max(0, window.scrollY / range));
      // reduced motion: no scroll-linked morph, just "at the top" vs "scrolled"
      const p = reduced ? (window.scrollY <= 8 ? 1 : 0) : 1 - t * t * (3 - 2 * t);
      node.style.setProperty("--p", p.toFixed(3));
      // two phases so the buttons never collide: the rows separate first (qy), then slide to centre (qx)
      node.style.setProperty("--qy", Math.min(1, p * 2).toFixed(3));
      node.style.setProperty("--qx", Math.max(0, p * 2 - 1).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    measure();
    update();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (observer) observer.observe(row.firstElementChild);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("resize", measure);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <aside ref={dock} className={s.dock} aria-label="Get in touch">
      <div className={s.halo} aria-hidden="true" />
      <div className={s.arc} aria-hidden="true" />
      <div className={s.actions} ref={actions}>
        <a href={`mailto:${email}`} className={s.email}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="m4 8 8 5.5L20 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {email}
        </a>
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={s.social} aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className={s.social} aria-label="GitHub">
            <GithubIcon />
          </a>
        )}
      </div>
    </aside>
  );
};

export default Dock;
