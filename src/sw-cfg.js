importScripts(
  "https://g.alicdn.com/mylib/lp-workbox-cdn/3.6.3-2/workbox/workbox-sw.js"
);

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /regSw\.js/,
  workbox.strategies.networkOnly(),
  "GET"
);
