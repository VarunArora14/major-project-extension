import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   if (tab.url && tab.url.includes('youtube.com/playlist')) {
//     const queryParameters = tab.url.split('?')[1];
//     const urlParameters = new URLSearchParams(queryParameters);

//     chrome.tabs.sendMessage(tabId, {
//       type: 'NEW',
//       playlistId: urlParameters.get('list'),
//     });
//   }
// });

// var URLStorage;
// var urlsToblock = ["*://*.wikipedia.org/*"];

// const api = (url) => {
//   if (url.includes("wikipedia.org") || url.includes("twitter.com")) {
//     return {
//       block: true,
//     };
//   }
// };

// function interceptRequest(request, cancel) {
//   if (cancel) return;

//   if (request && request.url) {
//     if (request.type == "main_frame") {
//       // new page/site is loading in main window

//       const { block } = api(request.url);

//       if (block && URLStorage !== request.url) {
//         URLStorage = request.url;
//         return {
//           redirectUrl: chrome.extension.getURL("confirmation.html"),
//         };
//       }
//     }
//   }
// }

// const toPromise = (callback) => {
//   const promise = new Promise((resolve, reject) => {
//     try {
//       callback(resolve, reject);
//     } catch (err) {
//       reject(err);
//     }
//   });
//   return promise;
// };

// const interceptRequest: (
//   details: chrome.webRequest.WebRequestBodyDetails
// ) => void | chrome.webRequest.BlockingResponse = async (details) => {
//   const { url, type } = details;

//   // const testVal = await chrome.storage.local.get("test", (res) => {
//   //   console.log({ res });
//   // });

//   const testVal = await toPromise((resolve, reject) => {
//     chrome.storage.local.get(url, (result) => {
//       if (chrome.runtime.lastError) reject(chrome.runtime.lastError);

//       const test = result.url ?? false;

//       return {
//         // cancel: true,
//         redirectUrl: chrome.runtime.getURL("src/pages/confirmation/index.html"),
//       };

//       // resolve(test);
//     });
//   });

//   // console.log({ testVal });

//   if (!testVal && url.includes("wikipedia.org") && type === "main_frame") {
//     chrome.storage.local.set({
//       currentUrl: url,
//     });

//     // chrome.storage.local.set({
//     //   [url]: false,
//     // });

// return {
//   // cancel: true,
//   redirectUrl: chrome.runtime.getURL("src/pages/confirmation/index.html"),
// };
//   }

//   // chrome.storage.local.get(url, (result) => {
//   //   const isAllowed = result[url];

//   //   // if (url.includes("wikipedia.org") && type === "main_frame") {
//   //   //   chrome.storage.local.set({
//   //   //     currentUrl: url,
//   //   //   });

//   //   //   // chrome.storage.local.set({
//   //   //   //   [url]: false,
//   //   //   // });

//   //   //   return {
//   //   //     // cancel: true,
//   //   //     redirectUrl: chrome.runtime.getURL("src/pages/confirmation/index.html"),
//   //   //   };
//   //   // }
//   // });
// };
const links = [
  "www.dghjdgf.com/paypal.co.uk/cycgi-bin/webscrcmd=_home-customer&nav=1/loading.php",
  "tinyurl.com/bswqloj",
  "distritabas.com.ar/survey/webscr.php?cmd=_login-run&dispatch=5885d80a13c0db1f1ff80d546411d7f8a8350c132bc41e0934cfc023d4e8f9e5bd76c88f5c3439f2e55b7639f529ccb3bd76c88f5c3439f2e55b7639f529ccb3",
  "click2.cardmemberservices.com/963227831.16589.723931113775.130",
  "fluchinfos.com/manageaccounts&jsupein=europ_land&and=349034902hjks138934781e9lwdb4xqsvk-serv-Einloggen&sessions&jseuropfindreupdat&&serv/metacc=deload-98133842/websrc.php?session.start",
  "www.paypai.com-service.confirm.cgi-bin.w2bscr-cmd.login.submit.new-load.5885d80a13c0db1f8e263663d3faee8dcbcd55a50598f.agled.com.ar/paypai-login/service/Limit15/",
  "cloud-tech.in/img/es/paypalworldwide.INC/cgi-bin/webscrcmd=_login-run/webscrcmd=_account-run/updates-paypal/confirm-paypal/",
  "onshun.hk/a/secure.paypal.com.us.cgi-bin.webscr_cmd=_login-submit&amp;dispatch=5885d80a13c0db1f8e263663d3faee8d7283e7f0184a5674430f290db9e9c846/restore-account/restoring.php",
  "tinyurl.com/cq2yvst",
  "paypal.com.cgi-bin.login1589114111g859f.sonreir.cl/paypal/2/be9483d24fb9d36353b82bf3e9868181/",
  "medo.0fees.net/",
  "dhoso.com/.confirm/webscr.php?cmd=_login-run&dispatch=5885d80a13c0db1f1ff80d546411d7f8a8350c132bc41e0934cfc023d4e8f9e5cf719fcd33c03df0325a8492517cd170cf719fcd33c03df0325a8492517cd170",
  "app.qmailer.co.uk/link/8556/3619246/179552",
  "app.qmailer.co.uk/link/8556/3620125/179552",
  "machenss.com/pCntrlch/webscr_prim.php?sdr01=Zi5ydWVlZ2VyQGJsdWV3aW4uY2g",
];

const interceptRequest: (
  details: chrome.webRequest.WebRequestBodyDetails
) => void | chrome.webRequest.BlockingResponse = (details) => {
  const { url, type } = details;

  const urlObject = new URL(url);

  if (
    links.includes(urlObject.hostname + urlObject.pathname) &&
    type === "main_frame"
  ) {
    return {
      redirectUrl: chrome.runtime.getURL("src/pages/confirmation/index.html"),
    };
  }
};

chrome.webRequest.onBeforeRequest.addListener(
  interceptRequest,
  { urls: ["<all_urls>"] },
  ["blocking"]
);
