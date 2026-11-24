import { graphql, useStaticQuery } from "gatsby";

// Small logos/avatars from content/images, resized by gatsby-plugin-sharp
// (the old site shipped the full-size originals). SVGs fall back to publicURL.
export const useLogos = () => {
  const data = useStaticQuery(graphql`
    query LogosQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "content" }
          relativePath: {
            in: [
              "images/homecredit.svg"
              "images/hhg.png"
              "images/channels4_profile.jpg"
              "images/techdataai.jpeg"
              "images/UTE.jpg"
              "images/ibm.jpeg"
              "images/SIC.jpeg"
              "images/lego-dummy.jpg"
            ]
          }
        }
      ) {
        nodes {
          base
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 120
              height: 120
              layout: FIXED
              placeholder: NONE
              quality: 90
              transformOptions: { fit: CONTAIN }
              backgroundColor: "#ffffff"
            )
            large: gatsbyImageData(
              width: 192
              height: 192
              layout: FIXED
              placeholder: NONE
              quality: 90
              transformOptions: { fit: CONTAIN }
              backgroundColor: "#ffffff"
            )
          }
        }
      }
    }
  `);

  return data.allFile.nodes.reduce((map, node) => {
    map[node.base] = node;
    return map;
  }, {});
};
