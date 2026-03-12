const cacheName = 'v2-90days';
const assets = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Purane worker ko foran khatam kare
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim()); // Foran control le le
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
