import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV2 = {
  manifest_version: 2,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  options_page: "src/pages/options/index.html",
  background: {
    page: "src/pages/background/index.html",
    persistent: true,
  },
  // action: {
  //   default_popup: "src/pages/popup/index.html",
  //   default_icon: "icon-34.png",
  // },
  browser_action: {
    default_popup: "src/pages/popup/index.html",
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html",
  },
  icons: {
    "128": "phishing.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      // KEY for cache invalidation
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
  ],
  devtools_page: "src/pages/devtools/index.html",
  permissions: ["webRequest", "webRequestBlocking", "<all_urls>", "storage"],
  web_accessible_resources: ["src/pages/confirmation/index.html"],
  // web_accessible_resources: [
  //   {
  //     resources: [
  //       "assets/js/*.js",
  //       "assets/css/*.css",
  //       "icon-128.png",
  //       "icon-34.png",
  //     ],
  //     matches: ["*://*/*"],
  //   },
  // ],
};

export default manifest;
