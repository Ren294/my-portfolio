const React = require("react");

// Fonts must not be loaded via @import inside CSS: the browser rejects an @import
// that follows other rules. Link them from the document head instead.
//   Inter    -> sans for everything (substitute for ABC Oracle)
//   Fraunces -> serif accent (substitute for Exposure VAR), variable weight + optical size
exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="gfonts-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="gstatic-preconnect" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      key="portfolio-fonts"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..700&family=Inter:wght@300;400;500;600&display=swap"
    />,
  ]);
};
