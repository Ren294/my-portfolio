import { graphql, useStaticQuery } from "gatsby";

// The About portrait (content/images/lego-dummy.jpg), resized by gatsby-plugin-sharp.
export const usePortrait = () => {
  const data = useStaticQuery(graphql`
    query PortraitQuery {
      file(sourceInstanceName: { eq: "content" }, relativePath: { eq: "images/lego-dummy.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 760, layout: CONSTRAINED, quality: 90, placeholder: BLURRED)
        }
      }
    }
  `);
  return data.file && data.file.childImageSharp ? data.file.childImageSharp.gatsbyImageData : null;
};
