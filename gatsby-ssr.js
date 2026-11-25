const React = require("react");

// Google Tag Manager container. This is the standard GTM install: the bootstrap script goes as
// high in <head> as possible, and the <noscript> iframe right after <body> opens.
const GTM_ID = "GTM-566G4Z39";

const gtmBootstrap = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

const gtmNoscript = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

// Fonts must not be loaded via @import inside CSS: the browser rejects an @import
// that follows other rules. Link them from the document head instead.
//   Inter    -> sans for everything (substitute for ABC Oracle)
//   Fraunces -> serif accent (substitute for Exposure VAR), variable weight + optical size
exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <script key="google-tag-manager" dangerouslySetInnerHTML={{ __html: gtmBootstrap }} />,
    <link key="gfonts-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="gstatic-preconnect" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      key="portfolio-fonts"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..700&family=Inter:wght@300;400;500;600&display=swap"
    />,
  ]);

  setPreBodyComponents([<noscript key="google-tag-manager-noscript" dangerouslySetInnerHTML={{ __html: gtmNoscript }} />]);
};
