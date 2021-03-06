let isGHPagesHosted = /github\.io/.test(location.href);

const resources = [
  isGHPagesHosted ? '' : '/',
  'index.html',
  'dist/css/main.min.css',
  'dist/js/main.min.js',
  'dist/js/page-navigation.min.js',
  'dist/js/stat-computer.min.js',
  'icons/icon-128x128.png',
  'icons/icon-192x192.png',
  'icons/icon-256x256.png',
  'icons/icon-384x384.png',
  'icons/icon-512x512.png'
];
const cacheVersion = 'stats-v2';

addEventListener('install', function(e) {
  skipWaiting();
  e.waitUntil(
    caches.open(cacheVersion).then(function(cache) {
      return cache.addAll(resources);
    })
  );
});

addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request.url).then(function(cachedResponse) {
      return cachedResponse || fetch(e.request).then(function(response) {
        return caches.open(cacheVersion).then(function(cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
