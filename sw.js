'use strict';

const CACHE_NAME = 'onecarlosmunoz-v7';

const FILES_TO_CACHE = [
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
  '/img/portrait.jpg',
  '/img/logo.svg',
  '/index.html',
  '/style/style.css',
  '/js/main.js',
  '/js/vanilla-tilt.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function(key) {
        if(key !== CACHE_NAME && key !== 'dynamic') {
          return caches.delete(key);
        }
      }));
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