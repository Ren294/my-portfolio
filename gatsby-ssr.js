const React = require("react");

// Fonts must not be loaded via @import inside createGlobalStyle: styled-components
// may insert component rules before the @import, which the browser rejects.
exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="gfonts-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="gstatic-preconnect" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      key="inter-font"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
    />,
  ]);
};
