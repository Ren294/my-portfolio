import { graphql, useStaticQuery } from "gatsby";

// Email, social links and SEO copy come from content/settings.json so there is one place to edit them.
export const useSiteSettings = () => {
  const data = useStaticQuery(graphql`
    query SiteSettingsQuery {
      allContentJson {
        nodes {
          siteMetadata {
            language
            author
            description
            social {
              github
              linkedin
              mail
            }
          }
        }
      }
    }
  `);

  const node = data.allContentJson.nodes.find((item) => item.siteMetadata);
  const { language, author, description, social } = node ? node.siteMetadata : { social: {} };
  const { github, linkedin, mail } = social || {};
  return { language, author, description, github, linkedin, mail, email: (mail || "").replace(/^mailto:/, "") };
};
