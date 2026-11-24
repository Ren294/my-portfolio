import React from "react";
import Reveal from "../../components/Reveal";
import { profile } from "../../constants/constants";
import * as s from "./style.module.css";

const Footer = () => (
  <Reveal as="footer" className={s.footer}>
    <p>
      © {new Date().getFullYear()} {profile.fullName}
    </p>
  </Reveal>
);

export default Footer;
