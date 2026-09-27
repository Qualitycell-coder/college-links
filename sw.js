const CACHE_NAME = 'college-links-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './logo-ar.avif'
];

// عند التثبيت: تخزين الملفات الأساسية في الذاكرة المؤقتة
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

// عند التفعيل: حذف أي نسخ قديمة من الذاكرة المؤقتة
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            )
        )
    );
    self.clients.claim();
});

// عند كل طلب: تقديم النسخة المخزنة إن وُجدت، وإلا الجلب من الشبكة
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
