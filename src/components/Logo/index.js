import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useLogos } from "../../hooks/useLogos";
import * as s from "./style.module.css";

// Round logo / avatar. Decorative by default (the company or school name sits beside it).
const Logo = ({ file, alt = "", size = 44, className = "" }) => {
  const logos = useLogos();
  const node = logos[file];
  const sharp = node && node.childImageSharp;
  // sizes above 64px use the larger rendition so big badges stay crisp
  const image = sharp && (size > 64 && sharp.large ? sharp.large : sharp.gatsbyImageData);

  return (
    <span className={`${s.logo} ${className}`.trim()} style={{ "--size": `${size}px` }}>
      {image ? (
        <GatsbyImage image={image} alt={alt} style={{ width: "100%", height: "100%" }} imgStyle={{ objectFit: "cover" }} />
      ) : node && node.publicURL ? (
        <img src={node.publicURL} alt={alt} className={s.contain} />
      ) : null}
    </span>
  );
};

export default Logo;
