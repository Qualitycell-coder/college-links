self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('college-links-v1').then((cache) => {
      return cache.addAll(['./index.html', './logo-ar.avif']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
