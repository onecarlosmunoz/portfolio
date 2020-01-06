var cacheName = 'hello-pwa';

var filesToCache = [
  '/',
  '/img/barker.png',
  '/img/downarrow.svg',
  '/img/eevoto.png',
  '/img/github.svg',
  '/img/linkedin.svg',
  '/img/onemvc.png',
  '/img/pizza-smol-dark.svg',
  '/img/pizza-smol.svg',
  '/img/pizza-smoler-dark.svg',
  '/img/pizza-smoler.svg',
  '/img/portrait.png',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/js/vanilla-tilt.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});