import React from "react";
import { toneFor } from "../../constants/constants";
import * as s from "./style.module.css";

// Pill chip with a small accent dot — the only place accent colors appear in the layout.
const Chip = ({ label, tone, className = "" }) => (
  <span className={`${s.chip} ${className}`.trim()}>
    <i className={s.dot} data-tone={tone || toneFor(label)} aria-hidden="true" />
    {label}
  </span>
);

export const ChipList = ({ items, className = "" }) => (
  <ul className={`${s.list} ${className}`.trim()}>
    {items.map((item) => (
      <li key={item}>
        <Chip label={item} />
      </li>
    ))}
  </ul>
);

export default Chip;
